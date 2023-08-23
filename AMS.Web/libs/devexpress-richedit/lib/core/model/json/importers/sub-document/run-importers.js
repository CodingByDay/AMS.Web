import { MaskedCharacterPropertiesBundle } from '../../../../rich-utils/properties-bundle';
import { AnchorPictureInfo, InlinePictureInfo } from '../../../manipulators/picture-manipulator/insert-picture-manipulator-params';
import { AnchoredPictureRun } from '../../../runs/anchored-picture-run';
import { AnchoredTextBoxRun } from '../../../runs/anchored-text-box-run';
import { InlinePictureRun } from '../../../runs/inline-picture-run';
import { InlineTextBoxRun } from '../../../runs/inline-text-box-run';
import { TextRun } from '../../../runs/text-run';
import { JSONAnchoredPictureRunProperty, JSONAnchoredTextBoxRunProperty, JSONInlinePictureRunProperty, JSONInlineTextBoxRunProperty, JSONRunBaseProperty } from '../../enums/json-run-enums';
import { JSONShapeConverter } from '../json-shape-converter';
import { JSONAnchorInfoConverter } from './json-anchor-info-converter';
import { JSONTextBoxPropertiesConverter } from './json-text-box-properties-converter';
import { JSONAnchorTextBoxSizeConverterConverter } from './sizes/json-anchor-text-box-size-converter';
import { JSONInlinePictureSizeConverterConverter } from './sizes/json-inline-picture-size-converter';
import { JSONInlineTextBoxSizeConverterConverter } from './sizes/json-inline-text-box-size-converter';
import { NonVisualDrawingObjectInfo } from '../../../manipulators/picture-manipulator/non-visual-drawing-object-info';
import { JSONNonVisualPropertiesConverter } from './json-non-visual-properties';
export class BaseRunImporter {
    getRun(paragraph, startOffset, jsonRun) {
        return this.makeRun(jsonRun, startOffset, paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterPropertiesCache.getItemByJsonKey(jsonRun[JSONRunBaseProperty.MaskedCharacterPropertiesCacheIndex]), this.charStyles[jsonRun[JSONRunBaseProperty.CharacterStyleIndex]]));
    }
    init(maskedCharacterPropertiesCache, charStyles, imageCache, imageCorrespondence) {
        this.imageCorrespondence = imageCorrespondence;
        this.charStyles = charStyles;
        this.maskedCharacterPropertiesCache = maskedCharacterPropertiesCache;
        this.imageCache = imageCache;
    }
}
export class SimpleRunImporter extends BaseRunImporter {
    constructor(runConstructor) {
        super();
        this.runConstructor = runConstructor;
    }
    makeRun(_jsonRun, startOffset, paragraph, charPropsBundle) {
        return new this.runConstructor(startOffset, paragraph, charPropsBundle);
    }
}
export class TextRunImporter extends BaseRunImporter {
    makeRun(jsonRun, startOffset, paragraph, charPropsBundle) {
        return new TextRun(startOffset, jsonRun[JSONRunBaseProperty.Length], paragraph, charPropsBundle);
    }
}
export class AnchoredPictureRunImporter extends BaseRunImporter {
    makeRun(jsonRun, startOffset, paragraph, charPropsBundle) {
        const initId = jsonRun[JSONAnchoredPictureRunProperty.PictureId];
        const realId = this.imageCorrespondence ? this.imageCorrespondence[initId] : initId;
        const cacheInfo = this.imageCache.getPictureData(realId);
        const run = new AnchoredPictureRun(startOffset, paragraph, charPropsBundle, new AnchorPictureInfo(JSONInlinePictureSizeConverterConverter.convertFromJSON(jsonRun[JSONAnchoredPictureRunProperty.Size], cacheInfo), JSONShapeConverter.convertFromJSON(jsonRun[JSONAnchoredPictureRunProperty.Shape]), JSONAnchorInfoConverter.convertFromJSON(jsonRun[JSONAnchoredPictureRunProperty.AnchorInfo]), JSONNonVisualPropertiesConverter.convertFromJSON(jsonRun[JSONAnchoredPictureRunProperty.DrawingObjectProperties]), new NonVisualDrawingObjectInfo()), -1);
        return run;
    }
}
export class AnchoredTextBoxRunImporter extends BaseRunImporter {
    makeRun(jsonRun, startOffset, paragraph, charPropsBundle) {
        return new AnchoredTextBoxRun(startOffset, paragraph, charPropsBundle, JSONShapeConverter.convertFromJSON(jsonRun[JSONAnchoredTextBoxRunProperty.Shape]), jsonRun[JSONAnchoredTextBoxRunProperty.SubDocId], JSONAnchorTextBoxSizeConverterConverter.convertFromJSON(jsonRun[JSONAnchoredTextBoxRunProperty.Size]), JSONAnchorInfoConverter.convertFromJSON(jsonRun[JSONAnchoredTextBoxRunProperty.AnchorInfo]), -1, JSONTextBoxPropertiesConverter.convertFromJSON(jsonRun[JSONAnchoredTextBoxRunProperty.TextBoxProperties]), JSONNonVisualPropertiesConverter.convertFromJSON(jsonRun[JSONAnchoredTextBoxRunProperty.DrawingObjectProperties]));
    }
}
export class InlinePictureRunImporter extends BaseRunImporter {
    makeRun(jsonRun, startOffset, paragraph, charPropsBundle) {
        const initId = jsonRun[JSONAnchoredPictureRunProperty.PictureId];
        const realId = this.imageCorrespondence ? this.imageCorrespondence[initId] : initId;
        const cacheInfo = this.imageCache.getPictureData(realId);
        const run = new InlinePictureRun(startOffset, paragraph, charPropsBundle, new InlinePictureInfo(JSONInlinePictureSizeConverterConverter.convertFromJSON(jsonRun[JSONInlinePictureRunProperty.Size], cacheInfo), JSONShapeConverter.convertFromJSON(jsonRun[JSONInlinePictureRunProperty.Shape]), -1, JSONNonVisualPropertiesConverter.convertFromJSON(jsonRun[JSONInlinePictureRunProperty.DrawingObjectProperties]), new NonVisualDrawingObjectInfo()));
        return run;
    }
}
export class InlineTextBoxRunImporter extends BaseRunImporter {
    makeRun(jsonRun, startOffset, paragraph, charPropsBundle) {
        return new InlineTextBoxRun(startOffset, paragraph, charPropsBundle, JSONShapeConverter.convertFromJSON(jsonRun[JSONInlineTextBoxRunProperty.Shape]), jsonRun[JSONInlineTextBoxRunProperty.SubDocId], JSONInlineTextBoxSizeConverterConverter.convertFromJSON(jsonRun[JSONInlineTextBoxRunProperty.Size]), JSONTextBoxPropertiesConverter.convertFromJSON(jsonRun[JSONInlineTextBoxRunProperty.TextBoxProperties]), JSONNonVisualPropertiesConverter.convertFromJSON(jsonRun[JSONInlineTextBoxRunProperty.DrawingObjectProperties]));
    }
}
