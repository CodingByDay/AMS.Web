import { RichEditDocumentBaseApi as RichEditDocument } from '../../base-api/document';
import { HistoryApi as History } from '../../base-api/history';
import { KeyCode, ShortcutOptions } from '../../base-api/key-code';
import { RichEditLayoutApi as RichEditLayout } from '../../base-api/layout-api';
import { LoadingPanelApi } from '../../base-api/loading-panel';
import { RichEditSelectionApi as RichEditSelection } from '../../base-api/selection-api';
import { SubDocumentBaseApi } from '../../base-api/sub-document';
import { ICustomLoadingPanel } from '../../base/loading-panel/panel';
import { DocumentProcessorBaseApi } from '../../document-processor/public/processor';
import { FieldNameApi } from '../../model-api/field';
import { ModelFontApi } from '../../model-api/fonts/model-font';
import { DocumentFormatApi } from '../../model-api/formats/enum';
import { RangePermissionApi } from '../../model-api/range-permission';
import { UnitConverterApi as UnitConverter } from '../../model-api/unit-converter';
import { IRichEditSettings } from '../i-rich-constructor-settings';
import { AuthenticationOptionsApi } from './api/authentication-options';
import { MailMergeOptionsApi } from './api/mail-merge-options';
import { RangePermissionOptionsApi } from './api/range-permission-options';
import { Paddings, SimpleViewSettings } from './api/simple-view';
import { SpellCheckerOptionsApi } from './api/spell-checker-options';
import { Events } from './client-events';
import { CommandState } from './commands/commands';
import { CommandId, ContextMenuCommandId, FileTabCommandId, FloatingObjectsFormatTabCommandId, HeaderAndFooterTabCommandId, HomeTabCommandId, InsertTabCommandId, MailMergeTabCommandId, PageLayoutTabCommandId, ReferencesTabCommandId, TableDesignTabCommandId, TableLayoutTabCommandId, ViewTabCommandId } from './commands/enum';
import { IContextMenu } from './context-menu/menu';
import { DocumentProcessorApi } from './document-processor';
import { NusaSettings } from './nusa/settings';
import { IPrintingSettings } from './options';
import { RibbonItemId } from './ribbon/item-ids';
import { Ribbon } from './ribbon/ribbon';
declare class RichEditPublic {
    readonly document: RichEditDocument;
    readonly layout: RichEditLayout;
    readonly selection: RichEditSelection;
    readonly history: History;
    readonly unitConverter: UnitConverter;
    readonly mailMergeOptions: MailMergeOptionsApi;
    readonly authenticationOptions: AuthenticationOptionsApi;
    readonly simpleViewSettings: SimpleViewSettings;
    readonly contextMenu: IContextMenu;
    readonly rangePermissionOptions: RangePermissionOptionsApi;
    readonly nusaSettings: NusaSettings;
    readonly spellCheckerOptions: SpellCheckerOptionsApi;
    get events(): Events;
    private _native;
    constructor(htmlElement: HTMLElement, options: IRichEditSettings);
    exportToBase64(callback: (base64: string) => void, documentFormat?: DocumentFormatApi): void;
    exportToBlob(callback: (blob: Blob) => void, documentFormat?: DocumentFormatApi): void;
    exportToArrayBuffer(callback: (buffer: ArrayBuffer) => void, documentFormat?: DocumentFormatApi): void;
    exportToFile(callback: (file: File) => void, documentFormat?: DocumentFormatApi): void;
    exportToPdf(documentName?: string, options?: ((pdfDocument: any) => void) | {
        modifyPdfDocument?: (pdfDocument: any) => void;
        modifyPdfPage?: (pdfDocument: any) => void;
    }): void;
    downloadPdf(documentName?: string, options?: ((pdfDocument: any) => void) | {
        modifyPdfDocument?: (pdfDocument: any) => void;
        modifyPdfPage?: (pdfDocument: any) => void;
    }): void;
    adjust(): void;
    get isDocumentImported(): boolean;
    get fullScreen(): boolean;
    set fullScreen(value: boolean);
    get viewType(): ViewType;
    set viewType(type: ViewType);
    get readOnly(): boolean;
    set readOnly(value: boolean);
    get isDisposed(): boolean;
    get showHorizontalRuler(): boolean;
    set showHorizontalRuler(value: boolean);
    focus(): void;
    get fileName(): string;
    set fileName(name: string);
    get documentSaveFormat(): DocumentFormatApi;
    set documentSaveFormat(format: DocumentFormatApi);
    get documentName(): string;
    set documentName(name: string);
    get documentFormat(): DocumentFormatApi;
    set documentFormat(format: DocumentFormatApi);
    get documentExtension(): string;
    set documentExtension(filePath: string);
    get hasUnsavedChanges(): boolean;
    set hasUnsavedChanges(value: boolean);
    newDocument(): void;
    openDocument(fileContent?: File | Blob | ArrayBuffer | string, documentName?: string, documentFormat?: DocumentFormatApi, callback?: (importSuccess: boolean) => void): void;
    saveDocument(documentFormat?: DocumentFormatApi, reason?: string, documentName?: string): void;
    mailMerge(callback: (blob: Blob) => void, mergeMode?: MergeMode, documentFormat?: DocumentFormatApi, exportFrom?: number, exportRecordsCount?: number): void;
    downloadDocument(documentFormat?: DocumentFormatApi, documentName?: string): void;
    printDocument(mode?: PrintModeApi | IPrintingSettings): void;
    assignShortcut(shortcut: ShortcutOptions, callback: () => void): void;
    get printMode(): PrintModeApi;
    set printMode(val: PrintModeApi);
    updateRibbon(callback: (ribbon: Ribbon) => void): void;
    beginUpdate(): void;
    endUpdate(): void;
    get loadingPanel(): LoadingPanelApi;
    createDocumentProcessor(options?: IInitDocumentProcessorOptions): DocumentProcessorBaseApi;
    dispose(): void;
    executeCommand(commandId: CommandId, parameter?: any): boolean;
    getCommandState(commandId: CommandId): CommandState;
    setCommandEnabled(command: RibbonItemId | CommandId, enabled: boolean): void;
}
export interface IInitDocumentProcessorOptions {
    cloneCurrentModel?: boolean;
}
export declare enum ViewType {
    Simple = 0,
    PrintLayout = 1
}
export declare enum MergeMode {
    NewParagraph = 0,
    NewSection = 1
}
declare enum PrintModeApi {
    Html = 1,
    Pdf = 2
}
export { CharacterPropertiesApi as CharacterProperties, CharacterPropertiesScriptApi as CharacterPropertiesScript, ICharacterProperties } from '../../model-api/character-properties';
export { HyperlinkInfoApi as HyperlinkInfo } from '../../model-api/field';
export { IntervalApi as Interval } from '../../model-api/interval';
export { ListTypeApi as ListType, ListLevelNumberAlignmentApi as ListLevelNumberAlignment, ListLevelFormatApi as ListLevelFormat } from '../../model-api/lists/enums';
export { ListLevelSettingsApi as ListLevelSettings } from '../../model-api/lists/list-level-settings';
export { ListApi as List } from '../../model-api/lists/lists';
export { ParagraphAlignmentApi as ParagraphAlignment, ParagraphLineSpacingTypeApi as ParagraphLineSpacingType, ParagraphFirstLineIndentApi as ParagraphFirstLineIndent, ParagraphPropertiesApi as ParagraphProperties, ParagraphApi as Paragraph, IParagraphProperties } from '../../model-api/paragraph';
export { MarginsApi as Margins, SizeApi as Size } from '../../model-api/size';
export { SubDocumentTypeApi as SubDocumentType, HeaderFooterTypeApi as HeaderFooterType, SectionBreakTypeApi as SectionBreakType, SubDocumentApi as SubDocument } from '../../model-api/sub-document';
export { BookmarkApi as Bookmark } from '../../model-api/bookmark';
export { BookmarkBaseApi as BookmarkBase } from '../../base-api/bookmark';
export { PaperSizeApi as PaperSize } from '../../model-api/section';
export { TableApi as Table } from '../../model-api/table/table';
export { SectionApi as Section } from '../../model-api/section';
export { SubDocumentCollectionBaseApi as SubDocumentCollectionBase } from '../../base-api/collections/sub-documents-collection';
export { ShortcutOptions } from '../../base-api/key-code';
export { RichEditDocumentApi as RichEditDocumentBase } from '../../model-api/document';
export { RichEditPublic as RichEdit };
export { BookmarkCollectionBaseApi as BookmarkCollectionBase } from '../../base-api/collections/bookmark-collection';
export { FieldApi as Field } from '../../model-api/field';
export { UpdateFieldsOptionsApi as UpdateFieldsOptions } from '../../model-api/collections/field-collection';
export { HyperlinkApi as Hyperlink } from '../../model-api/field';
export { TableCellApi as TableCell } from '../../model-api/table/table-cell';
export { TableRowApi as TableRow } from '../../model-api/table/table-row';
export { DocumentFormatApi as DocumentFormat };
export { ModelFontApi as Font };
export type { ICustomLoadingPanel };
export { LoadingPanelApi as LoadingPanel };
export { MailMergeOptionsApi as MailMergeOptions };
export { AuthenticationOptionsApi as AuthenticationOptions };
export { RangePermissionOptionsApi as RangePermissionOptions };
export { SpellCheckerOptionsApi as SpellCheckerOptions };
export { DocumentProcessorApi as DocumentProcessor };
export { DocumentProcessorBaseApi as DocumentProcessorBase };
export { SubDocumentBaseApi as SubDocumentBase };
export { FieldNameApi as FieldName };
export { PrintModeApi as PrintMode };
export { KeyCode };
export { Events };
export { RangePermissionApi as RangePermission };
export { Paddings };
export { FileTabCommandId };
export { HomeTabCommandId };
export { InsertTabCommandId };
export { PageLayoutTabCommandId };
export { ReferencesTabCommandId };
export { MailMergeTabCommandId };
export { ViewTabCommandId };
export { HeaderAndFooterTabCommandId };
export { TableDesignTabCommandId };
export { TableLayoutTabCommandId };
export { FloatingObjectsFormatTabCommandId };
export { ContextMenuCommandId };
export { WrapTypeApi as WrapType, WrapSideApi as WrapSide, FloatingObjectHorizontalAlignmentApi as FloatingObjectHorizontalAlignment, FloatingObjectHorizontalAnchorElementApi as FloatingObjectHorizontalAnchorElement, FloatingObjectHorizontalPositionTypeApi as FloatingObjectHorizontalPositionType, FloatingObjectVerticalAnchorElementApi as FloatingObjectVerticalAnchorElement, FloatingObjectVerticalAlignmentApi as FloatingObjectVerticalAlignment, FloatingObjectVerticalPositionTypeApi as FloatingObjectVerticalPositionType } from '../../model-api/images/image-enums';
export { HorizontalAbsolutePositionApi as HorizontalAbsolutePosition, HorizontalAlignedPositionApi as HorizontalAlignedPosition, HorizontalRelativePositionApi as HorizontalRelativePosition, VerticalAbsolutePositionApi as VerticalAbsolutePosition, VerticalAlignedPositionApi as VerticalAlignedPosition, VerticalRelativePositionApi as VerticalRelativePosition, IFloatingObjectDistanceApi as IFloatingObjectDistance, IHorizontalAlignedPositionApi as IHorizontalAlignedPosition, IHorizontalAbsolutePositionApi as IHorizontalAbsolutePosition, IHorizontalRelativePositionApi as IHorizontalRelativePosition, IVerticalAlignedPositionApi as IVerticalAlignedPosition, IVerticalAbsolutePositionApi as IVerticalAbsolutePosition, IVerticalRelativePositionApi as IVerticalRelativePosition, IInsertedFloatingImageOptionsApi as IInsertedFloatingImageOptions, IInsertedInlineImageOptionsApi as IInsertedInlineImageOptions, } from '../../model-api/images/image-interfaces';
export { FloatingImageApi as FloatingImage } from '../../model-api/images/floating-image';
export { InlineImageApi as InlineImage } from '../../model-api/images/inline-image';
export { ImageApi as Image } from '../../model-api/images/image';
export { ImagesApi as Images } from '../../model-api/images/images';
export { ImageIteratorApi as ImageIterator } from '../../model-api/images/image-iterator';
export { ContextMenuItem } from './context-menu/item';
export { Utils } from './utils';
export { Characters } from './characters';
export * from './commands/enum';
//# sourceMappingURL=rich-edit.d.ts.map