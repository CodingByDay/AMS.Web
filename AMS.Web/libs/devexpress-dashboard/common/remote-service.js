/**
* DevExpress Dashboard (remote-service.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchRemoteService = exports.AjaxRemoteService = void 0;
const $ = require("jquery");
const _jquery_helpers_1 = require("../data/_jquery-helpers");
const _utils_1 = require("../data/_utils");
function findGloballyDefinedMethod(...path) {
    return path.reduce((acc, item) => {
        if (acc)
            return acc[item];
        return undefined;
    }, window);
}
function _getFileName(contentDisposition) {
    const utf8FileNameRegex = /filename\*=UTF-8''(.*?)$/i;
    const fileNameRegex = /^attachment; filename=\"?(.*?)\"?$/;
    let fileName = 'downloaded file';
    if (utf8FileNameRegex.test(contentDisposition)) {
        fileName = utf8FileNameRegex.exec(contentDisposition)[1];
    }
    else if (fileNameRegex.test(contentDisposition)) {
        fileName = fileNameRegex.exec(contentDisposition)[1];
    }
    return decodeURIComponent(fileName);
}
class AjaxRemoteService {
    constructor(options = {}) {
        this.beforeSend = () => { };
        this.complete = () => { };
        this.headers = {};
        this._applyOptions(options);
    }
    _applyOptions(options = {}) {
        if (_utils_1.type.isDefined(options.beforeSend)) {
            this.beforeSend = options.beforeSend;
        }
        else {
            this.beforeSend = () => { };
        }
        if (_utils_1.type.isDefined(options.headers)) {
            this.headers = options.headers;
        }
        else {
            this.headers = {};
        }
        if (_utils_1.type.isDefined(options.complete)) {
            this.complete = options.complete;
        }
        else {
            this.complete = () => { };
        }
    }
    getFromServer(url, data, queryOptions) {
        var obsoleteGetFromServer = findGloballyDefinedMethod('DevExpress', 'Dashboard', 'getFromServer');
        if (obsoleteGetFromServer) {
            console.warn('This method is obsolete. Please use **remoteService** option to customize HTTP requests.');
            return obsoleteGetFromServer(url, data, queryOptions);
        }
        return $.ajax(Object.assign({ url: url, dataType: 'json', data: data, beforeSend: this.beforeSend, headers: this.headers, complete: this.complete }, queryOptions));
    }
    postToServer(url, data) {
        var obsoletePostToServer = findGloballyDefinedMethod('DevExpress', 'Dashboard', 'postToServer');
        if (obsoletePostToServer) {
            console.warn('This method is obsolete. Please use **remoteService** option to customize HTTP requests.');
            return obsoletePostToServer(url, data);
        }
        return $.ajax({
            method: 'post',
            url: url,
            dataType: 'json',
            contentType: 'application/json',
            jsonp: false,
            data: data === null || data === undefined ? '' : JSON.stringify(data),
            beforeSend: this.beforeSend,
            headers: this.headers,
            complete: this.complete
        });
    }
    performPostback(url, args) {
        const parsedArgs = JSON.stringify(args);
        var obsoletePerformPostback = findGloballyDefinedMethod('DevExpress', 'Dashboard', 'performPostback');
        if (obsoletePerformPostback) {
            console.warn('This method is obsolete. Please use **remoteService** option to customize HTTP requests.');
            return obsoletePerformPostback(url, parsedArgs);
        }
        var $div = $.fn.constructor('<div>').appendTo('body');
        var $form = $.fn.constructor('<form>', {
            action: url,
            method: 'POST',
            target: '_blank'
        }).appendTo($div);
        var $input = $.fn.constructor('<input>', {
            id: 'dx-db-export-input-id',
            name: 'dx-db-export',
            type: 'hidden',
            value: encodeURIComponent(parsedArgs)
        }).appendTo($form);
        Object.keys(this.headers).forEach(headerName => {
            var $input = $.fn.constructor('<input>', {
                name: headerName,
                type: 'hidden',
                value: encodeURIComponent(this.headers[headerName])
            }).appendTo($form);
        });
        $form.submit();
        $div.remove();
        return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
    }
}
exports.AjaxRemoteService = AjaxRemoteService;
class FetchRemoteService {
    constructor(options = {}) {
        this.headers = {};
        this._executeRequest = (method, url, data, queryParams, abortController) => {
            const responseDeferred = _jquery_helpers_1.createJQueryDeferred();
            const response = this._fetch(method, url, data, queryParams, abortController);
            response
                .then(response => {
                return response.json()
                    .then(json => {
                    if (response.ok) {
                        return responseDeferred.resolve(json);
                    }
                    return Promise.reject(json);
                });
            })
                .catch(error => {
                responseDeferred.reject(error.Message);
            });
            return responseDeferred.promise();
        };
        this._fetch = (method, url, data, queryParams, abortController) => {
            const { cache, preparedUrl, body } = this._prepareParams(method, url, data, queryParams);
            const settings = {
                method,
                cache,
                headers: Object.assign({ 'content-type': 'application/json' }, this.headers),
                body,
                signal: abortController === null || abortController === void 0 ? void 0 : abortController.signal
            };
            this.beforeSend && this.beforeSend(settings);
            return fetch(preparedUrl, settings);
        };
        this._applyOptions(options);
    }
    _applyOptions(options = {}) {
        this.headers = {};
        if (_utils_1.type.isDefined(options === null || options === void 0 ? void 0 : options.headers)) {
            this.headers = options.headers;
        }
        this.beforeSend = options === null || options === void 0 ? void 0 : options.beforeSend;
    }
    getFromServer(url, data, queryOptions, abortController) {
        return this._executeRequest('GET', url, data, queryOptions, abortController);
    }
    postToServer(url, data, abortController) {
        return this._executeRequest('POST', url, data, abortController);
    }
    _performPostback(url, args, abortController) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this._fetch('POST', url, args, abortController);
            if (response.ok) {
                const blob = yield response.blob();
                const contentDisposition = response.headers.get('Content-Disposition');
                const fileMetadata = {
                    contentType: response.headers.get('Content-Type'),
                    contentFilename: _getFileName(contentDisposition),
                    url: URL.createObjectURL(blob)
                };
                const link = document.createElement('a');
                link.href = fileMetadata.url;
                link.rel = 'noreferrer noopener';
                link.download = fileMetadata.contentFilename;
                document.body.appendChild(link);
                link.click();
                link.remove();
                URL.revokeObjectURL(fileMetadata.url);
            }
            else {
                const json = yield response.json();
                throw new Error(json.Message);
            }
        });
    }
    performPostback(url, args, abortController) {
        const response = this._performPostback(url, args, abortController);
        const responseDeferred = _jquery_helpers_1.createJQueryDeferred();
        response
            .then(() => {
            responseDeferred.resolve();
        }).catch((error) => {
            responseDeferred.reject(error.message);
        });
        return responseDeferred.promise();
    }
    _prepareParams(method, url, data, queryParams) {
        let body = null;
        let preparedUrl = url;
        let cache = 'default';
        if (_utils_1.type.isDefined(queryParams === null || queryParams === void 0 ? void 0 : queryParams.cache) && !queryParams.cache) {
            cache = 'no-store';
        }
        if (method === 'GET') {
            const queryParams = _jquery_helpers_1.jqueryQueryParam(data);
            if (queryParams) {
                preparedUrl += `?${queryParams}`;
            }
        }
        else if (method === 'POST') {
            body = data === null || data === undefined ? '' : JSON.stringify(data);
        }
        return { cache, preparedUrl, body };
    }
}
exports.FetchRemoteService = FetchRemoteService;
