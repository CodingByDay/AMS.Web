import { Stack } from '@devexpress/utils/lib/class/stack';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { DocxConstants } from '../utils/constants';
import { ZipBuilder } from '../zip/zip-builder';
import { CharacterPropertiesExporter } from './exporters/base/character-properties';
import { ColorExporter } from './exporters/base/color';
import { ParagraphPropertiesExporter } from './exporters/base/paragraph-properties';
import { CharacterStyleExporter } from './exporters/base/styles/character-style';
import { NumberingStyleExporter } from './exporters/base/styles/numbering-style';
import { ParagraphStyleExporter } from './exporters/base/styles/paragraph-style';
import { TableStyleExporter } from './exporters/base/styles/table-style';
import { TablePropertiesExporter } from './exporters/base/table/table-properties';
import { TableWidthExporter } from './exporters/base/table/width-exporter';
import { TextExporter } from './exporters/base/text';
import { ContentTypesExporter } from './exporters/content-types';
import { StylesExporter } from './exporters/styles';
import { TextBoxSubDocumentExporter } from './exporters/sub-document/text-box-content-exporter';
import { IdGenerator } from './utils/id-generator';
import { WriterHelper } from './utils/writer-helper';
export class Data {
    constructor(model, options) {
        this.drawingElementId = 1;
        this.exportSubDocumentsList = [];
        this.relationExporters = [];
        this.model = model;
        this.options = options;
        this.constants = new DocxConstants();
        this.writerStack = new Stack();
        this.zipBuilder = new ZipBuilder();
        this.writerHelper = new WriterHelper();
        this.idGenerator = new IdGenerator();
        this.subDocumentExporterStack = new Stack();
        this.relationExporters = [];
        this.tableWidthExporter = new TableWidthExporter(this);
        this.charPropsExporter = new CharacterPropertiesExporter(this);
        this.parPropsExporter = new ParagraphPropertiesExporter(this);
        this.tablePropsExporter = new TablePropertiesExporter(this);
        this.colorExporter = new ColorExporter(this);
        this.parStyleExporter = new ParagraphStyleExporter(this);
        this.charStyleExporter = new CharacterStyleExporter(this);
        this.tblStyleExporter = new TableStyleExporter(this);
        this.numberingStyleExporter = new NumberingStyleExporter(this);
        this.textExporter = new TextExporter(this);
        this.styleExporter = new StylesExporter(this);
        this.contentTypesExporter = new ContentTypesExporter(this);
        this.exportedImageTable = {};
    }
    get writer() { return this.writerStack.last; }
    set writer(val) { this.writerStack.push(val); }
    get subDocumentExporter() { return this.subDocumentExporterStack.last; }
    get relationExporter() { return ListUtils.last(this.relationExporters); }
    get mainSubDocumentRelations() { return this.relationExporters[0]; }
    popWriter() { this.writerStack.pop(); }
    pushRelationExporter(exporter) { this.relationExporters.push(exporter); }
    popRelationExporter() { this.relationExporters.pop().export(); }
    createTextBoxExporter(subDoc) {
        return new TextBoxSubDocumentExporter(this, subDoc);
    }
    init() {
        this.headerCounter = 0;
        this.footerCounter = 0;
    }
}
