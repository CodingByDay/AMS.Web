﻿/**
* DevExpress Dashboard (data-source-wizard-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IConnectionStringDefinition, IDataSourceWizardConnectionStrings, IDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
export declare function ToDataSourceTypeNumber(dashboardType: DashboardDataSourceType): number;
export declare function ToDashboardDataSourceType(typeNumber: number): DashboardDataSourceType;
export declare type DashboardDataSourceType = 'Sql' | 'Olap' | 'Json' | 'Federation';
export interface IOlapDataSourceWizardState {
    connectionName?: string;
}
export interface IDashboardDataSourceWizardState extends IDataSourceWizardState {
    dashboardDataSourceType?: DashboardDataSourceType;
    olapDataSourceWizard?: IOlapDataSourceWizardState;
}
export interface IDashboardConnectionStringDefinition extends IConnectionStringDefinition {
    connectionType?: DashboardDataSourceType;
}
export interface IDashboardDataSourceWizardConnectionStrings extends IDataSourceWizardConnectionStrings {
    olap?: IDashboardConnectionStringDefinition[];
}
