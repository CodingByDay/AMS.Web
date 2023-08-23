﻿/**
* DevExpress Dashboard (parameters-editor-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardParameterEditorExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const _parameter_list_editor_viewmodel_1 = require("./_parameter-list-editor-viewmodel");
const name = 'dashboardParameterEditor';
const nameAlias = 'dashboard-parameter-editor';
class DashboardParameterEditorExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this.dashboard = ko.computed(() => dashboardControl.dashboard());
        this._viewModel = new _parameter_list_editor_viewmodel_1.ParameterListEditorViewModel(this.dashboard, () => dashboardControl._dataSourceBrowser);
        this._menuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardWebStringId.DashboardParameters', 240, 80);
        this._menuItem.template = 'dx-dashboard-form-parameters-settings';
        this._menuItem.data = this._viewModel;
        this._menuItem.disabled = ko.computed(() => !dashboardControl.dashboard());
    }
    start() {
        this._viewModel.initialize();
        var toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.push(this._menuItem);
        }
    }
    stop() {
        var toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.remove(this._menuItem);
        }
        this._viewModel.dispose();
    }
}
exports.DashboardParameterEditorExtension = DashboardParameterEditorExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DashboardParameterEditorExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
