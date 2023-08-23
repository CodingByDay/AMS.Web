import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { LoadCommandRequest, RequestParams } from '../model/json/command-request';
import { CommandType } from '../model/json/command-type';
import { JSONCheckSpellingCommand } from '../model/json/enums/json-general-enums';
import { RichUtils } from '../model/rich-utils';
import { SimpleSentenceStructureBuilder, SimpleSentenceWord } from '../model/simple-sentence-model-builder';
export class SpellChecker {
    constructor(modelRequestHandler, misspelledIntervalsChangesListener, settings) {
        this.modelRequestHandler = modelRequestHandler;
        this.misspelledIntervalsChangesListener = misspelledIntervalsChangesListener;
        this.settings = settings;
    }
    dispose() {
        clearTimeout(this.checkCoreId);
    }
    initialize(subDocument) {
        this.subDocument = subDocument;
        this.intervalsManager = subDocument.spellCheckerIntervalsManager;
        this.hasActiveRequest = false;
    }
    check() {
        if (this.settings.isEnabled) {
            this.checkCoreId = setTimeout(() => {
                this.checkCore();
            }, 0);
        }
    }
    processResponse(checkedIntervals) {
        this.intervalsManager.applyCheckResults(checkedIntervals);
        this.updateMisspelledBoxes();
        this.hasActiveRequest = false;
        this.checkCore();
    }
    getSelectedMisspelledInterval(selectionIntervals) {
        return this.intervalsManager.getSelectedMisspelledInterval(selectionIntervals);
    }
    findNextMisspelledInterval(position) {
        return this.intervalsManager.findNextMisspelledInterval(position);
    }
    ignore(misspelledInterval) {
        this.intervalsManager.addIgnoredInterval(misspelledInterval.start, misspelledInterval.end, misspelledInterval.errorInfo.word);
        this.intervalsManager.deleteMisspelledIntervalsByPositions(misspelledInterval.start, misspelledInterval.end);
        this.updateMisspelledBoxes();
    }
    ignoreAll(misspelledInterval) {
        this.intervalsManager.ignoreAll(misspelledInterval.errorInfo.word);
        this.updateMisspelledBoxes();
    }
    addWord(misspelledInterval) {
        let word = misspelledInterval.errorInfo.word;
        this.intervalsManager.removeIntervalsWithErrorByWord(word);
        this.updateMisspelledBoxes();
        this.sendAddWordRequest(word);
    }
    getIntervalsWithErrorByWord(word) {
        return this.intervalsManager.getIntervalsWithErrorByWord(word);
    }
    isInProgress() {
        return this.intervalsManager.getUncheckedIntervalsCount() > 0;
    }
    getMisspelledIntervals() {
        return this.intervalsManager.getMisspelledIntervals();
    }
    onModelIntervalChanged(start, length, isSeparator) {
        if (this.settings.isEnabled)
            this.intervalsManager.onModelIntervalChanged(start, length, isSeparator);
    }
    onCurrentSelectedWordChanged() {
        this.check();
    }
    onLayoutChanged() {
        this.updateMisspelledBoxes();
    }
    checkCore() {
        if (this.hasActiveRequest)
            return;
        this.intervalsManager.initializeUncheckedIntervals();
        const intervalsToCheck = this.intervalsManager.getIntervalsToCheck();
        if (intervalsToCheck.length > 0)
            this.sendCheckSpellingRequest(intervalsToCheck);
    }
    sendCheckSpellingRequest(uncheckedIntervals) {
        if (this.settings.checkWordSpelling || this.settings.checkWordSpelling)
            this.clientCheckSpelling(uncheckedIntervals);
        else
            this.aspxCheckSpelling(uncheckedIntervals);
    }
    clientCheckSpelling(uncheckedIntervals) {
        if (this.settings.checkWordSpelling) {
            const callbacks = [];
            for (let curr of uncheckedIntervals)
                this.clientCheckIntervalByWord(curr, callbacks);
            setTimeout(() => {
                for (let cb of callbacks)
                    cb();
            }, 0);
        }
        else {
        }
    }
    clientCheckIntervalByWord(currInterval, callbacks) {
        const intervals = FixedInterval.makeByConstInterval(currInterval);
        const sentences = new SimpleSentenceStructureBuilder(currInterval.info.textToCheck).build();
        let wordsCount = 0;
        const errors = [];
        const processResponce = () => {
            if (wordsCount == 0) {
                const aspxResponce = [{
                        [JSONCheckSpellingCommand.StartPosition]: intervals.start,
                        [JSONCheckSpellingCommand.EndPosition]: intervals.end,
                        [JSONCheckSpellingCommand.SpellingErrors]: errors,
                    }];
                this.processResponse(aspxResponce);
            }
        };
        for (let sentence of sentences) {
            for (let word of sentence.words) {
                word = this.preprocessWord(word);
                if (/\d/.test(word.text)) {
                    continue;
                }
                wordsCount++;
                callbacks.push(() => {
                    this.settings.checkWordSpelling(word.text, (isCorrect, suggections) => {
                        if (!isCorrect) {
                            if (!suggections)
                                suggections = [];
                            errors.push({
                                [JSONCheckSpellingCommand.ErrorStart]: word.position,
                                [JSONCheckSpellingCommand.ErrorLength]: word.text.length,
                                [JSONCheckSpellingCommand.ErrorWord]: word.text,
                                [JSONCheckSpellingCommand.ErrorType]: SpellingErrorType.Misspelling,
                                [JSONCheckSpellingCommand.Suggestions]: suggections.slice(0, this.settings.suggestionCount),
                            });
                        }
                        wordsCount--;
                        processResponce();
                    });
                });
            }
        }
        if (wordsCount == 0)
            callbacks.push(() => processResponce());
    }
    preprocessWord(word) {
        if (word.text[0] == RichUtils.specialCharacters.LeftSingleQuote && word.text[word.text.length - 1] == RichUtils.specialCharacters.RightSingleQuote)
            return new SimpleSentenceWord(word.position + 1, word.text.substr(1, word.text.length - 2));
        return word;
    }
    sendAddWordRequest(word) {
        if (this.settings.addWordToDictionary)
            this.settings.addWordToDictionary(word);
        else
            this.aspxAddWordToDictionary(word);
    }
    updateMisspelledBoxes() {
        if (this.settings.isEnabled)
            this.misspelledIntervalsChangesListener.setMisspelledSelectionIntervals(this.getMisspelledIntervals());
    }
    aspxAddWordToDictionary(word) {
        const params = {
            [JSONCheckSpellingCommand.AddedWord]: word,
            [JSONCheckSpellingCommand.CustomDictionaryGuid]: this.settings.customDictionaryGuid,
        };
        this.modelRequestHandler.pushRequest(new LoadCommandRequest(CommandType.AddWordToDictionary, -1, params), new RequestParams(false, true, true));
    }
    aspxCheckSpelling(uncheckedIntervals) {
        const params = {
            [JSONCheckSpellingCommand.IntervalsToCheck]: ListUtils.map(uncheckedIntervals, uncheckedInterval => {
                return {
                    [JSONCheckSpellingCommand.StartPosition]: uncheckedInterval.start,
                    [JSONCheckSpellingCommand.EndPosition]: uncheckedInterval.end,
                    [JSONCheckSpellingCommand.TextToCheck]: uncheckedInterval.info.textToCheck,
                };
            }),
            [JSONCheckSpellingCommand.CustomDictionaryGuid]: this.settings.customDictionaryGuid,
        };
        this.modelRequestHandler.pushRequest(new LoadCommandRequest(CommandType.CheckSpelling, this.subDocument.id, params), new RequestParams(false, true, false));
        this.hasActiveRequest = true;
    }
}
export var SpellingErrorType;
(function (SpellingErrorType) {
    SpellingErrorType[SpellingErrorType["Unknown"] = 0] = "Unknown";
    SpellingErrorType[SpellingErrorType["Misspelling"] = 1] = "Misspelling";
    SpellingErrorType[SpellingErrorType["Repeating"] = 2] = "Repeating";
    SpellingErrorType[SpellingErrorType["Syntax"] = 3] = "Syntax";
})(SpellingErrorType || (SpellingErrorType = {}));
export class SpellingErrorInfo {
    constructor(errorType, suggestions, word) {
        this.errorType = errorType;
        this.suggestions = suggestions;
        this.word = word;
    }
}
