﻿/**
* DevExpress Dashboard (_text-box-item-editor-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RichEditExtensionViewModel = exports.ValueAccessor = void 0;
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _confirm_dialog_1 = require("../confirm-dialog/_confirm-dialog");
class ValueAccessor {
}
exports.ValueAccessor = ValueAccessor;
class RichEditExtensionViewModel {
    constructor() {
        this._isCloseConfirmed = false;
        this.richEditorOptions = ko.observable(null);
        this.close = () => {
            this.popup.hide();
        };
        this.saveAndClose = () => {
            var richEditorOptions = this.richEditorOptions();
            richEditorOptions && richEditorOptions.forceSave && richEditorOptions.forceSave();
            this.close();
        };
        this.onHidden = () => {
            this.richEditorOptions(null);
            this._isCloseConfirmed = false;
        };
        this.onHiding = (args) => {
            var richEditorOptions = this.richEditorOptions();
            var documentModified = richEditorOptions && richEditorOptions.documentModified && richEditorOptions.documentModified();
            if (documentModified && !this._isCloseConfirmed) {
                args.cancel = true;
                this.confirmDialogViewModel
                    .confirm(_default_1.getLocalizationById('DashboardWebStringId.Dialog.ConfirmSaving'), _default_1.getLocalizationById('DashboardWebStringId.SaveConfirmationDialogMessage') + '<br/>' + _default_1.getLocalizationById('DashboardWebStringId.SaveChangesDialogMessage'), _default_1.getLocalizationById('DashboardWebStringId.Dialog.Save'), _default_1.getLocalizationById('DashboardWebStringId.Dialog.DoNotSave'))
                    .done(result => {
                    this._isCloseConfirmed = true;
                    if (result) {
                        this.saveAndClose();
                    }
                    else {
                        this.close();
                    }
                });
            }
        };
        this.onInitialized = (args) => {
            this.popup = args.component;
        };
        this.confirmDialogViewModel = new _confirm_dialog_1.ConfirmDialogViewModel();
    }
    show(options, docVariables, dashboardItemWidth) {
        if (!this.richEditorOptions()) {
            this.popup.show().then(() => {
                this.richEditorOptions({
                    initialDocument: options.getValue(),
                    docVariables: docVariables,
                    onSaving: (document) => {
                        options.setValue(document);
                    },
                    dashboardItemWidth: dashboardItemWidth
                });
            });
        }
    }
}
exports.RichEditExtensionViewModel = RichEditExtensionViewModel;
