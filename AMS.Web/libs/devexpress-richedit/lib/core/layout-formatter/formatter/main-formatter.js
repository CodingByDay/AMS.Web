import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Constants } from '@devexpress/utils/lib/constants';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { isEven } from '@devexpress/utils/lib/utils/common';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { DocumentLayoutDetailsLevel } from '../../layout/document-layout-details-level';
import { LayoutPosition } from '../../layout/layout-position';
import { LayoutPage, LayoutPageFlags } from '../../layout/main-structures/layout-page';
import { LayoutRowStateFlags } from '../../layout/main-structures/layout-row';
import { LayoutTableColumnInfo } from '../../layout/table/layout-table-info';
import { SectionStartType } from '../../model/section/enums';
import { Section } from '../../model/section/section';
import { SectionProperties } from '../../model/section/section-properties';
import { SubDocument } from '../../model/sub-document';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogListHelper } from '../../rich-utils/debug/logger/base-logger/log-list-helper';
import { LogObjToStr } from '../../rich-utils/debug/logger/base-logger/log-obj-to-str';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
import { LogObjToStrLayout } from '../../rich-utils/debug/logger/layout-logger/log-obj-to-str-layout';
import { PageChangesCollector } from '../changes/engine/page-changes-collector';
import { BaseFormatter } from './base-formatter';
import { LayoutFormatterState } from './enums';
var TryReusePageResult;
(function (TryReusePageResult) {
    TryReusePageResult[TryReusePageResult["CreateNewPage"] = 1] = "CreateNewPage";
    TryReusePageResult[TryReusePageResult["UseOldPage"] = 2] = "UseOldPage";
    TryReusePageResult[TryReusePageResult["RestartFromTableStartPosition"] = 3] = "RestartFromTableStartPosition";
})(TryReusePageResult || (TryReusePageResult = {}));
export class MainFormatter extends BaseFormatter {
    constructor(formatterManager) {
        super(formatterManager, SubDocument.MAIN_SUBDOCUMENT_ID);
        this.state = LayoutFormatterState.DocumentStart;
        this.stateMap[LayoutFormatterState.DocumentStart] = this.processStateDocumentStart;
        this.stateMap[LayoutFormatterState.PageStart] = this.processStatePageStart;
        this.stateMap[LayoutFormatterState.PageAreaEnd] = this.processStatePageAreaEnd;
        this.stateMap[LayoutFormatterState.PageEnd] = this.processStatePageEnd;
        this.stateMap[LayoutFormatterState.DocumentEnd] = this.processStateDocumentEnd;
        this.stateMap[LayoutFormatterState.End] = this.processStateEnd;
    }
    formatNext() {
        do {
            if (!this.stateMap[this.state].call(this))
                return false;
        } while (MainFormatter.notAllowBreakOnState[this.state](this.layoutPosition));
        return true;
    }
    processStateDocumentStart() {
        this.manager.activeFormatter = this;
        this.initDocumentStart();
        this.layoutPosition = new LayoutPosition(DocumentLayoutDetailsLevel.None);
        this.layoutPosition.pageIndex = 0;
        this.state = LayoutFormatterState.PageStart;
        return true;
    }
    processStatePageStart() {
        this.manager.activeFormatter = this;
        const wrap = this.rowFormatter.iterator.getWrap(false);
        if (!wrap)
            return false;
        Log.print(LogSource.LayoutFormatter, "processStatePageStart", () => `SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        const pages = this.manager.layout.pages;
        const boundsCalculator = this.manager.boundsCalculator;
        const prevPage = pages[this.layoutPosition.pageIndex - 1];
        const layoutPageIndex = prevPage ? prevPage.layoutPageIndex + 1 : 0;
        boundsCalculator.initWhenPageStart(layoutPageIndex);
        const prevPageSection = !prevPage ? null : this.manager.model.getSectionByPosition(prevPage.getPosition());
        const currentPageSectionIndex = wrap.info.sectionIndex;
        const currentPageSection = this.manager.model.sections[currentPageSectionIndex];
        const isFirstPageOfSection = prevPageSection != currentPageSection;
        const isMirrorMargins = this.manager.model.mirrorMargins;
        if (this.manager.innerClientProperties.viewsSettings.isSimpleView) {
            const widthForSimpleView = this.manager.innerClientProperties.viewsSettings.widthOfPage;
            const section = new Section(currentPageSection.documentModel, currentPageSection.startLogPosition, currentPageSection.getLength(), SectionProperties.createSimpleSectionProperties(widthForSimpleView, Constants.MAX_SAFE_INTEGER));
            section.sectionProperties.margins.copyFrom(this.manager.innerClientProperties.viewsSettings.paddings);
            section.sectionProperties.margins.applyConverter(UnitConverter.pixelsToTwips);
            boundsCalculator.init(section);
            boundsCalculator.setHeaderBounds(0);
            boundsCalculator.setFooterBounds(0);
        }
        else if (isFirstPageOfSection || isMirrorMargins)
            boundsCalculator.init(currentPageSection);
        boundsCalculator.calculatePageBounds(prevPage ? prevPage.bottom : 0);
        const tryReuseResult = this.manager.floatingRestartInfoHolder.isRestartByAnchorObjects ?
            [TryReusePageResult.CreateNewPage] :
            this.tryReusePage(boundsCalculator.pageBounds);
        switch (tryReuseResult[0]) {
            case TryReusePageResult.CreateNewPage:
                this.createNextPage(boundsCalculator.pageBounds);
                this.manager.floatingRestartInfoHolder.setCalculatedObjects(this.layoutPosition);
                break;
            case TryReusePageResult.UseOldPage:
                break;
            case TryReusePageResult.RestartFromTableStartPosition:
                this.manager.invalidator.onIntervalChanged(this.subDocument.id, new FixedInterval(tryReuseResult[1], 1));
                return true;
        }
        const pageIndex = this.layoutPosition.pageIndex;
        const actualPage = this.layoutPosition.page;
        actualPage.flags.set(LayoutPageFlags.IsFirstPageOfSection, isFirstPageOfSection);
        actualPage.index = pageIndex;
        actualPage.layoutPageIndex = layoutPageIndex;
        actualPage.pageOrdinal = this.calculatePageOrdinal(prevPage, isFirstPageOfSection, currentPageSection);
        actualPage.startPageSectionIndex = currentPageSectionIndex;
        const isEvenPage = isEven(layoutPageIndex);
        if (prevPage && isFirstPageOfSection && ((currentPageSection.sectionProperties.startType === SectionStartType.EvenPage && !isEvenPage) ||
            (currentPageSection.sectionProperties.startType === SectionStartType.OddPage && isEvenPage)))
            actualPage.layoutPageIndex++;
        if (!this.manager.innerClientProperties.viewsSettings.isSimpleView) {
            this.formatOtherHeaderFooterPageArea(currentPageSection.headers, (obj) => this.manager.otherPageAreaFormatter.formatHeaderPageArea(actualPage, obj));
            if (this.manager.floatingRestartInfoHolder.isRestartByAnchorObjects)
                return true;
            this.formatOtherHeaderFooterPageArea(currentPageSection.footers, (obj) => this.manager.otherPageAreaFormatter.formatFooterPageArea(actualPage, obj));
            if (this.manager.floatingRestartInfoHolder.isRestartByAnchorObjects)
                return true;
        }
        boundsCalculator.calculateMainPageAreaBounds(-1);
        boundsCalculator.calculateColumnBounds(ListUtils.last(boundsCalculator.mainPageAreasBounds));
        this.pageAreaBounds = ListUtils.last(boundsCalculator.mainPageAreasBounds);
        this.columnBounds = ListUtils.last(boundsCalculator.mainColumnsBounds);
        return true;
    }
    calculatePageOrdinal(prevPage, firstPageOfSection, currentSection) {
        var _a;
        const nextPageOrdinalType = currentSection.sectionProperties.startType;
        let pageOrdinal;
        if (firstPageOfSection && !currentSection.sectionProperties.continueNumbering)
            pageOrdinal = currentSection.sectionProperties.firstPageNumber;
        else
            pageOrdinal = ((_a = prevPage === null || prevPage === void 0 ? void 0 : prevPage.pageOrdinal) !== null && _a !== void 0 ? _a : 0) + 1;
        const isPageOrdinalOdd = ((pageOrdinal) % 2) != 0;
        switch (nextPageOrdinalType) {
            case SectionStartType.OddPage:
                if (isPageOrdinalOdd)
                    return pageOrdinal;
                else
                    return pageOrdinal + 1;
            case SectionStartType.EvenPage:
                if (!isPageOrdinalOdd)
                    return pageOrdinal;
                else
                    return pageOrdinal + 1;
            default:
            case SectionStartType.Continuous:
                return pageOrdinal;
        }
    }
    processStatePageAreaEnd() {
        this.manager.activeFormatter = this;
        BaseFormatter.correctColumnOffsets(this.layoutPosition.pageArea);
        Log.print(LogSource.LayoutFormatter, "processStatePageAreaEnd", () => `SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.Page;
        this.state = LayoutFormatterState.PageEnd;
        return true;
    }
    processStatePageEnd() {
        this.manager.activeFormatter = this;
        const layout = this.manager.layout;
        Log.print(LogSource.LayoutFormatter, "processStatePageEnd", () => `SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        const createdPage = this.layoutPosition.page;
        createdPage.isValid = true;
        MainFormatter.correctPageOffsets(createdPage);
        this.state = this.lastRowInfo.row.flags.get(LayoutRowStateFlags.DocumentEnd) ?
            LayoutFormatterState.DocumentEnd : LayoutFormatterState.PageStart;
        if (!this.tableFormatter) {
            layout.validPageCount = this.layoutPosition.pageIndex + 1;
            layout.lastMaxNumPages = Math.max(layout.lastMaxNumPages, createdPage.layoutPageIndex + 1);
        }
        createdPage.calculateContentIntervals(this.manager.layout.anchorObjectsPositionInfo, false);
        createdPage.setRenderLevelCalculator(this.manager.layout.anchorObjectsPositionInfo, this.manager.model.compatibilitySettings.compatibilityMode);
        const pageChange = PageChangesCollector.collectPageChanges(layout.pages, createdPage);
        this.manager.changesManager.addPageChange(pageChange);
        this.copyFlagsFromOldPage(layout.pages[createdPage.index], createdPage);
        layout.pages[createdPage.index] = createdPage;
        const tblCellInfo = ListUtils.last(createdPage.mainSubDocumentPageAreas[0].columns[0].rows).tableCellInfo;
        if (!tblCellInfo ||
            tblCellInfo.parentRow.rowIndex == tblCellInfo.parentRow.parentTable.logicInfo.grid.table.rows.length - 1 &&
                !tblCellInfo.parentRow.parentTable.isBoundWithNext())
            this.manager.onPagesReady();
        this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.None;
        this.layoutPosition.pageIndex++;
        this.layoutPosition.page = null;
        return true;
    }
    processStateDocumentEnd() {
        this.manager.activeFormatter = this;
        Log.print(LogSource.LayoutFormatter, "processStateDocumentEnd", () => `SubDocId: ${this.subDocument.id}, LayPos: ${LogObjToStrLayout.layoutPositionShort(this.layoutPosition)}`);
        const layout = this.manager.layout;
        this.manager.removeRedundantHelper.removeRedundantPage(layout, layout.validPageCount);
        layout.isFullyFormatted = true;
        layout.lastMaxNumPages = ListUtils.last(this.manager.layout.pages).layoutPageIndex + 1;
        this.manager.layoutDependentRunCache.recalculateHeaderFooterPageAreas();
        this.manager.onPagesReady();
        Log.print(LogSource.LayoutFormatter, "processStateDocumentEnd(end)\n", Log.w(3, Log.join)("\n")(Log.map((page, index) => `\tPage[${index}]Intervals: ${LogListHelper.level_1(LogObjToStr.fixedInterval, page.getContentIntervals(), "\t\t", "\t")()}`, this.manager.layout.pages)));
        this.state = LayoutFormatterState.End;
        this.manager.anchoredObjectsManager.reset();
        return false;
    }
    processStateEnd() {
        return false;
    }
    copyFlagsFromOldPage(oldPage, createdPage) {
        if (oldPage) {
            const oldFlags = oldPage.flags.clone();
            oldFlags.set(LayoutPageFlags.IsFirstPageOfSection, createdPage.flags.get(LayoutPageFlags.IsFirstPageOfSection));
            oldFlags.set(LayoutPageFlags.IsIntervalsCorrect, createdPage.flags.get(LayoutPageFlags.IsIntervalsCorrect));
            createdPage.flags = oldFlags;
        }
    }
    createNextPage(pageBounds) {
        const newPage = new LayoutPage();
        newPage.setGeomerty(pageBounds);
        newPage.setAbsolutePosition(this.rowFormatter.getPosition());
        this.state = LayoutFormatterState.PageAreaStart;
        this.layoutPosition.page = newPage;
        this.layoutPosition.pageAreaIndex = 0;
        this.layoutPosition.pageArea = null;
        this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.Page;
    }
    tryReusePage(pageBounds) {
        const pages = this.manager.layout.pages;
        const page = pages[this.layoutPosition.pageIndex];
        if (!page || !page.isValid || this.tableFormatter || !page.equals(pageBounds) || page.getPosition() != this.rowFormatter.getPosition())
            return [TryReusePageResult.CreateNewPage];
        this.layoutPosition.pageAreaIndex = page.mainSubDocumentPageAreas.length - 1;
        const pageArea = ListUtils.last(page.mainSubDocumentPageAreas);
        const column = pageArea.getLastColumn();
        this.lastRowInfo.setRowInfo(column.getLastRow(), page.getPosition() + pageArea.pageOffset + column.pageAreaOffset, false);
        const firstBoundWithNextCellOnPage = LayoutTableColumnInfo.getFirstCellInPageThatBoundWithCellPlacedInNextPage(column.tablesInfo);
        const nextBoxIteratorPosition = firstBoundWithNextCellOnPage ?
            page.getPosition() + pageArea.pageOffset + column.pageAreaOffset + firstBoundWithNextCellOnPage.getEndPosition() :
            page.getEndPosition();
        const nextPage = this.manager.layout.pages[page.index + 1];
        const tableColumn = this.getLastWidowTableColumn(column);
        if (tableColumn &&
            (!nextPage || !nextPage.isValid || nextBoxIteratorPosition != nextPage.getPosition())) {
            return [TryReusePageResult.RestartFromTableStartPosition, this.getTableRestartPosition(tableColumn)];
        }
        this.rowFormatter.setPosition(nextBoxIteratorPosition, false, !this.tableFormatter);
        this.state = LayoutFormatterState.PageEnd;
        this.layoutPosition.detailsLevel = DocumentLayoutDetailsLevel.Page;
        this.layoutPosition.page = page.deepCopy();
        return [TryReusePageResult.UseOldPage];
    }
    getTableRestartPosition(tableColumn) {
        return tableColumn.getTopLevelColumn().logicInfo.grid.table.interval.start;
    }
    getLastWidowTableColumn(column) {
        if (!column.tablesInfo[0])
            return null;
        const index = this.getWidowTableLastColumnIndex(column);
        return column.tablesInfo[index];
    }
    getWidowTableLastColumnIndex(column) {
        const lastTable = column.tablesInfo[0].logicInfo.grid.table;
        for (let i = 1; i < column.tablesInfo.length; i++) {
            if (lastTable != column.tablesInfo[i].logicInfo.grid.table)
                return i - 1;
        }
        return column.tablesInfo.length - 1;
    }
    formatOtherHeaderFooterPageArea(container, format) {
        const isEvenPage = isEven(this.layoutPosition.page.layoutPageIndex);
        const isFirstPageOfSection = this.layoutPosition.page.flags.get(LayoutPageFlags.IsFirstPageOfSection);
        const actualObject = container.getActualObject(isFirstPageOfSection, isEvenPage);
        format(actualObject);
    }
    setParamsForRestart(state, newLp, newLastRowInfo, resetTableFormatter) {
        this.state = state;
        this.layoutPosition = newLp;
        this.lastRowInfo = newLastRowInfo;
        if (resetTableFormatter)
            this.tableFormatter = null;
    }
    setBoundsForRestart(pageAreaBounds, columnBounds) {
        this.pageAreaBounds = pageAreaBounds;
        this.columnBounds = columnBounds;
    }
    static correctPageOffsets(page) {
        const pageAreas = page.mainSubDocumentPageAreas;
        if (!pageAreas.length)
            return;
        const offsetFirstPageAreaFromPage = pageAreas[0].pageOffset;
        if (offsetFirstPageAreaFromPage != 0) {
            page.setAbsolutePosition(page.getPosition() + offsetFirstPageAreaFromPage);
            for (let pageArea of pageAreas)
                pageArea.pageOffset -= offsetFirstPageAreaFromPage;
        }
    }
}
MainFormatter.notAllowBreakOnState = {
    [LayoutFormatterState.DocumentStart]: (_lp) => true,
    [LayoutFormatterState.PageStart]: (lp) => lp.pageIndex == 0,
    [LayoutFormatterState.PageAreaStart]: (lp) => lp.pageAreaIndex == 0,
    [LayoutFormatterState.ColumnStart]: (lp) => lp.columnIndex == 0,
    [LayoutFormatterState.RowFormatting]: (lp) => lp.rowIndex == 0,
    [LayoutFormatterState.DocumentEnd]: (_lp) => false,
    [LayoutFormatterState.PageEnd]: (_lp) => false,
    [LayoutFormatterState.PageAreaEnd]: (_lp) => false,
    [LayoutFormatterState.ColumnEnd]: (_lp) => false,
};
