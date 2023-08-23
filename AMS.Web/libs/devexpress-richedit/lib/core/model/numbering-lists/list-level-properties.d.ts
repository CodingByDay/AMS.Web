import { ICloneable } from '@devexpress/utils/lib/types';
import { IHashBasedCacheType } from '../caches/hash-based-cache';
export declare class ListLevelProperties implements IHashBasedCacheType<ListLevelProperties>, ICloneable<ListLevelProperties> {
    private hash;
    start: number;
    format: NumberingFormat;
    alignment: ListNumberAlignment;
    convertPreviousLevelNumberingToDecimal: boolean;
    separator: string;
    suppressRestart: boolean;
    suppressBulletResize: boolean;
    displayFormatString: string;
    relativeRestartLevel: number;
    templateCode: number;
    originalLeftIndent: number;
    legacy: boolean;
    legacySpace: number;
    legacyIndent: number;
    protected calculateHash(): number;
    getHashCode(): number;
    equals(obj: ListLevelProperties): boolean;
    copyFrom(obj: any): void;
    clone(): ListLevelProperties;
}
export declare enum NumberingFormat {
    Decimal = 0,
    AIUEOHiragana = 1,
    AIUEOFullWidthHiragana = 2,
    ArabicAbjad = 3,
    ArabicAlpha = 4,
    Bullet = 5,
    CardinalText = 6,
    Chicago = 7,
    ChineseCounting = 8,
    ChineseCountingThousand = 9,
    ChineseLegalSimplified = 10,
    Chosung = 11,
    DecimalEnclosedCircle = 12,
    DecimalEnclosedCircleChinese = 13,
    DecimalEnclosedFullstop = 14,
    DecimalEnclosedParentheses = 15,
    DecimalFullWidth = 16,
    DecimalFullWidth2 = 17,
    DecimalHalfWidth = 18,
    DecimalZero = 19,
    Ganada = 20,
    Hebrew1 = 21,
    Hebrew2 = 22,
    Hex = 23,
    HindiConsonants = 24,
    HindiDescriptive = 25,
    HindiNumbers = 26,
    HindiVowels = 27,
    IdeographDigital = 28,
    IdeographEnclosedCircle = 29,
    IdeographLegalTraditional = 30,
    IdeographTraditional = 31,
    IdeographZodiac = 32,
    IdeographZodiacTraditional = 33,
    Iroha = 34,
    IrohaFullWidth = 35,
    JapaneseCounting = 36,
    JapaneseDigitalTenThousand = 37,
    JapaneseLegal = 38,
    KoreanCounting = 39,
    KoreanDigital = 40,
    KoreanDigital2 = 41,
    KoreanLegal = 42,
    LowerLetter = 43,
    LowerRoman = 44,
    None = 45,
    NumberInDash = 46,
    Ordinal = 47,
    OrdinalText = 48,
    RussianLower = 49,
    RussianUpper = 50,
    TaiwaneseCounting = 51,
    TaiwaneseCountingThousand = 52,
    TaiwaneseDigital = 53,
    ThaiDescriptive = 54,
    ThaiLetters = 55,
    ThaiNumbers = 56,
    UpperLetter = 57,
    UpperRoman = 58,
    VietnameseDescriptive = 59
}
export declare enum ListNumberAlignment {
    Left = 0,
    Center = 1,
    Right = 2
}
//# sourceMappingURL=list-level-properties.d.ts.map