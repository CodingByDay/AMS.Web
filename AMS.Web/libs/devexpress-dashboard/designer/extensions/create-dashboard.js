﻿/**
* DevExpress Dashboard (create-dashboard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDashboardExtension = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _default_1 = require("../../data/localization/_default");
const dashboard_1 = require("../../model/dashboard");
const toolbox_items_1 = require("../toolbox-extension/toolbox-items");
const name = 'createDashboard';
const nameAlias = 'create-dashboard';
class CreateDashboardExtension {
    constructor(dashboardControl) {
        this.dashboardControl = dashboardControl;
        this.name = name;
        this.showCreateNewDashboard = () => {
            var extension = this.dashboardControl.findExtension('toolbox');
            if (extension) {
                extension.selectMenuItem(this._newDashboardMenuItem);
            }
        };
        this._createNewDashboard = (dataSources, dashboardName) => {
            var toolboxExtension = this.dashboardControl.findExtension('toolbox');
            if (toolboxExtension) {
                toolboxExtension.menuVisible(false);
            }
            let createDashboardCallback = () => {
                var dashboardPropotype = new dashboard_1.Dashboard({});
                dashboardPropotype.title.text(dashboardName);
                dataSources.forEach(dataSource => {
                    var newDataSource = dashboard_1.Dashboard._createDataSource(new analytics_utils_1.ModelSerializer({ useRefs: false }).serialize(dataSource), new analytics_utils_1.ModelSerializer());
                    dashboardPropotype.dataSources.push(newDataSource);
                });
                this.performCreateDashboard(dashboardName, dashboardPropotype.getJSON());
            };
            let saveExtension = this.dashboardControl.findExtension('saveDashboard');
            if (saveExtension) {
                saveExtension.ensureDashboardSaved(createDashboardCallback);
            }
            else {
                createDashboardCallback();
            }
        };
        var accessibleDataSourcesExtension = ko.computed(() => this.dashboardControl.findExtension('availableDataSources'));
        var clickHandler = () => {
            this._newDashboardMenuItem.template = 'dx-dashboard-form-new';
            this._newDashboardMenuItem.data = new CreateNewDashboardViewModel(accessibleDataSourcesExtension, this._createNewDashboard);
        };
        this._newDashboardMenuItem = new toolbox_items_1.DashboardMenuItem(nameAlias, 'DashboardWebStringId.DashboardMenuNew', 105, 78, () => clickHandler());
    }
    start() {
        var extension = this.dashboardControl.findExtension('toolbox');
        if (extension) {
            extension.menuItems.push(this._newDashboardMenuItem);
        }
        this.dashboardControl._emptyControlTemplates.push({
            name: 'dx-dashboard-add-new-dashboard',
            data: {
                isDesignMode: this.dashboardControl.isDesignMode,
                showCreateNewDashboard: this.showCreateNewDashboard
            }
        });
    }
    stop() {
        var extension = this.dashboardControl.findExtension('toolbox');
        if (extension) {
            extension.menuItems.remove(this._newDashboardMenuItem);
        }
        var template = this.dashboardControl._emptyControlTemplates().filter(temlp => temlp.name === 'dx-dashboard-add-new-dashboard')[0];
        if (template) {
            this.dashboardControl._emptyControlTemplates.remove(template);
        }
    }
    performCreateDashboard(dashboardName, dashboardJson) {
        this.dashboardControl.notificationController.showState(_default_1.getLocalizationById('DashboardWebStringId.Notification.DashboardLoading'));
        return this.dashboardControl.remoteService.postToServer(this.dashboardControl._endpointCollection.dashboardUrls.GetDashboardsAction, { name: dashboardName, dashboard: dashboardJson })
            .then((result, status, query) => {
            this.dashboardControl.initializeDashboard(result['dashboardId'], result['dashboard'].Dashboard);
        }, request => {
            this.dashboardControl.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.NewDashboardCannotBeCreated'), request);
        });
    }
}
exports.CreateDashboardExtension = CreateDashboardExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new CreateDashboardExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
class CreateNewDashboardViewModel {
    constructor(accessibleDataSourcesExtension, _newDashboardCallback) {
        this.accessibleDataSourcesExtension = accessibleDataSourcesExtension;
        this._newDashboardCallback = _newDashboardCallback;
        this.dashboardName = ko.observable();
        this.selectionMode = 'single';
        this.createNewDashboard = () => {
            this._newDashboardCallback(this.accessibleDataSourcesExtension().selectedDataSources(), this.dashboardName());
        };
        this.dashboardName(_default_1.getLocalizationById('DashboardWebStringId.NewDashboard'));
        this.createNewDashboardDisabled = ko.computed(() => {
            return !this.dashboardName() || !this.accessibleDataSourcesExtension() || this.accessibleDataSourcesExtension().selectedDataSources().length === 0;
        });
    }
}
