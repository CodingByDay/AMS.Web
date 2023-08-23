import { Flag } from '@devexpress/utils/lib/class/flag';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Constants } from '@devexpress/utils/lib/constants';
import { Errors } from '@devexpress/utils/lib/errors';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { TableCellBoundFlags } from '../../layout/table/layout-table-cell-info';
import { TableCellPropertiesMergerBorderBottom } from '../../model/tables/properties-mergers/table-cell-properties-merger';
import { TableCellMergingState } from '../../model/tables/secondary-structures/table-base-structures';
import { TableHeightUnitType } from '../../model/tables/secondary-structures/table-units';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { TableBackgroundInfoCreator } from './background-info-creator';
import { BorderMerger } from './borders/border-merger';
import { BorderCreator } from './borders/borders-creator';
import { TableHorizontalCursorBordersHelper } from './horizontal-cursor-borders-helper';
import { TableInfo } from './info/table-info';
import { LayoutTableSizeCompressor } from './size-compressor';
import { TableAlignmentApplier } from './table-alignment-applier';
export var AddRowToTableResult;
(function (AddRowToTableResult) {
    AddRowToTableResult[AddRowToTableResult["None"] = 0] = "None";
    AddRowToTableResult[AddRowToTableResult["RowAdded"] = 1] = "RowAdded";
    AddRowToTableResult[AddRowToTableResult["TableFinished"] = 2] = "TableFinished";
    AddRowToTableResult[AddRowToTableResult["GoToNextColumn"] = 4] = "GoToNextColumn";
})(AddRowToTableResult || (AddRowToTableResult = {}));
export class Formatter {
    constructor(rowFormatter, tablePositions, column, tableMaxWidth, offset, parentCell, index, avaliableHeight, parentFormatter) {
        this._posToWaitingContinuedFormatterMap = [];
        this.isFullyFormatted = false;
        this.parentFormatter = parentFormatter;
        const tblPos = tablePositions[index];
        if (tblPos.rowIndex != 0 || tblPos.cellIndex != 0)
            throw new Error(Errors.InternalException);
        this.tableInfo = new TableInfo(rowFormatter, tblPos.table, tableMaxWidth, offset.x, offset.y);
        this.initColumn(column, parentCell, avaliableHeight);
        if (++index < tablePositions.length)
            this.createInnerFormatter(tablePositions);
    }
    get posToWaitingContinuedFormatterMap() {
        return this.nestedLevel == 0 ? this._posToWaitingContinuedFormatterMap : this.parentFormatter.posToWaitingContinuedFormatterMap;
    }
    get needAddSomeLayoutRows() {
        return this.columnWasEmpty &&
            this.noReadyTableRows &&
            this.tableInfo.currCellInfo.currLayoutTableCellInfo.isEmpty() || !this.tableInfo.rowFormatter.manager.activeFormatter.subDocument.isMain();
    }
    get noReadyTableRows() {
        let formatter = this;
        do {
            if (formatter.tableInfo.currLayoutTableColumnInfo.tableRows.length)
                return false;
        } while (formatter = formatter.parentFormatter);
        return true;
    }
    get columnWasEmpty() { return this.parentFormatter ? this.parentFormatter.columnWasEmpty : this._columnWasEmpty; }
    get isCurrTableCellFirstInRow() { return this.position.cellIndex == 0; }
    get isCurrTableRowIsFirstInTable() { return this.position.rowIndex == 0; }
    get currLayoutRowOffset() { return this.tableInfo.currCellInfo.getCurrLayoutRowOffset(true); }
    get currLayoutRowContentWidth() { return this.tableInfo.currCellInfo.currLayoutRowContentWidth; }
    get nestedTableMaxWidth() { return this.tableInfo.currCellInfo.nestedTableMaxWidth; }
    get nestedLevel() { return this.tableInfo.table.nestedLevel; }
    get isCurrLayoutRowIsFirstInCell() {
        return this.tableInfo.currRowInfo.cells[this.position.cellIndex].currLayoutTableCellInfo.layoutRows.length == 0;
    }
    get actualFormatter() {
        const formatter = this.tableInfo.currCellInfo.innerFormatter;
        return formatter ? formatter.actualFormatter : this;
    }
    get position() { return this.tableInfo.position; }
    get grid() { return this.tableInfo.grid; }
    getNestedTablePosition(tablePositions) {
        const index = this.nestedLevel + 1;
        return tablePositions && tablePositions.length > index ? tablePositions[index] : null;
    }
    createInnerFormatter(tablePositions) {
        const avaliableHeight = this.getAvaliableSpaceForCellContent();
        const index = this.nestedLevel + 1;
        const tblPos = this.getNestedTablePosition(tablePositions);
        if (tblPos && (tblPos.rowIndex != 0 || tblPos.cellIndex != 0)) {
            const formatter = this.posToWaitingContinuedFormatterMap[tblPos.cell.endParagrapPosition.value];
            if (formatter) {
                this.tableInfo.currCellInfo.innerFormatter = formatter;
                return;
            }
        }
        this.tableInfo.currCellInfo.innerFormatter = new Formatter(this.tableInfo.rowFormatter, tablePositions, this.column, this.nestedTableMaxWidth, this.currLayoutRowOffset, this.tableInfo.currCellInfo.currLayoutTableCellInfo, index, avaliableHeight, this);
    }
    createNextCellFormatter() {
        const tblPoss = this.tableInfo.rowFormatter.getNextBoxWrapInfo().info.tablePosition;
        if (tblPoss && tblPoss.length > this.nestedLevel + 1 && !this.tableInfo.currCellInfo.innerFormatter)
            this.createInnerFormatter(tblPoss);
    }
    resetPosition(newPos, forceEndAndStartRow, maxNestedLevel = Constants.MAX_SAFE_INTEGER) {
        Log.print(LogSource.TableFormatter, "resetPosition", () => `rowIndex: ${newPos.rowIndex}, cellIndex: ${newPos.cellIndex}, forceEndAndStartRow: ${forceEndAndStartRow}`);
        const initNewRow = forceEndAndStartRow || newPos.rowIndex > this.tableInfo.minRowIndex;
        if (initNewRow) {
            this.finishRow();
            this.tableInfo.minRowIndex = Math.max(newPos.rowIndex, this.tableInfo.minRowIndex);
        }
        const cellGridInfo = this.tableInfo.grid.tableCellInfos[newPos.rowIndex][newPos.cellIndex];
        const cellIndex = cellGridInfo.getCellIndex(this.tableInfo.minRowIndex - cellGridInfo.getStartRowIndex());
        this.position.initIndexes(this.tableInfo.minRowIndex, cellIndex).init();
        this.tableInfo.rowFormatter.setPosition(this.tableInfo.currCellInfo.getContentModelPosition(maxNestedLevel), false, false);
        this.tableInfo.currCellInfo.resumeFormatting();
        if (initNewRow)
            this.tableInfo.currRowInfo.initLayoutInfo(forceEndAndStartRow, this.column);
    }
    initColumn(column, parentCell, avaliableHeight) {
        this.columnStart(column, false, this.tableInfo.yPositionStart, parentCell, avaliableHeight);
    }
    columnStart(column, weNeedToGoDeeper = true, yPos = 0, parentCell = null, avaliableHeight = null) {
        this.column = column;
        this._columnWasEmpty = !this.column.rows.length;
        this.tableInfo.initLayoutInfo(yPos, parentCell, this.column);
        this.tableInfo.avaliableHeight = avaliableHeight === null ?
            this.column.height - this.tableInfo.currLayoutTableColumnInfo.y :
            avaliableHeight;
        if (weNeedToGoDeeper)
            for (let rowInfo of this.tableInfo.rows)
                for (let cellInfo of rowInfo.cells)
                    if (cellInfo.innerFormatter)
                        cellInfo.innerFormatter.columnStart(column, true, cellInfo.getCurrLayoutRowOffset(false).y, cellInfo.currLayoutTableCellInfo, this.getAvaliableSpaceForCellContent(cellInfo));
    }
    findNextCell(result, info) {
        let wrap = this.tableInfo.rowFormatter.getNextBoxWrapInfo();
        let tblPoss;
        if (!wrap) {
            if (!this.tableInfo.rowFormatter.iterator.allBoxesGiven())
                throw new Error(Errors.InternalException);
            tblPoss = null;
        }
        else
            tblPoss = wrap.info.tablePosition;
        if (this.isCellFinished(tblPoss)) {
            this.tableInfo.currCellInfo.cellFullyFormatted();
            this.finishCell();
            this.setNextCell(result);
        }
        wrap = this.tableInfo.rowFormatter.getNextBoxWrapInfo();
        tblPoss = wrap ? wrap.info.tablePosition : null;
        if (tblPoss && !result.get(AddRowToTableResult.TableFinished) && !this.tableInfo.currCellInfo.innerFormatter &&
            (tblPoss.length > info.tablePosition.length ||
                tblPoss.length == info.tablePosition.length && ListUtils.last(tblPoss).table.index != ListUtils.last(info.tablePosition).table.index))
            this.createInnerFormatter(tblPoss);
    }
    isCellFinished(tblPoss) {
        const currTblPos = tblPoss ? tblPoss[this.nestedLevel] : null;
        if (!currTblPos)
            return !this.tableInfo.currCellInfo.formattingSuspended;
        return !(this.tableInfo.currCellInfo.actualTableIndexes.equals(currTblPos) && this.tableInfo.table.index == currTblPos.table.index);
    }
    isLayoutRowIsLastOnCell() {
        const wrap = this.tableInfo.rowFormatter.getNextBoxWrapInfo();
        let tblPoss;
        if (!wrap) {
            if (!this.tableInfo.rowFormatter.iterator.allBoxesGiven())
                return true;
            tblPoss = null;
        }
        else
            tblPoss = wrap.info.tablePosition;
        const nextTblPos = tblPoss ? tblPoss[this.nestedLevel] : null;
        return !nextTblPos || !this.tableInfo.currCellInfo.actualTableIndexes.equals(nextTblPos);
    }
    resetCaseInTextAnchorObject(info, obj) {
        if (this.nestedLevel < info.tablePosition.length - 1)
            return this.tableInfo.currCellInfo.innerFormatter.resetCaseInTextAnchorObject(info, obj);
        else {
            let isNeedGoToNextColumn = false;
            if (this.tableInfo.rowFormatter.manager.activeFormatter.subDocument.isMain()) {
                const lp = this.tableInfo.rowFormatter.manager.activeFormatter.layoutPosition;
                isNeedGoToNextColumn = obj.bottom > lp.pageArea.y + lp.column.y + this.tableInfo.currLayoutTableColumnInfo.y +
                    this.tableInfo.avaliableHeight - this.tableInfo.currCellInfo.heightAfterContent;
            }
            this.tableInfo.rowFormatter.manager.activeFormatter.layoutPosition.page.tableAnchoredObjectsHolder.addTableCellAnchoredObject(this.tableInfo.position, obj.objectId);
            this.resetFromRow(new Flag());
            return isNeedGoToNextColumn;
        }
    }
    applyResultOfTopLevelFormatters(result, info, lowLevelFormatters = []) {
        if (this.nestedLevel < info.getTableNestedLevel()) {
            lowLevelFormatters.push(this);
            this.tableInfo.currCellInfo.innerFormatter.applyResultOfTopLevelFormatters(result, info, lowLevelFormatters);
        }
        else
            for (let formatter; formatter = lowLevelFormatters.pop();)
                formatter.processResultOfTopLevelFormatter(result, info);
    }
    processResultOfTopLevelFormatter(result, info) {
        const cellInfo = this.tableInfo.currCellInfo;
        if (result.anyOf(AddRowToTableResult.TableFinished, AddRowToTableResult.GoToNextColumn)) {
            const innerLayoutTblColInfo = cellInfo.innerFormatter.tableInfo.currLayoutTableColumnInfo;
            if (!innerLayoutTblColInfo.isEmpty()) {
                if (!result.get(AddRowToTableResult.TableFinished))
                    cellInfo.innerFormatter.columnEnd();
                cellInfo.currLayoutTableCellInfo.internalTables[cellInfo.currLayoutTableCellInfo.layoutRows.length] = innerLayoutTblColInfo;
                cellInfo.currLayoutTableCellInfo.height += cellInfo.innerFormatter.tableInfo.currLayoutTableColumnInfo.height;
            }
            if (result.get(AddRowToTableResult.TableFinished))
                cellInfo.innerFormatter = null;
            else {
                this.tableInfo.rowFormatter.iterator.setNextValidWrapPosition(cellInfo.innerFormatter.tableInfo.table.getEndPosition(), info.tablePosition.length - 1);
                cellInfo.suspendFormatting();
                const actualNestedTablePos = this.getNestedTablePosition(this.tableInfo.rowFormatter.iterator.getWrap(false).info.tablePosition);
                if (!actualNestedTablePos) {
                    const oldNestedTablePos = this.getNestedTablePosition(info.tablePosition);
                    if (oldNestedTablePos)
                        this.posToWaitingContinuedFormatterMap[oldNestedTablePos.cell.endParagrapPosition.value] = cellInfo.innerFormatter;
                }
            }
            result.set(AddRowToTableResult.TableFinished, false);
            result.set(AddRowToTableResult.GoToNextColumn, false);
            this.findNextCell(result, info);
        }
    }
    getRowHeight(rowInfo, rowHeight) {
        const preferredHeight = rowInfo.heightInfo.preferredHeightValue;
        switch (rowInfo.heightInfo.preferredHeightType) {
            case TableHeightUnitType.Exact:
                return preferredHeight;
            case TableHeightUnitType.Minimum:
                return Math.max(preferredHeight + rowInfo.topAndBottomMargins.sumOfBoth(), rowHeight);
            default:
                return rowHeight;
        }
    }
    addLayoutRow(rowResult, info) {
        const cellInfo = this.tableInfo.currCellInfo;
        if (this.nestedLevel < info.getTableNestedLevel())
            return cellInfo.innerFormatter.addLayoutRow(rowResult, info);
        const result = new Flag(AddRowToTableResult.None);
        const maxBottom = this.getCellContentMaxBottom();
        const row = rowResult.row;
        const currCellInfo = cellInfo.currLayoutTableCellInfo;
        if (currCellInfo.internalTables[currCellInfo.layoutRows.length] &&
            this.isLayoutRowIsLastOnCell() && row.boxes.length == 1 && row.boxes[0].getType() == LayoutBoxType.ParagraphMark)
            row.height = 0;
        const rowHeight = cellInfo.cellIndex == 0 && currCellInfo.layoutRows.length == 0
            ? this.getRowHeight(cellInfo.rowInfo, row.height) : row.height;
        const rowBottom = row.y + rowHeight;
        if (!cellInfo.innerFormatter && (rowBottom <= maxBottom || this.needAddSomeLayoutRows)) {
            row.tableCellInfo = currCellInfo;
            currCellInfo.layoutRows.push(row);
            currCellInfo.height = row.bottom - currCellInfo.y;
            result.set(AddRowToTableResult.RowAdded, true);
            this.tableInfo.currRowInfo.layoutRowIndexInColumn =
                Math.min(this.tableInfo.currRowInfo.layoutRowIndexInColumn, this.column.rows.length);
            this.tableInfo.currCellInfo.cellPartiallyFormatted(rowResult.rowStartPos + row.getLastBoxEndPositionInRow());
        }
        else {
            this.cantPlaceRow(result, rowResult.rowStartPos);
        }
        return result;
    }
    cantPlaceRow(result, cellNewStartContentPos) {
        if (this.tableInfo.currCellInfo.currLayoutTableCellInfo.isEmpty()) {
            this.resetFromRow(result);
        }
        else {
            this.tableInfo.currCellInfo.cellPartiallyFormatted(cellNewStartContentPos);
            this.finishCell();
            this.setNextCell(result);
        }
    }
    resetFromRow(result) {
        this.cancelPlaceRow();
        const newPos = this.tableInfo.cellOrderHelper.getFirstNotFullyRenderedCell(this.tableInfo.minRowIndex);
        this.resetPosition(newPos, true);
        this.tableInfo.currRowInfo.initLayoutInfo(true, this.column);
        const tablePositions = this.tableInfo.rowFormatter.iterator.getWrap(false).info.tablePosition;
        if (this.nestedLevel + 1 < tablePositions.length)
            this.createInnerFormatter(tablePositions);
        result.set(AddRowToTableResult.GoToNextColumn, true);
    }
    setNextCell(result) {
        const newPos = this.tableInfo.cellOrderHelper.getNextPos(this.tableInfo.currTablePositionIndexes);
        if (!newPos) {
            if (this.tableInfo.cellOrderHelper.isTableFullyFormatted()) {
                this.finishRow();
                this.finishTable();
                result.set(AddRowToTableResult.TableFinished, true);
                return;
            }
            else {
                result.set(AddRowToTableResult.GoToNextColumn, true);
                const newPos = this.tableInfo.cellOrderHelper.getFirstNotFullyRenderedCell(this.tableInfo.minRowIndex);
                this.resetPosition(newPos, true);
            }
        }
        else
            this.resetPosition(newPos, false);
        this.createNextCellFormatter();
    }
    finishCell() {
        var _a, _b;
        const cellInfo = this.tableInfo.currCellInfo;
        const layTblCellInfo = cellInfo.currLayoutTableCellInfo;
        if (!layTblCellInfo || layTblCellInfo.isEmpty())
            return;
        if (!cellInfo.isContendFullyPlaced)
            layTblCellInfo.boundFlags.set(TableCellBoundFlags.EndOnThisColumn, false);
        this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowCells.push(layTblCellInfo);
        layTblCellInfo.height += cellInfo.heightAfterContent;
        const lp = this.tableInfo.rowFormatter.manager.activeFormatter.layoutPosition;
        const anchObjs = this.tableInfo.rowFormatter.manager.activeFormatter.layoutPosition.page.tableAnchoredObjectsHolder
            .getTableCellAnchoredObjects(this.tableInfo.position, this.tableInfo.rowFormatter.manager.activeFormatter);
        const minBottomPosition = (_b = (_a = ListUtils.max(anchObjs, o => o.bottom)) === null || _a === void 0 ? void 0 : _a.bottom) !== null && _b !== void 0 ? _b : 0;
        const minHeight = minBottomPosition - (lp.pageArea.y + lp.column.y + layTblCellInfo.y);
        layTblCellInfo.height = Math.max(layTblCellInfo.height, minHeight);
    }
    cancelPlaceRow() {
        this.column.rows.splice(this.tableInfo.currRowInfo.layoutRowIndexInColumn);
        this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowCells = [];
        for (let cell of this.tableInfo.currRowInfo.cells)
            cell.undoContentModelPosition();
    }
    finishRow() {
        const rowInfo = this.tableInfo.currRowInfo;
        if (rowInfo.currLayoutTableRowInfo.rowCells.length) {
            rowInfo.currLayoutTableRowInfo.rowCells.sort((cellA, cellB) => cellA.cellGridIndex - cellB.cellGridIndex);
            this.applyBottomHorizontalBordersChangesForPrevRow();
            this.tableInfo.currColumnHorizontalBorders.push(this.tableInfo.currRowHorizontalBorders);
            this.tableInfo.currLayoutTableColumnInfo.tableRows.push(rowInfo.currLayoutTableRowInfo);
            rowInfo.howManyColumnsConsiderTableRow++;
            this.setRowHeight();
            this.extendCellHeightToRowHeight();
            for (let cell of rowInfo.cells) {
                if (!cell.isContendFullyPlaced)
                    cell.isStartOnThisColumn = true;
                cell.storeContentModelPosition();
            }
            this.tableInfo.lastRowBottomBoundPosition = rowInfo.currLayoutTableRowInfo.bottom;
        }
        rowInfo.clearLayoutInfo();
    }
    columnEnd() {
        if (!this.tableInfo.currLayoutTableColumnInfo.tableRows.length)
            return;
        this.setCellsHeight();
        const currColumnVerticalBorders = [];
        const currColumnVerticalCursorBorders = [];
        BorderCreator.setColumnHorizontalBorders(this.tableInfo.currLayoutTableColumnInfo, this.tableInfo.rows, this.tableInfo.currColumnHorizontalBorders, this.tableInfo.isThisColumnFirstInTable);
        BorderCreator.setColumnVerticalBorders(this.tableInfo.currLayoutTableColumnInfo, this.grid, this.tableInfo.rows, this.tableInfo.isThisColumnFirstInTable, this.tableInfo.currColumnHorizontalBorders, currColumnVerticalBorders, this.tableInfo.verticalBorders, true);
        BorderCreator.setColumnVerticalBorders(this.tableInfo.currLayoutTableColumnInfo, this.grid, this.tableInfo.rows, this.tableInfo.isThisColumnFirstInTable, this.tableInfo.currColumnHorizontalBorders, currColumnVerticalCursorBorders, this.tableInfo.verticalCursorBorders, false);
        this.tableInfo.currLayoutTableColumnInfo.calculateFlags();
        this.column.tablesInfo.push(this.tableInfo.currLayoutTableColumnInfo);
        this.tableInfo.currLayoutTableColumnInfo.height = this.tableInfo.lastRowBottomBoundPosition - this.tableInfo.currLayoutTableColumnInfo.y;
        this.setRowsVerticalBounds(currColumnVerticalBorders);
        TableBackgroundInfoCreator.createBackgroundInfos(this.tableInfo.rowFormatter.manager.model.colorProvider, this.tableInfo.defaultTblCellProps, this.grid, this.tableInfo.currLayoutTableColumnInfo, currColumnVerticalBorders, this.tableInfo.currColumnHorizontalBorders, this.tableInfo.rows);
        this.tableInfo.currLayoutTableColumnInfo.horizontalBorders =
            BorderMerger.getFinalReducedHorizontalBorders(this.tableInfo.currColumnHorizontalBorders);
        this.tableInfo.currLayoutTableColumnInfo.horizontalCursorBorders =
            TableHorizontalCursorBordersHelper.getHorizontalCursorBorders(this.tableInfo.currLayoutTableColumnInfo);
        this.tableInfo.currLayoutTableColumnInfo.verticalBorders =
            BorderMerger.getFinalReducedVerticalBorders(currColumnVerticalBorders);
        this.tableInfo.currLayoutTableColumnInfo.verticalCursorBorders =
            BorderMerger.getFinalReducedVerticalBorders(currColumnVerticalCursorBorders);
        TableAlignmentApplier.applyHorizontalAlignment(this.tableInfo.currLayoutTableColumnInfo, this.tableInfo.maxWidth);
        TableAlignmentApplier.applyCellsVerticalAlignment(this.tableInfo.defaultTblCellProps, this.grid, this.tableInfo.currLayoutTableColumnInfo, this.tableInfo.rows);
        if (this.position.table.nestedLevel == 0)
            for (let row of this.tableInfo.currLayoutTableColumnInfo.tableRows)
                LayoutTableSizeCompressor.tableRowContentCompress(row);
        this.tableInfo.isThisColumnFirstInTable = false;
    }
    finishTable() {
        this.columnEnd();
        this.tableInfo.rowFormatter.setPosition(this.tableInfo.table.getEndPosition(), false, false);
        this.isFullyFormatted = true;
    }
    getAvaliableSpaceForCellContent(cellInfo = this.tableInfo.currCellInfo) {
        return this.getCellContentMaxBottom() - cellInfo.currLayoutTableCellInfo.bottom;
    }
    getCellContentMaxBottom(cellInfo = this.tableInfo.currCellInfo) {
        return this.tableInfo.currLayoutTableColumnInfo.y + this.tableInfo.avaliableHeight - cellInfo.heightAfterContent;
    }
    setCellsHeight() {
        const layoutTableRows = this.tableInfo.currLayoutTableColumnInfo.tableRows;
        for (let layoutRowIndex = 0, layTblRow; layTblRow = layoutTableRows[layoutRowIndex]; layoutRowIndex++) {
            const currentTableRowIndex = layTblRow.rowIndex;
            const currTableRowGridInfo = this.grid.tableCellInfos[currentTableRowIndex];
            const cells = this.grid.table.rows[currentTableRowIndex].cells;
            for (let cellIndex = 0, cell; cell = cells[cellIndex]; cellIndex++) {
                if (cell.verticalMerging == TableCellMergingState.Continue)
                    continue;
                const currTableCellGridInfo = currTableRowGridInfo[cellIndex];
                var cellGridIndex = currTableCellGridInfo.getGridCellIndex();
                const layTblCell = ListUtils.elementBy(layTblRow.rowCells, (cell) => cell.cellGridIndex == cellGridIndex);
                if (layTblCell)
                    layTblCell.height = Formatter.getCellHeight(layoutTableRows, layoutRowIndex, currTableCellGridInfo.getEndRowIndex());
            }
        }
    }
    static getCellHeight(layTblRows, startRowIndex, endModelRowIndex) {
        let height = 0;
        for (let layTblRow; (layTblRow = layTblRows[startRowIndex]) && layTblRow.rowIndex < endModelRowIndex; startRowIndex++)
            height += layTblRow.height;
        return height;
    }
    setRowsVerticalBounds(currColumnVerticalBorders) {
        const tableX = this.tableInfo.currLayoutTableColumnInfo.x;
        const rows = this.tableInfo.currLayoutTableColumnInfo.tableRows;
        for (let rowIndex = 0, row; row = rows[rowIndex]; rowIndex++) {
            const vertRowBrds = currColumnVerticalBorders[rowIndex];
            const lastBrdInRow = ListUtils.last(ListUtils.last(vertRowBrds));
            const xPosForFirstBorder = vertRowBrds[0][0].xPos;
            row.x = tableX + xPosForFirstBorder;
            row.width = lastBrdInRow.xPos - xPosForFirstBorder;
        }
    }
    static setRowHeightInternal(tableLayoutRow) {
        tableLayoutRow.height = ListUtils.accumulate(tableLayoutRow.rowCells, 0, (acc, cell) => Math.max(acc, cell.height));
    }
    setRowHeightWhenRowBelongsToManyColumns() {
        const rowIndex = this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowIndex;
        if (this.grid.table.rows.length - 1 == rowIndex)
            return Formatter.setRowHeightInternal(this.tableInfo.currRowInfo.currLayoutTableRowInfo);
        const cellGridIndexLongCells = [];
        let height = 0;
        const tableCellGridInfos = this.grid.tableCellGridInfos;
        for (let layoutCell of this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowCells) {
            const cellGridIndex = layoutCell.cellGridIndex;
            if (tableCellGridInfos[rowIndex][cellGridIndex] === tableCellGridInfos[rowIndex + 1][cellGridIndex])
                cellGridIndexLongCells.push(cellGridIndex);
            else
                height = Math.max(height, layoutCell.height);
        }
        if (height == 0)
            return Formatter.setRowHeightInternal(this.tableInfo.currRowInfo.currLayoutTableRowInfo);
        const rows = this.grid.table.rows;
        if (cellGridIndexLongCells.length > 0 &&
            !ListUtils.unsafeAnyOf(this.grid.tableCellInfos, (rowGridInfo, rowInd) => ListUtils.unsafeAnyOf(rowGridInfo, (cellGridInfo, cellInd) => rows[rowInd].cells[cellInd].verticalMerging != TableCellMergingState.Continue ||
                !ListUtils.unsafeAnyOf(cellGridIndexLongCells, (ind) => ind == cellGridInfo.getGridCellIndex())), rowIndex + 1)) {
            return Formatter.setRowHeightInternal(this.tableInfo.currRowInfo.currLayoutTableRowInfo);
        }
        this.tableInfo.currRowInfo.currLayoutTableRowInfo.height = height;
        return;
    }
    setRowHeight() {
        const rowIndex = this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowIndex;
        if (this.tableInfo.currRowInfo.howManyColumnsConsiderTableRow > 1)
            return this.setRowHeightWhenRowBelongsToManyColumns();
        const cells = this.grid.table.rows[rowIndex].cells;
        let maxCellHeightStartAndEndOnThisRow = 0;
        for (let cellIndex = 0, cell; cell = cells[cellIndex]; cellIndex++) {
            if (cell.verticalMerging != TableCellMergingState.Continue)
                continue;
            const cellGridInfo = this.grid.tableCellInfos[rowIndex][cellIndex];
            if (rowIndex == cellGridInfo.getEndRowIndex() - 1) {
                const startRowIndexInColumn = Math.max(0, this.tableInfo.currLayoutTableColumnInfo.tableRows.length - cellGridInfo.getNumRowsInCell());
                const firstRowInCell = this.tableInfo.currLayoutTableColumnInfo.tableRows[startRowIndexInColumn];
                var gridCellIndex = cellGridInfo.getGridCellIndex();
                const topCell = ListUtils.elementBy(firstRowInCell.rowCells, (cell) => cell.cellGridIndex == gridCellIndex);
                if (topCell)
                    maxCellHeightStartAndEndOnThisRow = Math.max(maxCellHeightStartAndEndOnThisRow, ListUtils.accumulate(this.tableInfo.rows, topCell.height, (acc, rowInfo) => acc - rowInfo.heightInfo.contentHeight, firstRowInCell.rowIndex, rowIndex));
            }
        }
        for (let layoutCellInfo of this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowCells) {
            const cellGridInfo = this.grid.tableCellGridInfos[rowIndex][layoutCellInfo.cellGridIndex];
            const cellStartRowIndex = cellGridInfo.getStartRowIndex();
            const cell = cells[cellGridInfo.getCellIndex(rowIndex - cellStartRowIndex)];
            if (cell.verticalMerging == TableCellMergingState.None)
                maxCellHeightStartAndEndOnThisRow = Math.max(maxCellHeightStartAndEndOnThisRow, layoutCellInfo.height);
        }
        const rowInfo = this.tableInfo.rows[rowIndex];
        const height = rowInfo.heightInfo;
        this.tableInfo.currRowInfo.currLayoutTableRowInfo.height = this.getRowHeight(rowInfo, Math.max(maxCellHeightStartAndEndOnThisRow, height.contentHeight));
        height.contentHeight = this.tableInfo.currRowInfo.currLayoutTableRowInfo.height;
    }
    extendCellHeightToRowHeight() {
        const rowHeight = this.tableInfo.currRowInfo.currLayoutTableRowInfo.height;
        for (let cellInfo of this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowCells)
            cellInfo.height = Math.max(cellInfo.height, rowHeight);
    }
    applyBottomHorizontalBordersChangesForPrevRow() {
        if (this.tableInfo.currLayoutTableColumnInfo.tableRows.length == 0)
            return;
        const rowIndex = this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowIndex;
        const isFirstRow = !rowIndex;
        const prevRowInfoRowIndex = ListUtils.last(this.tableInfo.currLayoutTableColumnInfo.tableRows).rowIndex;
        const isPrevRowLastInTable = prevRowInfoRowIndex == this.grid.table.rows.length - 1;
        const cellSpacingPrevRow = this.tableInfo.rows[prevRowInfoRowIndex].cellSpacing;
        const prevRowHorizBorders = ListUtils.last(this.tableInfo.currColumnHorizontalBorders);
        let delta = 0;
        if (cellSpacingPrevRow > 0) {
            const lastBrd = prevRowHorizBorders.pop();
            const lastLastBrd = prevRowHorizBorders.pop();
            const newBrd = this.tableInfo.bordersHelper.collectOneCellAndTableHorizontalBorders(rowIndex - 1, TableCellPropertiesMergerBorderBottom, rowIndex, this.tableInfo.bordersHelper.borderHorizontal, true);
            prevRowHorizBorders.push(newBrd);
            delta = lastLastBrd.maxWidth + lastBrd.maxWidth - newBrd.maxWidth + (isPrevRowLastInTable ? cellSpacingPrevRow : 0);
        }
        else {
            const prevRowHorizBordersWidth = prevRowHorizBorders.pop().maxWidth;
            if (isFirstRow)
                delta = prevRowHorizBordersWidth;
        }
        if (delta == 0)
            return;
        this.tableInfo.currRowInfo.currLayoutTableRowInfo.height -= delta;
        for (let tblCell of this.tableInfo.currRowInfo.currLayoutTableRowInfo.rowCells) {
            tblCell.y -= delta;
            for (let row of tblCell.layoutRows)
                row.y -= delta;
        }
    }
    static getCellMargin(cellMargin) {
        return cellMargin.asNumberNoPercentType(UnitConverter.twipsToPixels);
    }
}
