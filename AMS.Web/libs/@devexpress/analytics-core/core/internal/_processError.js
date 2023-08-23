﻿/**
* DevExpress Analytics (core\internal\_processError.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getErrorMessage, NotifyAboutWarning } from '../utils/_infoMessageHelpers';
export var _addErrorPrefix = true;
export function _processError(errorThrown, deferred, jqXHR, textStatus, processErrorCallback) {
    var message = errorThrown;
    var error = getErrorMessage(jqXHR);
    if (error && error !== message) {
        if (!_addErrorPrefix)
            message = error;
        else
            message += ': ' + error;
    }
    try {
        processErrorCallback ? processErrorCallback(message, jqXHR, textStatus) : NotifyAboutWarning(message);
    }
    finally {
        deferred.reject(jqXHR, textStatus, errorThrown);
    }
}
export var _errorProcessor = {
    handlers: [],
    call: (e) => {
        for (var i = 0; i < _errorProcessor.handlers.length; i++) {
            _errorProcessor.handlers[i](e);
        }
    }
};
export function processErrorEvent(func) {
    if (func) {
        _errorProcessor.handlers.push(func);
    }
    return {
        dispose: () => {
            func && _removeErrorEvent(func);
        }
    };
}
function _removeErrorEvent(func) {
    _errorProcessor.handlers.splice(_errorProcessor.handlers.indexOf(func), 1);
}
