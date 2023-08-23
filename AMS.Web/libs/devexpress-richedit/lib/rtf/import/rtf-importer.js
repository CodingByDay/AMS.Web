import { DocumentImporterErrors } from '../../core/formats/document-importer-errors';
import { ModelCreator } from '../../core/model/creator/creator';
import { ModelCreatorOptions } from '../../core/model/creator/options';
import { CompatibilityMode } from '../../core/model/document-model';
import { ModelChecker } from '../../core/model/model-checks/check-all';
import { ChunkedText } from '@devexpress/utils/lib/class/chunked-text';
import { RtfImportData } from './rtf-import-data';
export class RtfImporter {
    constructor(options) {
        this.options = options;
    }
    importFromFile(blob, modelOptions, callback, reject) {
        const reader = new FileReader();
        reader.onload = () => {
            this.importFromString(reader.result, modelOptions, callback, reject);
        };
        reader.onerror = (_ev) => {
            reject(DocumentImporterErrors.RtfFileReaderError);
        };
        reader.readAsText(blob);
    }
    importFromString(rtfText, modelOptions, callback, reject) {
        this.modelOptions = modelOptions;
        try {
            this.importFromStringInner(new ChunkedText(rtfText, 100000));
            if (!new ModelChecker(this.data.documentModel).checkAll())
                throw new Error();
        }
        catch (err) {
            reject(DocumentImporterErrors.RtfImportError);
            return;
        }
        callback(this.data.documentModel, this.data.formatImagesImporter);
    }
    importFromStringInner(rtfText) {
        this.rtfText = rtfText;
        rtfText.resetToStart();
        this.checkSignature(this.rtfText);
        const modelCreatorOptions = new ModelCreatorOptions();
        modelCreatorOptions.addParagraph = false;
        modelCreatorOptions.addSection = true;
        this.data = new RtfImportData(this.rtfText, this.options, new ModelCreator(modelCreatorOptions).createModel(this.modelOptions).fillModel(), this.modelOptions.control);
        this.data.documentModel.compatibilitySettings.compatibilityMode = CompatibilityMode.Word2003;
        this.data.import();
        return this.data.documentModel;
    }
    checkSignature(rtfText) {
        const sign = "{\\rtf";
        for (let ind = 0; ind < sign.length; ind++) {
            if (!rtfText.moveToNextChar() || sign[ind] != rtfText.currChar) {
                this.options.throwInvalidFile('Incorrect rtf signature');
            }
        }
        rtfText.resetToStart();
    }
}
