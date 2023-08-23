﻿/**
* DevExpress Dashboard (federated-query-configure-page.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._registerFederatedQueryConfigurePage = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
function _registerFederatedQueryConfigurePage(factory, wizardOptions) {
    let analyticsMeta = factory.getMetadata(analytics_wizard_1.FederationDataSourceWizardPageId.FederatedQueryConfigurePage);
    if (!analyticsMeta) {
        analytics_wizard_1._registerFederatedQueryConfigurePage(factory, wizardOptions);
        analyticsMeta = factory.getMetadata(analytics_wizard_1.FederationDataSourceWizardPageId.FederatedQueryConfigurePage);
    }
    let dashboardMeta = Object.assign({}, analyticsMeta);
    let analyticsMetaCreate = analyticsMeta.create;
    dashboardMeta.create = () => {
        let page = analyticsMetaCreate();
        page.canNext = () => false;
        return page;
    };
    factory.unregisterMetadata(analytics_wizard_1.FederationDataSourceWizardPageId.FederatedQueryConfigurePage);
    factory.registerMetadata(analytics_wizard_1.FederationDataSourceWizardPageId.FederatedQueryConfigurePage, dashboardMeta);
}
exports._registerFederatedQueryConfigurePage = _registerFederatedQueryConfigurePage;
