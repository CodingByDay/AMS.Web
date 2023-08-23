import { MapCreator } from '../../../../base-utils/map-creator';
import { NumberingListIndexConstants } from '../../../../core/formats/utils/numbering-list-index-constants';
import { TabLeaderType } from '../../../../core/layout/main-structures/layout-boxes/layout-tab-space-box';
import { BorderInfo } from '../../../../core/model/borders/border-info';
import { BorderLineStyle } from '../../../../core/model/borders/enums';
import { CharacterPropertyDescriptor } from '../../../../core/model/character/character-property-descriptor';
import { CharacterFormattingScript, StrikeoutType, UnderlineType } from '../../../../core/model/character/enums';
import { ControlOptions } from '../../../../core/model/options/control';
import { TabAlign } from '../../../../core/model/paragraph/paragraph';
import { ParagraphAlignment, ParagraphFirstLineIndent, ParagraphPropertyDescriptor } from '../../../../core/model/paragraph/paragraph-properties';
import { TabInfo } from '../../../../core/model/paragraph/paragraph-style';
import { RichUtils } from '../../../../core/model/rich-utils';
import { ShadingInfo } from '../../../../core/model/shadings/shading-info';
import { ShadingPattern } from '../../../../core/model/shadings/shading-pattern';
import { ShadingHelper } from '../../../../core/model/shadings/shading-pattern-helper';
import { TableCellPropertiesMask } from '../../../../core/model/tables/properties/table-cell-properties';
import { TablePropertiesMask } from '../../../../core/model/tables/properties/table-properties';
import { TableRowPropertyDescriptor } from '../../../../core/model/tables/properties/table-row-property-descriptor';
import { HorizontalAlignMode, HorizontalAnchorTypes, TableCellMergingState, TableCellVerticalAlignment, TableLayoutType, TableLookTypes, TableRowAlignment, TextDirection, TextWrapping, VerticalAlignMode, VerticalAnchorTypes } from '../../../../core/model/tables/secondary-structures/table-base-structures';
import { TableHeightUnitType, TableWidthUnit, TableWidthUnitType } from '../../../../core/model/tables/secondary-structures/table-units';
import { RtfArtBorderConverter } from '../../../utils/rtf-art-border-converter';
import { RtfFontType } from '../../model/character/enums';
import { ParagraphFrameFormattingInfo, ParagraphFrameHorizontalPositionAlignment, ParagraphFrameHorizontalRule, ParagraphFrameVerticalPositionAlignment } from '../../model/paragraph/paragraph-frame-formatting-info';
import { RtfParagraphProperties } from '../../model/paragraph/paragraph-properties';
import { DestinationBase } from '../base/destination';
import { SkipDestination } from '../base/skip-destination';
import { TextAfterDestination } from '../base/text-after-destination';
import { TextBeforeDestination } from '../base/text-before-destination';
import { PictureDestination } from '../picture/picture-destination';
import { ShapePictureDestination } from '../shape/pic/shape-picture-destination';
import { DestinationType } from '../utils/destination-type';
import { ParagraphFrameHorizontalPositionType, ParagraphFrameTextWrapType, ParagraphFrameVerticalPositionType } from '../utils/enums';
import { TableCellPropertyDescriptor } from '../../../../core/model/tables/properties/table-cell-properties';
export class DestinationSubDocument extends DestinationBase {
    constructor(importer, targetSubDocument) {
        super(importer);
        this.subDocument = targetSubDocument;
    }
    get destinationType() { return DestinationType.DestinationSubDocument; }
    get controlCharHT() { return DestinationSubDocument.controlCharHT; }
    get canAppendText() { return true; }
    canProcessSpecialHexChar() { return true; }
    get documentModel() { return this.subDocument.documentModel; }
    static onParChar(importer, _ch) {
        importer.flushDecoder();
        importer.importers.table.tableReader.onEndParagraph();
        importer.importers.paragraph.insertParagraph();
    }
    static onNonBreakingSpaceChar(importer, _ch) {
        importer.flushDecoder();
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.NonBreakingSpace);
    }
    static onNonBreakingHyphenChar(importer, _ch) {
        importer.flushDecoder();
        importer.parseCharWithoutDecoding('-');
    }
    static onOptionalHyphenChar(_importer, _ch) {
    }
    static onNonShapePictureKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new SkipDestination(importer);
    }
    static onShapeGroupKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new SkipDestination(importer);
    }
    static onTabKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.TabMark);
    }
    static onEmDashKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.EmDash);
    }
    static onEnDashKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.EnDash);
    }
    static onBulletKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.Bullet);
    }
    static onLeftSingleQuoteKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.LeftSingleQuote);
    }
    static onRightSingleQuoteKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.RightSingleQuote);
    }
    static onLeftDoubleQuoteKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.LeftDoubleQuote);
    }
    static onRightDoubleQuoteKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.RightDoubleQuote);
    }
    static onEmSpaceKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.EmSpace);
    }
    static onEnSpaceKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.EnSpace);
    }
    static onQmSpaceKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.QmSpace);
    }
    static onShapePictureKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = new ShapePictureDestination(importer);
    }
    static onShapeKeyword(importer, _parameterValue, _hasParameter) {
        importer.destination = importer.createShapeDestination();
    }
    static onLineBreakKeyword(importer, _parameterValue, _hasParameter) {
        importer.parseCharWithoutDecoding(RichUtils.specialCharacters.LineBreak);
    }
    static onTableOfContentsEntryKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.field.startField();
        importer.destination = importer.createTableContentFieldDestination(true);
    }
    static onTableOfContentsEntryLevelNumberKeyword(importer, parameterValue, hasParameter) {
        importer.destination.tableOfContentsEntryLevelNumberKeyword(parameterValue, hasParameter);
    }
    static onTableOfContentsEntryTypeTableKeyword(importer, parameterValue, hasParameter) {
        importer.destination.tableOfContentsEntryTypeTableKeyword(parameterValue, hasParameter);
    }
    tableOfContentsEntryLevelNumberKeyword(parameterValue, _hasParameter) {
        this.insertTextCore(` \\l ${parameterValue}`);
    }
    tableOfContentsEntryTypeTableKeyword(parameterValue, hasParameter) {
        const startCharIndex = 32;
        const endCharIndex = 255;
        let type = "";
        if (hasParameter && parameterValue >= startCharIndex && parameterValue <= endCharIndex)
            type += String.fromCharCode(parameterValue);
        this.insertTextCore(` \\f ${type}`);
    }
    static onFieldStartKeyword(importer, _parameterValue, _hasParameter) {
        const destination = importer.destination;
        destination.startNewField();
    }
    static onDxCustomRunDataKeyword(_importer, _parameterValue, _hasParameter) {
    }
    static onZeroWidthJoiner(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.insertSpecialCharacterCore(importer, '\u200D');
    }
    static onZeroWidthNonJoiner(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.insertSpecialCharacterCore(importer, '\u200C');
    }
    static onZeroWidthBreakOpportunity(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.insertSpecialCharacterCore(importer, '\u200C');
    }
    static onZeroWidthNonBreakOpportunity(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.insertSpecialCharacterCore(importer, '\u200D');
    }
    static insertSpecialCharacterCore(importer, specialCharacter) {
        importer.importers.character.insertText(specialCharacter);
    }
    static onParKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onEndParagraph();
        importer.importers.paragraph.insertParagraph();
    }
    static onParagraphStyleIndex(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.style.paragraph.rtfStyleIndex = parameterValue;
    }
    static onTableStyleIndexForRowOrCell(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.table.tableReader.rtfTableStyleIndexForRowOrCell = parameterValue;
    }
    static onAlignLeftKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            if (importer.importers.paragraph.paragraphFormatting.coreProperties.rightToLeft)
                importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.alignment, ParagraphAlignment.Right);
            else
                importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.alignment, ParagraphAlignment.Left);
    }
    static onAlignCenterKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.alignment, ParagraphAlignment.Center);
    }
    static onAlignRightKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            if (importer.importers.paragraph.paragraphFormatting.coreProperties.rightToLeft)
                importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.alignment, ParagraphAlignment.Left);
            else
                importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.alignment, ParagraphAlignment.Right);
    }
    static onAlignJustifyKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.alignment, ParagraphAlignment.Justify);
    }
    static onLeftIndentKeyword(importer, parameterValue, _hasParameter) {
        const maxLeftIndent = 31681;
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && parameterValue <= maxLeftIndent)
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.leftIndent, parameterValue);
    }
    static onRightIndentKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.rightIndent, parameterValue);
    }
    static onFirstLineIndentKeyword(importer, parameterValue, _hasParameter) {
        const info = importer.importers.paragraph.paragraphFormatting;
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer)) {
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndentType, ParagraphFirstLineIndent.None);
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndent, 0);
            return;
        }
        const indent = parameterValue;
        if (indent > 0) {
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndentType, ParagraphFirstLineIndent.Indented);
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndent, indent);
        }
        else if (indent < 0) {
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndentType, ParagraphFirstLineIndent.Hanging);
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndent, -indent);
        }
        else {
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndentType, ParagraphFirstLineIndent.None);
            info.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndent, 0);
        }
    }
    static onSpacingBeforeKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.spacingBefore, parameterValue);
    }
    static onLeftToRightParagraphKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.rightToLeft, false);
    }
    static onRightToLeftParagraphKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.rightToLeft, true);
    }
    static shouldApplyParagraphStyle(importer) {
        return ControlOptions.isEnabled(importer.controlOptions.paragraphStyle);
    }
    static shouldApplyParagraphFormatting(importer) {
        return ControlOptions.isEnabled(importer.controlOptions.paragraphFormatting);
    }
    static onSpacingAfterKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.spacingAfter, parameterValue);
    }
    static onLineSpacingTypeKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer)) {
            importer.importers.paragraph.paragraphFormatting.rtfLineSpacingType = parameterValue;
            importer.importers.paragraph.paragraphFormatting.rtfLineSpacingMultiplier = 0;
            importer.importers.paragraph.paragraphFormatting.useLineSpacingMultiplier = false;
        }
    }
    static onLineSpacingMultiplierKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer)) {
            importer.importers.paragraph.paragraphFormatting.rtfLineSpacingMultiplier = Math.max(0, parameterValue);
            importer.importers.paragraph.paragraphFormatting.useLineSpacingMultiplier = true;
        }
    }
    static onHyphenateParagraphKeyword(importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        if (hasParameter && parameterValue == 0)
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.suppressHyphenation, true);
        else
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.suppressHyphenation, false);
    }
    static onSuppressLineNumbersKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.suppressLineNumbers, true);
    }
    static onContextualSpacingKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.contextualSpacing, true);
    }
    static onPageBreakBeforeKeyword(importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        if (!hasParameter)
            parameterValue = 1;
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.pageBreakBefore, parameterValue != 0);
    }
    static onBeforeAutoSpacingKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer)) {
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.beforeAutoSpacing, parameterValue != 0);
            if (parameterValue != 0)
                importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.spacingBefore, 0);
        }
    }
    static onAfterAutoSpacingKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer)) {
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.afterAutoSpacing, parameterValue != 0);
            if (parameterValue != 0)
                importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.spacingAfter, 0);
        }
    }
    static onKeepWithNextKeyword(importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        if (!hasParameter)
            parameterValue = 1;
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.keepWithNext, parameterValue != 0);
    }
    static onKeepLinesTogetherKeyword(importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        if (!hasParameter)
            parameterValue = 1;
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.keepLinesTogether, parameterValue != 0);
    }
    static onWidowOrphanControlOnKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.widowOrphanControl, true);
    }
    static onWidowOrphanControlOffKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.widowOrphanControl, false);
    }
    static onParagraphShadingKeyword(importer, parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = DestinationSubDocument.calculateShadingPattern(parameterValue);
    }
    static calculateShadingPattern(parameterValue) {
        if (parameterValue > 0) {
            if (parameterValue > 10000)
                return ShadingPattern.Solid;
            const index = Math.floor(parameterValue / 250);
            return ShadingHelper.getShadingPattern(index);
        }
        return ShadingPattern.Clear;
    }
    static onParagraphVerticalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ThinVertStripe;
    }
    static onParagraphHorizontalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ThinHorzStripe;
    }
    static onParagraphForwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ThinReverseDiagStripe;
    }
    static onParagraphBackwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ThinDiagStripe;
    }
    static onParagraphCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ThinHorzCross;
    }
    static onParagraphDiagonalCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ThinDiagCross;
    }
    static onParagraphDarkHorizontalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.HorzStripe;
    }
    static onParagraphDarkVerticalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.VertStripe;
    }
    static onParagraphDarkForwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.ReverseDiagStripe;
    }
    static onParagraphDarkBackwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.DiagStripe;
    }
    static onParagraphDarkCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.HorzCross;
    }
    static onParagraphDarkDiagonalCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.shadingPattern = ShadingPattern.DiagCross;
    }
    static onParagraphFillColorKeyword(importer, parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.foreColor = DestinationSubDocument.getColorIndex(importer, parameterValue);
    }
    static getColorIndex(importer, parameterValue) {
        const props = importer.documentProperties;
        return props.colorIndexes.getRtfColorIndexById(parameterValue);
    }
    static onParagraphBackgroundKeyword(importer, parameterValue, _hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        importer.importers.paragraph.paragraphFormatting.backColor = DestinationSubDocument.getColorIndex(importer, parameterValue);
    }
    static onOutlineLevelKeyword(importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.shouldApplyParagraphFormatting(importer))
            return;
        let level = parameterValue;
        if (level < 0 || level > 8)
            level = 0;
        else
            level++;
        if (!hasParameter)
            level = 0;
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.outlineLevel, level);
    }
    static onResetParagraphPropertiesKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rtfTableStyleIndexForRowOrCell = 0;
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer)) {
            importer.importers.paragraph.paragraphFormatting = new RtfParagraphProperties();
            importer.importers.style.paragraph.rtfStyleIndex = 0;
        }
        else {
            importer.importers.paragraph.paragraphFormatting.paragraphListInfo.numberingListIndex = NumberingListIndexConstants.listIndexNotSetted;
            importer.importers.paragraph.paragraphFormatting.paragraphListInfo.listLevelIndex = 0;
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndent, 0);
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.firstLineIndentType, ParagraphFirstLineIndent.None);
            importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.leftIndent, 0);
        }
    }
    static onTopParagraphBorderKeyword(importer, _parameterValue, _hasParameter) {
        const border = new BorderInfo();
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.topBorder, border);
        importer.importers.paragraph.paragraphFormatting.processedBorder = border;
    }
    static onBottomParagraphBorderKeyword(importer, _parameterValue, _hasParameter) {
        const border = new BorderInfo();
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.bottomBorder, border);
        importer.importers.paragraph.paragraphFormatting.processedBorder = border;
    }
    static onLeftParagraphBorderKeyword(importer, _parameterValue, _hasParameter) {
        const border = new BorderInfo();
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.leftBorder, border);
        importer.importers.paragraph.paragraphFormatting.processedBorder = border;
    }
    static onRightParagraphBorderKeyword(importer, _parameterValue, _hasParameter) {
        const border = new BorderInfo();
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.rightBorder, border);
        importer.importers.paragraph.paragraphFormatting.processedBorder = border;
    }
    static onBetweenParagraphBorderKeyword(importer, _parameterValue, _hasParameter) {
        const border = new BorderInfo();
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.betweenBorder, border);
        importer.importers.paragraph.paragraphFormatting.processedBorder = border;
    }
    static onBarParagraphBorderKeyword(importer, _parameterValue, _hasParameter) {
        const border = new BorderInfo();
        importer.importers.paragraph.paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.leftBorder, border);
        importer.importers.paragraph.paragraphFormatting.processedBorder = border;
    }
    static ensureFramePropertiesExists(_importer) {
        return false;
    }
    static createDefaultFrameFormattingInfo() {
        const result = ParagraphFrameFormattingInfo.createDefaultInfo();
        return result;
    }
    static onFrameHorizontalPositionKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.x = parameterValue + 1;
        }
    }
    static onFrameHorizontalPositionNegativeKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.x = parameterValue + 1;
        }
    }
    static onFrameHorizontalAlignmentCenterKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionAlignment = ParagraphFrameHorizontalPositionAlignment.Center;
        }
    }
    static onFrameHorizontalAlignmentLeftKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionAlignment = ParagraphFrameHorizontalPositionAlignment.Left;
        }
    }
    static onFrameHorizontalAlignmentRightKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionAlignment = ParagraphFrameHorizontalPositionAlignment.Right;
        }
    }
    static onFrameHorizontalAlignmentInsideKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionAlignment = ParagraphFrameHorizontalPositionAlignment.Inside;
        }
    }
    static onFrameHorizontalAlignmentOutsideKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionAlignment = ParagraphFrameHorizontalPositionAlignment.Outside;
        }
    }
    static onFrameVerticalPositionKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.y = parameterValue + 1;
        }
    }
    static onFrameVerticalPositionNegativeKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.y = parameterValue + 1;
        }
    }
    static onFrameVerticalAlignmentInlineKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionAlignment = ParagraphFrameVerticalPositionAlignment.Inline;
        }
    }
    static onFrameVerticalAlignmentTopKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionAlignment = ParagraphFrameVerticalPositionAlignment.Top;
        }
    }
    static onFrameVerticalAlignmentCenterKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionAlignment = ParagraphFrameVerticalPositionAlignment.Center;
        }
    }
    static onFrameVerticalAlignmentBottomKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionAlignment = ParagraphFrameVerticalPositionAlignment.Bottom;
        }
    }
    static onFrameVerticalAlignmentInsideKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionAlignment = ParagraphFrameVerticalPositionAlignment.Inside;
        }
    }
    static onFrameVerticalAlignmentOutsideKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionAlignment = ParagraphFrameVerticalPositionAlignment.Outside;
        }
    }
    static onFrameWidthKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.width = Math.abs(parameterValue);
        }
    }
    static onFrameHeightKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.height = Math.abs(parameterValue);
            if (parameterValue < 0)
                importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalRule = ParagraphFrameHorizontalRule.Exact;
            if (parameterValue > 0)
                importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalRule = ParagraphFrameHorizontalRule.AtLeast;
        }
    }
    static onFramePaddingKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            const value = parameterValue;
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPadding = value;
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPadding = value;
        }
    }
    static onFrameVerticalPaddingKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer))
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPadding = parameterValue;
    }
    static onFrameHorizontalPaddingKeyword(importer, parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer))
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPadding = parameterValue;
    }
    static onParagraphHorizontalPositionTypeMarginKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionType = ParagraphFrameHorizontalPositionType.Margin;
        }
    }
    static onParagraphHorizontalPositionTypePageKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionType = ParagraphFrameHorizontalPositionType.Page;
        }
    }
    static onParagraphHorizontalPositionTypeColumnKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.horizontalPositionType = ParagraphFrameHorizontalPositionType.Column;
        }
    }
    static onParagraphVerticalPositionTypeMarginKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionType = ParagraphFrameVerticalPositionType.Margin;
        }
    }
    static onParagraphVerticalPositionTypePageKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionType = ParagraphFrameVerticalPositionType.Page;
        }
    }
    static onParagraphVerticalPositionTypeLineKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.verticalPositionType = ParagraphFrameVerticalPositionType.Paragraph;
        }
    }
    static onFrameNoWrapKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.textWrapType = ParagraphFrameTextWrapType.NotBeside;
        }
    }
    static onFrameWrapOverlayKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.textWrapType = ParagraphFrameTextWrapType.None;
        }
    }
    static onFrameWrapDefaultKeyword(_importer, _parameterValue, _hasParameter) {
    }
    static onFrameWrapAroundKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.textWrapType = ParagraphFrameTextWrapType.Around;
        }
    }
    static onFrameWrapTightKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.textWrapType = ParagraphFrameTextWrapType.Tight;
        }
    }
    static onFrameWrapThroughKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.textWrapType = ParagraphFrameTextWrapType.Through;
        }
    }
    static onFrameLockAnchor(importer, parameterValue, hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphFormatting(importer) && DestinationSubDocument.ensureFramePropertiesExists(importer)) {
            importer.importers.paragraph.paragraphFormatting.paragraphFrameFormattingInfo.lockFrameAnchorToParagraph = hasParameter ? (parameterValue != 0) : false;
        }
    }
    static onCharacterStyleIndex(importer, parameterValue, _hasParameter) {
        if (ControlOptions.isEnabled(importer.controlOptions.characterStyle))
            importer.importers.style.character.rtfStyleIndex = parameterValue;
    }
    static onBoldKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.bold, val);
    }
    static onDeletedKeyword(_importer, _parameterValue, _hasParameter) {
    }
    static onItalicKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.italic, val);
    }
    static onUnderlineKeywordCore(importer, parameterValue, hasParameter, underlineType) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.underlineType, val ? underlineType : UnderlineType.None);
    }
    static onUnderlineSingleKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.Single);
    }
    static onUnderlineDottedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.Dotted);
    }
    static onUnderlineDashedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.Dashed);
    }
    static onUnderlineDashDottedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.DashDotted);
    }
    static onUnderlineDashDotDottedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.DashDotDotted);
    }
    static onUnderlineDoubleKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.Double);
    }
    static onUnderlineHeavyWaveKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.HeavyWave);
    }
    static onUnderlineLongDashedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.LongDashed);
    }
    static onUnderlineThickSingleKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.ThickSingle);
    }
    static onUnderlineThickDottedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.ThickDotted);
    }
    static onUnderlineThickDashedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.ThickDashed);
    }
    static onUnderlineThickDashDottedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.ThickDashDotted);
    }
    static onUnderlineThickDashDotDottedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.ThickDashDotDotted);
    }
    static onUnderlineThickLongDashedKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.ThickLongDashed);
    }
    static onUnderlineDoubleWaveKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.DoubleWave);
    }
    static onUnderlineWaveKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onUnderlineKeywordCore(importer, parameterValue, hasParameter, UnderlineType.Wave);
    }
    static onUnderlineNoneKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.underlineType, UnderlineType.None);
    }
    static onUnderlineWordsOnlyKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.underlineType, val ? UnderlineType.Single : UnderlineType.None);
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.underlineWordsOnly, val);
    }
    static onUnderlineColorKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 0;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.underlineColor, DestinationSubDocument.getColorIndex(importer, parameterValue));
    }
    static onStrikeoutKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.strikeoutType, val ? StrikeoutType.Single : StrikeoutType.None);
    }
    static onDoubleStrikeoutKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.strikeoutType, val ? StrikeoutType.Double : StrikeoutType.None);
    }
    static onSubscriptKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.script, val ? CharacterFormattingScript.Subscript : CharacterFormattingScript.Normal);
    }
    static onSuperscriptKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.script, val ? CharacterFormattingScript.Superscript : CharacterFormattingScript.Normal);
    }
    static onNoSuperAndSubScriptKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.script, CharacterFormattingScript.Normal);
    }
    static onLanguageKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onLanguageNpKeyword(importer, parameterValue, hasParameter);
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.noProof, false);
    }
    static onLanguageEastAsianKeyword(importer, parameterValue, hasParameter) {
        DestinationSubDocument.onLanguageEastAsianNpKeyword(importer, parameterValue, hasParameter);
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.noProof, false);
    }
    static onLanguageNpKeyword(_importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.checkLanguageParameter(parameterValue, hasParameter))
            return;
    }
    static onLanguageEastAsianNpKeyword(_importer, parameterValue, hasParameter) {
        if (!DestinationSubDocument.checkLanguageParameter(parameterValue, hasParameter))
            return;
    }
    static checkLanguageParameter(parameterValue, hasParameter) {
        return hasParameter && (parameterValue != 0) && (parameterValue != 1024);
    }
    static onNoProofKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.noProof, val);
    }
    static onCapsKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.allCaps, val);
    }
    static onSmallCapsKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.smallCaps, val);
    }
    static onHiddenTextKeyword(importer, parameterValue, hasParameter) {
        const val = hasParameter ? parameterValue != 0 : true;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.hidden, val);
    }
    static onFontSizeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 24;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.size, Math.max(RichUtils.minFontSize, parameterValue / 2));
    }
    static onDoubleByteCharactersKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.character.characterFormatting.fontType = RtfFontType.DoubleByteCharactersFont;
    }
    static onLowAnsiFontNameKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.character.characterFormatting.fontType = RtfFontType.LowAnsiCharactersFont;
    }
    static onHighAnsiFontNameKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.character.characterFormatting.fontType = RtfFontType.HighAnsiCharactersFont;
    }
    static onAssociatedFontNameKeyword(importer, parameterValue, hasParameter) {
        if (importer.importers.character.characterFormatting.fontType == RtfFontType.Undefined)
            return;
        DestinationSubDocument.onFontNameKeyword(importer, parameterValue, hasParameter);
    }
    static onFontNameKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = importer.importers.font.defaultFontNumber;
        importer.importers.font.setFont(importer.importers.font.fonts.getRtfFontInfoById(parameterValue));
    }
    static onShadingKeyword(importer, parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(DestinationSubDocument.calculateShadingPattern(parameterValue), oldSh.backColor, oldSh.foreColor));
    }
    static onVerticalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ThinVertStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onHorizontalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ThinHorzStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onForwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ThinReverseDiagStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onBackwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ThinDiagStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ThinHorzCross, oldSh.backColor, oldSh.foreColor));
    }
    static onDiagonalCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ThinDiagCross, oldSh.backColor, oldSh.foreColor));
    }
    static onDarkHorizontalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.HorzStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onDarkVerticalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.VertStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onDarkForwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.ReverseDiagStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onDarkBackwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.DiagStripe, oldSh.backColor, oldSh.foreColor));
    }
    static onDarkCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.HorzCross, oldSh.backColor, oldSh.foreColor));
    }
    static onDarkDiagonalCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(ShadingPattern.DiagCross, oldSh.backColor, oldSh.foreColor));
    }
    static onFillColorKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 0;
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(oldSh.shadingPattern, oldSh.backColor, DestinationSubDocument.getColorIndex(importer, parameterValue)));
    }
    static onForeColorKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 0;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.textColor, DestinationSubDocument.getColorIndex(importer, parameterValue));
    }
    static onHighlightColorKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 0;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.highlightColor, DestinationSubDocument.getColorIndex(importer, parameterValue));
    }
    static onBackColorKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            parameterValue = 0;
        const oldSh = importer.importers.character.characterFormatting.coreProperties.shadingInfo;
        importer.importers.character.characterFormatting.coreProperties.setValue(CharacterPropertyDescriptor.shadingInfo, new ShadingInfo(oldSh.shadingPattern, DestinationSubDocument.getColorIndex(importer, parameterValue), oldSh.foreColor));
    }
    static onPlainKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.character.onPlainKeyword();
    }
    static onRTLRunKeyword(_importer, _parameterValue, _hasParameter) {
    }
    static onLTRRunKeyword(_importer, _parameterValue, _hasParameter) {
    }
    static onListOverride(importer, parameterValue, _hasParameter) {
        let index = importer.importers.numbering.listOverrideIndexToNumberingListIndexMap[parameterValue];
        if (index !== undefined)
            importer.importers.paragraph.paragraphFormatting.paragraphListInfo.numberingListIndex = index;
    }
    static onListLevel(importer, parameterValue, _hasParameter) {
        importer.importers.paragraph.paragraphFormatting.paragraphListInfo.listLevelIndex = parameterValue;
    }
    static onListText(importer, _parameterValue, _hasParameter) {
        importer.destination = new SkipDestination(importer);
    }
    static onTabRightKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabAlignment = TabAlign.Right;
    }
    static onTabCenterKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabAlignment = TabAlign.Center;
    }
    static onTabDecimalKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabAlignment = TabAlign.Decimal;
    }
    static onTabLeaderDotsKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabLeader = TabLeaderType.Dots;
    }
    static onTabLeaderMiddleDotsKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabLeader = TabLeaderType.MiddleDots;
    }
    static onTabLeaderHyphensKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabLeader = TabLeaderType.Hyphens;
    }
    static onTabLeaderUnderlineKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabLeader = TabLeaderType.Underline;
    }
    static onTabLeaderThickLineKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabLeader = TabLeaderType.ThickLine;
    }
    static onTabLeaderEqualSignKeyword(importer, _parameterValue, _hasParameter) {
        if (DestinationSubDocument.shouldApplyParagraphStyle(importer))
            importer.importers.paragraph.paragraphFormatting.tabLeader = TabLeaderType.EqualSign;
    }
    static onTabPositionKeyword(importer, parameterValue, hasParameter) {
        const info = importer.importers.paragraph.paragraphFormatting;
        if (hasParameter) {
            if (Math.abs(parameterValue) <= 31681) {
                const tab = new TabInfo(parameterValue, info.tabAlignment, info.tabLeader, false, false);
                info.tabs.tabsInfo.push(tab);
            }
        }
        info.tabAlignment = TabAlign.Left;
        info.tabLeader = TabLeaderType.None;
    }
    static onBarTabKeyword(importer, _parameterValue, _hasParameter) {
        const info = importer.importers.paragraph.paragraphFormatting;
        info.tabAlignment = TabAlign.Left;
        info.tabLeader = TabLeaderType.None;
    }
    static onTableRowDefaultsKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onTableRowDefaults();
    }
    static onTableStyleKeyword(importer, parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.style = importer.importers.style.table.getModelIndex(parameterValue);
    }
    static onInTableParagraphKeyword(importer, parameterValue, hasParameter) {
        importer.importers.paragraph.paragraphFormatting.inTableParagraph = !hasParameter || parameterValue != 0;
    }
    static onRowKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onEndRow();
    }
    static onCellKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onEndCell();
        importer.importers.paragraph.insertParagraph();
    }
    static onNestedCellKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onEndNestedCell();
        importer.importers.paragraph.insertParagraph();
    }
    static onNestedRowKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onEndNestedRow();
    }
    static onNestedTablePropertiesKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onStartNestedTableProperties();
    }
    static onItapKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue < 0)
            return;
        importer.importers.paragraph.paragraphFormatting.nestingLevel = parameterValue;
    }
    startNewField() {
        this.importer.importers.field.startField();
        this.importer.destination = this.importer.createFieldDestination();
    }
    nestedGroupFinished(nestedDestination) {
        if (nestedDestination instanceof PictureDestination)
            this.importer.importers.image.insertImage(nestedDestination.getImageInfo());
        const oldListIndex = this.importer.importers.numbering.currentOldSimpleList ?
            this.importer.importers.numbering.currentOldSimpleListIndex :
            this.importer.importers.numbering.currentOldMultiLevelListIndex;
        if (oldListIndex >= NumberingListIndexConstants.minValue) {
            const levelNumber = this.importer.importers.numbering.currentOldSimpleList ?
                0 :
                this.importer.importers.numbering.currentOldListLevelNumber;
            const listLevel = this.importer.documentModel.numberingLists[oldListIndex].levels[levelNumber];
            if (nestedDestination instanceof TextBeforeDestination) {
                listLevel.getListLevelProperties().displayFormatString = nestedDestination.value +
                    listLevel.getListLevelProperties().displayFormatString;
                return;
            }
            if (nestedDestination instanceof TextAfterDestination) {
                listLevel.getListLevelProperties().displayFormatString = listLevel.getListLevelProperties().displayFormatString +
                    nestedDestination.value;
                return;
            }
        }
    }
    processCharCore(ch) {
        const props = this.importer.importers.character.characterFormatting;
        if (this.importer.importers.character.characterFormatting.rtfFormattingInfo.deleted)
            return;
        if (!props.useDoubleByteCharactersFontName && !props.useLowAnsiCharactersFontName && !props.useHighAnsiCharactersFontName)
            this.importer.importers.character.insertText(ch);
        else
            this.importer.importers.character.appendChar(ch);
    }
    processTextCore(text) {
        this.insertTextCore(text);
    }
    insertTextCore(text) {
        const props = this.importer.importers.character.characterFormatting;
        if (this.importer.importers.character.characterFormatting.rtfFormattingInfo.deleted)
            return;
        if (!props.useDoubleByteCharactersFontName && !props.useLowAnsiCharactersFontName && !props.useHighAnsiCharactersFontName)
            this.importer.importers.character.insertText(text);
        else
            this.importer.importers.character.splitByCharTypeAndInsertText(text);
    }
    processSpecialHexCharCore(ch) {
        if (ch == '\r')
            DestinationSubDocument.onParKeyword(this.importer, 0, false);
        else
            super.processSpecialHexCharCore(ch);
    }
    findParentComment(_comment, _name) {
        return null;
    }
    findParenCommentInPieceTable(_comment) {
        return null;
    }
    static onCellxKeyword(importer, parameterValue, _hasParameter) {
        importer.importers.table.tableReader.onCellxProperty(parameterValue);
    }
    static onCellPreferredWidthKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.preferredWidth.value = parameterValue;
    }
    static onWidthUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.preferredWidth.type = DestinationSubDocument.getWidthUnitType(parameterValue);
    }
    static getWidthUnitType(parameterValue) {
        let unitType = TableWidthUnitType.Auto;
        switch (parameterValue) {
            case 1:
                unitType = TableWidthUnitType.Auto;
                break;
            case 2:
                unitType = TableWidthUnitType.FiftiethsOfPercent;
                break;
            case 3:
                unitType = TableWidthUnitType.ModelUnits;
                break;
            case 0:
            default:
                unitType = TableWidthUnitType.Nil;
                break;
        }
        return unitType;
    }
    static onFirstHorizontalMergedCellKeyword(importer, _parameterValue, _hasParameter) {
        if (importer.importers.table.tableReader.cellProperties.horizontalMerging == TableCellMergingState.None)
            importer.importers.table.tableReader.cellProperties.horizontalMerging = TableCellMergingState.Restart;
    }
    static onNextHorizontalMergedCellKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.horizontalMerging = TableCellMergingState.Continue;
    }
    static onFirstVerticalMergedCellKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.verticalMerging = TableCellMergingState.Restart;
    }
    static onNextVerticalMergedCellKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.verticalMerging = TableCellMergingState.Continue;
    }
    static onRowLeftKeyword(importer, parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.left = parameterValue;
    }
    static onRowHeaderKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue != 0) {
            importer.importers.table.tableReader.rowProperties.coreProperties.setValue(TableRowPropertyDescriptor.header, true);
        }
    }
    static onRowHeightKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        const val = parameterValue;
        const row = importer.importers.table.tableReader.rowProperties;
        row.height.value = Math.abs(val);
        if (parameterValue < 0)
            row.height.type = TableHeightUnitType.Exact;
        else if (parameterValue > 0)
            row.height.type = TableHeightUnitType.Minimum;
        else
            row.height.type = TableHeightUnitType.Auto;
    }
    static onRowKeepKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue != 0) {
            importer.importers.table.tableReader.rowProperties.coreProperties.setValue(TableRowPropertyDescriptor.cantSplit, true);
        }
    }
    static onTableRightAlignmentKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.coreProperties.setValue(TableRowPropertyDescriptor.rowAlignment, TableRowAlignment.Right);
    }
    static onTableLeftAlignmentKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.coreProperties.setValue(TableRowPropertyDescriptor.rowAlignment, TableRowAlignment.Left);
    }
    static onTableCenterAlignmentKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.coreProperties.setValue(TableRowPropertyDescriptor.rowAlignment, TableRowAlignment.Center);
    }
    static onSpaceBetweenCellsKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.halfSpace = parameterValue;
    }
    static onTableBottomCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseBottomMargin, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.bottom.value = parameterValue;
    }
    static onTableLeftCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseLeftMargin, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.left.value = parameterValue;
    }
    static onTableRightCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseRightMargin, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.right.value = parameterValue;
    }
    static onTableTopCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTopMargin, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.top.value = parameterValue;
    }
    static onTableBottomCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseBottomMargin, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.bottom, parameterValue);
    }
    static assignWidthUnitInfo(unitInfo, value) {
        if (value == 3)
            unitInfo.type = TableWidthUnitType.ModelUnits;
        else if (value == 0)
            unitInfo.type = TableWidthUnitType.Nil;
    }
    static onTableLeftCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseLeftMargin, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.left, parameterValue);
    }
    static onTableRightCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseRightMargin, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.right, parameterValue);
    }
    static onTableTopCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTopMargin, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellMargins.top, parameterValue);
    }
    static onTableBottomCellSpacingKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing.value = parameterValue;
    }
    static onTableLeftCellSpacingKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing.value = parameterValue;
    }
    static onTableRightCellSpacingKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing.value = parameterValue;
    }
    static onTableTopCellSpacingKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing.value = parameterValue;
    }
    static onTableBottomCellSpacingUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing, parameterValue);
    }
    static onTableLeftCellSpacingUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing, parameterValue);
    }
    static onTableRightCellSpacingUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing, parameterValue);
    }
    static onTableTopCellSpacingUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseCellSpacing, true);
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.tableProperties.coreProperties.cellSpacing, parameterValue);
    }
    static onTablePreferredWidthKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.preferredWidth.value = parameterValue;
    }
    static onTablePreferredWidthUnitTypeKeyword(importer, parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.preferredWidth.type = DestinationSubDocument.getWidthUnitType(parameterValue);
    }
    static onWidthBeforeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.widthBefore.value = parameterValue;
    }
    static onWidthBeforeUnitTypeKeyword(importer, parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.widthBefore.type = DestinationSubDocument.getWidthUnitType(parameterValue);
    }
    static onWidthAfterKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.widthAfter.value = parameterValue;
    }
    static onWidthAfterUnitTypeKeyword(importer, parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.widthAfter.type = DestinationSubDocument.getWidthUnitType(parameterValue);
    }
    static onRowBackgroundColorKeyword(importer, parameterValue, hasParameter) {
        const colorIndexTable = importer.documentProperties.colorIndexes;
        if (!hasParameter || parameterValue > colorIndexTable.collection.length - 1)
            return;
        importer.importers.table.tableReader.rowProperties.backColor = DestinationSubDocument.getColorIndex(importer, parameterValue);
    }
    static onRowForegroundColorKeyword(importer, parameterValue, hasParameter) {
        const colorIndexTable = importer.documentProperties.colorIndexes;
        if (!hasParameter || parameterValue > colorIndexTable.collection.length - 1)
            return;
        importer.importers.table.tableReader.rowProperties.foreColor = DestinationSubDocument.getColorIndex(importer, parameterValue);
    }
    static onRowPatternKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.shadingPattern = DestinationSubDocument.calculateShadingPattern(parameterValue);
    }
    static onRowShadingKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.shadingPattern = DestinationSubDocument.calculateShadingPattern(parameterValue);
    }
    static onRowVerticalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ThinVertStripe;
    }
    static onRowHorizontalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ThinHorzStripe;
    }
    static onRowForwardDiagonalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ThinReverseDiagStripe;
    }
    static onRowBackwardDiagonalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ThinDiagStripe;
    }
    static onRowCrossPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ThinHorzCross;
    }
    static onRowDiagonalCrossPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ThinDiagCross;
    }
    static onRowDarkHorizontalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.HorzStripe;
    }
    static onRowDarkVerticalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.VertStripe;
    }
    static onRowDarkForwardDiagonalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.ReverseDiagStripe;
    }
    static onRowDarkBackwardDiagonalPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.DiagStripe;
    }
    static onRowDarkCrossPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.HorzCross;
    }
    static onRowDarkDiagonalCrossPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.shadingPattern = ShadingPattern.DiagCross;
    }
    static onTableIndentKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTableIndent, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.indent.value = parameterValue;
    }
    static onTableIndentUnitType(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTableIndent, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.indent.type = DestinationSubDocument.getWidthUnitType(parameterValue);
    }
    static onCellFitTextKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue != 0)
            importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.fitText, true);
    }
    static onCellNoWrapKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue != 0)
            importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.noWrap, true);
    }
    static onCellVerticalAlignmentTopKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.vertivalAlignment, TableCellVerticalAlignment.Top);
    }
    static onCellVerticalAlignmentCenterKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.vertivalAlignment, TableCellVerticalAlignment.Center);
    }
    static onCellVerticalAlignmentBottomKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.vertivalAlignment, TableCellVerticalAlignment.Bottom);
    }
    static onCellHideMarkKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue != 0)
            importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.hideCellMark, true);
    }
    static onCellBottomCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.bottomMargin, TableWidthUnit.create(parameterValue, TableWidthUnitType.ModelUnits));
    }
    static onCellLeftCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.topMargin, TableWidthUnit.create(parameterValue, TableWidthUnitType.ModelUnits));
    }
    static onCellRightCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.rightMargin, TableWidthUnit.create(parameterValue, TableWidthUnitType.ModelUnits));
    }
    static onCellTopCellMarginKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.coreProperties.cellMargins.left.value = parameterValue;
    }
    static onCellBottomCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.cellProperties.coreProperties.cellMargins.bottom, parameterValue);
    }
    static onCellLeftCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.cellProperties.coreProperties.cellMargins.top, parameterValue);
    }
    static onCellRightCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.cellProperties.coreProperties.cellMargins.right, parameterValue);
    }
    static onCellTopCellMarginUnitTypeKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        DestinationSubDocument.assignWidthUnitInfo(importer.importers.table.tableReader.cellProperties.coreProperties.cellMargins.left, parameterValue);
    }
    static onTableOverlapKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue != 0) {
            importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseIsTableOverlap, true);
            importer.importers.table.tableReader.tableProperties.coreProperties.isTableOverlap = false;
        }
    }
    static onTableLeftFromTextKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.floatingPosition.leftFromText = parameterValue;
    }
    static onTableRightFromTextKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.floatingPosition.rightFromText = parameterValue;
    }
    static onTableTopFromTextKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.floatingPosition.topFromText = parameterValue;
    }
    static onTableBottomFromTextKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.rowProperties.floatingPosition.bottomFromText = parameterValue;
    }
    static onColHorizontalAnchorKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAnchor = HorizontalAnchorTypes.Column;
    }
    static onMarginHorizontalAnchorKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.textWrapping = TextWrapping.Around;
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAnchor = HorizontalAnchorTypes.Margin;
    }
    static onPageHorizontalAnchorKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.textWrapping = TextWrapping.Around;
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAnchor = HorizontalAnchorTypes.Page;
    }
    static onTableHorizontalPositionKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        if (parameterValue != 0)
            importer.importers.table.tableReader.rowProperties.floatingPosition.textWrapping = TextWrapping.Around;
    }
    static onTableVerticalPositionKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        if (parameterValue != 0)
            importer.importers.table.tableReader.rowProperties.floatingPosition.textWrapping = TextWrapping.Around;
        importer.importers.table.tableReader.rowProperties.floatingPosition.tableVerticalPosition = parameterValue;
    }
    static onCenterTableHorizontalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAlign = HorizontalAlignMode.Center;
    }
    static onInsideTableHorizontalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAlign = HorizontalAlignMode.Inside;
    }
    static onLeftTableHorizontalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAlign = HorizontalAlignMode.Left;
    }
    static onOutsideTableHorizontalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAlign = HorizontalAlignMode.Outside;
    }
    static onRightTableHorizontalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.horizontalAlign = HorizontalAlignMode.Right;
    }
    static onBottomTableVerticalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAlign = VerticalAlignMode.Bottom;
    }
    static onCenterTableVerticalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAlign = VerticalAlignMode.Center;
    }
    static onInlineTableVerticalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAlign = VerticalAlignMode.Inline;
    }
    static onInsideTableVerticalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAlign = VerticalAlignMode.Inside;
    }
    static onOutsideTableVerticalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAlign = VerticalAlignMode.Outside;
    }
    static onTopTableVerticalAlignKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAlign = VerticalAlignMode.Top;
    }
    static onMarginVerticalAnchorKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAnchor = VerticalAnchorTypes.Margin;
    }
    static onParagraphVerticalAnchorKeword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.textWrapping = TextWrapping.Around;
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAnchor = VerticalAnchorTypes.Paragraph;
    }
    static onPageVerticalAnchorKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.rowProperties.floatingPosition.textWrapping = TextWrapping.Around;
        importer.importers.table.tableReader.rowProperties.floatingPosition.verticalAnchor = VerticalAnchorTypes.Page;
    }
    static onTopTableBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTopBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.tableProperties.coreProperties.borders.topBorder;
    }
    static onLeftTableBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseLeftBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.tableProperties.coreProperties.borders.leftBorder;
    }
    static onBottomTableBorderKeword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseBottomBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.tableProperties.coreProperties.borders.bottomBorder;
    }
    static onRightTableBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseRightBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.tableProperties.coreProperties.borders.rightBorder;
    }
    static onHorizontalTableBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseInsideHorizontalBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.tableProperties.coreProperties.borders.insideHorizontalBorder;
    }
    static onVerticalTableBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseInsideVerticalBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.tableProperties.coreProperties.borders.insideVerticalBorder;
    }
    static onNoTableBorderKeyword(importer, _parameterValue, _hasParameter) {
        if (importer.importers.table.tableReader.processedBorder == null)
            return;
        importer.importers.table.tableReader.processedBorder.style = BorderLineStyle.None;
        importer.importers.table.tableReader.processedBorder = null;
    }
    static onBottomCellBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setUseValue(TableCellPropertiesMask.UseBottomBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.cellProperties.coreProperties.borders.bottomBorder;
    }
    static onTopCellBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setUseValue(TableCellPropertiesMask.UseTopBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.cellProperties.coreProperties.borders.topBorder;
    }
    static onLeftCellBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setUseValue(TableCellPropertiesMask.UseLeftBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.cellProperties.coreProperties.borders.leftBorder;
    }
    static onRightCellBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setUseValue(TableCellPropertiesMask.UseRightBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.cellProperties.coreProperties.borders.rightBorder;
    }
    static onUpperLeftToLowerRightBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setUseValue(TableCellPropertiesMask.UseTopLeftDiagonalBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.cellProperties.coreProperties.borders.topLeftDiagonalBorder;
    }
    static onUpperRightToLowerLeftBorderKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setUseValue(TableCellPropertiesMask.UseTopRightDiagonalBorder, true);
        importer.importers.table.tableReader.processedBorder = importer.importers.table.tableReader.cellProperties.coreProperties.borders.topRightDiagonalBorder;
    }
    static onCellTextTopAlignmentKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.vertivalAlignment, TableCellVerticalAlignment.Top);
    }
    static onCellTextCenterVerticalAlignmentKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.vertivalAlignment, TableCellVerticalAlignment.Center);
    }
    static onCellTextBottomAlignmentKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.setValue(TableCellPropertyDescriptor.vertivalAlignment, TableCellVerticalAlignment.Bottom);
    }
    static onCellLeftToRightTopToBottomTextDirectionKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.textDirection = TextDirection.LeftToRightTopToBottom;
    }
    static onCellTopToBottomRightToLeftTextDirectionKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.textDirection = TextDirection.TopToBottomRightToLeft;
    }
    static onCellBottomToTopLeftToRightTextDirectionKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.textDirection = TextDirection.BottomToTopLeftToRight;
    }
    static onCellLeftToRightTopToBottomVerticalTextDirectionKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.textDirection = TextDirection.LeftToRightTopToBottomRotated;
    }
    static onCellTopToBottomRightToLeftVerticalTextDirectionKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.coreProperties.textDirection = TextDirection.TopToBottomRightToLeftRotated;
    }
    static onCellBackgroundColorKeyword(importer, parameterValue, hasParameter) {
        const colorIndexTable = importer.documentProperties.colorIndexes;
        if (!hasParameter || parameterValue > colorIndexTable.collection.length - 1)
            return;
        importer.importers.table.tableReader.cellProperties.backColor = DestinationSubDocument.getColorIndex(importer, parameterValue);
    }
    static onCellForegroundColorKeyword(importer, parameterValue, hasParameter) {
        const colorIndexTable = importer.documentProperties.colorIndexes;
        if (!hasParameter || parameterValue > colorIndexTable.collection.length - 1)
            return;
        importer.importers.table.tableReader.cellProperties.foreColor = DestinationSubDocument.getColorIndex(importer, parameterValue);
    }
    static onCellShadingKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter)
            return;
        importer.importers.table.tableReader.cellProperties.shadingPattern = DestinationSubDocument.calculateShadingPattern(parameterValue);
    }
    static onCellNoShadingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.Nil;
    }
    static onCellVerticalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ThinVertStripe;
    }
    static onCellHorizontalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ThinHorzStripe;
    }
    static onCellForwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ThinReverseDiagStripe;
    }
    static onCellBackwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ThinDiagStripe;
    }
    static onCellCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ThinHorzCross;
    }
    static onCellDiagonalCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ThinDiagCross;
    }
    static onCellDarkHorizontalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.HorzStripe;
    }
    static onCellDarkVerticalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.VertStripe;
    }
    static onCellDarkForwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.ReverseDiagStripe;
    }
    static onCellDarkBackwardDiagonalBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.DiagStripe;
    }
    static onCellDarkCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.HorzCross;
    }
    static onCellDarkDiagonalCrossBackgroundPatternKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.cellProperties.shadingPattern = ShadingPattern.DiagCross;
    }
    static onTableAutoFitKeyword(importer, parameterValue, _hasParameter) {
        const val = Math.abs(parameterValue);
        if (val > 1)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTableLayout, true);
        if (val == 1)
            importer.importers.table.tableReader.tableProperties.coreProperties.layoutType = TableLayoutType.Autofit;
        else
            importer.importers.table.tableReader.tableProperties.coreProperties.layoutType = TableLayoutType.Fixed;
    }
    static onApplyFirstRowConditionalFormattingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.lookTypes |= TableLookTypes.ApplyFirstRow;
    }
    static onApplyLastRowConditionalFormattingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.lookTypes |= TableLookTypes.ApplyLastRow;
    }
    static onApplyFirstColumnContitionalFormattingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.lookTypes |= TableLookTypes.ApplyFirstColumn;
    }
    static onApplyLastColumnConditionalFormattingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.lookTypes |= TableLookTypes.ApplyLastColumn;
    }
    static onDoNotApplyRowBandingConditionalFormattingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.lookTypes |= TableLookTypes.DoNotApplyRowBanding;
    }
    static onDoNotApplyColumnBandingConditionalFormattingKeyword(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.lookTypes |= TableLookTypes.DoNotApplyColumnBanding;
    }
    static onRowBandSizeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTableStyleRowBandSize, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.tableStyleRowBandSize = parameterValue;
    }
    static onColumnBandSizeKeyword(importer, parameterValue, hasParameter) {
        if (parameterValue < 0 || !hasParameter)
            return;
        importer.importers.table.tableReader.tableProperties.coreProperties.setUseValue(TablePropertiesMask.UseTableStyleColBandSize, true);
        importer.importers.table.tableReader.tableProperties.coreProperties.tableStyleColumnBandSize = parameterValue;
    }
    static onLtrRow(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.rightToLeft = false;
    }
    static onRtlRow(importer, _parameterValue, _hasParameter) {
        importer.importers.table.tableReader.tableProperties.rightToLeft = true;
    }
    static onNoBorderKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setNoBorderType(importer, BorderLineStyle.Nil);
    }
    static onBorderSpaceKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue < 0)
            return;
        const border = importer.importers.table.tableReader.processedBorder;
        if (border)
            border.offset = parameterValue;
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (paragraphBorder)
            paragraphBorder.offset = parameterValue;
    }
    static assignDefaultBorderWidth(_border) {
    }
    static setBorderType(importer, style) {
        const border = importer.importers.table.tableReader.processedBorder;
        if (border) {
            DestinationSubDocument.assignDefaultBorderWidth(border);
            border.style = style;
        }
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (paragraphBorder)
            paragraphBorder.style = style;
    }
    static setNoBorderType(importer, style) {
        const border = importer.importers.table.tableReader.processedBorder;
        if (border)
            border.style = style;
        importer.importers.table.tableReader.processedBorder = null;
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (paragraphBorder)
            paragraphBorder.style = style;
        importer.importers.paragraph.paragraphFormatting.processedBorder = null;
    }
    static onSingleThicknessBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Single);
    }
    static onDoubleThicknessBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        const border = importer.importers.table.tableReader.processedBorder;
        if (border) {
            DestinationSubDocument.assignDefaultBorderWidth(border);
            border.width *= 2;
            border.style = BorderLineStyle.Single;
        }
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (paragraphBorder) {
            paragraphBorder.width *= 2;
            paragraphBorder.style = BorderLineStyle.Single;
        }
    }
    static onBorderWidthKeyword(importer, parameterValue, _hasParameter) {
        const border = importer.importers.table.tableReader.processedBorder;
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (!border && !paragraphBorder)
            return;
        const maxBorderWidth = 255;
        const val = parameterValue > 0 ?
            parameterValue > maxBorderWidth ? maxBorderWidth : parameterValue :
            0;
        if (border)
            border.width = val > 0 ? val : 1;
        if (paragraphBorder)
            paragraphBorder.width = val > 0 ? val : 1;
    }
    static onBorderColorKeyword(importer, parameterValue, hasParameter) {
        if (!hasParameter || parameterValue < 0)
            return;
        const border = importer.importers.table.tableReader.processedBorder;
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (!border && !paragraphBorder)
            return;
        const colorIndexTable = importer.documentProperties.colorIndexes;
        if (parameterValue > colorIndexTable.collection.length - 1)
            return;
        const color = colorIndexTable.getRtfColorIndexById(parameterValue);
        if (border)
            border.color = color;
        if (paragraphBorder)
            paragraphBorder.color = color;
    }
    static onDoubleBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Double);
    }
    static onDottedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Dotted);
    }
    static onDashedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Dashed);
    }
    static onHairlineBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        const border = importer.importers.table.tableReader.processedBorder;
        if (border) {
            border.style = BorderLineStyle.Single;
            border.width = 1;
        }
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (paragraphBorder) {
            paragraphBorder.style = BorderLineStyle.Single;
            paragraphBorder.width = 1;
        }
    }
    static onSmallDashedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.DashSmallGap);
    }
    static onDotDashedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.DotDash);
    }
    static onDotDotDashedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.DotDotDash);
    }
    static onInsetBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Inset);
    }
    static onNoneBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setNoBorderType(importer, BorderLineStyle.None);
    }
    static onNilBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setNoBorderType(importer, BorderLineStyle.Nil);
    }
    static onOutsetBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Outset);
    }
    static onTripletBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Triple);
    }
    static onSmallThickThinBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThickThinSmallGap);
    }
    static onSmallThinThickThinBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThinThickThinSmallGap);
    }
    static onMediumThickThinBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThickThinMediumGap);
    }
    static onMediumThinThickBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThinThickMediumGap);
    }
    static onMediumThinThickThinBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThinThickThinMediumGap);
    }
    static onLargeThickThinBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThickThinLargeGap);
    }
    static onLargeThinThickBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThinThickLargeGap);
    }
    static onLargeThinThickThinBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThinThickThinLargeGap);
    }
    static onWavyBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.Wave);
    }
    static onDoubleWavyBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.DoubleWave);
    }
    static onStripedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.DashDotStroked);
    }
    static onEmbossedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThreeDEmboss);
    }
    static onEngravedBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThreeDEngrave);
    }
    static onSmallThinThickBorderTypeKeyword(importer, _parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, BorderLineStyle.ThinThickSmallGap);
    }
    static onBorderArtIndex(importer, parameterValue, _hasParameter) {
        DestinationSubDocument.setBorderType(importer, RtfArtBorderConverter.getBorderLineStyle(parameterValue));
    }
    static onFrameBorderKeyword(importer, parameterValue, hasParameter) {
        const border = importer.importers.table.tableReader.processedBorder;
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (!border && !paragraphBorder)
            return;
        if (!hasParameter || parameterValue != 0) {
            if (border)
                border.frame = true;
            if (paragraphBorder)
                paragraphBorder.frame = true;
        }
    }
    static onShadowedBorderTypeKeyword(importer, parameterValue, hasParameter) {
        const border = importer.importers.table.tableReader.processedBorder;
        const paragraphBorder = importer.importers.paragraph.paragraphFormatting.processedBorder;
        if (!border && !paragraphBorder)
            return;
        if (!hasParameter || parameterValue != 0) {
            if (border)
                border.shadow = true;
            if (paragraphBorder)
                paragraphBorder.shadow = true;
        }
    }
}
DestinationSubDocument.controlCharHT = new MapCreator()
    .add('\r', DestinationSubDocument.onParChar)
    .add('\n', DestinationSubDocument.onParChar)
    .add('\\', DestinationSubDocument.onEscapedChar)
    .add('{', DestinationSubDocument.onEscapedChar)
    .add('}', DestinationSubDocument.onEscapedChar)
    .add('~', DestinationSubDocument.onNonBreakingSpaceChar)
    .add('_', DestinationSubDocument.onNonBreakingHyphenChar)
    .add('-', DestinationSubDocument.onOptionalHyphenChar)
    .get();
