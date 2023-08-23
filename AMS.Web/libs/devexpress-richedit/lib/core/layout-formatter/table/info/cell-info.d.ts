import { Offset } from '@devexpress/utils/lib/geometry/point';
import { LayoutTableCellInfo } from '../../../layout/table/layout-table-cell-info';
import { TablePositionIndexes } from '../../../model/tables/main-structures/table';
import { TableCell } from '../../../model/tables/main-structures/table-cell';
import { Formatter } from '../formatter';
import { RowInfo } from './row-info';
import { TableInfo } from './table-info';
export declare class CellInfo {
    private _xInterval;
    private _xContentInterval;
    private _heightBeforeContent;
    private _heightAfterContent;
    private _isStartOnThisColumn;
    private _currLayoutTableCellInfo;
    private _contentModelPosition;
    private _savedContentModelPosition;
    private _innerFormatter;
    private _minBottomPosition;
    private _marginLeft;
    private _marginRight;
    private _formattingSuspended;
    actualCellInfo: CellInfo;
    cellIndex: number;
    rowInfo: RowInfo;
    getContentModelPosition(maxNestedLevel: number): number;
    private get xContentInterval();
    private get xInterval();
    get currLayoutRowContentWidth(): number;
    get nestedTableMaxWidth(): number;
    getCurrLayoutRowOffset(considerInnerFormatter: boolean): Offset;
    get isSomeLayoutRowsPlaced(): boolean;
    get heightBeforeContent(): number;
    get heightAfterContent(): number;
    get tableInfo(): TableInfo;
    get cell(): TableCell;
    get isContendFullyPlaced(): boolean;
    get formattingSuspended(): boolean;
    get currLayoutTableCellInfo(): LayoutTableCellInfo;
    get contentModelPosition(): number;
    get actualTableIndexes(): TablePositionIndexes;
    get minBottomPosition(): number;
    get innerFormatter(): Formatter;
    set innerFormatter(val: Formatter);
    set isStartOnThisColumn(val: boolean);
    set minBottomPosition(val: number);
    get marginLeft(): number;
    get marginRight(): number;
    constructor(cellIndex: number, rowInfo: RowInfo);
    private getActuallCellInfo;
    cellFullyFormatted(): void;
    cellPartiallyFormatted(endPos: number): void;
    undoContentModelPosition(): void;
    storeContentModelPosition(): void;
    private init;
    initLayoutInfo(): void;
    clearLayoutInfo(): void;
    suspendFormatting(): void;
    resumeFormatting(): void;
}
//# sourceMappingURL=cell-info.d.ts.map