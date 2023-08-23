﻿/**
* DevExpress Dashboard (title-settings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitleEditorExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _dashboard_title_model_1 = require("../../common/viewer/title/_dashboard-title-model");
const _default_1 = require("../../data/localization/_default");
const disposable_object_1 = require("../../model/disposable-object");
const _base_metadata_1 = require("../../model/metadata/_base-metadata");
const _title_1 = require("../../model/metadata/_title");
const _dashboard_title_view_constants_1 = require("../../viewer-parts/title/_dashboard-title-view-constants");
const _form_adapter_editors_1 = require("../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../form-adapter/_object-properties-wrapper");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const name = 'dashboardTitleEditor';
const nameAlias = 'dashboard-title-editor';
class DashboardTitleEditorExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._titlePreviewViewModel = ko.observable(null);
        this._titleSettingsViewModel = ko.observable(null);
        this._perDashboardSubscriptions = [];
        this._menuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardStringId.Title', 220, 84);
        this._menuItem.template = 'dx-dashboard-form-title-settings';
        this._menuItem.data = {
            formCaption: _default_1.getLocalizationById('DashboardWebStringId.Preview'),
            titleSettings: this._titleSettingsViewModel,
            getTitleComponentArgs: $element => ({
                options: this._titlePreviewViewModel,
                height: ko.observable(_dashboard_title_view_constants_1.titleHeight),
                width: ko.observable($element.parentElement.innerWidth),
                encodeHtml: true
            })
        };
        this._menuItem.disabled = ko.computed(() => !dashboardControl.dashboard());
    }
    start() {
        this._updateTitleToolbar();
        this.toDispose(this.dashboardControl.dashboard.subscribe(() => this._updateTitleToolbar()));
        let toolbarExtension = this.dashboardControl.findExtension('toolbox');
        if (toolbarExtension) {
            toolbarExtension.menuItems.push(this._menuItem);
        }
    }
    stop() {
        let toolbarExtension = this.dashboardControl.findExtension('toolbox');
        if (toolbarExtension) {
            toolbarExtension.menuItems.remove(this._menuItem);
        }
        this.dispose();
    }
    dispose() {
        this._disposePerDashboardSubscriptions();
        super.dispose();
    }
    _disposePerDashboardSubscriptions() {
        this._perDashboardSubscriptions.forEach(disposable => disposable.dispose());
        this._perDashboardSubscriptions = [];
        if (this._titlePreviewViewModel()) {
            this._titleSettingsViewModel().unbindModel();
        }
        this._titlePreviewViewModel(null);
        this._titleSettingsViewModel(null);
    }
    _updateTitleToolbar() {
        this._disposePerDashboardSubscriptions();
        if (this.dashboardControl.dashboard()) {
            let titleModel = new _dashboard_title_model_1.DashboardTitleModel(undefined, this.dashboardControl.dashboard());
            this._titlePreviewViewModel(titleModel.toolbarOptions());
            this._titleSettingsViewModel(this._createTitleSettings(this.dashboardControl.dashboard().title));
            this._perDashboardSubscriptions.push(titleModel.toolbarOptions.subscribe(newOptions => {
                this._titlePreviewViewModel(newOptions);
            }));
        }
    }
    _createTitleSettings(titleModel) {
        const visibilityRules = {};
        visibilityRules[_title_1.titleImage64.propertyName] = () => titleModel.imageType() === 'embedded';
        visibilityRules[_base_metadata_1.url.propertyName] = () => titleModel.imageType() === 'linked';
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: titleModel,
            properties: [
                _title_1.titleText,
                _title_1.titleVisible,
                _title_1.titleAlignment,
                _title_1.includeMasterFilter,
                _title_1.titleImageType,
                Object.assign(Object.assign({}, _title_1.titleImage64), { formAdapterItem: _form_adapter_editors_1.filePickerEditor({ placeholderId: 'Image', accept: 'image/bmp, image/gif, image/x-ico, image/jpeg, image/png, image/tiff', type: 'img' }) }),
                _title_1.titleImageUrl
            ],
            visibilityFilterRules: visibilityRules,
        });
    }
}
exports.DashboardTitleEditorExtension = DashboardTitleEditorExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DashboardTitleEditorExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
