import { NumberingType } from '../../core/model/numbering-lists/numbering-list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
export var ListTypeApi;
(function (ListTypeApi) {
    ListTypeApi[ListTypeApi["MultiLevel"] = 0] = "MultiLevel";
    ListTypeApi[ListTypeApi["Number"] = 1] = "Number";
    ListTypeApi[ListTypeApi["Bullet"] = 2] = "Bullet";
})(ListTypeApi || (ListTypeApi = {}));
export class ListTypeApiConverter {
    static toCoreEnum(apiType) {
        return ListTypeApiConverter.map[apiType];
    }
    static toApiEnum(coreType) {
        return NumberMapUtils.keyBy(ListTypeApiConverter.map, (coreElem) => coreElem == coreType);
    }
}
ListTypeApiConverter.map = {
    [ListTypeApi.Bullet]: NumberingType.Bullet,
    [ListTypeApi.MultiLevel]: NumberingType.MultiLevel,
    [ListTypeApi.Number]: NumberingType.Simple,
};
export var ListLevelNumberAlignmentApi;
(function (ListLevelNumberAlignmentApi) {
    ListLevelNumberAlignmentApi[ListLevelNumberAlignmentApi["Left"] = 0] = "Left";
    ListLevelNumberAlignmentApi[ListLevelNumberAlignmentApi["Center"] = 1] = "Center";
    ListLevelNumberAlignmentApi[ListLevelNumberAlignmentApi["Right"] = 2] = "Right";
})(ListLevelNumberAlignmentApi || (ListLevelNumberAlignmentApi = {}));
export var ListLevelFormatApi;
(function (ListLevelFormatApi) {
    ListLevelFormatApi[ListLevelFormatApi["Decimal"] = 0] = "Decimal";
    ListLevelFormatApi[ListLevelFormatApi["Hiragana"] = 1] = "Hiragana";
    ListLevelFormatApi[ListLevelFormatApi["FullWidthHiragana"] = 2] = "FullWidthHiragana";
    ListLevelFormatApi[ListLevelFormatApi["ArabicAbjad"] = 3] = "ArabicAbjad";
    ListLevelFormatApi[ListLevelFormatApi["ArabicAlpha"] = 4] = "ArabicAlpha";
    ListLevelFormatApi[ListLevelFormatApi["Bullet"] = 5] = "Bullet";
    ListLevelFormatApi[ListLevelFormatApi["CardinalText"] = 6] = "CardinalText";
    ListLevelFormatApi[ListLevelFormatApi["Chicago"] = 7] = "Chicago";
    ListLevelFormatApi[ListLevelFormatApi["ChineseCounting"] = 8] = "ChineseCounting";
    ListLevelFormatApi[ListLevelFormatApi["ChineseCountingThousand"] = 9] = "ChineseCountingThousand";
    ListLevelFormatApi[ListLevelFormatApi["ChineseLegalSimplified"] = 10] = "ChineseLegalSimplified";
    ListLevelFormatApi[ListLevelFormatApi["Chosung"] = 11] = "Chosung";
    ListLevelFormatApi[ListLevelFormatApi["DecimalEnclosedCircle"] = 12] = "DecimalEnclosedCircle";
    ListLevelFormatApi[ListLevelFormatApi["DecimalEnclosedCircleChinese"] = 13] = "DecimalEnclosedCircleChinese";
    ListLevelFormatApi[ListLevelFormatApi["DecimalEnclosedFullstop"] = 14] = "DecimalEnclosedFullstop";
    ListLevelFormatApi[ListLevelFormatApi["DecimalEnclosedParentheses"] = 15] = "DecimalEnclosedParentheses";
    ListLevelFormatApi[ListLevelFormatApi["DecimalFullWidth"] = 16] = "DecimalFullWidth";
    ListLevelFormatApi[ListLevelFormatApi["DecimalFullWidth2"] = 17] = "DecimalFullWidth2";
    ListLevelFormatApi[ListLevelFormatApi["DecimalHalfWidth"] = 18] = "DecimalHalfWidth";
    ListLevelFormatApi[ListLevelFormatApi["DecimalZero"] = 19] = "DecimalZero";
    ListLevelFormatApi[ListLevelFormatApi["Ganada"] = 20] = "Ganada";
    ListLevelFormatApi[ListLevelFormatApi["Hebrew1"] = 21] = "Hebrew1";
    ListLevelFormatApi[ListLevelFormatApi["Hebrew2"] = 22] = "Hebrew2";
    ListLevelFormatApi[ListLevelFormatApi["Hex"] = 23] = "Hex";
    ListLevelFormatApi[ListLevelFormatApi["HindiConsonants"] = 24] = "HindiConsonants";
    ListLevelFormatApi[ListLevelFormatApi["HindiDescriptive"] = 25] = "HindiDescriptive";
    ListLevelFormatApi[ListLevelFormatApi["HindiNumbers"] = 26] = "HindiNumbers";
    ListLevelFormatApi[ListLevelFormatApi["HindiVowels"] = 27] = "HindiVowels";
    ListLevelFormatApi[ListLevelFormatApi["IdeographDigital"] = 28] = "IdeographDigital";
    ListLevelFormatApi[ListLevelFormatApi["IdeographEnclosedCircle"] = 29] = "IdeographEnclosedCircle";
    ListLevelFormatApi[ListLevelFormatApi["IdeographLegalTraditional"] = 30] = "IdeographLegalTraditional";
    ListLevelFormatApi[ListLevelFormatApi["IdeographTraditional"] = 31] = "IdeographTraditional";
    ListLevelFormatApi[ListLevelFormatApi["IdeographZodiac"] = 32] = "IdeographZodiac";
    ListLevelFormatApi[ListLevelFormatApi["IdeographZodiacTraditional"] = 33] = "IdeographZodiacTraditional";
    ListLevelFormatApi[ListLevelFormatApi["Iroha"] = 34] = "Iroha";
    ListLevelFormatApi[ListLevelFormatApi["IrohaFullWidth"] = 35] = "IrohaFullWidth";
    ListLevelFormatApi[ListLevelFormatApi["JapaneseCounting"] = 36] = "JapaneseCounting";
    ListLevelFormatApi[ListLevelFormatApi["JapaneseDigitalTenThousand"] = 37] = "JapaneseDigitalTenThousand";
    ListLevelFormatApi[ListLevelFormatApi["JapaneseLegal"] = 38] = "JapaneseLegal";
    ListLevelFormatApi[ListLevelFormatApi["KoreanCounting"] = 39] = "KoreanCounting";
    ListLevelFormatApi[ListLevelFormatApi["KoreanDigital"] = 40] = "KoreanDigital";
    ListLevelFormatApi[ListLevelFormatApi["KoreanDigital2"] = 41] = "KoreanDigital2";
    ListLevelFormatApi[ListLevelFormatApi["KoreanLegal"] = 42] = "KoreanLegal";
    ListLevelFormatApi[ListLevelFormatApi["LowerLetter"] = 43] = "LowerLetter";
    ListLevelFormatApi[ListLevelFormatApi["LowerRoman"] = 44] = "LowerRoman";
    ListLevelFormatApi[ListLevelFormatApi["None"] = 45] = "None";
    ListLevelFormatApi[ListLevelFormatApi["NumberInDash"] = 46] = "NumberInDash";
    ListLevelFormatApi[ListLevelFormatApi["Ordinal"] = 47] = "Ordinal";
    ListLevelFormatApi[ListLevelFormatApi["OrdinalText"] = 48] = "OrdinalText";
    ListLevelFormatApi[ListLevelFormatApi["RussianLower"] = 49] = "RussianLower";
    ListLevelFormatApi[ListLevelFormatApi["RussianUpper"] = 50] = "RussianUpper";
    ListLevelFormatApi[ListLevelFormatApi["TaiwaneseCounting"] = 51] = "TaiwaneseCounting";
    ListLevelFormatApi[ListLevelFormatApi["TaiwaneseCountingThousand"] = 52] = "TaiwaneseCountingThousand";
    ListLevelFormatApi[ListLevelFormatApi["TaiwaneseDigital"] = 53] = "TaiwaneseDigital";
    ListLevelFormatApi[ListLevelFormatApi["ThaiDescriptive"] = 54] = "ThaiDescriptive";
    ListLevelFormatApi[ListLevelFormatApi["ThaiLetters"] = 55] = "ThaiLetters";
    ListLevelFormatApi[ListLevelFormatApi["ThaiNumbers"] = 56] = "ThaiNumbers";
    ListLevelFormatApi[ListLevelFormatApi["UpperLetter"] = 57] = "UpperLetter";
    ListLevelFormatApi[ListLevelFormatApi["UpperRoman"] = 58] = "UpperRoman";
    ListLevelFormatApi[ListLevelFormatApi["VietnameseDescriptive"] = 59] = "VietnameseDescriptive";
})(ListLevelFormatApi || (ListLevelFormatApi = {}));
