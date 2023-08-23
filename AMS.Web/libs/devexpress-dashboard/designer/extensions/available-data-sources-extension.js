﻿/**
* DevExpress Dashboard (available-data-sources-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailableDataSourcesExtension = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const notificator_1 = require("../../common/notification-controller/notificator");
const _default_1 = require("../../data/localization/_default");
const dashboard_1 = require("../../model/dashboard");
const disposable_object_1 = require("../../model/disposable-object");
const _helper_classes_1 = require("../../model/internal/_helper-classes");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const _available_data_sources_view_model_1 = require("./_available-data-sources-view-model");
const name = 'availableDataSources';
const nameAlias = 'available-data-sources';
class AvailableDataSourcesExtension extends disposable_object_1.DisposableObject {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
        this.name = name;
        this.templateName = 'dx-dashboard-datasource-available-datasources';
        this.selectedDataSources = ko.observableArray();
        this.dataSources = ko.observableArray();
        this._errorState = ko.observable(null);
        this._uiState = ko.observable('empty');
        let showCreateDataSourceWizardDelegate = ko.computed(() => {
            var dataSourceWizardExtension = (this.dashboardControl.findExtension('dataSourceWizard'));
            if (dataSourceWizardExtension) {
                return (federationSources) => {
                    let createdDataSourcePromise = federationSources ? dataSourceWizardExtension._showDataSourceCreatingDialog(federationSources) : dataSourceWizardExtension.showDataSourceCreatingDialog();
                    createdDataSourcePromise.done(dataSource => {
                        _helper_classes_1.NameGenerator.validateName(dataSource, this.dataSources(), 'name', 1, true);
                        this.dataSources.push(dataSource);
                    });
                };
            }
            else {
                return null;
            }
        });
        this.toDispose(showCreateDataSourceWizardDelegate);
        let isInitialized = false;
        let uiStateComputed = ko.computed(() => {
            if (!isInitialized) {
                this.loadAvailableDataSources();
                isInitialized = true;
            }
            return this._uiState();
        }, this, {
            deferEvaluation: true
        });
        this.toDispose(uiStateComputed);
        this.viewModel = new _available_data_sources_view_model_1.AvailableDataSourcesViewModel(this.dataSources, this.selectedDataSources, uiStateComputed, this._errorState, showCreateDataSourceWizardDelegate);
        _obsolete_helper_1.defineObsoleteMethod({
            target: this,
            memberName: 'loadAvaliableDataSources',
            oldMemberDisplayName: 'AvailableDataSourcesExtension.loadAvaliableDataSources',
            newMemberDisplayName: 'AvailableDataSourcesExtension.loadAvailableDataSources',
            action: () => this.loadAvailableDataSources()
        });
    }
    start() {
        if (this.dataSources().length > 0) {
            this.selectedDataSources([this.dataSources()[0]]);
        }
        _knockout_utils_1.subscribeArrayChange(this.dataSources, {
            added: (item) => this.selectedDataSources([item])
        });
    }
    stop() {
        this._errorState(null);
    }
    loadAvailableDataSources() {
        if (this.dashboardControl._endpointCollection.dataSourceUrls) {
            this._uiState('loading');
            this.dashboardControl.remoteService.getFromServer(this.dashboardControl._endpointCollection.dataSourceUrls.GetDataSourcesAction)
                .then((result) => {
                let dataSources = analytics_utils_1.deserializeArray(result, (item) => dashboard_1.Dashboard._createDataSource(item, new analytics_utils_1.ModelSerializer()))();
                dataSources.forEach(dataSource => {
                    if (!dataSource.name()) {
                        dataSource.name(_helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.DefaultDataSourceName') + ' ', dataSources, 'name', 1));
                    }
                });
                this.dataSources(dataSources);
                this._uiState('live');
            }, (errorInfo) => {
                let errorDetail = notificator_1.NotificationController._getDetailedErrorMessage(errorInfo);
                this._errorState({
                    title: _default_1.getLocalizationById('DashboardWebStringId.DataSources.AvailableDataSourcesError'),
                    detail: errorDetail
                });
                this._uiState('error');
            });
        }
    }
}
exports.AvailableDataSourcesExtension = AvailableDataSourcesExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new AvailableDataSourcesExtension(dashboardControl);
control_options_1.extensionNameMap[nameAlias] = name;
