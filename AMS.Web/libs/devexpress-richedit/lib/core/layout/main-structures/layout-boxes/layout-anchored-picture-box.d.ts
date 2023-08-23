import { ICloneable } from '@devexpress/utils/lib/types';
import { IPictureRenderer } from '../../../canvas/picture-renderer';
import { CacheImageInfo } from '../../../model/caches/images';
import { CharacterProperties } from '../../../model/character/character-properties';
import { LayoutCharacterPropertiesColorInfo } from '../../../model/character/layout-character-properties-color-info';
import { AnchorInfo } from '../../../model/floating-objects/anchor-info';
import { Shape } from '../../../model/shapes/shape';
import { LayoutAnchoredObjectBox } from './layout-anchored-object-box';
import { LayoutBoxType } from './layout-box';
export declare class LayoutAnchoredPictureBox extends LayoutAnchoredObjectBox implements ICloneable<LayoutAnchoredPictureBox> {
    cacheInfo: CacheImageInfo;
    isLoaded: boolean;
    constructor(characterProperties: CharacterProperties, colorInfo: LayoutCharacterPropertiesColorInfo, belongsToSubDocId: number, anchorInfo: AnchorInfo, shape: Shape, objectId: number, rotationInRadians: number, cacheInfo: CacheImageInfo);
    getType(): LayoutBoxType;
    equals(obj: LayoutAnchoredPictureBox): boolean;
    clone(): LayoutAnchoredPictureBox;
    renderGetContent(renderer: IPictureRenderer): string | HTMLElement;
}
//# sourceMappingURL=layout-anchored-picture-box.d.ts.map