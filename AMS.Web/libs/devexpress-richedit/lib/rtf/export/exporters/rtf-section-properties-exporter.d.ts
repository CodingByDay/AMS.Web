import { Section } from '../../../core/model/section/section';
import { SectionColumnProperties } from '../../../core/model/section/section-column-properties';
import { SectionProperties } from '../../../core/model/section/section-properties';
import { Margins } from '@devexpress/utils/lib/geometry/margins';
import { RtfPropertiesExporter } from './rtf-properties-exporter';
import { LineNumberingProperties } from '../../../core/model/section/line-numbering-properties';
export declare class RtfSectionPropertiesExporter extends RtfPropertiesExporter {
    exportSectionProperties(section: Section): void;
    exportSectionPageNumbering(properties: SectionProperties): void;
    exportSectionMargins(margins: Margins): void;
    exportSectionOffsets(properties: SectionProperties): void;
    exportSectionPage(properties: SectionProperties): void;
    exportSectionGeneralSettings(properties: SectionProperties): void;
    exportSectionColumns(properties: SectionProperties): void;
    exportSectionColumnsDetails(columns: SectionColumnProperties[]): void;
    exportSectionColumn(column: SectionColumnProperties, columnIndex: number): void;
    writeEnumValueCommand(table: Record<number, string>, value: number, defaultCommand: string): void;
    exportSectionLineNumbering(lineNumbering: LineNumberingProperties): void;
    private exportLineNumberRestartType;
}
//# sourceMappingURL=rtf-section-properties-exporter.d.ts.map