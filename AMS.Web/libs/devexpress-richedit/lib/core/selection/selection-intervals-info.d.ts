import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ISubDocumentInterval, ISubDocumentIntervals, ISubDocumentPosition, SubDocument, SubDocumentInterval, SubDocumentIntervals, SubDocumentPosition } from '../model/sub-document';
import { SelectedTableInfo } from './selected-cells-engine';
import { SelectedSpecialRunInfo } from './selected-special-run-info';
export declare class SelectionIntervalsInfo implements ISubDocumentPosition, ISubDocumentInterval, ISubDocumentIntervals {
    private _intervals;
    private _tableInfo;
    specialRunInfo: SelectedSpecialRunInfo;
    private _subDocument;
    lastIntervalIndex: number;
    resetTableInfo(): void;
    get tableInfo(): SelectedTableInfo;
    get subDocument(): SubDocument;
    set subDocument(value: SubDocument);
    get intervals(): FixedInterval[];
    set intervals(val: FixedInterval[]);
    get interval(): FixedInterval;
    set interval(val: FixedInterval);
    get position(): number;
    set position(val: number);
    get subDocIntervals(): SubDocumentIntervals;
    get subDocInterval(): SubDocumentInterval;
    get subDocPosition(): SubDocumentPosition;
    get multiselection(): boolean;
    get isCollapsed(): boolean;
    constructor(subDocument: SubDocument, intervals: FixedInterval[], lastIntervalIndex?: number);
    static fromPosition(subDocument: SubDocument, position: number): SelectionIntervalsInfo;
    static fromInterval(subDocument: SubDocument, interval: FixedInterval): SelectionIntervalsInfo;
    validateInterval(): void;
    equals(obj: SelectionIntervalsInfo): boolean;
    clone(): SelectionIntervalsInfo;
}
//# sourceMappingURL=selection-intervals-info.d.ts.map