import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SubDocumentInterval, SubDocumentIntervals, SubDocumentPosition } from '../model/sub-document';
import { SelectedCellsCalculator } from './selected-cells-engine';
import { SelectedSpecialRunInfo } from './selected-special-run-info';
export class SelectionIntervalsInfo {
    constructor(subDocument, intervals, lastIntervalIndex = intervals.length - 1) {
        this.specialRunInfo = new SelectedSpecialRunInfo();
        this.subDocument = subDocument;
        this._intervals = intervals;
        this.lastIntervalIndex = lastIntervalIndex;
        this._tableInfo = null;
    }
    resetTableInfo() {
        this._tableInfo = null;
    }
    get tableInfo() {
        if (!this._tableInfo)
            this._tableInfo = new SelectedCellsCalculator().calculate(this.subDocument.tables, this.intervals);
        return this._tableInfo;
    }
    get subDocument() {
        var _a;
        return this._subDocument = (_a = this._subDocument) === null || _a === void 0 ? void 0 : _a.getActualSubDocument();
    }
    set subDocument(value) {
        this._subDocument = value;
    }
    get intervals() { return this._intervals; }
    set intervals(val) { this._intervals = val; this.lastIntervalIndex = val.length - 1; }
    get interval() { return this.intervals[this.lastIntervalIndex]; }
    set interval(val) { this._intervals = [val]; this.lastIntervalIndex = 0; }
    get position() { return this.interval.start; }
    set position(val) { this._intervals = [new FixedInterval(val, 0)]; this.lastIntervalIndex = 0; }
    get subDocIntervals() { return new SubDocumentIntervals(this.subDocument, ListUtils.deepCopy(this.intervals)); }
    get subDocInterval() { return new SubDocumentInterval(this.subDocument, this.interval.clone()); }
    get subDocPosition() { return new SubDocumentPosition(this.subDocument, this.position); }
    get multiselection() { return this.intervals.length > 1; }
    get isCollapsed() { return !this._intervals[1] && this._intervals[0].isCollapsed(); }
    static fromPosition(subDocument, position) {
        return new SelectionIntervalsInfo(subDocument, [new FixedInterval(position, 0)], 0);
    }
    static fromInterval(subDocument, interval) {
        return new SelectionIntervalsInfo(subDocument, [interval], 0);
    }
    validateInterval() {
        const docEnd = this.subDocument.getDocumentEndPosition();
        for (let curr of this.intervals) {
            curr.start = Math.max(docEnd - 1, curr.start);
            curr.end = Math.max(docEnd - 1, curr.end);
        }
    }
    equals(obj) {
        return obj &&
            this.subDocument.id == obj.subDocument.id &&
            obj._intervals && ListUtils.equals(this._intervals, obj._intervals) &&
            this.lastIntervalIndex == obj.lastIntervalIndex;
    }
    clone() {
        const obj = new SelectionIntervalsInfo(this.subDocument, ListUtils.deepCopy(this._intervals), this.lastIntervalIndex);
        obj._tableInfo = this._tableInfo;
        obj.specialRunInfo = this.specialRunInfo.clone();
        return obj;
    }
}
