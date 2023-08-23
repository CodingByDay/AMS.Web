import { IsModified } from '../../../core/model/json/enums/json-top-level-enums';
import { SubDocument } from '../../../core/model/sub-document';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { CommandBase, CommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export declare class InsertParagraphCommand extends CommandBase<SimpleCommandState> {
    lock: boolean;
    getState(): SimpleCommandState;
    isEnabled(): boolean;
    executeCore(_state: SimpleCommandState, options: CommandOptions): boolean;
    lockBarHolderUpdate(prevModifiedState: IsModified): boolean;
    lockInputPositionUpdating(): boolean;
    tryInsertParagraphBeforeTable(interval: FixedInterval, subDocument: SubDocument): boolean;
}
//# sourceMappingURL=insert-paragraph-command.d.ts.map