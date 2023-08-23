﻿/**
* DevExpress Dashboard (_data-source-wizard-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IAjaxSettings } from '@devexpress/analytics-core/analytics-internal';
import { _DataSourceWizardOptions, _MultiQueryDataSourceWizardOptions } from '@devexpress/analytics-core/analytics-wizard';
import { RequestWrapper } from '@devexpress/analytics-core/queryBuilder-utils';
import { DashboardControl } from '../../../common/dashboard-control';
import { IDashboardDataSourceWizardSettings } from '../data-source-wizard-extension';
import { IDashboardDataSourceWizardConnectionStrings } from './data-source-wizard-model';
export declare class DashboardRequestWrapper extends RequestWrapper {
    private dashboardControl;
    constructor(dashboardControl: DashboardControl);
    _sendRequest(settings: IAjaxSettings): JQuery.Promise<any, any, any>;
    sendRequest(action: string, arg: string): JQuery.Promise<any, any, any>;
}
export declare class DashboardDataSourceWizardOptions extends _DataSourceWizardOptions {
    constructor();
    connectionStrings: IDashboardDataSourceWizardConnectionStrings;
    wizardSettings: IDashboardDataSourceWizardSettings;
}
export declare class DashboardMultiQueryDataSourceWizardOptions extends _MultiQueryDataSourceWizardOptions {
    constructor();
    connectionStrings: IDashboardDataSourceWizardConnectionStrings;
    wizardSettings: IDashboardDataSourceWizardSettings;
}
