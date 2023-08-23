import { SubDocument } from '../../../core/model/sub-document';
import { Table } from '../../../core/model/tables/main-structures/table';
import { TableRow } from '../../../core/model/tables/main-structures/table-row';
import { SelectedTableInfo } from '../../../core/selection/selected-cells-engine';
import { ICommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { RowCommandBase } from './row-command-base';
export declare abstract class InsertTableRowCommandBase extends RowCommandBase<SimpleCommandState> {
    getState(): SimpleCommandState;
    isEnabled(): boolean;
    executeCore(_state: SimpleCommandState, options: ICommandOptions): boolean;
    protected abstract insertTableRowCore(subDocument: SubDocument, table: Table, patternRowIndex: number): TableRow;
    protected abstract getPatternRowIndex(tableInfo: SelectedTableInfo): number;
}
export declare class InsertTableRowAboveCommand extends InsertTableRowCommandBase {
    protected insertTableRowCore(subDocument: SubDocument, table: Table, patternRowIndex: number): TableRow;
    protected getPatternRowIndex(tableInfo: SelectedTableInfo): number;
}
export declare class InsertTableRowBelowCommand extends InsertTableRowCommandBase {
    protected insertTableRowCore(subDocument: SubDocument, table: Table, patternRowIndex: number): TableRow;
    protected getPatternRowIndex(tableInfo: SelectedTableInfo): number;
}
//# sourceMappingURL=insert-table-row-commands.d.ts.map