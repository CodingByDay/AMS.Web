﻿/**
* DevExpress Dashboard (_data-source-wizard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardDataSourceWizard = exports.DashboardDataSourceWizardState = exports.DashboardDataSourceWizard = exports.DashboardDataSourceWizardBase = exports.EditQueryWizardIterator = exports.CreateNewDataSourceWizardIterator = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const $ = require("jquery");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const data_source_wizard_model_1 = require("../models/data-source-wizard-model");
const _data_source_wizard_model_1 = require("../models/_data-source-wizard-model");
const choose_data_source_type_page_1 = require("../pages/choose-data-source-type-page");
const choose_olap_connection_string_page_1 = require("../pages/choose-olap-connection-string-page");
const federated_query_configure_page_1 = require("../pages/federated-query-configure-page");
const _choose_json_schema_page_1 = require("../pages/_choose-json-schema-page");
const _create_query_page_1 = require("../pages/_create-query-page");
const _parameters_item_provider_1 = require("../pages/_parameters-item-provider");
const _helpers_1 = require("../_helpers");
const _data_source_wizard_page_iterator_1 = require("./_data-source-wizard-page-iterator");
class CreateNewDataSourceWizardIterator extends _data_source_wizard_page_iterator_1.DataSourceWizardPageIteratorBase {
    constructor(factory, stateManager) {
        super(factory, stateManager);
    }
}
exports.CreateNewDataSourceWizardIterator = CreateNewDataSourceWizardIterator;
class EditQueryWizardIterator extends _data_source_wizard_page_iterator_1.DataSourceWizardPageIteratorBase {
    constructor(factory, stateManager) {
        super(factory, stateManager);
    }
    getInitialPage() {
        return analytics_wizard_1.SqlDataSourceWizardPageId.ConfigureQueryPage;
    }
}
exports.EditQueryWizardIterator = EditQueryWizardIterator;
class DashboardDataSourceWizardBase extends analytics_wizard_1.PopupWizard {
    constructor(factory) {
        super(factory);
    }
}
exports.DashboardDataSourceWizardBase = DashboardDataSourceWizardBase;
class DashboardDataSourceWizard extends DashboardDataSourceWizardBase {
    constructor(factory, options) {
        super(factory);
        this.title = _default_1.getLocalizationById('DashboardWebStringId.DataSources.DashboardDataSourceWizard');
        this._container = (element) => $.fn.constructor(element).closest('.dx-dashboard-widget-container');
        this._extendCssClass = 'dxrd-sqldatasource-wizard';
        this._options = options;
    }
    get options() {
        return this._options;
    }
}
exports.DashboardDataSourceWizard = DashboardDataSourceWizard;
class DashboardDataSourceWizardState {
    constructor() {
        this.sqlDataSourceWizard = {};
        this.jsonDataSourceWizard = {};
        this.olapDataSourceWizard = {};
        this.objectDataSourceWizard = {};
        this.federationDataSourceWizard = {};
    }
    get dashboardDataSourceType() {
        return this.dataSourceType && data_source_wizard_model_1.ToDashboardDataSourceType(this.dataSourceType) || undefined;
    }
    set dashboardDataSourceType(value) {
        this.dataSourceType = data_source_wizard_model_1.ToDataSourceTypeNumber(value);
    }
}
exports.DashboardDataSourceWizardState = DashboardDataSourceWizardState;
function createDashboardDataSourceWizard(requestWrapper, parameters, disableCustomSql, allowCreateNewJsonConnection, wizardSettings, dashboardConnectionStrings, dataSources, dataSourceBrowser, customTemplates) {
    var factory = new analytics_wizard_1.PageFactory();
    var wizardOptions = new _data_source_wizard_model_1.DashboardDataSourceWizardOptions();
    wizardOptions.callbacks = _create_query_page_1.createQueryPageCallback(requestWrapper, parameters, dataSourceBrowser);
    wizardOptions.disableCustomSql = disableCustomSql;
    wizardOptions.requestWrapper = requestWrapper;
    wizardOptions.wizardSettings = _helpers_1.createWizardSettings(wizardSettings);
    wizardOptions.allowCreateNewJsonConnection = allowCreateNewJsonConnection || false;
    wizardOptions.connectionStrings = dashboardConnectionStrings;
    wizardOptions.dataSources = ko.pureComputed(() => dataSources);
    choose_data_source_type_page_1._registerChooseDataSourceTypePage(factory, wizardOptions, customTemplates);
    analytics_wizard_1._registerChooseSqlConnectionPage(factory, dashboardConnectionStrings.sql);
    choose_olap_connection_string_page_1._registerOlapConnectionStringsPage(factory, dashboardConnectionStrings.olap);
    analytics_wizard_1._registerChooseJsonConnectionPage(factory, wizardOptions);
    analytics_wizard_1._registerConfigureQueryPage(factory, wizardOptions);
    analytics_wizard_1._registerConfigureParametersPage(factory, requestWrapper);
    analytics_wizard_1._registerChooseJsonSourcePage(factory, requestWrapper, () => new _parameters_item_provider_1.ParametersItemProvider(parameters()));
    _choose_json_schema_page_1._registerChooseJsonSchemaPage(factory, requestWrapper, parameters);
    federated_query_configure_page_1._registerFederatedQueryConfigurePage(factory, wizardOptions);
    return new DashboardDataSourceWizard(factory, wizardOptions);
}
exports.createDashboardDataSourceWizard = createDashboardDataSourceWizard;
