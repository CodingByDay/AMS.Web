import { LayoutBoxType } from '../../../core/layout/main-structures/layout-boxes/layout-box';
import { SentenceStructureBuilder } from '../../../core/model/sentence-model-builder';
import { SubDocumentInterval } from '../../../core/model/sub-document';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { CommandBase } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { BackspaceCommand } from './backspace-command';
export class RemoveWordCommandBase extends CommandBase {
    getState() {
        return new SimpleCommandState(this.isEnabled());
    }
    executeCore(_state, _options) {
        const selection = this.selection;
        const position = selection.lastSelectedInterval.start;
        const subDocument = this.selection.activeSubDocument;
        const parIndex = SearchUtils.normedInterpolationIndexOf(subDocument.paragraphs, (p) => p.startLogPosition.value, position);
        const delInterval = this.getDeleteInterval(subDocument, position, parIndex);
        if (!delInterval || delInterval.length == 0)
            return false;
        const fieldsAccordingInterval = BackspaceCommand.getIntervalAccordingFields(subDocument, selection, delInterval, false);
        if (fieldsAccordingInterval)
            delInterval.copyFrom(fieldsAccordingInterval);
        this.history.addTransaction(() => {
            this.addSelectionBefore();
            this.modelManipulator.range.removeInterval(new SubDocumentInterval(subDocument, delInterval), true, false);
            this.addSelectionAfter(delInterval.start);
        });
        return true;
    }
}
export class RemovePrevWordCommand extends RemoveWordCommandBase {
    getDeleteInterval(subDocument, position, parIndex) {
        return RemovePrevWordCommand.getPrevWordInterval(this.control, subDocument, position, parIndex);
    }
    static getPrevWordInterval(control, subDocument, position, parIndex) {
        let paragraph = subDocument.paragraphs[parIndex];
        if (paragraph.startLogPosition.value == position) {
            if (parIndex == 0)
                return null;
            paragraph = subDocument.paragraphs[parIndex - 1];
        }
        const sentenceFindInterval = FixedInterval.fromPositions(paragraph.startLogPosition.value, position);
        const sentenceStructureBuilder = SentenceStructureBuilder.getBuilder(control.layoutFormatterManager, control.selection, subDocument, sentenceFindInterval, true);
        const part = ListUtils.unsafeReverseAnyOf(sentenceStructureBuilder.sentences, (sentence) => ListUtils.unsafeReverseAnyOf(sentence.words, (word) => word.parts[0].position < position ? word.parts[0] : null));
        return part ? FixedInterval.fromPositions(part.position, position) : null;
    }
}
export class RemoveNextWordCommand extends RemoveWordCommandBase {
    getDeleteInterval(subDocument, position, parIndex) {
        return RemoveNextWordCommand.getNextWordInterval(this.control, subDocument, position, parIndex);
    }
    static getNextWordInterval(control, subDocument, position, parIndex) {
        parIndex = Math.min(subDocument.paragraphs.length - 1, parIndex + 1);
        const paragraph = subDocument.paragraphs[parIndex];
        const sentenceFindInterval = FixedInterval.fromPositions(position, paragraph.getEndPosition());
        const sentenceStructureBuilder = SentenceStructureBuilder.getBuilder(control.layoutFormatterManager, control.selection, subDocument, sentenceFindInterval, true);
        const part = ListUtils.unsafeAnyOf(sentenceStructureBuilder.sentences, (sentence) => ListUtils.unsafeAnyOf(sentence.words, (word) => {
            if (word.parts[0].position > position)
                return word.parts[0];
            return ListUtils.unsafeAnyOf(word.parts, (part) => part.position > position &&
                (part.type == LayoutBoxType.ParagraphMark || part.type == LayoutBoxType.SectionMark) ? part : null, 1);
        }));
        return FixedInterval.fromPositions(position, part ? part.position : paragraph.getEndPosition());
    }
}
