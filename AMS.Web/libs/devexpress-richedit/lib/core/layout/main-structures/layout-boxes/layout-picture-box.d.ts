import { Size } from '@devexpress/utils/lib/geometry/size';
import { ICloneable, ISupportCopyFrom } from '@devexpress/utils/lib/types';
import { IPictureRenderer } from '../../../canvas/picture-renderer';
import { MeasureInfo } from '../../../measurer/measure-info';
import { CacheImageInfo } from '../../../model/caches/images';
import { CharacterProperties } from '../../../model/character/character-properties';
import { LayoutCharacterPropertiesColorInfo } from '../../../model/character/layout-character-properties-color-info';
import { LayoutBox, LayoutBoxType } from './layout-box';
export declare class LayoutPictureBox extends LayoutBox implements ICloneable<LayoutPictureBox>, ISupportCopyFrom<LayoutPictureBox> {
    cacheInfo: CacheImageInfo;
    isLoaded: boolean;
    constructor(characterProperties: CharacterProperties, colorInfo: LayoutCharacterPropertiesColorInfo, cacheInfo: CacheImageInfo, size: Size);
    equals(obj: LayoutPictureBox): boolean;
    clone(): LayoutPictureBox;
    getType(): LayoutBoxType;
    pushInfoForMeasure(_info: MeasureInfo[], _showHiddenSymbols: boolean): void;
    popInfoForMeasure(_info: MeasureInfo[], _showHiddenSymbols: boolean): void;
    getAscent(): number;
    getDescent(): number;
    isVisible(): boolean;
    isVisibleForRowAlign(): boolean;
    renderGetContent(renderer: IPictureRenderer): HTMLElement | string;
    isWhitespace(): boolean;
    isLineBreak(): boolean;
}
//# sourceMappingURL=layout-picture-box.d.ts.map