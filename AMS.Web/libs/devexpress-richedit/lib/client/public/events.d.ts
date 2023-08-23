import { CalculateDocumentVariableAsyncEventArgs, CalculateDocumentVariableEventArgs, EventArgs } from '../../document-processor/docvar-args';
import { HyperlinkApi } from '../../model-api/field';
import { DocumentFormatApi } from '../../model-api/formats/enum';
import { CommandId } from './commands/enum';
import { IContextMenu } from './context-menu/menu';
import { Interval, RichEdit } from './rich-edit';
export declare class Event<TSource, TEventArgs extends EventArgs> {
    protected _handlerInfoList: HandlerInfo<TSource, TEventArgs>[];
    addHandler(handler: (s?: TSource, e?: TEventArgs) => void, executionContext?: TSource): void;
    removeHandler(handler: (s?: TSource, e?: TEventArgs) => void, executionContext?: TSource): void;
    clearHandlers(): void;
    _fireEvent(obj: TSource, args: TEventArgs): void;
    isEmpty(): boolean;
}
declare class HandlerInfo<TSource, TEventArgs extends EventArgs> {
    handler: (s: TSource, e: TEventArgs) => void;
    executionContext: TSource;
    constructor(handler: (s: TSource, e: TEventArgs) => void, executionContext: TSource);
}
export declare class RichEditEvent<TEventArgs extends EventArgs> extends Event<RichEdit, TEventArgs> {
}
export declare class SelectionChangedEvent extends RichEditEvent<EventArgs> {
}
export declare class DocumentLoadedEvent extends RichEditEvent<EventArgs> {
}
export declare class DocumentChangedEvent extends RichEditEvent<EventArgs> {
}
export declare class DocumentFormattedEvent extends RichEditEvent<DocumentFormattedEventArgs> {
}
export declare class ActiveSubDocumentChangedEvent extends RichEditEvent<EventArgs> {
}
export declare class GotFocusEvent extends RichEditEvent<EventArgs> {
}
export declare class LostFocusEvent extends RichEditEvent<EventArgs> {
}
export declare class HyperlinkClickEvent extends RichEditEvent<HyperlinkClickEventArgs> {
}
export declare class PointerDownEvent extends RichEditEvent<PointerEventArgs> {
}
export declare class PointerUpEvent extends RichEditEvent<PointerEventArgs> {
}
export declare class KeyDownEvent extends RichEditEvent<KeyboardEventArgs> {
}
export declare class KeyUpEvent extends RichEditEvent<KeyboardEventArgs> {
}
export declare class CalculateDocumentVariableEvent extends RichEditEvent<CalculateDocumentVariableEventArgs> {
}
export declare class ContentInsertedEvent extends RichEditEvent<ContentChangedEventArgs> {
}
export declare class ContentRemovedEvent extends RichEditEvent<ContentRemovedEventArgs> {
}
export declare class CharacterPropertiesChangedEvent extends RichEditEvent<ContentChangedEventArgs> {
}
export declare class ParagraphPropertiesChangedEvent extends RichEditEvent<ParagraphPropertiesChangedEventArgs> {
}
export declare class AutoCorrectEvent extends RichEditEvent<AutoCorrectEventArgs> {
}
export declare class SavingEvent extends RichEditEvent<SavingEventArgs> {
}
export declare class SavedEvent extends RichEditEvent<SavedEventArgs> {
}
export declare class CustomCommandExecutedEvent extends RichEditEvent<CustomCommandExecutedEventArgs> {
}
export declare class PdfExportingEvent extends RichEditEvent<PdfExportingEventArgs> {
}
export declare class PdfExportedEvent extends RichEditEvent<PdfExportedEventArgs> {
}
export declare class CommandStateChangedEvent extends RichEditEvent<CommandStateChangedEventArgs> {
}
export declare class ContextMenuShowingEvent extends RichEditEvent<ContextMenuShowingEventArgs> {
}
export declare class CalculateDocumentVariableAsyncEvent extends RichEditEvent<CalculateDocumentVariableAsyncEventArgs> {
}
export declare class HyperlinkClickEventArgs extends EventArgs {
    handled: boolean;
    htmlEvent: MouseEvent;
    hyperlinkType: DocumentLinkType;
    targetUri: string;
    hyperlink: HyperlinkApi;
    constructor(htmlEvent: MouseEvent, handled: boolean, targetUri: string, hyperlinkType: DocumentLinkType, hyperlink: HyperlinkApi);
}
export declare class PointerEventArgs extends EventArgs {
    handled: boolean;
    htmlEvent: MouseEvent;
    constructor(htmlEvent: MouseEvent);
}
export declare class KeyboardEventArgs extends EventArgs {
    handled: boolean;
    htmlEvent: KeyboardEvent;
    constructor(htmlEvent: KeyboardEvent);
}
export declare class ContentChangedEventArgs extends EventArgs {
    subDocumentId: number;
    interval: Interval;
    constructor(subDocumentId: number, interval: Interval);
}
export declare class ContentRemovedEventArgs extends ContentChangedEventArgs {
    removedText: string;
    constructor(subDocumentId: number, interval: Interval, removedText: string);
}
export declare class ParagraphPropertiesChangedEventArgs extends EventArgs {
    subDocumentId: number;
    paragraphIndex: number;
    constructor(subDocumentId: number, paragraphIndex: number);
}
export declare class AutoCorrectEventArgs extends EventArgs {
    handled: boolean;
    text: string;
    interval: Interval;
    constructor(text: string, interval: Interval);
}
export declare class SavingEventArgs extends EventArgs {
    handled: boolean;
    base64: string;
    fileName: string;
    format: DocumentFormatApi;
    reason: string;
    constructor(base64: string, fileName: string, format: DocumentFormatApi, reason: string);
}
export declare class SavedEventArgs extends EventArgs {
    success: boolean;
    reason: string;
    constructor(success: boolean, reason: string);
}
export declare class CustomCommandExecutedEventArgs extends EventArgs {
    commandName: string;
    parameter: any;
    constructor(commandName: string, parameter: any);
}
export declare class DocumentFormattedEventArgs extends EventArgs {
    pageCount: number;
    constructor(pageCount: number);
}
export declare class PdfExportingEventArgs extends EventArgs {
    base64: string;
    blob: Blob;
    blobStream: any;
    handled: boolean;
    constructor(base64: string, blob: Blob, blobStream: any, handled: boolean);
}
export declare class PdfExportedEventArgs extends EventArgs {
    success: boolean;
    constructor(success: boolean);
}
export declare class CommandStateChangedEventArgs extends EventArgs {
    commands: null | CommandId[];
    constructor(commands: null | CommandId[]);
}
export declare class ContextMenuShowingEventArgs extends EventArgs {
    readonly contextMenu: IContextMenu;
    constructor(contextMenu: IContextMenu);
}
export declare enum DocumentLinkType {
    Hyperlink = 0,
    Bookmark = 1,
    EmailAddress = 2,
    Document = 3
}
export { CalculateDocumentVariableEventArgs };
export { EventArgs };
//# sourceMappingURL=events.d.ts.map