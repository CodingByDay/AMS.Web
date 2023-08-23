import { updateMinMaxBounds } from '../../../../../../base-utils/min-max';
import { MinMaxNumber } from '@devexpress/utils/lib/class/min-max';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Constants } from '@devexpress/utils/lib/constants';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { TablePosition } from '../../../../../model/tables/main-structures/table';
import { TableCellMergingState, TableLayoutType } from '../../../../../model/tables/secondary-structures/table-base-structures';
import { TableWidthUnitType } from '../../../../../model/tables/secondary-structures/table-units';
import { TableWidthCalculator } from './table-width-calculator';
export class TableCellWidthCalculator {
    constructor(subDocument, boxIterator, grid, cache, pos, percentBaseWidth) {
        this.subDocument = subDocument;
        this.boxIterator = boxIterator;
        this.cache = cache;
        this.pos = pos;
        this.percentBaseWidth = percentBaseWidth;
        this.grid = grid;
    }
    cellWidth() {
        const currCache = this.cache[this.grid.table.index];
        const info = this.grid.tableCellInfos[this.pos.rowIndex][this.pos.cellIndex];
        if (this.pos.cell.verticalMerging == TableCellMergingState.Continue)
            return currCache.rows[info.getStartRowIndex()].cells[info.getCellIndexAbs(info.getStartRowIndex())].contentWidthsInfo;
        const table = this.pos.table;
        const cellStartRowIndex = info.getStartRowIndex();
        this.pos = new TablePosition(table, cellStartRowIndex, info.getCellIndexAbs(cellStartRowIndex)).init();
        const cellCache = currCache.rows[this.pos.rowIndex].cells[this.pos.cellIndex];
        const horizontalBorders = cellCache.leftBorderWidth + cellCache.rightBorderWidth;
        const cellPreferredWidth = this.pos.cell.preferredWidth;
        const cellPreferredWidthValue = cellPreferredWidth.asNumber(this.percentBaseWidth, UnitConverter.twipsToPixelsF);
        if (currCache.layoutType == TableLayoutType.Fixed) {
            const outerWidth = cellCache.horizontalMargins + cellCache.spacing + horizontalBorders;
            const result = Math.max(outerWidth, cellPreferredWidthValue);
            return cellCache.contentWidthsInfo = new MinMaxNumber(result, result);
        }
        else {
            let contentWidths = this.cellWidthCore(this.pos);
            if (cellCache.noWrap && cellPreferredWidth.type != TableWidthUnitType.ModelUnits) {
                const maxWidth = Math.max(contentWidths.minElement, contentWidths.maxElement);
                contentWidths = new MinMaxNumber(maxWidth, maxWidth);
            }
            let resultMinWidth = contentWidths.minElement + cellCache.horizontalMargins + cellCache.spacing + horizontalBorders;
            if (cellCache.noWrap && cellPreferredWidth.type == TableWidthUnitType.ModelUnits)
                resultMinWidth = Math.max(cellPreferredWidthValue, resultMinWidth);
            resultMinWidth = Math.min(Constants.MAX_SAFE_INTEGER, resultMinWidth);
            let resultMaxWidth = contentWidths.maxElement + cellCache.horizontalMargins + cellCache.spacing + horizontalBorders;
            if (cellPreferredWidth.type == TableWidthUnitType.ModelUnits)
                resultMaxWidth = Math.max(resultMinWidth, cellPreferredWidthValue);
            resultMaxWidth = Math.min(Constants.MAX_SAFE_INTEGER, resultMaxWidth);
            return cellCache.contentWidthsInfo = new MinMaxNumber(resultMinWidth, resultMaxWidth);
        }
    }
    getTableWidth(table, percentBaseWidth) {
        const tablePreferredWidth = table.preferredWidth;
        const tableIndent = table.getActualTableIndent(this.subDocument.documentModel.defaultTableProperties);
        const result = new TableWidthCalculator(this.subDocument, this.boxIterator, this.cache, table, 0).tableWidth();
        if (tablePreferredWidth.type != TableWidthUnitType.Nil && tablePreferredWidth.type != TableWidthUnitType.Auto) {
            const tableWidth = tablePreferredWidth.asNumber(percentBaseWidth, UnitConverter.twipsToPixelsF) +
                tableIndent.asNumber(percentBaseWidth, UnitConverter.twipsToPixelsF);
            updateMinMaxBounds(result, new MinMaxNumber(tableWidth, tableWidth));
        }
        return result;
    }
    getInnerTables(pos) {
        const lowerLevelIndex = pos.table.nestedLevel + 1;
        const tables = this.boxIterator.subDocument.tablesByLevels[lowerLevelIndex];
        const cellStartPos = pos.cell.startParagraphPosition.value;
        const cellEndPos = pos.cell.endParagrapPosition.value;
        const result = [];
        if (tables)
            for (let tbl, tblIndex = 0; (tbl = tables[tblIndex])
                && cellStartPos <= tbl.getStartPosition() && tbl.getEndPosition() < cellEndPos; tblIndex++)
                if (tbl.nestedLevel == lowerLevelIndex)
                    result.push(tbl);
        return result;
    }
    cellWidthCore(pos) {
        const subDocument = this.boxIterator.subDocument;
        const paragraphs = subDocument.paragraphs;
        let minMax = new MinMaxNumber(0, 0);
        const innerTables = this.getInnerTables(pos);
        for (let tbl of innerTables)
            updateMinMaxBounds(minMax, this.getTableWidth(tbl, 0));
        for (let interval of IntervalAlgorithms.reflectIntervals(ListUtils.map(innerTables, (t) => t.interval), pos.cell.interval)) {
            const firstParInd = subDocument.getParagraphIndexByPosition(interval.start);
            const intervalEnd = interval.end;
            for (let parInd = firstParInd, par; (par = paragraphs[parInd]) && (par.startLogPosition.value < intervalEnd); parInd++)
                updateMinMaxBounds(minMax, this.boxIterator.getParagraphBounds(parInd));
        }
        return minMax;
    }
}
