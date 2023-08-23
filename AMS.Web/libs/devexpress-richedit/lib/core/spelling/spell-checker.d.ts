import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { IModelRequestHandler } from '../model-request-handler';
import { SpellCheckerSettings } from '../model/options/spell-checker';
import { SubDocument } from '../model/sub-document';
import { MisspelledInterval } from './intervals';
export interface IMisspelledIntervalsChangesListener {
    setMisspelledSelectionIntervals(intervals: FixedInterval[]): any;
}
export declare class SpellChecker {
    settings: SpellCheckerSettings;
    private subDocument;
    private intervalsManager;
    private hasActiveRequest;
    private modelRequestHandler;
    private misspelledIntervalsChangesListener;
    private checkCoreId;
    constructor(modelRequestHandler: IModelRequestHandler, misspelledIntervalsChangesListener: IMisspelledIntervalsChangesListener, settings: SpellCheckerSettings);
    dispose(): void;
    initialize(subDocument: SubDocument): void;
    check(): void;
    processResponse(checkedIntervals: any[]): void;
    getSelectedMisspelledInterval(selectionIntervals: FixedInterval[]): MisspelledInterval;
    findNextMisspelledInterval(position: number): MisspelledInterval;
    ignore(misspelledInterval: MisspelledInterval): void;
    ignoreAll(misspelledInterval: MisspelledInterval): void;
    addWord(misspelledInterval: MisspelledInterval): void;
    getIntervalsWithErrorByWord(word: string): FixedInterval[];
    isInProgress(): boolean;
    getMisspelledIntervals(): MisspelledInterval[];
    onModelIntervalChanged(start: number, length: number, isSeparator: boolean): void;
    onCurrentSelectedWordChanged(): void;
    onLayoutChanged(): void;
    private checkCore;
    private sendCheckSpellingRequest;
    private clientCheckSpelling;
    private clientCheckIntervalByWord;
    private preprocessWord;
    private sendAddWordRequest;
    updateMisspelledBoxes(): void;
    private aspxAddWordToDictionary;
    private aspxCheckSpelling;
}
export declare enum SpellingErrorType {
    Unknown = 0,
    Misspelling = 1,
    Repeating = 2,
    Syntax = 3
}
export declare class SpellingErrorInfo {
    errorType: SpellingErrorType;
    suggestions: string[];
    word: string;
    constructor(errorType: SpellingErrorType, suggestions: string[], word: string);
}
//# sourceMappingURL=spell-checker.d.ts.map