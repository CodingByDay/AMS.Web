/**
* DevExpress Dashboard (_choose-json-schema-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._registerChooseJsonSchemaPage = exports.JsonDataSourceWizardSettings = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
exports.JsonDataSourceWizardSettings = {
    allowObjectPropertiesAsRoot: true
};
function _registerChooseJsonSchemaPage(factory, requestWrapper, parameters) {
    analytics_wizard_1._registerChooseJsonSchemaPage(factory, requestWrapper);
    var chooseJsonSchemaPageMeta = factory.getMetadata(analytics_wizard_1.JsonDataSourceWizardPageId.ChooseJsonSchemaPage);
    chooseJsonSchemaPageMeta.create = () => new analytics_wizard_1.ChooseJsonSchemaPage(requestWrapper, exports.JsonDataSourceWizardSettings.allowObjectPropertiesAsRoot, {
        getParameters: () => parameters().map(parameter => {
            return {
                value: parameter.defaultValue(),
                name: parameter.name()
            };
        })
    });
}
exports._registerChooseJsonSchemaPage = _registerChooseJsonSchemaPage;
