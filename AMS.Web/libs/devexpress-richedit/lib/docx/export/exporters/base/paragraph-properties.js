import { NumberingListIndexConstants } from '../../../../core/formats/utils/numbering-list-index-constants';
import { TabLeaderType } from '../../../../core/layout/main-structures/layout-boxes/layout-tab-space-box';
import { BorderLineStyle } from '../../../../core/model/borders/enums';
import { NumberingList } from '../../../../core/model/numbering-lists/numbering-list';
import { TabAlign } from '../../../../core/model/paragraph/paragraph';
import { ParagraphAlignment, ParagraphFirstLineIndent, ParagraphLineSpacingType, ParagraphPropertiesMask } from '../../../../core/model/paragraph/paragraph-properties';
import { ParagraphStyle } from '../../../../core/model/paragraph/paragraph-style';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { MathUtils } from '@devexpress/utils/lib/utils/math';
import { TranslationTables } from '../../../translation-table/translation-tables';
import { WordProcessingMLValue } from '../../../translation-table/word-processing-mlvalue';
import { WriterHelper } from '../../utils/writer-helper';
import { BaseExporter } from '../base';
import { SectionExporter } from './sections';
export class ParagraphPropertiesExporter extends BaseExporter {
    static convertLineSpacingValue(lineSpacing, value) {
        if (lineSpacing == ParagraphLineSpacingType.AtLeast || lineSpacing == ParagraphLineSpacingType.Exactly)
            return Math.round(value);
        else {
            if (lineSpacing == ParagraphLineSpacingType.Single)
                value = 1;
            else if (lineSpacing == ParagraphLineSpacingType.Double)
                value = 2;
            else if (lineSpacing == ParagraphLineSpacingType.Sesquialteral)
                value = 1.5;
            return Math.round(value * 240);
        }
    }
    static shouldExportParagraphBorder(defaultParagraphProperties, borderInfo) {
        return borderInfo && (!defaultParagraphProperties || borderInfo.style != BorderLineStyle.None || borderInfo.width != 0);
    }
    exportParagraphPropertiesCore(props, numberingListId, levelIndex, tabsExporter, defaultParagraphProperties) {
        if (props.getUseValue(ParagraphPropertiesMask.UseKeepWithNext))
            this.writer.writeWpBoolValue('keepNext', props.keepWithNext);
        if (props.getUseValue(ParagraphPropertiesMask.UseKeepLinesTogether))
            this.writer.writeWpBoolValue('keepLines', props.keepLinesTogether);
        if (props.getUseValue(ParagraphPropertiesMask.UsePageBreakBefore) && props.pageBreakBefore)
            this.writer.writeWpBoolValue('pageBreakBefore', props.pageBreakBefore);
        if (props.getUseValue(ParagraphPropertiesMask.UseWidowOrphanControl))
            this.writer.writeWpBoolValue('widowControl', props.widowOrphanControl);
        if (props.getUseValue(ParagraphPropertiesMask.UseSuppressLineNumbers))
            this.writer.writeWpBoolValue(new WordProcessingMLValue('suppressLineNumbers', 'supressLineNumbers').openXmlValue, props.suppressLineNumbers);
        if (props.getUseValue(ParagraphPropertiesMask.UseShadingInfoIndex))
            this.data.colorExporter.exportShadingCore(props.shadingInfo, false);
        if (props.getUseValue(ParagraphPropertiesMask.UseSuppressHyphenation))
            this.writer.writeWpBoolValue('suppressAutoHyphens', props.suppressHyphenation);
        if (props.getUseValue(ParagraphPropertiesMask.UseRightToLeft) && !defaultParagraphProperties)
            this.writer.writeWpBoolValue('bidi', props.rightToLeft);
        if (props.getUseValue(ParagraphPropertiesMask.UseContextualSpacing))
            this.writer.writeWpBoolValue('contextualSpacing', props.contextualSpacing);
        if (props.getUseValue(ParagraphPropertiesMask.UseAlignment))
            this.writer.writeWpStringValue('jc', WriterHelper.getValueFromTables(TranslationTables.paragraphAlignmentTable, props.alignment, ParagraphAlignment.Left));
        if (props.getUseValue(ParagraphPropertiesMask.UseDivId) && !defaultParagraphProperties)
            this.writer.writeWpIntValue('divId', props.divId);
        this.exportParagraphBorders(props, defaultParagraphProperties);
        this.exportParagraphSpacing(props);
        this.exportParagraphIndentation(props);
        this.exportParagraphOutlineLevel(props);
        this.exportParagraphNumbering(numberingListId, levelIndex);
        if (tabsExporter)
            tabsExporter.call(this);
    }
    exportStyleParagraphProperties(paragraphProperties, tabInfo, ownNumberingListIndex, listLevelIndex) {
        this.writer.writeWpStartElement('pPr');
        this.data.parPropsExporter.exportParagraphPropertiesCore(paragraphProperties, ownNumberingListIndex, listLevelIndex, () => this.exportTabProperties(tabInfo), false);
        this.writer.endElement();
    }
    exportParagraphProperties(subDocument, section, paragraph, paragraphRun) {
        if (this.shouldExportParagraphProperties(subDocument, section, paragraph)) {
            this.writer.writeWpStartElement('pPr');
            this.data.parPropsExporter.exportParagraphPropertiesCore(paragraph.maskedParagraphProperties, paragraph.numberingListIndex, paragraph.listLevelIndex, () => this.exportTabProperties(paragraph.tabs), false);
            if (paragraph.paragraphStyle)
                this.writer.writeWpStringValue('pStyle', this.data.parStyleExporter.getStyleId(this.data.parStyleExporter.getStyleIndexByName(paragraph.paragraphStyle.styleName)));
            this.data.charPropsExporter.exportRunProperties(paragraphRun);
            if (this.shouldExportSectionProperties(subDocument, section, paragraph))
                new SectionExporter(this.data).exportProperties(section);
            this.writer.endElement();
        }
    }
    exportTabProperties(tabs) {
        if (!this.shouldExportTabProperties(tabs))
            return;
        this.writer.writeWpStartElement('tabs');
        for (const tab of tabs.tabsInfo)
            if (!tab.isDefault)
                this.exportTab(tab);
        this.writer.endElement();
    }
    exportParagraphNumbering(numberingListId, listLevelIndex) {
        if (this.shouldExportParagraphNumbering(numberingListId, listLevelIndex)) {
            this.writer.writeWpStartElement('numPr');
            if (listLevelIndex > 0)
                this.writer.writeWpIntValue('ilvl', listLevelIndex);
            if (numberingListId >= NumberingListIndexConstants.minValue || numberingListId == NumberingList.NoNumberingListIndex)
                this.writer.writeWpIntValue('numId', this.getNumberingListIndexForExport(numberingListId));
            this.writer.endElement();
        }
    }
    shouldExportParagraphNumbering(numberingListId, listLevelIndex = 1) {
        return numberingListId == NumberingList.NoNumberingListIndex ||
            numberingListId >= NumberingListIndexConstants.minValue || listLevelIndex > 0;
    }
    exportParagraphOutlineLevel(props) {
        if (props.getUseValue(ParagraphPropertiesMask.UseOutlineLevel)) {
            let level = props.outlineLevel;
            if (level <= 0 || level >= 10)
                this.writer.writeWpIntValue('outlineLvl', 9);
            else
                this.writer.writeWpIntValue('outlineLvl', level - 1);
        }
    }
    exportParagraphSpacing(props) {
        if (props.getUseValue(ParagraphPropertiesMask.UseLineSpacing) ||
            props.getUseValue(ParagraphPropertiesMask.UseSpacingBefore) ||
            props.getUseValue(ParagraphPropertiesMask.UseSpacingAfter) ||
            props.getUseValue(ParagraphPropertiesMask.UseBeforeAutoSpacing) ||
            props.getUseValue(ParagraphPropertiesMask.UseAfterAutoSpacing)) {
            this.writer.writeWpStartElement('spacing');
            if (props.getUseValue(ParagraphPropertiesMask.UseLineSpacing))
                this.writer.writeWpStringAttr(new WordProcessingMLValue('lineRule').openXmlValue, WriterHelper.getValueFromTables(TranslationTables.lineSpacingTable, props.lineSpacingType, ParagraphLineSpacingType.Single));
            if (props.getUseValue(ParagraphPropertiesMask.UseLineSpacing))
                this.writer.writeWpIntAttr('line', ParagraphPropertiesExporter.convertLineSpacingValue(props.lineSpacingType, props.lineSpacing));
            if (props.getUseValue(ParagraphPropertiesMask.UseSpacingBefore))
                this.writer.writeWpIntAttr('before', props.spacingBefore);
            if (props.getUseValue(ParagraphPropertiesMask.UseSpacingAfter))
                this.writer.writeWpIntAttr('after', props.spacingAfter);
            if (props.getUseValue(ParagraphPropertiesMask.UseBeforeAutoSpacing))
                this.writer.writeWpBoolAttr(new WordProcessingMLValue('beforeAutospacing', 'before-autospacing').openXmlValue, props.beforeAutoSpacing);
            if (props.getUseValue(ParagraphPropertiesMask.UseAfterAutoSpacing))
                this.writer.writeWpBoolAttr(new WordProcessingMLValue('afterAutospacing', 'after-autospacing').openXmlValue, props.afterAutoSpacing);
            this.writer.endElement();
        }
    }
    exportParagraphIndentation(props) {
        if (props.getUseValue(ParagraphPropertiesMask.UseFirstLineIndent) ||
            props.getUseValue(ParagraphPropertiesMask.UseFirstLineIndent) ||
            props.getUseValue(ParagraphPropertiesMask.UseLeftIndent) ||
            props.getUseValue(ParagraphPropertiesMask.UseRightIndent)) {
            this.writer.writeWpStartElement('ind');
            if (props.getUseValue(ParagraphPropertiesMask.UseFirstLineIndent)) {
                switch (props.firstLineIndentType) {
                    case ParagraphFirstLineIndent.Hanging:
                        this.writer.writeWpIntAttr('hanging', props.firstLineIndent);
                        if (props.getUseValue(ParagraphPropertiesMask.UseLeftIndent))
                            this.writer.writeWpIntAttr('left', props.leftIndent);
                        break;
                    case ParagraphFirstLineIndent.Indented:
                        this.writer.writeWpIntAttr(new WordProcessingMLValue('firstLine').openXmlValue, props.firstLineIndent);
                        if (props.getUseValue(ParagraphPropertiesMask.UseLeftIndent))
                            this.writer.writeWpIntAttr('left', props.leftIndent);
                        break;
                    case ParagraphFirstLineIndent.None:
                        this.writer.writeWpIntAttr(new WordProcessingMLValue('firstLine').openXmlValue, 0);
                        if (props.getUseValue(ParagraphPropertiesMask.UseLeftIndent))
                            this.writer.writeWpIntAttr('left', props.leftIndent);
                        break;
                }
            }
            else if (props.getUseValue(ParagraphPropertiesMask.UseLeftIndent))
                this.writer.writeWpIntAttr('left', props.leftIndent);
            if (props.getUseValue(ParagraphPropertiesMask.UseRightIndent))
                this.writer.writeWpIntAttr('right', props.rightIndent);
            this.writer.endElement();
        }
    }
    exportParagraphBorders(props, defaultParagraphProperties) {
        const shouldExportBetweenBorder = props.getUseValue(ParagraphPropertiesMask.UseBetweenBorder) &&
            ParagraphPropertiesExporter.shouldExportParagraphBorder(defaultParagraphProperties, props.betweenBorder);
        const shouldExportBottomBorder = props.getUseValue(ParagraphPropertiesMask.UseBottomBorder) &&
            ParagraphPropertiesExporter.shouldExportParagraphBorder(defaultParagraphProperties, props.bottomBorder);
        const shouldExportLeftBorder = props.getUseValue(ParagraphPropertiesMask.UseLeftBorder) &&
            ParagraphPropertiesExporter.shouldExportParagraphBorder(defaultParagraphProperties, props.leftBorder);
        const shouldExportRightBorder = props.getUseValue(ParagraphPropertiesMask.UseRightBorder) &&
            ParagraphPropertiesExporter.shouldExportParagraphBorder(defaultParagraphProperties, props.rightBorder);
        const shouldExportTopBorder = props.getUseValue(ParagraphPropertiesMask.UseTopBorder) &&
            ParagraphPropertiesExporter.shouldExportParagraphBorder(defaultParagraphProperties, props.topBorder);
        if (shouldExportBetweenBorder || shouldExportBottomBorder || shouldExportLeftBorder || shouldExportRightBorder || shouldExportTopBorder) {
            this.writer.writeWpStartElement('pBdr');
            if (shouldExportTopBorder)
                this.exportParagraphBorder('top', props.topBorder);
            if (shouldExportLeftBorder)
                this.exportParagraphBorder('left', props.leftBorder);
            if (shouldExportBottomBorder)
                this.exportParagraphBorder('bottom', props.bottomBorder);
            if (shouldExportRightBorder)
                this.exportParagraphBorder('right', props.rightBorder);
            if (shouldExportBetweenBorder)
                this.exportParagraphBorder('between', props.betweenBorder);
            this.writer.endElement();
        }
    }
    exportParagraphBorder(tag, border) {
        this.writer.writeWpStartElement(tag);
        this.writer.writeWpStringAttr('val', WriterHelper.getValueFromTables(TranslationTables.borderLineStyleTable, border.style, BorderLineStyle.None));
        this.writer.writeWpIntAttr('sz', UnitConverter.twipsToPointsF(border.width * 8.0));
        this.writer.writeWpIntAttr('space', UnitConverter.twipsToPointsF(border.offset));
        this.writer.writeWpBoolAttr('shadow', border.shadow);
        this.writer.writeWpBoolAttr('frame', border.frame);
        this.data.colorExporter.exportColorInfo(border.color, 'color', false);
        this.writer.endElement();
    }
    getNumberingListIndexForExport(numberingListIndex) {
        return numberingListIndex == NumberingList.NoNumberingListIndex ? 0 : numberingListIndex + 1;
    }
    exportTab(tab) {
        this.writer.writeWpStartElement('tab');
        if (tab.deleted)
            this.writer.writeWpStringAttr('val', 'clear');
        else
            this.writer.writeWpStringAttr('val', WriterHelper.getValueFromTables(TranslationTables.tabAlignmentTable, tab.alignment, TabAlign.Left));
        this.writer.writeWpIntAttr('pos', MathUtils.restrictValue(tab.position, -31680, 31680));
        this.writer.writeWpStringAttr('leader', WriterHelper.getValueFromTables(TranslationTables.tabLeaderTable, tab.leader, TabLeaderType.None));
        this.writer.endElement();
    }
    shouldExportTabProperties(tabs) {
        return tabs && !!ListUtils.unsafeAnyOf(tabs.tabsInfo, (tab) => !tab.isDefault);
    }
    shouldExportParagraphProperties(subDocument, section, paragraph) {
        const props = paragraph.maskedParagraphProperties;
        return props.getUseValue(ParagraphPropertiesMask.UseAlignment) ||
            props.getUseValue(ParagraphPropertiesMask.UseFirstLineIndent) ||
            props.getUseValue(ParagraphPropertiesMask.UseLeftIndent) ||
            props.getUseValue(ParagraphPropertiesMask.UseRightIndent) ||
            props.getUseValue(ParagraphPropertiesMask.UseLineSpacing) ||
            props.getUseValue(ParagraphPropertiesMask.UseSpacingAfter) ||
            props.getUseValue(ParagraphPropertiesMask.UseSpacingBefore) ||
            props.getUseValue(ParagraphPropertiesMask.UseSuppressHyphenation) ||
            props.getUseValue(ParagraphPropertiesMask.UseSuppressLineNumbers) ||
            props.getUseValue(ParagraphPropertiesMask.UseContextualSpacing) ||
            props.getUseValue(ParagraphPropertiesMask.UseRightToLeft) ||
            props.getUseValue(ParagraphPropertiesMask.UsePageBreakBefore) ||
            props.getUseValue(ParagraphPropertiesMask.UseBeforeAutoSpacing) ||
            props.getUseValue(ParagraphPropertiesMask.UseAfterAutoSpacing) ||
            props.getUseValue(ParagraphPropertiesMask.UseKeepWithNext) ||
            props.getUseValue(ParagraphPropertiesMask.UseKeepLinesTogether) ||
            props.getUseValue(ParagraphPropertiesMask.UseWidowOrphanControl) ||
            props.getUseValue(ParagraphPropertiesMask.UseOutlineLevel) ||
            props.getUseValue(ParagraphPropertiesMask.UseShadingInfoIndex) ||
            props.getUseValue(ParagraphPropertiesMask.UseLeftBorder) ||
            props.getUseValue(ParagraphPropertiesMask.UseRightBorder) ||
            props.getUseValue(ParagraphPropertiesMask.UseTopBorder) ||
            props.getUseValue(ParagraphPropertiesMask.UseBottomBorder) ||
            props.getUseValue(ParagraphPropertiesMask.UseBetweenBorder) ||
            props.getUseValue(ParagraphPropertiesMask.UseDivId) ||
            paragraph.paragraphStyle.styleName != ParagraphStyle.normalStyleName ||
            this.data.charPropsExporter.shouldExportRunProperties(subDocument.getRunByPosition(paragraph.getEndPosition() - 1)) ||
            paragraph.isInList() ||
            this.shouldExportSectionProperties(subDocument, section, paragraph) ||
            this.shouldExportTabProperties(paragraph.tabs);
    }
    shouldExportSectionProperties(subDocument, section, paragraph) {
        return subDocument.isMain() &&
            paragraph.getEndPosition() == section.getEndPosition() &&
            paragraph != ListUtils.last(subDocument.paragraphs);
    }
}
