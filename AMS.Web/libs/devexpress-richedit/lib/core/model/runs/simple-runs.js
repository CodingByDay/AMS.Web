import { MaskedCharacterPropertiesBundle } from '../../rich-utils/properties-bundle';
import { OneCharRun } from './run-base';
import { RunType } from './run-type';
export class SectionRun extends OneCharRun {
    getType() {
        return RunType.SectionRun;
    }
    isParagraphOrSectionRun() {
        return true;
    }
    clone() {
        return new SectionRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new SectionRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class ParagraphRun extends OneCharRun {
    getType() {
        return RunType.ParagraphRun;
    }
    isParagraphOrSectionRun() {
        return true;
    }
    clone() {
        return new ParagraphRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new ParagraphRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class FieldCodeStartRun extends OneCharRun {
    getType() {
        return RunType.FieldCodeStartRun;
    }
    clone() {
        return new FieldCodeStartRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new FieldCodeStartRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class FieldCodeEndRun extends OneCharRun {
    getType() {
        return RunType.FieldCodeEndRun;
    }
    clone() {
        return new FieldCodeEndRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new FieldCodeEndRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class FieldResultEndRun extends OneCharRun {
    getType() {
        return RunType.FieldResultEndRun;
    }
    clone() {
        return new FieldResultEndRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new FieldResultEndRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class LayoutDependentRun extends OneCharRun {
    getType() {
        return RunType.LayoutDependentRun;
    }
    clone() {
        return new LayoutDependentRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new LayoutDependentRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class FootNoteRun extends OneCharRun {
    getType() {
        return RunType.FootNoteRun;
    }
    clone() {
        return new FootNoteRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new FootNoteRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class EndNoteRun extends OneCharRun {
    getType() {
        return RunType.EndNoteRun;
    }
    clone() {
        return new EndNoteRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new EndNoteRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class NoteSeparatorRun extends OneCharRun {
    getType() {
        return RunType.NoteSeparatorRun;
    }
    clone() {
        return new NoteSeparatorRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new NoteSeparatorRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
export class NoteContinuationSeparatorRun extends OneCharRun {
    getType() {
        return RunType.NoteContinuationSeparatorRun;
    }
    clone() {
        return new NoteContinuationSeparatorRun(this.startOffset, this.paragraph, new MaskedCharacterPropertiesBundle(this.maskedCharacterProperties, this.characterStyle));
    }
    cloneToNewSubDocument(subDocument) {
        return new NoteContinuationSeparatorRun(this.startOffset, subDocument.getParagraphByPosition(this.paragraph.startLogPosition.value), new MaskedCharacterPropertiesBundle(subDocument.documentModel.cache.maskedCharacterPropertiesCache.getItem(this.maskedCharacterProperties), subDocument.documentModel.stylesManager.getCharacterStyleByName(this.characterStyle.styleName)));
    }
}
