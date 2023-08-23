/**
* DevExpress Analytics (core\internal\_ajaxRequestManager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as $ from 'jquery';
import { extend } from '../../serializer/_utils';
export class AjaxRequestManager {
    constructor(ajaxSttingsFn) {
        this.getAjaxSettings = ajaxSttingsFn;
    }
    sendRequest(settings) {
        var requestSettings = this._prepareRequestSettings(settings);
        return $.ajax(requestSettings);
    }
    _prepareRequestSettings(settings) {
        return extend({}, this.getAjaxSettings(), settings);
    }
}
