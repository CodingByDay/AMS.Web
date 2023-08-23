﻿/**
* DevExpress Dashboard (_edit-json-data-source-wizard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEditJsonDataSourceWizard = exports.EditJsonDataSourceWizard = exports.EditJsonDataSourceWizardIterator = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _choose_json_schema_page_1 = require("../pages/_choose-json-schema-page");
class EditJsonDataSourceWizardIterator extends analytics_wizard_1.PageIterator {
    constructor(factory, stateManager) {
        super(factory, stateManager);
    }
    getNextPageId(pageId) {
        return analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage;
    }
}
exports.EditJsonDataSourceWizardIterator = EditJsonDataSourceWizardIterator;
class EditJsonDataSourceWizard extends analytics_wizard_1.PopupWizard {
    constructor() {
        super(...arguments);
        this.title = _default_1.getLocalizationById('DashboardWebStringId.DataSources.DashboardDataSourceWizard');
        this._container = (element) => {
            return _jquery_helpers_1.$wrap(_jquery_helpers_1.closest(element, '.dx-dashboard-widget-container'));
        };
        this._extendCssClass = 'dxrd-sqldatasource-wizard';
    }
}
exports.EditJsonDataSourceWizard = EditJsonDataSourceWizard;
function createEditJsonDataSourceWizard(requestWrapper, parameters) {
    var factory = new analytics_wizard_1.PageFactory();
    _choose_json_schema_page_1._registerChooseJsonSchemaPage(factory, requestWrapper, parameters);
    return new EditJsonDataSourceWizard(factory);
}
exports.createEditJsonDataSourceWizard = createEditJsonDataSourceWizard;
