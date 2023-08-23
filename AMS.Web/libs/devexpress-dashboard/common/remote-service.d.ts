﻿/**
* DevExpress Dashboard (remote-service.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { AjaxRemoteServiceOptions, FetchRemoteServiceOptions, IRemoteService } from './common-interfaces';
export declare class AjaxRemoteService implements IRemoteService<JQueryXHR> {
    beforeSend: (jqXHR: JQueryXHR, settings: JQueryAjaxSettings) => any;
    complete?: (jqXHR: JQueryXHR, textStatus: string) => any;
    headers: {
        [key: string]: any;
    };
    constructor(options?: AjaxRemoteServiceOptions);
    _applyOptions(options?: AjaxRemoteServiceOptions): void;
    getFromServer(url: string, data?: Object, queryOptions?: JQueryAjaxSettings): JQueryXHR;
    postToServer(url: string, data?: Object): JQueryXHR;
    performPostback(url: string, args: Object): JQueryPromise<any>;
}
export declare class FetchRemoteService implements IRemoteService<JQueryPromise<any>> {
    headers: {
        [key: string]: any;
    };
    beforeSend: (settings: RequestInit) => void;
    constructor(options?: FetchRemoteServiceOptions);
    _applyOptions(options?: FetchRemoteServiceOptions): void;
    getFromServer(url: string, data?: Object, queryOptions?: Object, abortController?: AbortController): JQueryPromise<any>;
    postToServer(url: string, data?: Object, abortController?: AbortController): JQueryPromise<any>;
    _performPostback(url: string, args: any, abortController?: AbortController): Promise<any>;
    performPostback(url: string, args: any, abortController?: AbortController): JQueryPromise<any>;
    private _executeRequest;
    private _fetch;
    private _prepareParams;
}
