import { SubDocument } from '../../../core/model/sub-document';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { Selection } from '../../selection/selection';
import { CommandBase, CommandOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { ICommandState } from '../i-command';
export declare class BackspaceCommand extends CommandBase<SimpleCommandState> {
    private _inputPositionCharProps;
    private _inputPositionParagraphProps;
    getState(): ICommandState;
    executeCore(_state: ICommandState, _options: CommandOptions): boolean;
    protected beforeExecute(): void;
    protected afterExecute(): void;
    private tryChangeParagraphAlignOrIndent;
    private tryChangeParagraphAlign;
    private tryDeleteList;
    private tryChangeParagraphIndent;
    static getIntervalAccordingFields(subDocument: SubDocument, selection: Selection, removingInterval: FixedInterval, selectInterval: boolean): FixedInterval;
}
//# sourceMappingURL=backspace-command.d.ts.map