import { ApiParametersChecker } from '../api-utils/api-utils/parameter-checker';
import { DocumentFormat } from '../core/document-format';
import { CharacterPropertiesApplier } from '../core/model/character/character-properties-helper';
import { InsertParagraphManipulatorParams } from '../core/model/manipulators/paragraph-manipulator/insert-paragraph-manipulator-params';
import { InlinePictureInfo } from '../core/model/manipulators/picture-manipulator/insert-picture-manipulator-params';
import { ImageLoadingOptions } from '../core/model/manipulators/picture-manipulator/loader/image-loading-options';
import { InsertTextManipulatorParams } from '../core/model/manipulators/text-manipulator/insert-text-manipulator-params';
import { ParagraphPropertiesApplier } from '../core/model/paragraph/paragraph-properties-helper';
import { RichUtils } from '../core/model/rich-utils';
import { RunType } from '../core/model/runs/run-type';
import { SubDocumentInterval, SubDocumentPosition } from '../core/model/sub-document';
import { MaskedParagraphPropertiesBundleFull } from '../core/rich-utils/properties-bundle';
import { InputPositionBase } from '../core/selection/input-position-base';
import { SelectionIntervalsInfo } from '../core/selection/selection-intervals-info';
import { Constants } from '@devexpress/utils/lib/constants';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { MathUtils } from '@devexpress/utils/lib/utils/math';
import { getRestrictedInterval } from './api-utils/api-utils';
import { ModelParametersChecker } from './api-utils/model-parameter-checker';
import { convertFromCharacterPropertiesApi, convertToCharacterPropertiesApi } from './character-properties';
import { BookmarkCollection } from './collections/bookmark-collection';
import { FieldCollection } from './collections/field-collection';
import { HyperlinkCollection } from './collections/hyperlink-collection';
import { ParagraphCollection } from './collections/paragraph-collection';
import { RangePermissionCollection } from './collections/range-permission-collection';
import { TableCollection } from './collections/table/table-collection';
import { getRtfFromSubDocumentPublic, insertContentInSubDocumentPublic, insertRtfInSubDocumentPublic } from './formats/importer';
import { ImagesApi } from './images/images';
import { convertToIntervalApi, IntervalApi } from './interval';
import { convertFromParagraphPropertiesApi, convertToParagraphPropertiesApi, ParagraphApi } from './paragraph';
import { SectionApi } from './section';
import { insertTextThroughApi } from './api-utils/insert-text';
import { isDefined } from '@devexpress/utils/lib/utils/common';
export var SubDocumentTypeApi;
(function (SubDocumentTypeApi) {
    SubDocumentTypeApi[SubDocumentTypeApi["Main"] = 0] = "Main";
    SubDocumentTypeApi[SubDocumentTypeApi["Header"] = 1] = "Header";
    SubDocumentTypeApi[SubDocumentTypeApi["Footer"] = 2] = "Footer";
    SubDocumentTypeApi[SubDocumentTypeApi["TextBox"] = 3] = "TextBox";
})(SubDocumentTypeApi || (SubDocumentTypeApi = {}));
export var HeaderFooterTypeApi;
(function (HeaderFooterTypeApi) {
    HeaderFooterTypeApi[HeaderFooterTypeApi["First"] = 0] = "First";
    HeaderFooterTypeApi[HeaderFooterTypeApi["Odd"] = 1] = "Odd";
    HeaderFooterTypeApi[HeaderFooterTypeApi["Even"] = 2] = "Even";
    HeaderFooterTypeApi[HeaderFooterTypeApi["Primary"] = 1] = "Primary";
})(HeaderFooterTypeApi || (HeaderFooterTypeApi = {}));
export var SectionBreakTypeApi;
(function (SectionBreakTypeApi) {
    SectionBreakTypeApi[SectionBreakTypeApi["NextPage"] = 0] = "NextPage";
    SectionBreakTypeApi[SectionBreakTypeApi["OddPage"] = 1] = "OddPage";
    SectionBreakTypeApi[SectionBreakTypeApi["EvenPage"] = 2] = "EvenPage";
    SectionBreakTypeApi[SectionBreakTypeApi["Continuous"] = 3] = "Continuous";
})(SectionBreakTypeApi || (SectionBreakTypeApi = {}));
export class SubDocumentApi {
    constructor(processor, subDocument) {
        this._subDocument = subDocument;
        this._processor = processor;
    }
    get paragraphs() {
        return new ParagraphCollection(this._processor, this._subDocument);
    }
    get bookmarks() {
        return new BookmarkCollection(this._processor, this._subDocument);
    }
    get rangePermissions() {
        return new RangePermissionCollection(this._processor, this._subDocument);
    }
    get tables() {
        return new TableCollection(this._processor, this._subDocument);
    }
    get fields() {
        return new FieldCollection(this._processor, this._subDocument);
    }
    get hyperlinks() {
        return new HyperlinkCollection(this._processor, this._subDocument);
    }
    get images() {
        return new ImagesApi(this._processor, this._subDocument);
    }
    get parentSubDocument() {
        const info = this._subDocument.info;
        if (info.isTextBox)
            return new SubDocumentApi(this._processor, this._processor.modelManager.model.subDocuments[info.parentSubDocumentId]);
        return null;
    }
    get id() {
        return this._subDocument.id;
    }
    get type() {
        return this._subDocument.info.getType();
    }
    get interval() {
        return new IntervalApi(0, this._subDocument.getDocumentEndPosition());
    }
    get length() {
        return this._subDocument.getDocumentEndPosition();
    }
    insertText(position, text) {
        position = ApiParametersChecker.check(position, 1, false, [
            ApiParametersChecker.numberDescriptor('position', (val) => val)
        ]);
        position = MathUtils.restrictValue(position, 0, this._subDocument.getDocumentEndPosition() - 1);
        text = ApiParametersChecker.check(text, 2, false, [
            ApiParametersChecker.stringDescriptor('text', (v) => v, true)
        ]);
        return convertToIntervalApi(insertTextThroughApi(position, text, this._subDocument, this._processor, { wrapIntoBeginUpdate: true }));
    }
    insertLineBreak(position) {
        return insertSpecialCharacter(position, RichUtils.specialCharacters.LineBreak, this._processor, this._subDocument);
    }
    insertColumnBreak(position) {
        return insertSpecialCharacter(position, RichUtils.specialCharacters.ColumnBreak, this._processor, this._subDocument);
    }
    insertPageBreak(position) {
        return insertSpecialCharacter(position, RichUtils.specialCharacters.PageBreak, this._processor, this._subDocument);
    }
    insertSectionBreak(position, type) {
        position = ApiParametersChecker.check(position, 1, false, [
            ApiParametersChecker.numberDescriptor('position', (val) => val)
        ]);
        position = MathUtils.restrictValue(position, 0, this._subDocument.getDocumentEndPosition() - 1);
        const secStartType = ApiParametersChecker.check(type, 2, false, [
            ApiParametersChecker.enumDescriptor('type', (val) => val, SectionBreakTypeApi, 'SectionBreakType')
        ]);
        const inputPos = new InputPositionBase().setIntervals(SelectionIntervalsInfo.fromPosition(this._subDocument, position));
        this._processor.beginUpdate();
        this._processor.modelManager.modelManipulator.section.insertSectionAndSetStartType(position, secStartType, inputPos.charPropsBundle);
        this._processor.endUpdate();
        return new SectionApi(this._processor, this._processor.modelManager.model.getSectionByPosition(position + 1));
    }
    insertPicture(position, base64, size, callback) {
        position = ApiParametersChecker.check(position, 1, false, [
            ApiParametersChecker.numberDescriptor('position', (val) => val)
        ]);
        position = MathUtils.restrictValue(position, 0, this._subDocument.getDocumentEndPosition() - 1);
        base64 = ApiParametersChecker.check(base64, 2, false, [
            ApiParametersChecker.stringDescriptor("base64", (s) => s, false)
        ]);
        size = ApiParametersChecker.check(size, 3, true, [
            ApiParametersChecker.objectDescriptor('size', 'Size', (val) => val)
        ]);
        if (size) {
            ApiParametersChecker.check(size.width, 3, false, [
                ApiParametersChecker.numberDescriptor('size.width', (val) => val, 1, Constants.MAX_SAFE_INTEGER)
            ]);
            ApiParametersChecker.check(size.height, 3, false, [
                ApiParametersChecker.numberDescriptor('size.height', (val) => val, 1, Constants.MAX_SAFE_INTEGER)
            ]);
        }
        callback = ApiParametersChecker.check(callback, 4, true, [
            ApiParametersChecker.functionDescriptor('callback', (val) => val)
        ]);
        if (!callback)
            callback = () => { };
        const imageCache = this._processor.modelManager.model.cache.imageCache;
        const cacheInfo = imageCache.createUnloadedByBase64OrUrl(base64);
        const actualSize = size ? new Size(size.width, size.height) : undefined;
        const inputPos = new InputPositionBase().setIntervals(SelectionIntervalsInfo.fromPosition(this._subDocument, position));
        this._processor.beginUpdate();
        this._processor.modelManager.modelManipulator.picture.insertInlinePictureViaHistory(new SubDocumentPosition(this._subDocument, position), inputPos.charPropsBundle, InlinePictureInfo.defaultInfo(cacheInfo), ImageLoadingOptions.initByActualSize(actualSize, (picInterval, _cacheInfo) => callback(convertToIntervalApi(picInterval))));
        this._processor.endUpdate();
    }
    insertParagraph(position) {
        position = ApiParametersChecker.check(position, 1, false, [
            ApiParametersChecker.numberDescriptor('position', (val) => val)
        ]);
        position = MathUtils.restrictValue(position, 0, this._subDocument.getDocumentEndPosition());
        const inputPos = new InputPositionBase().setIntervals(SelectionIntervalsInfo.fromPosition(this._subDocument, position));
        this._processor.beginUpdate();
        this._processor.modelManager.modelManipulator.paragraph.insertParagraphViaHistory(new InsertParagraphManipulatorParams(new SubDocumentPosition(this._subDocument, position), inputPos.charPropsBundle, new MaskedParagraphPropertiesBundleFull(undefined, undefined, undefined, undefined), false));
        this._processor.endUpdate();
        return new ParagraphApi(this._processor, this._subDocument.getParagraphByPosition(position));
    }
    insertRtf(position, rtfText, callback) {
        position = ApiParametersChecker.check(position, 1, false, [
            ApiParametersChecker.numberDescriptor('position', (val) => val)
        ]);
        position = MathUtils.restrictValue(position, 0, this._subDocument.getDocumentEndPosition() - 1);
        rtfText = ApiParametersChecker.check(rtfText, 2, false, [
            ApiParametersChecker.stringDescriptor("rtf", (s) => s, false)
        ]);
        callback = ApiParametersChecker.check(callback, 3, true, [
            ApiParametersChecker.functionDescriptor('callback', (val) => val)
        ]);
        if (!callback)
            callback = () => { };
        insertRtfInSubDocumentPublic(this._processor, this._subDocument, position, rtfText, (interval, isRtfValid) => callback(isDefined(interval) ? convertToIntervalApi(interval) : null, isRtfValid));
    }
    getRtf(interval) {
        let coreInterval;
        if (interval) {
            coreInterval = ApiParametersChecker.check(interval, 1, true, [
                ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
            ]);
        }
        else {
            coreInterval = this._subDocument.interval;
        }
        return getRtfFromSubDocumentPublic(this._processor.modelManager.richOptions, this._subDocument, coreInterval);
    }
    insertContent(position, content, documentFormat, callback) {
        position = ApiParametersChecker.check(position, 1, false, [
            ApiParametersChecker.numberDescriptor('position', (val) => val)
        ]);
        position = MathUtils.restrictValue(position, 0, this._subDocument.getDocumentEndPosition() - 1);
        content = ApiParametersChecker.check(content, 2, false, [
            ApiParametersChecker.stringDescriptor("contentAsBase64", (s) => s, false),
            ApiParametersChecker.objectDescriptor("contentAsFile", "File", (s) => s),
            ApiParametersChecker.objectDescriptor("contentAsBlob", "Blob", (s) => s),
            ApiParametersChecker.objectDescriptor("contentAsArrayBuffer", "ArrayBuffer", (s) => s),
        ]);
        const coreDocumentFormat = ApiParametersChecker.check(documentFormat, 3, false, [
            ApiParametersChecker.enumDescriptor('documentFormat', (val) => val, DocumentFormat, 'DevExpress.RichEdit.DocumentFormat')
        ]);
        callback = ApiParametersChecker.check(callback, 4, true, [
            ApiParametersChecker.functionDescriptor('callback', (val) => val)
        ]);
        if (!callback)
            callback = () => { };
        insertContentInSubDocumentPublic(this._processor, this._subDocument, position, content, coreDocumentFormat, (interval, isRtfValid) => callback(convertToIntervalApi(interval), isRtfValid));
    }
    deleteText(interval) {
        const coreInterval = ApiParametersChecker.check(interval, 1, false, [
            ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
        ]);
        if (coreInterval.length) {
            this._processor.beginUpdate();
            this._processor.modelManager.modelManipulator.range.removeInterval(new SubDocumentInterval(this._subDocument, coreInterval), true, false);
            this._processor.endUpdate();
        }
    }
    getText(interval) {
        if (interval) {
            const coreInterval = ApiParametersChecker.check(interval, 1, false, [
                ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
            ]);
            return this._subDocument.getText(coreInterval);
        }
        else
            return this._subDocument.getText(this._subDocument.interval);
    }
    getCharacterProperties(interval) {
        const coreInterval = ApiParametersChecker.check(interval, 1, false, [
            ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
        ]);
        const inputPos = new InputPositionBase().setIntervals(SelectionIntervalsInfo.fromInterval(this._subDocument, coreInterval));
        return convertToCharacterPropertiesApi(inputPos.getMergedCharacterPropertiesRaw(), this._processor.modelManager.model.colorProvider);
    }
    setCharacterProperties(interval, characterProperties) {
        const coreInterval = ApiParametersChecker.check(interval, 1, false, [
            ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
        ]);
        const propertiesCore = convertFromCharacterPropertiesApi(characterProperties, this._processor.modelManager.model.cache.fontInfoCache, 2, true, {});
        const inputPos = new InputPositionBase().setIntervals(new SelectionIntervalsInfo(this._subDocument, [coreInterval]));
        this._processor.beginUpdate();
        new CharacterPropertiesApplier(this._processor.modelManager, inputPos, propertiesCore, this._subDocument, [coreInterval]).apply();
        this._processor.endUpdate();
    }
    getParagraphProperties(interval) {
        const coreInterval = ApiParametersChecker.check(interval, 1, false, [
            ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
        ]);
        const inputPos = new InputPositionBase().setIntervals(new SelectionIntervalsInfo(this._subDocument, [coreInterval]));
        return convertToParagraphPropertiesApi(inputPos.getMergedParagraphPropertiesFull(), this._processor.modelManager.model.colorProvider);
    }
    setParagraphProperties(interval, paragraphProperties) {
        const coreInterval = ApiParametersChecker.check(interval, 1, false, [
            ModelParametersChecker.intervalDescriptor("interval", (interval) => getRestrictedInterval(interval, 0, this._subDocument.getDocumentEndPosition()))
        ]);
        const propertiesCore = convertFromParagraphPropertiesApi(paragraphProperties, 2);
        const inputPos = new InputPositionBase()
            .setIntervals(new SelectionIntervalsInfo(this._subDocument, [coreInterval]));
        this._processor.beginUpdate();
        new ParagraphPropertiesApplier(this._processor.modelManager, inputPos, propertiesCore, this._subDocument, [coreInterval]).apply();
        this._processor.endUpdate();
    }
}
function insertSpecialCharacter(position, text, processor, subDocument) {
    position = ApiParametersChecker.check(position, 1, false, [
        ApiParametersChecker.numberDescriptor('position', (val) => val)
    ]);
    position = MathUtils.restrictValue(position, 0, subDocument.getDocumentEndPosition() - 1);
    const inputPos = new InputPositionBase().setIntervals(new SelectionIntervalsInfo(subDocument, [new FixedInterval(position, 0)]));
    const result = processor.modelManager.modelManipulator.text.insertTextViaHistory(new InsertTextManipulatorParams(new SubDocumentPosition(subDocument, position), inputPos.charPropsBundle, RunType.TextRun, text));
    return convertToIntervalApi(result.insertedInterval);
}
