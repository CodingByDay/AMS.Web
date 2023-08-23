/**
* DevExpress Analytics (core\internal\requestManager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AjaxRequestManager } from './_ajaxRequestManager';
import { FetchRequestManager } from './_fetchRequestManager';
import { isDefined } from './_utils';
var _requestManagerInstance = null;
export var requestManager = {
    getInstance: function (requestManagerSetup) {
        if (!_requestManagerInstance) {
            this.initialize(requestManagerSetup);
        }
        return _requestManagerInstance;
    },
    _initialize: function (requestManagerInstance) {
        _requestManagerInstance = requestManagerInstance;
    },
    initialize: function (requestManagerSetup) {
        const { ajaxSetup, fetchSetup } = requestManagerSetup !== null && requestManagerSetup !== void 0 ? requestManagerSetup : {};
        if (isDefined(ajaxSetup === null || ajaxSetup === void 0 ? void 0 : ajaxSetup.ajaxSettings) && isDefined(fetchSetup === null || fetchSetup === void 0 ? void 0 : fetchSetup.fetchSettings)) {
            throw new Error('You cannot configure more than one type of request manager. Use either ajaxSetup or fetchSetup for configuration, but not both.');
        }
        if (isDefined(ajaxSetup === null || ajaxSetup === void 0 ? void 0 : ajaxSetup.ajaxSettings)) {
            _requestManagerInstance = new AjaxRequestManager(() => ajaxSetup.ajaxSettings);
            return;
        }
        _requestManagerInstance = new FetchRequestManager(() => fetchSetup === null || fetchSetup === void 0 ? void 0 : fetchSetup.fetchSettings);
    }
};
export function _isFetchConfigured() {
    return _requestManagerInstance instanceof FetchRequestManager;
}
