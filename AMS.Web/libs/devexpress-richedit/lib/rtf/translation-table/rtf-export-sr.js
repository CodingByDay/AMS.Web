import { MapCreator } from '../../base-utils/map-creator';
import { ThemeColorValues } from '../../core/model/color/enums';
import { ShadingPattern } from '../../core/model/shadings/shading-pattern';
export class RtfExportSR {
}
RtfExportSR.ShadingPatternTable = createShadingPatternTable();
RtfExportSR.RunShadingPatternTable = createRunShadingPatternTable();
RtfExportSR.TableCellShadingPatternTable = createTableCellShadingPatternTable();
RtfExportSR.TableStyleShadingPatternTable = createTableStyleShadingPatternTable();
RtfExportSR.ThemeColorValuesTable = createThemeColorValuesTable();
RtfExportSR.OpenGroup = "{";
RtfExportSR.CloseGroup = "}";
RtfExportSR.RtfSignature = "\\rtf1";
RtfExportSR.DefaultFontIndex = "\\deff";
RtfExportSR.StyleTable = "\\stylesheet";
RtfExportSR.ColorTable = "\\colortbl";
RtfExportSR.FontTable = "\\fonttbl";
RtfExportSR.FontCharset = "\\fcharset";
RtfExportSR.UserTable = "\\*\\protusertbl";
RtfExportSR.ColorSchemeMapping = "\\*\\colorschememapping";
RtfExportSR.ThemeData = "\\*\\themedata";
RtfExportSR.DocumentInformation = "\\info";
RtfExportSR.Password = "\\*\\password";
RtfExportSR.PasswordHash = "\\*\\passwordhash";
RtfExportSR.EnforceProtection = "\\enforceprot";
RtfExportSR.AnnotationProtection = "\\annotprot";
RtfExportSR.ReadOnlyProtection = "\\readprot";
RtfExportSR.ProtectionLevel = "\\protlevel";
RtfExportSR.NoUICompatible = "\\nouicompat";
RtfExportSR.UnicodeAndANSIGroup = "\\upr";
RtfExportSR.UnicodeGroup = "\\*\\ud";
RtfExportSR.Category = "\\*\\category";
RtfExportSR.Title = "\\title";
RtfExportSR.Subject = "\\subject";
RtfExportSR.Author = "\\author";
RtfExportSR.Keywords = "\\keywords";
RtfExportSR.Description = "\\doccomm";
RtfExportSR.LastModifiedBy = "\\operator";
RtfExportSR.Created = "\\creatim";
RtfExportSR.Modified = "\\revtim";
RtfExportSR.LastPrinted = "\\printim";
RtfExportSR.Revision = "\\version";
RtfExportSR.Year = "\\yr";
RtfExportSR.Month = "\\mo";
RtfExportSR.Day = "\\dy";
RtfExportSR.Hour = "\\hr";
RtfExportSR.Minute = "\\min";
RtfExportSR.CustomProperties = "\\*\\userprops";
RtfExportSR.CustomPropertyName = "\\propname";
RtfExportSR.CustomPropertyType = "\\proptype";
RtfExportSR.CustomPropertyLinkTarget = "\\linkval";
RtfExportSR.CustomPropertyValue = "\\staticval";
RtfExportSR.DefaultTabWidth = "\\deftab";
RtfExportSR.MirrorMargins = "\\margmirror";
RtfExportSR.HyphenateDocument = "\\hyphauto";
RtfExportSR.PageFacing = "\\facingp";
RtfExportSR.DisplayBackgroundShape = "\\viewbksp";
RtfExportSR.RemovePersonalInformation = "\\rempersonalinfo";
RtfExportSR.CompatibilityNoColumnBalance = "\\nocolbal";
RtfExportSR.CompatibilityDoNotAlignTableRowsIndependently = "\\alntblind";
RtfExportSR.CompatibilityDontJustifyLinesEndingInSoftLineBreak = "\\expshrtn";
RtfExportSR.CompatibilitySplitPageBreakAndParagraphMark = "\\spltpgpar";
RtfExportSR.CompatibilityAllowTablesToExtendIntoMargin = "\\nogrowautofit";
RtfExportSR.ColorRed = "\\red";
RtfExportSR.ColorGreen = "\\green";
RtfExportSR.ColorBlue = "\\blue";
RtfExportSR.ThemeColorTint = "\\ctint";
RtfExportSR.ThemeColorShade = "\\cshade";
RtfExportSR.ResetParagraphProperties = "\\pard";
RtfExportSR.FrameHorizontalPosition = "\\posx";
RtfExportSR.FrameVerticalPosition = "\\posy";
RtfExportSR.FrameNegativeHorizontalPosition = "\\posnegx";
RtfExportSR.FrameNegativeVerticalPosition = "\\posnegy";
RtfExportSR.FrameWidth = "\\absw";
RtfExportSR.FrameHeight = "\\absh";
RtfExportSR.FrameVerticalPadding = "\\dfrmtxty";
RtfExportSR.FrameHorizontalPadding = "\\dfrmtxtx";
RtfExportSR.FrameLockAnchor = "\\abslock";
RtfExportSR.FrameNoWrap = "\\nowrap";
RtfExportSR.FrameWrapOverlay = "\\overlay";
RtfExportSR.FrameWrapDefault = "\\wrapdefault";
RtfExportSR.FrameWrapAround = "\\wraparound";
RtfExportSR.FrameWrapTight = "\\wraptight";
RtfExportSR.FrameWrapThrough = "\\wrapthrough";
RtfExportSR.FrameHorizontalPositionAlignmentCenter = "\\posxc";
RtfExportSR.FrameHorizontalPositionAlignmentLeft = "\\posxl";
RtfExportSR.FrameHorizontalPositionAlignmentRight = "\\posxr";
RtfExportSR.FrameHorizontalPositionAlignmentInside = "\\posxi";
RtfExportSR.FrameHorizontalPositionAlignmentOutside = "\\posxo";
RtfExportSR.FrameVerticalPositionAlignmentCenter = "\\posyc";
RtfExportSR.FrameVerticalPositionAlignmentTop = "\\posyt";
RtfExportSR.FrameVerticalPositionAlignmentBottom = "\\posyb";
RtfExportSR.FrameVerticalPositionAlignmentInside = "\\posyin";
RtfExportSR.FrameVerticalPositionAlignmentOutside = "\\posyout";
RtfExportSR.TopParagraphBorder = "\\brdrt";
RtfExportSR.BottomParagraphBorder = "\\brdrb";
RtfExportSR.LeftParagraphBorder = "\\brdrl";
RtfExportSR.RightParagraphBorder = "\\brdrr";
RtfExportSR.BetweenParagraphBorder = "\\brdrbtw";
RtfExportSR.ParagraphHorizontalPositionTypeMargin = "\\phmrg";
RtfExportSR.ParagraphHorizontalPositionTypePage = "\\phpg";
RtfExportSR.ParagraphHorizontalPositionTypeColumn = "\\phcol";
RtfExportSR.ParagraphVerticalPositionTypeMargin = "\\pvmrg";
RtfExportSR.ParagraphVerticalPositionTypePage = "\\pvpg";
RtfExportSR.ParagraphVerticalPositionTypeLine = "\\pvpara";
RtfExportSR.ResetCharacterFormatting = "\\plain";
RtfExportSR.EndOfParagraph = "\\par";
RtfExportSR.LeftAlignment = "\\ql";
RtfExportSR.RightAlignment = "\\qr";
RtfExportSR.CenterAlignment = "\\qc";
RtfExportSR.JustifyAlignment = "\\qj";
RtfExportSR.FirstLineIndentInTwips = "\\fi";
RtfExportSR.LeftIndentInTwips = "\\li";
RtfExportSR.LeftIndentInTwips_Lin = "\\lin";
RtfExportSR.RightIndentInTwips = "\\ri";
RtfExportSR.RightIndentInTwips_Rin = "\\rin";
RtfExportSR.AutomaticParagraphHyphenation = "\\hyphpar";
RtfExportSR.SuppressLineNumbering = "\\noline";
RtfExportSR.ContextualSpacing = "\\contextualspace";
RtfExportSR.PageBreakBefore = "\\pagebb";
RtfExportSR.BeforeAutoSpacing = "\\sbauto";
RtfExportSR.AfterAutoSpacing = "\\saauto";
RtfExportSR.KeepWithNext = "\\keepn";
RtfExportSR.KeepLinesTogether = "\\keep";
RtfExportSR.WidowOrphanControlOn = "\\widctlpar";
RtfExportSR.WidowOrphanControlOff = "\\nowidctlpar";
RtfExportSR.OutlineLevel = "\\outlinelevel";
RtfExportSR.ParagraphShading = "\\shading";
RtfExportSR.ParagraphFillColor = "\\cfpat";
RtfExportSR.ParagraphBackgroundColor = "\\cbpat";
RtfExportSR.RtfLineSpacingValue = "\\sl";
RtfExportSR.RtfLineSpacingMultiple = "\\slmult";
RtfExportSR.SpaceBefore = "\\sb";
RtfExportSR.SpaceAfter = "\\sa";
RtfExportSR.ListIndex = "\\ls";
RtfExportSR.LevelIndex = "\\ilvl";
RtfExportSR.AlternativeText = "\\listtext";
RtfExportSR.ParagraphNumerationText = "\\*\\pntext";
RtfExportSR.CenteredTab = "\\tqc";
RtfExportSR.DecimalTab = "\\tqdec";
RtfExportSR.FlushRightTab = "\\tqr";
RtfExportSR.NumberingTab = "\\jclisttab";
RtfExportSR.TabLeaderDots = "\\tldot";
RtfExportSR.TabLeaderEqualSign = "\\tleq";
RtfExportSR.TabLeaderHyphens = "\\tlhyph";
RtfExportSR.TabLeaderMiddleDots = "\\tlmdot";
RtfExportSR.TabLeaderThickLine = "\\tlth";
RtfExportSR.TabLeaderUnderline = "\\tlul";
RtfExportSR.TabPosition = "\\tx";
RtfExportSR.AllCapitals = "\\caps";
RtfExportSR.SmallCapitals = "\\scaps";
RtfExportSR.LangInfo = "\\lang";
RtfExportSR.LangInfo1 = "\\langfe";
RtfExportSR.LangInfo2 = "\\langnp";
RtfExportSR.LangInfo3 = "\\langfenp";
RtfExportSR.NoProof = "\\noproof";
RtfExportSR.HiddenText = "\\v";
RtfExportSR.FontBold = "\\b";
RtfExportSR.FontItalic = "\\i";
RtfExportSR.FontStrikeout = "\\strike";
RtfExportSR.FontDoubleStrikeout = "\\striked1";
RtfExportSR.FontUnderline = "\\ul";
RtfExportSR.FontUnderlineDotted = "\\uld";
RtfExportSR.FontUnderlineDashed = "\\uldash";
RtfExportSR.FontUnderlineDashDotted = "\\uldashd";
RtfExportSR.FontUnderlineDashDotDotted = "\\uldashdd";
RtfExportSR.FontUnderlineDouble = "\\uldb";
RtfExportSR.FontUnderlineHeavyWave = "\\ulhwave";
RtfExportSR.FontUnderlineLongDashed = "\\ulldash";
RtfExportSR.FontUnderlineThickSingle = "\\ulth";
RtfExportSR.FontUnderlineThickDotted = "\\ulthd";
RtfExportSR.FontUnderlineThickDashed = "\\ulthdash";
RtfExportSR.FontUnderlineThickDashDotted = "\\ulthdashd";
RtfExportSR.FontUnderlineThickDashDotDotted = "\\ulthdashdd";
RtfExportSR.FontUnderlineThickLongDashed = "\\ulthldash";
RtfExportSR.FontUnderlineDoubleWave = "\\ululdbwave";
RtfExportSR.FontUnderlineWave = "\\ulwave";
RtfExportSR.FontUnderlineWordsOnly = "\\ulw";
RtfExportSR.FontNumber = "\\f";
RtfExportSR.FontSize = "\\fs";
RtfExportSR.RunShadingPattern = "\\chshdng";
RtfExportSR.RunFillColor = "\\chcfpat";
RtfExportSR.RunBackgroundColor = "\\chcbpat";
RtfExportSR.RunHighlightColor = "\\highlight";
RtfExportSR.RunForegroundColor = "\\cf";
RtfExportSR.RunUnderlineColor = "\\ulc";
RtfExportSR.RunSuperScript = "\\super";
RtfExportSR.RunSubScript = "\\sub";
RtfExportSR.Picture = "\\pict";
RtfExportSR.PictureWidth = "\\picw";
RtfExportSR.PictureHeight = "\\pich";
RtfExportSR.PictureDesiredWidth = "\\picwgoal";
RtfExportSR.PictureDesiredHeight = "\\pichgoal";
RtfExportSR.PictureScaleX = "\\picscalex";
RtfExportSR.PictureScaleY = "\\picscaley";
RtfExportSR.PictureCropLeft = "\\piccropl";
RtfExportSR.PictureCropTop = "\\piccropt";
RtfExportSR.PictureCropRight = "\\piccropr";
RtfExportSR.PictureCropBottom = "\\piccropb";
RtfExportSR.ShapePicture = "\\*\\shppict";
RtfExportSR.NonShapePicture = "\\nonshppict";
RtfExportSR.DxImageUri = "\\*\\dximageuri";
RtfExportSR.PictureProperties = "\\*\\picprop";
RtfExportSR.Defshp = "\\defshp";
RtfExportSR.PNGPictureKeyword = "\\pngblip";
RtfExportSR.JpegPictureKeyword = "\\jpegblip";
RtfExportSR.Space = " ";
RtfExportSR.CLRF = "\\r\\n";
RtfExportSR.ResetSectionProperties = "\\sectd";
RtfExportSR.SectionEndMark = "\\sect";
RtfExportSR.SectionMarginsLeft = "\\marglsxn";
RtfExportSR.SectionMarginsRight = "\\margrsxn";
RtfExportSR.SectionMarginsTop = "\\margtsxn";
RtfExportSR.SectionMarginsBottom = "\\margbsxn";
RtfExportSR.SectionMarginsHeaderOffset = "\\headery";
RtfExportSR.SectionMarginsFooterOffset = "\\footery";
RtfExportSR.SectionMarginsGutter = "\\guttersxn";
RtfExportSR.SectionFirstPageHeader = "\\headerf";
RtfExportSR.SectionOddPageHeader = "\\headerr";
RtfExportSR.SectionEvenPageHeader = "\\headerl";
RtfExportSR.SectionFirstPageFooter = "\\footerf";
RtfExportSR.SectionOddPageFooter = "\\footerr";
RtfExportSR.SectionEvenPageFooter = "\\footerl";
RtfExportSR.SectionPageWidth = "\\pgwsxn";
RtfExportSR.SectionPageHeight = "\\pghsxn";
RtfExportSR.SectionPageLandscape = "\\lndscpsxn";
RtfExportSR.PaperKind = "\\psz";
RtfExportSR.SectionFirstPagePaperSource = "\\binfsxn";
RtfExportSR.SectionOtherPagePaperSource = "\\binsxn";
RtfExportSR.SectionOnlyAllowEditingOfFormFields = "\\sectunlocked";
RtfExportSR.SectionTextFlow = "\\stextflow";
RtfExportSR.SectionTitlePage = "\\titlepg";
RtfExportSR.VerticalAlignmentBottom = "\\vertal\\vertalb";
RtfExportSR.VerticalAlignmentTop = "\\vertalt";
RtfExportSR.VerticalAlignmentCenter = "\\vertalc";
RtfExportSR.VerticalAlignmentJustify = "\\vertalj";
RtfExportSR.SectionBreakTypeNextPage = "\\sbkpage";
RtfExportSR.SectionBreakTypeOddPage = "\\sbkodd";
RtfExportSR.SectionBreakTypeEvenPage = "\\sbkeven";
RtfExportSR.SectionBreakTypeColumn = "\\sbkcol";
RtfExportSR.SectionBreakTypeContinuous = "\\sbknone";
RtfExportSR.SectionChapterSeparatorHyphen = "\\pgnhnsh";
RtfExportSR.SectionChapterSeparatorPeriod = "\\pgnhnsp";
RtfExportSR.SectionChapterSeparatorColon = "\\pgnhnsc";
RtfExportSR.SectionChapterSeparatorEmDash = "\\pgnhnsm";
RtfExportSR.SectionChapterSeparatorEnDash = "\\pgnhnsn";
RtfExportSR.SectionChapterHeaderStyle = "\\pgnhn";
RtfExportSR.SectionPageNumberingStart = "\\pgnstarts";
RtfExportSR.SectionPageNumberingContinuous = "\\pgncont";
RtfExportSR.SectionPageNumberingRestart = "\\pgnrestart";
RtfExportSR.SectionPageNumberingDecimal = "\\pgndec";
RtfExportSR.SectionPageNumberingUpperRoman = "\\pgnucrm";
RtfExportSR.SectionPageNumberingLowerRoman = "\\pgnlcrm";
RtfExportSR.SectionPageNumberingUpperLetter = "\\pgnucltr";
RtfExportSR.SectionPageNumberingLowerLetter = "\\pgnlcltr";
RtfExportSR.SectionPageNumberingArabicAbjad = "\\pgnbidia";
RtfExportSR.SectionPageNumberingArabicAlpha = "\\pgnbidib";
RtfExportSR.SectionPageNumberingChosung = "\\pgnchosung";
RtfExportSR.SectionPageNumberingDecimalEnclosedCircle = "\\pgncnum";
RtfExportSR.SectionPageNumberingDecimalFullWidth = "\\pgndecd";
RtfExportSR.SectionPageNumberingGanada = "\\pgnganada";
RtfExportSR.SectionPageNumberingHindiVowels = "\\pgnhindia";
RtfExportSR.SectionPageNumberingHindiConsonants = "\\pgnhindib";
RtfExportSR.SectionPageNumberingHindiNumbers = "\\pgnhindic";
RtfExportSR.SectionPageNumberingHindiDescriptive = "\\pgnhindid";
RtfExportSR.SectionPageNumberingThaiLetters = "\\pgnthaia";
RtfExportSR.SectionPageNumberingThaiNumbers = "\\pgnthaib";
RtfExportSR.SectionPageNumberingThaiDescriptive = "\\pgnthaic";
RtfExportSR.SectionPageNumberingVietnameseDescriptive = "\\pgnvieta";
RtfExportSR.SectionLineNumberingContinuous = "\\linecont";
RtfExportSR.SectionLineNumberingStart = "\\linestarts";
RtfExportSR.SectionLineNumberingRestartNewPage = "\\lineppage";
RtfExportSR.SectionLineNumberingRestartNewSection = "\\linerestart";
RtfExportSR.SectionLineNumberingCountBy = "\\linemod";
RtfExportSR.SectionLineNumberingDistance = "\\linex";
RtfExportSR.SectionColumnsCount = "\\cols";
RtfExportSR.SectionSpaceBetweenColumns = "\\colsx";
RtfExportSR.SectionColumnsDrawVerticalSeparator = "\\linebetcol";
RtfExportSR.SectionColumnNumber = "\\colno";
RtfExportSR.SectionColumnWidth = "\\colw";
RtfExportSR.SectionColumnSpace = "\\colsr";
RtfExportSR.SectionFootNotePlacementBelowText = "\\sftntj";
RtfExportSR.SectionFootNotePlacementPageBottom = "\\sftnbj";
RtfExportSR.SectionFootNoteNumberingStart = "\\sftnstart";
RtfExportSR.SectionFootNoteNumberingRestartEachPage = "\\sftnrstpg";
RtfExportSR.SectionFootNoteNumberingRestartEachSection = "\\sftnrestart";
RtfExportSR.SectionFootNoteNumberingRestartContinuous = "\\sftnrstcont";
RtfExportSR.SectionFootNoteNumberingFormatDecimal = "\\sftnnar";
RtfExportSR.SectionFootNoteNumberingFormatUpperRoman = "\\sftnnruc";
RtfExportSR.SectionFootNoteNumberingFormatLowerRoman = "\\sftnnrlc";
RtfExportSR.SectionFootNoteNumberingFormatUpperLetter = "\\sftnnauc";
RtfExportSR.SectionFootNoteNumberingFormatLowerLetter = "\\sftnnalc";
RtfExportSR.SectionFootNoteNumberingFormatChicago = "\\sftnnchi";
RtfExportSR.SectionFootNoteNumberingFormatChosung = "\\sftnnchosung";
RtfExportSR.SectionFootNoteNumberingFormatDecimalEnclosedCircle = "\\sftnncnum";
RtfExportSR.SectionFootNoteNumberingFormatDecimalFullWidth = "\\sftnndbar";
RtfExportSR.SectionFootNoteNumberingFormatGanada = "\\sftnnganada";
RtfExportSR.SectionEndNoteNumberingStart = "\\saftnstart";
RtfExportSR.SectionEndNoteNumberingRestartEachSection = "\\saftnrestart";
RtfExportSR.SectionEndNoteNumberingRestartContinuous = "\\saftnrstcont";
RtfExportSR.SectionEndNoteNumberingFormatDecimal = "\\saftnnar";
RtfExportSR.SectionEndNoteNumberingFormatUpperRoman = "\\saftnnruc";
RtfExportSR.SectionEndNoteNumberingFormatLowerRoman = "\\saftnnrlc";
RtfExportSR.SectionEndNoteNumberingFormatUpperLetter = "\\saftnnauc";
RtfExportSR.SectionEndNoteNumberingFormatLowerLetter = "\\saftnnalc";
RtfExportSR.SectionEndNoteNumberingFormatChicago = "\\saftnnchi";
RtfExportSR.SectionEndNoteNumberingFormatChosung = "\\saftnnchosung";
RtfExportSR.SectionEndNoteNumberingFormatDecimalEnclosedCircle = "\\saftnncnum";
RtfExportSR.SectionEndNoteNumberingFormatDecimalFullWidth = "\\saftnndbar";
RtfExportSR.SectionEndNoteNumberingFormatGanada = "\\saftnnganada";
RtfExportSR.LegacyPaperWidth = "\\paperw";
RtfExportSR.LegacyPaperHeight = "\\paperh";
RtfExportSR.LegacyLandscape = "\\landscape";
RtfExportSR.LegacyPageNumberingStart = "\\pgnstart";
RtfExportSR.LegacyMarginsLeft = "\\margl";
RtfExportSR.LegacyMarginsRight = "\\margr";
RtfExportSR.LegacyMarginsTop = "\\margt";
RtfExportSR.LegacyMarginsBottom = "\\margb";
RtfExportSR.LegacyMarginsGutter = "\\gutter";
RtfExportSR.LegacyMarginsGutterAtRight = "\\rtlgutter";
RtfExportSR.FootNotePlacementBelowText = "\\ftntj";
RtfExportSR.FootNotePlacementPageBottom = "\\ftnbj";
RtfExportSR.FootNoteNumberingStart = "\\ftnstart";
RtfExportSR.FootNoteNumberingRestartEachPage = "\\ftnrstpg";
RtfExportSR.FootNoteNumberingRestartEachSection = "\\ftnrestart";
RtfExportSR.FootNoteNumberingRestartContinuous = "\\ftnrstcont";
RtfExportSR.FootNoteNumberingFormatDecimal = "\\ftnnar";
RtfExportSR.FootNoteNumberingFormatUpperRoman = "\\ftnnruc";
RtfExportSR.FootNoteNumberingFormatLowerRoman = "\\ftnnrlc";
RtfExportSR.FootNoteNumberingFormatUpperLetter = "\\ftnnauc";
RtfExportSR.FootNoteNumberingFormatLowerLetter = "\\ftnnalc";
RtfExportSR.FootNoteNumberingFormatChicago = "\\ftnnchi";
RtfExportSR.FootNoteNumberingFormatChosung = "\\ftnnchosung";
RtfExportSR.FootNoteNumberingFormatDecimalEnclosedCircle = "\\ftnncnum";
RtfExportSR.FootNoteNumberingFormatDecimalFullWidth = "\\ftnndbar";
RtfExportSR.FootNoteNumberingFormatGanada = "\\ftnnganada";
RtfExportSR.EndNotePlacementEndOfSection = "\\aendnotes";
RtfExportSR.EndNotePlacementEndOfDocument = "\\aenddoc";
RtfExportSR.EndNoteNumberingStart = "\\aftnstart";
RtfExportSR.EndNoteNumberingRestartEachSection = "\\aftnrestart";
RtfExportSR.EndNoteNumberingRestartContinuous = "\\aftnrstcont";
RtfExportSR.EndNoteNumberingFormatDecimal = "\\aftnnar";
RtfExportSR.EndNoteNumberingFormatUpperRoman = "\\aftnnruc";
RtfExportSR.EndNoteNumberingFormatLowerRoman = "\\aftnnrlc";
RtfExportSR.EndNoteNumberingFormatUpperLetter = "\\aftnnauc";
RtfExportSR.EndNoteNumberingFormatLowerLetter = "\\aftnnalc";
RtfExportSR.EndNoteNumberingFormatChicago = "\\aftnnchi";
RtfExportSR.EndNoteNumberingFormatChosung = "\\aftnnchosung";
RtfExportSR.EndNoteNumberingFormatDecimalEnclosedCircle = "\\aftnncnum";
RtfExportSR.EndNoteNumberingFormatDecimalFullWidth = "\\aftnndbar";
RtfExportSR.EndNoteNumberingFormatGanada = "\\aftnnganada";
RtfExportSR.Field = "\\field";
RtfExportSR.FieldLocked = "\\fldlock";
RtfExportSR.FieldInstructions = "\\*\\fldinst";
RtfExportSR.FieldResult = "\\fldrslt";
RtfExportSR.FieldCodeView = "\\dxfldcodeview";
RtfExportSR.FieldEdit = "\\fldedit";
RtfExportSR.FormField = "\\*\\formfield";
RtfExportSR.FormFieldType = "\\fftype";
RtfExportSR.FormFieldListFieldResult = "\\ffres";
RtfExportSR.FormFieldProtected = "\\ffprot";
RtfExportSR.FormFieldCheckBoxFieldSizeType = "\\ffsize";
RtfExportSR.FormFieldCalculatedOnExit = "\\ffrecalc";
RtfExportSR.FormFieldCheckBoxFieldSize = "\\ffhps";
RtfExportSR.FormFieldName = "\\*\\ffname";
RtfExportSR.FormFieldListFieldDefault = "\\ffdefres";
RtfExportSR.FormFieldHelpTextCustom = "\\ffownhelp";
RtfExportSR.FormFieldHelpText = "\\*\\ffhelptext";
RtfExportSR.FormFieldStatusBarTextCustom = "\\ffownstat";
RtfExportSR.FormFieldStatusBarText = "\\*\\ffstattext";
RtfExportSR.FormFieldEntryMacro = "\\*\\ffentrymcr";
RtfExportSR.FormFieldExitMacro = "\\*\\ffexitmcr";
RtfExportSR.FieldMapData = "\\*\\mmodsofldmpdata";
RtfExportSR.FieldTypeNull = "\\mmfttypenull";
RtfExportSR.FieldTypeColumn = "\\mmfttypedbcolumn";
RtfExportSR.FieldTypeAddress = "\\mmfttypeaddress";
RtfExportSR.FieldTypeSalutation = "\\mmfttypesalutation";
RtfExportSR.FieldTypeMapped = "\\mmfttypemapped";
RtfExportSR.FieldTypeBarcode = "\\mmfttypebarcode";
RtfExportSR.MailMergeDataSourceObjectName = "\\mmodsoname";
RtfExportSR.MailMergeDataSourceObjectMappedName = "\\mmodsomappedname";
RtfExportSR.MailMergeDataSourceObjectColumnIndex = "\\mmodsofmcolumn";
RtfExportSR.MailMergeDataSourceObjectDynamicAddress = "\\mmodsodynaddr";
RtfExportSR.MailMergeDataSourceObjectLanguageId = "\\mmodsolid";
RtfExportSR.BookmarkStart = "\\*\\bkmkstart";
RtfExportSR.BookmarkEnd = "\\*\\bkmkend";
RtfExportSR.RangePermissionStart = "\\*\\protstart";
RtfExportSR.RangePermissionEnd = "\\*\\protend";
RtfExportSR.CommentStart = "\\*\\atrfstart";
RtfExportSR.CommentEnd = "\\*\\atrfend";
RtfExportSR.CommentId = "\\*\\atnid";
RtfExportSR.CommentAuthor = "\\*\\atnauthor";
RtfExportSR.CommentTime = "\\*\\atntime";
RtfExportSR.CommentChatn = "\\chatn";
RtfExportSR.CommentAnnotation = "\\*\\annotation";
RtfExportSR.CommentDate = "\\*\\atndate";
RtfExportSR.CommentRef = "\\*\\atnref";
RtfExportSR.CommentParent = "\\*\\atnparent";
RtfExportSR.HyperlinkFieldType = "HYPERLINK";
RtfExportSR.DocumentVariable = "\\*\\docvar";
RtfExportSR.FootNote = "\\footnote";
RtfExportSR.FootNoteReference = "\\chftn";
RtfExportSR.EndNote = "\\ftnalt";
RtfExportSR.PageBackground = "\\*\\background";
RtfExportSR.Shape = "\\shp";
RtfExportSR.ShapeInstance = "\\*\\shpinst";
RtfExportSR.ShapeText = "\\shptxt";
RtfExportSR.ShapeLeft = "\\shpleft";
RtfExportSR.ShapeRight = "\\shpright";
RtfExportSR.ShapeTop = "\\shptop";
RtfExportSR.ShapeBottom = "\\shpbottom";
RtfExportSR.ShapeZOrder = "\\shpz";
RtfExportSR.ShapeLegacyHorizontalPositionTypePage = "\\shpbxpage";
RtfExportSR.ShapeLegacyHorizontalPositionTypeMargin = "\\shpbxmargin";
RtfExportSR.ShapeLegacyHorizontalPositionTypeColumn = "\\shpbxcolumn";
RtfExportSR.ShapeIgnoreLegacyHorizontalPositionType = "\\shpbxignore";
RtfExportSR.ShapeLegacyVerticalPositionTypePage = "\\shpbypage";
RtfExportSR.ShapeLegacyVerticalPositionTypeMargin = "\\shpbymargin";
RtfExportSR.ShapeLegacyVerticalPositionTypeParagraph = "\\shpbypara";
RtfExportSR.ShapeIgnoreLegacyVerticalPositionType = "\\shpbyignore";
RtfExportSR.ShapeWrapTextType = "\\shpwr";
RtfExportSR.ShapeWrapTextTypeZOrder = "\\shpfblwtxt";
RtfExportSR.ShapeWrapTextSide = "\\shpwrk";
RtfExportSR.ShapeLocked = "\\shplockanchor";
RtfExportSR.ShapeProperty = "\\sp";
RtfExportSR.ShapePropertyName = "\\sn";
RtfExportSR.ShapePropertyValue = "\\sv";
RtfExportSR.ShapeResult = "\\shprslt";
RtfExportSR.ShapeDoNotLay = "\\splytwnine";
RtfExportSR.ShapeHyperlink = "\\*\\hl";
RtfExportSR.ShapeHyperlinkFrame = "\\hlfr";
RtfExportSR.ShapeHyperlinkSource = "\\hlsrc";
RtfExportSR.ShapeHyperlinkLocation = "\\hlloc";
RtfExportSR.HtmlAutoSpacing = "\\htmautsp";
RtfExportSR.CustomRunData = "\\*\\dxcustomrundata";
RtfExportSR.ParagraphGroupPropertiesTable = "\\*\\pgptbl";
RtfExportSR.ParagraphGroupProperties = "\\pgp";
RtfExportSR.ParagraphGroupPropertiesId = "\\ipgp";
RtfExportSR.ResetTableProperties = "\\trowd";
RtfExportSR.InTableParagraph = "\\intbl";
RtfExportSR.TableEndCell = "\\cell";
RtfExportSR.NestedTableEndCell = "\\nestcell";
RtfExportSR.TableEndRow = "\\row";
RtfExportSR.NestedTableEndRow = "\\nestrow";
RtfExportSR.NestedTableProperties = "\\*\\nesttableprops";
RtfExportSR.NoNestedTable = "\\nonesttables";
RtfExportSR.ParagraphNestingLevel = "\\itap";
RtfExportSR.TableCellRight = "\\cellx";
RtfExportSR.TableCellPreferredWidth = "\\clwWidth";
RtfExportSR.TableCellPreferredWidthType = "\\clftsWidth";
RtfExportSR.TableCellBottomMargin = "\\clpadb";
RtfExportSR.TableCellLeftMargin = "\\clpadl";
RtfExportSR.TableCellRightMargin = "\\clpadr";
RtfExportSR.TableCellTopMargin = "\\clpadt";
RtfExportSR.TableCellBottomMarginType = "\\clpadfb";
RtfExportSR.TableCellLeftMarginType = "\\clpadfl";
RtfExportSR.TableCellRightMarginType = "\\clpadfr";
RtfExportSR.TableCellTopMarginType = "\\clpadft";
RtfExportSR.TableRowIndex = "\\irow";
RtfExportSR.TableRowBandIndex = "\\irowband";
RtfExportSR.TableRowLeftAlignment = "\\trql";
RtfExportSR.TableRowRightAlignment = "\\trqr";
RtfExportSR.TableRowCenterAlignment = "\\trqc";
RtfExportSR.TableIndent = "\\tblind";
RtfExportSR.TableIndentType = "\\tblindtype";
RtfExportSR.TableCellBottomBorder = "\\clbrdrb";
RtfExportSR.TableCellTopBorder = "\\clbrdrt";
RtfExportSR.TableCellLeftBorder = "\\clbrdrl";
RtfExportSR.TableCellRightBorder = "\\clbrdrr";
RtfExportSR.TableCellUpperLeftToLowerRightBorder = "\\cldglu";
RtfExportSR.TableCellUpperRightToLowerLeftBorder = "\\cldgll";
RtfExportSR.TableCellStartHorizontalMerging = "\\clmgf";
RtfExportSR.TableCellContinueHorizontalMerging = "\\clmrg";
RtfExportSR.TableCellStartVerticalMerging = "\\clvmgf";
RtfExportSR.TableCellContinueVerticalMerging = "\\clvmrg";
RtfExportSR.TableCellTextTopAlignment = "\\clvertalt";
RtfExportSR.TableCellTextCenterAlignment = "\\clvertalc";
RtfExportSR.TableCellTextBottomAlignment = "\\clvertalb";
RtfExportSR.TableCellLeftToRightTopToBottomTextDirection = "\\cltxlrtb";
RtfExportSR.TableCellTopToBottomRightToLeftTextDirection = "\\cltxtbrl";
RtfExportSR.TableCellBottomToTopLeftToRightTextDirection = "\\cltxbtlr";
RtfExportSR.TableCellLeftToRightTopToBottomVerticalTextDirection = "\\cltxlrtbv";
RtfExportSR.TableCellTopToBottomRightToLeftVerticalTextDirection = "\\cltxtbrlv";
RtfExportSR.TableCellFitText = "\\clFitText";
RtfExportSR.TableCellNoWrap = "\\clNoWrap";
RtfExportSR.TableCellHideMark = "\\clhidemark";
RtfExportSR.TableCellBackgroundColor = "\\clcbpat";
RtfExportSR.TableCellForegroundColor = "\\clcfpat";
RtfExportSR.TableCellShading = "\\clshdng";
RtfExportSR.TableTopBorder = "\\trbrdrt";
RtfExportSR.TableLeftBorder = "\\trbrdrl";
RtfExportSR.TableBottomBorder = "\\trbrdrb";
RtfExportSR.TableRightBorder = "\\trbrdrr";
RtfExportSR.TableHorizontalBorder = "\\trbrdrh";
RtfExportSR.TableVerticalBorder = "\\trbrdrv";
RtfExportSR.TableRowBackgroundColor = "\\trcbpat";
RtfExportSR.TableRowForegroundColor = "\\trcfpat";
RtfExportSR.TableRowShading = "\\trshdng";
RtfExportSR.TableRowHorizontalAnchorColumn = "\\tphcol";
RtfExportSR.TableRowHorizontalAnchorMargin = "\\tphmrg";
RtfExportSR.TableRowHorizontalAnchorPage = "\\tphpg";
RtfExportSR.TableRowVerticalAnchorMargin = "\\tpvmrg";
RtfExportSR.TableRowVerticalAnchorParagraph = "\\tpvpara";
RtfExportSR.TableRowVerticalAnchorPage = "\\tpvpg";
RtfExportSR.TableRowHorizontalAlignCenter = "\\tposxc";
RtfExportSR.TableRowHorizontalAlignInside = "\\tposxi";
RtfExportSR.TableRowHorizontalAlignLeft = "\\tposxl";
RtfExportSR.TableRowHorizontalAlignOutside = "\\tposxo";
RtfExportSR.TableRowHorizontalAlignRight = "\\tposxr";
RtfExportSR.TableRowHorizontalPosition = "\\tposx";
RtfExportSR.TableRowHorizontalPositionNeg = "\\tposnegx";
RtfExportSR.TableRowVerticalAlignBottom = "\\tposyb";
RtfExportSR.TableRowVerticalAlignCenter = "\\tposyc";
RtfExportSR.TableRowVerticalAlignInline = "\\tposyil";
RtfExportSR.TableRowVerticalAlignInside = "\\tposyin";
RtfExportSR.TableRowVerticalAlignOutside = "\\tposyout";
RtfExportSR.TableRowVerticalAlignTop = "\\tposyt";
RtfExportSR.TableRowVerticalPosition = "\\tposy";
RtfExportSR.TableRowVerticalPositionNeg = "\\tposnegy";
RtfExportSR.TableRowLeftFromText = "\\tdfrmtxtLeft";
RtfExportSR.TableRowBottomFromText = "\\tdfrmtxtBottom";
RtfExportSR.TableRowRightFromText = "\\tdfrmtxtRight";
RtfExportSR.TableRowTopFromText = "\\tdfrmtxtTop";
RtfExportSR.TableNoOverlap = "\\tabsnoovrlp";
RtfExportSR.TableHalfSpaceBetweenCells = "\\trgaph";
RtfExportSR.TableRowLeft = "\\trleft";
RtfExportSR.TableRowHeight = "\\trrh";
RtfExportSR.TableRowHeader = "\\trhdr";
RtfExportSR.TableRowCantSplit = "\\trkeep";
RtfExportSR.TablePreferredWidth = "\\trwWidth";
RtfExportSR.TablePreferredWidthType = "\\trftsWidth";
RtfExportSR.TableRowWidthBefore = "\\trwWidthB";
RtfExportSR.TableRowWidthBeforeType = "\\trftsWidthB";
RtfExportSR.TableRowWidthAfter = "\\trwWidthA";
RtfExportSR.TableRowWidthAfterType = "\\trftsWidthA";
RtfExportSR.TableLayout = "\\trautofit";
RtfExportSR.TableCellSpacingBottom = "\\trspdb";
RtfExportSR.TableCellSpacingLeft = "\\trspdl";
RtfExportSR.TableCellSpacingRight = "\\trspdr";
RtfExportSR.TableCellSpacingTop = "\\trspdt";
RtfExportSR.TableCellSpacingBottomType = "\\trspdfb";
RtfExportSR.TableCellSpacingLeftType = "\\trspdfl";
RtfExportSR.TableCellSpacingRightType = "\\trspdfr";
RtfExportSR.TableCellSpacingTopType = "\\trspdft";
RtfExportSR.TableCellMarginsBottom = "\\trpaddb";
RtfExportSR.TableCellMarginsLeft = "\\trpaddl";
RtfExportSR.TableCellMarginsRight = "\\trpaddr";
RtfExportSR.TableCellMarginsTop = "\\trpaddt";
RtfExportSR.TableCellMarginsBottomType = "\\trpaddfb";
RtfExportSR.TableCellMarginsLeftType = "\\trpaddfl";
RtfExportSR.TableCellMarginsRightType = "\\trpaddfr";
RtfExportSR.TableCellMarginsTopType = "\\trpaddft";
RtfExportSR.TableApplyFirstRow = "\\tbllkhdrrows";
RtfExportSR.TableApplyLastRow = "\\tbllklastrow";
RtfExportSR.TableApplyFirstColumn = "\\tbllkhdrcols";
RtfExportSR.TableApplyLastColumn = "\\tbllklastcol";
RtfExportSR.TableDoNotApplyRowBanding = "\\tbllknorowband";
RtfExportSR.TableDoNotApplyColumnBanding = "\\tbllknocolband";
RtfExportSR.TableLastRow = "\\lastrow";
RtfExportSR.TableStyleResetTableProperties = "\\tsrowd";
RtfExportSR.TableStyleCellVerticalAlignmentTop = "\\tsvertalt";
RtfExportSR.TableStyleCellVerticalAlignmentCenter = "\\tsvertalc";
RtfExportSR.TableStyleCellVerticalAlignmentBottom = "\\tsvertalb";
RtfExportSR.TableStyleRowBandSize = "\\tscbandsh";
RtfExportSR.TableStyleColumnBandSize = "\\tscbandsv";
RtfExportSR.TableStyleCellBackgroundColor = "\\tscellcbpat";
RtfExportSR.TableStyleCellForegroundColor = "\\tscellcfpat";
RtfExportSR.TableStyleCellShading = "\\tscellpct";
RtfExportSR.TableStyleTopCellBorder = "\\tsbrdrt";
RtfExportSR.TableStyleLeftCellBorder = "\\tsbrdrl";
RtfExportSR.TableStyleBottomCellBorder = "\\tsbrdrb";
RtfExportSR.TableStyleRightCellBorder = "\\tsbrdrr";
RtfExportSR.TableStyleHorizontalCellBorder = "\\tsbrdrh";
RtfExportSR.TableStyleVerticalCellBorder = "\\tsbrdrv";
RtfExportSR.TableStyleCellNoWrap = "\\tsnowrap";
RtfExportSR.TableStyleTableBottomCellMargin = "\\tscellpaddb";
RtfExportSR.TableStyleTableLeftCellMargin = "\\tscellpaddl";
RtfExportSR.TableStyleTableRightCellMargin = "\\tscellpaddr";
RtfExportSR.TableStyleTableTopCellMargin = "\\tscellpaddt";
RtfExportSR.TableStyleTableBottomCellMarginUnitType = "\\tscellpaddfb";
RtfExportSR.TableStyleTableLeftCellMarginUnitType = "\\tscellpaddfl";
RtfExportSR.TableStyleTableRightCellMarginUnitType = "\\tscellpaddfr";
RtfExportSR.TableStyleTableTopCellMarginUnitType = "\\tscellpaddft";
RtfExportSR.TableStyleUpperLeftToLowerRightBorder = "\\tsbrdrdgl";
RtfExportSR.TableStyleUpperRightToLowerLeftBorder = "\\tsbrdrdgr";
RtfExportSR.TableConditionalStyleFirstRow = "\\tscfirstrow";
RtfExportSR.TableConditionalStyleLastRow = "\\tsclastrow";
RtfExportSR.TableConditionalStyleFirstColumn = "\\tscfirstcol";
RtfExportSR.TableConditionalStyleLastColumn = "\\tsclastcol";
RtfExportSR.TableConditionalStyleOddRowBanding = "\\tscbandhorzodd";
RtfExportSR.TableConditionalStyleEvenRowBanding = "\\tscbandhorzeven";
RtfExportSR.TableConditionalStyleOddColumnBanding = "\\tscbandvertodd";
RtfExportSR.TableConditionalStyleEvenColumnBanding = "\\tscbandverteven";
RtfExportSR.TableConditionalStyleTopLeftCell = "\\tscnwcell";
RtfExportSR.TableConditionalStyleTopRightCell = "\\tscnecell";
RtfExportSR.TableConditionalStyleBottomLeftCell = "\\tscswcell";
RtfExportSR.TableConditionalStyleBottomRightCell = "\\tscsecell";
RtfExportSR.NoTableBorder = "\\brdrtbl";
RtfExportSR.NoBorder = "\\brdrnil";
RtfExportSR.BorderWidth = "\\brdrw";
RtfExportSR.BorderColor = "\\brdrcf";
RtfExportSR.BorderFrame = "\\brdrframe";
RtfExportSR.BorderSpace = "\\brsp";
RtfExportSR.BorderArtIndex = "\\brdrart";
RtfExportSR.BorderSingleWidth = "\\brdrs";
RtfExportSR.BorderDoubleWidth = "\\brdrth";
RtfExportSR.BorderShadow = "\\brdrsh";
RtfExportSR.BorderDouble = "\\brdrdb";
RtfExportSR.BorderDotted = "\\brdrdot";
RtfExportSR.BorderDashed = "\\brdrdash";
RtfExportSR.BorderSingle = "\\brdrhair";
RtfExportSR.BorderDashedSmall = "\\brdrdashsm";
RtfExportSR.BorderDotDashed = "\\brdrdashd";
RtfExportSR.BorderDotDotDashed = "\\brdrdashdd";
RtfExportSR.BorderInset = "\\brdrinset";
RtfExportSR.BorderNone = "\\brdrnone";
RtfExportSR.BorderOutset = "\\brdroutset";
RtfExportSR.BorderTriple = "\\brdrtriple";
RtfExportSR.BorderThickThinSmall = "\\brdrthtnsg";
RtfExportSR.BorderThinThickSmall = "\\brdrtnthsg";
RtfExportSR.BorderThinThickThinSmall = "\\brdrtnthtnsg";
RtfExportSR.BorderThickThinMedium = "\\brdrthtnmg";
RtfExportSR.BorderThinThickMedium = "\\brdrtnthmg";
RtfExportSR.BorderThinThickThinMedium = "\\brdrtnthtnmg";
RtfExportSR.BorderThickThinLarge = "\\brdrthtnlg";
RtfExportSR.BorderThinThickLarge = "\\brdrtnthlg";
RtfExportSR.BorderThinThickThinLarge = "\\brdrtnthtnlg";
RtfExportSR.BorderWavy = "\\brdrwavy";
RtfExportSR.BorderDoubleWavy = "\\brdrwavydb";
RtfExportSR.BorderDashDotStroked = "\\brdrdashdotstr";
RtfExportSR.BorderThreeDEmboss = "\\brdremboss";
RtfExportSR.BorderThreeDEngrave = "\\brdrengrave";
RtfExportSR.NumberingListTable = "\\*\\listtable";
RtfExportSR.ListOverrideTable = "\\*\\listoverridetable";
RtfExportSR.NumberingList = "\\list";
RtfExportSR.NumberingListId = "\\listid";
RtfExportSR.NumberingListTemplateId = "\\listtemplateid";
RtfExportSR.NumberingListStyleId = "\\liststyleid";
RtfExportSR.NumberingListStyleName = "\\*\\liststylename ";
RtfExportSR.NumberingListName = "\\listname ;";
RtfExportSR.NumberingListHybrid = "\\listhybrid";
RtfExportSR.ListLevel = "\\listlevel";
RtfExportSR.ListLevelStart = "\\levelstartat";
RtfExportSR.ListLevelTentative = "\\lvltentative";
RtfExportSR.ListLevelNumberingFormat = "\\levelnfc";
RtfExportSR.ListLevelAlignment = "\\leveljc";
RtfExportSR.ListLevelNumberingFormatN = "\\levelnfcn";
RtfExportSR.ListLevelAlignmentN = "\\leveljcn";
RtfExportSR.LisLeveltOld = "\\levelold";
RtfExportSR.ListLevelPrev = "\\levelprev";
RtfExportSR.ListLevelPrevSpase = "\\levelprevspace";
RtfExportSR.ListLevelSpace = "\\levelspace";
RtfExportSR.ListLevelIntdent = "\\levelindent";
RtfExportSR.ListLevelNumbers = "\\levelnumbers";
RtfExportSR.ListLevelText = "\\leveltext";
RtfExportSR.LevelTemplateId = "\\leveltemplateid";
RtfExportSR.ListLevelFollow = "\\levelfollow";
RtfExportSR.ListLevelLegal = "\\levellegal";
RtfExportSR.ListLevelNoRestart = "\\levelnorestart";
RtfExportSR.ListLevelPicture = "\\levelpicture";
RtfExportSR.ListLevelPictureNoSize = "\\levelpicturenosize";
RtfExportSR.ListLevelLegacy = "\\levelold";
RtfExportSR.ListLevelLegacySpace = "\\levelspace";
RtfExportSR.ListLevelLegacyIndent = "\\levelindent";
RtfExportSR.ListOverride = "\\listoverride";
RtfExportSR.ListOverrideListId = "\\listid";
RtfExportSR.ListOverrideCount = "\\listoverridecount";
RtfExportSR.ListOverrideLevel = "\\lfolevel";
RtfExportSR.ListOverrideFormat = "\\listoverrideformat";
RtfExportSR.ListOverrideStart = "\\listoverridestartat";
RtfExportSR.ListOverrideStartValue = "\\levelstartat";
RtfExportSR.ListOverrideListLevel = "\\listlevel";
RtfExportSR.DefaultCharacterProperties = "\\*\\defchp";
RtfExportSR.DefaultParagraphProperties = "\\*\\defpap";
RtfExportSR.StyleSheet = "\\stylesheet";
RtfExportSR.ParagraphStyle = "\\s";
RtfExportSR.CharacterStyle = "\\*\\cs";
RtfExportSR.CharacterStyleIndex = "\\cs";
RtfExportSR.TableStyle = "\\*\\ts";
RtfExportSR.TableStyleIndex = "\\ts";
RtfExportSR.TableStyleCellIndex = "\\yts";
RtfExportSR.ParentStyle = "\\sbasedon";
RtfExportSR.LinkedStyle = "\\slink";
RtfExportSR.NextStyle = "\\snext";
RtfExportSR.QuickFormatStyle = "\\sqformat";
RtfExportSR.RTLRun = "\\rtlch";
RtfExportSR.LTRRun = "\\ltrch";
RtfExportSR.RLTParagraph = "\\rtlpar";
RtfExportSR.LTRParagraph = "\\ltrpar";
RtfExportSR.RTLRow = "\\rtlrow";
RtfExportSR.LTRRow = "\\ltrrow";
RtfExportSR.RTLSection = "\\rtlsect";
RtfExportSR.LTRSection = "\\ltrsect";
function createShadingPatternTable() {
    return new MapCreator()
        .add(ShadingPattern.ThinHorzStripe, "\\bghoriz")
        .add(ShadingPattern.ThinVertStripe, "\\bgvert")
        .add(ShadingPattern.ThinReverseDiagStripe, "\\bgfdiag")
        .add(ShadingPattern.ThinDiagStripe, "\\bgbdiag")
        .add(ShadingPattern.ThinHorzCross, "\\bgcross")
        .add(ShadingPattern.ThinDiagCross, "\\bgdcross")
        .add(ShadingPattern.HorzStripe, "\\bgdkhoriz")
        .add(ShadingPattern.VertStripe, "\\bgdkvert")
        .add(ShadingPattern.ReverseDiagStripe, "\\bgdkfdiag")
        .add(ShadingPattern.DiagStripe, "\\bgdkbdiag")
        .add(ShadingPattern.HorzCross, "\\bgdkcross")
        .add(ShadingPattern.DiagCross, "\\bgdkdcross")
        .get();
}
function createRunShadingPatternTable() {
    return new MapCreator()
        .add(ShadingPattern.ThinHorzStripe, "\\chbghoriz")
        .add(ShadingPattern.ThinVertStripe, "\\chbgvert")
        .add(ShadingPattern.ThinReverseDiagStripe, "\\chbgfdiag")
        .add(ShadingPattern.ThinDiagStripe, "\\chbgbdiag")
        .add(ShadingPattern.ThinHorzCross, "\\chbgcross")
        .add(ShadingPattern.ThinDiagCross, "\\chbgdcross")
        .add(ShadingPattern.HorzStripe, "\\chbgdkhoriz")
        .add(ShadingPattern.VertStripe, "\\chbgdkvert")
        .add(ShadingPattern.ReverseDiagStripe, "\\chbgdkfdiag")
        .add(ShadingPattern.DiagStripe, "\\chbgdkbdiag")
        .add(ShadingPattern.HorzCross, "\\chbgdkcross")
        .add(ShadingPattern.DiagCross, "\\chbgdkdcross")
        .get();
}
function createTableCellShadingPatternTable() {
    return new MapCreator()
        .add(ShadingPattern.ThinHorzStripe, "\\clbghoriz")
        .add(ShadingPattern.ThinVertStripe, "\\clbgvert")
        .add(ShadingPattern.ThinReverseDiagStripe, "\\clbgfdiag")
        .add(ShadingPattern.ThinDiagStripe, "\\clbgbdiag")
        .add(ShadingPattern.ThinHorzCross, "\\clbgcross")
        .add(ShadingPattern.ThinDiagCross, "\\clbgdcross")
        .add(ShadingPattern.HorzStripe, "\\clbgdkhor")
        .add(ShadingPattern.VertStripe, "\\clbgdkvert")
        .add(ShadingPattern.ReverseDiagStripe, "\\clbgdkfdiag")
        .add(ShadingPattern.DiagStripe, "\\clbgdkbdiag")
        .add(ShadingPattern.HorzCross, "\\clbgdkcross")
        .add(ShadingPattern.DiagCross, "\\clbgdkdcross")
        .get();
}
function createTableStyleShadingPatternTable() {
    return new MapCreator()
        .add(ShadingPattern.ThinHorzStripe, "\\tsbghoriz")
        .add(ShadingPattern.ThinVertStripe, "\\tsbgvert")
        .add(ShadingPattern.ThinReverseDiagStripe, "\\tsbgfdiag")
        .add(ShadingPattern.ThinDiagStripe, "\\tsbgbdiag")
        .add(ShadingPattern.ThinHorzCross, "\\tsbgcross")
        .add(ShadingPattern.ThinDiagCross, "\\tsbgdcross")
        .add(ShadingPattern.HorzStripe, "\\tsbgdkhor")
        .add(ShadingPattern.VertStripe, "\\tsbgdkvert")
        .add(ShadingPattern.ReverseDiagStripe, "\\tsbgdkfdiag")
        .add(ShadingPattern.DiagStripe, "\\tsbgdkbdiag")
        .add(ShadingPattern.HorzCross, "\\tsbgdkcross")
        .add(ShadingPattern.DiagCross, "\\tsbgdkdcross")
        .get();
}
function createThemeColorValuesTable() {
    return new MapCreator()
        .add(ThemeColorValues.Dark1, "\\cmaindarkone")
        .add(ThemeColorValues.Light1, "\\cmainlightone")
        .add(ThemeColorValues.Dark2, "\\cmaindarktwo")
        .add(ThemeColorValues.Light2, "\\cmainlighttwo")
        .add(ThemeColorValues.Accent1, "\\caccentone")
        .add(ThemeColorValues.Accent2, "\\caccenttwo")
        .add(ThemeColorValues.Accent3, "\\caccentthree")
        .add(ThemeColorValues.Accent4, "\\caccentfour")
        .add(ThemeColorValues.Accent5, "\\caccentfive")
        .add(ThemeColorValues.Accent6, "\\caccentsix")
        .add(ThemeColorValues.Hyperlink, "\\chyperlink")
        .add(ThemeColorValues.FollowedHyperlink, "\\cfollowedhyperlink")
        .add(ThemeColorValues.Background1, "\\cbackgroundone")
        .add(ThemeColorValues.Text1, "\\ctextone")
        .add(ThemeColorValues.Background2, "\\cbackgroundtwo")
        .add(ThemeColorValues.Text2, "\\ctexttwo")
        .get();
}
