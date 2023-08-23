﻿/**
* DevExpress Dashboard (data-source-wizard-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiQueryDataSourceWizardExtension = exports.DataSourceWizardExtension = void 0;
const analytics_data_1 = require("@devexpress/analytics-core/analytics-data");
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const analytics_wizard_internal_1 = require("@devexpress/analytics-core/analytics-wizard-internal");
const queryBuilder_widgets_internal_1 = require("@devexpress/analytics-core/queryBuilder-widgets-internal");
const string_1 = require("devextreme/core/utils/string");
const ko = require("knockout");
const control_options_1 = require("../../common/control-options");
const _options_manager_1 = require("../../common/internal/_options-manager");
const _default_1 = require("../../data/localization/_default");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const dashboard_1 = require("../../model/dashboard");
const json_data_source_1 = require("../../model/data-sources/json-data-source");
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const _data_source_wizard_model_1 = require("./models/_data-source-wizard-model");
const _parameters_item_provider_1 = require("./pages/_parameters-item-provider");
const _data_source_wizard_1 = require("./wizards/_data-source-wizard");
const _edit_json_data_source_wizard_1 = require("./wizards/_edit-json-data-source-wizard");
const _multi_query_data_source_wizard_1 = require("./wizards/_multi-query-data-source-wizard");
const _helpers_1 = require("./_helpers");
const name = 'dataSourceWizard';
const nameAlias = 'data-source-wizard';
class DataSourceWizardExtension {
    constructor(dashboardControl, options = {}) {
        this.dashboardControl = dashboardControl;
        this._subscriptions = [];
        this._loadingPanelVisible = ko.observable(false);
        this._wizardElement = ko.observable();
        this._optionsManager = new _options_manager_1.OptionsManager();
        this._customTemplate = {
            name: 'dx-dashboard-data-source-wizard',
            data: {
                loadingPanelVisible: this._loadingPanelVisible,
                wizardElement: this._wizardElement
            }
        };
        this.name = name;
        let defaultOptions = {
            enableCustomSql: false,
            allowCreateNewJsonConnection: false,
            wizardSettings: {
                enableSqlDataSource: true,
                enableOlapDataSource: true,
                enableJsonDataSource: true,
                enableFederationDataSource: true
            }
        };
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: defaultOptions,
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => this._optionChanged(args)
        });
        this._requestWrapper = new _data_source_wizard_model_1.DashboardRequestWrapper(dashboardControl);
        this._dashboardParameters = ko.computed(() => dashboardControl.dashboard() && dashboardControl.dashboard().parameters() || []);
        this._getConnectionStringsCallback = () => {
            return this.dashboardControl.remoteService.getFromServer(dashboardControl._endpointCollection.dataSourceWizardUrls.GetConnectionStringsAction)
                .fail(request => {
                this.dashboardControl.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.AttemptToConnectionStrings'), request);
            });
        };
        _obsolete_helper_1.defineObsoleteMethod({
            target: this,
            memberName: 'createDataSource',
            oldMemberDisplayName: 'DataSourceWizardExtension.createDataSource',
            newMemberDisplayName: 'DataSourceWizardExtension.showDataSourceCreatingDialog',
            action: (dataSources) => {
                this.showDataSourceCreatingDialog().done((dataSource) => {
                    dataSources.push(dataSource);
                });
            }
        });
        _obsolete_helper_1.defineObsoleteMethod({
            target: this,
            memberName: 'editSqlQuery',
            oldMemberDisplayName: 'DataSourceWizardExtension.editSqlQuery',
            newMemberDisplayName: 'DataSourceWizardExtension.showSqlQueryEditingDialog',
            action: (dashboardSqlDataSource, queryName) => {
                this.showSqlQueryEditingDialog(dashboardSqlDataSource, queryName);
            }
        });
    }
    static _convertDataSource(dashboardSqlDataSource, requestWrapper) {
        var serializer = new analytics_utils_1.ModelSerializer({ useRefs: false });
        return dashboardSqlDataSource ?
            new analytics_data_1.SqlDataSource(serializer.serialize(dashboardSqlDataSource), serializer, requestWrapper) :
            new analytics_data_1.SqlDataSource({}, serializer, requestWrapper);
    }
    get isCustomSqlEnabled() { return this._optionsManager.get('enableCustomSql'); }
    get _dataSourceBrowser() { return this.dashboardControl._dataSourceBrowser; }
    start() {
        this.dashboardControl.customTemplates.push(this._customTemplate);
    }
    stop() {
        this.dashboardControl.customTemplates.remove(this._customTemplate);
        this._subscriptions.forEach(s => s.dispose());
        this._subscriptions = [];
    }
    showDataSourceCreatingDialog() {
        return this._showDataSourceCreatingDialog(this._getFederationDataProviders());
    }
    _getDashboardDataSources() {
        return this.dashboardControl.dashboard() && this.dashboardControl.dashboard().dataSources() || [];
    }
    _getFederationDataProviders(editedFederationDataSource) {
        return this._getDashboardDataSources().filter(ds => ds._isFederationDataProvider && ds !== editedFederationDataSource);
    }
    _showDataSourceCreatingDialog(federationDataProviders) {
        let deferred = _jquery_helpers_1.createJQueryDeferred();
        let loadingConnectionsStrings = true;
        this._loadingPanelVisible(true);
        let stopLoading = () => {
            loadingPanelSubscription.dispose();
            loadingConnectionsStrings = false;
        };
        let loadingPanelSubscription = this._loadingPanelVisible.subscribe(newValue => {
            if (!newValue && loadingConnectionsStrings) {
                stopLoading();
                deferred.reject();
            }
        });
        let dashboardConnectionStrings = {
            sql: ko.observableArray()
        };
        this._getConnectionStringsCallback()
            .done((connectionStrings) => {
            stopLoading();
            if (deferred.state() !== 'rejected') {
                dashboardConnectionStrings = {
                    sql: ko.observableArray(connectionStrings.filter(c => c.connectionType === 'Sql')),
                    json: ko.observableArray(connectionStrings.filter(c => c.connectionType === 'Json')),
                    olap: connectionStrings.filter(c => c.connectionType === 'Olap'),
                };
            }
        })
            .always(() => {
            stopLoading();
            if (deferred.state() !== 'rejected') {
                let wizardFederationSources = _helpers_1.createDataSourceInfos(federationDataProviders);
                let dataSourceWizard = this.createDataSourceWizard(dashboardConnectionStrings, wizardFederationSources);
                this._initializeDataSourceWizard(dataSourceWizard, deferred);
                this._renderAndStartWizard(dataSourceWizard);
                this._loadingPanelVisible(false);
            }
        });
        return deferred.promise();
    }
    showSqlQueryEditingDialog(dashboardSqlDataSource, queryName) {
        if (queryName && dashboardSqlDataSource.queries().filter(q => q.name() === queryName).length === 0)
            throw new Error(string_1.format(_default_1.getLocalizationById('DashboardWebStringId.Notification.QueryDoesNotExist'), queryName));
        var dataSource = DataSourceWizardExtension._convertDataSource(dashboardSqlDataSource, this._requestWrapper);
        let singleDataSourceWizard = this._createEditQueryWizard();
        singleDataSourceWizard.initialize({
            sqlDataSourceWizard: {
                sqlDataSourceJSON: JSON.stringify(new analytics_utils_1.ModelSerializer().serialize(dataSource)),
                queryName: queryName
            }
        }, (factory, stateManager) => new _data_source_wizard_1.EditQueryWizardIterator(factory, stateManager));
        singleDataSourceWizard['_finishCallback'] = (state) => {
            var model = analytics_wizard_1._restoreSqlDataSourceFromState(state.sqlDataSourceWizard);
            var queryIndex = model['_queryIndex'];
            var query = model.sqlQuery;
            if (queryIndex === dashboardSqlDataSource.queries().length) {
                dashboardSqlDataSource.queries.push(query);
            }
            else {
                let oldQuery = dashboardSqlDataSource.queries()[queryIndex];
                dashboardSqlDataSource.queries.splice(queryIndex, 1, query);
                if (oldQuery.name() !== query.name()) {
                    _helpers_1.renameDataMember(this.dashboardControl.dashboard(), dashboardSqlDataSource, oldQuery.name(), query.name());
                }
            }
            var def = _jquery_helpers_1.createJQueryDeferred();
            def.resolve();
            return def.promise();
        };
        this._renderAndStartWizard(singleDataSourceWizard);
    }
    showFederationQueryEditingDialog(dashboardFederationDataSource, queryName) {
        let element = this._wizardElement();
        if (element) {
            let queryIndex = dashboardFederationDataSource.queries().findIndex(q => q.alias() === queryName);
            if (queryIndex === -1)
                throw new Error(string_1.format(_default_1.getLocalizationById('DashboardWebStringId.Notification.QueryDoesNotExist'), queryName));
            let query = dashboardFederationDataSource.queries()[queryIndex];
            let federationDataProviders = this._getFederationDataProviders(dashboardFederationDataSource);
            let dataSourceInfos = _helpers_1.createDataSourceInfos(federationDataProviders);
            let analyticsDataSource = _helpers_1.toAnalyticsFederationDataSource(dashboardFederationDataSource, dataSourceInfos, this._dataSourceBrowser);
            let analyticsQuery = analyticsDataSource.queries().find(q => q.alias && q.alias() === queryName);
            let setQuery = (analyticsQuery) => {
                analyticsQuery.sources()
                    .forEach(analyticsSource => _helpers_1.addSourceIfNotExists(analyticsSource, dashboardFederationDataSource, dataSourceInfos));
                let newQuery = _helpers_1.toSameSourcesFederationQuery(analyticsQuery);
                _helpers_1.addOrUpdateQuery(this.dashboardControl.dashboard(), dashboardFederationDataSource, queryIndex, newQuery);
            };
            let popup;
            switch (query.queryType) {
                case 'SelectNode':
                    popup = new analytics_wizard_internal_1.FederationSelectQueryBuilderPopup(setQuery, analyticsDataSource);
                    break;
                case 'UnionNode':
                    popup = new analytics_wizard_internal_1.FederationUnionQueryBuilderPopup(setQuery, analyticsDataSource);
                    break;
                case 'TransformationNode':
                    popup = new analytics_wizard_internal_1.FederationTransformQueryBuilderPopup(setQuery, analyticsDataSource);
                    break;
                default:
                    throw new Error(`The query of '${query.queryType}' type cannot be edited. `);
            }
            ko.cleanNode(element);
            analytics_internal_1.appendStaticContextToRootViewModel(popup);
            ko.applyBindingsToNode(element, { template: 'dxrd-querybuilder-federation-popup' }, popup);
            let visibleSubscription = popup.popupVisible.subscribe(visible => {
                if (!visible) {
                    visibleSubscription.dispose();
                    popup.dispose();
                    ko.cleanNode(element);
                }
            });
            popup.show(analyticsQuery);
        }
    }
    showManageFederationQueriesDialog(dashboardFederationDataSource) {
        let element = this._wizardElement();
        if (element) {
            let federationDataProviders = this._getFederationDataProviders(dashboardFederationDataSource);
            let federationDataProvidersInfos = _helpers_1.createDataSourceInfos(federationDataProviders);
            let analyticsFederationDataSource = _helpers_1.toAnalyticsFederationDataSource(dashboardFederationDataSource, federationDataProvidersInfos, this._dataSourceBrowser);
            let editor = new queryBuilder_widgets_internal_1.ManageFederatedQueriesEditor(analyticsFederationDataSource, () => {
                analyticsFederationDataSource.sources()
                    .forEach(analyticsSource => _helpers_1.addSourceIfNotExists(analyticsSource, dashboardFederationDataSource, federationDataProvidersInfos));
                let removedQueries = dashboardFederationDataSource.queries().filter(dashboardQuery => !analyticsFederationDataSource.queries().some(analyticsQuery => analyticsQuery[_helpers_1.initialQueryAliasSymbol] === dashboardQuery.alias()));
                removedQueries.forEach(q => dashboardFederationDataSource.queries.remove(q));
                analyticsFederationDataSource.queries().forEach((analyticsQuery, i) => {
                    let newQuery = _helpers_1.toSameSourcesFederationQuery(analyticsQuery);
                    let initialQuery = dashboardFederationDataSource.queries().find(q => q.alias() === analyticsQuery[_helpers_1.initialQueryAliasSymbol]);
                    let queryIndex = !!initialQuery ? dashboardFederationDataSource.queries().indexOf(initialQuery) : dashboardFederationDataSource.queries().length;
                    _helpers_1.addOrUpdateQuery(this.dashboardControl.dashboard(), dashboardFederationDataSource, queryIndex, newQuery);
                });
            });
            ko.cleanNode(element);
            analytics_internal_1.appendStaticContextToRootViewModel(editor);
            ko.applyBindingsToNode(element, { template: 'dxrd-federated-manageQueries-editor' }, editor);
            let visibleSubscription = editor.popupVisible.subscribe(visible => {
                if (!visible) {
                    visibleSubscription.dispose();
                    editor.dispose();
                    analyticsFederationDataSource.dispose();
                }
            });
            editor.popupVisible(true);
        }
    }
    _createEditQueryWizard() {
        let wizard = _data_source_wizard_1.createDashboardDataSourceWizard(this._requestWrapper, this._dashboardParameters, !this.isCustomSqlEnabled, false, { enableOlapDataSource: false, enableSqlDataSource: false, enableJsonDataSource: false, enableObjectDataSource: false, enableFederationDataSource: false }, { sql: ko.observableArray() }, [], this._dataSourceBrowser, this.dashboardControl.customTemplates);
        this._customizeDataSourceWizard('EditQueryWizard', wizard);
        return wizard;
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'allowCreateNewJsonConnection':
            case 'enableCustomSql':
            case 'wizardSettings':
                return null;
            default:
                return null;
        }
    }
    createDataSourceWizard(connectionStrings, federationSources) {
        let wizard = _data_source_wizard_1.createDashboardDataSourceWizard(this._requestWrapper, this._dashboardParameters, !this.isCustomSqlEnabled, this._optionsManager.get('allowCreateNewJsonConnection') || this._optionsManager.getInitialOptions()['canCreateNewJsonDataSource'], this._optionsManager.get('wizardSettings'), connectionStrings, federationSources, this._dataSourceBrowser, this.dashboardControl.customTemplates);
        this._customizeDataSourceWizard('DataSourceWizard', wizard);
        return wizard;
    }
    _createEditJsonDataSourceWizard() {
        let wizard = _edit_json_data_source_wizard_1.createEditJsonDataSourceWizard(this._requestWrapper, this._dashboardParameters);
        this._customizeDataSourceWizard('EditJsonDataSourceWizard', wizard);
        return wizard;
    }
    _customizeDataSourceWizard(customizationType, wizard) {
        this._optionsManager.raiseEvent('customizeDataSourceWizard', { type: customizationType, wizard: wizard });
    }
    _createNewDataSourceWizardIterator(factory, stateManager) {
        return new _data_source_wizard_1.CreateNewDataSourceWizardIterator(factory, stateManager);
    }
    _initializeDataSourceWizard(wizard, deferred) {
        let initialState = new _data_source_wizard_1.DashboardDataSourceWizardState();
        wizard.initialize(initialState, (factory, stateManager) => this._createNewDataSourceWizardIterator(factory, stateManager));
        wizard['_finishCallback'] = (state) => {
            let sqlModel = state.sqlDataSourceWizard;
            let olapModel = state.olapDataSourceWizard;
            let jsonModel = state.jsonDataSourceWizard;
            let federationModel = state.federationDataSourceWizard;
            if (sqlModel && state.dashboardDataSourceType === 'Sql') {
                let sqlDataSource = dashboard_1.Dashboard._createDataSource({ '@ItemType': 'SqlDataSource' }, new analytics_utils_1.ModelSerializer());
                let dataSourceWrapper = analytics_wizard_1._restoreSqlDataSourceFromState(sqlModel);
                sqlDataSource.connection.name(dataSourceWrapper.sqlDataSource.connection.name());
                sqlDataSource.connection.fromAppConfig(true);
                dataSourceWrapper.sqlDataSource.queries().forEach(query => {
                    sqlDataSource.queries.push(query);
                    sqlDataSource.name(sqlDataSource.queries()[0].name());
                });
                deferred.resolve(sqlDataSource);
                return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
            }
            else if (olapModel && state.dashboardDataSourceType === 'Olap') {
                let olapDataSource = dashboard_1.Dashboard._createDataSource({ '@ItemType': 'OLAPDataSource' }, new analytics_utils_1.ModelSerializer());
                olapDataSource.connectionName(olapModel.connectionName);
                olapDataSource.name(_default_1.getLocalizationById('DashboardStringId.DefaultOlapDataSourceName'));
                deferred.resolve(olapDataSource);
                return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
            }
            else if (jsonModel && state.dashboardDataSourceType === 'Json') {
                let jsonDeferred = _jquery_helpers_1.createJQueryDeferred();
                let analyticsDataSourceDeferred = _jquery_helpers_1.createJQueryDeferred();
                let analyticsDataSource = analytics_wizard_1._restoreJsonDataSourceFromState(jsonModel);
                if (jsonModel.newConnectionName) {
                    var jsonSource = analyticsDataSource.source;
                    var jsonSourceJSON = JSON.stringify(jsonSource.serialize(true));
                    var requestString = JSON.stringify({
                        connectionName: jsonModel.newConnectionName,
                        customJson: jsonSource.json(),
                        uriJsonSourceJSON: jsonSourceJSON
                    });
                    this._requestWrapper
                        .sendRequest('saveJsonSource', encodeURIComponent(requestString))
                        .done(() => {
                        analyticsDataSource.connectionName(jsonModel.newConnectionName);
                        analyticsDataSource.source = null;
                        analyticsDataSourceDeferred.resolve(analyticsDataSource);
                    })
                        .fail(() => analyticsDataSourceDeferred.reject());
                }
                else {
                    analyticsDataSourceDeferred.resolve(analyticsDataSource);
                }
                analyticsDataSourceDeferred
                    .done((repDataSource) => {
                    var serializer = new analytics_utils_1.ModelSerializer();
                    var analyticsJsonDataSourceJson = serializer.serialize(repDataSource);
                    var dataSource = new json_data_source_1.JsonDataSource(analyticsJsonDataSourceJson);
                    dataSource.name(_default_1.getLocalizationById('DashboardStringId.DefaultJsonDataSourceName'));
                    deferred.resolve(dataSource);
                    jsonDeferred.resolve();
                })
                    .fail(() => {
                    deferred.reject();
                    jsonDeferred.reject();
                });
                return jsonDeferred.promise();
            }
            else if (federationModel && state.dashboardDataSourceType === 'Federation') {
                deferred.resolve(_helpers_1.createNewFederationDataSource(federationModel, wizard.options.dataSources));
                return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
            }
            else {
                deferred.reject();
                throw Error(_default_1.getLocalizationById('DashboardWebStringId.Notification.UnsupportedDataSourceType'));
            }
        };
    }
    _showEditJsonDataSourceDialog(jsonDataSource) {
        var serializer = new analytics_utils_1.ModelSerializer();
        var dashboardJsonDataSourceJson = serializer.serialize(jsonDataSource);
        let editJsonDataSourceWizard = this._createEditJsonDataSourceWizard();
        editJsonDataSourceWizard.initialize({
            jsonDataSourceWizard: {
                jsonScheme: JSON.stringify(dashboardJsonDataSourceJson.Schema),
                rootElement: jsonDataSource.rootElement()
            }
        }, (factory, stateManager) => new _edit_json_data_source_wizard_1.EditJsonDataSourceWizardIterator(factory, stateManager));
        editJsonDataSourceWizard['_finishCallback'] = (state) => {
            var jsonModel = state.jsonDataSourceWizard;
            if (jsonModel) {
                var modifiedReportsDataSource = analytics_wizard_1._restoreJsonDataSourceFromState(jsonModel);
                jsonDataSource.schema(modifiedReportsDataSource.schema);
                jsonDataSource.rootElement(modifiedReportsDataSource.rootElement());
            }
            return _jquery_helpers_1.createJQueryDeferred().resolve().promise();
        };
        this._renderAndStartWizard(editJsonDataSourceWizard);
    }
    _renderAndStartWizard(wizardModel) {
        var element = this._wizardElement();
        if (element) {
            ko.cleanNode(element);
            var viewModel = {
                wizardModel: wizardModel,
                dataBindingsProvider: new _parameters_item_provider_1.ParametersItemProvider(this._dashboardParameters()),
                resizeHandler: {
                    starting: () => { },
                    stopped: () => { },
                    disabled: analytics_internal_1.DragDropHandler.started
                }
            };
            analytics_internal_1.appendStaticContextToRootViewModel(viewModel);
            ko.applyBindingsToNode(element, { template: 'dx-dashboard-data-source-wizard-binding' }, viewModel);
            wizardModel.isVisible.subscribe(visible => {
                if (!visible) {
                    wizardModel.dispose();
                    ko.cleanNode(element);
                }
            });
        }
        wizardModel.start();
    }
}
exports.DataSourceWizardExtension = DataSourceWizardExtension;
class MultiQueryDataSourceWizardExtension extends DataSourceWizardExtension {
    constructor(dashboardControl, options) {
        super(dashboardControl, options);
    }
    _createNewDataSourceWizardIterator(factory, stateManager) {
        return new _multi_query_data_source_wizard_1.DashboardMultiQueryWizardIterator(factory, stateManager);
    }
    createDataSourceWizard(connectionStrings, federationSources) {
        let wizard = _multi_query_data_source_wizard_1.createDashboardMultiQueryWizard(this._requestWrapper, this._dashboardParameters, !this.isCustomSqlEnabled, this._optionsManager.get('allowCreateNewJsonConnection') || this._optionsManager.getInitialOptions()['canCreateNewJsonDataSource'], this._optionsManager.get('wizardSettings'), connectionStrings, federationSources, this._dataSourceBrowser, this.dashboardControl.customTemplates);
        this._customizeDataSourceWizard('MultiQueryDataSourceWizard', wizard);
        return wizard;
    }
}
exports.MultiQueryDataSourceWizardExtension = MultiQueryDataSourceWizardExtension;
control_options_1.designerExtensions[nameAlias] = (dashboardControl, options) => new DataSourceWizardExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
ko.virtualElements.allowedBindings['dx-dashboard-element-accessor-binding'] = true;
ko.bindingHandlers['dx-dashboard-element-accessor-binding'] = {
    init: function (element, valueAccessor, _, __, bindingContext) {
        var params = ko.unwrap(valueAccessor());
        params.element(element);
        return { controlsDescendantBindings: true };
    }
};
