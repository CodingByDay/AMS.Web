import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { RelationCollectionExporter } from '../relations/relation-collection';
import { BaseSubDocumentExporter } from './base-sub-document';
export class HeaderFooterSubDocumentExporter extends BaseSubDocumentExporter {
    constructor(data, subDocument, filePath, relsFilePath) {
        super(data, subDocument, filePath);
        this.relsFilePath = relsFilePath;
    }
    get rootElement() { return this.subDocument.isHeader() ? 'hdr' : 'ftr'; }
    createRelationExporter() { return new RelationCollectionExporter(this.data, this.relsFilePath); }
    fillWriterCore() {
        this.init();
        this.exportSection(this.data.model.sections[0], new FixedInterval(0, this.subDocument.getDocumentEndPosition()));
    }
}
