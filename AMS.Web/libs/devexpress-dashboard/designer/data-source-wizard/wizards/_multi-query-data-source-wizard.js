﻿/**
* DevExpress Dashboard (_multi-query-data-source-wizard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDashboardMultiQueryWizard = exports.DashboardMultiQueryDataSourceWizard = exports.DashboardMultiQueryWizardIterator = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const ko = require("knockout");
const _data_source_wizard_model_1 = require("../models/_data-source-wizard-model");
const choose_data_source_type_page_1 = require("../pages/choose-data-source-type-page");
const choose_olap_connection_string_page_1 = require("../pages/choose-olap-connection-string-page");
const _choose_json_schema_page_1 = require("../pages/_choose-json-schema-page");
const _create_query_page_1 = require("../pages/_create-query-page");
const _parameters_item_provider_1 = require("../pages/_parameters-item-provider");
const _helpers_1 = require("../_helpers");
const _data_source_wizard_1 = require("./_data-source-wizard");
const _data_source_wizard_page_iterator_1 = require("./_data-source-wizard-page-iterator");
class DashboardMultiQueryWizardIterator extends _data_source_wizard_page_iterator_1.DataSourceWizardPageIteratorBase {
    getInitialPage() {
        return super.getInitialPage();
    }
    getConfigureQueryPage() {
        return analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigurePage;
    }
    getConfigureSqlParametersPage() {
        return analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigureParametersPage;
    }
}
exports.DashboardMultiQueryWizardIterator = DashboardMultiQueryWizardIterator;
class DashboardMultiQueryDataSourceWizard extends _data_source_wizard_1.DashboardDataSourceWizardBase {
    constructor(pageFactory, options) {
        super(pageFactory);
        this._extendCssClass = 'dxrd-multiqueries-sqldatasource-wizard';
        this.height(443);
        this._options = options;
    }
    get options() {
        return this._options;
    }
}
exports.DashboardMultiQueryDataSourceWizard = DashboardMultiQueryDataSourceWizard;
function createDashboardMultiQueryWizard(requestWrapper, parameters, disableCustomSql, allowCreateNewJsonConnection, wizardSettings, dashboardConnectionStrings, dataSources, dataSourceBrowser, customTemplates) {
    var factory = new analytics_wizard_1.PageFactory();
    var wizardOptions = new _data_source_wizard_model_1.DashboardMultiQueryDataSourceWizardOptions();
    wizardOptions.callbacks = _create_query_page_1.createQueryPageCallback(requestWrapper, parameters, dataSourceBrowser, DashboardMultiQueryDataSourceWizard.customQueriesPreset);
    wizardOptions.disableCustomSql = disableCustomSql;
    wizardOptions.requestWrapper = requestWrapper;
    wizardOptions.wizardSettings = _helpers_1.createWizardSettings(wizardSettings);
    wizardOptions.allowCreateNewJsonConnection = allowCreateNewJsonConnection || false;
    wizardOptions.connectionStrings = dashboardConnectionStrings;
    wizardOptions.dataSources = ko.pureComputed(() => dataSources);
    choose_data_source_type_page_1._registerChooseDataSourceTypePage(factory, wizardOptions, customTemplates);
    analytics_wizard_1._registerChooseSqlConnectionPage(factory, dashboardConnectionStrings.sql);
    choose_olap_connection_string_page_1._registerOlapConnectionStringsPage(factory, dashboardConnectionStrings.olap);
    analytics_wizard_1._registerMultiQueryConfigurePage(factory, wizardOptions);
    analytics_wizard_1._registerMultiQueryConfigureParametersPage(factory, requestWrapper);
    analytics_wizard_1._registerChooseJsonConnectionPage(factory, wizardOptions);
    analytics_wizard_1._registerChooseJsonSourcePage(factory, requestWrapper, () => new _parameters_item_provider_1.ParametersItemProvider(parameters()));
    _choose_json_schema_page_1._registerChooseJsonSchemaPage(factory, requestWrapper, parameters);
    analytics_wizard_1._registerFederatedQueryConfigurePage(factory, wizardOptions);
    var multiQueryConfigurePageMeta = factory.getMetadata(analytics_wizard_1.SqlDataSourceWizardPageId.MultiQueryConfigurePage);
    multiQueryConfigurePageMeta.canNext = (page) => page._hasParametersToEdit();
    return new DashboardMultiQueryDataSourceWizard(factory, wizardOptions);
}
exports.createDashboardMultiQueryWizard = createDashboardMultiQueryWizard;
