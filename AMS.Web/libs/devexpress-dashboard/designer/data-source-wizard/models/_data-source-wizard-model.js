﻿/**
* DevExpress Dashboard (_data-source-wizard-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardMultiQueryDataSourceWizardOptions = exports.DashboardDataSourceWizardOptions = exports.DashboardRequestWrapper = void 0;
const analytics_wizard_1 = require("@devexpress/analytics-core/analytics-wizard");
const queryBuilder_utils_1 = require("@devexpress/analytics-core/queryBuilder-utils");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
class DashboardRequestWrapper extends queryBuilder_utils_1.RequestWrapper {
    constructor(dashboardControl) {
        super();
        this.dashboardControl = dashboardControl;
    }
    _sendRequest(settings) {
        return this.sendRequest(settings.action, settings.arg);
    }
    sendRequest(action, arg) {
        var def = _jquery_helpers_1.createJQueryDeferred();
        this.dashboardControl.remoteService.postToServer(this.dashboardControl._endpointCollection.dataSourceWizardUrls.DataSourceWizardAction, {
            actionKey: action,
            arg: arg
        }).done(data => {
            if (data.success) {
                def.resolve(data.result);
            }
            else {
                let errorText = data.error;
                this.dashboardControl.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.ErrorHasOccuredOn'), errorText);
                def.reject(errorText);
            }
        }).fail(request => {
            this.dashboardControl.notificationController.showError(_default_1.getLocalizationById('DashboardWebStringId.Notification.ErrorHasOccuredOn'), request);
            def.reject();
        });
        return def.promise();
    }
}
exports.DashboardRequestWrapper = DashboardRequestWrapper;
class DashboardDataSourceWizardOptions extends analytics_wizard_1._DataSourceWizardOptions {
    constructor() {
        super();
        this.connectionStrings = Object.assign(Object.assign({}, this.connectionStrings), { olap: [] });
        this.wizardSettings = Object.assign(Object.assign({}, this.wizardSettings), { enableOlapDataSource: false });
    }
}
exports.DashboardDataSourceWizardOptions = DashboardDataSourceWizardOptions;
class DashboardMultiQueryDataSourceWizardOptions extends analytics_wizard_1._MultiQueryDataSourceWizardOptions {
    constructor() {
        super();
        this.connectionStrings = Object.assign(Object.assign({}, this.connectionStrings), { olap: [] });
        this.wizardSettings = Object.assign(Object.assign({}, this.wizardSettings), { enableOlapDataSource: false });
    }
}
exports.DashboardMultiQueryDataSourceWizardOptions = DashboardMultiQueryDataSourceWizardOptions;
