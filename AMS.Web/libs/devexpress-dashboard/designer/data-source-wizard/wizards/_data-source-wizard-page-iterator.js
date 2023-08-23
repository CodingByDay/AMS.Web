﻿/**
* DevExpress Dashboard (_data-source-wizard-page-iterator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceWizardPageIteratorBase = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const page_id_1 = require("../pages/page-id");
class DataSourceWizardPageIteratorBase extends analytics_wizard_1.PageIterator {
    getInitialPage() {
        return page_id_1.DataSourceWizardPageId.ChooseDataSourceTypePage;
    }
    getNextPageId(pageId) {
        if (!pageId) {
            return this.getInitialPage();
        }
        else {
            let currentState = this._getCurrentState();
            switch (pageId) {
                case page_id_1.DataSourceWizardPageId.ChooseDataSourceTypePage:
                    switch (currentState.dashboardDataSourceType) {
                        case 'Sql':
                            return analytics_wizard_1.SqlDataSourceWizardPageId.ChooseConnectionPage;
                        case 'Olap':
                            return page_id_1.OlapDataSourceWizardPageId.ChooseConnectionPage;
                        case 'Json':
                            return analytics_wizard_1.JsonDataSourceWizardPageId.ChooseConnectionPage;
                        case 'Federation':
                            return analytics_wizard_1.FederationDataSourceWizardPageId.FederatedQueryConfigurePage;
                        default:
                            throw new Error('Unknown datasource type.');
                    }
                case analytics_wizard_1.SqlDataSourceWizardPageId.ChooseConnectionPage:
                    return this.getConfigureQueryPage();
                case analytics_wizard_1.ObjectDataSourceWizardPageId.ChooseTypesPage:
                    return analytics_wizard_1.ObjectDataSourceWizardPageId.ChooseDataMembersPage;
                case analytics_wizard_1.ObjectDataSourceWizardPageId.ChooseDataMembersPage:
                    return analytics_wizard_1.ObjectDataSourceWizardPageId.ConfigureParametersPage;
                case this.getConfigureQueryPage():
                    return this.getConfigureSqlParametersPage();
                case analytics_wizard_1.JsonDataSourceWizardPageId.ChooseConnectionPage:
                    if (currentState.jsonDataSourceWizard.connectionName) {
                        return analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
                    }
                    else {
                        return analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSourcePage;
                    }
                case analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSourcePage:
                    return analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
            }
        }
    }
    getConfigureQueryPage() {
        return analytics_wizard_1.SqlDataSourceWizardPageId.ConfigureQueryPage;
    }
    getConfigureSqlParametersPage() {
        return analytics_wizard_1.SqlDataSourceWizardPageId.ConfigureParametersPage;
    }
    getConfigureObjectParametersPage() {
        return analytics_wizard_1.ObjectDataSourceWizardPageId.ConfigureParametersPage;
    }
}
exports.DataSourceWizardPageIteratorBase = DataSourceWizardPageIteratorBase;
