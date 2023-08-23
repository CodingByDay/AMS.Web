/**
* DevExpress Dashboard (dashboard-currency-editor-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardCurrencyEditorExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const name = 'dashboardCurrencyEditor';
const nameAlias = 'dashboard-currency-editor';
class DashboardCurrencyEditorExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._menuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardWebStringId.DashboardMenuCurrency', 230, 67);
        this._menuItem.template = 'dx-dashboard-form-currency-settings';
        this._menuItem.data = dashboardControl;
        this._menuItem.disabled = ko.computed(() => !this.dashboardControl.dashboard());
    }
    start() {
        let toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.push(this._menuItem);
        }
    }
    stop() {
        let toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.remove(this._menuItem);
        }
    }
}
exports.DashboardCurrencyEditorExtension = DashboardCurrencyEditorExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DashboardCurrencyEditorExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
