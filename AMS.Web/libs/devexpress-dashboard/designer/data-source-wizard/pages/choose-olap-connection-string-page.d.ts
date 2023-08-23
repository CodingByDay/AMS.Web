﻿/**
* DevExpress Dashboard (choose-olap-connection-string-page.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { PageFactory, WizardPageBase } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { IDashboardConnectionStringDefinition, IOlapDataSourceWizardState } from '../models/data-source-wizard-model';
export declare class DashboardChooseOlapConnectionStringPage extends WizardPageBase<IOlapDataSourceWizardState, IOlapDataSourceWizardState> {
    _selectedConnectionString: ko.ObservableArray<IDashboardConnectionStringDefinition>;
    _connectionStrings: IDashboardConnectionStringDefinition[];
    constructor(connectionStrings: IDashboardConnectionStringDefinition[]);
    canNext(): boolean;
    canFinish(): boolean;
    commit(): JQuery.Promise<IOlapDataSourceWizardState, any, any>;
    initialize(state: IOlapDataSourceWizardState): JQueryPromise<any>;
}
export declare function _registerOlapConnectionStringsPage(factory: PageFactory, connectionStrings: IDashboardConnectionStringDefinition[]): void;
