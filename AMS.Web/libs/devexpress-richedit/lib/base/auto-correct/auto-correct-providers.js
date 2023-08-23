import { ListLevelDisplayFormatStringHistoryItem } from '../../core/model/history/items/list-level-properties-history-items';
import { InsertTextManipulatorParams } from '../../core/model/manipulators/text-manipulator/insert-text-manipulator-params';
import { NumberingType } from '../../core/model/numbering-lists/numbering-list';
import { RichUtils } from '../../core/model/rich-utils';
import { RunType } from '../../core/model/runs/run-type';
import { SubDocumentInterval, SubDocumentPosition } from '../../core/model/sub-document';
import { InputPositionBase } from '../../core/selection/input-position-base';
import { SelectionIntervalsInfo } from '../../core/selection/selection-intervals-info';
import { ModelWordPositionHelper } from '../../core/spelling/helpers';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { KeyCode } from '@devexpress/utils/lib/utils/key';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { InsertParagraphManipulatorParams } from '../../core/model/manipulators/paragraph-manipulator/insert-paragraph-manipulator-params';
import { RichEditClientCommand } from '../commands/client-command';
import { CommandOptions, CommandBase } from '../commands/command-base';
import { IntervalCommandState } from '../commands/command-states';
import { SelectionHistoryItem } from '../model/history/selection/selection-history-item';
export class AutoCorrectProviderBase {
    constructor(control) {
        this.control = control;
    }
    get subDocument() { return this.control.selection.activeSubDocument; }
    revise() {
        const pos = this.control.selection.lastSelectedInterval.start;
        const lastInsertedChar = this.control.selection.activeSubDocument.getText(new FixedInterval(pos - 1, 1));
        if (this.isTriggerChar(lastInsertedChar)) {
            const wordStartPos = ModelWordPositionHelper.getWordStartPositionByCharCondition(this.control.selection.activeSubDocument, pos - 1, (char) => { return this.isSeparator(char); });
            const wordEndPos = (this.includeTriggerChar(lastInsertedChar) ? pos : pos - 1) - wordStartPos;
            const interval = new FixedInterval(wordStartPos, wordEndPos);
            const text = this.control.selection.activeSubDocument.getText(interval);
            let selectionStateInfo = null;
            if (!this.includeTriggerChar(lastInsertedChar))
                selectionStateInfo = this.control.selection.getFloatingState();
            const autoCorrectResult = this.reviseCore(text, interval);
            if (selectionStateInfo)
                if (autoCorrectResult)
                    this.control.selection.restoreFloatingState(selectionStateInfo);
                else
                    selectionStateInfo.finalize();
            return autoCorrectResult;
        }
        return false;
    }
    isSeparator(char) {
        return !RichUtils.isAlphanumeric.test(char);
    }
    isTriggerChar(char) {
        return this.isSeparator(char);
    }
    includeTriggerChar(_char) {
        return false;
    }
}
export class EventAutoCorrectProvider extends AutoCorrectProviderBase {
    reviseCore(text, interval) {
        this.control.modelManager.history.beginTransaction();
        const handled = this.control.clientSideEvents.raiseAutoCorrect(text, interval);
        this.control.modelManager.history.endTransaction();
        return handled;
    }
    isTriggerChar(_char) {
        return true;
    }
    includeTriggerChar(_char) {
        return true;
    }
}
export class TwoInitialCapitalsAutoCorrectProvider extends AutoCorrectProviderBase {
    reviseCore(text, interval) {
        if (text.length > 2 && text[0] === text[0].toUpperCase() && text[1] === text[1].toUpperCase()) {
            for (let i = 2; i < text.length; i++)
                if (text[i] !== text[i].toLowerCase() || text[i] == text[i].toUpperCase())
                    return false;
            const replaceWith = text.substring(0, 1) + text[1].toLowerCase() + text.slice(2);
            this.control.modelManager.history.beginTransaction();
            this.control.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(this.control.selection.activeSubDocument, interval), false, false);
            this.control.modelManager.modelManipulator.text.insertTextViaHistory(new InsertTextManipulatorParams(new SubDocumentPosition(this.control.selection.activeSubDocument, interval.start), new InputPositionBase().setIntervals(SelectionIntervalsInfo.fromPosition(this.control.selection.activeSubDocument, interval.start))
                .charPropsBundle, RunType.TextRun, replaceWith));
            this.control.modelManager.history.endTransaction();
            return true;
        }
        return false;
    }
}
export class BulletedListAutoCorrectProvider extends AutoCorrectProviderBase {
    constructor() {
        super(...arguments);
        this.numberingRegEx = /^[0-9]+[\.\)]$/;
    }
    reviseCore(text, interval) {
        const subDocument = this.control.selection.activeSubDocument;
        const position = interval.end;
        const paragraphIndex = subDocument.getParagraphIndexByPosition(position);
        const paragraph = subDocument.paragraphs[paragraphIndex];
        if (paragraph.isInList())
            return false;
        const parStartPosition = paragraph.startLogPosition.value;
        if (parStartPosition !== interval.start)
            return false;
        const targetNumberingListType = this.getTargetNumberingListType(text);
        if (targetNumberingListType === undefined)
            return false;
        this.control.modelManager.history.beginTransaction();
        this.control.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(subDocument, FixedInterval.fromPositions(parStartPosition, position + 1)), false, false);
        this.control.selection.changeState(newState => newState.setPosition(parStartPosition));
        if (targetNumberingListType === NumberingType.Bullet)
            this.control.commandManager.getCommand(RichEditClientCommand.ToggleBulletedListItem).execute(this.control.commandManager.isPublicApiCall);
        else {
            const targetIndex = parseInt(text.slice(0, -1));
            this.control.commandManager.getCommand(RichEditClientCommand.ToggleNumberingListItem).execute(this.control.commandManager.isPublicApiCall, targetIndex);
            const numberingListIndex = this.control.modelManager.model.numberingLists.length - 1;
            const separator = text[text.length - 1];
            for (var i = 0, length = this.control.modelManager.model.numberingLists[numberingListIndex].levels.length; i < length; i++)
                this.control.modelManager.history.addAndRedo(new ListLevelDisplayFormatStringHistoryItem(this.control.modelManager.modelManipulator, false, numberingListIndex, i, `{${i}}${separator}`));
        }
        this.control.modelManager.history.endTransaction();
        return true;
    }
    isSeparator(char) {
        return RichUtils.isWhitespace.test(char);
    }
    isTriggerChar(char) {
        return char.charCodeAt(0) != KeyCode.Enter && RichUtils.isWhitespace.test(char);
    }
    getTargetNumberingListType(paragraphText) {
        if (paragraphText.length === 1 && paragraphText.indexOf("*") === 0)
            return NumberingType.Bullet;
        if (this.numberingRegEx.test(paragraphText))
            return NumberingType.Simple;
        return undefined;
    }
}
export class UrlAutoCorrectProvider extends AutoCorrectProviderBase {
    constructor() {
        super(...arguments);
        this.urlRegex = /^(?:[a-z][\w-]+:(?:\/{1,3}([^./]*:[^./]*@){0,1})|www\d{0,3}[.]|ftp[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?=((?:[^\s()<>]+|\([^\s<>]*\))+(?:\([^\s<>]*\)|[^\s`!()\[\]{};:'"".,<>?«»“”‘’])))\2$/i;
        this.emailRegex = /^(mailto:)?[-\w!#$%&'*+/=?^_`{|}~]+(?:\.[-\w!#$%&'*+/=?^_`{|}~]+)*@(?:\w+([-\w]*\w)\.)[\w]+$/;
        this.localRegex = /^(([a-zA-Z][:][\\])|(\\\\))(((?![<>:"\\|?*]).)+((?![ .])\\)?)*$/;
    }
    reviseCore(text, interval) {
        if (this.urlRegex.test(text) || this.emailRegex.test(text) || this.localRegex.test(text)) {
            this.control.modelManager.history.beginTransaction();
            this.control.modelManager.history.addAndRedo(new SelectionHistoryItem(this.control.modelManager.modelManipulator, this.control.selection, this.control.selection.getState(), this.control.selection.getState().setIntervals([interval])));
            const command = this.control.commandManager
                .getCommand(RichEditClientCommand.ShowHyperlinkForm);
            const options = new CommandOptions(this.control).setIntervalsInfo(SelectionIntervalsInfo.fromInterval(this.subDocument, interval));
            const state = command.getState(options);
            const parameters = command.createParameters(options);
            const initParameters = parameters.clone();
            parameters.text = text;
            parameters.url = this.createNavigateUri(text);
            const result = command.applyParameters(new IntervalCommandState(state.enabled, interval), parameters, initParameters);
            this.control.modelManager.history.endTransaction();
            return result;
        }
        return false;
    }
    createNavigateUri(url) {
        if (url.indexOf(":") == -1 && url.indexOf("@") > 0)
            return "mailto:" + url;
        if (url.indexOf("www") == 0)
            return "http://" + url;
        if (url.indexOf("\\") == 0)
            return "file://" + url.replace(/\\/g, "\\\\");
        return url;
    }
    isSeparator(char) {
        return RichUtils.isWhitespace.test(char);
    }
}
export class TableBasedAutoCorrectProviderBase extends AutoCorrectProviderBase {
    constructor(control, settings) {
        super(control);
        this.replaceInfoCollection = [];
        this.caseSensitiveReplacement = settings.caseSensitiveReplacement;
        settings.replaceInfoCollection.sort((a, b) => this.compare(a.replace, b.replace));
        this.initReplaceInfo(settings.replaceInfoCollection);
    }
    compare(origin, target) {
        if (!this.caseSensitiveReplacement) {
            origin = origin.toLocaleLowerCase();
            target = target.toLocaleLowerCase();
        }
        return origin === target ? 0 : (origin < target ? -1 : 1);
    }
}
export class TableBasedSimpleAutoCorrectProvider extends TableBasedAutoCorrectProviderBase {
    initReplaceInfo(replaceInfoCollection) {
        ListUtils.forEach(replaceInfoCollection, val => {
            if (RichUtils.isAlphanumeric.test(val.replace))
                this.replaceInfoCollection.push(val);
        });
    }
    reviseCore(text, interval) {
        const replaceWordIndex = SearchUtils.binaryIndexOf(this.replaceInfoCollection, a => this.compare(a.replace, text));
        if (replaceWordIndex >= 0) {
            const replaceWith = this.replaceInfoCollection[replaceWordIndex].with;
            const replaceWithStrings = this.splitByLines(replaceWith);
            const charPropsBundle = this.control.inputPosition.charPropsBundle;
            this.control.modelManager.history.beginTransaction();
            CommandBase.addSelectionBefore(this.control);
            this.control.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(this.subDocument, interval), true, false);
            let endOfInsertedInterval = interval.start;
            for (let i = 0; i < replaceWithStrings.length; i++) {
                const result = this.control.modelManager.modelManipulator.text.insertTextViaHistory(new InsertTextManipulatorParams(new SubDocumentPosition(this.subDocument, endOfInsertedInterval), charPropsBundle, RunType.TextRun, replaceWithStrings[i]));
                endOfInsertedInterval = result.insertedInterval.end;
                if (replaceWithStrings[i + 1]) {
                    const result = this.control.modelManager.modelManipulator.paragraph.insertParagraphViaHistory(new InsertParagraphManipulatorParams(new SubDocumentPosition(this.subDocument, endOfInsertedInterval), charPropsBundle));
                    endOfInsertedInterval = result.end;
                }
            }
            CommandBase.addSelectionAfter(this.control, endOfInsertedInterval + 1);
            this.control.modelManager.history.endTransaction();
            return true;
        }
        return false;
    }
    splitByLines(text) {
        return text ? text.split(/\r\n|\r|\n/) : [''];
    }
}
export class TableBasedCompositeAutoCorrectProvider extends TableBasedAutoCorrectProviderBase {
    initReplaceInfo(replaceInfoCollection) {
        ListUtils.forEach(replaceInfoCollection, val => {
            const lastSymbol = val.replace[val.replace.length - 1];
            if (!RichUtils.isAlphanumeric.test(val.replace) && RichUtils.isAlphanumeric.test(lastSymbol))
                this.replaceInfoCollection.push(val);
        });
    }
    reviseCore(text, interval) {
        for (let val of this.replaceInfoCollection) {
            if (this.isEndOf(val.replace, text)) {
                const diff = val.replace.length - text.length;
                const start = interval.start - diff;
                if (start >= 0) {
                    const intervalToCheck = new FixedInterval(start, interval.end - start);
                    const textToCheck = this.control.selection.activeSubDocument.getText(intervalToCheck);
                    if (this.isEndOf(val.replace, textToCheck)) {
                        const charPropsBundle = this.control.inputPosition.charPropsBundle;
                        this.control.modelManager.history.beginTransaction();
                        this.control.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(this.subDocument, intervalToCheck), true, false);
                        const result = this.control.modelManager.modelManipulator.text.insertTextViaHistory(new InsertTextManipulatorParams(new SubDocumentPosition(this.subDocument, intervalToCheck.start), charPropsBundle, RunType.TextRun, val.with));
                        this.control.modelManager.history.addAndRedo(new SelectionHistoryItem(this.control.modelManager.modelManipulator, this.control.selection, this.control.selection.getState(), this.control.selection.getState().setPosition(result.insertedInterval.end)));
                        this.control.modelManager.history.endTransaction();
                        return true;
                    }
                }
            }
        }
        return false;
    }
    isEndOf(origin, target) {
        return this.compare(origin.substr(target.length * -1, target.length), target) == 0;
    }
}
export class TableBasedImmediateAutoCorrectProvider extends TableBasedCompositeAutoCorrectProvider {
    initReplaceInfo(replaceInfoCollection) {
        this.triggeredChar = [];
        ListUtils.forEach(replaceInfoCollection, val => {
            const lastSymbol = val.replace[val.replace.length - 1];
            if (!RichUtils.isAlphanumeric.test(lastSymbol)) {
                this.triggeredChar.push(lastSymbol);
                this.replaceInfoCollection.push(val);
            }
        });
    }
    isTriggerChar(char) {
        return ListUtils.unsafeAnyOf(this.triggeredChar, (currVal) => currVal == char);
    }
    includeTriggerChar(_char) {
        return true;
    }
}
