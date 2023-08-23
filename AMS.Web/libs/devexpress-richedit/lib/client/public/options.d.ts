import { Store } from 'devextreme/data/abstract_store';
import { CustomStoreOptions } from 'devextreme/data/custom_store';
import DataSource, { DataSourceOptions } from 'devextreme/data/data_source';
import { RichEditUnit } from '../../base-utils/unit-converter';
import { CalculateDocumentVariableAsyncEventArgs } from '../../document-processor/docvar-args';
import { DocumentFormatApi } from '../../model-api/formats/enum';
import { IContextMenu } from './context-menu/menu';
import { AutoCorrectEventArgs, CalculateDocumentVariableEventArgs, CommandStateChangedEventArgs, ContentChangedEventArgs, ContentRemovedEventArgs, ContextMenuShowingEventArgs, CustomCommandExecutedEventArgs, DocumentFormattedEventArgs, EventArgs, HyperlinkClickEventArgs, KeyboardEventArgs, ParagraphPropertiesChangedEventArgs, PdfExportedEventArgs, PdfExportingEventArgs, PointerEventArgs, SavedEventArgs, SavingEventArgs } from './events';
import { Ribbon } from './ribbon/ribbon';
import { PrintMode, RichEdit, ViewType } from './rich-edit';
import { IRichEditSearchSettings } from '../i-rich-constructor-settings';
export * from './ribbon/index';
export declare function createOptions(): Options;
export declare function create(htmlElement: HTMLElement, options: Options): RichEdit;
export interface EventHandlers {
    selectionChanged?: string | ((s: RichEdit, e: EventArgs) => void);
    documentLoaded?: string | ((s: RichEdit, e: EventArgs) => void);
    documentFormatted?: string | ((s: RichEdit, e: DocumentFormattedEventArgs) => void);
    documentChanged?: string | ((s: RichEdit, e: EventArgs) => void);
    activeSubDocumentChanged?: string | ((s: RichEdit, e: EventArgs) => void);
    gotFocus?: string | ((s: RichEdit, e: EventArgs) => void);
    lostFocus?: string | ((s: RichEdit, e: EventArgs) => void);
    hyperlinkClick?: string | ((s: RichEdit, e: HyperlinkClickEventArgs) => void);
    pointerDown?: string | ((s: RichEdit, e: PointerEventArgs) => void);
    pointerUp?: string | ((s: RichEdit, e: PointerEventArgs) => void);
    keyDown?: string | ((s: RichEdit, e: KeyboardEventArgs) => void);
    keyUp?: string | ((s: RichEdit, e: KeyboardEventArgs) => void);
    calculateDocumentVariable?: string | ((s: RichEdit, e: CalculateDocumentVariableEventArgs) => void);
    contentInserted?: string | ((s: RichEdit, e: ContentChangedEventArgs) => void);
    contentRemoved?: string | ((s: RichEdit, e: ContentRemovedEventArgs) => void);
    characterPropertiesChanged?: string | ((s: RichEdit, e: ContentChangedEventArgs) => void);
    paragraphPropertiesChanged?: string | ((s: RichEdit, e: ParagraphPropertiesChangedEventArgs) => void);
    saving?: string | ((s: RichEdit, e: SavingEventArgs) => void);
    saved?: string | ((s: RichEdit, e: SavedEventArgs) => void);
    customCommandExecuted?: string | ((s: RichEdit, e: CustomCommandExecutedEventArgs) => void);
    pdfExporting?: string | ((s: RichEdit, e: PdfExportingEventArgs) => void);
    pdfExported?: string | ((s: RichEdit, e: PdfExportedEventArgs) => void);
    autoCorrect?: string | ((s: RichEdit, e: AutoCorrectEventArgs) => void);
    commandStateChanged?: string | ((s: RichEdit, e: CommandStateChangedEventArgs) => void);
    calculateDocumentVariableAsync?: string | ((s: RichEdit, e: CalculateDocumentVariableAsyncEventArgs) => void);
    contextMenuShowing?: string | ((s: RichEdit, e: ContextMenuShowingEventArgs) => void);
}
export interface Options {
    width?: string;
    height?: string;
    readOnly?: boolean;
    unit?: RichEditUnit;
    nonce?: string;
    exportUrl?: string;
    bookmarks?: IBookmarkSettings;
    fields?: IFieldsSettings;
    ribbon: Ribbon;
    view?: IViewSettings;
    pdf?: IRichEditPdfSettings;
    search?: IRichEditSearchSettings;
    fonts?: IRichEditFontsSettings;
    confirmOnLosingChanges?: IConfirmOnLosingChangesSettings;
    mailMerge?: IMailMergeSettings;
    autoCorrect?: IAutocorrectSettings;
    spellCheck?: ISpellCheck;
    authentication?: IAuthenticationSettings;
    rangePermissions?: IRangePermissionsSettings;
    printing?: IPrintingSettings;
    contextMenu?: IContextMenu;
    events: EventHandlers;
    document?: {
        content?: File | Blob | ArrayBuffer | string;
        name?: string;
        format?: DocumentFormatApi;
        onLoaded?: (importSuccess: boolean) => void;
    };
}
export interface IConfirmOnLosingChangesSettings {
    enabled?: boolean;
    message?: string;
}
export interface IViewSettings {
    viewType?: ViewType;
    simpleViewSettings?: ISimpleViewSettings;
    printLayoutViewSettings?: IPrintLayoutViewSettings;
}
export interface ISimpleViewSettings {
    paddings?: IPaddings;
    fixedWidth?: number;
}
export interface IPrintLayoutViewSettings {
    showHorizontalRuler?: boolean;
}
export interface IFieldsSettings {
    updateFieldsBeforePrint?: boolean;
    updateFieldsOnPaste?: boolean;
    defaultTimeFormat?: string;
    defaultDateFormat?: string;
    openHyperlinkOnClick?: boolean;
    keepHyperlinkResultForInvalidReference?: boolean;
    createHyperlinkTooltip?: (hyperlinkTooltip: string, hint: string) => string;
}
export interface IBookmarkSettings {
    color?: string;
    visibility?: boolean;
}
export interface IAuthenticationSettings {
    userName?: string;
    group?: string;
}
export interface IRangePermissionsSettings {
    bracketsColor?: string;
    highlightColor?: string;
    highlightRanges: boolean;
    showBrackets: boolean;
}
export interface IMailMergeSettings {
    viewMergedData?: boolean;
    activeRecord?: number;
    dataSource?: any[] | string | CustomStoreOptions | DataSourceOptions | Store | DataSource;
}
export interface IPaddings {
    left: number;
    right: number;
    top: number;
    bottom: number;
}
export interface IRichEditPdfSettings {
    pdfDocument?: new (options?: {
        autoFirstPage: boolean;
        defaultFont: any;
    }) => any;
    blobStream?: new () => any;
    exportUrl?: string;
    defaultFontName?: string;
    pdfKitScriptUrl?: string;
    convertImageToCompatibleFormat?: (base64: string) => Promise<string>;
}
export interface IPrintingSettings {
    mode?: PrintMode;
    closePrintDialogWithHtmlPreview?: boolean;
}
export interface IAutocorrectSettings {
    correctTwoInitialCapitals?: boolean;
    detectUrls?: boolean;
    enableAutomaticNumbering?: boolean;
    replaceTextAsYouType?: boolean;
    caseSensitiveReplacement?: boolean;
    replaceInfoCollection?: IAutocorrectReplaceInfo[];
}
export interface IAutocorrectReplaceInfo {
    replace: string;
    with: string;
}
export interface IRichEditFontsSettings {
    defaultFolder?: string;
    fonts?: IFontSettings[];
    mappings?: IFontMapping;
}
export interface IFontSettings {
    name: string;
    fontFamily: string;
    italicFontUri?: string;
    boldFontUri?: string;
    boldItalicFontUri?: string;
    regularFontUri?: string;
}
export interface IFontMapping {
    defaultFontName?: string;
    rules?: IFontMappingRule[];
}
export interface IFontMappingRule {
    sourceFontFamily: string;
    destinationFontName: string;
}
export interface ISpellCheck {
    enabled?: boolean;
    suggestionCount?: number;
    checkWordSpelling?: (word: string, callback: (isCorrect: boolean, suggestions: string[]) => void) => void;
    addWordToDictionary?: (word: string) => void;
}
export { RichEditUnit };
//# sourceMappingURL=options.d.ts.map