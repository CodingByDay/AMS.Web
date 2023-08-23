import { TablePropertiesMask } from '../../../core/model/tables/properties/table-properties';
import { TableCellMergingState, TableLayoutType } from '../../../core/model/tables/secondary-structures/table-base-structures';
import { TableBorderCalculator } from '../../../core/model/tables/secondary-structures/table-border-calculator';
import { TableWidthUnitType } from '../../../core/model/tables/secondary-structures/table-units';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { RtfTableColumnsCalculator } from './rtf-table-columns-calculator';
export class RtfTableConverter {
    constructor(tableReader) {
        this.rtfCellMap = {};
        this.tableReader = tableReader;
        this.rtfCellMap = {};
    }
    get subDocument() { return this.tableReader.data.subDocument; }
    convertTables(rtfTables, _isCopySingleCellAsText) {
        NumberMapUtils.clear(this.rtfCellMap);
        this.tablesQueue = ListUtils.shallowCopy(rtfTables);
        let tblIndex = 0;
        while (this.tablesQueue.length > 0) {
            const table = this.tablesQueue[0];
            this.tablesQueue.shift();
            this.convertTable(table, tblIndex);
            tblIndex++;
        }
    }
    convertTable(rtfTable, tblIndex) {
        if (!this.rtfTableIsValid(rtfTable))
            return;
        let parentCell = null;
        if (rtfTable.parentCell != null) {
            parentCell = this.rtfCellMap[rtfTable.parentCell.idForParentCellMap];
        }
        this.prepareRtfTable(rtfTable);
        const table = rtfTable.createTable(tblIndex, parentCell, this.tableReader.data.documentModel);
        this.convertTableCore(table, rtfTable);
        this.subDocument.tables.push(table);
    }
    rtfTableIsValid(rtfTable) {
        if (rtfTable.rows.length == 0)
            return false;
        const lastRow = ListUtils.last(rtfTable.rows);
        if (lastRow.cells.length > 0)
            return true;
        rtfTable.rows.splice(rtfTable.rows.length - 1, 1);
        return this.rtfTableIsValid(rtfTable);
    }
    prepareRtfTable(table) {
        if (this.shouldUseFloatingPosition(table)) {
        }
        const tablePreferredWidth = table.properties.preferredWidth;
        if (tablePreferredWidth.type == TableWidthUnitType.Nil) {
            tablePreferredWidth.type = TableWidthUnitType.Auto;
            tablePreferredWidth.value = 0;
        }
        if (!table.properties.coreProperties.getUseValue(TablePropertiesMask.UseRightMargin) &&
            !table.properties.coreProperties.getUseValue(TablePropertiesMask.UseLeftMargin) && table.properties.useHalfSpace) {
            const margin = table.properties.halfSpace;
            table.properties.coreProperties.cellMargins.left.type = TableWidthUnitType.ModelUnits;
            table.properties.coreProperties.cellMargins.left.value = margin;
            table.properties.coreProperties.cellMargins.right.type = TableWidthUnitType.ModelUnits;
            table.properties.coreProperties.cellMargins.right.value = margin;
        }
        table.indent = this.calculateTableLeftOffset(table);
        const indent = table.properties.coreProperties.indent;
        if (indent.type != TableWidthUnitType.ModelUnits) {
            indent.value = this.calculateTableIndent(table);
            indent.type = TableWidthUnitType.ModelUnits;
        }
    }
    shouldUseFloatingPosition(_table) {
        return false;
    }
    calculateTableLeftOffset(table) {
        const rows = table.rows;
        let result = rows[0].properties.left;
        const rowsCount = rows.length;
        for (let i = 1; i < rowsCount; i++)
            result = Math.min(result, rows[i].properties.left);
        return result;
    }
    calculateTableIndent(table) {
        const cellProperties = table.rows[0].cells[0].properties;
        const leftBorder = cellProperties.coreProperties.borders.leftBorder;
        const leftMargin = this.getCellLeftMargin(table);
        const borderWidth = TableBorderCalculator.getActualWidth(leftBorder);
        return Math.max(borderWidth / 2, this.getActualWidth(leftMargin)) + table.indent;
    }
    getCellLeftMargin(table) {
        const cellProperties = table.rows[0].cells[0].properties;
        if (cellProperties.coreProperties.cellMargins.left.type == TableWidthUnitType.ModelUnits)
            return cellProperties.coreProperties.cellMargins.left;
        return table.properties.coreProperties.cellMargins.left;
    }
    getActualWidth(unitInfo) {
        if (unitInfo.type == TableWidthUnitType.ModelUnits)
            return unitInfo.value;
        return 0;
    }
    convertTableCore(table, rtfTable) {
        const tableGrid = this.calculateTableGrid(rtfTable);
        const rows = table.rows;
        const tableLayoutType = table.properties.layoutType;
        rtfTable.rows.forEach((rtfRow) => {
            this.prepareRtfRow(rtfRow, tableGrid, tableLayoutType);
            const row = rtfRow.createTableRow(table);
            rows.push(row);
            this.convertRow(row, rtfRow);
        });
    }
    calculateTableGrid(table) {
        const calculator = new RtfTableColumnsCalculator();
        return calculator.calculate(table, table.indent);
    }
    prepareRtfRow(row, grid, tableLayoutType) {
        const gridBefore = grid.binarySearchLeft(row.properties.left);
        row.properties.gridBefore = gridBefore;
        if (row.properties.widthBefore.value == 0 && gridBefore > 0) {
            row.properties.widthBefore.value = row.offset;
            row.properties.widthBefore.type = TableWidthUnitType.ModelUnits;
        }
        this.prepareRtfRowCells(row, grid, gridBefore, tableLayoutType);
        const lastColumnIndex = grid.collection.length - 1;
        const gridAfter = lastColumnIndex - this.calculateRowColumnSpan(row);
        row.properties.gridAfter = gridAfter;
        if (row.properties.widthAfter.value == 0 && gridAfter > 0) {
            let widthAfter = 1;
            if (row.properties.widthAfter.type == TableWidthUnitType.ModelUnits) {
                widthAfter = this.calculateWidthAfter(row);
            }
            else
                widthAfter = grid.collection[lastColumnIndex] - grid.collection[lastColumnIndex - gridAfter];
            row.properties.widthAfter.value = widthAfter;
            row.properties.widthAfter.type = TableWidthUnitType.ModelUnits;
        }
    }
    calculateWidthAfter(row) {
        const rowWidth = this.calculateTotalRowWidth(row);
        if (rowWidth < 0)
            return 1;
        const rows = row.table.rows;
        let maxWidth = 0;
        for (let i = 0; i < rows.length; i++) {
            const currentRow = rows[i];
            if (currentRow === row)
                continue;
            const currentRowWidth = this.calculateTotalRowWidth(currentRow);
            if (currentRowWidth > 0)
                maxWidth = Math.max(maxWidth, currentRowWidth);
        }
        return Math.max(1, rowWidth - maxWidth);
    }
    calculateTotalRowWidth(row) {
        let totalWidth = 0;
        const cells = row.cells;
        const count = cells.length;
        for (let i = 0; i < count; i++) {
            const width = cells[i].properties.preferredWidth;
            if (width.type == TableWidthUnitType.ModelUnits)
                totalWidth += width.value;
            else
                return -1;
        }
        return totalWidth;
    }
    prepareRtfRowCells(row, grid, gridBefore, tableLayoutType) {
        let prevBorderIndex = gridBefore;
        let left = grid.collection[gridBefore];
        for (let i = 0; i < row.cells.length; i++) {
            const cell = row.cells[i];
            const right = cell.properties.right > left ? cell.properties.right : left;
            const borderIndex = grid.binarySearchRight(right) - this.calculateEquidistantCellOrder(row.cells, i, right);
            const columnSpan = borderIndex - prevBorderIndex;
            cell.columnSpan = Math.max(1, columnSpan);
            const preferredWidth = cell.properties.preferredWidth;
            if (preferredWidth.type == TableWidthUnitType.Nil ||
                (preferredWidth.type == TableWidthUnitType.Auto && tableLayoutType != TableLayoutType.Autofit)) {
                preferredWidth.value = grid.collection[borderIndex] - grid.collection[prevBorderIndex];
                preferredWidth.type = TableWidthUnitType.ModelUnits;
            }
            prevBorderIndex = Math.max(borderIndex, prevBorderIndex);
            left = right;
        }
    }
    calculateEquidistantCellOrder(cells, index, left) {
        const count = cells.length;
        let equidistantCellsCount = 0;
        for (let i = index + 1; i < count; i++) {
            if (cells[i].properties.right > left)
                break;
            equidistantCellsCount++;
        }
        return equidistantCellsCount;
    }
    calculateRowColumnSpan(row) {
        let result = row.properties.gridBefore;
        const cellsCount = row.cells.length;
        for (let i = 0; i < cellsCount; i++)
            result += row.cells[i].columnSpan;
        return result;
    }
    convertRow(row, rtfRow) {
        const rtfCells = rtfRow.cells;
        for (let i = 0; i < rtfCells.length; i++)
            this.convertCell(row, rtfCells[i]);
    }
    convertCell(row, rtfCell) {
        if (rtfCell.properties.horizontalMerging == TableCellMergingState.Restart)
            this.mergeCells(rtfCell);
        const cell = rtfCell.createCell(row, this.subDocument);
        row.cells.push(cell);
        this.rtfCellMap[rtfCell.idForParentCellMap] = cell;
    }
    mergeCells(firstCell) {
        const nextIndex = firstCell.index + 1;
        const cells = firstCell.row.cells;
        while (nextIndex < cells.length && cells[nextIndex].properties.horizontalMerging == TableCellMergingState.Continue) {
            const nextRtfCell = cells[nextIndex];
            const parentCellMap = this.tableReader.parentCellMap;
            const tables = parentCellMap[nextRtfCell.idForParentCellMap];
            if (tables !== undefined) {
                for (let table of tables)
                    ListUtils.remove(this.tablesQueue, table);
                delete parentCellMap[nextRtfCell.idForParentCellMap];
            }
            firstCell.columnSpan += nextRtfCell.columnSpan;
            this.removeCell(cells, nextRtfCell);
        }
    }
    removeCell(cells, cell) {
        ListUtils.remove(cells, cell);
        const count = cells.length;
        for (let i = cell.index; i < count; i++)
            cells[i].index--;
        this.recalcParagraphIndexes(cell);
    }
    recalcParagraphIndexes(_removedCell) {
    }
    recalcParagraphIndexesInRow(_row, _cellIndex, _delta) {
    }
    recalcParagraphIndexesInTable(_table, _rowIndex, _delta, _paragraphIndex) {
    }
    recalcParagraphIndexesInTables(delta, paragraphIndex) {
        const count = this.tablesQueue.length;
        for (let i = 0; i < count; i++)
            this.recalcParagraphIndexesInTable(this.tablesQueue[i], 0, delta, paragraphIndex);
    }
}
