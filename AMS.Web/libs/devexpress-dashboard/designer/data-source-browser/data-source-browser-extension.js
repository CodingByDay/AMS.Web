/**
* DevExpress Dashboard (data-source-browser-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceBrowserExtension = void 0;
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const _data_source_browser_viewmodel_1 = require("./_data-source-browser-viewmodel");
const name = 'dataSourceBrowser';
const nameAlias = 'data-source-browser';
class DataSourceBrowserExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this._perDashboardSubscription = [];
        this._dataSourceBrowserViewModel = ko.observable();
        this._menuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardWebStringId.DashboardMenuDataSources', 210, 65);
        this._menuItem.template = 'dx-dashboard-form-datasource-browser';
        this._menuItem.data = this._dataSourceBrowserViewModel;
        this._menuItem.disabled = ko.computed(() => !this.dashboardControl.dashboard());
        _obsolete_helper_1.defineObsoleteProperty({
            target: this,
            memberName: 'dataSourceBrowserViewModel',
            oldMemberDisplayName: 'dataSourceBrowserViewModel',
            action: () => this._dataSourceBrowserViewModel
        });
    }
    _disposePerDashboardSubcriptions() {
        this._perDashboardSubscription.forEach(s => s.dispose());
        this._perDashboardSubscription = [];
    }
    _updateExtensionModel(dashboard) {
        this._disposePerDashboardSubcriptions();
        if (!!dashboard) {
            var dataSourceWizardExtension = ko.computed(() => (this.dashboardControl.findExtension('dataSourceWizard')));
            var accessibleDataSourcesExtension = ko.computed(() => (this.dashboardControl.findExtension('availableDataSources')));
            var viewModel = new _data_source_browser_viewmodel_1.DataSourceBrowserViewModel(this.dashboardControl._dataSourceBrowser, dataSourceWizardExtension, accessibleDataSourcesExtension, this.dashboardControl._updateHub);
            this._perDashboardSubscription.push(dataSourceWizardExtension);
            this._perDashboardSubscription.push(accessibleDataSourcesExtension);
            this._perDashboardSubscription.push(viewModel);
            this._dataSourceBrowserViewModel(viewModel);
        }
        else {
            this._dataSourceBrowserViewModel(null);
        }
    }
    start() {
        let toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.push(this._menuItem);
        }
        this._subscription = this.dashboardControl.dashboard.subscribe(this._updateExtensionModel, this);
        this._updateExtensionModel(this.dashboardControl.dashboard());
    }
    stop() {
        this._disposePerDashboardSubcriptions();
        if (this._subscription) {
            this._subscription.dispose();
            this._subscription = undefined;
        }
        let toolboxExtension = this.dashboardControl.findExtension('toolbox');
        if (toolboxExtension) {
            toolboxExtension.menuItems.remove(this._menuItem);
        }
    }
}
exports.DataSourceBrowserExtension = DataSourceBrowserExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DataSourceBrowserExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
