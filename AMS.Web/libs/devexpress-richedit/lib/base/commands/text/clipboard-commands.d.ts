import { RangeCopy } from '../../../core/model/manipulators/range/create-range-copy-operation';
import { IRichEditControl } from '../../interfaces/i-rich-edit-core';
import { CommandBase, CommandSimpleOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
export declare class ClipboardCommand extends CommandBase<SimpleCommandState> {
    protected static additionalWaitingTimeForMac: number;
    queryCommandId: string;
    static builtInClipboard: BuiltInClipboard;
    static timeout: number;
    protected clipboardHelper: ClipboardHelper;
    constructor(control: IRichEditControl, queryCommandId: string);
    getState(): SimpleCommandState;
    protected isTouchMode(): boolean;
    isCommandSupported(): boolean;
    execute(isPublicApiCall: boolean, parameter?: boolean): boolean;
    executeCore(state: SimpleCommandState, options: CommandSimpleOptions<boolean>): boolean;
    protected getTimeout(): number;
    protected executeFinalAction(): void;
    executeShowErrorMessageCommand(): boolean;
    executeBuiltInClipboardAction(action: BuiltInClipboardAction): void;
    private tryWriteToClipboard;
    isVisible(): boolean;
    getBuiltInClipboardActionType(): BuiltInClipboardAction;
    changeModel(): void;
    beforeExecute(): void;
}
export declare class CopySelectionCommand extends ClipboardCommand {
    constructor(control: IRichEditControl);
    copyEventRaised(): void;
    protected getTimeout(): number;
    isEnabled(): boolean;
    isVisible(): boolean;
    getBuiltInClipboardActionType(): BuiltInClipboardAction;
    beforeExecute(): void;
    isEnabledInReadOnlyMode(): boolean;
}
export declare class CutSelectionCommand extends ClipboardCommand {
    constructor(control: IRichEditControl);
    changeModel(): void;
    isEnabled(): boolean;
    isVisible(): boolean;
    getBuiltInClipboardActionType(): BuiltInClipboardAction;
    beforeExecute(): void;
}
export declare class PasteSelectionCommand extends ClipboardCommand {
    constructor(control: IRichEditControl);
    protected getTimeout(): number;
    pasteEventRaised(): void;
    changeModel(): void;
    isEnabled(): boolean;
    isVisible(): boolean;
    getBuiltInClipboardActionType(): BuiltInClipboardAction;
    beforeExecute(): void;
    isCommandSupported(): boolean;
}
export declare class BuiltInClipboard {
    private _clipboardData;
    private control;
    constructor(control: IRichEditControl);
    get clipboardData(): RangeCopy;
    copy(): void;
    paste(): void;
    cut(): void;
}
export declare class ClipboardHelper {
    private control;
    private useWithBuildInClipboard;
    private static browserDoesNotSupportReadingFromClipboard;
    private static browserDoesNotSupportWritingToClipboard;
    private static noDataInClipboardMessage;
    private static clipboardItemCannotBeInsertedMessage;
    private static lastWritenTextHash;
    constructor(control: IRichEditControl, useWithBuildInClipboard?: boolean);
    protected get clipboard(): any;
    canReadFromClipboard(): boolean;
    readFromClipboard(): Promise<void>;
    clearAfterImport(): void;
    private insertClipboardItems;
    private insertClipboardItem;
    private insertPlainText;
    private insertHtml;
    canWriteToClipboard(): boolean;
    writeToClipboard(clipboardData: RangeCopy): Promise<void>;
    tryWriteToClipboard(clipboardData: RangeCopy): Promise<void>;
    private calculateHash;
    protected readAsText(blob: Blob): Promise<string>;
    private createModelManager;
}
export declare class InsertHtmlCommand extends CommandBase<SimpleCommandState> {
    getState(): SimpleCommandState;
    executeCore(_state: SimpleCommandState, options: CommandSimpleOptions<string>): boolean;
}
export declare enum BuiltInClipboardAction {
    Copy = 0,
    Paste = 1,
    Cut = 2
}
//# sourceMappingURL=clipboard-commands.d.ts.map