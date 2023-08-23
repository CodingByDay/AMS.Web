﻿/**
* DevExpress Dashboard (_data-source-wizard.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PageFactory, PopupWizard, StateManager } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { KnockoutTemplate } from '../../../common/common-interfaces';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Parameter } from '../../../model/parameters/parameter';
import { IDashboardDataSourceWizardSettings } from '../data-source-wizard-extension';
import { DashboardDataSourceType, IDashboardDataSourceWizardConnectionStrings, IDashboardDataSourceWizardState } from '../models/data-source-wizard-model';
import { DashboardDataSourceWizardOptions, DashboardMultiQueryDataSourceWizardOptions, DashboardRequestWrapper } from '../models/_data-source-wizard-model';
import { IDashboardDataSourceInfo } from '../_helpers';
import { DataSourceWizardPageIteratorBase } from './_data-source-wizard-page-iterator';
export declare class CreateNewDataSourceWizardIterator extends DataSourceWizardPageIteratorBase {
    constructor(factory: PageFactory, stateManager: StateManager);
}
export declare class EditQueryWizardIterator extends DataSourceWizardPageIteratorBase {
    constructor(factory: PageFactory, stateManager: StateManager);
    getInitialPage(): string;
}
export declare abstract class DashboardDataSourceWizardBase extends PopupWizard {
    abstract get options(): DashboardDataSourceWizardOptions | DashboardMultiQueryDataSourceWizardOptions;
    constructor(factory: PageFactory);
}
export declare class DashboardDataSourceWizard extends DashboardDataSourceWizardBase {
    title: any;
    _container: (element: any) => any;
    _extendCssClass: string;
    private readonly _options;
    get options(): DashboardDataSourceWizardOptions;
    constructor(factory: PageFactory, options: DashboardDataSourceWizardOptions);
}
export declare class DashboardDataSourceWizardState implements IDashboardDataSourceWizardState {
    sqlDataSourceWizard: {};
    jsonDataSourceWizard: {};
    olapDataSourceWizard: {};
    objectDataSourceWizard: {};
    federationDataSourceWizard: {};
    dataSourceType: number;
    get dashboardDataSourceType(): DashboardDataSourceType;
    set dashboardDataSourceType(value: DashboardDataSourceType);
}
export declare function createDashboardDataSourceWizard(requestWrapper: DashboardRequestWrapper, parameters: ko.Computed<Parameter[]>, disableCustomSql: boolean, allowCreateNewJsonConnection: boolean, wizardSettings: IDashboardDataSourceWizardSettings, dashboardConnectionStrings: IDashboardDataSourceWizardConnectionStrings, dataSources: IDashboardDataSourceInfo[], dataSourceBrowser: DataSourceBrowser, customTemplates: ko.ObservableArray<KnockoutTemplate>): DashboardDataSourceWizard;
