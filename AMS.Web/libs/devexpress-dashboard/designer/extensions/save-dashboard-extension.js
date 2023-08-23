﻿/**
* DevExpress Dashboard (save-dashboard-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveDashboardExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _interfaces_1 = require("../../common/internal/_interfaces");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _default_1 = require("../../data/localization/_default");
const _confirm_dialog_1 = require("../confirm-dialog/_confirm-dialog");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const name = 'saveDashboard';
const nameAlias = 'save-dashboard';
class SaveDashboardExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._confirmDialogViewModel = new _confirm_dialog_1.ConfirmDialogViewModel();
        this.canSaveDashboard = ko.computed(() => !!this.dashboardControl.dashboard());
        this._isDashboardDirty = ko.computed(() => this._undoEngineExtension && this._undoEngineExtension.isChanged());
        this._customTemplate = {
            name: 'dx-dashboard-confirm-dialog',
            data: this._confirmDialogViewModel
        };
        this.designerToViewerAction = {
            orderNo: 20,
            action: options => {
                var def = _jquery_helpers_1.createJQueryDeferred();
                this._ensureDashboardSaved()
                    .then(() => {
                    if (this._isDashboardDirty()) {
                        var container = this.dashboardControl.dashboardContainer();
                        this.dashboardControl.loadDashboard(container.id)
                            .done(() => def.resolve(options));
                    }
                    def.resolve(options);
                }, () => def.reject());
                return def.promise();
            }
        };
        this._menuItem = new toolbox_items_1.DashboardMenuItem('save', 'DashboardWebStringId.DashboardMenuSave', 110, _interfaces_1.KeyCodes.S, () => { this._toolboxExtension.closeMenu(); this.saveDashboard(); });
        this._menuItem.hasSeparator = true;
        this._menuItem.disabled = ko.computed(() => !this.canSaveDashboard() || !this._isDashboardDirty());
    }
    start() {
        this.dashboardControl.customTemplates.push(this._customTemplate);
        this._toolboxExtension.menuItems.push(this._menuItem);
    }
    stop() {
        this._toolboxExtension.menuItems.remove(this._menuItem);
        this.dashboardControl.customTemplates.remove(this._customTemplate);
    }
    get _toolboxExtension() {
        var extension = this.dashboardControl.findExtension('toolbox');
        if (!extension) {
            throw Error('Open Dashboard Extension requeries Toolbox Extension');
        }
        return extension;
    }
    get _undoEngineExtension() {
        return this.dashboardControl.findExtension('undoRedo');
    }
    performSaveDashboard(dashboardId, dashboardJson) {
        this.dashboardControl.notificationController.showState(_default_1.getLocalizationById('DashboardWebStringId.Notification.DashboardSaving'));
        return this.dashboardControl.remoteService.postToServer(this.dashboardControl._endpointCollection.dashboardUrls.DashboardAction + '/' + encodeURIComponent(dashboardId), dashboardJson)
            .done((result) => {
            this.dashboardControl.notificationController.showSuccess(_default_1.getLocalizationById('DashboardWebStringId.Notification.DashboardSaved'));
        }).fail((jqXHR) => {
            this.dashboardControl.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.DashboardCanNotBeSaved'), jqXHR);
        });
    }
    ensureDashboardSaved(action) {
        this._ensureDashboardSaved().done(action);
    }
    _ensureDashboardSaved() {
        let def = _jquery_helpers_1.createJQueryDeferred();
        if (this._isDashboardDirty()) {
            this._confirmDialogViewModel
                .confirm(_default_1.getLocalizationById('DashboardWebStringId.Dialog.ConfirmSaving'), _default_1.getLocalizationById('DashboardWebStringId.SaveConfirmationDialogMessage') + '<br/>' + _default_1.getLocalizationById('DashboardWebStringId.SaveChangesDialogMessage'), _default_1.getLocalizationById('DashboardWebStringId.Dialog.Save'), _default_1.getLocalizationById('DashboardWebStringId.Dialog.DoNotSave'))
                .then(result => {
                if (result) {
                    this.saveDashboard()
                        .done(() => def.resolve());
                }
                else {
                    def.resolve();
                }
            }, () => def.reject());
        }
        else {
            def.resolve();
        }
        return def.promise();
    }
    saveDashboard() {
        if (this.canSaveDashboard()) {
            var dashboardContainer = this.dashboardControl.dashboardContainer();
            return this.performSaveDashboard(dashboardContainer.id, dashboardContainer.dashboard.getJSON())
                .done(() => this._undoEngineExtension && this._undoEngineExtension.isChanged(false));
        }
        else {
            throw Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.DashboardSavingIsNotAvailable'));
        }
    }
}
exports.SaveDashboardExtension = SaveDashboardExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new SaveDashboardExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
