import { HeaderFooterType, SectionStartType } from '../../../../core/model/section/enums';
import { SectionProperties } from '../../../../core/model/section/section-properties';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { TranslationTables } from '../../../translation-table/translation-tables';
import { ContentType, DocxNsType } from '../../../utils/constants';
import { WriterHelper } from '../../utils/writer-helper';
import { BaseExporter } from '../base';
import { LineNumberDefaults } from '../../../../core/model/section/line-numbering-properties';
export class SectionExporter extends BaseExporter {
    static createDefaultProperties() {
        const props = new SectionProperties();
        props.pageSize = new Size(12240, 15840);
        props.landscape = false;
        props.equalWidthColumns = true;
        props.differentFirstPage = false;
        props.space = UnitConverter.hundredthsOfMillimeterToTwips(1250);
        return props;
    }
    exportProperties(section) {
        this.writer.writeWpStartElement('sectPr');
        this.exportSectionHeadersFootersCore(section);
        this.exportSectionPropertiesCore(section);
        this.writer.endElement();
    }
    exportHeaderFooter(collection, type) {
        const info = collection.getObject(type);
        if (info) {
            const subDocument = this.data.model.subDocuments[info.subDocumentId];
            this.data.exportSubDocumentsList.push(subDocument);
            const relationId = `${subDocument.isHeader() ? 'header' : 'footer'}${subDocument.id}`;
            const fileName = `${relationId}.xml`;
            this.data.contentTypesExporter.registerContentTypeOverride(`/word/${fileName}`, subDocument.isHeader() ? ContentType.header : ContentType.footer);
            (subDocument.isHeader() ?
                this.data.mainSubDocumentRelations.headerRelationsTable :
                this.data.mainSubDocumentRelations.footerRelationsTable)[relationId] = fileName;
            this.writer.writeWpStartElement(subDocument.isHeader() ? 'headerReference' : 'footerReference');
            this.writer.writeWpStringAttr('type', WriterHelper.getValueFromTables(TranslationTables.headerFooterTypeTable, type, HeaderFooterType.Odd));
            this.writer.attrNS(DocxNsType.Rels, 'id', relationId);
            this.writer.endElement();
        }
    }
    exportSectionHeadersFootersCore(section) {
        this.exportHeaderFooter(section.headers, HeaderFooterType.First);
        this.exportHeaderFooter(section.headers, HeaderFooterType.Even);
        this.exportHeaderFooter(section.headers, HeaderFooterType.Odd);
        this.exportHeaderFooter(section.footers, HeaderFooterType.First);
        this.exportHeaderFooter(section.footers, HeaderFooterType.Even);
        this.exportHeaderFooter(section.footers, HeaderFooterType.Odd);
    }
    exportSectionPropertiesCore(section) {
        const props = section.sectionProperties;
        this.writer.writeWpStringValue('type', WriterHelper.getValueFromTables(TranslationTables.sectionStartTypeTable, props.startType, SectionStartType.NextPage));
        this.exportSectionPage(props);
        this.exportSectionMargins(props);
        this.exportSectionLineNumbering(props);
        this.exportSectionPageNumbering(props);
        this.exportSectionColumns(props);
        this.exportSectionGeneralSettings(props);
    }
    exportSectionPage(props) {
        if (!this.shouldExportSectionPage(props))
            return;
        this.writer.writeWpStartElement('pgSz');
        if (props.pageSize.width != SectionExporter.defaultProps.pageSize.width)
            this.writer.writeWpIntAttr('w', props.pageSize.width);
        if (props.pageSize.height != SectionExporter.defaultProps.pageSize.height)
            this.writer.writeWpIntAttr('h', props.pageSize.height);
        if (props.landscape)
            this.writer.writeWpStringAttr('orient', props.landscape ? 'landscape' : 'portrait');
        this.writer.endElement();
    }
    shouldExportSectionPage(props) {
        return !props.pageSize.equals(SectionExporter.defaultProps.pageSize) ||
            props.landscape != SectionExporter.defaultProps.landscape;
    }
    exportSectionMargins(props) {
        this.writer.writeWpStartElement('pgMar');
        this.writer.writeWpIntAttr('left', props.marginLeft);
        this.writer.writeWpIntAttr('right', props.marginRight);
        this.writer.writeWpIntAttr('top', props.marginTop);
        this.writer.writeWpIntAttr('bottom', props.marginBottom);
        this.writer.writeWpIntAttr('header', props.headerOffset);
        this.writer.writeWpIntAttr('footer', props.footerOffset);
        this.writer.endElement();
    }
    exportSectionLineNumbering(props) {
        const lineNumberProps = props.lineNumbering;
        if (!lineNumberProps.isDefined)
            return;
        this.writer.writeWpStartElement('lnNumType');
        this.writer.writeWpIntAttr("countBy", lineNumberProps.countBy);
        if (lineNumberProps.start !== LineNumberDefaults.start)
            this.writer.writeWpIntAttr("start", lineNumberProps.start - 1);
        if (lineNumberProps.distance !== LineNumberDefaults.distance)
            this.writer.writeWpIntAttr("distance", lineNumberProps.distance);
        if (lineNumberProps.restart !== LineNumberDefaults.restart) {
            const value = TranslationTables.lineNumberingRestartTable.exportMap[lineNumberProps.restart];
            if (value)
                this.writer.writeWpStringAttr("restart", value.mlValue.openXmlValue);
        }
        this.writer.endElement();
    }
    exportSectionPageNumbering(props) {
        if (!this.shouldExportPageNumbering(props))
            return;
        this.writer.writeWpStartElement("pgNumType");
        try {
            if (!props.continueNumbering)
                this.writer.writeWpIntAttr("start", props.firstPageNumber);
        }
        finally {
            this.writer.endElement();
        }
    }
    shouldExportPageNumbering(props) {
        return !props.continueNumbering;
    }
    exportSectionColumns(props) {
        if (!this.shouldExportSectionColumns(props))
            return;
        this.writer.writeWpStartElement('cols');
        this.writer.writeWpBoolAttr('equalWidth', props.equalWidthColumns);
        if (props.equalWidthColumns)
            this.exportEqualWidthColumns(props);
        else
            this.exportNonUniformColumns(props);
        this.writer.endElement();
    }
    shouldExportSectionColumns(props) {
        return props.equalWidthColumns != SectionExporter.defaultProps.equalWidthColumns ||
            props.columnCount != SectionExporter.defaultProps.columnCount ||
            props.space != SectionExporter.defaultProps.space;
    }
    exportEqualWidthColumns(props) {
        if (props.columnCount != SectionExporter.defaultProps.columnCount)
            this.writer.writeWpIntAttr('num', props.columnCount);
        if (props.space != SectionExporter.defaultProps.space)
            this.writer.writeWpIntAttr('space', props.space);
    }
    exportNonUniformColumns(props) {
        if (props.columnsInfo.length != SectionExporter.defaultProps.columnCount)
            this.writer.writeWpIntAttr('num', props.columnsInfo.length);
        for (const column of props.columnsInfo) {
            this.writer.writeWpStartElement('col');
            this.writer.writeWpIntAttr('w', column.width);
            this.writer.writeWpIntAttr('space', column.space);
            this.writer.endElement();
        }
    }
    exportSectionGeneralSettings(props) {
        if (props.differentFirstPage != SectionExporter.defaultProps.differentFirstPage)
            this.writer.writeWpBoolValue('titlePg', props.differentFirstPage);
    }
}
SectionExporter.defaultProps = SectionExporter.createDefaultProperties();
