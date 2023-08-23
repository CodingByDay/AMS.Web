import { Data } from './data';
import { CorePropertiesExporter } from './exporters/core-properties';
import { NumberingsExporter } from './exporters/numberings';
import { CoreRelationsExporter } from './exporters/relations/core-relations';
import { SettingsExporter } from './exporters/settings';
import { StylesExporter } from './exporters/styles';
import { HeaderFooterSubDocumentExporter } from './exporters/sub-document/header-footer-sub-document-exporter';
import { MainSubDocumentExporter } from './exporters/sub-document/main-sub-document';
import { ThemeExporter } from './exporters/theme';
export class DocxExporter {
    constructor(modelManipulator, options) {
        this.modelManipulator = modelManipulator;
        this.options = options;
        this.data = new Data(modelManipulator.model, options);
    }
    exportToBlob(callback) {
        this.modelManipulator.picture.loader.ensureAllPicturesLoaded(this.options.ensurePictureLoadedTimeout, (_loaded) => {
            this.exportInner();
            this.data.zipBuilder.generateBlob(callback);
        });
    }
    exportToBase64(callback) {
        this.modelManipulator.picture.loader.ensureAllPicturesLoaded(this.options.ensurePictureLoadedTimeout, (_loaded) => {
            this.exportInner();
            this.data.zipBuilder.generateBase64(callback);
        });
    }
    exportInner() {
        new CorePropertiesExporter(this.data).export();
        this.exportCustomProperties();
        new MainSubDocumentExporter(this.data, this.data.model.mainSubDocument, 'word/document.xml').export();
        for (let subDocument; subDocument = this.data.exportSubDocumentsList.pop();) {
            const baseFileName = `${subDocument.isHeader() ? 'header' : 'footer'}${subDocument.id}.xml`;
            new HeaderFooterSubDocumentExporter(this.data, subDocument, `word/${baseFileName}`, `word/_rels/${baseFileName}.rels`).export();
        }
        new StylesExporter(this.data).export();
        new NumberingsExporter(this.data).export();
        new SettingsExporter(this.data).export();
        this.exportFootNotesAndEndNotes();
        this.exportComments();
        this.exportWebSettings();
        new ThemeExporter(this.data).export();
        new CoreRelationsExporter(this.data).export();
        this.data.popRelationExporter();
        this.data.contentTypesExporter.export();
    }
    exportCustomProperties() {
    }
    exportFootNotesAndEndNotes() {
    }
    exportComments() {
    }
    exportWebSettings() {
    }
}
