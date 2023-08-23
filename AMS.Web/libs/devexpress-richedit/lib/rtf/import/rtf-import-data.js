import { FormatImagesImporter } from '../../core/formats/utils/images-import';
import { RunType } from '../../core/model/runs/run-type';
import { Stack } from '@devexpress/utils/lib/class/stack';
import { Constants } from '@devexpress/utils/lib/constants';
import { Errors } from '@devexpress/utils/lib/errors';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { SkipDestination } from './destination/base/skip-destination';
import { FieldDestination } from './destination/fields/field-destination';
import { TableContentFieldDestination } from './destination/fields/table-content-field-destination';
import { ShapeDestination } from './destination/shape/shape-destination';
import { DefaultDestination } from './destination/sub-document/default-destination';
import { DecoderHelper } from './dx-decoding/decoder-helper';
import { ImportersCollection } from './importers/importers-collection';
import { KeywordTableHolder } from './keyword-tables/keyword-table-holder';
import { RtfParsingState } from './model/enums';
import { RtfDocumentProperties } from './model/rtf-document-properties';
import { RtfSectionProperties } from './model/section/rtf-section-properties';
import { RtfTableReader } from './table/table-reader';
export class RtfPositionState {
    constructor(subDocument, paragraph, fields, bookmarks, rangePermissions, sectionProperties, tableReader) {
        this.subDocument = subDocument;
        this.paragraph = paragraph;
        this.fields = fields;
        this.bookmarks = bookmarks;
        this.rangePermissions = rangePermissions;
        this.sectionProperties = sectionProperties;
        this.tableReader = tableReader;
    }
}
export class RtfImportData {
    constructor(rtfText, options, documentModel, controlOptions) {
        this.documentModel = documentModel;
        this.formatImagesImporter = new FormatImagesImporter();
        this.subDocument = this.documentModel.mainSubDocument;
        this.rtfText = rtfText;
        this.importerOptions = options;
        this.controlOptions = controlOptions;
        this.savedDestinations = new Stack();
        this.documentProperties = new RtfDocumentProperties();
        this.keywordHTHolder = new KeywordTableHolder();
        this.skipCount = 0;
        this.binCharCount = 0;
        this.parsingState = RtfParsingState.Normal;
        this.rtfDocumentModelType = RtfDocumentModelType.WithStyle;
        this.importers = new ImportersCollection(this);
        this._destination = this.createDefaultDestination();
        this.savedDestinations.push(this._destination);
        this.positionStates = new Stack();
        this.addEmptyPositionState();
    }
    get destination() { return this._destination; }
    set destination(newDestination) {
        if (newDestination.subDocument !== this.destination.subDocument) {
            this.beforeChangeSubDocument(newDestination.subDocument);
            this.subDocument = newDestination.subDocument;
            this.onChangeSubDocument();
        }
        this._destination = newDestination;
    }
    get savedStatesCount() { return this.savedDestinations.count; }
    beforeChangeSubDocument(newSubDocument) {
        if (this.positionStates.count == 1)
            return;
        const endNestedSubDocument = this.positionStates.getPrevious().subDocument == newSubDocument;
        if (endNestedSubDocument)
            this.importers.finalizeSubDocument();
    }
    onChangeSubDocument() {
        this.importers.startImportSubDocument();
        const previousState = this.positionStates.getPrevious();
        const endNestedSubDocument = this.positionStates.count > 1 && previousState.subDocument == this.subDocument;
        if (endNestedSubDocument)
            this.positionStates.pop();
        else
            this.addEmptyPositionState();
    }
    addEmptyPositionState() {
        new Stack().push(new RtfSectionProperties());
        return this.positionStates.push(new RtfPositionState(this.subDocument, this.importers.paragraph.createEmptyParagraph(), new Stack(), {}, {}, new Stack(), new RtfTableReader(this)));
    }
    import() {
        this.beforeImport();
        while (this.rtfText.moveToNextChar()) {
            const ch = this.rtfText.currChar;
            if (this.parsingState == RtfParsingState.BinData) {
                this.parseBinChar(ch);
                continue;
            }
            switch (ch) {
                case '{':
                    this.flushDecoder();
                    this.pushState();
                    break;
                case '}':
                    this.flushDecoder();
                    this.popRtfState();
                    break;
                case '\\':
                    if (this.parseRtfKeyword() != ' ')
                        this.rtfText.moveToPrevChar();
                    break;
                case '\r':
                case '\n':
                case '\0':
                    break;
                default:
                    if (this.parsingState == RtfParsingState.Normal)
                        this.parseChar(ch);
                    else
                        this.parseHexChar(ch);
            }
        }
        if (this.binCharCount != 0)
            this.throwUnexpectedEndOfFile();
        if (this.importers.field.fields.count != 0)
            this.throwInvalidRtfFile();
        if (!(this.destination instanceof DefaultDestination))
            throw new Error(Errors.InternalException);
        if (this.subDocument.getLastRun().getType() != RunType.ParagraphRun)
            this.importers.paragraph.insertParagraph();
        this.importers.section.setLastSectionLength();
        this.importers.finalizeSubDocument();
    }
    parseRtfKeyword() {
        let ch = this.readChar();
        if (!StringUtils.isAlpha(ch)) {
            this.translateControlChar(ch);
            return ' ';
        }
        this.flushDecoder();
        const keyword = [];
        while (StringUtils.isAlpha(ch)) {
            keyword.push(ch);
            ch = this.readChar();
        }
        let paramValueAsString = [];
        const isNegative = ch == '-';
        if (isNegative) {
            paramValueAsString.push(ch);
            ch = this.readChar();
        }
        if (isNegative && !StringUtils.isDigit(ch)) {
            paramValueAsString = [];
        }
        else {
            while (StringUtils.isDigit(ch)) {
                paramValueAsString.push(ch);
                ch = this.readChar();
            }
        }
        const paramValue = parseInt(paramValueAsString.join(''));
        this.translateKeyword(keyword.join(''), isNaN(paramValue) ? 0 : paramValue, paramValueAsString.length != 0);
        return ch;
    }
    flushDecoder() {
        this.importers.character.characterFormatting.rtfFormattingInfo.decoder.flush(this);
    }
    throwUnexpectedEndOfFile() {
        this.importerOptions.throwInvalidFile("Unexpected end of file");
    }
    throwInvalidRtfFile() {
        this.importerOptions.throwInvalidFile("Invalid RTF file");
    }
    static throwInvalidRtfFile() {
        throw new Error("Invalid RTF file");
    }
    beforeImport() {
        this.documentModel.defaultCharacterProperties.fontInfo = this.documentModel.cache.fontInfoCache.getItemByName("Times New Roman");
        this.documentModel.defaultCharacterProperties.fontSize = 12;
        this.documentModel.numberingLists = [];
    }
    translateControlChar(ch) {
        if (this.skipCount == 0 || ch == '\'')
            this.destination.processControlChar(ch);
        else
            this.decreaseSkipCount();
    }
    translateKeyword(keyword, parameterValue, hasParameter) {
        if (this.skipCount == 0 || keyword == "bin") {
            const keywordProcessed = this.destination.processKeyword(keyword, parameterValue, hasParameter);
            if (keywordProcessed) {
                if (!(this.destination instanceof SkipDestination))
                    this.optionalGroupLevel = Constants.MAX_SAFE_INTEGER;
            }
            else {
                if (this.optionalGroupLevel < Constants.MAX_SAFE_INTEGER)
                    this.destination = new SkipDestination(this);
            }
        }
        else
            this.decreaseSkipCount();
    }
    parseBinChar(ch) {
        this.destination.processBinChar(ch);
        this.binCharCount--;
        if (this.binCharCount <= 0) {
            this.parsingState = RtfParsingState.Normal;
            this.decreaseSkipCount();
        }
    }
    decreaseSkipCount() {
        this.skipCount = Math.max(0, this.skipCount - 1);
    }
    popRtfState() {
        const oldDestination = this.destination;
        if (this.savedStatesCount == this.optionalGroupLevel)
            this.optionalGroupLevel = Constants.MAX_SAFE_INTEGER;
        this.popState();
        if (this.savedStatesCount >= this.optionalGroupLevel)
            this.destination = new SkipDestination(this);
        oldDestination.afterPopRtfState();
        this.skipCount = 0;
        if (this.savedStatesCount == 0)
            this.rtfText.resetToEnd();
    }
    parseHexChar(ch) {
        this.parsingState = RtfParsingState.Normal;
        const hiValue = this.hexToInt(ch, false);
        const loValue = this.hexToInt(this.readChar(), false);
        if (hiValue < 0 || loValue < 0)
            return;
        const hexValue = (hiValue << 4) + loValue;
        this.parseChar(DecoderHelper.decode(String.fromCharCode(hexValue), this.codePage));
    }
    parseChar(ch) {
        if (this.skipCount == 0) {
            if (ch == '\r' && this.destination.canProcessSpecialHexChar()) {
                this.flushDecoder();
                this.destination.processSpecialHexChar(ch);
            }
            else {
                this.importers.character.characterFormatting.rtfFormattingInfo.decoder.processChar(this, ch);
            }
        }
        else
            this.decreaseSkipCount();
    }
    readChar() {
        if (!this.rtfText.moveToNextChar())
            this.throwUnexpectedEndOfFile();
        return this.rtfText.currChar;
    }
    hexToInt(ch, throwException) {
        if (StringUtils.isDigit(ch))
            return ch.charCodeAt(0) - '0'.charCodeAt(0);
        else {
            if (StringUtils.stringInLowerCase(ch)) {
                if (ch < 'a' || ch > 'f') {
                    if (throwException)
                        this.importerOptions.throwInvalidFile("Invalid hex value");
                    else
                        return -1;
                }
                return 10 + ch.charCodeAt(0) - 'a'.charCodeAt(0);
            }
            else {
                if (ch < 'A' || ch > 'F') {
                    if (throwException)
                        this.importerOptions.throwInvalidFile("Invalid hex value");
                    else
                        return -1;
                }
                return 10 + ch.charCodeAt(0) - 'A'.charCodeAt(0);
            }
        }
    }
    parseUnicodeChar(ch) {
        this.flushDecoder();
        this.processChar(ch);
        this.skipCount = this.importers.character.characterFormatting.rtfFormattingInfo.unicodeCharacterByteCount;
    }
    processChar(ch) {
        this.destination.processChar(ch);
    }
    setCodePage(codePage) {
        this.importers.character.characterFormatting.rtfFormattingInfo.codePage = codePage;
    }
    get codePage() {
        return this.importers.character.characterFormatting.rtfFormattingInfo.codePage;
    }
    parseCharWithoutDecoding(ch) {
        this.flushDecoder();
        if (this.skipCount == 0)
            this.processChar(ch);
        this.decreaseSkipCount();
    }
    createTableContentFieldDestination(createField) { return new TableContentFieldDestination(this, createField); }
    createShapeDestination() { return new ShapeDestination(this); }
    createFieldDestination() { return new FieldDestination(this); }
    createDefaultDestination() { return new DefaultDestination(this, this.subDocument); }
    pushState() {
        this.importers.pushState();
        this.savedDestinations.push(this.destination);
        this.destination = this.destination.clone();
        this.destination.increaseGroupLevel();
    }
    popState() {
        const nestedDestination = this.destination;
        const parentDestination = this.savedDestinations.peek();
        parentDestination.beforeNestedGroupFinished(nestedDestination);
        nestedDestination.beforePopRtfState();
        this.importers.popState();
        this.destination = parentDestination;
        this.destination.nestedGroupFinished(nestedDestination);
        this.savedDestinations.pop();
        this.subDocument = parentDestination.subDocument;
        this.destination.afterNestedGroupFinished(nestedDestination);
    }
}
export var RtfDocumentModelType;
(function (RtfDocumentModelType) {
    RtfDocumentModelType[RtfDocumentModelType["None"] = 0] = "None";
    RtfDocumentModelType[RtfDocumentModelType["WithoutStyle"] = 1] = "WithoutStyle";
    RtfDocumentModelType[RtfDocumentModelType["WithStyle"] = 2] = "WithStyle";
})(RtfDocumentModelType || (RtfDocumentModelType = {}));
