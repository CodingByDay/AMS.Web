import { MaskedCharacterProperties } from '../../../core/model/character/character-properties';
import { Chunk } from '../../../core/model/chunk';
import { TextManipulator } from '../../../core/model/manipulators/text-manipulator/text-manipulator';
import { TextRun } from '../../../core/model/runs/text-run';
import { MaskedCharacterPropertiesBundle } from '../../../core/rich-utils/properties-bundle';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
export class CharacterImporter {
    constructor(data) {
        this.data = data;
        this.resetProperties();
        if (!this.data.subDocument.chunks[0])
            this.data.subDocument.chunks = [new Chunk(this.data.subDocument.positionManager.registerPosition(0), '', true)];
    }
    get style() {
        if (!this._style)
            this.resetStyle();
        return this._style;
    }
    set style(value) {
        this._style = value;
    }
    get charPropsBundle() { return new MaskedCharacterPropertiesBundle(this.properties, this.style); }
    resetProperties() {
        this.properties = MaskedCharacterProperties.createDefault(this.data.documentModel);
        return this;
    }
    resetStyle() {
        this._style = this.data.stylesImporter.characterManager.defaultStyle;
        return this;
    }
    insertText(text) {
        const length = text.length;
        this.addRun(new TextRun(this.data.subDocumentInfo.positionImporter.currPosition, length, this.data.subDocumentInfo.paragraphImporter.paragraph, this.charPropsBundle), text);
    }
    addRun(run, text) {
        const chunk = ListUtils.last(this.data.subDocument.chunks);
        chunk.textRuns.push(run);
        chunk.textBuffer += text;
        this.data.subDocumentInfo.positionImporter.currPosition += run.getLength();
    }
    addRunAtPos(run, text, pos) {
        const chunkIndex = SearchUtils.normedInterpolationIndexOf(this.data.subDocument.chunks, (c) => c.startLogPosition.value, pos);
        const chunk = this.data.subDocument.chunks[chunkIndex];
        const startOffsetAtChunk = pos - chunk.startLogPosition.value;
        const currentRunIndex = SearchUtils.normedInterpolationIndexOf(chunk.textRuns, (r) => r.startOffset, startOffsetAtChunk);
        if (chunk.textRuns[currentRunIndex].startOffset < startOffsetAtChunk)
            this.addRun(run, text);
        else {
            chunk.textRuns.splice(currentRunIndex, 0, run);
            TextManipulator.moveRunsInChunk(chunk, currentRunIndex + 1, text.length);
            chunk.textBuffer = [chunk.textBuffer.substr(0, startOffsetAtChunk), text, chunk.textBuffer.substr(startOffsetAtChunk)].join('');
            this.data.subDocumentInfo.positionImporter.currPosition += run.getLength();
        }
    }
    deleteOneSimpleRun(_start) {
    }
}
