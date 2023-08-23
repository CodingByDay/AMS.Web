import { CharacterStyle } from '../../../core/model/character/character-style';
import { ApplyParagraphStyleHistoryItem } from '../../../core/model/history/items/apply-style-history-items';
import { FontUseValueHistoryItem } from '../../../core/model/history/items/character-properties-history-items';
import { CreateStyleLinkHistoryItem } from '../../../core/model/history/items/create-style-link-history-item';
import { AddParagraphToListHistoryItem } from '../../../core/model/history/items/numbering-list-history-items';
import { ParagraphUseValueHistoryItem } from '../../../core/model/history/items/paragraph-properties-history-items';
import { NumberingList } from '../../../core/model/numbering-lists/numbering-list';
import { ControlOptions } from '../../../core/model/options/control';
import { RichUtils } from '../../../core/model/rich-utils';
import { StylesManager } from '../../../core/model/styles-manager';
import { SubDocumentInterval } from '../../../core/model/sub-document';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { CommandBase } from '../command-base';
import { IntervalCommandState } from '../command-states';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
export class ApplyStyleCommand extends CommandBase {
    getState() {
        var interval = this.selection.lastSelectedInterval.clone();
        var commonParagraphStyle;
        var commonCharacterStyle;
        if (interval.length === 0)
            commonCharacterStyle = this.inputPosition.getCharacterStyle();
        if (!commonCharacterStyle || commonCharacterStyle.isDefault) {
            var runs = this.selection.activeSubDocument.getRunsByInterval(interval);
            var commonParagraphStyle = runs[0].paragraph.paragraphStyle;
            var commonCharacterStyle = runs[0].characterStyle;
            for (var i = 1, run; run = runs[i]; i++) {
                if (commonCharacterStyle && run.characterStyle !== commonCharacterStyle)
                    commonCharacterStyle = null;
                if (commonParagraphStyle && run.paragraph.paragraphStyle !== commonParagraphStyle)
                    commonParagraphStyle = null;
                if (!commonParagraphStyle && !commonCharacterStyle)
                    break;
            }
        }
        var styleNameWithPrefix = "";
        if (commonCharacterStyle && commonCharacterStyle.linkedStyle)
            styleNameWithPrefix = StylesManager.paragraphPrefix + this.getStyleName(commonCharacterStyle.linkedStyle);
        else if (commonCharacterStyle && !commonCharacterStyle.isDefault)
            styleNameWithPrefix = StylesManager.characterPrefix + this.getStyleName(commonCharacterStyle);
        else if (commonParagraphStyle && !commonParagraphStyle.isDefault)
            styleNameWithPrefix = StylesManager.paragraphPrefix + this.getStyleName(commonParagraphStyle);
        else
            styleNameWithPrefix = StylesManager.paragraphPrefix + this.getStyleName(this.control.modelManager.model.getDefaultParagraphStyle());
        var state = new IntervalCommandState(this.isEnabled(), interval, styleNameWithPrefix);
        state.items = this.control.modelManager.model.stylesManager.characterAndParagraphStyleGalleryItems;
        return state;
    }
    getStyleName(style) {
        return style.styleName;
    }
    executeCore(state, options) {
        const parameter = options.param;
        if (StringUtils.isNullOrEmpty(parameter))
            return false;
        let interval = state.interval.clone();
        let executed = true;
        let isPresetStyle = false;
        this.history.beginTransaction();
        if (StylesManager.isParagraphStyle(parameter)) {
            const styleName = StylesManager.getStyleNameWithoutPrefix(parameter);
            let paragraphStyle = this.control.modelManager.model.getParagraphStyleByName(styleName);
            if (!paragraphStyle) {
                const presetStyle = StylesManager.getPresetParagraphStyleByName(styleName);
                if (!presetStyle)
                    return false;
                paragraphStyle = StylesManager.getPresetParagraphStyleByName(styleName).clone();
                isPresetStyle = true;
            }
            this.applyParagraphStyle(interval, paragraphStyle, isPresetStyle, options.subDocument);
        }
        else {
            const styleName = StylesManager.getStyleNameWithoutPrefix(parameter);
            if (interval.length == 0)
                interval = options.subDocument.getWholeWordInterval(interval.start);
            let characterStyle = this.control.modelManager.model.getCharacterStyleByName(styleName);
            if (!characterStyle) {
                const presetStyle = StylesManager.getPresetCharacterStyleByName(styleName);
                if (!presetStyle)
                    return false;
                characterStyle = presetStyle.clone();
                isPresetStyle = true;
            }
            if (interval.length == 0) {
                if (isPresetStyle) {
                    let fontInfo = characterStyle.maskedCharacterProperties.fontInfo;
                    if (fontInfo && fontInfo.measurer === undefined)
                        characterStyle.maskedCharacterProperties.fontInfo = this.control.modelManager.model.cache.fontInfoCache.getItemByName(fontInfo.name);
                }
                this.inputPosition.setCharacterStyle(characterStyle);
                executed = false;
            }
            else
                this.applyCharacterStyle(interval, characterStyle, isPresetStyle, options.subDocument);
        }
        this.history.endTransaction();
        return executed;
    }
    applyCharacterStyle(interval, style, isPresetStyle, subDocument) {
        if (ControlOptions.isEnabled(this.control.modelManager.richOptions.control.characterStyle)) {
            this.modelManipulator.style.applyCharacterStyle(new SubDocumentInterval(subDocument, interval), isPresetStyle ? this.control.modelManager.model.stylesManager.addCharacterStyle(style) : style, false);
        }
    }
    applyParagraphStyle(interval, style, isPresetStyle, subDocument) {
        var count = this.calculateAffectedParagraphCount(interval, subDocument);
        if (count > 0 && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.paragraphStyle)) {
            var paragraphIndex = SearchUtils.normedInterpolationIndexOf(subDocument.paragraphs, p => p.startLogPosition.value, interval.start);
            for (var i = 0; i < count; i++) {
                var paragraph = subDocument.paragraphs[paragraphIndex + i];
                var paragraphInterval = new FixedInterval(paragraph.startLogPosition.value, paragraph.length);
                var modelManipulator = this.modelManipulator;
                this.history.addAndRedo(new ApplyParagraphStyleHistoryItem(modelManipulator, new SubDocumentInterval(subDocument, paragraphInterval), isPresetStyle ? modelManipulator.model.stylesManager.addParagraphStyle(style) : style));
                this.history.addAndRedo(new ParagraphUseValueHistoryItem(modelManipulator, new SubDocumentInterval(subDocument, paragraphInterval), 0));
                this.history.addAndRedo(new FontUseValueHistoryItem(modelManipulator, new SubDocumentInterval(subDocument, paragraphInterval), 0));
                this.history.addAndRedo(new AddParagraphToListHistoryItem(this.modelManipulator, subDocument, paragraphIndex, NumberingList.NumberingListNotSettedIndex, -1));
            }
        }
        else
            this.applyParagraphLinkedStyle(interval, style, isPresetStyle, subDocument);
    }
    applyParagraphLinkedStyle(interval, style, isPresetStyle, subDocument) {
        if (ControlOptions.isEnabled(this.control.modelManager.richOptions.control.characterStyle)) {
            if (!style.linkedStyle)
                this.createCharacterStyle(style);
            this.applyCharacterStyle(interval, style.linkedStyle, isPresetStyle, subDocument);
        }
    }
    createCharacterStyle(paragraphStyle) {
        var style = new CharacterStyle(paragraphStyle.styleName + " Char", paragraphStyle.localizedName + " Char", false, false, false, false, paragraphStyle.maskedCharacterProperties);
        this.history.addAndRedo(new CreateStyleLinkHistoryItem(this.modelManipulator, style, paragraphStyle));
    }
    calculateAffectedParagraphCount(interval, subDocument) {
        var paragraphs = subDocument.getParagraphsByInterval(interval);
        if (paragraphs.length > 1)
            return paragraphs.length;
        var paragraph = paragraphs[0];
        var lastParagraphCharSelected = interval.length >= paragraph.length - 1;
        if (interval.start === paragraph.startLogPosition.value && lastParagraphCharSelected || interval.length === 0)
            return 1;
        return 0;
    }
    isEnabled() {
        return super.isEnabled() && (ControlOptions.isEnabled(this.control.modelManager.richOptions.control.characterStyle) || ControlOptions.isEnabled(this.control.modelManager.richOptions.control.paragraphStyle));
    }
    getIntervalsForModifying() {
        return RichUtils.getIntervalsOfSelectedParagraphs(this.selection.intervals, this.selection.activeSubDocument);
    }
}
