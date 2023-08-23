import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { MathUtils } from '@devexpress/utils/lib/utils/math';
import { AddParagraphToListHistoryItem, RemoveParagraphFromListHistoryItem } from '../history/items/numbering-list-history-items';
import { ParagraphFirstLineIndentHistoryItem, ParagraphFirstLineIndentTypeHistoryItem, ParagraphLeftIndentHistoryItem } from '../history/items/paragraph-properties-history-items';
import { ParagraphFirstLineIndent } from '../paragraph/paragraph-properties';
import { SubDocumentInterval } from '../sub-document';
import { NumberingList } from './numbering-list';
export class NumberingHelper {
    static generateNewTemplateCode(documentModel) {
        for (;;) {
            const code = MathUtils.getRandomInt(NumberingHelper.templateCodeStart, NumberingHelper.templateCodeEnd);
            if (NumberingHelper.isNewTemplateCode(documentModel, code))
                return code;
        }
    }
    static isNewTemplateCode(documentModel, templateCode) {
        const itemSameCode = documentModel.cache.listLevelPropertiesCache.findItemByPredicate((item) => {
            return item.templateCode == templateCode;
        });
        return !itemSameCode;
    }
    static getNumberingListTemplateIndex(documentModel, type) {
        for (var i = 0, abstractNumberingList; abstractNumberingList = documentModel.abstractNumberingListTemplates[i]; i++) {
            if (abstractNumberingList.getListType() === type)
                return i;
        }
        return -1;
    }
    static deleteNumberingList(modelManager, subDocument, paragraphIndices) {
        for (let i = paragraphIndices.length - 1; i >= 0; i--) {
            let paragraphIndex = paragraphIndices[i];
            var paragraph = subDocument.paragraphs[paragraphIndex];
            if (paragraph.isInList()) {
                this.resetParagraphLeftIndent(modelManager, subDocument, paragraphIndex);
                this.deleteNumberingListCore(modelManager, subDocument, paragraphIndex);
            }
        }
    }
    static resetParagraphLeftIndent(modelManager, subDocument, paragraphIndex) {
        var paragraph = subDocument.paragraphs[paragraphIndex];
        var numberingList = paragraph.getNumberingList();
        var level = numberingList.levels[paragraph.getListLevelIndex()];
        var paragraphMergedProperties = paragraph.getParagraphMergedProperties();
        var interval = paragraph.interval;
        const levelIndent = level.getListLevelProperties().originalLeftIndent ? level.getListLevelProperties().originalLeftIndent : level.getParagraphProperties().firstLineIndent;
        var leftIndent = paragraphMergedProperties.leftIndent - levelIndent;
        modelManager.history.addAndRedo(new ParagraphFirstLineIndentTypeHistoryItem(modelManager.modelManipulator, new SubDocumentInterval(subDocument, interval), ParagraphFirstLineIndent.None, true));
        modelManager.history.addAndRedo(new ParagraphFirstLineIndentHistoryItem(modelManager.modelManipulator, new SubDocumentInterval(subDocument, interval), 0, true));
        modelManager.history.addAndRedo(new ParagraphLeftIndentHistoryItem(modelManager.modelManipulator, new SubDocumentInterval(subDocument, interval), Math.max(0, leftIndent), true));
    }
    static deleteNumberingListCore(modelManager, subDocument, paragraphIndex) {
        var paragraph = subDocument.paragraphs[paragraphIndex];
        if (paragraph.numberingListIndex >= 0) {
            modelManager.history.addAndRedo(new RemoveParagraphFromListHistoryItem(modelManager.modelManipulator, subDocument, paragraphIndex));
        }
        else {
            if (paragraph.numberingListIndex === NumberingList.NumberingListNotSettedIndex)
                modelManager.history.addAndRedo(new ParagraphLeftIndentHistoryItem(modelManager.modelManipulator, new SubDocumentInterval(subDocument, new FixedInterval(paragraph.startLogPosition.value, 0)), paragraph.getParagraphMergedProperties().leftIndent, true));
            modelManager.history.addAndRedo(new AddParagraphToListHistoryItem(modelManager.modelManipulator, subDocument, paragraphIndex, NumberingList.NoNumberingListIndex, 0));
        }
    }
}
NumberingHelper.templateCodeStart = 0x100;
NumberingHelper.templateCodeEnd = 0x7FFFFFFF;
