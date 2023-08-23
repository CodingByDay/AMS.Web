import { EnumUtils } from '@devexpress/utils/lib/utils/enum';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { MaskedParagraphProperties, ParagraphProperties, ParagraphPropertiesMask, ParagraphPropertyDescriptor } from '../paragraph/paragraph-properties';
import { TableStyleParagraphPropertiesMergerAfterAutoSpacing, TableStyleParagraphPropertiesMergerAlignment, TableStyleParagraphPropertiesMergerBeforeAutoSpacing, TableStyleParagraphPropertiesMergerBetweenBorder, TableStyleParagraphPropertiesMergerBottomBorder, TableStyleParagraphPropertiesMergerContextualSpacing, TableStyleParagraphPropertiesMergerDivId, TableStyleParagraphPropertiesMergerFirstLineIndent, TableStyleParagraphPropertiesMergerFirstLineIndentType, TableStyleParagraphPropertiesMergerKeepLinesTogether, TableStyleParagraphPropertiesMergerKeepWithNext, TableStyleParagraphPropertiesMergerLeftBorder, TableStyleParagraphPropertiesMergerLeftIndent, TableStyleParagraphPropertiesMergerLineSpacing, TableStyleParagraphPropertiesMergerLineSpacingType, TableStyleParagraphPropertiesMergerOutlineLevel, TableStyleParagraphPropertiesMergerPageBreakBefore, TableStyleParagraphPropertiesMergerRightBorder, TableStyleParagraphPropertiesMergerRightIndent, TableStyleParagraphPropertiesMergerRightToLeft, TableStyleParagraphPropertiesMergerShadingInfo, TableStyleParagraphPropertiesMergerSpacingAfter, TableStyleParagraphPropertiesMergerSpacingBefore, TableStyleParagraphPropertiesMergerSuppressHyphenation, TableStyleParagraphPropertiesMergerSuppressLineNumbers, TableStyleParagraphPropertiesMergerTopBorder, TableStyleParagraphPropertiesMergerWidowOrphanControl } from '../tables/properties-mergers/table-style-paragraph-properties-merger';
import { PropertiesMergerBase } from './properties-merger-base';
export class ParagraphPropertiesMerger extends PropertiesMergerBase {
    constructor() {
        super(new MaskedParagraphProperties(), ParagraphPropertiesMerger.fields);
    }
    mergeMaskedParagraphProperties(maskedParagraphProperties) {
        this.merge(maskedParagraphProperties);
    }
    mergeOnlyOwnCharacterProperties(sourceProperties, parentProperties) {
        this.mergeOnlyOwnProperties(sourceProperties, parentProperties);
        this.mergeOnlyOwnInternal(sourceProperties, parentProperties, ParagraphPropertiesMask.UseFirstLineIndent, () => {
            this.innerProperties.firstLineIndent = sourceProperties.firstLineIndent;
            this.innerProperties.firstLineIndentType = sourceProperties.firstLineIndentType;
        }, () => {
            return sourceProperties.firstLineIndent == parentProperties.firstLineIndent &&
                sourceProperties.firstLineIndentType == parentProperties.firstLineIndentType;
        });
        this.mergeOnlyOwnInternal(sourceProperties, parentProperties, ParagraphPropertiesMask.UseLineSpacing, () => {
            this.innerProperties.lineSpacing = sourceProperties.lineSpacing;
            this.innerProperties.lineSpacingType = sourceProperties.lineSpacingType;
        }, () => {
            return sourceProperties.lineSpacing == parentProperties.lineSpacing &&
                sourceProperties.lineSpacingType == parentProperties.lineSpacingType;
        });
    }
    mergeParagraphStyle(paragraphStyle) {
        let currentParagraphStyle = paragraphStyle;
        while (currentParagraphStyle) {
            this.merge(currentParagraphStyle.maskedParagraphProperties);
            currentParagraphStyle = currentParagraphStyle.parent;
        }
    }
    mergeParagraphStyleConsiderNumbering(paragraphStyle, model) {
        let currentParagraphStyle = paragraphStyle;
        while (currentParagraphStyle) {
            this.merge(currentParagraphStyle.maskedParagraphProperties);
            if (currentParagraphStyle.isInOwnList())
                this.merge(currentParagraphStyle.getListLevel(model).getParagraphProperties());
            currentParagraphStyle = currentParagraphStyle.parent;
        }
    }
    mergeTableStyle(tableCell) {
        const tableStyle = tableCell.parentRow.parentTable.style;
        const fakeContainer = new MaskedParagraphProperties();
        fakeContainer.useValue = ParagraphPropertiesMask.UseNone;
        this.mergeTableProperties(ParagraphPropertyDescriptor.alignment, () => new TableStyleParagraphPropertiesMergerAlignment().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.shadingInfo, () => new TableStyleParagraphPropertiesMergerShadingInfo().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.leftIndent, () => new TableStyleParagraphPropertiesMergerLeftIndent().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.rightIndent, () => new TableStyleParagraphPropertiesMergerRightIndent().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.topBorder, () => new TableStyleParagraphPropertiesMergerTopBorder().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.keepWithNext, () => new TableStyleParagraphPropertiesMergerKeepWithNext().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.outlineLevel, () => new TableStyleParagraphPropertiesMergerOutlineLevel().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.spacingAfter, () => new TableStyleParagraphPropertiesMergerSpacingAfter().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.leftBorder, () => new TableStyleParagraphPropertiesMergerLeftBorder().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.spacingBefore, () => new TableStyleParagraphPropertiesMergerSpacingBefore().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.rightBorder, () => new TableStyleParagraphPropertiesMergerRightBorder().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.bottomBorder, () => new TableStyleParagraphPropertiesMergerBottomBorder().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.betweenBorder, () => new TableStyleParagraphPropertiesMergerBetweenBorder().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.pageBreakBefore, () => new TableStyleParagraphPropertiesMergerPageBreakBefore().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.afterAutoSpacing, () => new TableStyleParagraphPropertiesMergerAfterAutoSpacing().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.keepLinesTogether, () => new TableStyleParagraphPropertiesMergerKeepLinesTogether().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.beforeAutoSpacing, () => new TableStyleParagraphPropertiesMergerBeforeAutoSpacing().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.contextualSpacing, () => new TableStyleParagraphPropertiesMergerContextualSpacing().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.widowOrphanControl, () => new TableStyleParagraphPropertiesMergerWidowOrphanControl().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.suppressHyphenation, () => new TableStyleParagraphPropertiesMergerSuppressHyphenation().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.suppressLineNumbers, () => new TableStyleParagraphPropertiesMergerSuppressLineNumbers().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.firstLineIndent, () => new TableStyleParagraphPropertiesMergerFirstLineIndent().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.firstLineIndentType, () => new TableStyleParagraphPropertiesMergerFirstLineIndentType().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.lineSpacing, () => new TableStyleParagraphPropertiesMergerLineSpacing().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.lineSpacingType, () => new TableStyleParagraphPropertiesMergerLineSpacingType().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.divId, () => new TableStyleParagraphPropertiesMergerDivId().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
        this.mergeTableProperties(ParagraphPropertyDescriptor.rightToLeft, () => new TableStyleParagraphPropertiesMergerRightToLeft().getProperty(fakeContainer, tableStyle, tableCell.conditionalFormatting, null));
    }
    getMergedProperties() {
        const result = new ParagraphProperties();
        result.copyFrom(this.innerProperties);
        return result;
    }
    merge(properties) {
        if (!properties)
            return;
        this.mergeAll(properties);
        this.mergeInternal(properties, ParagraphPropertiesMask.UseFirstLineIndent, () => {
            this.innerProperties.firstLineIndent = properties.firstLineIndent;
            this.innerProperties.firstLineIndentType = properties.firstLineIndentType;
        });
        this.mergeInternal(properties, ParagraphPropertiesMask.UseLineSpacing, () => {
            this.innerProperties.lineSpacing = properties.lineSpacing;
            this.innerProperties.lineSpacingType = properties.lineSpacingType;
        });
    }
}
ParagraphPropertiesMerger.fields = ListUtils.reducedMap(ParagraphPropertyDescriptor.ALL_FIELDS, (f) => EnumUtils.isAnyOf(f.maskValue(), ParagraphPropertiesMask.UseFirstLineIndent, ParagraphPropertiesMask.UseLineSpacing) ? null : f);
