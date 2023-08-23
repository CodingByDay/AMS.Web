import { RendererClassNames } from '../../../../core/canvas/renderer-class-names';
import { ColumnChange } from '../../../../core/layout-formatter/changes/changes/column-change';
import { AnchoredPictureChange, LayoutChangeType, ParagraphFrameChangeSV, RowChangeSV, TableChangeSV } from '../../../../core/layout-formatter/changes/changes/layout-change-base';
import { PageAreaChange } from '../../../../core/layout-formatter/changes/changes/page-area-change';
import { PageChange } from '../../../../core/layout-formatter/changes/changes/page-change';
import { Log } from '../../../../core/rich-utils/debug/logger/base-logger/log';
import { LogListHelper } from '../../../../core/rich-utils/debug/logger/base-logger/log-list-helper';
import { LogSource } from '../../../../core/rich-utils/debug/logger/base-logger/log-source';
import { LogObjToStrLayout } from '../../../../core/rich-utils/debug/logger/layout-logger/log-obj-to-str-layout';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { BoundaryInterval } from '@devexpress/utils/lib/intervals/boundary';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { SparseIntervals } from '@devexpress/utils/lib/intervals/sparse/intervals';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { EnumUtils } from '@devexpress/utils/lib/utils/enum';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { RenderedCanvasObjectsInfo, SimpleViewChangesDataBase, VisibleCanvasObjectsInfo } from '../canvas-listener/simple-view-canvas-listener';
import { DocumentRenderer } from './document-renderer';
export class SimpleViewRenderer extends DocumentRenderer {
    constructor() {
        super(...arguments);
        this.rowIndexInterval = new BoundaryInterval(0, 0);
        this.paragraphFramesIndexInterval = new BoundaryInterval(0, 0);
        this.tableIndexInterval = new BoundaryInterval(0, 0);
        this.updateDataChunk = new VisibleCanvasObjectsInfo(new FixedInterval(0, 0), new FixedInterval(0, 0), new FixedInterval(0, 0), {}, {});
    }
    pageInserted(layoutPage, updateDataChunk) {
        this.updateDataChunk = updateDataChunk;
        this.renderPage(layoutPage, 0, true);
    }
    renderPageContentGetFloatingObjects(page) {
        const foMap = NumberMapUtils.shallowCopy(this.updateDataChunk.ancPictureObjs);
        NumberMapUtils.forEach(this.updateDataChunk.ancTextBoxObjs, (tb, key) => foMap[key] = tb);
        return page.anchoredObjectHolder.getObjectsForRenderer(this.viewManager.layout.anchorObjectsPositionInfo, foMap);
    }
    collectScrollChanges(oldInterval, newInterval, isAddUpdateChange, getConstructor) {
        const changes = [];
        const iter = new SparseIntervals(IntervalAlgorithms.getMergedIntervalsTemplate([oldInterval, newInterval], true, new BoundaryInterval(0, 0)))
            .getNativeIterator();
        for (let canvasElementIndex = 0; iter.moveNext();) {
            if (oldInterval.contains(iter.index)) {
                if (newInterval.contains(iter.index)) {
                    if (isAddUpdateChange)
                        changes.push(new getConstructor(iter.index, canvasElementIndex, LayoutChangeType.Updated));
                    canvasElementIndex++;
                }
                else {
                    if (iter.index < newInterval.start)
                        changes.push(new getConstructor(iter.index, canvasElementIndex, LayoutChangeType.Deleted));
                    else
                        do
                            changes.push(new getConstructor(iter.index, newInterval.length, LayoutChangeType.Deleted));
                        while (iter.moveNext());
                }
            }
            else
                changes.push(new getConstructor(iter.index, canvasElementIndex++, LayoutChangeType.Inserted));
        }
        return changes;
    }
    collectScrollChangesMap(oldObjects, newObjects, isAddUpdateChange, isTextBoxes, getConstructor) {
        let list = [];
        NumberMapUtils.forEach(oldObjects, (obj) => list.push(obj.objectId));
        NumberMapUtils.forEach(newObjects, (obj) => list.push(obj.objectId));
        list = ListUtils.uniqueNumber(list);
        const changes = [];
        ListUtils.forEach(list, (objectId) => {
            if (oldObjects[objectId] !== undefined) {
                if (newObjects[objectId] !== undefined) {
                    if (isAddUpdateChange)
                        changes.push(new getConstructor(isTextBoxes ? newObjects[objectId].internalSubDocId : objectId, LayoutChangeType.Updated));
                }
                else
                    changes.push(new getConstructor(isTextBoxes ? oldObjects[objectId].internalSubDocId : objectId, LayoutChangeType.Deleted));
            }
            else
                changes.push(new getConstructor(isTextBoxes ? newObjects[objectId].internalSubDocId : objectId, LayoutChangeType.Inserted));
        });
        return changes;
    }
    collectAllScrollChanges(newUpdateDataChunk, isAddUpdateChange) {
        return new RenderedCanvasObjectsInfo(this.collectScrollChanges(this.updateDataChunk.rows, newUpdateDataChunk.rows, isAddUpdateChange, RowChangeSV), this.collectScrollChanges(this.updateDataChunk.tables, newUpdateDataChunk.tables, isAddUpdateChange, TableChangeSV), this.collectScrollChanges(this.updateDataChunk.parFrames, newUpdateDataChunk.parFrames, isAddUpdateChange, ParagraphFrameChangeSV), this.collectScrollChangesMap(this.updateDataChunk.ancPictureObjs, newUpdateDataChunk.ancPictureObjs, isAddUpdateChange, false, AnchoredPictureChange), this.collectScrollChangesMap(this.updateDataChunk.ancTextBoxObjs, newUpdateDataChunk.ancTextBoxObjs, isAddUpdateChange, true, PageAreaChange));
    }
    pageScrolled(layoutPage, newUpdateDataChunk) {
        const changes = this.collectAllScrollChanges(newUpdateDataChunk, false);
        const pc = this.makePageChange(changes);
        Log.print(LogSource.SimpleViewRenderer, "mergedPageChanges - Changes\n", LogListHelper.level_1((change) => LogObjToStrLayout.pageChange(change, ""), [pc], "", "\n"));
        this.applyPageChange(layoutPage, pc);
        this.updateDataChunk = newUpdateDataChunk;
    }
    applyFormatterChanges(formatterChanges, scrollChanges) {
        if (!scrollChanges.length || !formatterChanges.length)
            return;
        const mm = ListUtils.minMaxExtended(scrollChanges, (v) => v.layoutIndex);
        const visibleObjectsInterval = new BoundaryInterval(mm.minValue, mm.maxValue + 1);
        const isObjectMustBeReplaced = ListUtils.accumulate(formatterChanges, {}, (acc, c) => {
            if (c.changeType == LayoutChangeType.Replaced && visibleObjectsInterval.contains(c.layoutIndex))
                acc[c.layoutIndex] = true;
            return acc;
        });
        for (let scrollChange of scrollChanges)
            if (isObjectMustBeReplaced[scrollChange.layoutIndex] && scrollChange.changeType != LayoutChangeType.Inserted)
                scrollChange.changeType = LayoutChangeType.Replaced;
    }
    applyFormatterChangesMap(formatterChanges, scrollChanges) {
        const map = ListUtils.accumulate(scrollChanges, {}, (acc, c) => {
            acc[c.layoutIndex] = c;
            return acc;
        });
        ListUtils.forEach(formatterChanges, (fc) => {
            const scrollChange = map[fc.layoutIndex];
            if (scrollChange && !EnumUtils.isAnyOf(scrollChange.changeType, LayoutChangeType.Deleted, LayoutChangeType.Inserted))
                if (scrollChange && scrollChange.changeType != LayoutChangeType.Deleted)
                    scrollChange.changeType = LayoutChangeType.Replaced;
            if (fc.changeType == LayoutChangeType.Updated && fc instanceof PageAreaChange)
                if (scrollChange && scrollChange instanceof PageAreaChange && scrollChange.changeType == LayoutChangeType.Updated)
                    scrollChange.columnChanges = fc.columnChanges;
        });
    }
    makePageChange(changes) {
        const cc = [new ColumnChange(0, LayoutChangeType.Updated, changes.rows, changes.tables, changes.parFrames)];
        const pac = [new PageAreaChange(0, LayoutChangeType.Updated, cc)];
        const pc = new PageChange(0, LayoutChangeType.Updated, pac, changes.ancTextBoxObjs);
        pc.anchoredPictureChanges = changes.ancPictureObjs;
        return pc;
    }
    pageUpdated(pageChange, newUpdateDataChunk) {
        const changes = this.collectAllScrollChanges(newUpdateDataChunk, true);
        if (pageChange.mainPageAreaChanges.length) {
            this.applyFormatterChanges(pageChange.mainPageAreaChanges[0].columnChanges[0].rowChanges, changes.rows);
            this.applyFormatterChanges(pageChange.mainPageAreaChanges[0].columnChanges[0].paragraphFrameChanges, changes.parFrames);
            this.applyFormatterChanges(pageChange.mainPageAreaChanges[0].columnChanges[0].tableChanges, changes.tables);
        }
        this.applyFormatterChangesMap(pageChange.anchoredPictureChanges, changes.ancPictureObjs);
        this.applyFormatterChangesMap(pageChange.otherPageAreaChanges, changes.ancTextBoxObjs);
        const pc = this.makePageChange(changes);
        Log.print(LogSource.SimpleViewRenderer, "mergedPageChanges - Changes\n", LogListHelper.level_1((change) => LogObjToStrLayout.pageChange(change, ""), [pc], "", "\n"));
        this.applyPageChange(this.viewManager.layout.pages[0], pc);
        this.updateDataChunk = newUpdateDataChunk;
    }
    renderColumn(column, level, isMainPageArea) {
        const columnElement = DocumentRenderer.renderContainer(RendererClassNames.COLUMN);
        DomUtils.setStyleSizeAndPosition(columnElement.style, column);
        const rowsContainer = columnElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.ROWS_CONTAINER));
        const paragraphFramesContainer = columnElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.PARAGRAPHFRAMES_CONTAINER));
        const tablesContainer = columnElement.appendChild(DocumentRenderer.renderContainer(RendererClassNames.TABLES_CONTAINER));
        const bounds = isMainPageArea ?
            this.updateDataChunk :
            new SimpleViewChangesDataBase(new BoundaryInterval(0, column.rows.length), new BoundaryInterval(0, column.tablesInfo.length), new BoundaryInterval(0, column.paragraphFrames.length));
        ListUtils.forEach(column.rows, (row) => rowsContainer.appendChild(this.renderRow(row, level)), bounds.rows.start, bounds.rows.end);
        ListUtils.forEach(column.paragraphFrames, (pf) => paragraphFramesContainer.appendChild(DocumentRenderer.renderParagraphFrame(pf, level)), bounds.parFrames.start, bounds.parFrames.end);
        ListUtils.forEach(column.tablesInfo, (t) => tablesContainer.appendChild(DocumentRenderer.renderTable(t, level, this.viewManager.innerClientProperties.showTableGridLines)), bounds.tables.start, bounds.tables.end);
        return columnElement;
    }
}
