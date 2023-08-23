import { TableHeightUnitType } from '../../model/tables/secondary-structures/table-units';
import { Errors } from '@devexpress/utils/lib/errors';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { TablesManipulator } from '../../model/manipulators/tables/tables-manipulator';
import { TableCellMergingState } from '../../model/tables/secondary-structures/table-base-structures';
import { TableCellUtils } from '../../model/tables/table-utils';
import { Grid } from '../../layout-formatter/table/grid-engine/grid';
import { ParagraphManipulator } from '../../model/manipulators/paragraph-manipulator/paragraph-manipulator';
export class TableRestorer {
    static paragraphMarkBetween(model) {
        NumberMapUtils.forEach(model.subDocuments, sd => {
            for (let tablesOnLevel of sd.tablesByLevels) {
                let prevTable = tablesOnLevel[0];
                if (prevTable) {
                    for (let index = 1, table; table = tablesOnLevel[index];) {
                        if (table.getStartPosition() - prevTable.getEndPosition() == 0) {
                            TableRestorer.joinTables(sd, [prevTable, table]);
                        }
                        else {
                            prevTable = table;
                            index++;
                        }
                    }
                }
            }
        });
    }
    static joinTables(subDocument, tables) {
        if (tables.length < 2)
            throw new Error("tables.length should be > 2");
        const resultTable = tables[0];
        ListUtils.forEach(tables, table => {
            const isEqualProps = resultTable.properties.equals(table.properties);
            for (let row of table.rows) {
                resultTable.rows.push(row);
                if (!isEqualProps)
                    row.tablePropertiesException = table.properties;
            }
        }, 1);
        ListUtils.forEach(tables, table => TablesManipulator.removeTableCore(table, subDocument.tables, subDocument.tablesByLevels), 1);
        const colCount = resultTable.getTotalVirtualColumnsCount();
        for (let row of resultTable.rows)
            row.gridAfter += colCount - row.getTotalCellsInRowConsiderGrid();
    }
    static fixAllTables(model) {
        NumberMapUtils.forEach(model.subDocuments, sd => {
            TableRestorer.fixTables(sd);
        });
    }
    static fixTables(subDocument) {
        subDocument.tables.forEach((table) => {
            TableRestorer.fixTable(table, subDocument);
        });
    }
    static fixLastParagraphs(model) {
        NumberMapUtils.forEach(model.subDocuments, sd => {
            TableRestorer.fixLastParagraph(sd);
        });
    }
    static fixLastParagraph(sd) {
        const endPosition = sd.interval.end;
        if (ListUtils.elementBy(sd.tables, (table) => table.getEndPosition() == endPosition))
            TableRestorer.insertParagraphInSubDocumentEnd(sd);
    }
    static insertParagraphInSubDocumentEnd(sd) {
        ParagraphManipulator.insertParagraphInEnd(sd, sd.getDocumentEndPosition(), sd.getLastRun().getCharPropsBundle(sd.documentModel));
    }
    static fixTable(table, subDocument) {
        TableRestorer.normalize(table);
        TableRestorer.normalizeRows(table, subDocument);
        TableRestorer.normalizeTableGrid(table);
        TablesManipulator.normalizeCellColumnSpansWithoutHistory(table, true);
    }
    static normalizeRows(table, subDocument) {
        ListUtils.reverseForEach(table.rows, (row, rowIndex) => {
            if (ListUtils.allOf(row.cells, (cell) => cell.verticalMerging == TableCellMergingState.Continue)) {
                if (rowIndex > 0) {
                    const prevRowIndex = rowIndex - 1;
                    if (row.height.type != TableHeightUnitType.Auto)
                        table.rows[prevRowIndex].height.value += row.height.value;
                    TablesManipulator.removeRowCore(subDocument, table, rowIndex);
                    const cellInfos = new Grid(table).tableCellInfos;
                    ListUtils.forEach(table.rows[prevRowIndex].cells, (cell, cellIndex) => {
                        const cellInfo = cellInfos[prevRowIndex][cellIndex];
                        if (cell.verticalMerging == TableCellMergingState.Restart && cellInfo.getStartRowIndex() == cellInfo.getEndRowIndex() - 1)
                            cell.verticalMerging = TableCellMergingState.None;
                    });
                }
            }
        });
    }
    static normalizeTableGrid(table) {
        const maxEndColumnIndex = table.getTotalVirtualColumnsCount();
        table.rows.forEach((row) => {
            const gridAfterDelta = maxEndColumnIndex - row.getTotalCellsInRowConsiderGrid();
            if (gridAfterDelta)
                row.gridAfter += gridAfterDelta;
        });
    }
    static normalize(table) {
        if (table.rows.length == 1) {
            TableRestorer.removeInvalidVerticalSpansFromTableWithOneRow(table.rows);
            return;
        }
        table.rows.forEach((row, rowIndex) => {
            for (var cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
                var cell = row.cells[cellIndex];
                var mergingState = cell.verticalMerging;
                if (mergingState == TableCellMergingState.None)
                    continue;
                if (mergingState == TableCellMergingState.Continue)
                    TableRestorer.actualizeVerticalMergingForContinueCell(cell, rowIndex);
                else
                    TableRestorer.actualizeVerticalMergingForRestartCell(cell, rowIndex);
            }
        });
    }
    static getCellColumnIndexConsiderRowGrid(cell) {
        return TableCellUtils.getStartColumnIndex(cell);
    }
    static getAbsoluteCellIndexInRow(row, columnIndex, layoutIndex) {
        if (row.cells.length == 0)
            throw new Error(Errors.InternalException);
        const cells = row.cells;
        const cellsCount = cells.length;
        let cellIndex = 0;
        columnIndex -= layoutIndex ? row.gridBefore : row.gridBefore;
        while (columnIndex > 0 && cellIndex < cellsCount) {
            var currentCell = cells[cellIndex];
            columnIndex -= layoutIndex ? currentCell.columnSpan : currentCell.columnSpan;
            if (columnIndex >= 0)
                cellIndex++;
        }
        return cellIndex;
    }
    static getLowerCell(rows, currentRowIndex, columnIndex) {
        return TableRestorer.getCell(rows, currentRowIndex + 1, columnIndex);
    }
    static getUpperCell(rows, currentRowIndex, columnIndex) {
        return TableRestorer.getCell(rows, currentRowIndex - 1, columnIndex);
    }
    static getCell(rows, rowIndex, columnIndex) {
        const row = rows[rowIndex];
        if (row == null)
            return null;
        var index = TableRestorer.getAbsoluteCellIndexInRow(row, columnIndex, false);
        if (row.cells.length <= index)
            return TableRestorer.getCell(rows, rowIndex - 1, columnIndex);
        return row.cells[index];
    }
    static actualizeVerticalMergingForContinueCellCore(cell, rowIndex, columnIndex) {
        if (cell.parentRow.isLastRowInTable) {
            cell.verticalMerging = TableCellMergingState.None;
            return;
        }
        var lowerCell = TableRestorer.getLowerCell(cell.parentRow.parentTable.rows, rowIndex, columnIndex);
        if (lowerCell == null || lowerCell.verticalMerging != TableCellMergingState.Continue)
            cell.verticalMerging = TableCellMergingState.None;
        else
            cell.verticalMerging = TableCellMergingState.Restart;
    }
    static actualizeVerticalMergingForContinueCell(cell, rowIndex) {
        const columnIndex = TableRestorer.getCellColumnIndexConsiderRowGrid(cell);
        if (rowIndex == 0) {
            TableRestorer.actualizeVerticalMergingForContinueCellCore(cell, rowIndex, columnIndex);
            return;
        }
        const upperCell = TableRestorer.getUpperCell(cell.parentRow.parentTable.rows, rowIndex, columnIndex);
        if (upperCell == null || upperCell.verticalMerging == TableCellMergingState.None)
            TableRestorer.actualizeVerticalMergingForContinueCellCore(cell, rowIndex, columnIndex);
        else if (upperCell != null) {
            const expectedLeftColumn = TableRestorer.getCellColumnIndexConsiderRowGrid(upperCell);
            const expectedRightColumn = expectedLeftColumn + upperCell.columnSpan;
            const actualLeftColumn = TableRestorer.getCellColumnIndexConsiderRowGrid(cell);
            const actualRightColumn = actualLeftColumn + cell.columnSpan;
            if (expectedLeftColumn != actualLeftColumn || expectedRightColumn != actualRightColumn)
                cell.verticalMerging = TableCellMergingState.None;
        }
    }
    static actualizeVerticalMergingForRestartCell(cell, rowIndex) {
        if (cell.parentRow.isLastRowInTable) {
            cell.verticalMerging = TableCellMergingState.None;
            return;
        }
        var currentCellColumnIndex = TableRestorer.getCellColumnIndexConsiderRowGrid(cell);
        var lowerCell = TableRestorer.getLowerCell(cell.parentRow.parentTable.rows, rowIndex, currentCellColumnIndex);
        if (lowerCell == null || lowerCell.verticalMerging != TableCellMergingState.Continue || cell.columnSpan != lowerCell.columnSpan) {
            cell.verticalMerging = TableCellMergingState.None;
        }
        else {
            var lowerCellColumnIndex = TableRestorer.getCellColumnIndexConsiderRowGrid(lowerCell);
            if (lowerCellColumnIndex != currentCellColumnIndex)
                cell.verticalMerging = TableCellMergingState.None;
        }
    }
    static removeInvalidVerticalSpansFromTableWithOneRow(rows) {
        rows[0].cells.forEach((cell) => {
            cell.verticalMerging = TableCellMergingState.None;
        });
    }
}
