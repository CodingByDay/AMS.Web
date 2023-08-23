import { Store } from 'devextreme/data/abstract_store';
import { CustomStoreOptions } from 'devextreme/data/custom_store';
import DataSource, { DataSourceOptions } from 'devextreme/data/data_source';
import { RichEditUnit } from '../base-utils/unit-converter';
import { IRibbonItemOptions } from '../client-ribbon/client-ribbon/i-ribbon-item-options';
import { IRibbonContextItemsCategory } from '../client-ribbon/client-ribbon/ribbon';
import { IRichEditFontsSettings } from '../core/model/options/fonts';
import { DocumentFormatApi } from '../model-api/formats/enum';
import { ContextMenuItem } from './public/context-menu/item';
import { EventArgs } from './public/events';
import { EventHandlers } from './public/options';
import { Ribbon } from './public/ribbon/ribbon';
import { PrintMode, RichEdit, ViewType } from './public/rich-edit';
import { IInterval } from '../model-api/interval';
import { SubDocumentBaseApi } from '../base-api/sub-document';
export declare type InnerEventHandlers = EventHandlers & {
    init?: string | ((s: RichEdit, e: EventArgs) => void);
};
export interface IRichEditSettings {
    width?: string;
    height?: string;
    nonce?: string;
    readOnly?: boolean;
    unit?: RichEditUnit;
    exportUrl?: string;
    autoCorrect?: IRichEditAutocorrectSettings;
    bookmarks?: IRichEditBookmarksSettings;
    authentication?: IRichEditAuthenticationSettings;
    rangePermissions?: IRichEditRangePermissionsSettings;
    fields?: IRichEditFieldsSettings;
    fonts?: IRichEditFontsSettings;
    printing?: IRichEditPrintingSettings;
    ribbon?: IRichEditRibbonSettings | Ribbon;
    view?: IRichEditViewSettings;
    pdf?: IRichEditPdfSettings;
    search?: IRichEditSearchSettings;
    confirmOnLosingChanges?: IRichEditConfirmOnLosingChangesSettings;
    mailMerge?: IRichEditMailMergeSettings;
    contextMenu?: IContextMenuInnerSettings;
    events?: InnerEventHandlers;
    spellCheck?: ISpellCheck;
    document?: IInitialDocumentSettings;
}
export interface IInitialDocumentSettings {
    content?: File | Blob | ArrayBuffer | string;
    name?: string;
    format?: DocumentFormatApi;
    onLoaded?: string | ((importSuccess: boolean) => void);
}
export interface IRichEditConfirmOnLosingChangesSettings {
    enabled?: boolean;
    message?: string;
}
export interface IRichEditViewSettings {
    viewType?: ViewType;
    simpleViewSettings?: IRichEditSimpleViewSettings;
    printLayoutViewSettings?: IRichEditPrintLayoutViewSettings;
}
export interface IRichEditSimpleViewSettings {
    paddings?: IPaddings;
    fixedWidth?: number;
}
export interface IRichEditPrintLayoutViewSettings {
    showHorizontalRuler?: boolean;
}
export interface IRichEditRibbonSettings {
    visible?: boolean;
    activeTabIndex?: number;
    tabs?: IRibbonItemOptions[];
    contextTabCategories?: IRibbonContextItemsCategory[];
}
export interface IRichEditPrintingSettings {
    mode?: PrintMode;
    closePrintDialogWithHtmlPreview?: boolean;
}
export interface IRichEditFieldsSettings {
    updateFieldsBeforePrint?: boolean;
    updateFieldsOnPaste?: boolean;
    defaultTimeFormat?: string;
    defaultDateFormat?: string;
    openHyperlinkOnClick?: boolean;
    keepHyperlinkResultForInvalidReference?: boolean;
    createHyperlinkTooltip?: (hyperlinkTooltip: string, hint: string) => string;
}
export interface IRichEditRangePermissionsSettings {
    bracketsColor?: string;
    highlightColor?: string;
    highlightRanges?: boolean;
    showBrackets?: boolean;
}
export interface IRichEditAuthenticationSettings {
    userName?: string;
    group?: string;
}
export interface IRichEditAutocorrectSettings {
    correctTwoInitialCapitals?: boolean;
    detectUrls?: boolean;
    enableAutomaticNumbering?: boolean;
    replaceTextAsYouType?: boolean;
    caseSensitiveReplacement?: boolean;
    replaceInfoCollection?: IRichEditAutocorrectCollectionItem[];
}
export interface IRichEditAutocorrectCollectionItem {
    replace: string;
    with: string;
}
export interface IRichEditBookmarksSettings {
    color?: string;
    visibility?: boolean;
}
export interface IRichEditMailMergeSettings {
    viewMergedData?: boolean;
    activeRecord?: number;
    dataSource?: any[] | string | CustomStoreOptions | DataSourceOptions | Store | DataSource;
}
export interface IPaddings {
    left?: number;
    right?: number;
    top?: number;
    bottom?: number;
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
export interface IRichEditSearchSettings {
    filterInterval?: (subDocument: SubDocumentBaseApi, interval: IInterval) => boolean;
}
export interface ISpellCheck {
    enabled?: boolean;
    suggestionCount?: number;
    checkWordSpelling?: ((word: string, callback: (isCorrect: boolean, suggestions: string[]) => void) => void) | string;
    addWordToDictionary?: ((word: string) => void) | string;
}
export interface IContextMenuInnerSettings {
    enabled?: boolean;
    items?: ContextMenuItem[];
}
//# sourceMappingURL=i-rich-constructor-settings.d.ts.map