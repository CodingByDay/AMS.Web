import { CharacterPropertyDescriptor } from '../../core/model/character/character-property-descriptor';
import { RtfFontInfo } from '../import/model/character/rtf-font-info';
export class UnicodeCharHelper {
    static setUnicodeFontName(fontInfoCache, ch, position) {
        const charType = this.calculateCharType(ch);
        if (position.useDoubleByteCharactersFontName || position.useLowAnsiCharactersFontName || position.useHighAnsiCharactersFontName)
            UnicodeCharHelper.setUnicodeFontNameByCharType(fontInfoCache, charType, position);
    }
    static setUnicodeFontNameByCharType(fontInfoCache, charType, position) {
        const characterFormatting = position.coreProperties;
        if (position.useDoubleByteCharactersFontName || position.useLowAnsiCharactersFontName || position.useHighAnsiCharactersFontName) {
            if (position.useDoubleByteCharactersFontName && charType == CharType.DoubleByteCharacter)
                characterFormatting.setValue(CharacterPropertyDescriptor.fontInfo, RtfFontInfo.getFontInfo(fontInfoCache, position.doubleByteCharactersFontName));
            else if (position.useLowAnsiCharactersFontName && charType == CharType.LowAnsiCharacter)
                characterFormatting.setValue(CharacterPropertyDescriptor.fontInfo, RtfFontInfo.getFontInfo(fontInfoCache, position.lowAnsiCharactersFontName));
            else if (position.useHighAnsiCharactersFontName && charType == CharType.HighAnsiCharacter)
                characterFormatting.setValue(CharacterPropertyDescriptor.fontInfo, RtfFontInfo.getFontInfo(fontInfoCache, position.highAnsiCharactersFontName));
        }
    }
    static isLowAnsiCharacter(ch) {
        var chVal = ch.charCodeAt(0);
        return chVal >= UnicodeCharHelper.lowAnsiCharactersStart && chVal <= UnicodeCharHelper.lowAnsiCharactersEnd;
    }
    static isDoubleByteChar(ch) {
        const chVal = ch.charCodeAt(0);
        if (chVal < UnicodeCharHelper.lowLatinExtendedAdditional)
            return false;
        if (chVal >= UnicodeCharHelper.lowLatinExtendedAdditional && chVal <= UnicodeCharHelper.highLatinExtendedAdditional)
            return false;
        if (chVal >= UnicodeCharHelper.lowGeneralPunctuation && chVal <= UnicodeCharHelper.highGeneralPunctuation)
            return false;
        if (chVal >= UnicodeCharHelper.lowCurrencySymbols && chVal <= UnicodeCharHelper.highCurrencySymbols)
            return false;
        if (chVal >= UnicodeCharHelper.lowLetterlikeSymbols && chVal <= UnicodeCharHelper.highLetterlikeSymbols)
            return false;
        if (chVal >= UnicodeCharHelper.lowNumberForms && chVal <= UnicodeCharHelper.highNumberForms)
            return false;
        if (chVal >= UnicodeCharHelper.lowMathematicalOperations && chVal <= UnicodeCharHelper.highMathematicalOperations)
            return false;
        if (chVal >= UnicodeCharHelper.privateUseAreaStart && chVal <= UnicodeCharHelper.privateUseAreaEnd)
            return false;
        return true;
    }
    static calculateCharType(ch) {
        if (UnicodeCharHelper.isLowAnsiCharacter(ch))
            return CharType.LowAnsiCharacter;
        if (UnicodeCharHelper.isDoubleByteChar(ch))
            return CharType.DoubleByteCharacter;
        return CharType.HighAnsiCharacter;
    }
}
UnicodeCharHelper.highestCyrillic = 1279;
UnicodeCharHelper.lowLatinExtendedAdditional = 7680;
UnicodeCharHelper.highLatinExtendedAdditional = 7929;
UnicodeCharHelper.lowGeneralPunctuation = 8192;
UnicodeCharHelper.highGeneralPunctuation = 8303;
UnicodeCharHelper.lowCurrencySymbols = 8352;
UnicodeCharHelper.highCurrencySymbols = 8367;
UnicodeCharHelper.lowLetterlikeSymbols = 8448;
UnicodeCharHelper.highLetterlikeSymbols = 8506;
UnicodeCharHelper.lowNumberForms = 8531;
UnicodeCharHelper.highNumberForms = 8579;
UnicodeCharHelper.lowMathematicalOperations = 8704;
UnicodeCharHelper.highMathematicalOperations = 8945;
UnicodeCharHelper.lowAnsiCharactersStart = 0x00;
UnicodeCharHelper.lowAnsiCharactersEnd = 0x7F;
UnicodeCharHelper.highAnsiCharactersStart = 0x80;
UnicodeCharHelper.highAnsiCharactersEnd = 0xFF;
UnicodeCharHelper.privateUseAreaStart = 0xE000;
UnicodeCharHelper.privateUseAreaEnd = 0xF8FF;
export var CharType;
(function (CharType) {
    CharType[CharType["LowAnsiCharacter"] = 0] = "LowAnsiCharacter";
    CharType[CharType["DoubleByteCharacter"] = 1] = "DoubleByteCharacter";
    CharType[CharType["HighAnsiCharacter"] = 2] = "HighAnsiCharacter";
    CharType[CharType["ComplexScriptCharacter"] = 3] = "ComplexScriptCharacter";
})(CharType || (CharType = {}));
