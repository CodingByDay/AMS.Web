import { DocumentFormat } from '../../core/document-format';
import { FileNameHelper } from '../../core/formats/file-name-helper';
import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { Base64Utils } from '@devexpress/utils/lib/utils/base64';
import { isString } from '@devexpress/utils/lib/utils/common';
import { FileUtils } from '@devexpress/utils/lib/utils/file';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { convertFromIntervalApi, convertToIntervalApi } from '../../model-api/interval';
export class FilePathInfo {
    constructor(filePath) {
        this.path = filePath.replace(/\\/g, '/');
        this.documentFormat = Utils.getDocumentFormat(this.path);
        this.extension = this.documentFormat === null ? '' : Utils.documentFormatToExtension(this.documentFormat);
        const index = this.path.lastIndexOf('/');
        if (index >= 0) {
            this.directoryPath = this.path.substring(0, index);
            this.name = this.path.substring(index + 1);
        }
        else {
            this.directoryPath = "";
            this.name = this.path;
        }
        this.nameWithoutExtension = this.name.substring(0, this.name.length - this.extension.length);
    }
}
export class Utils {
    static download(content, fileName) {
        FileUtils.startDownloadFileLocal(content, fileName);
    }
    static parseFilePath(filePath) {
        return new FilePathInfo(filePath);
    }
    static documentFormatToExtension(documentFormat) {
        return FileNameHelper.convertToString(documentFormat);
    }
    static getDocumentFormat(filePath) {
        const pointIndex = filePath.lastIndexOf('.');
        const extenion = pointIndex >= 0 ? filePath.substr(pointIndex) : filePath;
        const coreDocFormat = FileNameHelper.convertExtensionToDocumentFormat(extenion);
        return coreDocFormat === DocumentFormat.Undefined ? null : coreDocFormat;
    }
    static convertArrayBufferToBase64(content) {
        return Base64Utils.fromArrayBuffer(content);
    }
    static convertBlobToBase64(content, callback) {
        Base64Utils.fromBlobAsDataUrl(content, callback);
    }
    static convertToBlob(content, options) {
        return isString(content) ?
            new Blob([Base64Utils.getUint8Array(content)], options) :
            new Blob([content], options);
    }
    static convertToFile(content, fileName = '', options) {
        return isString(content) ?
            Base64Utils.getFileFromBase64(Base64Utils.deleteDataUrlPrefix(content), fileName, options) :
            FileUtils.createFile([content], fileName, options);
    }
    static convertBase64ToArrayBuffer(content) {
        return Base64Utils.getUint8Array(content);
    }
    static convertBlobToArrayBuffer(content, callback) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsArrayBuffer(content);
    }
    static getIntervalComplement(bound, intervals) {
        const apiIntervals = ListUtils.map(intervals, curr => convertFromIntervalApi(curr));
        const coreResult = IntervalAlgorithms.reflectIntervalsTemplate(apiIntervals, convertFromIntervalApi(bound), new FixedInterval(0, 0));
        return ListUtils.map(coreResult, curr => convertToIntervalApi(curr));
    }
}
