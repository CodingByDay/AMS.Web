import { Size } from '@devexpress/utils/lib/geometry/size';
export var PaperKind;
(function (PaperKind) {
    PaperKind[PaperKind["Custom"] = 0] = "Custom";
    PaperKind[PaperKind["Letter"] = 1] = "Letter";
    PaperKind[PaperKind["LetterSmall"] = 2] = "LetterSmall";
    PaperKind[PaperKind["Tabloid"] = 3] = "Tabloid";
    PaperKind[PaperKind["Ledger"] = 4] = "Ledger";
    PaperKind[PaperKind["Legal"] = 5] = "Legal";
    PaperKind[PaperKind["Statement"] = 6] = "Statement";
    PaperKind[PaperKind["Executive"] = 7] = "Executive";
    PaperKind[PaperKind["A3"] = 8] = "A3";
    PaperKind[PaperKind["A4"] = 9] = "A4";
    PaperKind[PaperKind["A4Small"] = 10] = "A4Small";
    PaperKind[PaperKind["A5"] = 11] = "A5";
    PaperKind[PaperKind["B4"] = 12] = "B4";
    PaperKind[PaperKind["B5"] = 13] = "B5";
    PaperKind[PaperKind["Folio"] = 14] = "Folio";
    PaperKind[PaperKind["Quarto"] = 15] = "Quarto";
    PaperKind[PaperKind["Standard10x14"] = 16] = "Standard10x14";
    PaperKind[PaperKind["Standard11x17"] = 17] = "Standard11x17";
    PaperKind[PaperKind["Note"] = 18] = "Note";
    PaperKind[PaperKind["Number9Envelope"] = 19] = "Number9Envelope";
    PaperKind[PaperKind["Number10Envelope"] = 20] = "Number10Envelope";
    PaperKind[PaperKind["Number11Envelope"] = 21] = "Number11Envelope";
    PaperKind[PaperKind["Number12Envelope"] = 22] = "Number12Envelope";
    PaperKind[PaperKind["Number14Envelope"] = 23] = "Number14Envelope";
    PaperKind[PaperKind["CSheet"] = 24] = "CSheet";
    PaperKind[PaperKind["DSheet"] = 25] = "DSheet";
    PaperKind[PaperKind["ESheet"] = 26] = "ESheet";
    PaperKind[PaperKind["DLEnvelope"] = 27] = "DLEnvelope";
    PaperKind[PaperKind["C5Envelope"] = 28] = "C5Envelope";
    PaperKind[PaperKind["C3Envelope"] = 29] = "C3Envelope";
    PaperKind[PaperKind["C4Envelope"] = 30] = "C4Envelope";
    PaperKind[PaperKind["C6Envelope"] = 31] = "C6Envelope";
    PaperKind[PaperKind["C65Envelope"] = 32] = "C65Envelope";
    PaperKind[PaperKind["B4Envelope"] = 33] = "B4Envelope";
    PaperKind[PaperKind["B5Envelope"] = 34] = "B5Envelope";
    PaperKind[PaperKind["B6Envelope"] = 35] = "B6Envelope";
    PaperKind[PaperKind["ItalyEnvelope"] = 36] = "ItalyEnvelope";
    PaperKind[PaperKind["MonarchEnvelope"] = 37] = "MonarchEnvelope";
    PaperKind[PaperKind["PersonalEnvelope"] = 38] = "PersonalEnvelope";
    PaperKind[PaperKind["USStandardFanfold"] = 39] = "USStandardFanfold";
    PaperKind[PaperKind["GermanStandardFanfold"] = 40] = "GermanStandardFanfold";
    PaperKind[PaperKind["GermanLegalFanfold"] = 41] = "GermanLegalFanfold";
    PaperKind[PaperKind["IsoB4"] = 42] = "IsoB4";
    PaperKind[PaperKind["JapanesePostcard"] = 43] = "JapanesePostcard";
    PaperKind[PaperKind["Standard9x11"] = 44] = "Standard9x11";
    PaperKind[PaperKind["Standard10x11"] = 45] = "Standard10x11";
    PaperKind[PaperKind["Standard15x11"] = 46] = "Standard15x11";
    PaperKind[PaperKind["InviteEnvelope"] = 47] = "InviteEnvelope";
    PaperKind[PaperKind["LetterExtra"] = 50] = "LetterExtra";
    PaperKind[PaperKind["LegalExtra"] = 51] = "LegalExtra";
    PaperKind[PaperKind["TabloidExtra"] = 52] = "TabloidExtra";
    PaperKind[PaperKind["A4Extra"] = 53] = "A4Extra";
    PaperKind[PaperKind["LetterTransverse"] = 54] = "LetterTransverse";
    PaperKind[PaperKind["A4Transverse"] = 55] = "A4Transverse";
    PaperKind[PaperKind["LetterExtraTransverse"] = 56] = "LetterExtraTransverse";
    PaperKind[PaperKind["APlus"] = 57] = "APlus";
    PaperKind[PaperKind["BPlus"] = 58] = "BPlus";
    PaperKind[PaperKind["LetterPlus"] = 59] = "LetterPlus";
    PaperKind[PaperKind["A4Plus"] = 60] = "A4Plus";
    PaperKind[PaperKind["A5Transverse"] = 61] = "A5Transverse";
    PaperKind[PaperKind["B5Transverse"] = 62] = "B5Transverse";
    PaperKind[PaperKind["A3Extra"] = 63] = "A3Extra";
    PaperKind[PaperKind["A5Extra"] = 64] = "A5Extra";
    PaperKind[PaperKind["B5Extra"] = 65] = "B5Extra";
    PaperKind[PaperKind["A2"] = 66] = "A2";
    PaperKind[PaperKind["A3Transverse"] = 67] = "A3Transverse";
    PaperKind[PaperKind["A3ExtraTransverse"] = 68] = "A3ExtraTransverse";
    PaperKind[PaperKind["JapaneseDoublePostcard"] = 69] = "JapaneseDoublePostcard";
    PaperKind[PaperKind["A6"] = 70] = "A6";
    PaperKind[PaperKind["JapaneseEnvelopeKakuNumber2"] = 71] = "JapaneseEnvelopeKakuNumber2";
    PaperKind[PaperKind["JapaneseEnvelopeKakuNumber3"] = 72] = "JapaneseEnvelopeKakuNumber3";
    PaperKind[PaperKind["JapaneseEnvelopeChouNumber3"] = 73] = "JapaneseEnvelopeChouNumber3";
    PaperKind[PaperKind["JapaneseEnvelopeChouNumber4"] = 74] = "JapaneseEnvelopeChouNumber4";
    PaperKind[PaperKind["LetterRotated"] = 75] = "LetterRotated";
    PaperKind[PaperKind["A3Rotated"] = 76] = "A3Rotated";
    PaperKind[PaperKind["A4Rotated"] = 77] = "A4Rotated";
    PaperKind[PaperKind["A5Rotated"] = 78] = "A5Rotated";
    PaperKind[PaperKind["B4JisRotated"] = 79] = "B4JisRotated";
    PaperKind[PaperKind["B5JisRotated"] = 80] = "B5JisRotated";
    PaperKind[PaperKind["JapanesePostcardRotated"] = 81] = "JapanesePostcardRotated";
    PaperKind[PaperKind["JapaneseDoublePostcardRotated"] = 82] = "JapaneseDoublePostcardRotated";
    PaperKind[PaperKind["A6Rotated"] = 83] = "A6Rotated";
    PaperKind[PaperKind["JapaneseEnvelopeKakuNumber2Rotated"] = 84] = "JapaneseEnvelopeKakuNumber2Rotated";
    PaperKind[PaperKind["JapaneseEnvelopeKakuNumber3Rotated"] = 85] = "JapaneseEnvelopeKakuNumber3Rotated";
    PaperKind[PaperKind["JapaneseEnvelopeChouNumber3Rotated"] = 86] = "JapaneseEnvelopeChouNumber3Rotated";
    PaperKind[PaperKind["JapaneseEnvelopeChouNumber4Rotated"] = 87] = "JapaneseEnvelopeChouNumber4Rotated";
    PaperKind[PaperKind["B6Jis"] = 88] = "B6Jis";
    PaperKind[PaperKind["B6JisRotated"] = 89] = "B6JisRotated";
    PaperKind[PaperKind["Standard12x11"] = 90] = "Standard12x11";
    PaperKind[PaperKind["JapaneseEnvelopeYouNumber4"] = 91] = "JapaneseEnvelopeYouNumber4";
    PaperKind[PaperKind["JapaneseEnvelopeYouNumber4Rotated"] = 92] = "JapaneseEnvelopeYouNumber4Rotated";
    PaperKind[PaperKind["Prc16K"] = 93] = "Prc16K";
    PaperKind[PaperKind["Prc32K"] = 94] = "Prc32K";
    PaperKind[PaperKind["Prc32KBig"] = 95] = "Prc32KBig";
    PaperKind[PaperKind["PrcEnvelopeNumber1"] = 96] = "PrcEnvelopeNumber1";
    PaperKind[PaperKind["PrcEnvelopeNumber2"] = 97] = "PrcEnvelopeNumber2";
    PaperKind[PaperKind["PrcEnvelopeNumber3"] = 98] = "PrcEnvelopeNumber3";
    PaperKind[PaperKind["PrcEnvelopeNumber4"] = 99] = "PrcEnvelopeNumber4";
    PaperKind[PaperKind["PrcEnvelopeNumber5"] = 100] = "PrcEnvelopeNumber5";
    PaperKind[PaperKind["PrcEnvelopeNumber6"] = 101] = "PrcEnvelopeNumber6";
    PaperKind[PaperKind["PrcEnvelopeNumber7"] = 102] = "PrcEnvelopeNumber7";
    PaperKind[PaperKind["PrcEnvelopeNumber8"] = 103] = "PrcEnvelopeNumber8";
    PaperKind[PaperKind["PrcEnvelopeNumber9"] = 104] = "PrcEnvelopeNumber9";
    PaperKind[PaperKind["PrcEnvelopeNumber10"] = 105] = "PrcEnvelopeNumber10";
    PaperKind[PaperKind["Prc16KRotated"] = 106] = "Prc16KRotated";
    PaperKind[PaperKind["Prc32KRotated"] = 107] = "Prc32KRotated";
    PaperKind[PaperKind["Prc32KBigRotated"] = 108] = "Prc32KBigRotated";
    PaperKind[PaperKind["PrcEnvelopeNumber1Rotated"] = 109] = "PrcEnvelopeNumber1Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber2Rotated"] = 110] = "PrcEnvelopeNumber2Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber3Rotated"] = 111] = "PrcEnvelopeNumber3Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber4Rotated"] = 112] = "PrcEnvelopeNumber4Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber5Rotated"] = 113] = "PrcEnvelopeNumber5Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber6Rotated"] = 114] = "PrcEnvelopeNumber6Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber7Rotated"] = 115] = "PrcEnvelopeNumber7Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber8Rotated"] = 116] = "PrcEnvelopeNumber8Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber9Rotated"] = 117] = "PrcEnvelopeNumber9Rotated";
    PaperKind[PaperKind["PrcEnvelopeNumber10Rotated"] = 118] = "PrcEnvelopeNumber10Rotated";
})(PaperKind || (PaperKind = {}));
export class PaperSizeConverter {
    static calculatePaperSize(paperKind) {
        var result = PaperSizeConverter.paperSizeTable[paperKind];
        return result ? result : PaperSizeConverter.paperSizeTable[PaperKind.Letter];
    }
    static calculatePaperKind(size, defaultValue, tolerance = 0, badSizeDefaultValue = defaultValue) {
        if (size.width == 0 || size.height == 0)
            return badSizeDefaultValue;
        for (const paperKind in PaperSizeConverter.paperSizeTable) {
            if (!Object.prototype.hasOwnProperty.call(PaperSizeConverter.paperSizeTable, paperKind))
                continue;
            const entSize = PaperSizeConverter.paperSizeTable[paperKind];
            if (Math.abs(size.width - entSize.width) <= tolerance && Math.abs(size.height - entSize.height) <= tolerance)
                return parseInt(paperKind);
        }
        return defaultValue;
    }
}
PaperSizeConverter.paperSizeTable = {
    [PaperKind.Letter]: new Size(12240, 15840),
    [PaperKind.LetterSmall]: new Size(12240, 15840),
    [PaperKind.Tabloid]: new Size(15840, 24480),
    [PaperKind.Ledger]: new Size(24480, 15840),
    [PaperKind.Legal]: new Size(12240, 20160),
    [PaperKind.Statement]: new Size(7920, 12240),
    [PaperKind.Executive]: new Size(10440, 15120),
    [PaperKind.A3]: new Size(16839, 23814),
    [PaperKind.A4]: new Size(11907, 16839),
    [PaperKind.A4Small]: new Size(11907, 16839),
    [PaperKind.A5]: new Size(8391, 11907),
    [PaperKind.B4]: new Size(14572, 20639),
    [PaperKind.B5]: new Size(10319, 14571),
    [PaperKind.Folio]: new Size(12240, 18720),
    [PaperKind.Quarto]: new Size(12189, 15591),
    [PaperKind.Standard10x14]: new Size(14400, 20160),
    [PaperKind.Standard11x17]: new Size(15840, 24480),
    [PaperKind.Note]: new Size(12240, 15840),
    [PaperKind.Number9Envelope]: new Size(5580, 12780),
    [PaperKind.Number10Envelope]: new Size(5940, 13680),
    [PaperKind.Number11Envelope]: new Size(6480, 14940),
    [PaperKind.Number12Envelope]: new Size(6840, 15840),
    [PaperKind.Number14Envelope]: new Size(7200, 16560),
    [PaperKind.CSheet]: new Size(24480, 31680),
    [PaperKind.DSheet]: new Size(31680, 48960),
    [PaperKind.ESheet]: new Size(48960, 63360),
    [PaperKind.DLEnvelope]: new Size(6237, 12474),
    [PaperKind.C5Envelope]: new Size(9185, 12984),
    [PaperKind.C3Envelope]: new Size(18369, 25965),
    [PaperKind.C4Envelope]: new Size(12983, 18369),
    [PaperKind.C6Envelope]: new Size(6463, 9184),
    [PaperKind.C65Envelope]: new Size(6463, 12983),
    [PaperKind.B4Envelope]: new Size(14173, 20013),
    [PaperKind.B5Envelope]: new Size(9978, 14173),
    [PaperKind.B6Envelope]: new Size(9978, 7087),
    [PaperKind.ItalyEnvelope]: new Size(6236, 13039),
    [PaperKind.MonarchEnvelope]: new Size(5580, 10800),
    [PaperKind.PersonalEnvelope]: new Size(5220, 9360),
    [PaperKind.USStandardFanfold]: new Size(21420, 15840),
    [PaperKind.GermanStandardFanfold]: new Size(12240, 17280),
    [PaperKind.GermanLegalFanfold]: new Size(12240, 18720),
    [PaperKind.IsoB4]: new Size(14173, 20013),
    [PaperKind.JapanesePostcard]: new Size(5669, 8391),
    [PaperKind.Standard9x11]: new Size(12960, 15840),
    [PaperKind.Standard10x11]: new Size(14400, 15840),
    [PaperKind.Standard15x11]: new Size(21600, 15840),
    [PaperKind.InviteEnvelope]: new Size(12472, 12472),
    [PaperKind.LetterExtra]: new Size(13680, 17280),
    [PaperKind.LegalExtra]: new Size(13680, 21600),
    [PaperKind.TabloidExtra]: new Size(16834, 25920),
    [PaperKind.A4Extra]: new Size(13349, 18274),
    [PaperKind.LetterTransverse]: new Size(12240, 15840),
    [PaperKind.A4Transverse]: new Size(11907, 16839),
    [PaperKind.LetterExtraTransverse]: new Size(13680, 17280),
    [PaperKind.APlus]: new Size(12869, 20183),
    [PaperKind.BPlus]: new Size(17291, 27609),
    [PaperKind.LetterPlus]: new Size(12240, 18274),
    [PaperKind.A4Plus]: new Size(11907, 18709),
    [PaperKind.A5Transverse]: new Size(8391, 11907),
    [PaperKind.B5Transverse]: new Size(10319, 14571),
    [PaperKind.A3Extra]: new Size(18255, 25228),
    [PaperKind.A5Extra]: new Size(9865, 13323),
    [PaperKind.B5Extra]: new Size(11395, 15647),
    [PaperKind.A2]: new Size(23811, 33676),
    [PaperKind.A3Transverse]: new Size(16839, 23814),
    [PaperKind.A3ExtraTransverse]: new Size(18255, 25228),
    [PaperKind.JapaneseDoublePostcard]: new Size(11339, 8391),
    [PaperKind.A6]: new Size(5953, 8391),
    [PaperKind.JapaneseEnvelopeKakuNumber2]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeKakuNumber3]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeChouNumber3]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeChouNumber4]: new Size(12240, 15840),
    [PaperKind.LetterRotated]: new Size(15840, 12240),
    [PaperKind.A3Rotated]: new Size(23814, 16839),
    [PaperKind.A4Rotated]: new Size(16839, 11907),
    [PaperKind.A5Rotated]: new Size(11907, 8391),
    [PaperKind.B4JisRotated]: new Size(20636, 14570),
    [PaperKind.B5JisRotated]: new Size(14570, 10318),
    [PaperKind.JapanesePostcardRotated]: new Size(8391, 5669),
    [PaperKind.JapaneseDoublePostcardRotated]: new Size(8391, 11339),
    [PaperKind.A6Rotated]: new Size(8391, 5953),
    [PaperKind.JapaneseEnvelopeKakuNumber2Rotated]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeKakuNumber3Rotated]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeChouNumber3Rotated]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeChouNumber4Rotated]: new Size(12240, 15840),
    [PaperKind.B6Jis]: new Size(7257, 10318),
    [PaperKind.B6JisRotated]: new Size(10318, 7257),
    [PaperKind.Standard12x11]: new Size(17280, 15840),
    [PaperKind.JapaneseEnvelopeYouNumber4]: new Size(12240, 15840),
    [PaperKind.JapaneseEnvelopeYouNumber4Rotated]: new Size(15840, 12240),
    [PaperKind.Prc16K]: new Size(8277, 12189),
    [PaperKind.Prc32K]: new Size(5499, 8561),
    [PaperKind.Prc32KBig]: new Size(5499, 8561),
    [PaperKind.PrcEnvelopeNumber1]: new Size(5783, 9354),
    [PaperKind.PrcEnvelopeNumber2]: new Size(5783, 9978),
    [PaperKind.PrcEnvelopeNumber3]: new Size(7087, 9978),
    [PaperKind.PrcEnvelopeNumber4]: new Size(6236, 11792),
    [PaperKind.PrcEnvelopeNumber5]: new Size(6236, 12472),
    [PaperKind.PrcEnvelopeNumber6]: new Size(6803, 13039),
    [PaperKind.PrcEnvelopeNumber7]: new Size(9071, 13039),
    [PaperKind.PrcEnvelopeNumber8]: new Size(6803, 17518),
    [PaperKind.PrcEnvelopeNumber9]: new Size(12983, 18369),
    [PaperKind.PrcEnvelopeNumber10]: new Size(18369, 25965),
    [PaperKind.Prc16KRotated]: new Size(12189, 8277),
    [PaperKind.Prc32KRotated]: new Size(8561, 5499),
    [PaperKind.Prc32KBigRotated]: new Size(8561, 5499),
    [PaperKind.PrcEnvelopeNumber1Rotated]: new Size(9354, 5783),
    [PaperKind.PrcEnvelopeNumber2Rotated]: new Size(9978, 5783),
    [PaperKind.PrcEnvelopeNumber3Rotated]: new Size(9978, 7087),
    [PaperKind.PrcEnvelopeNumber4Rotated]: new Size(11792, 6236),
    [PaperKind.PrcEnvelopeNumber5Rotated]: new Size(12472, 6236),
    [PaperKind.PrcEnvelopeNumber6Rotated]: new Size(13039, 6803),
    [PaperKind.PrcEnvelopeNumber7Rotated]: new Size(13039, 9071),
    [PaperKind.PrcEnvelopeNumber8Rotated]: new Size(17518, 6803),
    [PaperKind.PrcEnvelopeNumber9Rotated]: new Size(18369, 12983),
    [PaperKind.PrcEnvelopeNumber10Rotated]: new Size(25965, 18369),
};
