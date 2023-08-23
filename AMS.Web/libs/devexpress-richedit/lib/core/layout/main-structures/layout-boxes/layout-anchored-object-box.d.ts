import { ISize } from '@devexpress/utils/lib/geometry/interfaces';
import { Polygon } from '@devexpress/utils/lib/geometry/polygon';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { MeasureInfo } from '../../../measurer/measure-info';
import { CharacterProperties } from '../../../model/character/character-properties';
import { LayoutCharacterPropertiesColorInfo } from '../../../model/character/layout-character-properties-color-info';
import { AnchorInfo } from '../../../model/floating-objects/anchor-info';
import { Shape } from '../../../model/shapes/shape';
import { LayoutAnchoredPictureBox } from './layout-anchored-picture-box';
import { LayoutAnchoredTextBox } from './layout-anchored-text-box';
import { LayoutBox } from './layout-box';
import { TableCell } from '../../../model/tables/main-structures/table-cell';
export declare enum AnchoredObjectLevelType {
    BehindText = 0,
    InText = 1,
    BeforeText = 2
}
export declare type LayoutAnchoredObjectBoxTypes = LayoutAnchoredPictureBox | LayoutAnchoredTextBox;
export declare abstract class LayoutAnchoredObjectBox extends LayoutBox {
    belongsToSubDocId: number;
    rotationInRadians: number;
    anchorInfo: AnchorInfo;
    shape: Shape;
    objectId: number;
    rendererLevel: number;
    yShift: number;
    parentCell: TableCell;
    constructor(characterProperties: CharacterProperties, colorInfo: LayoutCharacterPropertiesColorInfo, belongsToSubDocId: number, anchorInfo: AnchorInfo, shape: Shape, objectId: number, rotationInRadians: number);
    equals(obj: LayoutAnchoredObjectBox): boolean;
    isInText(): boolean;
    get levelType(): AnchoredObjectLevelType;
    copyFrom(obj: LayoutAnchoredObjectBox): void;
    getContentBounds(): Rectangle;
    getExtendedBounds(): Rectangle;
    setContentSize(size: ISize): void;
    pushInfoForMeasure(_info: MeasureInfo[], _showHiddenSymbols: boolean): void;
    popInfoForMeasure(_info: MeasureInfo[], _showHiddenSymbols: boolean): void;
    isWhitespace(): boolean;
    isLineBreak(): boolean;
    getRotatedPolygon(): Polygon;
    getOuterBounds(applyMargins: boolean): Rectangle;
}
//# sourceMappingURL=layout-anchored-object-box.d.ts.map