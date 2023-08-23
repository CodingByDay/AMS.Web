import { SimpleFormattersManager } from '@devexpress/utils/lib/formatters/manager';
import { IFormattersOptions } from '@devexpress/utils/lib/formatters/options';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ICloneable } from '@devexpress/utils/lib/types';
import { Bookmark } from './bookmarks';
import { BorderInfo } from './borders/border-info';
import { DocumentCache } from './caches/caches';
import { MaskedCharacterProperties } from './character/character-properties';
import { CharacterStyle } from './character/character-style';
import { ColorProvider } from './color/color-provider';
import { CompatSettings } from './compat-settings';
import { SubDocumentInfoType } from './enums';
import { AbstractNumberingList, NumberingList } from './numbering-lists/numbering-list';
import { AbstractNumberingListIdProvider, NumberingListIdProvider } from './numbering-lists/numbering-list-id-provider';
import { NumberingListStyle } from './numbering-lists/numbering-list-style';
import { ControlOptions } from './options/control';
import { DocumentProtectionProperties } from './options/document-protection';
import { Paragraph } from './paragraph/paragraph';
import { MaskedParagraphProperties } from './paragraph/paragraph-properties';
import { ParagraphStyle } from './paragraph/paragraph-style';
import { Section } from './section/section';
import { StylesManager } from './styles-manager';
import { SubDocument, SubDocumentInterval } from './sub-document';
import { FooterSubDocumentInfo, HeaderSubDocumentInfo, SubDocumentInfoBase } from './sub-document-infos';
import { TableCellProperties } from './tables/properties/table-cell-properties';
import { TableProperties } from './tables/properties/table-properties';
import { TableRowProperties } from './tables/properties/table-row-properties';
import { TableCellStyle } from './tables/styles/table-cell-style';
import { TableStyle } from './tables/styles/table-style';
import { WebSettings } from './web-settings';
import { DocumentFormat } from '../document-format';
import { IProcessor } from '../processor';
import { IModelManager } from '../model-manager';
import { FormatterManager } from '../layout-formatter/managers/formatter-manager';
import { DocumentLayout } from '../layout/document-layout';
import { CacheImageInfo } from './caches/images';
import { AnchorInfo } from './floating-objects/anchor-info';
import { SubDocumentCollection } from './sub-document-collection';
export interface IModelOptions extends ICloneable<IModelOptions> {
    control: ControlOptions;
    cultureOpts: IFormattersOptions;
    maxSpellRequestLength: number;
}
export declare class DocumentModel {
    cache: DocumentCache;
    mainSubDocument: SubDocument;
    defaultTabWidth: number;
    differentOddAndEvenPages: boolean;
    displayBackgroundShape: boolean;
    pageBackColor: number;
    mirrorMargins: boolean;
    aspxIsDocumentProtectionEnabled: boolean;
    sections: Section[];
    headers: HeaderSubDocumentInfo[];
    footers: FooterSubDocumentInfo[];
    characterStyles: CharacterStyle[];
    paragraphStyles: ParagraphStyle[];
    numberingListStyles: NumberingListStyle[];
    tableStyles: TableStyle[];
    tableCellStyles: TableCellStyle[];
    subDocumentsCollection: SubDocumentCollection;
    docVariables: DocumentVariables;
    stylesManager: StylesManager;
    defaultCharacterProperties: MaskedCharacterProperties;
    defaultParagraphProperties: MaskedParagraphProperties;
    defaultTableProperties: TableProperties;
    defaultTableRowProperties: TableRowProperties;
    defaultTableCellProperties: TableCellProperties;
    abstractNumberingListTemplates: AbstractNumberingList[];
    abstractNumberingLists: AbstractNumberingList[];
    numberingLists: NumberingList[];
    abstractNumberingListsIdProvider: AbstractNumberingListIdProvider;
    numberingListsIdProvider: NumberingListIdProvider;
    get subDocuments(): Record<number, SubDocument>;
    get options(): ControlOptions;
    get isDocumentProtectionEnabled(): boolean;
    repositoryBorderItem: BorderInfo;
    colorProvider: ColorProvider;
    webSettings: WebSettings;
    compatSettings: CompatSettings[];
    compatibilitySettings: CompatibilitySettings;
    simpleFormattersManager: SimpleFormattersManager;
    private subDocumentsIdCounter;
    private loaded;
    modelOptions: IModelOptions;
    documentProtectionProperties: DocumentProtectionProperties;
    constructor(modelOptions: IModelOptions, subDocumentsIdCounter?: number);
    setPageColor(value: number): void;
    getAllBookmarks(getHiddenToo: boolean): Bookmark[];
    getAllImages(): CacheImageInfo[];
    private initRepositoryBorderItem;
    getCharacterStyleByName(name: string): CharacterStyle;
    getParagraphStyleByName(name: string): ParagraphStyle;
    getNumberingListStyleByName(name: string): NumberingListStyle;
    getTableStyleByName(name: string): TableStyle;
    getTableCellStyleByName(name: string): TableCellStyle;
    getDefaultCharacterStyle(): CharacterStyle;
    getDefaultParagraphStyle(): ParagraphStyle;
    getDefaultTableStyle(): TableStyle;
    getDefaultTableCellStyle(): TableCellStyle;
    setDefaultCharacterProperties(obj: any): void;
    setDefaultParagraphProperties(obj: any): void;
    getSectionsByInterval(interval: FixedInterval): Section[];
    getSectionIndicesByIntervals(intervals: FixedInterval[]): number[];
    getSectionByPosition(position: number): Section;
    getCurrentLength(): number;
    isLoaded(): boolean;
    getActualPageBackgroundColor(): number;
    getNumberingListIndexById(id: number): number;
    getAbstractNumberingListIndexById(id: number): number;
    getRangeListCounters(paragraph: Paragraph): number[];
    resetMergedFormattingCache(type: ResetFormattingCacheType): void;
    getPreviousSection(section: Section): Section;
    getNextSection(section: Section): Section;
    importSubDocument(info: SubDocumentInfoBase): SubDocument;
    updateHyperlinkFields(processor: IProcessor, interval: SubDocumentInterval, newSubDocuments: SubDocument[]): void;
    createSubDocument(subDocumentInfoType: SubDocumentInfoType, parentSubDocumentId: number, disableInit?: boolean): SubDocument;
    private createSubDocumentInternal;
    private initNewSubDocument;
    private checkPasswordHash;
    private checkLegacyDocumentProtectionPassword;
    private checkOpenXmlDocumentProtectionPassword;
    checkDocumentProtectionPassword(password: string): boolean;
    findAll(searchSettings: SearchSettings): FixedInterval[];
    clone(): DocumentModel;
    compare(source: DocumentModel, format?: DocumentFormat | null): boolean;
}
export declare class SearchSettings {
    text: string;
    matchCase: boolean;
    highlightResults: boolean;
    subDocument: SubDocument;
    modelManager: IModelManager;
    formatterManager: FormatterManager;
    layout: DocumentLayout;
    pageIndex: number;
    storeSelection: (interval: FixedInterval) => void;
    constructor(modelManager: IModelManager, formatterManager: FormatterManager, layout: DocumentLayout, subDocument: SubDocument, text: string, matchCase: boolean, highlightResults: boolean, pageIndex: number, storeSelection: (interval: FixedInterval) => void);
}
export declare enum ResetFormattingCacheType {
    Character = 1,
    Paragraph = 2,
    All = 2147483647
}
export declare enum CompatibilityMode {
    Word2003 = 11,
    Word2007 = 12,
    Word2010 = 14,
    Word2013 = 15
}
export declare class CompatibilitySettings {
    dontJustifyLinesEndingInSoftLineBreak: boolean;
    compatibilityMode: CompatibilityMode;
    get allowParagraphSpacingAfterPageBreak(): boolean;
    get layoutInTableCell(): boolean;
    get matchHorizontalTableIndentsToTextEdge(): boolean;
    getActualLayoutInTableCell(anchorInfo: AnchorInfo): boolean;
    clone(): CompatibilitySettings;
}
export declare class DocumentVariables {
    private _map;
    get count(): number;
    contains(name: string): boolean;
    getValue(name: string): any;
    addValue(name: string, value: any): void;
    foreach(callback: (name: string, value: any) => void): void;
}
//# sourceMappingURL=document-model.d.ts.map