import { DocumentImporterErrors } from '../core/formats/document-importer-errors';
import { FormatImagesImporter } from '../core/formats/utils/images-import';
import { ModelCreator } from '../core/model/creator/creator';
import { ModelCreatorOptions } from '../core/model/creator/options';
import { ModelChecker } from '../core/model/model-checks/check-all';
import { Paragraph } from '../core/model/paragraph/paragraph';
import { RichUtils } from '../core/model/rich-utils';
import { ParagraphRun } from '../core/model/runs/simple-runs';
import { TextRun } from '../core/model/runs/text-run';
import { MaskedCharacterPropertiesBundle } from '../core/rich-utils/properties-bundle';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
export class TxtImporter {
    importFromFile(blob, modelOptions, callback, reject) {
        this.reject = reject;
        this.createModel(modelOptions);
        const reader = new FileReader();
        reader.onload = () => {
            this.importFromString(reader.result, modelOptions, callback, reject);
        };
        reader.onerror = (_ev) => {
            this.reject(DocumentImporterErrors.TxtFileReaderError);
        };
        reader.readAsText(blob);
    }
    importFromString(text, modelOptions, callback, reject, charPropsBundle, parPropsBundle) {
        this.createModel(modelOptions);
        try {
            this.fillModel(this.model, text, charPropsBundle, parPropsBundle);
            if (!new ModelChecker(this.model).checkAll())
                throw new Error();
        }
        catch (err) {
            reject(DocumentImporterErrors.TxtImportError);
            return;
        }
        callback(this.model, this.formatImagesImporter);
    }
    createModel(modelOptions) {
        const options = new ModelCreatorOptions();
        options.addParagraph = false;
        this.formatImagesImporter = new FormatImagesImporter();
        this.model = new ModelCreator(options).createModel(modelOptions).fillModel();
    }
    static splitByLines(text) {
        return text ? text.split(/\r\n|\r|\n/) : [''];
    }
    fillModel(model, text, charPropsBundle, parPropsBundle) {
        const lines = TxtImporter.splitByLines(text);
        const sd = model.mainSubDocument;
        const runs = sd.chunks[0].textRuns;
        let defCharStyle = this.model.stylesManager.getDefaultCharacterStyle();
        let defParStyle = this.model.stylesManager.getDefaultParagraphStyle();
        let defCharProps = model.cache.maskedCharacterPropertiesCache.getItem(ModelCreator.createTemplateCharProps(model));
        let defParProps = model.cache.maskedParagraphPropertiesCache.getItem(ModelCreator.createTemplateParProps());
        if (charPropsBundle) {
            defCharStyle = charPropsBundle.style;
            defCharProps = charPropsBundle.props;
        }
        else {
            defCharStyle = this.model.stylesManager.getDefaultCharacterStyle();
            defCharProps = model.cache.maskedCharacterPropertiesCache.getItem(ModelCreator.createTemplateCharProps(model));
        }
        if (parPropsBundle) {
            defParStyle = parPropsBundle.style;
            defParProps = parPropsBundle.props;
        }
        else {
            defParStyle = this.model.stylesManager.getDefaultParagraphStyle();
            defParProps = model.cache.maskedParagraphPropertiesCache.getItem(ModelCreator.createTemplateParProps());
        }
        let parStartPos = 0;
        lines.forEach((line) => {
            const par = new Paragraph(sd, sd.positionManager.registerPosition(parStartPos), 0, defParStyle, defParProps);
            sd.paragraphs.push(par);
            const textLen = line.length;
            if (textLen)
                runs.push(new TextRun(parStartPos, textLen, par, new MaskedCharacterPropertiesBundle(defCharProps, defCharStyle)));
            runs.push(new ParagraphRun(parStartPos + textLen, par, new MaskedCharacterPropertiesBundle(defCharProps, defCharStyle)));
            par.length = 1 + textLen;
            parStartPos += par.length;
        });
        sd.chunks[0].textBuffer = lines.join(RichUtils.specialCharacters.ParagraphMark) + RichUtils.specialCharacters.ParagraphMark;
        model.sections[0].setLength(sd, ListUtils.last(sd.paragraphs).getEndPosition());
    }
}
