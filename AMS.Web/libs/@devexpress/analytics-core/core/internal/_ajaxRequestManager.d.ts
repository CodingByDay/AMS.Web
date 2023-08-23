/**
* DevExpress Analytics (core\internal\_ajaxRequestManager.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IRequestManager } from './_requestManager';
export declare class AjaxRequestManager implements IRequestManager<JQueryAjaxSettings> {
    getAjaxSettings: () => JQueryAjaxSettings;
    constructor(ajaxSttingsFn: () => JQueryAjaxSettings);
    sendRequest(settings: JQueryAjaxSettings): JQueryXHR;
    _prepareRequestSettings(settings: JQueryAjaxSettings): JQueryAjaxSettings;
}
