export class SpecialCharacters {
    constructor() {
        this.Dot = '.';
        this.Colon = ':';
        this.Underscore = '_';
        this.EqualSign = '=';
        this.MiddleDot = '\u00B7';
        this.Dash = '-';
        this.ParagraphMark = String.fromCharCode(0xD);
        this.SectionMark = String.fromCharCode(0x1D);
        this.Hyphen = '\u2010';
        this.TabMark = String.fromCharCode(0x09);
        this.NonBreakingSpace = '\u00A0';
        this.Space = ' ';
        this.EmSpace = '\u2003';
        this.EnSpace = '\u2002';
        this.QmSpace = '\u2005';
        this.LineBreak = '\u000B';
        this.PageBreak = '\u000C';
        this.ColumnBreak = '\u000E';
        this.ObjectMark = '\uFFFC';
        this.FloatingObjectMark = '\u0008';
        this.NumberingListMark = '\uFFFB';
        this.EmDash = '\u2014';
        this.EnDash = '\u2013';
        this.Bullet = '\u2022';
        this.LeftSingleQuote = '\u2018';
        this.RightSingleQuote = '\u2019';
        this.LeftDoubleQuote = '\u201C';
        this.RightDoubleQuote = '\u201D';
        this.PilcrowSign = '\u00B6';
        this.CurrencySign = '\u00A4';
        this.CopyrightSymbol = '\u00A9';
        this.TrademarkSymbol = '\u2122';
        this.OptionalHyphen = '\u00AD';
        this.RegisteredTrademarkSymbol = '\u00AE';
        this.Ellipsis = '\u2026';
        this.OpeningSingleQuotationMark = '\u2018';
        this.ClosingSingleQuotationMark = '\u2019';
        this.OpeningDoubleQuotationMark = '\u201C';
        this.ClosingDoubleQuotationMark = '\u201D';
        this.SeparatorMark = '|';
        this.HiddenLineBreak = String.fromCharCode(0x21B2);
        this.HiddenParagraphMark = String.fromCharCode(0x00B6);
        this.HiddenSpace = String.fromCharCode(0x00B7);
        this.HiddenTabSpace = String.fromCharCode(0x2192);
        this.FieldCodeStartRun = "{";
        this.FieldCodeEndRun = "}";
        this.FieldResultEndRun = ">";
        this.LayoutDependentText = "#";
    }
    DEBUG_CONVERTER(str) {
        let result = [];
        const len = str.length;
        for (let i = 0; i < len; i++) {
            const char = str[i];
            switch (char) {
                case this.Bullet:
                    result.push("[Bullet]");
                    break;
                case this.TabMark:
                    result.push("[TabMark]");
                    break;
                case this.NonBreakingSpace:
                    result.push("[NonBreakingSpace]");
                    break;
                case this.Space:
                    result.push("[Space]");
                    break;
                case this.ParagraphMark:
                    result.push("¶");
                    break;
                default: result.push(char);
            }
        }
        return result.join("");
    }
}
