import { ICloneable, IEquatable } from '@devexpress/utils/lib/types';
import { TabLeaderType } from '../../layout/main-structures/layout-boxes/layout-tab-space-box';
import { MaskedCharacterProperties } from '../character/character-properties';
import { CharacterStyle } from '../character/character-style';
import { DocumentModel } from '../document-model';
import { IOverrideListLevel } from '../numbering-lists/list-level';
import { NumberingList } from '../numbering-lists/numbering-list';
import { StyleBase } from '../style-base';
import { TabAlign } from './paragraph';
import { MaskedParagraphProperties, ParagraphProperties } from './paragraph-properties';
export declare class ParagraphStyle extends StyleBase<ParagraphStyle> implements ICloneable<ParagraphStyle> {
    static normalStyleName: string;
    static headingStyleName: string;
    static tocStyleName: string;
    linkedStyle: CharacterStyle;
    nextParagraphStyle: ParagraphStyle;
    maskedCharacterProperties: MaskedCharacterProperties;
    maskedParagraphProperties: MaskedParagraphProperties;
    tabs: TabProperties;
    autoUpdate: boolean;
    numberingListIndex: number;
    listLevelIndex: number;
    constructor(styleName: string, localizedName: string, deleted: boolean, hidden: boolean, semihidden: boolean, isDefault: boolean, maskedCharacterProperties: MaskedCharacterProperties, maskedParagraphProperties: MaskedParagraphProperties, tabs: TabProperties, autoUpdate: boolean, numberingListIndex: number, listLevelIndex: number, base64EncodedImage: string, id?: string);
    getResultTabs(): TabProperties;
    getMergedParagraphProperties(): ParagraphProperties;
    isInOwnList(): boolean;
    getListLevel(model: DocumentModel): IOverrideListLevel;
    getNumberingList(model: DocumentModel): NumberingList;
    getNumberingListIndex(): number;
    getListLevelIndex(): number;
    clone(): ParagraphStyle;
}
export declare class TabProperties implements IEquatable<TabProperties>, ICloneable<TabProperties> {
    tabsInfo: TabInfo[];
    clone(): TabProperties;
    equals(obj: TabProperties): boolean;
    sort(): void;
    indexOf(tabInfo: TabInfo): number;
    add(tabInfo: TabInfo): void;
    deleteByIndex(index: number): void;
    setTabs(tabProp: TabProperties): void;
    merge(tabProperties: TabProperties): void;
}
export declare class TabInfo implements IEquatable<TabInfo>, ICloneable<TabInfo> {
    alignment: TabAlign;
    leader: TabLeaderType;
    position: number;
    isDefault: boolean;
    deleted: boolean;
    constructor(position: number, alignment: TabAlign, leader: TabLeaderType, deleted: boolean, isDefault: boolean);
    clone(): TabInfo;
    equals(obj: TabInfo): boolean;
}
//# sourceMappingURL=paragraph-style.d.ts.map