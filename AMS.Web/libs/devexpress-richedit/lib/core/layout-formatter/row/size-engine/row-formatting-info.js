import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { Log } from '../../../rich-utils/debug/logger/base-logger/log';
import { LogObjToStr } from '../../../rich-utils/debug/logger/base-logger/log-obj-to-str';
import { LogSource } from '../../../rich-utils/debug/logger/base-logger/log-source';
import { RectangleUtils } from '../utils/rectangle-utils';
export class RowIntervalInfo extends FixedInterval {
    constructor(start, length, avaliableWidth = length) {
        super(start, length);
        this.avaliableWidth = avaliableWidth;
    }
    get busyWidth() {
        return this.length - this.avaliableWidth;
    }
    get startOfFreeSpace() {
        return this.start + this.busyWidth;
    }
    isConsiderBoxes() {
        return this.avaliableWidth != this.length;
    }
}
export class RowFormattingInfo {
    constructor(minY, height, outerHorizontalRowContentBounds, boundsOfAnchoredOblectsOnThisColumn, tableCell) {
        this.intervals = [];
        this.currIndex = 0;
        this.minY = minY;
        this.height = Math.max(1, height);
        this.outerHorizontalRowContentBounds = outerHorizontalRowContentBounds;
        this.boundsOfAnchoredOblectsOnThisColumn = boundsOfAnchoredOblectsOnThisColumn;
        this.tableCell = tableCell;
        this.lastNonEmptyIntervalIndex = 0;
    }
    get isFloatingIntersectRow() { return !!this.intersectsObjects.length; }
    get lastNonEmptyInterval() { return this.intervals[this.lastNonEmptyIntervalIndex]; }
    get currInterval() {
        return this.intervals[this.currIndex];
    }
    indexOfFreeInterval(width) {
        return ListUtils.indexBy(this.intervals, (curr) => curr.avaliableWidth >= width, this.currIndex);
    }
    indexOfIntervalContainsPositon(pos) {
        const ind = ListUtils.indexBy(this.intervals, (curr) => curr.start > pos || pos < curr.end, this.currIndex + 1);
        return ind < 0 ? this.intervals.length - 1 : ind;
    }
    calculate() {
        this.setIntersectObjects();
        const busyIntervals = IntervalAlgorithms.getMergedIntervals(ListUtils.map(this.intersectsObjects, (objBnds) => new FixedInterval(objBnds.x, objBnds.width)), true);
        const freeIntervals = IntervalAlgorithms.reflectIntervals(busyIntervals, this.outerHorizontalRowContentBounds);
        if (freeIntervals.length) {
            this.intervals = ListUtils.map(freeIntervals, (curr) => new RowIntervalInfo(curr.start, curr.length));
            return;
        }
        this.resetMinY(ListUtils.min);
        Log.print(LogSource.RowFormatter, "RowFormattingInfo.calculate ", `minY:${this.minY}, height:${this.height}, currIndex: ${this.currIndex} intervals:\n${Log.join("\n", ListUtils.map(this.intervals, (curr) => LogObjToStr.fixedInterval(curr)))}`);
    }
    canIncrementHeightTo(newHeight) {
        const contentBounds = ListUtils.map(this.intervals, (c) => new Rectangle(c.start, this.minY, c.busyWidth, newHeight));
        const intersectedObjects = this.calcIntersectObjects(newHeight);
        return !ListUtils.unsafeAnyOf(intersectedObjects, (ancBound) => ListUtils.unsafeAnyOf(contentBounds, (contentBound) => RectangleUtils.getNonCollapsedIntersection(contentBound, ancBound)));
    }
    findNextYPos() {
        this.resetMinY(ListUtils.min);
    }
    findNextYPosWhatHasNeededSpace(requiredWidth) {
        while (this.isFloatingIntersectRow && !ListUtils.anyOf(this.intervals, i => i.avaliableWidth >= requiredWidth))
            this.resetMinY(ListUtils.min);
        this.currIndex = 0;
    }
    setIntersectObjects() {
        this.intersectsObjects = this.calcIntersectObjects(this.height);
    }
    calcIntersectObjects(height) {
        const initRect = new Rectangle(this.outerHorizontalRowContentBounds.start, this.minY, this.outerHorizontalRowContentBounds.length, height);
        return ListUtils.reducedMap(this.boundsOfAnchoredOblectsOnThisColumn, (objInfo) => {
            if (this.tableCell !== objInfo.cell)
                return null;
            const rect = Rectangle.getNonCollapsedIntersection(initRect, objInfo.bounds);
            if (!rect)
                return null;
            if (!objInfo.canPutTextAtLeft) {
                const right = rect.right;
                rect.x = initRect.x;
                rect.width = right - rect.x;
            }
            if (!objInfo.canPutTextAtRight) {
                rect.width = initRect.right - rect.x;
            }
            return rect;
        });
    }
    resetMinY(getVal) {
        this.minY = getVal(this.intersectsObjects, a => a.bottom).bottom;
        this.calculate();
    }
}
