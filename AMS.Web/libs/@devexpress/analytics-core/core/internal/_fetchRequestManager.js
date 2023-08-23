/**
* DevExpress Analytics (core\internal\_fetchRequestManager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as $ from 'jquery';
export class FetchRequestManager {
    constructor(fetchSettingsFn) {
        this._executeRequest = (method, url, body, params, abortControler) => {
            const success = 'success';
            const responseDeferred = $.Deferred();
            const response = this._fetch(method, url, body, params, abortControler);
            response.then((response) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const contentType = (_a = response.headers.get('content-type')) === null || _a === void 0 ? void 0 : _a.split(';')[0];
                let statusText = '';
                if (contentType === 'application/json') {
                    try {
                        const json = yield response.json();
                        if (response.ok) {
                            statusText = success;
                            responseDeferred.resolve(json, statusText, Object.assign(Object.assign({}, responseDeferred.promise()), { responseJSON: json }));
                        }
                        else {
                            statusText = json.statusText;
                            responseDeferred.reject(Object.assign(Object.assign({}, responseDeferred.promise()), { responseJSON: json, statusText, status: response.status }), statusText);
                        }
                    }
                    catch (error) {
                        responseDeferred.reject(Object.assign(Object.assign({}, responseDeferred.promise()), { statusText: error.message, status: response.status }), error.message, error);
                        throw error;
                    }
                }
                else if (contentType) {
                    responseDeferred.resolve({
                        result: response,
                        success: true
                    });
                }
                else {
                    responseDeferred.reject(response);
                }
            }));
            response.catch((error) => {
                responseDeferred.reject({ error: error, statusText: error.message, status: 0 }, error.message, error);
            });
            return responseDeferred.promise();
        };
        this._fetch = (method, url, body, params, abortControler) => {
            const settings = {
                method,
                cache: params === null || params === void 0 ? void 0 : params.cache,
                headers: params === null || params === void 0 ? void 0 : params.headers,
                body,
                signal: abortControler === null || abortControler === void 0 ? void 0 : abortControler.signal
            };
            const fetchSettings = this.getFetchSettings();
            fetchSettings && fetchSettings.beforeSend && fetchSettings.beforeSend(settings);
            return fetch(url, settings);
        };
        this.getFetchSettings = fetchSettingsFn || (() => ({}));
    }
    sendRequest(settings) {
        const { method, preparedUrl, body, params } = this._prepareParams(settings);
        return this._executeRequest(method, preparedUrl, body, params, settings.abortController);
    }
    _prepareParams(settings) {
        var _a;
        const GET = 'GET';
        const POST = 'POST';
        const method = settings.type;
        const data = settings.data;
        let preparedUrl = settings.url;
        let body = null;
        let cache = 'default';
        const queryParams = $.param(data);
        if (queryParams) {
            if (settings.type === GET) {
                preparedUrl += `?${queryParams}`;
            }
            else if (settings.type === POST) {
                body = new URLSearchParams(queryParams);
            }
        }
        const params = {
            cache,
            headers: Object.assign(Object.assign({}, settings.headers), (_a = this.getFetchSettings()) === null || _a === void 0 ? void 0 : _a.headers)
        };
        return { method, preparedUrl, body, params };
    }
}
