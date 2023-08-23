﻿/**
* DevExpress Dashboard (open-dashboard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenDashboardExtension = void 0;
const array_store_1 = require("devextreme/data/array_store");
const control_options_1 = require("../../common/control-options");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const name = 'openDashboard';
const nameAlias = 'open-dashboard';
class OpenDashboardExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._menuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardWebStringId.DashboardMenuOpen', 108, 79);
        this._menuItem.template = 'dx-dashboard-form-open';
        this._menuItem.data = {
            dashboardsListStore: (loadOptions) => {
                let def = _jquery_helpers_1.createJQueryDeferred();
                this.dashboardControl.requestDashboardList().done(items => {
                    new array_store_1.default(items).load({ filter: loadOptions.searchValue ? [loadOptions.searchExpr, loadOptions.searchOperation, loadOptions.searchValue] : null }).then(function (data) {
                        def.resolve(data);
                    });
                });
                return def;
            },
            openDashboard: (e) => {
                let toolboxExtension = this.dashboardControl.findExtension('toolbox');
                if (toolboxExtension) {
                    toolboxExtension.menuVisible(false);
                }
                let openDashboardCallback = () => this.loadDashboard(e.itemData.id);
                let saveExtension = this.dashboardControl.findExtension('saveDashboard');
                if (saveExtension) {
                    saveExtension.ensureDashboardSaved(openDashboardCallback);
                }
                else {
                    openDashboardCallback();
                }
            }
        };
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
    loadDashboard(dashboardId) {
        return this.dashboardControl.loadDashboard(dashboardId);
    }
}
exports.OpenDashboardExtension = OpenDashboardExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new OpenDashboardExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
