import { DocumentModel } from '../document-model';
import { MaskedParagraphProperties, ParagraphProperties, ParagraphPropertiesMask } from '../paragraph/paragraph-properties';
import { ParagraphStyle } from '../paragraph/paragraph-style';
import { TableCell } from '../tables/main-structures/table-cell';
import { PropertiesMergerBase } from './properties-merger-base';
export declare class ParagraphPropertiesMerger extends PropertiesMergerBase<ParagraphPropertiesMask, ParagraphProperties, MaskedParagraphProperties> {
    static fields: import("../paragraph/paragraph-property-descriptors").IParagraphPropertyDescriptor<any>[];
    constructor();
    mergeMaskedParagraphProperties(maskedParagraphProperties: MaskedParagraphProperties): void;
    mergeOnlyOwnCharacterProperties(sourceProperties: MaskedParagraphProperties, parentProperties: MaskedParagraphProperties): void;
    mergeParagraphStyle(paragraphStyle: ParagraphStyle): void;
    mergeParagraphStyleConsiderNumbering(paragraphStyle: ParagraphStyle, model: DocumentModel): void;
    mergeTableStyle(tableCell: TableCell): void;
    getMergedProperties(): ParagraphProperties;
    private merge;
}
//# sourceMappingURL=paragraph-properties-merger.d.ts.map