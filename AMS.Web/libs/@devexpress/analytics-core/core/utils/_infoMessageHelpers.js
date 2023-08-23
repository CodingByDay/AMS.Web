﻿/**
* DevExpress Analytics (core\utils\_infoMessageHelpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import notify from 'devextreme/ui/notify';
import * as $ from 'jquery';
import { chooseBetterPositionOf } from '../internal/_surfaceHelpers';
import { DEBUG } from './_debug';
export var NotifyType = {
    info: 'info',
    warning: 'warning',
    error: 'error',
    success: 'success'
};
var wrappedConsole = (console => {
    var getWrappedMethod = methodName => (function (...args) {
        if (console && $.isFunction(console[methodName])) {
            console[methodName].apply(console, arguments);
        }
    });
    return {
        info: getWrappedMethod('info'),
        warn: getWrappedMethod('warn'),
        error: getWrappedMethod('error')
    };
})(window.console);
export function NotifyAboutWarning(msg, showForUser = false) {
    if (showForUser) {
        ShowMessage(msg);
    }
    if (DEBUG) {
        throw new Error(msg);
    }
    else {
        wrappedConsole.warn(msg);
    }
}
export function getErrorMessage(deferredResult) {
    return deferredResult && deferredResult.responseJSON && deferredResult.responseJSON.error ? deferredResult.responseJSON.error : '';
}
var _showMessage = (msg, type = 'error', displayTime, debugInfo, contentTemplate, containerElement) => {
    containerElement = containerElement || $.fn.constructor('.dx-designer-viewport')[0];
    notify({
        message: msg,
        type: type,
        maxWidth: containerElement ? containerElement.clientWidth : undefined,
        position: { boundary: containerElement, collision: 'fit', of: chooseBetterPositionOf(document.documentElement, containerElement), my: 'bottom', at: 'bottom', offset: '0 -10' },
        container: containerElement,
        hideOnOutsideClick: true,
        closeOnSwipe: false,
        displayTime: displayTime || (type === 'error' ? 60000 : 3000),
        contentTemplate: contentTemplate
    });
};
export var ShowMessage = _showMessage;
export var _setShowMessageFunc = (func) => ShowMessage = func;
export var _resetShowMessageFunc = () => ShowMessage = _showMessage;
