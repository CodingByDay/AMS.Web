﻿/**
* DevExpress Dashboard (choose-data-source-type-page.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { ChooseDataSourceTypePage, ITypeItem, PageFactory, _DataSourceWizardOptions } from '@devexpress/analytics-core/analytics-wizard';
import { KnockoutTemplate } from '../../../common';
import { DashboardDataSourceWizardOptions } from '../models/_data-source-wizard-model';
import { IDashboardDataSourceWizardConnectionStrings, IDashboardDataSourceWizardState } from '../models/data-source-wizard-model';
export declare class DashboardChooseDataSourceTypePage extends ChooseDataSourceTypePage {
    connectionStrings: IDashboardDataSourceWizardConnectionStrings;
    private _dataSources;
    private _confirmDialogViewModel;
    private _confirmDialogCustomTemplate;
    private _customTemplates;
    constructor(wizardOptions: _DataSourceWizardOptions, customTemplates: ko.ObservableArray<KnockoutTemplate>);
    protected _createTypeItems(): ITypeItem[];
    commit(): JQueryPromise<IDashboardDataSourceWizardState>;
    dispose(): void;
}
export declare function _registerChooseDataSourceTypePage(factory: PageFactory, wizardOptions: DashboardDataSourceWizardOptions, customTemplates: ko.ObservableArray<KnockoutTemplate>): void;
