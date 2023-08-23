﻿/**
* DevExpress Analytics (core\internal\_fetchRequestManager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IRequestManager, IRequestManagerSettings } from './_requestManager';
export declare class FetchRequestManager implements IRequestManager {
    getFetchSettings: () => IRequestManagerSettings;
    constructor(fetchSettingsFn: () => IRequestManagerSettings);
    sendRequest(settings: IRequestManagerSettings): JQueryPromise<any>;
    _executeRequest: (method: string, url: string, body: FormData, params?: Object, abortControler?: AbortController) => JQueryPromise<any>;
    _fetch: (method: string, url: string, body: any, params?: any, abortControler?: AbortController) => Promise<Response>;
    _prepareParams(settings: IRequestManagerSettings): {
        method: string;
        preparedUrl: string;
        body: FormData;
        params: {};
    };
}
