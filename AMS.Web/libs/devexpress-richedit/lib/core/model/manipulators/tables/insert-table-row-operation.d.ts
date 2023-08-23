import { IModelManager } from '../../../model-manager';
import { SubDocument } from '../../sub-document';
import { Table } from '../../tables/main-structures/table';
import { TableCell } from '../../tables/main-structures/table-cell';
import { TableRow } from '../../tables/main-structures/table-row';
import { ModelManipulator } from '../model-manipulator';
export declare abstract class InsertTableRowOperationBase {
    modelManager: IModelManager;
    subDocument: SubDocument;
    get modelManipulator(): ModelManipulator;
    constructor(modelManager: IModelManager, subDocument: SubDocument);
    execute(table: Table, patternRowIndex: number): void;
    protected insertParagraphs(subDocument: SubDocument, insertPosition: {
        position: number;
        cell: TableCell;
    }, patternRow: TableRow): void;
    protected abstract correctVerticalMerging(subDocument: SubDocument, table: Table, patternRowIndex: number): any;
    protected abstract getInsertParagraphsPositionInfo(table: Table, patternRowIndex: number): {
        position: number;
        cell: TableCell;
    };
    protected abstract insertRowsCore(table: Table, patternRowIndex: number): number;
}
export declare class InsertTableRowAboveOperation extends InsertTableRowOperationBase {
    protected insertRowsCore(table: Table, patternRowIndex: number): number;
    protected getInsertParagraphsPositionInfo(table: Table, patternRowIndex: number): {
        position: number;
        cell: TableCell;
    };
    protected correctVerticalMerging(subDocument: SubDocument, table: Table, patternRowIndex: number): void;
}
export declare class InsertTableRowBelowOperation extends InsertTableRowOperationBase {
    protected insertRowsCore(table: Table, patternRowIndex: number): number;
    protected getInsertParagraphsPositionInfo(table: Table, patternRowIndex: number): {
        position: number;
        cell: TableCell;
    };
    protected correctVerticalMerging(subDocument: SubDocument, table: Table, patternRowIndex: number): void;
}
//# sourceMappingURL=insert-table-row-operation.d.ts.map