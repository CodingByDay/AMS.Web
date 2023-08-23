export declare class SpellCheckerError {
    interval: {
        start: number;
        length: number;
    };
    suggestions: string[];
}
export declare class SpellCheckerSettings {
    isEnabled: boolean;
    customDictionaryGuid: string;
    canAddWord: boolean;
    suggestionCount: number;
    maxRequestLength: number;
    checkWordSpelling?: (word: string, callback: (isCorrect: boolean, suggestions: string[]) => void) => void;
    addWordToDictionary?: (word: string) => void;
    copyFrom(obj: SpellCheckerSettings): void;
    clone(): SpellCheckerSettings;
}
//# sourceMappingURL=spell-checker.d.ts.map