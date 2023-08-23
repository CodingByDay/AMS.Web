import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { Paragraph } from './paragraph/paragraph';
import { SpecialCharacters } from './special-characters';
import { SubDocument } from './sub-document';
export declare class RichUtils {
    static isLatinLetter: RegExp;
    static isWhitespace: RegExp;
    static isAlphanumeric: RegExp;
    static predefinedFontSizes: number[];
    static minFontSize: number;
    static maxFontSize: number;
    static specialCharacters: SpecialCharacters;
    static getSelectedParagraphs(intervals: FixedInterval[], subDocument: SubDocument): {
        paragraphs: Paragraph[];
        intervals: FixedInterval[];
    };
    static getIntervalsOfSelectedParagraphs(intervals: FixedInterval[], subDocument: SubDocument): FixedInterval[];
    static getCopyPasteGuid(guids: {
        sguid: string;
        cguid: string;
    }): string;
    static getCopyPasteGuidLabel(guids: {
        sguid: string;
        cguid: string;
    }): string;
    static getNextPredefinedFontSize(current: number): number;
    static getPreviousPredefinedFontSize(current: number): number;
    static replaceParagraphEndCharsWithLineBreak(text: string): string;
}
//# sourceMappingURL=rich-utils.d.ts.map