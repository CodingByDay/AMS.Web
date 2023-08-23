import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { MaskedParagraphPropertiesBundleFull } from '../../rich-utils/properties-bundle';
import { CharacterProperties } from '../character/character-properties';
import { DocumentModel } from '../document-model';
import { IParagraphPropertiesContainer } from '../interfaces';
import { IOverrideListLevel } from '../numbering-lists/list-level';
import { AbstractNumberingList, NumberingList } from '../numbering-lists/numbering-list';
import { Position } from '../position/position';
import { SubDocument } from '../sub-document';
import { TableCell } from '../tables/main-structures/table-cell';
import { MaskedParagraphProperties, ParagraphProperties } from './paragraph-properties';
import { ParagraphStyle, TabInfo, TabProperties } from './paragraph-style';
export declare class TabsInfo {
    positions: TabInfo[];
    defaultTabStop: number;
}
export declare enum TabAlign {
    Left = 0,
    Center = 1,
    Right = 2,
    Decimal = 3,
    Numbering = 4
}
export declare class Paragraph implements IParagraphPropertiesContainer {
    subDocument: SubDocument;
    startLogPosition: Position;
    length: number;
    paragraphStyle: ParagraphStyle;
    private mergedParagraphFormatting;
    maskedParagraphProperties: MaskedParagraphProperties;
    tabs: TabProperties;
    numberingListIndex: number;
    listLevelIndex: number;
    get isEmpty(): boolean;
    constructor(subDocument: SubDocument, startLogPosition: Position, length: number, paragraphStyle: ParagraphStyle, maskedParagraphProperties: MaskedParagraphProperties, indexInMaskedParagraphProperitesCache?: number);
    getParagraphBundleFull(model: DocumentModel): MaskedParagraphPropertiesBundleFull;
    getTableCell(): TableCell;
    isInList(): boolean;
    isInOwnList(): boolean;
    isInStyleList(): boolean;
    getListLevelIndex(): number;
    getListLevel(): IOverrideListLevel;
    getNumberingListIndex(): number;
    getNumberingList(): NumberingList;
    getAbstractNumberingList(): AbstractNumberingList;
    getAbstractNumberingListIndex(): number;
    getNumberingListText(): string;
    getNumberingListTextCore(counters: number[]): string;
    getNumberingListSeparatorChar(): string;
    getNumerationCharacterProperties(): CharacterProperties;
    private getNumerationLanguageId;
    private formatNumberingListText;
    get interval(): FixedInterval;
    getEndPosition(): number;
    setParagraphProperties(properties: MaskedParagraphProperties): void;
    onParagraphPropertiesChanged(): void;
    resetParagraphMergedProperties(): void;
    getParagraphMergedProperties(): ParagraphProperties;
    setParagraphMergedProperies(properties: ParagraphProperties): void;
    hasParagraphMergedProperies(): boolean;
    getTabs(): TabsInfo;
    clone(subDocument: SubDocument): Paragraph;
    copyFrom(from: Paragraph): void;
}
//# sourceMappingURL=paragraph.d.ts.map