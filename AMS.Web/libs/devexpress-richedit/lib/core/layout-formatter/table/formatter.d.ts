import { Flag } from '@devexpress/utils/lib/class/flag';
import { Offset } from '@devexpress/utils/lib/geometry/point';
import { LayoutAnchoredObjectBox } from '../../layout/main-structures/layout-boxes/layout-anchored-object-box';
import { LayoutColumn } from '../../layout/main-structures/layout-column';
import { LayoutTableCellInfo } from '../../layout/table/layout-table-cell-info';
import { TablePosition } from '../../model/tables/main-structures/table';
import { TableWidthUnit } from '../../model/tables/secondary-structures/table-units';
import { BoxWrapInfo } from '../box/box-wrap';
import { RowFormatter } from '../row/formatter';
import { RowFormatterResult } from '../row/result';
import { TableInfo } from './info/table-info';
export declare enum AddRowToTableResult {
    None = 0,
    RowAdded = 1,
    TableFinished = 2,
    GoToNextColumn = 4
}
export declare class Formatter {
    private readonly _posToWaitingContinuedFormatterMap;
    private parentFormatter;
    tableInfo: TableInfo;
    private column;
    protected isFullyFormatted: boolean;
    protected _columnWasEmpty: boolean;
    protected get posToWaitingContinuedFormatterMap(): any;
    protected get needAddSomeLayoutRows(): boolean;
    private get noReadyTableRows();
    protected get columnWasEmpty(): boolean;
    get isCurrTableCellFirstInRow(): boolean;
    get isCurrTableRowIsFirstInTable(): boolean;
    get currLayoutRowOffset(): Offset;
    get currLayoutRowContentWidth(): number;
    get nestedTableMaxWidth(): number;
    private get nestedLevel();
    get isCurrLayoutRowIsFirstInCell(): boolean;
    get actualFormatter(): Formatter;
    private get position();
    private get grid();
    constructor(rowFormatter: RowFormatter, tablePositions: TablePosition[], column: LayoutColumn, tableMaxWidth: number, offset: Offset, parentCell: LayoutTableCellInfo, index: number, avaliableHeight: number, parentFormatter: Formatter);
    private getNestedTablePosition;
    private createInnerFormatter;
    private createNextCellFormatter;
    private resetPosition;
    initColumn(column: LayoutColumn, parentCell: LayoutTableCellInfo, avaliableHeight: number): void;
    columnStart(column: LayoutColumn, weNeedToGoDeeper?: boolean, yPos?: number, parentCell?: LayoutTableCellInfo, avaliableHeight?: number): void;
    findNextCell(result: Flag, info: BoxWrapInfo): void;
    private isCellFinished;
    private isLayoutRowIsLastOnCell;
    resetCaseInTextAnchorObject(info: BoxWrapInfo, obj: LayoutAnchoredObjectBox): boolean;
    applyResultOfTopLevelFormatters(result: Flag, info: BoxWrapInfo, lowLevelFormatters?: Formatter[]): void;
    private processResultOfTopLevelFormatter;
    private getRowHeight;
    addLayoutRow(rowResult: RowFormatterResult, info: BoxWrapInfo): Flag;
    private cantPlaceRow;
    private resetFromRow;
    private setNextCell;
    private finishCell;
    private cancelPlaceRow;
    private finishRow;
    columnEnd(): void;
    finishTable(): void;
    private getAvaliableSpaceForCellContent;
    private getCellContentMaxBottom;
    private setCellsHeight;
    private static getCellHeight;
    private setRowsVerticalBounds;
    private static setRowHeightInternal;
    private setRowHeightWhenRowBelongsToManyColumns;
    private setRowHeight;
    private extendCellHeightToRowHeight;
    private applyBottomHorizontalBordersChangesForPrevRow;
    static getCellMargin(cellMargin: TableWidthUnit): number;
}
//# sourceMappingURL=formatter.d.ts.map