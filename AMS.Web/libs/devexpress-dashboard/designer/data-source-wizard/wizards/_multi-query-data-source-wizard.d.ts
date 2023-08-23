﻿/**
* DevExpress Dashboard (_multi-query-data-source-wizard.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { SqlDataSource, TableQuery } from '@devexpress/analytics-core/analytics-data';
import { PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { KnockoutTemplate } from '../../../common/common-interfaces';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Parameter } from '../../../model/parameters/parameter';
import { IDashboardDataSourceWizardSettings } from '../data-source-wizard-extension';
import { IDashboardDataSourceWizardConnectionStrings } from '../models/data-source-wizard-model';
import { DashboardMultiQueryDataSourceWizardOptions, DashboardRequestWrapper } from '../models/_data-source-wizard-model';
import { IDashboardDataSourceInfo } from '../_helpers';
import { DashboardDataSourceWizardBase } from './_data-source-wizard';
import { DataSourceWizardPageIteratorBase } from './_data-source-wizard-page-iterator';
export declare class DashboardMultiQueryWizardIterator extends DataSourceWizardPageIteratorBase {
    getInitialPage(): string;
    getConfigureQueryPage(): string;
    getConfigureSqlParametersPage(): string;
}
export declare class DashboardMultiQueryDataSourceWizard extends DashboardDataSourceWizardBase {
    static customQueriesPreset: (dataSource: SqlDataSource) => JQueryPromise<TableQuery[]>;
    _extendCssClass: string;
    private readonly _options;
    get options(): DashboardMultiQueryDataSourceWizardOptions;
    constructor(pageFactory: PageFactory, options: DashboardMultiQueryDataSourceWizardOptions);
}
export declare function createDashboardMultiQueryWizard(requestWrapper: DashboardRequestWrapper, parameters: ko.Computed<Parameter[]>, disableCustomSql: boolean, allowCreateNewJsonConnection: boolean, wizardSettings: IDashboardDataSourceWizardSettings, dashboardConnectionStrings: IDashboardDataSourceWizardConnectionStrings, dataSources: IDashboardDataSourceInfo[], dataSourceBrowser: DataSourceBrowser, customTemplates: ko.ObservableArray<KnockoutTemplate>): DashboardMultiQueryDataSourceWizard;
