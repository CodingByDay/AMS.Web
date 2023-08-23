import { MapCreator } from '../../base-utils/map-creator';
import { TabLeaderType } from '../../core/layout/main-structures/layout-boxes/layout-tab-space-box';
import { BorderLineStyle } from '../../core/model/borders/enums';
import { UnderlineType } from '../../core/model/character/enums';
import { ColorHelper } from '../../core/model/color/color';
import { DXColor } from '../../core/model/color/dx-color';
import { ThemeColorIndexConstants, ThemeColorValues } from '../../core/model/color/enums';
import { AnchorObjectHorizontalPositionAlignment, AnchorObjectHorizontalPositionType, AnchorObjectTextWrapSide, AnchorObjectTextWrapType, AnchorObjectVerticalPositionAlignment, AnchorObjectVerticalPositionType, DrawingTextAnchoringType, RelativeHeightType, RelativeWidthType, TextBoxVerticalAlignment } from '../../core/model/floating-objects/enums';
import { ListNumberAlignment, NumberingFormat } from '../../core/model/numbering-lists/list-level-properties';
import { NumberingType } from '../../core/model/numbering-lists/numbering-list';
import { TabAlign } from '../../core/model/paragraph/paragraph';
import { ParagraphAlignment, ParagraphLineSpacingType } from '../../core/model/paragraph/paragraph-properties';
import { RichUtils } from '../../core/model/rich-utils';
import { HeaderFooterType, LineNumberingRestartType, SectionStartType } from '../../core/model/section/enums';
import { ShadingPattern } from '../../core/model/shadings/shading-pattern';
import { ConditionalTableStyleFormatting, HorizontalAlignMode, HorizontalAnchorTypes, TableCellMergingState, TableCellVerticalAlignment, TableLayoutType, TableRowAlignment, TextDirection, VerticalAlignMode, VerticalAnchorTypes } from '../../core/model/tables/secondary-structures/table-base-structures';
import { TableHeightUnitType, TableWidthUnitType } from '../../core/model/tables/secondary-structures/table-units';
import { SchemeColorValues, SystemColorValues } from '../../core/model/themes/enums';
import { ColorUtils } from '@devexpress/utils/lib/utils/color';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { MLTableData } from './ml-table-data';
import { TranslationTablesData } from './translation-tables-data';
import { WordProcessingMLValue } from './word-processing-mlvalue';
export class TranslationTables {
    static createHorizontalPositionTypeAttributeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Column, 'text');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Margin, 'margin');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Page, 'page');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Character, 'char');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.LeftMargin, 'left-margin-area');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.RightMargin, 'right-margin-area');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.InsideMargin, 'inner-margin-area');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.OutsideMargin, 'outer-margin-area');
        return data;
    }
    static createVerticalPositionTypeAttributeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Margin, 'margin');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Page, 'page');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Line, 'line');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Paragraph, 'text');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.TopMargin, 'top-margin-area');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.BottomMargin, 'bottom-margin-area');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.InsideMargin, 'inner-margin-area');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.OutsideMargin, 'outer-margin-area');
        return data;
    }
    static createSchemeColorTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, SchemeColorValues.Accent1, 'accent1');
        TranslationTables.makeData(data, SchemeColorValues.Accent2, 'accent2');
        TranslationTables.makeData(data, SchemeColorValues.Accent3, 'accent3');
        TranslationTables.makeData(data, SchemeColorValues.Accent4, 'accent4');
        TranslationTables.makeData(data, SchemeColorValues.Accent5, 'accent5');
        TranslationTables.makeData(data, SchemeColorValues.Accent6, 'accent6');
        TranslationTables.makeData(data, SchemeColorValues.Background1, 'bg1');
        TranslationTables.makeData(data, SchemeColorValues.Background2, 'bg2');
        TranslationTables.makeData(data, SchemeColorValues.Dark1, 'dk1');
        TranslationTables.makeData(data, SchemeColorValues.Dark2, 'dk2');
        TranslationTables.makeData(data, SchemeColorValues.FollowedHyperlink, 'folHlink');
        TranslationTables.makeData(data, SchemeColorValues.Hyperlink, 'hlink');
        TranslationTables.makeData(data, SchemeColorValues.Light1, 'lt1');
        TranslationTables.makeData(data, SchemeColorValues.Light2, 'lt2');
        TranslationTables.makeData(data, SchemeColorValues.Style, 'phClr');
        TranslationTables.makeData(data, SchemeColorValues.Text1, 'tx1');
        TranslationTables.makeData(data, SchemeColorValues.Text2, 'tx2');
        return data;
    }
    static createSystemColorTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, SystemColorValues.Sc3dDkShadow, '3dDkShadow');
        TranslationTables.makeData(data, SystemColorValues.Sc3dLight, '3dLight');
        TranslationTables.makeData(data, SystemColorValues.ScActiveBorder, 'activeBorder');
        TranslationTables.makeData(data, SystemColorValues.ScActiveCaption, 'activeCaption');
        TranslationTables.makeData(data, SystemColorValues.ScAppWorkspace, 'appWorkspace');
        TranslationTables.makeData(data, SystemColorValues.ScBackground, 'background');
        TranslationTables.makeData(data, SystemColorValues.ScBtnFace, 'btnFace');
        TranslationTables.makeData(data, SystemColorValues.ScBtnHighlight, 'btnHighlight');
        TranslationTables.makeData(data, SystemColorValues.ScBtnShadow, 'btnShadow');
        TranslationTables.makeData(data, SystemColorValues.ScBtnText, 'btnText');
        TranslationTables.makeData(data, SystemColorValues.ScCaptionText, 'captionText');
        TranslationTables.makeData(data, SystemColorValues.ScGradientActiveCaption, 'gradientActiveCaption');
        TranslationTables.makeData(data, SystemColorValues.ScGradientInactiveCaption, 'gradientInactiveCaption');
        TranslationTables.makeData(data, SystemColorValues.ScGrayText, 'grayText');
        TranslationTables.makeData(data, SystemColorValues.ScHighlight, 'highlight');
        TranslationTables.makeData(data, SystemColorValues.ScHighlightText, 'highlightText');
        TranslationTables.makeData(data, SystemColorValues.ScHotLight, 'hotLight');
        TranslationTables.makeData(data, SystemColorValues.ScInactiveBorder, 'inactiveBorder');
        TranslationTables.makeData(data, SystemColorValues.ScInactiveCaption, 'inactiveCaption');
        TranslationTables.makeData(data, SystemColorValues.ScInactiveCaptionText, 'inactiveCaptionText');
        TranslationTables.makeData(data, SystemColorValues.ScInfoBk, 'infoBk');
        TranslationTables.makeData(data, SystemColorValues.ScInfoText, 'infoText');
        TranslationTables.makeData(data, SystemColorValues.ScMenu, 'menu');
        TranslationTables.makeData(data, SystemColorValues.ScMenuBar, 'menuBar');
        TranslationTables.makeData(data, SystemColorValues.ScMenuHighlight, 'menuHighlight');
        TranslationTables.makeData(data, SystemColorValues.ScMenuText, 'menuText');
        TranslationTables.makeData(data, SystemColorValues.ScScrollBar, 'scrollBar');
        TranslationTables.makeData(data, SystemColorValues.ScWindow, 'window');
        TranslationTables.makeData(data, SystemColorValues.ScWindowFrame, 'windowFrame');
        TranslationTables.makeData(data, SystemColorValues.ScWindowText, 'windowText');
        return data;
    }
    static createSimpleThemeColorIndexTable() {
        return new MapCreator()
            .add(ThemeColorIndexConstants.Accent1, 'accent1')
            .add(ThemeColorIndexConstants.Accent2, 'accent2')
            .add(ThemeColorIndexConstants.Accent3, 'accent3')
            .add(ThemeColorIndexConstants.Accent4, 'accent4')
            .add(ThemeColorIndexConstants.Accent5, 'accent5')
            .add(ThemeColorIndexConstants.Accent6, 'accent6')
            .add(ThemeColorIndexConstants.Dark1, 'dark1')
            .add(ThemeColorIndexConstants.Dark2, 'dark2')
            .add(ThemeColorIndexConstants.FollowedHyperlink, 'followedHyperlink')
            .add(ThemeColorIndexConstants.Hyperlink, 'hyperlink')
            .add(ThemeColorIndexConstants.Light1, 'light1')
            .add(ThemeColorIndexConstants.Light2, 'light2')
            .add(ThemeColorIndexConstants.None, 'none')
            .get();
    }
    static createSimple2ThemeColorIndexTable() {
        return new MapCreator()
            .add(ThemeColorIndexConstants.Accent1, 'accent1')
            .add(ThemeColorIndexConstants.Accent2, 'accent2')
            .add(ThemeColorIndexConstants.Accent3, 'accent3')
            .add(ThemeColorIndexConstants.Accent4, 'accent4')
            .add(ThemeColorIndexConstants.Accent5, 'accent5')
            .add(ThemeColorIndexConstants.Accent6, 'accent6')
            .add(ThemeColorIndexConstants.Dark1, 'dk1')
            .add(ThemeColorIndexConstants.Dark2, 'dk2')
            .add(ThemeColorIndexConstants.FollowedHyperlink, 'folHlink')
            .add(ThemeColorIndexConstants.Hyperlink, 'hlink')
            .add(ThemeColorIndexConstants.Light1, 'lt1')
            .add(ThemeColorIndexConstants.Light2, 'lt2')
            .get();
    }
    static makeData(data, modelValue, key, wordMLValue) {
        data.importMap[key] = data.exportMap[modelValue]
            = new MLTableData(modelValue, new WordProcessingMLValue(key, wordMLValue));
    }
    static createUnderlineTables() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, UnderlineType.None, 'none');
        TranslationTables.makeData(data, UnderlineType.Single, 'single');
        TranslationTables.makeData(data, UnderlineType.Double, 'double');
        TranslationTables.makeData(data, UnderlineType.Dotted, 'dotted');
        TranslationTables.makeData(data, UnderlineType.Dashed, 'dash');
        TranslationTables.makeData(data, UnderlineType.LongDashed, 'dashLong');
        TranslationTables.makeData(data, UnderlineType.DashDotted, 'dotDash');
        TranslationTables.makeData(data, UnderlineType.DashDotDotted, 'dotDotDash');
        TranslationTables.makeData(data, UnderlineType.DoubleWave, 'wavyDouble');
        TranslationTables.makeData(data, UnderlineType.HeavyWave, 'wavyHeavy');
        TranslationTables.makeData(data, UnderlineType.ThickDashDotDotted, 'dashDotDotHeavy');
        TranslationTables.makeData(data, UnderlineType.ThickDashDotted, 'dashDotHeavy');
        TranslationTables.makeData(data, UnderlineType.ThickDashed, 'dashedHeavy');
        TranslationTables.makeData(data, UnderlineType.ThickDotted, 'dottedHeavy');
        TranslationTables.makeData(data, UnderlineType.ThickLongDashed, 'dashLongHeavy');
        TranslationTables.makeData(data, UnderlineType.ThickSingle, 'thick');
        TranslationTables.makeData(data, UnderlineType.Wave, 'wave');
        return data;
    }
    static createThemeColorValuesTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ThemeColorValues.Accent1, 'accent1');
        TranslationTables.makeData(data, ThemeColorValues.Accent2, 'accent2');
        TranslationTables.makeData(data, ThemeColorValues.Accent3, 'accent3');
        TranslationTables.makeData(data, ThemeColorValues.Accent4, 'accent4');
        TranslationTables.makeData(data, ThemeColorValues.Accent5, 'accent5');
        TranslationTables.makeData(data, ThemeColorValues.Accent6, 'accent6');
        TranslationTables.makeData(data, ThemeColorValues.Dark1, 'dark1');
        TranslationTables.makeData(data, ThemeColorValues.Dark2, 'dark2');
        TranslationTables.makeData(data, ThemeColorValues.FollowedHyperlink, 'followedHyperlink');
        TranslationTables.makeData(data, ThemeColorValues.Hyperlink, 'hyperlink');
        TranslationTables.makeData(data, ThemeColorValues.Light1, 'light1');
        TranslationTables.makeData(data, ThemeColorValues.Light2, 'light2');
        TranslationTables.makeData(data, ThemeColorValues.None, 'none');
        TranslationTables.makeData(data, ThemeColorValues.Background1, 'background1');
        TranslationTables.makeData(data, ThemeColorValues.Background2, 'background2');
        TranslationTables.makeData(data, ThemeColorValues.Text1, 'text1');
        TranslationTables.makeData(data, ThemeColorValues.Text2, 'text2');
        return data;
    }
    static createSectionStartTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, SectionStartType.NextPage, 'nextPage');
        TranslationTables.makeData(data, SectionStartType.OddPage, 'oddPage');
        TranslationTables.makeData(data, SectionStartType.EvenPage, 'evenPage');
        TranslationTables.makeData(data, SectionStartType.Column, 'nextColumn');
        TranslationTables.makeData(data, SectionStartType.Continuous, 'continuous');
        return data;
    }
    static createLineNumberingRestartTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, LineNumberingRestartType.Continuous, 'continuous');
        TranslationTables.makeData(data, LineNumberingRestartType.NewPage, 'newPage');
        TranslationTables.makeData(data, LineNumberingRestartType.NewSection, 'newSection');
        return data;
    }
    static createPageNumberingFormatTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, NumberingFormat.None, 'none');
        TranslationTables.makeData(data, NumberingFormat.Decimal, 'decimal');
        TranslationTables.makeData(data, NumberingFormat.AIUEOFullWidthHiragana, 'aiueoFullWidth');
        TranslationTables.makeData(data, NumberingFormat.AIUEOHiragana, 'aiueo');
        TranslationTables.makeData(data, NumberingFormat.ArabicAbjad, 'arabicAbjad');
        TranslationTables.makeData(data, NumberingFormat.ArabicAlpha, 'arabicAlpha');
        TranslationTables.makeData(data, NumberingFormat.Bullet, 'bullet');
        TranslationTables.makeData(data, NumberingFormat.CardinalText, 'cardinalText');
        TranslationTables.makeData(data, NumberingFormat.Chicago, 'chicago');
        TranslationTables.makeData(data, NumberingFormat.ChineseCounting, 'chineseCounting');
        TranslationTables.makeData(data, NumberingFormat.ChineseCountingThousand, 'chineseCountingThousand');
        TranslationTables.makeData(data, NumberingFormat.ChineseLegalSimplified, 'chineseLegalSimplified');
        TranslationTables.makeData(data, NumberingFormat.Chosung, 'chosung');
        TranslationTables.makeData(data, NumberingFormat.DecimalEnclosedCircle, 'decimalEnclosedCircle');
        TranslationTables.makeData(data, NumberingFormat.DecimalEnclosedCircleChinese, 'decimalEnclosedCircleChinese');
        TranslationTables.makeData(data, NumberingFormat.DecimalEnclosedFullstop, 'decimalEnclosedFullstop');
        TranslationTables.makeData(data, NumberingFormat.DecimalEnclosedParentheses, 'decimalEnclosedParen');
        TranslationTables.makeData(data, NumberingFormat.DecimalFullWidth, 'decimalFullWidth');
        TranslationTables.makeData(data, NumberingFormat.DecimalFullWidth2, 'decimalFullWidth2');
        TranslationTables.makeData(data, NumberingFormat.DecimalHalfWidth, 'decimalHalfWidth');
        TranslationTables.makeData(data, NumberingFormat.DecimalZero, 'decimalZero');
        TranslationTables.makeData(data, NumberingFormat.Ganada, 'ganada');
        TranslationTables.makeData(data, NumberingFormat.Hebrew1, 'hebrew1');
        TranslationTables.makeData(data, NumberingFormat.Hebrew2, 'hebrew2');
        TranslationTables.makeData(data, NumberingFormat.Hex, 'hex');
        TranslationTables.makeData(data, NumberingFormat.HindiConsonants, 'hindiConsonants');
        TranslationTables.makeData(data, NumberingFormat.HindiDescriptive, 'hindiCounting');
        TranslationTables.makeData(data, NumberingFormat.HindiNumbers, 'hindiNumbers');
        TranslationTables.makeData(data, NumberingFormat.HindiVowels, 'hindiVowels');
        TranslationTables.makeData(data, NumberingFormat.IdeographDigital, 'ideographDigital');
        TranslationTables.makeData(data, NumberingFormat.IdeographEnclosedCircle, 'ideographEnclosedCircle');
        TranslationTables.makeData(data, NumberingFormat.IdeographLegalTraditional, 'ideographLegalTraditional');
        TranslationTables.makeData(data, NumberingFormat.IdeographTraditional, 'ideographTraditional');
        TranslationTables.makeData(data, NumberingFormat.IdeographZodiac, 'ideographZodiac');
        TranslationTables.makeData(data, NumberingFormat.IdeographZodiacTraditional, 'ideographZodiacTraditional');
        TranslationTables.makeData(data, NumberingFormat.Iroha, 'iroha');
        TranslationTables.makeData(data, NumberingFormat.IrohaFullWidth, 'irohaFullWidth');
        TranslationTables.makeData(data, NumberingFormat.JapaneseCounting, 'japaneseCounting');
        TranslationTables.makeData(data, NumberingFormat.JapaneseDigitalTenThousand, 'japaneseDigitalTenThousand');
        TranslationTables.makeData(data, NumberingFormat.JapaneseLegal, 'japaneseLegal');
        TranslationTables.makeData(data, NumberingFormat.KoreanCounting, 'koreanCounting');
        TranslationTables.makeData(data, NumberingFormat.KoreanDigital, 'koreanDigital');
        TranslationTables.makeData(data, NumberingFormat.KoreanDigital2, 'koreanDigital2');
        TranslationTables.makeData(data, NumberingFormat.KoreanLegal, 'koreanLegal');
        TranslationTables.makeData(data, NumberingFormat.LowerLetter, 'lowerLetter');
        TranslationTables.makeData(data, NumberingFormat.LowerRoman, 'lowerRoman');
        TranslationTables.makeData(data, NumberingFormat.NumberInDash, 'numberInDash');
        TranslationTables.makeData(data, NumberingFormat.Ordinal, 'ordinal');
        TranslationTables.makeData(data, NumberingFormat.OrdinalText, 'ordinalText');
        TranslationTables.makeData(data, NumberingFormat.RussianLower, 'russianLower');
        TranslationTables.makeData(data, NumberingFormat.RussianUpper, 'russianUpper');
        TranslationTables.makeData(data, NumberingFormat.TaiwaneseCounting, 'taiwaneseCounting');
        TranslationTables.makeData(data, NumberingFormat.TaiwaneseCountingThousand, 'taiwaneseCountingThousand');
        TranslationTables.makeData(data, NumberingFormat.TaiwaneseDigital, 'taiwaneseDigital');
        TranslationTables.makeData(data, NumberingFormat.ThaiDescriptive, 'thaiCounting');
        TranslationTables.makeData(data, NumberingFormat.ThaiLetters, 'thaiLetters');
        TranslationTables.makeData(data, NumberingFormat.ThaiNumbers, 'thaiNumbers');
        TranslationTables.makeData(data, NumberingFormat.UpperLetter, 'upperLetter');
        TranslationTables.makeData(data, NumberingFormat.UpperRoman, 'upperRoman');
        TranslationTables.makeData(data, NumberingFormat.VietnameseDescriptive, 'vietnameseCounting');
        return data;
    }
    static createChapterSeparatorsTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ':'.charCodeAt(0), 'colon');
        TranslationTables.makeData(data, RichUtils.specialCharacters.EmDash.charCodeAt(0), 'emDash');
        TranslationTables.makeData(data, RichUtils.specialCharacters.EnDash.charCodeAt(0), 'enDash');
        TranslationTables.makeData(data, RichUtils.specialCharacters.Hyphen.charCodeAt(0), 'hyphen');
        TranslationTables.makeData(data, '.'.charCodeAt(0), 'period');
        return data;
    }
    static createVerticalAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableCellVerticalAlignment.Top, 'top');
        TranslationTables.makeData(data, TableCellVerticalAlignment.Center, 'center');
        TranslationTables.makeData(data, TableCellVerticalAlignment.Bottom, 'bottom');
        TranslationTables.makeData(data, TableCellVerticalAlignment.Both, 'both');
        return data;
    }
    static createDrawingTextAnchoringTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, DrawingTextAnchoringType.Top, 't', 'top');
        TranslationTables.makeData(data, DrawingTextAnchoringType.Center, 'ctr', 'middle');
        TranslationTables.makeData(data, DrawingTextAnchoringType.Justified, 'just');
        TranslationTables.makeData(data, DrawingTextAnchoringType.Bottom, 'b', 'bottom');
        return data;
    }
    static createBorderLineStyleTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, BorderLineStyle.Nil, 'nil');
        TranslationTables.makeData(data, BorderLineStyle.DashDotStroked, 'dashDotStroked');
        TranslationTables.makeData(data, BorderLineStyle.Dashed, 'dashed');
        TranslationTables.makeData(data, BorderLineStyle.DashSmallGap, 'dashSmallGap');
        TranslationTables.makeData(data, BorderLineStyle.DotDash, 'dotDash');
        TranslationTables.makeData(data, BorderLineStyle.DotDotDash, 'dotDotDash');
        TranslationTables.makeData(data, BorderLineStyle.Dotted, 'dotted');
        TranslationTables.makeData(data, BorderLineStyle.Double, 'double');
        TranslationTables.makeData(data, BorderLineStyle.DoubleWave, 'doubleWave');
        TranslationTables.makeData(data, BorderLineStyle.Inset, 'inset');
        TranslationTables.makeData(data, BorderLineStyle.Disabled, 'disabled');
        TranslationTables.makeData(data, BorderLineStyle.None, 'none');
        TranslationTables.makeData(data, BorderLineStyle.Outset, 'outset');
        TranslationTables.makeData(data, BorderLineStyle.Single, 'single');
        TranslationTables.makeData(data, BorderLineStyle.Thick, 'thick');
        TranslationTables.makeData(data, BorderLineStyle.ThickThinLargeGap, 'thickThinLargeGap');
        TranslationTables.makeData(data, BorderLineStyle.ThickThinMediumGap, 'thickThinMediumGap');
        TranslationTables.makeData(data, BorderLineStyle.ThickThinSmallGap, 'thickThinSmallGap');
        TranslationTables.makeData(data, BorderLineStyle.ThinThickLargeGap, 'thinThickLargeGap');
        TranslationTables.makeData(data, BorderLineStyle.ThinThickMediumGap, 'thinThickMediumGap');
        TranslationTables.makeData(data, BorderLineStyle.ThinThickSmallGap, 'thinThickSmallGap');
        TranslationTables.makeData(data, BorderLineStyle.ThinThickThinLargeGap, 'thinThickThinLargeGap');
        TranslationTables.makeData(data, BorderLineStyle.ThinThickThinMediumGap, 'thinThickThinMediumGap');
        TranslationTables.makeData(data, BorderLineStyle.ThinThickThinSmallGap, 'thinThickThinSmallGap');
        TranslationTables.makeData(data, BorderLineStyle.ThreeDEmboss, 'threeDEmboss');
        TranslationTables.makeData(data, BorderLineStyle.ThreeDEngrave, 'threeDEngrave');
        TranslationTables.makeData(data, BorderLineStyle.Triple, 'triple');
        TranslationTables.makeData(data, BorderLineStyle.Wave, 'wave');
        TranslationTables.makeData(data, BorderLineStyle.Apples, 'apples');
        TranslationTables.makeData(data, BorderLineStyle.ArchedScallops, 'archedScallops');
        TranslationTables.makeData(data, BorderLineStyle.BabyPacifier, 'babyPacifier');
        TranslationTables.makeData(data, BorderLineStyle.BabyRattle, 'babyRattle');
        TranslationTables.makeData(data, BorderLineStyle.Balloons3Colors, 'balloons3Colors');
        TranslationTables.makeData(data, BorderLineStyle.BalloonsHotAir, 'balloonsHotAir');
        TranslationTables.makeData(data, BorderLineStyle.BasicBlackDashes, 'basicBlackDashes');
        TranslationTables.makeData(data, BorderLineStyle.BasicBlackDots, 'basicBlackDots');
        TranslationTables.makeData(data, BorderLineStyle.BasicBlackSquares, 'basicBlackSquares');
        TranslationTables.makeData(data, BorderLineStyle.BasicThinLines, 'basicThinLines');
        TranslationTables.makeData(data, BorderLineStyle.BasicWhiteDashes, 'basicWhiteDashes');
        TranslationTables.makeData(data, BorderLineStyle.BasicWhiteDots, 'basicWhiteDots');
        TranslationTables.makeData(data, BorderLineStyle.BasicWhiteSquares, 'basicWhiteSquares');
        TranslationTables.makeData(data, BorderLineStyle.BasicWideInline, 'basicWideInline');
        TranslationTables.makeData(data, BorderLineStyle.BasicWideMidline, 'basicWideMidline');
        TranslationTables.makeData(data, BorderLineStyle.BasicWideOutline, 'basicWideOutline');
        TranslationTables.makeData(data, BorderLineStyle.Bats, 'bats');
        TranslationTables.makeData(data, BorderLineStyle.Birds, 'birds');
        TranslationTables.makeData(data, BorderLineStyle.BirdsFlight, 'birdsFlight');
        TranslationTables.makeData(data, BorderLineStyle.Cabins, 'cabins');
        TranslationTables.makeData(data, BorderLineStyle.CakeSlice, 'cakeSlice');
        TranslationTables.makeData(data, BorderLineStyle.CandyCorn, 'candyCorn');
        TranslationTables.makeData(data, BorderLineStyle.CelticKnotwork, 'celticKnotwork');
        TranslationTables.makeData(data, BorderLineStyle.CertificateBanner, 'certificateBanner');
        TranslationTables.makeData(data, BorderLineStyle.ChainLink, 'chainLink');
        TranslationTables.makeData(data, BorderLineStyle.ChampagneBottle, 'champagneBottle');
        TranslationTables.makeData(data, BorderLineStyle.CheckedBarBlack, 'checkedBarBlack');
        TranslationTables.makeData(data, BorderLineStyle.CheckedBarColor, 'checkedBarColor');
        TranslationTables.makeData(data, BorderLineStyle.Checkered, 'checkered');
        TranslationTables.makeData(data, BorderLineStyle.ChristmasTree, 'christmasTree');
        TranslationTables.makeData(data, BorderLineStyle.CirclesLines, 'circlesLines');
        TranslationTables.makeData(data, BorderLineStyle.CirclesRectangles, 'circlesRectangles');
        TranslationTables.makeData(data, BorderLineStyle.ClassicalWave, 'classicalWave');
        TranslationTables.makeData(data, BorderLineStyle.Clocks, 'clocks');
        TranslationTables.makeData(data, BorderLineStyle.Compass, 'compass');
        TranslationTables.makeData(data, BorderLineStyle.Confetti, 'confetti');
        TranslationTables.makeData(data, BorderLineStyle.ConfettiGrays, 'confettiGrays');
        TranslationTables.makeData(data, BorderLineStyle.ConfettiOutline, 'confettiOutline');
        TranslationTables.makeData(data, BorderLineStyle.ConfettiStreamers, 'confettiStreamers');
        TranslationTables.makeData(data, BorderLineStyle.ConfettiWhite, 'confettiWhite');
        TranslationTables.makeData(data, BorderLineStyle.CornerTriangles, 'cornerTriangles');
        TranslationTables.makeData(data, BorderLineStyle.CouponCutoutDashes, 'couponCutoutDashes');
        TranslationTables.makeData(data, BorderLineStyle.CouponCutoutDots, 'couponCutoutDots');
        TranslationTables.makeData(data, BorderLineStyle.CrazyMaze, 'crazyMaze');
        TranslationTables.makeData(data, BorderLineStyle.CreaturesButterfly, 'creaturesButterfly');
        TranslationTables.makeData(data, BorderLineStyle.CreaturesFish, 'creaturesFish');
        TranslationTables.makeData(data, BorderLineStyle.CreaturesInsects, 'creaturesInsects');
        TranslationTables.makeData(data, BorderLineStyle.CreaturesLadyBug, 'creaturesLadyBug');
        TranslationTables.makeData(data, BorderLineStyle.CrossStitch, 'crossStitch');
        TranslationTables.makeData(data, BorderLineStyle.Cup, 'cup');
        TranslationTables.makeData(data, BorderLineStyle.DecoArch, 'decoArch');
        TranslationTables.makeData(data, BorderLineStyle.DecoArchColor, 'decoArchColor');
        TranslationTables.makeData(data, BorderLineStyle.DecoBlocks, 'decoBlocks');
        TranslationTables.makeData(data, BorderLineStyle.DiamondsGray, 'diamondsGray');
        TranslationTables.makeData(data, BorderLineStyle.DoubleD, 'doubleD');
        TranslationTables.makeData(data, BorderLineStyle.DoubleDiamonds, 'doubleDiamonds');
        TranslationTables.makeData(data, BorderLineStyle.Earth1, 'earth1');
        TranslationTables.makeData(data, BorderLineStyle.Earth2, 'earth2');
        TranslationTables.makeData(data, BorderLineStyle.EclipsingSquares1, 'eclipsingSquares1');
        TranslationTables.makeData(data, BorderLineStyle.EclipsingSquares2, 'eclipsingSquares2');
        TranslationTables.makeData(data, BorderLineStyle.EggsBlack, 'eggsBlack');
        TranslationTables.makeData(data, BorderLineStyle.Fans, 'fans');
        TranslationTables.makeData(data, BorderLineStyle.Film, 'film');
        TranslationTables.makeData(data, BorderLineStyle.Firecrackers, 'firecrackers');
        TranslationTables.makeData(data, BorderLineStyle.FlowersBlockPrint, 'flowersBlockPrint');
        TranslationTables.makeData(data, BorderLineStyle.FlowersDaisies, 'flowersDaisies');
        TranslationTables.makeData(data, BorderLineStyle.FlowersModern1, 'flowersModern1');
        TranslationTables.makeData(data, BorderLineStyle.FlowersModern2, 'flowersModern2');
        TranslationTables.makeData(data, BorderLineStyle.FlowersPansy, 'flowersPansy');
        TranslationTables.makeData(data, BorderLineStyle.FlowersRedRose, 'flowersRedRose');
        TranslationTables.makeData(data, BorderLineStyle.FlowersRoses, 'flowersRoses');
        TranslationTables.makeData(data, BorderLineStyle.FlowersTeacup, 'flowersTeacup');
        TranslationTables.makeData(data, BorderLineStyle.FlowersTiny, 'flowersTiny');
        TranslationTables.makeData(data, BorderLineStyle.Gems, 'gems');
        TranslationTables.makeData(data, BorderLineStyle.GingerbreadMan, 'gingerbreadMan');
        TranslationTables.makeData(data, BorderLineStyle.Gradient, 'gradient');
        TranslationTables.makeData(data, BorderLineStyle.Handmade1, 'handmade1');
        TranslationTables.makeData(data, BorderLineStyle.Handmade2, 'handmade2');
        TranslationTables.makeData(data, BorderLineStyle.HeartBalloon, 'heartBalloon');
        TranslationTables.makeData(data, BorderLineStyle.HeartGray, 'heartGray');
        TranslationTables.makeData(data, BorderLineStyle.Hearts, 'hearts');
        TranslationTables.makeData(data, BorderLineStyle.HeebieJeebies, 'heebieJeebies');
        TranslationTables.makeData(data, BorderLineStyle.Holly, 'holly');
        TranslationTables.makeData(data, BorderLineStyle.HouseFunky, 'houseFunky');
        TranslationTables.makeData(data, BorderLineStyle.Hypnotic, 'hypnotic');
        TranslationTables.makeData(data, BorderLineStyle.IceCreamCones, 'iceCreamCones');
        TranslationTables.makeData(data, BorderLineStyle.LightBulb, 'lightBulb');
        TranslationTables.makeData(data, BorderLineStyle.Lightning1, 'lightning1');
        TranslationTables.makeData(data, BorderLineStyle.Lightning2, 'lightning2');
        TranslationTables.makeData(data, BorderLineStyle.MapleLeaf, 'mapleLeaf');
        TranslationTables.makeData(data, BorderLineStyle.MapleMuffins, 'mapleMuffins');
        TranslationTables.makeData(data, BorderLineStyle.MapPins, 'mapPins');
        TranslationTables.makeData(data, BorderLineStyle.Marquee, 'marquee');
        TranslationTables.makeData(data, BorderLineStyle.MarqueeToothed, 'marqueeToothed');
        TranslationTables.makeData(data, BorderLineStyle.Moons, 'moons');
        TranslationTables.makeData(data, BorderLineStyle.Mosaic, 'mosaic');
        TranslationTables.makeData(data, BorderLineStyle.MusicNotes, 'musicNotes');
        TranslationTables.makeData(data, BorderLineStyle.Northwest, 'northwest');
        TranslationTables.makeData(data, BorderLineStyle.Ovals, 'ovals');
        TranslationTables.makeData(data, BorderLineStyle.Packages, 'packages');
        TranslationTables.makeData(data, BorderLineStyle.PalmsBlack, 'palmsBlack');
        TranslationTables.makeData(data, BorderLineStyle.PalmsColor, 'palmsColor');
        TranslationTables.makeData(data, BorderLineStyle.PaperClips, 'paperClips');
        TranslationTables.makeData(data, BorderLineStyle.Papyrus, 'papyrus');
        TranslationTables.makeData(data, BorderLineStyle.PartyFavor, 'partyFavor');
        TranslationTables.makeData(data, BorderLineStyle.PartyGlass, 'partyGlass');
        TranslationTables.makeData(data, BorderLineStyle.Pencils, 'pencils');
        TranslationTables.makeData(data, BorderLineStyle.People, 'people');
        TranslationTables.makeData(data, BorderLineStyle.PeopleHats, 'peopleHats');
        TranslationTables.makeData(data, BorderLineStyle.PeopleWaving, 'peopleWaving');
        TranslationTables.makeData(data, BorderLineStyle.Poinsettias, 'poinsettias');
        TranslationTables.makeData(data, BorderLineStyle.PostageStamp, 'postageStamp');
        TranslationTables.makeData(data, BorderLineStyle.Pumpkin1, 'pumpkin1');
        TranslationTables.makeData(data, BorderLineStyle.PushPinNote1, 'pushPinNote1');
        TranslationTables.makeData(data, BorderLineStyle.PushPinNote2, 'pushPinNote2');
        TranslationTables.makeData(data, BorderLineStyle.Pyramids, 'pyramids');
        TranslationTables.makeData(data, BorderLineStyle.PyramidsAbove, 'pyramidsAbove');
        TranslationTables.makeData(data, BorderLineStyle.Quadrants, 'quadrants');
        TranslationTables.makeData(data, BorderLineStyle.Rings, 'rings');
        TranslationTables.makeData(data, BorderLineStyle.Safari, 'safari');
        TranslationTables.makeData(data, BorderLineStyle.Sawtooth, 'sawtooth');
        TranslationTables.makeData(data, BorderLineStyle.SawtoothGray, 'sawtoothGray');
        TranslationTables.makeData(data, BorderLineStyle.ScaredCat, 'scaredCat');
        TranslationTables.makeData(data, BorderLineStyle.Seattle, 'seattle');
        TranslationTables.makeData(data, BorderLineStyle.ShadowedSquares, 'shadowedSquares');
        TranslationTables.makeData(data, BorderLineStyle.SharksTeeth, 'sharksTeeth');
        TranslationTables.makeData(data, BorderLineStyle.ShorebirdTracks, 'shorebirdTracks');
        TranslationTables.makeData(data, BorderLineStyle.Skyrocket, 'skyrocket');
        TranslationTables.makeData(data, BorderLineStyle.SnowflakeFancy, 'snowflakeFancy');
        TranslationTables.makeData(data, BorderLineStyle.Snowflakes, 'snowflakes');
        TranslationTables.makeData(data, BorderLineStyle.Sombrero, 'sombrero');
        TranslationTables.makeData(data, BorderLineStyle.Southwest, 'southwest');
        TranslationTables.makeData(data, BorderLineStyle.Stars, 'stars');
        TranslationTables.makeData(data, BorderLineStyle.Stars3d, 'stars3d');
        TranslationTables.makeData(data, BorderLineStyle.StarsBlack, 'starsBlack');
        TranslationTables.makeData(data, BorderLineStyle.StarsShadowed, 'starsShadowed');
        TranslationTables.makeData(data, BorderLineStyle.StarsTop, 'starsTop');
        TranslationTables.makeData(data, BorderLineStyle.Sun, 'sun');
        TranslationTables.makeData(data, BorderLineStyle.Swirligig, 'swirligig');
        TranslationTables.makeData(data, BorderLineStyle.TornPaper, 'tornPaper');
        TranslationTables.makeData(data, BorderLineStyle.TornPaperBlack, 'tornPaperBlack');
        TranslationTables.makeData(data, BorderLineStyle.Trees, 'trees');
        TranslationTables.makeData(data, BorderLineStyle.TriangleParty, 'triangleParty');
        TranslationTables.makeData(data, BorderLineStyle.Triangles, 'triangles');
        TranslationTables.makeData(data, BorderLineStyle.Tribal1, 'tribal1');
        TranslationTables.makeData(data, BorderLineStyle.Tribal2, 'tribal2');
        TranslationTables.makeData(data, BorderLineStyle.Tribal3, 'tribal3');
        TranslationTables.makeData(data, BorderLineStyle.Tribal4, 'tribal4');
        TranslationTables.makeData(data, BorderLineStyle.Tribal5, 'tribal5');
        TranslationTables.makeData(data, BorderLineStyle.Tribal6, 'tribal6');
        TranslationTables.makeData(data, BorderLineStyle.TwistedLines1, 'twistedLines1');
        TranslationTables.makeData(data, BorderLineStyle.TwistedLines2, 'twistedLines2');
        TranslationTables.makeData(data, BorderLineStyle.Vine, 'vine');
        TranslationTables.makeData(data, BorderLineStyle.Waveline, 'waveline');
        TranslationTables.makeData(data, BorderLineStyle.WeavingAngles, 'weavingAngles');
        TranslationTables.makeData(data, BorderLineStyle.WeavingBraid, 'weavingBraid');
        TranslationTables.makeData(data, BorderLineStyle.WeavingRibbon, 'weavingRibbon');
        TranslationTables.makeData(data, BorderLineStyle.WeavingStrips, 'weavingStrips');
        TranslationTables.makeData(data, BorderLineStyle.WhiteFlowers, 'whiteFlowers');
        TranslationTables.makeData(data, BorderLineStyle.Woodwork, 'woodwork');
        TranslationTables.makeData(data, BorderLineStyle.XIllusions, 'xIllusions');
        TranslationTables.makeData(data, BorderLineStyle.ZanyTriangles, 'zanyTriangles');
        TranslationTables.makeData(data, BorderLineStyle.ZigZag, 'zigZag');
        TranslationTables.makeData(data, BorderLineStyle.ZigZagStitch, 'zigZagStitch');
        return data;
    }
    static createShadingPatternTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ShadingPattern.Clear, 'clear');
        TranslationTables.makeData(data, ShadingPattern.DiagCross, 'diagCross');
        TranslationTables.makeData(data, ShadingPattern.DiagStripe, 'diagStripe');
        TranslationTables.makeData(data, ShadingPattern.HorzCross, 'horzCross');
        TranslationTables.makeData(data, ShadingPattern.HorzStripe, 'horzStripe');
        TranslationTables.makeData(data, ShadingPattern.Nil, 'nil');
        TranslationTables.makeData(data, ShadingPattern.Pct10, 'pct10');
        TranslationTables.makeData(data, ShadingPattern.Pct12, 'pct12');
        TranslationTables.makeData(data, ShadingPattern.Pct15, 'pct15');
        TranslationTables.makeData(data, ShadingPattern.Pct20, 'pct20');
        TranslationTables.makeData(data, ShadingPattern.Pct25, 'pct25');
        TranslationTables.makeData(data, ShadingPattern.Pct30, 'pct30');
        TranslationTables.makeData(data, ShadingPattern.Pct35, 'pct35');
        TranslationTables.makeData(data, ShadingPattern.Pct37, 'pct37');
        TranslationTables.makeData(data, ShadingPattern.Pct40, 'pct40');
        TranslationTables.makeData(data, ShadingPattern.Pct45, 'pct45');
        TranslationTables.makeData(data, ShadingPattern.Pct5, 'pct5');
        TranslationTables.makeData(data, ShadingPattern.Pct50, 'pct50');
        TranslationTables.makeData(data, ShadingPattern.Pct55, 'pct55');
        TranslationTables.makeData(data, ShadingPattern.Pct60, 'pct60');
        TranslationTables.makeData(data, ShadingPattern.Pct62, 'pct62');
        TranslationTables.makeData(data, ShadingPattern.Pct65, 'pct65');
        TranslationTables.makeData(data, ShadingPattern.Pct70, 'pct70');
        TranslationTables.makeData(data, ShadingPattern.Pct75, 'pct75');
        TranslationTables.makeData(data, ShadingPattern.Pct80, 'pct80');
        TranslationTables.makeData(data, ShadingPattern.Pct85, 'pct85');
        TranslationTables.makeData(data, ShadingPattern.Pct87, 'pct87');
        TranslationTables.makeData(data, ShadingPattern.Pct90, 'pct90');
        TranslationTables.makeData(data, ShadingPattern.Pct95, 'pct95');
        TranslationTables.makeData(data, ShadingPattern.ReverseDiagStripe, 'reverseDiagStripe');
        TranslationTables.makeData(data, ShadingPattern.Solid, 'solid');
        TranslationTables.makeData(data, ShadingPattern.ThinDiagCross, 'thinDiagCross');
        TranslationTables.makeData(data, ShadingPattern.ThinDiagStripe, 'ThinDiagStripe');
        TranslationTables.makeData(data, ShadingPattern.ThinHorzCross, 'thinHorzCross');
        TranslationTables.makeData(data, ShadingPattern.ThinHorzStripe, 'thinHorzStripe');
        TranslationTables.makeData(data, ShadingPattern.ThinReverseDiagStripe, 'thinReverseDiagStripe');
        TranslationTables.makeData(data, ShadingPattern.ThinVertStripe, 'thinVertStripe');
        TranslationTables.makeData(data, ShadingPattern.VertStripe, 'vertStripe');
        return data;
    }
    static createParagraphLineSpacingTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ParagraphLineSpacingType.Single, 'auto');
        TranslationTables.makeData(data, ParagraphLineSpacingType.Double, 'auto');
        TranslationTables.makeData(data, ParagraphLineSpacingType.Sesquialteral, 'auto');
        TranslationTables.makeData(data, ParagraphLineSpacingType.Multiple, 'auto');
        TranslationTables.makeData(data, ParagraphLineSpacingType.Exactly, 'exact');
        TranslationTables.makeData(data, ParagraphLineSpacingType.AtLeast, 'atLeast');
        return data;
    }
    static createParagraphAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ParagraphAlignment.Left, 'left');
        TranslationTables.makeData(data, ParagraphAlignment.Right, 'right');
        TranslationTables.makeData(data, ParagraphAlignment.Center, 'center');
        TranslationTables.makeData(data, ParagraphAlignment.Justify, 'both');
        return data;
    }
    static createPredefinedBackgroundColors() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, DXColor.empty, 'none');
        TranslationTables.makeData(data, ColorHelper.getPredefinedColor(ColorUtils.colorNames.black), 'black');
        TranslationTables.makeData(data, DXColor.fromRgb(0x00, 0x00, 0xFF), 'blue');
        TranslationTables.makeData(data, DXColor.fromRgb(0x00, 0xFF, 0xFF), 'cyan');
        TranslationTables.makeData(data, DXColor.fromRgb(0x00, 0x00, 0x80), 'darkBlue');
        TranslationTables.makeData(data, DXColor.fromRgb(0x00, 0x80, 0x80), 'darkCyan');
        TranslationTables.makeData(data, DXColor.fromRgb(0x80, 0x80, 0x80), 'darkGray');
        TranslationTables.makeData(data, DXColor.fromRgb(0x00, 0x80, 0x00), 'darkGreen');
        TranslationTables.makeData(data, DXColor.fromRgb(0x80, 0x00, 0x80), 'darkMagenta');
        TranslationTables.makeData(data, DXColor.fromRgb(0x80, 0x00, 0x00), 'darkRed');
        TranslationTables.makeData(data, DXColor.fromRgb(0x80, 0x80, 0x00), 'darkYellow');
        TranslationTables.makeData(data, DXColor.fromRgb(0x00, 0xFF, 0x00), 'green');
        TranslationTables.makeData(data, DXColor.fromRgb(0xC0, 0xC0, 0xC0), 'lightGray');
        TranslationTables.makeData(data, DXColor.fromRgb(0xFF, 0x00, 0xFF), 'magenta');
        TranslationTables.makeData(data, DXColor.fromRgb(0xFF, 0x00, 0x00), 'red');
        TranslationTables.makeData(data, DXColor.fromRgb(0xFF, 0xFF, 0xFF), 'white');
        TranslationTables.makeData(data, DXColor.fromRgb(0xFF, 0xFF, 0x00), 'yellow');
        return data;
    }
    static createRunBreaksTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, RichUtils.specialCharacters.LineBreak.charCodeAt(0), 'textWrapping');
        TranslationTables.makeData(data, RichUtils.specialCharacters.PageBreak.charCodeAt(0), 'page');
        TranslationTables.makeData(data, RichUtils.specialCharacters.ColumnBreak.charCodeAt(0), 'column');
        return data;
    }
    static createHorizontalAnchorTypesTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, HorizontalAnchorTypes.Column, 'text');
        TranslationTables.makeData(data, HorizontalAnchorTypes.Margin, 'margin');
        TranslationTables.makeData(data, HorizontalAnchorTypes.Page, 'page');
        return data;
    }
    static createVerticalAnchorTypesTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, VerticalAnchorTypes.Paragraph, 'text');
        TranslationTables.makeData(data, VerticalAnchorTypes.Margin, 'margin');
        TranslationTables.makeData(data, VerticalAnchorTypes.Page, 'page');
        return data;
    }
    static createHorizontalAlignModeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, HorizontalAlignMode.Center, 'center');
        TranslationTables.makeData(data, HorizontalAlignMode.Inside, 'inside');
        TranslationTables.makeData(data, HorizontalAlignMode.Left, 'left');
        TranslationTables.makeData(data, HorizontalAlignMode.Outside, 'outside');
        TranslationTables.makeData(data, HorizontalAlignMode.Right, 'right');
        return data;
    }
    static createVerticalAlignModeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, VerticalAlignMode.Bottom, 'bottom');
        TranslationTables.makeData(data, VerticalAlignMode.Center, 'center');
        TranslationTables.makeData(data, VerticalAlignMode.Inline, 'inline');
        TranslationTables.makeData(data, VerticalAlignMode.Inside, 'inside');
        TranslationTables.makeData(data, VerticalAlignMode.Outside, 'outside');
        TranslationTables.makeData(data, VerticalAlignMode.Top, 'top');
        return data;
    }
    static createWidthUnitTypesTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableWidthUnitType.Auto, 'auto');
        TranslationTables.makeData(data, TableWidthUnitType.FiftiethsOfPercent, 'pct');
        TranslationTables.makeData(data, TableWidthUnitType.ModelUnits, 'dxa');
        TranslationTables.makeData(data, TableWidthUnitType.Nil, 'nil');
        return data;
    }
    static createTableRowAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableRowAlignment.Both, 'both');
        TranslationTables.makeData(data, TableRowAlignment.Center, 'center');
        TranslationTables.makeData(data, TableRowAlignment.Distribute, 'distribute');
        TranslationTables.makeData(data, TableRowAlignment.Left, 'left');
        TranslationTables.makeData(data, TableRowAlignment.NumTab, 'numTab');
        TranslationTables.makeData(data, TableRowAlignment.Right, 'right');
        return data;
    }
    static createStrictTableRowAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableRowAlignment.Both, 'both');
        TranslationTables.makeData(data, TableRowAlignment.Center, 'center');
        TranslationTables.makeData(data, TableRowAlignment.Distribute, 'distribute');
        TranslationTables.makeData(data, TableRowAlignment.Left, 'start');
        TranslationTables.makeData(data, TableRowAlignment.NumTab, 'numTab');
        TranslationTables.makeData(data, TableRowAlignment.Right, 'end');
        return data;
    }
    static createTableLayoutTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableLayoutType.Autofit, 'autofit');
        TranslationTables.makeData(data, TableLayoutType.Fixed, 'fixed');
        return data;
    }
    static createHeightUnitTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableHeightUnitType.Auto, 'auto');
        TranslationTables.makeData(data, TableHeightUnitType.Exact, 'exact');
        TranslationTables.makeData(data, TableHeightUnitType.Minimum, 'atLeast');
        return data;
    }
    static createMergingStateTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TableCellMergingState.None, 'none');
        TranslationTables.makeData(data, TableCellMergingState.Restart, 'restart');
        TranslationTables.makeData(data, TableCellMergingState.Continue, 'continue');
        return data;
    }
    static createHeaderFooterTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, HeaderFooterType.Even, 'even');
        TranslationTables.makeData(data, HeaderFooterType.First, 'first');
        TranslationTables.makeData(data, HeaderFooterType.Odd, 'default');
        return data;
    }
    static createNumberingListTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, NumberingType.Bullet, 'hybridMultilevel', 'HybridMultilevel');
        TranslationTables.makeData(data, NumberingType.Simple, 'hybridMultilevel', 'HybridMultilevel');
        TranslationTables.makeData(data, NumberingType.MultiLevel, 'multilevel', 'Multilevel');
        return data;
    }
    static createListNumberSeparatorTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, '\0'.charCodeAt(0), 'nothing');
        TranslationTables.makeData(data, ' '.charCodeAt(0), 'space');
        TranslationTables.makeData(data, RichUtils.specialCharacters.TabMark.charCodeAt(0), 'tab');
        return data;
    }
    static createListNumberAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ListNumberAlignment.Left, 'left');
        TranslationTables.makeData(data, ListNumberAlignment.Right, 'right');
        TranslationTables.makeData(data, ListNumberAlignment.Center, 'center');
        return data;
    }
    static createTabLeaderTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TabLeaderType.None, 'none');
        TranslationTables.makeData(data, TabLeaderType.Dots, 'dot');
        TranslationTables.makeData(data, TabLeaderType.EqualSign, 'hyphen');
        TranslationTables.makeData(data, TabLeaderType.Hyphens, 'hyphen');
        TranslationTables.makeData(data, TabLeaderType.MiddleDots, 'middleDot');
        TranslationTables.makeData(data, TabLeaderType.ThickLine, 'heavy');
        TranslationTables.makeData(data, TabLeaderType.Underline, 'underscore');
        return data;
    }
    static createTabAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TabAlign.Left, 'left');
        TranslationTables.makeData(data, TabAlign.Right, 'right');
        TranslationTables.makeData(data, TabAlign.Center, 'center');
        TranslationTables.makeData(data, TabAlign.Decimal, 'decimal');
        return data;
    }
    static createStrictTabAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TabAlign.Left, 'start');
        TranslationTables.makeData(data, TabAlign.Right, 'end');
        TranslationTables.makeData(data, TabAlign.Center, 'center');
        TranslationTables.makeData(data, TabAlign.Decimal, 'decimal');
        return data;
    }
    static createTextBoxVerticalAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TextBoxVerticalAlignment.Top, 't', 'top');
        TranslationTables.makeData(data, TextBoxVerticalAlignment.Center, 'ctr', 'middle');
        TranslationTables.makeData(data, TextBoxVerticalAlignment.Both, 'just');
        TranslationTables.makeData(data, TextBoxVerticalAlignment.Bottom, 'b', 'bottom');
        return data;
    }
    static createConditionalTableStyleFormattingTypesTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.BottomLeftCell, 'swCell', 'swCell');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.BottomRightCell, 'seCell', 'seCell');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.EvenColumnBanding, 'band2Vert', 'band2Vert');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.EvenRowBanding, 'band2Horz', 'band2Horz');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.FirstColumn, 'firstCol', 'firstCol');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.FirstRow, 'firstRow', 'firstRow');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.LastColumn, 'lastCol', 'lastCol');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.LastRow, 'lastRow', 'lastRow');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.OddColumnBanding, 'band1Vert', 'band1Vert');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.OddRowBanding, 'band1Horz', 'band1Horz');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.TopLeftCell, 'nwCell', 'nwCell');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.TopRightCell, 'neCell', 'neCell');
        TranslationTables.makeData(data, ConditionalTableStyleFormatting.WholeTable, 'wholeTable', 'wholeTable');
        return data;
    }
    static createFloatingObjectHorizontalPositionTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Column, 'column', 'text');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Margin, 'margin');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Page, 'page');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.Character, 'character', 'char');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.LeftMargin, 'leftMargin', 'page');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.RightMargin, 'rightMargin', 'page');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.InsideMargin, 'insideMargin', 'page');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionType.OutsideMargin, 'outsideMargin', 'page');
        return data;
    }
    static createFloatingObjectHorizontalPositionAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionAlignment.Left, 'left');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionAlignment.Center, 'center');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionAlignment.Right, 'right');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionAlignment.Inside, 'inside');
        TranslationTables.makeData(data, AnchorObjectHorizontalPositionAlignment.Outside, 'outside');
        return data;
    }
    static createFloatingObjectVerticalPositionTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Margin, 'margin');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Page, 'page', 'margin');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Line, 'line');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.Paragraph, 'paragraph', 'text');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.TopMargin, 'topMargin', 'page');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.BottomMargin, 'bottomMargin', 'page');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.InsideMargin, 'insideMargin', 'page');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionType.OutsideMargin, 'outsideMargin', 'page');
        return data;
    }
    static createFloatingObjectVerticalPositionAlignmentTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectVerticalPositionAlignment.Top, 'top');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionAlignment.Center, 'center');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionAlignment.Bottom, 'bottom');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionAlignment.Inside, 'inside');
        TranslationTables.makeData(data, AnchorObjectVerticalPositionAlignment.Outside, 'outside');
        return data;
    }
    static createFloatingObjectTextWrapTypeTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectTextWrapType.TopAndBottom, 'wrapTopAndBottom', 'topAndBottom');
        TranslationTables.makeData(data, AnchorObjectTextWrapType.Square, 'wrapSquare', 'square');
        TranslationTables.makeData(data, AnchorObjectTextWrapType.Through, 'wrapThrough', 'through');
        TranslationTables.makeData(data, AnchorObjectTextWrapType.Tight, 'wrapTight', 'tight');
        TranslationTables.makeData(data, AnchorObjectTextWrapType.None, 'wrapNone', 'none');
        return data;
    }
    static createFloatingObjectTextWrapSideTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, AnchorObjectTextWrapSide.Both, 'bothSides', 'both-sides');
        TranslationTables.makeData(data, AnchorObjectTextWrapSide.Left, 'left');
        TranslationTables.makeData(data, AnchorObjectTextWrapSide.Right, 'right');
        TranslationTables.makeData(data, AnchorObjectTextWrapSide.Largest, 'largest');
        return data;
    }
    static createFloatingObjectRelativeFromHorizontalTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, RelativeWidthType.Margin, 'margin');
        TranslationTables.makeData(data, RelativeWidthType.Page, 'page');
        TranslationTables.makeData(data, RelativeWidthType.LeftMargin, 'leftMargin');
        TranslationTables.makeData(data, RelativeWidthType.RightMargin, 'rightMargin');
        TranslationTables.makeData(data, RelativeWidthType.OutsideMargin, 'outsideMargin');
        TranslationTables.makeData(data, RelativeWidthType.InsideMargin, 'insideMargin');
        return data;
    }
    static createFloatingObjectRelativeFromVerticalTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, RelativeHeightType.Margin, 'margin');
        TranslationTables.makeData(data, RelativeHeightType.Page, 'page');
        TranslationTables.makeData(data, RelativeHeightType.TopMargin, 'topMargin');
        TranslationTables.makeData(data, RelativeHeightType.BottomMargin, 'bottomMargin');
        TranslationTables.makeData(data, RelativeHeightType.OutsideMargin, 'outsideMargin');
        TranslationTables.makeData(data, RelativeHeightType.InsideMargin, 'insideMargin');
        return data;
    }
    static createFloatingObjectCssRelativeFromHorizontalTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, RelativeWidthType.Margin, 'margin');
        TranslationTables.makeData(data, RelativeWidthType.Page, 'page');
        TranslationTables.makeData(data, RelativeWidthType.LeftMargin, 'left-margin-area');
        TranslationTables.makeData(data, RelativeWidthType.RightMargin, 'right-margin-area');
        TranslationTables.makeData(data, RelativeWidthType.OutsideMargin, 'outer-margin-area');
        TranslationTables.makeData(data, RelativeWidthType.InsideMargin, 'inner-margin-area');
        return data;
    }
    static createFloatingObjectCssRelativeFromVerticalTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, RelativeHeightType.Margin, 'margin');
        TranslationTables.makeData(data, RelativeHeightType.Page, 'page');
        TranslationTables.makeData(data, RelativeHeightType.TopMargin, 'top-margin-area');
        TranslationTables.makeData(data, RelativeHeightType.BottomMargin, 'bottom-margin-area');
        TranslationTables.makeData(data, RelativeHeightType.OutsideMargin, 'outer-margin-area');
        TranslationTables.makeData(data, RelativeHeightType.InsideMargin, 'inner-margin-area');
        return data;
    }
    static createThemeColorIndexTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, ThemeColorIndexConstants.Accent1, 'accent1');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Accent2, 'accent2');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Accent3, 'accent3');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Accent4, 'accent4');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Accent5, 'accent5');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Accent6, 'accent6');
        TranslationTables.makeData(data, ThemeColorIndexConstants.FollowedHyperlink, 'folHlink');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Hyperlink, 'hlink');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Dark1, 'dk1');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Dark2, 'dk2');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Light1, 'lt1');
        TranslationTables.makeData(data, ThemeColorIndexConstants.Light2, 'lt2');
        return data;
    }
    static createTextDirectionTable() {
        const data = new TranslationTablesData();
        TranslationTables.makeData(data, TextDirection.LeftToRightTopToBottom, 'lrTb');
        TranslationTables.makeData(data, TextDirection.LeftToRightTopToBottomRotated, 'lrTbV');
        TranslationTables.makeData(data, TextDirection.BottomToTopLeftToRight, 'btLr');
        TranslationTables.makeData(data, TextDirection.TopToBottomLeftToRightRotated, 'tbLrV');
        TranslationTables.makeData(data, TextDirection.TopToBottomRightToLeft, 'tbRl');
        TranslationTables.makeData(data, TextDirection.TopToBottomRightToLeftRotated, 'tbRlV');
        return data;
    }
}
TranslationTables.sectionStartTypeTable = TranslationTables.createSectionStartTypeTable();
TranslationTables.lineNumberingRestartTable = TranslationTables.createLineNumberingRestartTable();
TranslationTables.pageNumberingFormatTable = TranslationTables.createPageNumberingFormatTable();
TranslationTables.chapterSeparatorsTable = TranslationTables.createChapterSeparatorsTable();
TranslationTables.verticalAlignmentTable = TranslationTables.createVerticalAlignmentTable();
TranslationTables.drawingTextAnchoringType = TranslationTables.createDrawingTextAnchoringTypeTable();
TranslationTables.textDirectionTable = TranslationTables.createTextDirectionTable();
TranslationTables.borderLineStyleTable = TranslationTables.createBorderLineStyleTable();
TranslationTables.themeColorValueTable = TranslationTables.createThemeColorValuesTable();
TranslationTables.themeColorIndexTable = TranslationTables.createThemeColorIndexTable();
TranslationTables.simpleThemeColorIndexTable = TranslationTables.createSimpleThemeColorIndexTable();
TranslationTables.simple2ThemeColorIndexTable = TranslationTables.createSimple2ThemeColorIndexTable();
TranslationTables.shadingPatternTable = TranslationTables.createShadingPatternTable();
TranslationTables.lineSpacingTable = TranslationTables.createParagraphLineSpacingTable();
TranslationTables.paragraphAlignmentTable = TranslationTables.createParagraphAlignmentTable();
TranslationTables.underlineTables = TranslationTables.createUnderlineTables();
TranslationTables.predefinedBackgroundColors = TranslationTables.createPredefinedBackgroundColors();
TranslationTables.listOfKeysPredefinedBackgroundColors = NumberMapUtils.toListBy(TranslationTables.predefinedBackgroundColors.exportMap, (_e, key) => key);
TranslationTables.runBreaksTable = TranslationTables.createRunBreaksTable();
TranslationTables.horizontalAnchorTypesTable = TranslationTables.createHorizontalAnchorTypesTable();
TranslationTables.verticalAnchorTypesTable = TranslationTables.createVerticalAnchorTypesTable();
TranslationTables.horizontalAlignModeTable = TranslationTables.createHorizontalAlignModeTable();
TranslationTables.verticalAlignModeTable = TranslationTables.createVerticalAlignModeTable();
TranslationTables.widthUnitTypesTable = TranslationTables.createWidthUnitTypesTable();
TranslationTables.tableRowAlignmentTable = TranslationTables.createTableRowAlignmentTable();
TranslationTables.strictTableRowAlignmentTable = TranslationTables.createStrictTableRowAlignmentTable();
TranslationTables.tableLayoutTypeTable = TranslationTables.createTableLayoutTypeTable();
TranslationTables.heightUnitTypeTable = TranslationTables.createHeightUnitTypeTable();
TranslationTables.mergingStateTable = TranslationTables.createMergingStateTable();
TranslationTables.headerFooterTypeTable = TranslationTables.createHeaderFooterTypeTable();
TranslationTables.floatingObjectHorizontalPositionTypeTable = TranslationTables.createFloatingObjectHorizontalPositionTypeTable();
TranslationTables.floatingObjectHorizontalPositionAlignmentTable = TranslationTables.createFloatingObjectHorizontalPositionAlignmentTable();
TranslationTables.floatingObjectVerticalPositionTypeTable = TranslationTables.createFloatingObjectVerticalPositionTypeTable();
TranslationTables.floatingObjectVerticalPositionAlignmentTable = TranslationTables.createFloatingObjectVerticalPositionAlignmentTable();
TranslationTables.floatingObjectTextWrapTypeTable = TranslationTables.createFloatingObjectTextWrapTypeTable();
TranslationTables.floatingObjectTextWrapSideTable = TranslationTables.createFloatingObjectTextWrapSideTable();
TranslationTables.floatingObjectRelativeFromHorizontalTable = TranslationTables.createFloatingObjectRelativeFromHorizontalTable();
TranslationTables.floatingObjectRelativeFromVerticalTable = TranslationTables.createFloatingObjectRelativeFromVerticalTable();
TranslationTables.textBoxVerticalAlignmentTable = TranslationTables.createTextBoxVerticalAlignmentTable();
TranslationTables.floatingObjectCssRelativeFromHorizontalTable = TranslationTables.createFloatingObjectCssRelativeFromHorizontalTable();
TranslationTables.floatingObjectCssRelativeFromVerticalTable = TranslationTables.createFloatingObjectCssRelativeFromVerticalTable();
TranslationTables.tabAlignmentTable = TranslationTables.createTabAlignmentTable();
TranslationTables.strictTabAlignmentTable = TranslationTables.createStrictTabAlignmentTable();
TranslationTables.tabLeaderTable = TranslationTables.createTabLeaderTable();
TranslationTables.conditionalTableStyleFormattingTypesTable = TranslationTables.createConditionalTableStyleFormattingTypesTable();
TranslationTables.numberingListTypeTable = TranslationTables.createNumberingListTypeTable();
TranslationTables.listNumberSeparatorTable = TranslationTables.createListNumberSeparatorTable();
TranslationTables.listNumberAlignmentTable = TranslationTables.createListNumberAlignmentTable();
TranslationTables.schemeColorTable = TranslationTables.createSchemeColorTable();
TranslationTables.systemColorTable = TranslationTables.createSystemColorTable();
TranslationTables.horizontalPositionTypeAttributeTable = TranslationTables.createHorizontalPositionTypeAttributeTable();
TranslationTables.verticalPositionTypeAttributeTable = TranslationTables.createVerticalPositionTypeAttributeTable();
