import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { ICloneable, ISupportCopyFrom } from '@devexpress/utils/lib/types';
import { IPictureRenderer } from '../../../canvas/picture-renderer';
import { BoxWrap } from '../../../layout-formatter/box/box-wrap';
import { MeasureInfo } from '../../../measurer/measure-info';
import { IMeasurer } from '../../../measurer/measurer';
import { CharacterProperties } from '../../../model/character/character-properties';
import { LayoutCharacterPropertiesColorInfo } from '../../../model/character/layout-character-properties-color-info';
import { LayoutRow } from '../layout-row';
export declare enum LayoutBoxType {
    Text = 0,
    Space = 1,
    Dash = 2,
    TabSpace = 3,
    LineBreak = 4,
    PageBreak = 5,
    ColumnBreak = 6,
    SectionMark = 7,
    ParagraphMark = 8,
    Picture = 9,
    NumberingList = 10,
    FieldCodeStart = 11,
    FieldCodeEnd = 12,
    FieldResultEnd = 13,
    LayoutDependent = 14,
    NonBreakingSpace = 15,
    AnchorPicture = 16,
    AnchorTextBox = 17
}
export declare class LayoutRenderCharacterProperties {
    initProps: CharacterProperties;
    colorInfo: LayoutCharacterPropertiesColorInfo;
    constructor(initProps: CharacterProperties, colorInfo: LayoutCharacterPropertiesColorInfo);
}
export declare abstract class LayoutBox extends Rectangle implements ICloneable<LayoutBox>, ISupportCopyFrom<LayoutBox> {
    characterProperties: CharacterProperties;
    colorInfo: LayoutCharacterPropertiesColorInfo;
    rowOffset: number;
    hyperlinkTip: string;
    fieldLevel: number;
    constructor(characterProperties: CharacterProperties, colorInfo: LayoutCharacterPropertiesColorInfo);
    abstract clone(): LayoutBox;
    abstract pushInfoForMeasure(info: MeasureInfo[], showHiddenSymbols: boolean): any;
    abstract popInfoForMeasure(info: MeasureInfo[], showHiddenSymbols: boolean): any;
    abstract getType(): LayoutBoxType;
    abstract isWhitespace(): boolean;
    abstract isLineBreak(): boolean;
    get isDashBox(): boolean;
    get isSectionBreakBox(): boolean;
    abstract renderGetContent(renderer: IPictureRenderer): string | HTMLElement;
    equals(obj: LayoutBox): boolean;
    copyFrom(obj: LayoutBox): void;
    static initializeWithMeasurer(wrappers: BoxWrap[], measurer: IMeasurer, showHiddenSymbols: boolean): void;
    getEndPosition(): number;
    getTop(row: LayoutRow): number;
    getAscent(): number;
    getDescent(): number;
    isVisibleForRowAlign(): boolean;
    isVisible(): boolean;
    getCharOffsetXInPixels(_measurer: IMeasurer, charOffset: number): number;
    getLength(): number;
    calculateCharOffsetByPointX(_measurer: IMeasurer, pointX: number): number;
    splitByWidth(_measurer: IMeasurer, maxWidth: number, leaveAtLeastOneChar: boolean): LayoutBox;
    getCharIndex(_char: string): number;
    splitBoxByPosition(_measurer: IMeasurer, _offsetAtStartBox: number): LayoutBox;
    renderNoStrikeoutAndNoUnderlineIfBoxInEndRow(): boolean;
    renderIsWordBox(): boolean;
    renderGetCharacterProperties(): LayoutRenderCharacterProperties;
}
//# sourceMappingURL=layout-box.d.ts.map