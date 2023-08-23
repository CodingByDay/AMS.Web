import { ICharacterPropertyDescriptor } from '../../../../../core/model/character/character-property-descriptor';
import { ColorModelInfo } from '../../../../../core/model/color/color-model-info';
import { XmlReader } from '../../../../zip/xml-reader';
import { CharacterFormattingLeafElementDestination } from '../character-formatting-leaf-element-destination';
export declare class HighlightColorDestination extends CharacterFormattingLeafElementDestination<ColorModelInfo> {
    processElementOpen(reader: XmlReader): Promise<void>;
    protected getDescriptor(): ICharacterPropertyDescriptor<ColorModelInfo>;
}
//# sourceMappingURL=highlight-color-destination.d.ts.map