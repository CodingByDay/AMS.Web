﻿/**
* DevExpress Dashboard (notificator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationController = void 0;
const _utils_1 = require("../../data/_utils");
const _notificator_view_model_1 = require("./_notificator-view-model");
class NotificationController {
    constructor() {
        this._viewModel = new _notificator_view_model_1.NotificationControllerViewModel();
    }
    static _getErrorTextFromResponse(request) {
        return (request && request.responseJSON && request.responseJSON.Message) || '';
    }
    static _getDetailedErrorMessage(errorInfo) {
        var errorDetail = '';
        if (typeof errorInfo == 'string') {
            errorDetail = errorInfo;
        }
        else if (errorInfo && errorInfo['responseJSON']) {
            errorDetail = NotificationController._getErrorTextFromResponse(errorInfo);
        }
        return _utils_1.decodeHtml(errorDetail);
    }
    suspended(isSuspended) {
        this._viewModel.suspended(isSuspended);
    }
    showState(message) {
        this._viewModel.updateNotification('info', message);
    }
    showSuccess(message) {
        this._viewModel.updateNotification('success', message);
    }
    showError(title, errorInfo) {
        let errorDetail = NotificationController._getDetailedErrorMessage(errorInfo);
        this._viewModel.updateNotification('error', title, errorDetail);
        console.warn(title + (errorDetail ? ' - ' + errorDetail : ''));
    }
    reset() {
        this._viewModel.reset();
    }
}
exports.NotificationController = NotificationController;
