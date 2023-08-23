import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { SimpleFormattersManager } from '@devexpress/utils/lib/formatters/manager';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { MaskedCharacterPropertiesBundle } from '../rich-utils/properties-bundle';
import { BorderInfo } from './borders/border-info';
import { BorderLineStyle } from './borders/enums';
import { DocumentCache } from './caches/caches';
import { MaskedCharacterProperties } from './character/character-properties';
import { Chunk } from './chunk';
import { ColorHelper } from './color/color';
import { ColorProvider } from './color/color-provider';
import { SubDocumentInfoType } from './enums';
import { DocumentProtectionType } from './json/enums/json-document-enums';
import { JSONMaskedCharacterPropertiesConverter } from './json/importers/json-masked-character-properties-converter';
import { JSONMaskedParagraphPropertiesConverter } from './json/importers/json-masked-paragraph-properties-converter';
import { NumberingListCountersCalculator } from './numbering-lists/numbering-list-counters-calculator';
import { AbstractNumberingListIdProvider, NumberingListIdProvider } from './numbering-lists/numbering-list-id-provider';
import { DocumentProtectionProperties } from './options/document-protection';
import { Paragraph } from './paragraph/paragraph';
import { MaskedParagraphProperties, ParagraphPropertiesMask } from './paragraph/paragraph-properties';
import { PasswordHashCodeCalculator } from './protection/password-hash-code-calculator';
import { RichUtils } from './rich-utils';
import { ParagraphRun } from './runs/simple-runs';
import { StylesManager } from './styles-manager';
import { SubDocument, SubDocumentInterval } from './sub-document';
import { SubDocumentInfoBase } from './sub-document-infos';
import { WebSettings } from './web-settings';
import { ModelComparer } from './model-checks/comparer';
import { FieldsWaitingForUpdate } from './fields/tree-creator';
import { FieldCodeParserHyperlink } from './fields/parsers/field-code-parser-hyperlink';
import { FindReplaceHelper, FindReplaceState, SearchDirection } from './find-replace-helper';
import { AnchoredPictureRun } from './runs/anchored-picture-run';
import { InlinePictureRun } from './runs/inline-picture-run';
import { SubDocumentCollection } from './sub-document-collection';
export class DocumentModel {
    constructor(modelOptions, subDocumentsIdCounter = 1) {
        this.mirrorMargins = false;
        this.aspxIsDocumentProtectionEnabled = false;
        this.sections = [];
        this.headers = [];
        this.footers = [];
        this.characterStyles = [];
        this.paragraphStyles = [];
        this.numberingListStyles = [];
        this.tableStyles = [];
        this.tableCellStyles = [];
        this.subDocumentsCollection = new SubDocumentCollection();
        this.abstractNumberingListTemplates = [];
        this.abstractNumberingLists = [];
        this.numberingLists = [];
        this.abstractNumberingListsIdProvider = new AbstractNumberingListIdProvider(this);
        this.numberingListsIdProvider = new NumberingListIdProvider(this);
        this.repositoryBorderItem = new BorderInfo();
        this.compatSettings = [];
        this.subDocumentsIdCounter = -1;
        this.loaded = false;
        this.documentProtectionProperties = new DocumentProtectionProperties();
        this.modelOptions = modelOptions;
        this.simpleFormattersManager = new SimpleFormattersManager(modelOptions.cultureOpts);
        this.cache = new DocumentCache();
        this.mainSubDocument = this.importSubDocument(SubDocumentInfoBase.create(SubDocumentInfoType.Main, SubDocument.MAIN_SUBDOCUMENT_ID, -1));
        this.stylesManager = new StylesManager(this);
        this.subDocumentsIdCounter = subDocumentsIdCounter;
        this.colorProvider = new ColorProvider(this.cache.colorModelInfoCache);
        this.initRepositoryBorderItem();
        this.webSettings = new WebSettings();
        this.compatibilitySettings = new CompatibilitySettings();
        this.docVariables = new DocumentVariables();
    }
    ;
    get subDocuments() {
        return this.subDocumentsCollection.filteredCollection;
    }
    get options() { return this.modelOptions.control; }
    ;
    get isDocumentProtectionEnabled() {
        const properties = this.documentProtectionProperties;
        return this.aspxIsDocumentProtectionEnabled ||
            (properties.enforceProtection && properties.protectionType != DocumentProtectionType.None);
    }
    setPageColor(value) {
        this.displayBackgroundShape = true;
        this.pageBackColor = value;
    }
    getAllBookmarks(getHiddenToo) {
        const result = [];
        NumberMapUtils.forEach(this.subDocuments, (subDoc) => {
            if (getHiddenToo)
                ListUtils.addListOnTail(result, subDoc.bookmarks);
            else
                ListUtils.forEach(subDoc.bookmarks, (bm) => {
                    if (!bm.isHidden())
                        result.push(bm);
                });
        });
        return result;
    }
    getAllImages() {
        const result = [];
        NumberMapUtils.forEach(this.subDocuments, (subDoc) => {
            NumberMapUtils.forEach(subDoc.chunks, (chunk) => {
                NumberMapUtils.forEach(chunk.textRuns, (run) => {
                    if (run instanceof AnchoredPictureRun || run instanceof InlinePictureRun)
                        result.push(run.cacheInfo);
                });
            });
        });
        return result;
    }
    initRepositoryBorderItem() {
        this.repositoryBorderItem.color = this.colorProvider.getModelColorFromRgba(ColorHelper.AUTOMATIC_COLOR);
        this.repositoryBorderItem.style = BorderLineStyle.Single;
        this.repositoryBorderItem.width = UnitConverter.pixelsToTwipsF(1);
    }
    getCharacterStyleByName(name) {
        return this.stylesManager.getCharacterStyleByName(name);
    }
    getParagraphStyleByName(name) {
        return this.stylesManager.getParagraphStyleByName(name);
    }
    getNumberingListStyleByName(name) {
        return this.stylesManager.getNumberingListStyleByName(name);
    }
    getTableStyleByName(name) {
        return this.stylesManager.getTableStyleByName(name);
    }
    getTableCellStyleByName(name) {
        return this.stylesManager.getTableCellStyleByName(name);
    }
    getDefaultCharacterStyle() {
        return this.stylesManager.getDefaultCharacterStyle();
    }
    getDefaultParagraphStyle() {
        return this.stylesManager.getDefaultParagraphStyle();
    }
    getDefaultTableStyle() {
        return this.stylesManager.getDefaultTableStyle();
    }
    getDefaultTableCellStyle() {
        return this.stylesManager.getDefaultTableCellStyle();
    }
    setDefaultCharacterProperties(obj) {
        const serverProps = JSONMaskedCharacterPropertiesConverter.convertFromJSON(obj, this.cache.colorModelInfoCache, this.cache.shadingInfoCache, this.cache.fontInfoCache);
        serverProps.setAllUse();
        this.defaultCharacterProperties = this.cache.maskedCharacterPropertiesCache.getItem(serverProps);
    }
    setDefaultParagraphProperties(obj) {
        const serverProps = JSONMaskedParagraphPropertiesConverter.convertFromJSON(obj, this.cache.colorModelInfoCache, this.cache.shadingInfoCache);
        serverProps.setUseValue(ParagraphPropertiesMask.UseAll, true);
        this.defaultParagraphProperties = this.cache.maskedParagraphPropertiesCache.getItem(serverProps);
    }
    getSectionsByInterval(interval) {
        var result = [], section;
        var endPosition = interval.end;
        var sectionIndex = SearchUtils.normedInterpolationIndexOf(this.sections, (s) => s.startLogPosition.value, interval.start);
        for (; section = this.sections[sectionIndex]; sectionIndex++) {
            if (section.startLogPosition.value > endPosition)
                break;
            result.push(section);
        }
        return result;
    }
    getSectionIndicesByIntervals(intervals) {
        let result = [];
        for (var i = 0, interval; interval = intervals[i]; i++) {
            let sectionIndex = SearchUtils.normedInterpolationIndexOf(this.sections, (s) => s.startLogPosition.value, interval.start);
            let intervalEnd = interval.end;
            result.push(sectionIndex++);
            for (let section; section = this.sections[sectionIndex]; sectionIndex++) {
                if (section.startLogPosition.value < intervalEnd)
                    result.push(sectionIndex);
                else
                    break;
            }
        }
        return ListUtils.uniqueNumber(result);
    }
    getSectionByPosition(position) {
        var sectionIndex = SearchUtils.normedInterpolationIndexOf(this.sections, (s) => s.startLogPosition.value, position);
        return this.sections[sectionIndex];
    }
    getCurrentLength() {
        var lastChunk = this.mainSubDocument.getLastChunk();
        var lastRun = lastChunk.textRuns[lastChunk.textRuns.length - 1];
        return lastChunk.startLogPosition.value + lastRun.startOffset + lastRun.getLength();
    }
    isLoaded() {
        if (this.loaded)
            return true;
        const lastChunk = this.mainSubDocument.getLastChunk();
        this.loaded = lastChunk ? lastChunk.isLast : false;
        return this.loaded;
    }
    getActualPageBackgroundColor() {
        if (!this.displayBackgroundShape)
            return ColorHelper.NO_COLOR;
        return this.pageBackColor;
    }
    getNumberingListIndexById(id) {
        for (var i = 0, numberingList; numberingList = this.numberingLists[i]; i++) {
            if (numberingList.getId() === id)
                return i;
        }
        return -1;
    }
    getAbstractNumberingListIndexById(id) {
        for (var i = 0, abstractNumberingList; abstractNumberingList = this.abstractNumberingLists[i]; i++) {
            if (abstractNumberingList.getId() === id)
                return i;
        }
        return -1;
    }
    getRangeListCounters(paragraph) {
        var calculator = new NumberingListCountersCalculator(paragraph.getAbstractNumberingList());
        return calculator.calculateCounters(paragraph);
    }
    resetMergedFormattingCache(type) {
        this.mainSubDocument.resetMergedFormattingCache(type);
    }
    getPreviousSection(section) {
        var sectionIndex = SearchUtils.normedInterpolationIndexOf(this.sections, s => s.startLogPosition.value, section.startLogPosition.value);
        return this.sections[sectionIndex - 1];
    }
    getNextSection(section) {
        var sectionIndex = SearchUtils.normedInterpolationIndexOf(this.sections, s => s.startLogPosition.value, section.startLogPosition.value);
        return this.sections[sectionIndex + 1];
    }
    importSubDocument(info) {
        return this.createSubDocumentInternal(info, true);
    }
    updateHyperlinkFields(processor, interval, newSubDocuments) {
        const subDocIntervals = [
            interval,
            ...newSubDocuments.map(s => new SubDocumentInterval(s, s.interval))
        ];
        NumberMapUtils.forEach(subDocIntervals, (subDocInterval) => {
            for (let field of subDocInterval.subDocument.fields) {
                if (subDocInterval.interval.containsInterval(field.getAllFieldInterval())) {
                    const fieldParser = FieldsWaitingForUpdate.getParser(processor.modelManager, processor.layoutFormatterManager, processor.createFieldRequestManager(), subDocInterval.subDocument, field);
                    if (fieldParser instanceof FieldCodeParserHyperlink && !field.getHyperlinkInfo()) {
                        fieldParser.parseCodeCurrentFieldInternal(null);
                    }
                }
            }
        });
    }
    createSubDocument(subDocumentInfoType, parentSubDocumentId, disableInit = false) {
        const id = this.subDocumentsIdCounter++;
        const info = SubDocumentInfoBase.create(subDocumentInfoType, id, parentSubDocumentId);
        if (info.getType() !== subDocumentInfoType)
            throw new Error("SubDocument.type doesn't equal to info.type");
        return this.createSubDocumentInternal(info, disableInit);
    }
    createSubDocumentInternal(info, disableInit) {
        if (this.subDocuments[info.subDocumentId])
            throw new Error("SubDocument with this ID already exists");
        const subDocument = new SubDocument(this, info);
        if (!disableInit)
            this.initNewSubDocument(subDocument);
        this.subDocumentsCollection.add(subDocument);
        return subDocument;
    }
    initNewSubDocument(subDocument) {
        subDocument.chunks = [new Chunk(subDocument.positionManager.registerPosition(0), "", true)];
        subDocument.paragraphs.push(new Paragraph(subDocument, subDocument.positionManager.registerPosition(0), 1, this.getDefaultParagraphStyle(), MaskedParagraphProperties.createDefault(this)));
        subDocument.chunks[0].textRuns.push(new ParagraphRun(0, subDocument.paragraphs[0], new MaskedCharacterPropertiesBundle(MaskedCharacterProperties.createDefault(this), this.getDefaultCharacterStyle())));
        subDocument.chunks[0].textBuffer = RichUtils.specialCharacters.ParagraphMark;
    }
    checkPasswordHash(hash, expectedHash) {
        if (expectedHash == null || expectedHash.length <= 0)
            return true;
        return PasswordHashCodeCalculator.compareByteArrays(hash, expectedHash);
    }
    checkLegacyDocumentProtectionPassword(calculator, password) {
        const hash = calculator.calculateLegacyPasswordHash(password);
        return this.checkPasswordHash(hash, this.documentProtectionProperties.word2003PasswordHash);
    }
    checkOpenXmlDocumentProtectionPassword(calculator, password) {
        const hash = calculator.calculatePasswordHash(password, this.documentProtectionProperties.passwordPrefix, this.documentProtectionProperties.hashIterationCount, this.documentProtectionProperties.hashAlgorithmType);
        return this.checkPasswordHash(hash, this.documentProtectionProperties.passwordHash);
    }
    checkDocumentProtectionPassword(password) {
        const calculator = new PasswordHashCodeCalculator();
        if (this.documentProtectionProperties.passwordPrefix && this.documentProtectionProperties.passwordHash)
            return this.checkOpenXmlDocumentProtectionPassword(calculator, password);
        this.checkLegacyDocumentProtectionPassword(calculator, password);
    }
    findAll(searchSettings) {
        const foundIntervals = [];
        const findReplaceHelper = new FindReplaceHelper(searchSettings.modelManager, searchSettings.formatterManager, searchSettings.pageIndex, searchSettings.subDocument, searchSettings.layout, searchSettings.storeSelection);
        findReplaceHelper.setSearchParams(searchSettings.text, null, SearchDirection.All, searchSettings.matchCase, false, 0, false);
        while (findReplaceHelper.findNext() !== FindReplaceState.SearchEnd) {
            const lastFound = findReplaceHelper.getLastFound();
            foundIntervals.push(lastFound);
        }
        return foundIntervals;
    }
    clone() {
        const model = new DocumentModel(this.modelOptions, this.subDocumentsIdCounter);
        model.modelOptions = this.modelOptions.clone();
        model.defaultTabWidth = this.defaultTabWidth;
        model.differentOddAndEvenPages = this.differentOddAndEvenPages;
        model.displayBackgroundShape = this.displayBackgroundShape;
        model.pageBackColor = this.pageBackColor;
        model.aspxIsDocumentProtectionEnabled = this.aspxIsDocumentProtectionEnabled;
        model.webSettings = this.webSettings.clone();
        model.compatSettings = ListUtils.deepCopy(this.compatSettings);
        model.compatibilitySettings = this.compatibilitySettings.clone();
        model.cache = this.cache.clone();
        model.defaultCharacterProperties = this.defaultCharacterProperties.clone();
        model.defaultParagraphProperties = this.defaultParagraphProperties.clone();
        model.defaultTableProperties = this.defaultTableProperties.clone();
        model.defaultTableRowProperties = this.defaultTableRowProperties.clone();
        model.defaultTableCellProperties = this.defaultTableCellProperties.clone();
        model.stylesManager = this.stylesManager.clone(model);
        model.characterStyles = ListUtils.deepCopy(this.characterStyles);
        model.paragraphStyles = ListUtils.deepCopy(this.paragraphStyles);
        model.numberingListStyles = ListUtils.deepCopy(this.numberingListStyles);
        model.tableStyles = ListUtils.deepCopy(this.tableStyles);
        model.tableCellStyles = ListUtils.deepCopy(this.tableCellStyles);
        model.headers = ListUtils.deepCopy(this.headers);
        model.footers = ListUtils.deepCopy(this.footers);
        model.sections = ListUtils.map(this.sections, s => s.cloneToNewModel(model));
        model.abstractNumberingListTemplates = ListUtils.map(this.abstractNumberingListTemplates, list => list.clone(model));
        model.abstractNumberingLists = ListUtils.map(this.abstractNumberingLists, list => list.clone(model));
        model.numberingLists = ListUtils.map(this.numberingLists, list => list.clone(model));
        model.abstractNumberingListsIdProvider = this.abstractNumberingListsIdProvider.clone(model);
        model.numberingListsIdProvider = this.numberingListsIdProvider.clone(model);
        model.repositoryBorderItem = this.repositoryBorderItem.clone();
        model.colorProvider = this.colorProvider.clone(model.cache.colorModelInfoCache);
        model.simpleFormattersManager = new SimpleFormattersManager(model.modelOptions.cultureOpts);
        model.documentProtectionProperties = this.documentProtectionProperties.clone();
        model.subDocumentsIdCounter = this.subDocumentsIdCounter;
        model.subDocumentsCollection = this.subDocumentsCollection.clone(model);
        model.mainSubDocument = model.subDocuments[SubDocument.MAIN_SUBDOCUMENT_ID];
        model.loaded = this.loaded;
        return model;
    }
    compare(source, format = null) {
        return new ModelComparer(this, source, format).compareAll();
    }
}
export class SearchSettings {
    constructor(modelManager, formatterManager, layout, subDocument, text, matchCase, highlightResults, pageIndex, storeSelection) {
        this.modelManager = modelManager;
        this.formatterManager = formatterManager;
        this.layout = layout;
        this.subDocument = subDocument;
        this.text = text;
        this.matchCase = matchCase;
        this.highlightResults = highlightResults;
        this.pageIndex = pageIndex;
        this.storeSelection = storeSelection;
    }
}
export var ResetFormattingCacheType;
(function (ResetFormattingCacheType) {
    ResetFormattingCacheType[ResetFormattingCacheType["Character"] = 1] = "Character";
    ResetFormattingCacheType[ResetFormattingCacheType["Paragraph"] = 2] = "Paragraph";
    ResetFormattingCacheType[ResetFormattingCacheType["All"] = 2147483647] = "All";
})(ResetFormattingCacheType || (ResetFormattingCacheType = {}));
export var CompatibilityMode;
(function (CompatibilityMode) {
    CompatibilityMode[CompatibilityMode["Word2003"] = 11] = "Word2003";
    CompatibilityMode[CompatibilityMode["Word2007"] = 12] = "Word2007";
    CompatibilityMode[CompatibilityMode["Word2010"] = 14] = "Word2010";
    CompatibilityMode[CompatibilityMode["Word2013"] = 15] = "Word2013";
})(CompatibilityMode || (CompatibilityMode = {}));
export class CompatibilitySettings {
    constructor() {
        this.dontJustifyLinesEndingInSoftLineBreak = false;
        this.compatibilityMode = CompatibilityMode.Word2013;
    }
    get allowParagraphSpacingAfterPageBreak() {
        return this.compatibilityMode <= CompatibilityMode.Word2010;
    }
    get layoutInTableCell() {
        return this.compatibilityMode >= CompatibilityMode.Word2013;
    }
    get matchHorizontalTableIndentsToTextEdge() {
        return this.compatibilityMode >= CompatibilityMode.Word2013;
    }
    getActualLayoutInTableCell(anchorInfo) {
        if (this.layoutInTableCell)
            return true;
        return anchorInfo.layoutTableCell;
    }
    clone() {
        const result = new CompatibilitySettings();
        result.dontJustifyLinesEndingInSoftLineBreak = this.dontJustifyLinesEndingInSoftLineBreak;
        result.compatibilityMode = this.compatibilityMode;
        return result;
    }
}
export class DocumentVariables {
    constructor() {
        this._map = {};
    }
    get count() {
        return Object.keys(this._map).length;
    }
    contains(name) {
        return Object.prototype.hasOwnProperty.call(this._map, name.toLowerCase());
    }
    getValue(name) {
        return this._map[name.toLowerCase()];
    }
    addValue(name, value) {
        this._map[name.toLowerCase()] = value;
    }
    foreach(callback) {
        for (let name in this._map)
            callback(name, this._map[name]);
    }
}
