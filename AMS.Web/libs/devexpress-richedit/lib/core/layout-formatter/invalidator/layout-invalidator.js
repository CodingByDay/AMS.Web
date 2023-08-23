import { Errors } from '@devexpress/utils/lib/errors';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { LayoutPositionCreatorConflictFlags, LayoutPositionMainSubDocumentCreator } from '../../layout-engine/layout-position-creator';
import { DocumentLayoutDetailsLevel } from '../../layout/document-layout-details-level';
import { LayoutAndModelPositions } from '../../layout/layout-position';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogObjToStr } from '../../rich-utils/debug/logger/base-logger/log-obj-to-str';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { HeaderFooterInvalidatorHelper } from './header-footer-invalidator-helper';
import { RemoveContentHelper } from './remove-content-helper';
export class LayoutInvalidator {
    constructor(manager) {
        this.manager = manager;
    }
    get model() { return this.manager.model; }
    get layout() { return this.manager.layout; }
    get mainSubDoc() { return this.model.mainSubDocument; }
    onContentInserted(subDocumentId, logPosition, length, restartFromParagraphStart) {
        const subDocument = this.model.subDocuments[subDocumentId];
        const pages = this.layout.pages;
        if (pages.length == 0)
            return;
        if (!subDocument.isMain()) {
            Log.print(LogSource.LayoutFormatterInvalidator, "onContentInserted(header\\footer\\textBox)", `subDocument.id:${subDocument.id}, logPosition:${logPosition}, length:${length}, restartFromParagraphStart:${restartFromParagraphStart}`);
            this.otherSubDocChanged();
            return;
        }
        const interval = new FixedInterval(logPosition, length);
        if (length > 0)
            this.contentOfMainSubDocumentInsertedOrDeleted(interval, restartFromParagraphStart, (lp) => this.advanceForward(lp, length));
        else if (length < 0)
            this.contentOfMainSubDocumentInsertedOrDeleted(interval, restartFromParagraphStart, (lp) => RemoveContentHelper.deleteInterval(this.layout, lp, interval, this.manager.changesManager.getPageChanges()));
        else
            throw new Error(Errors.InternalException);
    }
    contentOfMainSubDocumentInsertedOrDeleted(interval, restartFromParagraphStart, changeLayout) {
        Log.print(LogSource.LayoutFormatterInvalidator, "contentInserted", `subDocument.id:${0}, logPosition:${interval.start}, length:${interval.length}, restartFromParagraphStart:${restartFromParagraphStart}`);
        const positions = [];
        if (restartFromParagraphStart)
            this.addRestartFromParagraph(positions, interval.start);
        const lp = this.findLayoutPositionInAllLayout(this.mainSubDoc, interval.start, DocumentLayoutDetailsLevel.Row, false, true);
        const isValid = lp.page.isValid;
        lp.page.invalidate();
        positions.push(this.prevRowPositions(lp));
        changeLayout(lp);
        if (!isValid) {
            const poss = ListUtils.last(positions);
            poss.modelPosition = poss.layoutPosition.page.getPosition();
            poss.layoutPosition.initByIndexes(poss.layoutPosition.pageIndex, 0, 0, 0);
            poss.layoutPosition.applyObjectsAsMainSubDocument(this.layout, -1);
        }
        this.callRestart(positions);
    }
    onIntervalChanged(subDocumentId, interval) {
        const subDocument = this.model.subDocuments[subDocumentId];
        if (interval.length == 0 || !this.layout.pages.length)
            return;
        if (!subDocument.isMain()) {
            Log.print(LogSource.LayoutFormatterInvalidator, "onIntervalChanged(header\\footer)", `subDocument.id:${subDocument.id}, interval:${LogObjToStr.fixedInterval(interval)}`);
            this.otherSubDocChanged();
            return;
        }
        Log.print(LogSource.LayoutFormatterInvalidator, "onIntervalChanged", `subDocument.id:${subDocument.id}, interval:${LogObjToStr.fixedInterval(interval)}`);
        const lp = this.findLayoutPositionInAllLayout(subDocument, interval.start, DocumentLayoutDetailsLevel.Row, false, true);
        this.invalidatePagesByEndPosition(lp.pageIndex, interval.end);
        this.manager.restartManager.restartFromPage(lp.pageIndex, interval.start, false);
    }
    onChangedSections(startSectionIndex, endSectionIndex) {
        Log.print(LogSource.LayoutFormatterInvalidator, "onChangedSection", `sectionIndex:${startSectionIndex}-${endSectionIndex}`);
        const startSection = this.model.sections[startSectionIndex];
        const endSection = this.model.sections[endSectionIndex];
        const pages = this.layout.pages;
        const sectionStartPos = startSection.startLogPosition.value;
        const pageIndexStart = LayoutInvalidator.getSectionFirstPageIndex(pages, this.layout.validPageCount, startSection.startLogPosition.value);
        const secEndPos = endSection.getEndPosition();
        for (let pageIndex = pageIndexStart, page; (page = pages[pageIndex]) && page.getPosition() <= secEndPos; pageIndex++)
            page.invalidate();
        this.manager.restartManager.restartFromPage(pageIndexStart, sectionStartPos, true);
    }
    onListLevelChanged(newState) {
        Log.print(LogSource.LayoutFormatterInvalidator, "onListLevelChanged newState\n", LogObjToStr.historyItemState(LogObjToStr.historyItemListLevelStateObject, newState, "\t", "\n"));
        for (let obj of newState.objects) {
            NumberMapUtils.forEach(this.model.subDocuments, (subDocument) => {
                const abstractNumberingListIndex = obj.isAbstractNumberingList ?
                    obj.numberingListIndex :
                    subDocument.documentModel.numberingLists[obj.numberingListIndex].abstractNumberingListIndex;
                const listLevelIndex = obj.listLevelIndex;
                const intervals = [];
                for (let paragraph of subDocument.paragraphs) {
                    if (paragraph.getAbstractNumberingListIndex() === abstractNumberingListIndex &&
                        paragraph.getListLevelIndex() === listLevelIndex)
                        intervals.push(paragraph.interval);
                }
                if (intervals.length > 0) {
                    const mergedIntervals = IntervalAlgorithms.getMergedIntervals(intervals, true);
                    for (let interval of mergedIntervals)
                        this.onIntervalChanged(subDocument.id, interval);
                }
            });
        }
    }
    onHeaderFooterIndexChanged(sectionIndex, type) {
        const headerFooterInvalidatorHelper = new HeaderFooterInvalidatorHelper(this.model, this.layout, type);
        headerFooterInvalidatorHelper.initBySectionIndex(sectionIndex);
        const firstPage = this.layout.pages[headerFooterInvalidatorHelper.startPageIndex];
        if (!firstPage)
            return;
        ListUtils.forEach(this.layout.pages, (page) => page.invalidate(), headerFooterInvalidatorHelper.startPageIndex, headerFooterInvalidatorHelper.endPageIndex);
        this.manager.restartManager.restartFromPage(headerFooterInvalidatorHelper.startPageIndex, firstPage.getPosition(), true);
    }
    onPagesChanged(startPageIndex, endPageIndex) {
        const firstPage = this.layout.pages[startPageIndex];
        if (!firstPage)
            return;
        ListUtils.forEach(this.layout.pages, (page) => page.invalidate(), startPageIndex, endPageIndex);
        this.manager.restartManager.restartFromPage(startPageIndex, firstPage.getPosition(), true);
    }
    onChangedAllLayout() {
        Log.print(LogSource.LayoutFormatterInvalidator, "onChangedAllLayout", "");
        this.manager.restartManager.restartAllLayout();
    }
    prevRowPositions(layoutPos) {
        const prevLP = layoutPos.clone();
        prevLP.advanceToPrevRow(this.layout);
        const lp = prevLP.row.tableCellInfo && (!layoutPos.row.tableCellInfo ||
            layoutPos.row.tableCellInfo.parentRow.parentTable.getTopLevelColumn() !=
                prevLP.row.tableCellInfo.parentRow.parentTable.getTopLevelColumn()) ?
            layoutPos :
            prevLP;
        return new LayoutAndModelPositions(lp, this.getStartModelPositionOfRow(lp));
    }
    callRestart(positions) {
        const minMax = ListUtils.minMax(positions, a => a.modelPosition);
        const minPageIndex = minMax.minElement.layoutPosition.pageIndex;
        ListUtils.forEach(this.layout.pages, (page) => page.invalidate(), minPageIndex, minMax.maxElement.layoutPosition.pageIndex + 1);
        if (!this.layout.pages[minPageIndex])
            return;
        this.manager.restartManager.restartFromPage(minPageIndex, minMax.minElement.modelPosition, false);
    }
    advanceForward(layoutPos, length) {
        ListUtils.forEach(this.layout.pages, (page) => page.setAbsolutePosition(page.getPosition() + length), layoutPos.pageIndex + 1);
        this.moveRowsToRight(layoutPos, length);
        this.moveColumnsToRight(layoutPos, length);
        this.movePageAreasToRight(layoutPos, length);
    }
    moveRowsToRight(layoutPosition, offset) {
        const rows = layoutPosition.column.rows;
        for (let rowIndex = layoutPosition.rowIndex + 1, row; row = rows[rowIndex]; rowIndex++)
            row.columnOffset += offset;
    }
    moveColumnsToRight(layoutPosition, offset) {
        const columns = layoutPosition.pageArea.columns;
        for (let columnIndex = layoutPosition.columnIndex + 1, column; column = columns[columnIndex]; columnIndex++)
            column.pageAreaOffset += offset;
    }
    movePageAreasToRight(layoutPosition, offset) {
        const pageAreas = layoutPosition.page.mainSubDocumentPageAreas;
        ListUtils.forEach(pageAreas, (pa) => pa.pageOffset += offset, layoutPosition.pageAreaIndex + 1);
    }
    otherSubDocChanged() {
        ListUtils.forEach(this.layout.pages, (p) => p.invalidate());
        this.manager.restartManager.restartFromPage(0, 0, true);
    }
    static getSectionFirstPageIndex(pages, validPageCount, startSectionPos) {
        if (!validPageCount)
            return 0;
        const firstPageIndex = Math.max(0, SearchUtils.normedInterpolationIndexOf(pages, (p) => p.getPosition(), startSectionPos, 0, validPageCount - 1));
        return pages[firstPageIndex].getPosition() < startSectionPos ? Math.min(firstPageIndex + 1, validPageCount) : firstPageIndex;
    }
    invalidatePagesByEndPosition(startPageIndex, intervalEndPos) {
        this.invalidatePages(startPageIndex, (page) => intervalEndPos < page.getEndPosition());
    }
    invalidatePages(startPageIndex, endCondition) {
        const pages = this.layout.pages;
        for (let pageIndex = startPageIndex, page; page = pages[pageIndex]; pageIndex++) {
            page.invalidate();
            if (endCondition(page))
                break;
        }
    }
    findLayoutPositionInAllLayout(subDocument, pos, detailsLevel, endRowConflictFlags, middleRowConflictFlags) {
        const layout = this.layout;
        const realValidPageCount = layout.validPageCount;
        const realIsFullyFormatted = layout.isFullyFormatted;
        layout.validPageCount = layout.pages.length;
        layout.isFullyFormatted = true;
        const res = new LayoutPositionMainSubDocumentCreator(layout, subDocument, pos, detailsLevel, true)
            .create(new LayoutPositionCreatorConflictFlags().setDefault(endRowConflictFlags), new LayoutPositionCreatorConflictFlags().setDefault(middleRowConflictFlags));
        layout.validPageCount = realValidPageCount;
        layout.isFullyFormatted = realIsFullyFormatted;
        return res;
    }
    getStartModelPositionOfRow(lp) {
        var _a;
        const prevLP = lp.clone();
        if (prevLP.advanceToPrevRow(this.layout)) {
            const prevLPTblCellInfo = prevLP.row.tableCellInfo;
            if (!prevLPTblCellInfo)
                return prevLP.getLogPosition(DocumentLayoutDetailsLevel.Row) + prevLP.row.getLastBox().getEndPosition();
            const curLPTblCellInfo = (_a = lp.row) === null || _a === void 0 ? void 0 : _a.tableCellInfo;
            const curTopLevelColumn = curLPTblCellInfo ? curLPTblCellInfo.parentRow.parentTable.getTopLevelColumn() : null;
            const prevTopLevelColumn = prevLPTblCellInfo ? prevLPTblCellInfo.parentRow.parentTable.getTopLevelColumn() : null;
            if (!curLPTblCellInfo || curTopLevelColumn.logicInfo != prevTopLevelColumn.logicInfo)
                return prevTopLevelColumn.logicInfo.grid.table.getEndPosition();
            return prevTopLevelColumn.logicInfo.grid.table.getStartPosition();
        }
        return 0;
    }
    extendByMultipageTables(pageIndex, minPosition, forceRestartFullPage) {
        const subDocument = this.model.mainSubDocument;
        if (!subDocument.tables.length)
            return -1;
        const page = this.layout.pages[pageIndex];
        if (!page)
            return -1;
        const table = this.isPageStartWithMultipageTable(page);
        if (!table)
            return -1;
        return minPosition < table.getEndPosition() || forceRestartFullPage ? table.getStartPosition() : table.getEndPosition();
    }
    isPageStartWithMultipageTable(page) {
        if (!page)
            return null;
        const fstPa = page.mainSubDocumentPageAreas[0];
        if (!fstPa)
            return null;
        const fstColumn = fstPa.columns[0];
        if (!fstColumn)
            return null;
        const fstRow = fstColumn.rows[0];
        if (!fstRow)
            return null;
        const tableCellInfo = fstRow.tableCellInfo;
        return LayoutInvalidator.isLayoutRowRowStartWithMultipageTable(fstRow) ?
            tableCellInfo.parentRow.parentTable.getTopLevelColumn().logicInfo.grid.table :
            null;
    }
    static isLayoutRowRowStartWithMultipageTable(layoutRow) {
        const tableCellInfo = layoutRow.tableCellInfo;
        return this.isTableCellIsPartOfMultipageTable(tableCellInfo);
    }
    static isTableCellIsPartOfMultipageTable(tableCellInfo) {
        return !!tableCellInfo && (tableCellInfo.parentRow.rowIndex != 0 || tableCellInfo.parentRow.parentTable.isBoundWithPrev() || this.isTableCellIsPartOfMultipageTable(tableCellInfo.parentRow.parentTable.parentCell));
    }
    addRestartFromParagraph(positions, logPosition) {
        const parStartPos = this.mainSubDoc.getParagraphByPosition(logPosition).startLogPosition.value;
        const layPosParStart = this.findLayoutPositionInAllLayout(this.mainSubDoc, parStartPos, DocumentLayoutDetailsLevel.Row, false, true);
        layPosParStart.page.invalidate();
        positions.push(this.prevRowPositions(layPosParStart));
    }
}
