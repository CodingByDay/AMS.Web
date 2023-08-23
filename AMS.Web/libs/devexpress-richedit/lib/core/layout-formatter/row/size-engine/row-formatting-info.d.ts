import { AnchorObjectBoundsInfo } from '../../floating/layout-row-bounds-manager';
import { TableCell } from '../../../model/tables/main-structures/table-cell';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
export declare class RowIntervalInfo extends FixedInterval {
    avaliableWidth: number;
    constructor(start: number, length: number, avaliableWidth?: number);
    get busyWidth(): number;
    get startOfFreeSpace(): number;
    isConsiderBoxes(): boolean;
}
export declare class RowFormattingInfo {
    private boundsOfAnchoredOblectsOnThisColumn;
    intervals: RowIntervalInfo[];
    currIndex: number;
    minY: number;
    height: number;
    outerHorizontalRowContentBounds: FixedInterval;
    lastNonEmptyIntervalIndex: number;
    tableCell: TableCell;
    private intersectsObjects;
    get isFloatingIntersectRow(): boolean;
    get lastNonEmptyInterval(): RowIntervalInfo;
    constructor(minY: number, height: number, outerHorizontalRowContentBounds: FixedInterval, boundsOfAnchoredOblectsOnThisColumn: AnchorObjectBoundsInfo[], tableCell: TableCell | null);
    get currInterval(): RowIntervalInfo;
    indexOfFreeInterval(width: number): number;
    indexOfIntervalContainsPositon(pos: number): number;
    calculate(): void;
    canIncrementHeightTo(newHeight: number): boolean;
    findNextYPos(): void;
    findNextYPosWhatHasNeededSpace(requiredWidth: number): void;
    private setIntersectObjects;
    private calcIntersectObjects;
    private resetMinY;
}
//# sourceMappingURL=row-formatting-info.d.ts.map