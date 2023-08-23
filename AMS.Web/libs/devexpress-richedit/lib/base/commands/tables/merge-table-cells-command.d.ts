import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { CommandBase, ICommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export declare class MergeTableCellsCommand extends CommandBase<SimpleCommandState> {
    getState(): SimpleCommandState;
    isEnabled(): boolean;
    executeCore(_state: SimpleCommandState, options: ICommandOptions): boolean;
    protected getIntervalsForModifying(): FixedInterval[];
    private mergeCellsHorizontally;
    private mergeCellsVertically;
}
//# sourceMappingURL=merge-table-cells-command.d.ts.map