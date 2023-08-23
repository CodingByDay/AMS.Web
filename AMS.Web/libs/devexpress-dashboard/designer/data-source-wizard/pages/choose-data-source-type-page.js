﻿/**
* DevExpress Dashboard (choose-data-source-type-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._registerChooseDataSourceTypePage = exports.DashboardChooseDataSourceTypePage = void 0;
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _default_1 = require("../../../data/localization/_default");
const _confirm_dialog_1 = require("../../confirm-dialog/_confirm-dialog");
const data_source_wizard_model_1 = require("../models/data-source-wizard-model");
const page_id_1 = require("./page-id");
const _OlapSvgIconTemplate = {
    'dx-dashboard-svg-wizard-OlapDataSource': '<svg version="1.1" data-bind="svgAttrs" x="0px" y="0px" viewBox="0 0 96 96" xml:space="preserve"><g id="Layer_1"><g class="dxrd-svg-st1">	<ellipse class="dxrd-svg-black" cx="44" cy="19.5" rx="26" ry="7.5"/></g><g class="dxrd-svg-st2"><path class="dxrd-svg-black" d="M46,52.7v-0.2L70,40V21.4c0,4.2-11.6,7.6-26,7.6s-26-3.4-26-7.6v45c0,4.2,11.6,7.6,26,7.6c0.7,0,1.3,0,2,0 V52.7z"/></g><g class="dxrd-svg-st0"><polygon class="dxrd-svg-blue" points="48,56 69,67 69,91 48,80"/></g><polygon class="dxrd-svg-blue" points="92,56 71,67 71,91 92,80"/><g class="dxrd-svg-st2"><polygon class="dxrd-svg-blue" points="70,42.2 48,53.7 70,65.3 92,53.7"/></g></g><g id="Layer_2"></g></svg>'
};
analytics_widgets_internal_1.SvgTemplatesEngine.addTemplates(_OlapSvgIconTemplate);
class DashboardChooseDataSourceTypePage extends analytics_wizard_1.ChooseDataSourceTypePage {
    constructor(wizardOptions, customTemplates) {
        super(wizardOptions);
        this._confirmDialogViewModel = new _confirm_dialog_1.ConfirmDialogViewModel();
        this._confirmDialogCustomTemplate = {
            name: 'dx-dashboard-confirm-dialog',
            data: this._confirmDialogViewModel
        };
        this.connectionStrings = wizardOptions.connectionStrings;
        this._dataSources = wizardOptions.dataSources && wizardOptions.dataSources() || [];
        this._customTemplates = customTemplates;
        customTemplates.push(this._confirmDialogCustomTemplate);
    }
    _createTypeItems() {
        let typeItems = [];
        let wizardSettings = this._dataSourceTypeOptions.wizardSettings;
        if (wizardSettings.enableSqlDataSource) {
            typeItems.push(new analytics_wizard_1.TypeItem('Database', 'DataAccessUIStringId.DSTypeSql', 'sqldatasource', 'dxrd-svg-wizard-SqlDataSource', data_source_wizard_model_1.ToDataSourceTypeNumber('Sql')));
        }
        if (wizardSettings.enableJsonDataSource) {
            typeItems.push(new analytics_wizard_1.TypeItem('JSON', 'DataAccessUIStringId.DSTypeJson', 'jsondatasource', 'dxrd-svg-wizard-JsonDataSource', data_source_wizard_model_1.ToDataSourceTypeNumber('Json')));
        }
        if (wizardSettings.enableOlapDataSource) {
            typeItems.push(new analytics_wizard_1.TypeItem('OLAP Data Source', 'DashboardStringId.DefaultOlapDataSourceName', 'olapdatasource', 'dx-dashboard-svg-wizard-OlapDataSource', data_source_wizard_model_1.ToDataSourceTypeNumber('Olap')));
        }
        if (wizardSettings.enableFederationDataSource) {
            typeItems.push(new analytics_wizard_1.TypeItem('Data Federation', 'DataAccessUIStringId.DSTypeFederation', 'federationdatasource', 'dxrd-svg-wizard-FederationDataSource', data_source_wizard_model_1.ToDataSourceTypeNumber('Federation')));
        }
        return typeItems;
    }
    commit() {
        if (this.selectedItem().type === analytics_wizard_1.DataSourceType.Federation) {
            if (!this._dataSources || this._dataSources.length === 0) {
                let def = _jquery_helpers_1.createJQueryDeferred();
                this._confirmDialogViewModel.confirm(_default_1.getLocalizationById('DashboardWebStringId.DataSources.DashboardDataSourceWizard'), _default_1.getLocalizationById('DataAccessStringId.Wizard_NoDataSourcesForDataFederationMessage'), _default_1.getLocalizationById('DashboardStringId.ButtonOK')).always(() => def.reject());
                return def.promise();
            }
        }
        return super.commit();
    }
    dispose() {
        this._customTemplates.remove(this._confirmDialogCustomTemplate);
        super.dispose();
    }
}
exports.DashboardChooseDataSourceTypePage = DashboardChooseDataSourceTypePage;
function _registerChooseDataSourceTypePage(factory, wizardOptions, customTemplates) {
    let chooseDataSourceTypePageMeta = factory.getMetadata(analytics_wizard_1.DataSourceWizardPageId.ChooseDataSourceTypePage);
    if (!chooseDataSourceTypePageMeta) {
        analytics_wizard_1._registerChooseDataSourceTypePage(factory, wizardOptions);
        chooseDataSourceTypePageMeta = factory.getMetadata(analytics_wizard_1.DataSourceWizardPageId.ChooseDataSourceTypePage);
        factory.unregisterMetadata(analytics_wizard_1.DataSourceWizardPageId.ChooseDataSourceTypePage);
    }
    factory.registerMetadata(page_id_1.DataSourceWizardPageId.ChooseDataSourceTypePage, {
        setState: (data, state) => {
            state.dataSourceType = data.dataSourceType;
        },
        getState: (state) => {
            return state;
        },
        resetState: (state, defaultState) => {
            state.dataSourceType = defaultState.dataSourceType;
        },
        create: () => new DashboardChooseDataSourceTypePage(wizardOptions, customTemplates),
        description: chooseDataSourceTypePageMeta.description,
        template: chooseDataSourceTypePageMeta.template
    });
}
exports._registerChooseDataSourceTypePage = _registerChooseDataSourceTypePage;
