import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ICloneable, IEquatable, ISupportCopyFrom } from '@devexpress/utils/lib/types';
import { BorderInfo } from '../../borders/border-info';
import { PositionManager } from '../../position/position-manager';
import { SubDocument } from '../../sub-document';
import { TableProperties } from '../properties/table-properties';
import { TableLayoutType, TableLookTypes, TableRowAlignment } from '../secondary-structures/table-base-structures';
import { TableWidthUnit } from '../secondary-structures/table-units';
import { TableStyle } from '../styles/table-style';
import { TableCell } from './table-cell';
import { TableRow } from './table-row';
export declare class Table {
    index: number;
    style: TableStyle;
    nestedLevel: number;
    parentCell: TableCell;
    rows: TableRow[];
    preferredWidth: TableWidthUnit;
    properties: TableProperties;
    lookTypes: TableLookTypes;
    constructor(properties: TableProperties, style: TableStyle);
    getTotalVirtualColumnsCount(): number;
    destructor(positionManager: PositionManager): void;
    get interval(): FixedInterval;
    getParentTable(): Table;
    getTopLevelParent(): Table;
    getStartPosition(): number;
    getEndPosition(): number;
    getLastCell(): TableCell;
    getFirstCell(): TableCell;
    getActualLeftBorder(defaultTableProperties: TableProperties, isTableOuterBorder?: boolean): BorderInfo;
    getActualRightBorder(defaultTableProperties: TableProperties, isTableOuterBorder?: boolean): BorderInfo;
    getActualBottomBorder(defaultTableProperties: TableProperties, isTableOuterBorder?: boolean): BorderInfo;
    getActualTopBorder(defaultTableProperties: TableProperties, isTableOuterBorder?: boolean): BorderInfo;
    getActualHorizontalBorder(defaultTableProperties: TableProperties): BorderInfo;
    getActualVerticalBorder(defaultTableProperties: TableProperties): BorderInfo;
    private getActualBorderCore;
    getActualLeftMargin(defaultTableProperties: TableProperties): TableWidthUnit;
    getActualRightMargin(defaultTableProperties: TableProperties): TableWidthUnit;
    getActualTopMargin(defaultTableProperties: TableProperties): TableWidthUnit;
    getActualBottomMargin(defaultTableProperties: TableProperties): TableWidthUnit;
    private getActualMarginCore;
    getActualTableAlignment(): TableRowAlignment;
    getActualTableIndent(defaultTableProperties: TableProperties): TableWidthUnit;
    getActualTableLayout(defaultTableProperties: TableProperties): TableLayoutType;
    static comparer(a: Table, b: Table): number;
    static sort(tables: Table[]): void;
    static advanceIndices(tables: Table[], startIndex: number, shift: number): void;
    static fillTableByLevels(subDocument: SubDocument): void;
    static getTableCellByPosition(tables: Table[], position: number): TableCell;
    static getTableCellByPositionFromTable(table: Table, position: number): TableCell;
    static getTableByPosition(tables: Table[], position: number, maxNestedLevel: boolean, tableIndex?: number): Table;
    static correctBoundTable(tables: Table[], tableIndex: number, position: number, indexIterator: (index: number) => number): Table;
    static getFirstCellPositionInVerticalMergingGroup(tablePosition: TablePosition): TablePosition;
    clone(subDocument: SubDocument): Table;
}
export declare class TablePositionIndexes implements ICloneable<TablePositionIndexes>, ISupportCopyFrom<TablePositionIndexes>, IEquatable<TablePositionIndexes> {
    rowIndex: number;
    cellIndex: number;
    constructor(rowIndex: number, cellIndex: number);
    equals(obj: TablePositionIndexes): boolean;
    copyFrom(obj: TablePositionIndexes): void;
    clone(): TablePositionIndexes;
}
export declare class TablePosition extends TablePositionIndexes implements ICloneable<TablePosition>, ISupportCopyFrom<TablePosition>, IEquatable<TablePosition> {
    table: Table;
    row: TableRow;
    cell: TableCell;
    constructor(table: Table, rowIndex: number, cellIndex: number);
    initIndexes(rowIndex: number, cellIndex: number): TablePosition;
    init(): TablePosition;
    setRow(rowIndex: number): TablePosition;
    setCell(cellIndex: number): void;
    static createAndInit(table: Table, rowIndex: number, cellIndex: number): TablePosition;
    static indexOfCell(positions: TablePosition[], cell: TableCell): number;
    moveToPrevRow(): boolean;
    moveToNextRow(): boolean;
    moveToNextCell(): boolean;
    copyFrom(obj: TablePosition): void;
    clone(): TablePosition;
    equals(obj: TablePosition): boolean;
}
//# sourceMappingURL=table.d.ts.map