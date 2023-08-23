import { Errors } from '@devexpress/utils/lib/errors';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { BaseSubDocumentExporter } from './base-sub-document';
export class TextBoxSubDocumentExporter extends BaseSubDocumentExporter {
    get rootElement() { throw new Error(Errors.NotImplemented); }
    constructor(data, subDocument) {
        super(data, subDocument, '');
    }
    exportTextBoxContent() {
        this.data.subDocumentExporterStack.push(this);
        this.fillWriterCore();
        this.data.subDocumentExporterStack.pop();
    }
    createRelationExporter() { throw new Error(Errors.NotImplemented); }
    fillWriter() { throw new Error(Errors.NotImplemented); }
    fillWriterCore() {
        this.init();
        this.exportSection(this.data.model.sections[0], new FixedInterval(0, this.subDocument.getDocumentEndPosition()));
    }
}
