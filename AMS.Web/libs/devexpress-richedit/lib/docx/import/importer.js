import { __awaiter } from "tslib";
import { DocumentImporterErrors } from '../../core/formats/document-importer-errors';
import { SectionRestorer } from '../../core/formats/model-restorer/section-restorer';
import { TableRestorer } from '../../core/formats/model-restorer/table-restorer';
import { ModelCreator } from '../../core/model/creator/creator';
import { ModelCreatorOptions } from '../../core/model/creator/options';
import { CompatibilityMode } from '../../core/model/document-model';
import { ModelChecker } from '../../core/model/model-checks/check-all';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringMapUtils } from '@devexpress/utils/lib/utils/map/string';
import { PathHelper } from '../utils/path-helper';
import { ArchiveData } from '../zip/zip-reader';
import { Data } from './data';
import { DocumentDestination } from './destination/document/document-destination';
import { NumberingsDestination } from './destination/numbering/numberings-destination';
import { DocumentSettingsDestination } from './destination/settings/settings';
import { StylesDestination } from './destination/style/styles-destination';
import { OfficeThemeDestination } from './destination/themes/office-theme-destination';
export class Importer {
    constructor(options) {
        this.asyncImportFromFile = true;
        this.options = options;
    }
    importFromFile(blob, modelOptions, callback, reject) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reject = reject;
            this.callback = callback;
            const modelCreatorOptions = new ModelCreatorOptions();
            modelCreatorOptions.addParagraph = false;
            modelCreatorOptions.addSection = false;
            try {
                const archiveData = new ArchiveData(this.options);
                yield archiveData.init(blob);
                this.data = new Data(this.options, archiveData, new ModelCreator(modelCreatorOptions).createModel(modelOptions).fillModel());
                if (!blob.size)
                    throw new Error("Empty file");
                yield this.importRootRelations();
                yield this.importMainSubDocument();
                TableRestorer.paragraphMarkBetween(this.data.documentModel);
                TableRestorer.fixAllTables(this.data.documentModel);
                SectionRestorer.fixLastSection(this.data.documentModel);
                TableRestorer.fixLastParagraphs(this.data.documentModel);
                if (!new ModelChecker(this.data.documentModel).checkAll())
                    throw new Error();
            }
            catch (err) {
                this.reject(DocumentImporterErrors.OpenXmlImportError);
                return;
            }
            this.callback(this.data.documentModel, this.data.formatImagesImporter);
        });
    }
    importRootRelations() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.data.addRelations('_rels/.rels');
        });
    }
    importMainSubDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            const documentFileName = this.data.relationsStack.last.lookupRelationTargetByType(this.data.constants.rels.officeDocumentType, '', 'document.xml');
            this.data.documentRootFolder = PathHelper.getDir(documentFileName);
            yield this.data.addRelations(`${this.data.documentRootFolder}/_rels/${PathHelper.getFileName(documentFileName)}.rels`);
            yield this.importSettings();
            yield this.importThemes();
            yield this.importNumbering();
            yield this.importStyles();
            this.linkNumberingListStyles();
            const documentReader = yield this.data.archiveData.getXmlReader(documentFileName);
            if (documentReader.readToFollowingNS('document', this.data.constants.wordProcessingNamespaceConst)) {
                yield this.data.importContent(documentReader, new DocumentDestination(this.data));
                this.data.sectionImporter.finishSection();
                this.data.popCurrentSubDocument();
            }
            else {
                this.data.options.throwInvalidFile('Not found document element');
            }
            this.data.relationsStack.pop();
        });
    }
    importStyles() {
        return __awaiter(this, void 0, void 0, function* () {
            const styleFileName = this.data.relationsStack.last.lookupRelationTargetByType(this.data.constants.rels.officeStylesType, this.data.documentRootFolder, 'styles.xml');
            const stylesReader = yield this.data.archiveData.getXmlReader(styleFileName);
            if (stylesReader && stylesReader.readToFollowingNS('styles', this.data.constants.wordProcessingNamespaceConst)) {
                this.data.stylesImporter.presetDefaultStyles();
                yield this.data.importContent(stylesReader, new StylesDestination(this.data));
                this.data.stylesImporter.determineParents();
                this.data.stylesImporter.linkStyles();
            }
            else {
                this.data.options.throwInvalidFile('Not found style element');
            }
        });
    }
    importThemes() {
        return __awaiter(this, void 0, void 0, function* () {
            const themeFileName = this.data.relationsStack.last.lookupRelationTargetByType(this.data.constants.rels.officeThemesType, this.data.documentRootFolder, 'theme/theme1.xml');
            yield this.data.addRelations(`${this.data.documentRootFolder}/_rels/theme/theme1.xml.rels`);
            const themesReader = yield this.data.archiveData.getXmlReader(themeFileName);
            if (themesReader && themesReader.readToFollowingNS('theme', this.data.constants.drawingMLNamespaceConst))
                yield this.data.importContent(themesReader, new OfficeThemeDestination(this.data));
            this.data.relationsStack.pop();
        });
    }
    importNumbering() {
        return __awaiter(this, void 0, void 0, function* () {
            const numberingFileName = this.data.relationsStack.last.lookupRelationTargetByType(this.data.constants.rels.officeNumberingType, this.data.documentRootFolder, 'numbering.xml');
            const numberingReader = yield this.data.archiveData.getXmlReader(numberingFileName);
            if (numberingReader && numberingReader.readToFollowingNS('numbering', this.data.constants.wordProcessingNamespaceConst))
                yield this.data.importContent(numberingReader, new NumberingsDestination(this.data));
            this.data.stylesImporter.createNumberingLists(this.data.documentModel);
        });
    }
    importSettings() {
        return __awaiter(this, void 0, void 0, function* () {
            this.data.documentModel.compatibilitySettings.compatibilityMode = CompatibilityMode.Word2007;
            const fileName = this.data.relationsStack.last.lookupRelationTargetByType(this.data.constants.rels.officeDocumentSettings, this.data.documentRootFolder, 'settings.xml');
            const reader = yield this.data.archiveData.getXmlReader(fileName);
            if (reader && reader.readToFollowingNS('settings', this.data.constants.wordProcessingNamespaceConst))
                yield this.data.importContent(reader, new DocumentSettingsDestination(this.data));
        });
    }
    linkNumberingListStyles() {
        StringMapUtils.forEach(this.data.stylesImporter.abstractListInfos, (info) => {
            if (info.numberingStyleReferenceIndex != null) {
                const abstractNumList = this.data.documentModel.abstractNumberingLists[info.abstractNumberingIndex];
                const style = this.data.stylesImporter.numberingListManager.getStyleById(info.numberingStyleReferenceIndex);
                const abstractRefNumList = this.data.documentModel.abstractNumberingLists[this.data.documentModel.numberingLists[style.numberingListIndex].abstractNumberingListIndex];
                ListUtils.forEach(abstractNumList.levels, (level, index) => {
                    level.copyFrom(abstractRefNumList.levels[index]);
                });
            }
        });
    }
}
