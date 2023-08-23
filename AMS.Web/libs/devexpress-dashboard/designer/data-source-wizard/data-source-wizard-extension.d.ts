﻿/**
* DevExpress Dashboard (data-source-wizard-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { BaseWizard, IDataSourceWizardSettings, IWizardEventArgs, PageFactory, PageIterator, PopupWizard, StateManager } from '@devexpress/analytics-core/analytics-wizard';
import * as ko from 'knockout';
import { DashboardOptionChangedArgs } from '../../common/control-options';
import { DashboardControl } from '../../common/dashboard-control';
import { ISupportOptionExtension } from '../../common/internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../../common/internal/_options-manager';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { FederationDataSource } from '../../model';
import { DataSource } from '../../model/data-sources/data-source';
import { JsonDataSource } from '../../model/data-sources/json-data-source';
import { SqlDataSource } from '../../model/data-sources/sql-data-source';
import { Parameter } from '../../model/parameters/parameter';
import { IDashboardDataSourceWizardConnectionStrings } from './models/data-source-wizard-model';
import { DashboardRequestWrapper } from './models/_data-source-wizard-model';
import { DashboardDataSourceWizardBase } from './wizards/_data-source-wizard';
import { IDashboardDataSourceInfo } from './_helpers';
export interface DataSourceWizardExtensionOptions {
    enableCustomSql?: boolean;
    allowCreateNewJsonConnection?: boolean;
    wizardSettings?: IDashboardDataSourceWizardSettings;
    onCustomizeDataSourceWizard?: (args: IDashboardWizardEventArgs) => void;
}
export declare type DataSourceWizardExtensionEvents = {
    customizeDataSourceWizard: IDashboardWizardEventArgs;
};
export interface IDashboardDataSourceWizardSettings extends IDataSourceWizardSettings {
    enableOlapDataSource?: boolean;
}
export declare type DataSourceWizardType = 'EditQueryWizard' | 'EditJsonDataSourceWizard' | 'DataSourceWizard' | 'MultiQueryDataSourceWizard';
export interface IDashboardWizardEventArgs extends IWizardEventArgs<BaseWizard> {
    type: DataSourceWizardType;
}
export declare class DataSourceWizardExtension implements ISupportOptionExtension<DataSourceWizardExtensionOptions> {
    protected dashboardControl: DashboardControl;
    private static _convertDataSource;
    private _subscriptions;
    protected _requestWrapper: DashboardRequestWrapper;
    private _getConnectionStringsCallback;
    private _loadingPanelVisible;
    private _wizardElement;
    protected _dashboardParameters: ko.Computed<Array<Parameter>>;
    _optionsManager: OptionsManager<DataSourceWizardExtensionOptions, DataSourceWizardExtensionEvents>;
    private _customTemplate;
    get isCustomSqlEnabled(): any;
    protected get _dataSourceBrowser(): DataSourceBrowser;
    name: string;
    on: EventSubscriber<DataSourceWizardExtensionEvents>;
    off: EventSubscriber<DataSourceWizardExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: DataSourceWizardExtensionOptions);
    start(): void;
    stop(): void;
    showDataSourceCreatingDialog(): JQueryPromise<DataSource>;
    private _getDashboardDataSources;
    private _getFederationDataProviders;
    _showDataSourceCreatingDialog(federationDataProviders: DataSource[]): JQueryPromise<DataSource>;
    showSqlQueryEditingDialog(dashboardSqlDataSource: SqlDataSource, queryName?: string): void;
    showFederationQueryEditingDialog(dashboardFederationDataSource: FederationDataSource, queryName: string): void;
    showManageFederationQueriesDialog(dashboardFederationDataSource: FederationDataSource): void;
    private _createEditQueryWizard;
    _optionChanged(args: DashboardOptionChangedArgs<DataSourceWizardExtensionOptions>): any;
    protected createDataSourceWizard(connectionStrings: IDashboardDataSourceWizardConnectionStrings, federationSources: IDashboardDataSourceInfo[]): DashboardDataSourceWizardBase;
    private _createEditJsonDataSourceWizard;
    protected _customizeDataSourceWizard(customizationType: DataSourceWizardType, wizard: PopupWizard): void;
    protected _createNewDataSourceWizardIterator(factory: PageFactory, stateManager: StateManager): PageIterator;
    private _initializeDataSourceWizard;
    _showEditJsonDataSourceDialog(jsonDataSource: JsonDataSource): void;
    private _renderAndStartWizard;
}
export declare class MultiQueryDataSourceWizardExtension extends DataSourceWizardExtension {
    constructor(dashboardControl: DashboardControl, options?: DataSourceWizardExtensionOptions);
    protected _createNewDataSourceWizardIterator(factory: PageFactory, stateManager: StateManager): PageIterator;
    protected createDataSourceWizard(connectionStrings: IDashboardDataSourceWizardConnectionStrings, federationSources: IDashboardDataSourceInfo[]): DashboardDataSourceWizardBase;
}
