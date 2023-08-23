import { Flag } from '@devexpress/utils/lib/class/flag';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { Comparers } from '@devexpress/utils/lib/utils/comparers';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { PageAnchoredObjectHolder } from '../../layout-formatter/floating/page-anchored-object-holder';
import { RenderLevelCalculator } from '../../layout-formatter/floating/render-level-calculator';
import { SubDocument } from '../../model/sub-document';
import { TableCellBoundFlags } from '../table/layout-table-cell-info';
import { TableAnchoredObjectsHolder } from '../../layout-formatter/table/utils/table-anchored-objects-holder';
export var LayoutPageFlags;
(function (LayoutPageFlags) {
    LayoutPageFlags[LayoutPageFlags["MustBeRendered"] = 1] = "MustBeRendered";
    LayoutPageFlags[LayoutPageFlags["ContentRendered"] = 2] = "ContentRendered";
    LayoutPageFlags[LayoutPageFlags["NeedRenderContent"] = 4] = "NeedRenderContent";
    LayoutPageFlags[LayoutPageFlags["NeedDeleteContent"] = 8] = "NeedDeleteContent";
    LayoutPageFlags[LayoutPageFlags["IsFirstPageOfSection"] = 16] = "IsFirstPageOfSection";
    LayoutPageFlags[LayoutPageFlags["IsIntervalsCorrect"] = 32] = "IsIntervalsCorrect";
    LayoutPageFlags[LayoutPageFlags["IsSelectionRendered"] = 64] = "IsSelectionRendered";
    LayoutPageFlags[LayoutPageFlags["IsSearchSelectionRendered"] = 128] = "IsSearchSelectionRendered";
    LayoutPageFlags[LayoutPageFlags["IsMisspelledSelectionRendered"] = 256] = "IsMisspelledSelectionRendered";
    LayoutPageFlags[LayoutPageFlags["IsRangePermissionsRendered"] = 512] = "IsRangePermissionsRendered";
})(LayoutPageFlags || (LayoutPageFlags = {}));
export class LayoutOtherPageAreasInfo {
    constructor(headerPageArea, footerPageArea, textBoxesPageAreas) {
        this.headerPageArea = headerPageArea;
        this.footerPageArea = footerPageArea;
        this.textBoxesPageAreas = textBoxesPageAreas;
    }
    getDocumentModel() {
        if (!this.documentModel) {
            const pageArea = (this.headerPageArea || this.footerPageArea || this.textBoxesPageAreas[0]);
            this.documentModel = pageArea ? pageArea.subDocument.documentModel : null;
        }
        return this.documentModel;
    }
}
export class LayoutPage extends Rectangle {
    constructor() {
        super(0, 0, 0, 0);
        this.mainSubDocumentPageAreas = [];
        this.otherPageAreas = {};
        this.flags = new Flag();
        this.anchoredObjectHolder = new PageAnchoredObjectHolder();
        this.tableAnchoredObjectsHolder = new TableAnchoredObjectsHolder();
    }
    setRenderLevelCalculator(anchorObjectsPositionInfo, compatibilityMode) {
        this.renderLevelCalculator = new RenderLevelCalculator();
        this.renderLevelCalculator.calcLevels(this.anchoredObjectHolder, anchorObjectsPositionInfo, compatibilityMode);
    }
    setAbsolutePosition(pos) {
        this.contentIntervals = [new FixedInterval(pos, 0)];
        this.flags.set(LayoutPageFlags.IsIntervalsCorrect, false);
    }
    startWithFloatingObject(ancPosInfo) {
        const min = NumberMapUtils.min(this.anchoredObjectHolder.objects, obj => ancPosInfo.getPosition(obj.objectId));
        return min && ancPosInfo.getPosition(min.objectId) < this.getPosition() ? min : null;
    }
    getStartPositionConsideringAncObj(ancPosInfo) {
        const ancObjWhatStartPage = this.startWithFloatingObject(ancPosInfo);
        return Math.min(this.getPosition(), ancObjWhatStartPage ? ancPosInfo.getPosition(ancObjWhatStartPage.objectId) : Number.MAX_VALUE);
    }
    invalidate() {
        this.isValid = false;
        this.markPageIntervalsAsIncorrect();
    }
    getPosition() {
        return this.contentIntervals[0].start;
    }
    deepCopy() {
        const obj = new LayoutPage();
        obj.isValid = this.isValid;
        obj.mainSubDocumentPageAreas = ListUtils.map(this.mainSubDocumentPageAreas, (pa) => pa.deepCopy());
        obj.otherPageAreas = NumberMapUtils.shallowCopy(this.otherPageAreas);
        obj.flags = this.flags.clone();
        obj.index = this.index;
        obj.layoutPageIndex = this.layoutPageIndex;
        obj.pageOrdinal = this.pageOrdinal;
        obj.anchoredObjectHolder = this.anchoredObjectHolder.shallowCopy();
        obj.tableAnchoredObjectsHolder = this.tableAnchoredObjectsHolder.shallowCopy();
        obj.contentIntervals = ListUtils.shallowCopy(this.contentIntervals);
        obj.startPageSectionIndex = this.startPageSectionIndex;
        obj.copyFrom(this);
        return obj;
    }
    markPageIntervalsAsIncorrect() {
        this.flags.set(LayoutPageFlags.IsIntervalsCorrect, false);
    }
    getLayoutOtherPageAreasInfo() {
        let headerPageArea;
        let footerPageArea;
        const textBoxPageAreas = [];
        NumberMapUtils.forEach(this.otherPageAreas, (pageArea) => {
            if (pageArea.subDocument.isHeader())
                headerPageArea = pageArea;
            else if (pageArea.subDocument.isFooter())
                footerPageArea = pageArea;
            else if (pageArea.subDocument.isTextBox())
                textBoxPageAreas.push(pageArea);
        });
        return new LayoutOtherPageAreasInfo(headerPageArea, footerPageArea, textBoxPageAreas);
    }
    calculateContentIntervals(anchorObjectsPositionInfo, isUseMoreHardAlgorithm) {
        if (!this.flags.get(LayoutPageFlags.IsIntervalsCorrect)) {
            const startPos = this.getPosition();
            if (isUseMoreHardAlgorithm)
                this.contentIntervals = ContentIntervalCollector.getNoneTidyIntervals(this.mainSubDocumentPageAreas, this.contentIntervals[0].start);
            else {
                this.contentIntervals = new ContentIntervalCollector(this.mainSubDocumentPageAreas, this.contentIntervals[0].start).getIntervals();
                this.flags.set(LayoutPageFlags.IsIntervalsCorrect, true);
            }
            NumberMapUtils.forEach(this.anchoredObjectHolder.objects, (obj) => {
                if (obj.belongsToSubDocId == SubDocument.MAIN_SUBDOCUMENT_ID)
                    this.contentIntervals.push(new FixedInterval(anchorObjectsPositionInfo.getPosition(obj.objectId), 1));
            });
            this.contentIntervals = IntervalAlgorithms.getMergedIntervals(this.contentIntervals, true);
            const diff = startPos - this.contentIntervals[0].start;
            if (diff > 0) {
                for (let pa of this.mainSubDocumentPageAreas)
                    pa.pageOffset = diff;
            }
        }
    }
    getContentIntervals() {
        return this.contentIntervals;
    }
    static getFirstPageInGroup(pages, pageIndex) {
        for (; pageIndex >= 0; pageIndex--) {
            const page = pages[pageIndex];
            const firstColumn = page.mainSubDocumentPageAreas[0].columns[0];
            if (!firstColumn.rows[0] || !firstColumn.rows[0].tableCellInfo)
                return page;
            const tblFirstRowCells = firstColumn.tablesInfo[0].tableRows[0].rowCells;
            let isAllCellsStartOnThisPage = true;
            for (let cell of tblFirstRowCells)
                isAllCellsStartOnThisPage = isAllCellsStartOnThisPage && cell.boundFlags.get(TableCellBoundFlags.StartOnThisColumn);
            if (isAllCellsStartOnThisPage)
                return page;
        }
        return pages[0];
    }
    static getLastValidPageInGroup(pages, pageIndex, validPageCount, checkValid, tryFindPage) {
        let prevPage = pages[pageIndex];
        for (; pageIndex < pages.length; pageIndex++) {
            const page = pages[pageIndex];
            if (checkValid && (!page.isValid || page.index >= validPageCount))
                return tryFindPage ? prevPage : null;
            const lastRow = ListUtils.last(ListUtils.last(ListUtils.last(page.mainSubDocumentPageAreas).columns).rows);
            if (!lastRow || !lastRow.tableCellInfo)
                return page;
            const cells = lastRow.tableCellInfo ? ContentIntervalCollector.getTopLevelTableRow(lastRow.tableCellInfo.parentRow).rowCells : [];
            let isAllCellsEndOnThisPage = true;
            for (let cell of cells)
                isAllCellsEndOnThisPage = isAllCellsEndOnThisPage && cell.boundFlags.get(TableCellBoundFlags.EndOnThisColumn);
            if (isAllCellsEndOnThisPage)
                return page;
            prevPage = pages[pageIndex];
        }
        return ListUtils.last(pages);
    }
    getEndPosition() {
        return this.getPosition() + ListUtils.last(this.mainSubDocumentPageAreas).getEndPosition();
    }
    static getPrevPageLastPosition(pages, currPageIndex) {
        const prevPage = pages[currPageIndex - 1];
        return prevPage ? prevPage.getEndPosition() : 0;
    }
}
class ContentIntervalCollector {
    constructor(mainSubDocumentPageAreas, startPagePos) {
        this.extendInfo = [];
        this.startPagePos = startPagePos;
        this.cellIterator = new CellIteratorPosition(mainSubDocumentPageAreas);
        this.intervals = [];
    }
    static getNoneTidyIntervals(mainSubDocumentPageAreas, startPagePos) {
        const intervals = [];
        for (let pageArea of mainSubDocumentPageAreas) {
            for (let column of pageArea.columns) {
                const partialOffset = startPagePos + pageArea.pageOffset + column.pageAreaOffset;
                for (let row of column.rows) {
                    const lastBox = ListUtils.last(row.boxes);
                    intervals.push(new FixedInterval(partialOffset + row.columnOffset + row.boxes[0].rowOffset, lastBox.rowOffset + lastBox.getLength()));
                }
            }
        }
        return IntervalAlgorithms.getMergedIntervals(intervals, false);
    }
    startInterval(startPos) {
        if (this.intervals.length > 0) {
            const lastInterval = ListUtils.last(this.intervals);
            if (lastInterval.end == startPos) {
                this.currInterval = lastInterval;
                return;
            }
        }
        this.currInterval = new FixedInterval(startPos, 0);
        this.intervals.push(this.currInterval);
    }
    extendInterval(toPos) {
        this.currInterval.length = Math.max(this.currInterval.length, toPos - this.currInterval.start);
    }
    startExtend() {
        const flags = this.cellIterator.tableCell.boundFlags;
        this.extendInfo.push(new ExtendCellInfo(this.getPosition(ContentIntervalCollector.getCellLastRowEndPosition), this.cellIterator.tableColumn.logicInfo.grid.table.nestedLevel, !(flags.get(TableCellBoundFlags.StartOnThisColumn) && flags.get(TableCellBoundFlags.EndOnThisColumn)), this.cellIterator.tableCell, this.startPagePos + this.cellIterator.pageArea.pageOffset + this.cellIterator.column.pageAreaOffset));
    }
    finishExtend(force) {
        const actualLevel = force ? 0 : this.cellIterator.tableColumn.logicInfo.grid.table.nestedLevel;
        while (this.currInterval && this.extendInfo.length > 0) {
            const info = this.extendInfo.pop();
            if (actualLevel <= info.level) {
                if (info.endOfCellPos >= 0)
                    this.extendInterval(info.endOfCellPos);
                if (info.isStartNewInterval)
                    this.currInterval = null;
            }
            else {
                this.extendInfo.push(info);
                break;
            }
        }
    }
    getPosition(additionalInc) {
        const addInc = additionalInc(this.cellIterator);
        if (addInc == -1)
            return -1;
        return this.startPagePos + this.cellIterator.pageArea.pageOffset + this.cellIterator.column.pageAreaOffset + addInc;
    }
    getIntervals() {
        this.startInterval(this.startPagePos);
        while (this.cellIterator.moveNext()) {
            const cell = this.cellIterator.tableCell;
            const isFirstTopLevelCell = this.cellIterator.isFirstTopLevelCell;
            this.finishExtend(false);
            if (!this.currInterval) {
                if (isFirstTopLevelCell)
                    this.startInterval(ListUtils.last(this.intervals).end);
                else
                    this.startInterval(this.getPosition(ContentIntervalCollector.getCellFirstRowStartPos));
            }
            if (isFirstTopLevelCell)
                this.extendInterval(this.getPosition(ContentIntervalCollector.getCellFirstRowStartPos));
            if (!isFirstTopLevelCell && !cell.boundFlags.get(TableCellBoundFlags.StartOnThisColumn))
                this.startInterval(this.getPosition(ContentIntervalCollector.getCellFirstRowStartPos));
            this.startExtend();
        }
        this.finishExtend(true);
        this.handleLastExtends();
        const lastPos = this.startPagePos + ListUtils.last(this.cellIterator.pageAreas).getEndPosition();
        if (this.currInterval)
            this.extendInterval(lastPos);
        else
            this.addAdditionalInterval(lastPos);
        return IntervalAlgorithms.getMergedIntervals(this.intervals, true);
    }
    handleLastExtends() {
        if (this.extendInfo[0]) {
            for (let info; info = this.extendInfo.pop();) {
                const firstLayoutRow = info.cell.internalTables[info.cell.layoutRows.length] ? null :
                    ListUtils.reverseElementBy(info.cell.layoutRows, (_layoutRow, rowIndex) => !!info.cell.internalTables[rowIndex] || rowIndex == 0);
                if (firstLayoutRow) {
                    this.startInterval(info.columnOffsetPos + firstLayoutRow.getStartPosition());
                    this.extendInterval(info.endOfCellPos);
                }
            }
            this.currInterval = null;
        }
    }
    addAdditionalInterval(lastPos) {
        const pageArea = ListUtils.last(this.cellIterator.pageAreas);
        const column = ListUtils.last(pageArea.columns);
        const lastTableInfo = ListUtils.last(column.tablesInfo);
        if (!lastTableInfo)
            return;
        const row = ListUtils.last(ListUtils.last(lastTableInfo.getTopLevelColumn().tableRows).rowCells)
            .getLastLayoutRowIncludingInternalTables();
        const rowAfterTable = column.rows[row.indexInColumn + 1];
        if (!rowAfterTable)
            return;
        this.intervals.push(FixedInterval.fromPositions(this.startPagePos + pageArea.pageOffset + column.pageAreaOffset + rowAfterTable.getStartPosition(), lastPos));
    }
    static getCellLastRowEndPosition(cellIterator) {
        const lastRow = ListUtils.last(cellIterator.tableCell.layoutRows);
        return lastRow ? lastRow.getEndPosition() : -1;
    }
    static getCellFirstRowStartPos(cellIterator) {
        return cellIterator.tableCell.getFirstLayoutRowByModelPositionIncludingInternalTables().getStartPosition();
    }
    static getTopLevelTableRow(tableRow) {
        while (tableRow.parentTable.logicInfo.grid.table.nestedLevel > 0)
            tableRow = tableRow.parentTable.parentCell.parentRow;
        return tableRow;
    }
}
class ExtendCellInfo {
    constructor(pos, level, isStartNewInterval, cell, columnOffsetPos) {
        this.endOfCellPos = pos;
        this.level = level;
        this.isStartNewInterval = isStartNewInterval;
        this.cell = cell;
        this.columnOffsetPos = columnOffsetPos;
    }
}
class CellIteratorPosition {
    constructor(pageAreas) {
        this.pageAreaIndex = -1;
        this.tableIndexes = [];
        this.tableRowIndexes = [];
        this.tableCellIndexes = [];
        this.tableCellInternalTableIndexes = [];
        this.currLevel = 0;
        this.isInit = false;
        this.pageAreas = pageAreas;
    }
    get isFirstTopLevelCell() { return this._isFirstTopLevelCell; }
    moveNext() {
        if (!this.isInit) {
            this.isInit = true;
            return this.init();
        }
        return this.moveToNextTableCell();
    }
    init() {
        this.pageAreaIndex = 0;
        this.pageArea = this.pageAreas[0];
        this.columnIndex = -1;
        if (this.moveToNextColumnWithTable()) {
            this.initTopTableProperties(0);
            return true;
        }
        return false;
    }
    initTopTableProperties(tblIndexInColumn) {
        this.tableIndexes = [tblIndexInColumn, -1];
        this.tableColumn = this.column.tablesInfo[tblIndexInColumn];
        this.tableRowIndexes = [0];
        this.setTableRow(0);
        this.tableCellIndexes = [0];
        this.tableCell = this.tableRowCells[0];
        this._isFirstTopLevelCell = true;
        this.tableCellInternalTableIndexes = [];
        this.collectInternalTableIndexes();
    }
    moveToNextColumnWithTable() {
        if (this.column = this.pageArea.columns[++this.columnIndex])
            return this.column.tablesInfo.length > 0 ? true : this.moveToNextColumnWithTable();
        if (this.pageArea = this.pageAreas[++this.pageAreaIndex]) {
            this.columnIndex = -1;
            return this.moveToNextColumnWithTable();
        }
        return false;
    }
    moveToNextTableCell() {
        if (this.goToInternalTable() || this.goToNextTableCell() || this.goToNextTableRow())
            return true;
        return this.currLevel == 0 ? this.goToNextTopLevelTable() : this.goToTopLevel();
    }
    goToInternalTable() {
        const newInternalTblIndex = ListUtils.incLast(this.tableIndexes);
        const currLevelInternalTblIndexes = this.tableCellInternalTableIndexes[this.currLevel];
        if (newInternalTblIndex >= currLevelInternalTblIndexes.length)
            return false;
        this.tableColumn = this.tableCell.internalTables[currLevelInternalTblIndexes[newInternalTblIndex]];
        this.tableRowIndexes.push(0);
        this.setTableRow(0);
        this.tableCellIndexes.push(0);
        this.tableCell = this.tableRowCells[0];
        this._isFirstTopLevelCell = false;
        this.currLevel++;
        this.collectInternalTableIndexes();
        this.tableIndexes.push(-1);
        return true;
    }
    goToNextTableCell() {
        const nextCellIndex = ListUtils.incLast(this.tableCellIndexes);
        if (nextCellIndex >= this.tableRowCells.length)
            return false;
        this.tableCell = this.tableRowCells[nextCellIndex];
        this._isFirstTopLevelCell = false;
        this.tableCellInternalTableIndexes.pop();
        this.collectInternalTableIndexes();
        ListUtils.setLast(this.tableIndexes, -1);
        return true;
    }
    goToNextTableRow() {
        const nextRowIndex = ListUtils.incLast(this.tableRowIndexes);
        if (nextRowIndex >= this.tableColumn.tableRows.length)
            return false;
        this.setTableRow(nextRowIndex);
        ListUtils.setLast(this.tableCellIndexes, -1);
        return this.goToNextTableCell();
    }
    goToNextTopLevelTable() {
        this.tableIndexes[0] = this.getNextTopLevelTableIndexInThisColumn();
        if (this.tableIndexes[0] >= 0) {
            this.initTopTableProperties(this.tableIndexes[0]);
            return true;
        }
        if (!this.moveToNextColumnWithTable())
            return false;
        this.initTopTableProperties(0);
        return true;
    }
    goToTopLevel() {
        this.tableCellInternalTableIndexes.pop();
        this.tableCellIndexes.pop();
        this.tableRowIndexes.pop();
        this.tableIndexes.pop();
        this.currLevel--;
        this.tableCell = this.tableColumn.parentCell;
        this.tableRow = this.tableCell.parentRow;
        this.tableRowCells = this.getTableRowCells();
        this.tableColumn = this.tableRow.parentTable;
        return this.moveToNextTableCell();
    }
    getNextTopLevelTableIndexInThisColumn() {
        const tbls = this.column.tablesInfo;
        for (let tblIndex = this.tableIndexes[0] + 1; tblIndex < tbls.length; tblIndex++) {
            if (tbls[tblIndex].logicInfo.grid.table.nestedLevel == 0)
                return tblIndex;
        }
        return -1;
    }
    collectInternalTableIndexes() {
        const list = [];
        const intervalTables = this.tableCell.internalTables;
        for (let key in intervalTables) {
            if (!Object.prototype.hasOwnProperty.call(intervalTables, key))
                continue;
            list.push(parseInt(key));
        }
        list.sort(Comparers.number);
        this.tableCellInternalTableIndexes.push(list);
    }
    setTableRow(index) {
        this.tableRow = this.tableColumn.tableRows[index];
        this.tableRowCells = this.getTableRowCells();
    }
    getTableRowCells() {
        return ListUtils.shallowCopy(this.tableRow.rowCells).sort((a, b) => a.getFirstLayoutRowByModelPositionIncludingInternalTables().getStartPosition() -
            b.getFirstLayoutRowByModelPositionIncludingInternalTables().getStartPosition());
    }
}
