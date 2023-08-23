import { CharacterStyle } from '../../../core/model/character/character-style';
import { DocumentModel } from '../../../core/model/document-model';
import { NumberingListStyle } from '../../../core/model/numbering-lists/numbering-list-style';
import { ParagraphStyle } from '../../../core/model/paragraph/paragraph-style';
import { StyleBase } from '../../../core/model/style-base';
import { TableCellStyle } from '../../../core/model/tables/styles/table-cell-style';
import { TableStyle } from '../../../core/model/tables/styles/table-style';
import { Data } from '../data';
import { StyleDestination } from '../destination/style/style-destination';
import { StyleDestinationBase } from '../destination/style/style-destination-base';
import { OpenXmlAbstractNumberingInfo } from '../list/open-xml-abstract-numbering-info';
import { OpenXmlNumberingListInfo } from '../list/open-xml-numbering-list-info';
import { OpenXmlStyleConditionalTableFormattingInfo } from '../model/open-xml-style-conditional-table-formatting-info';
export declare class OpenXmlStyleInfo<TStyle extends StyleBase<TStyle>> {
    style: TStyle;
    id: string;
    name: string;
    parentId: string;
    linkedId: string;
    semiHidden: boolean;
    hidden: boolean;
    nextId: string;
    isDefault: boolean;
    qFormat: boolean;
    numberingId: number;
    listLevelIndex: number;
    useListLevelIndex: boolean;
}
export declare abstract class StyleManager<TStyle extends StyleBase<TStyle>> {
    isDefaultProcessed: boolean;
    currInfo: OpenXmlStyleInfo<TStyle>;
    protected data: Data;
    private readonly info;
    private readonly registered;
    defaultStyle: TStyle;
    constructor(data: Data);
    startImport(): void;
    endImport(dest: StyleDestinationBase): TStyle;
    getNumberingListIndex(numberingId: number): number;
    addInfo(styleInfo: OpenXmlStyleInfo<TStyle>, styleName: string): void;
    getStyleById(styleId: string): TStyle;
    getInfoById(styleId: string): OpenXmlStyleInfo<TStyle>;
    isRegistered(styleName: string): boolean;
    determineParents(): void;
    foreachInfo(action: (info: OpenXmlStyleInfo<TStyle>) => void): void;
    protected abstract getDefault(): TStyle;
    protected abstract getFromModelByName(name: string): TStyle;
    protected abstract applyProperties(dest: StyleDestinationBase, style: TStyle): TStyle;
    protected abstract createEmpty(): TStyle;
    protected abstract addToModel(style: TStyle): TStyle;
    protected abstract getPresetStyleByName(name: string): TStyle;
    protected addStyle(dest: StyleDestinationBase): TStyle;
    protected applyPropertiesBase(style: TStyle): void;
    private getStyleInfoCore;
}
export declare class ParagraphStyleManager extends StyleManager<ParagraphStyle> {
    protected getDefault(): ParagraphStyle;
    protected getFromModelByName(name: string): ParagraphStyle;
    protected createEmpty(): ParagraphStyle;
    protected addToModel(style: ParagraphStyle): ParagraphStyle;
    protected applyProperties(dest: StyleDestinationBase, style: ParagraphStyle): ParagraphStyle;
    protected getPresetStyleByName(name: string): ParagraphStyle;
}
export declare class CharacterStyleManager extends StyleManager<CharacterStyle> {
    protected getDefault(): CharacterStyle;
    protected getFromModelByName(name: string): CharacterStyle;
    protected createEmpty(): CharacterStyle;
    protected addToModel(style: CharacterStyle): CharacterStyle;
    protected applyProperties(dest: StyleDestinationBase, style: CharacterStyle): CharacterStyle;
    protected getPresetStyleByName(name: string): CharacterStyle;
}
export declare class TableStyleManager extends StyleManager<TableStyle> {
    conditionalTableFormattingInfoList: OpenXmlStyleConditionalTableFormattingInfo[];
    protected getDefault(): TableStyle;
    protected getFromModelByName(name: string): TableStyle;
    protected createEmpty(): TableStyle;
    protected addToModel(style: TableStyle): TableStyle;
    protected applyProperties(dest: StyleDestinationBase, style: TableStyle): TableStyle;
    protected getPresetStyleByName(name: string): TableStyle;
}
export declare class TableCellStyleManager extends StyleManager<TableCellStyle> {
    protected getDefault(): TableCellStyle;
    protected getFromModelByName(name: string): TableCellStyle;
    protected createEmpty(): TableCellStyle;
    protected addToModel(style: TableCellStyle): TableCellStyle;
    protected applyProperties(dest: StyleDestinationBase, style: TableCellStyle): TableCellStyle;
    protected getPresetStyleByName(_name: string): TableCellStyle;
}
export declare class NumberingListStyleManager extends StyleManager<NumberingListStyle> {
    protected getDefault(): NumberingListStyle;
    protected getFromModelByName(name: string): NumberingListStyle;
    protected createEmpty(): NumberingListStyle;
    protected addToModel(style: NumberingListStyle): NumberingListStyle;
    protected removeFromModel(style: NumberingListStyle): void;
    protected applyProperties(dest: StyleDestinationBase, style: NumberingListStyle): NumberingListStyle;
    protected addStyle(dest: StyleDestinationBase): NumberingListStyle;
    protected getPresetStyleByName(_name: string): NumberingListStyle;
}
export declare class StylesImporter {
    data: Data;
    tableCellStyles: Record<string, TableCellStyle>;
    paragraphManager: ParagraphStyleManager;
    characterManager: CharacterStyleManager;
    tableManager: TableStyleManager;
    tableCellManager: TableCellStyleManager;
    numberingListManager: NumberingListStyleManager;
    currImporter: StyleManager<StyleBase<any>>;
    readonly abstractListInfos: Record<string, OpenXmlAbstractNumberingInfo>;
    readonly listInfos: Record<number, OpenXmlNumberingListInfo>;
    readonly numberingStyleInfos: Record<string, OpenXmlStyleInfo<NumberingListStyle>>;
    readonly deferredStyles: StyleDestination[];
    constructor(data: Data);
    findNumberingListInfoById(id: number): OpenXmlNumberingListInfo;
    addListInfo(listInfo: OpenXmlNumberingListInfo): void;
    addAbstractListInfo(abstractListInfo: OpenXmlAbstractNumberingInfo): void;
    addNumberingListStyleInfo(styleInfo: OpenXmlStyleInfo<NumberingListStyle>): void;
    presetDefaultStyles(): void;
    determineParents(): void;
    linkStyles(): void;
    presetDefaultProperties(): void;
    createNumberingLists(documentModel: DocumentModel): void;
    findAbstractListInfosById(abstractNumberingListId: string): OpenXmlAbstractNumberingInfo;
}
//# sourceMappingURL=styles-importer.d.ts.map