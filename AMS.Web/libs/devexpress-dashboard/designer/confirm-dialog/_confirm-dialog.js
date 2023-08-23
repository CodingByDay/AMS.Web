﻿/**
* DevExpress Dashboard (_confirm-dialog.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmDialogViewModel = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
class ConfirmDialogViewModel {
    constructor() {
        this.confirmTitle = ko.observable('');
        this.confirmText = ko.observable('');
        this.confirmVisible = ko.observable(false);
        this.confirmButtons = ko.observable([]);
        this.confirmHidden = (e) => { };
    }
    confirm(title, message, okButtonText, cancelButtonText) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        this.confirmTitle(title);
        this.confirmText(message);
        let buttons = [];
        if (_utils_1.type.isDefined(okButtonText))
            buttons.push({
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: okButtonText,
                    type: 'default',
                    onClick: () => {
                        setTimeout(() => { this.confirmVisible(false); }, 1);
                        deferred.resolve(true);
                    }
                }
            });
        if (_utils_1.type.isDefined(cancelButtonText))
            buttons.push({
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: cancelButtonText,
                    onClick: () => {
                        setTimeout(() => { this.confirmVisible(false); }, 1);
                        deferred.resolve(false);
                    }
                }
            });
        this.confirmButtons(buttons);
        this.confirmHidden = (e) => {
            if (deferred.state() === 'pending')
                deferred.reject();
        };
        this.confirmVisible(true);
        return deferred.promise();
    }
}
exports.ConfirmDialogViewModel = ConfirmDialogViewModel;
