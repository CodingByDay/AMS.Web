import { MapCreator } from '../../../base-utils/map-creator';
import { DestinationOldParagraphNumberingBase } from '../destination/numbering-list/destination-old-paragraph-numbering-base';
import { DestinationSubDocument } from '../destination/sub-document/destination-sub-document';
export const paragraphNumberingDescKeywords = new MapCreator()
    .add("pncard", DestinationOldParagraphNumberingBase.onCardinalKeyword)
    .add("pndec", DestinationOldParagraphNumberingBase.onDecimalKeyword)
    .add("pnucltr", DestinationOldParagraphNumberingBase.onUpperCaseAlphabeticalKeyword)
    .add("pnucrm", DestinationOldParagraphNumberingBase.onUpperCaseRomanKeyword)
    .add("pnlcltr", DestinationOldParagraphNumberingBase.onLowerCaseAlphabeticalKeyword)
    .add("pnlcrm", DestinationOldParagraphNumberingBase.onLowerCaseRomanKeyword)
    .add("pnord", DestinationOldParagraphNumberingBase.onOrdinalKeyword)
    .add("pnordt", DestinationOldParagraphNumberingBase.onOrdinalTextKeyword)
    .add("pncnum", DestinationOldParagraphNumberingBase.onNumberingInCircleKeyword)
    .add("pnuldash", DestinationOldParagraphNumberingBase.onDashedUndrelineKeyword)
    .add("pnuldashd", DestinationOldParagraphNumberingBase.onDashDottedUnderlineKeyword)
    .add("pnuldashdd", DestinationOldParagraphNumberingBase.onDashDotDottedUnderlineKeyword)
    .add("pnulhair", DestinationOldParagraphNumberingBase.onHairlineUnderlineKeyword)
    .add("pnulth", DestinationOldParagraphNumberingBase.onThickUnderlineKeyword)
    .add("pnulwave", DestinationOldParagraphNumberingBase.onWaveUnderlineKeyword)
    .add("pnul", DestinationOldParagraphNumberingBase.onContinuousUnderlineKeyword)
    .add("pnuld", DestinationOldParagraphNumberingBase.onDottedUnderlineKeyword)
    .add("pnuldb", DestinationOldParagraphNumberingBase.onDoubleUnderlineKeyword)
    .add("pnulnone", DestinationOldParagraphNumberingBase.onNoneUnderlineKeyword)
    .add("pnulw", DestinationOldParagraphNumberingBase.onWordUnderlineKeyword)
    .add("pnf", DestinationOldParagraphNumberingBase.onFontNumberKeyword)
    .add("pnfs", DestinationSubDocument.onFontSizeKeyword)
    .add("pnb", DestinationOldParagraphNumberingBase.onFontBoldKeyword)
    .add("pni", DestinationOldParagraphNumberingBase.onItalicKeyword)
    .add("pncaps", DestinationOldParagraphNumberingBase.onAllCapsKeyword)
    .add("pnscaps", DestinationOldParagraphNumberingBase.onSmallCapsKeyword)
    .add("pnstrike", DestinationOldParagraphNumberingBase.onStrikeKeyword)
    .add("pncf", DestinationOldParagraphNumberingBase.onForegroundColorKeyword)
    .add("pnindent", DestinationOldParagraphNumberingBase.onIndentKeyword)
    .add("pnsp", DestinationOldParagraphNumberingBase.onSpaceKeyword)
    .add("pnprev", DestinationOldParagraphNumberingBase.onUsePrevKeyword)
    .add("pnstart", DestinationOldParagraphNumberingBase.onStartAtKeyword)
    .add("pnhang", DestinationOldParagraphNumberingBase.onHangingIndentKeyword)
    .add("pnrestart", DestinationOldParagraphNumberingBase.onRestartOnSectionBreakKeyword)
    .add("pnqc", DestinationOldParagraphNumberingBase.onCenterAlignmentKeyword)
    .add("pnql", DestinationOldParagraphNumberingBase.onLeftAlignmentKeyword)
    .add("pnqr", DestinationOldParagraphNumberingBase.onRightAlignmentKeyword)
    .add("pntxtb", DestinationOldParagraphNumberingBase.onTextBeforeKeyword)
    .add("pntxta", DestinationOldParagraphNumberingBase.onTextAfterKeyword)
    .get();
