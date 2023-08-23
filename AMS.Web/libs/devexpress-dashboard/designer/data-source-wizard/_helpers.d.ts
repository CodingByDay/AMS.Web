﻿/**
* DevExpress Dashboard (_helpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { FederationDataSource as AnalyticsFederationDataSource, FederationSource, TransformQuery, UnionQuery } from '@devexpress/analytics-core/analytics-data';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
import { IDataMemberInfo, IItemsProvider, IPathRequest } from '@devexpress/analytics-core/analytics-utils';
import { IFederationDataSourceWizardState } from '@devexpress/analytics-core/analytics-wizard';
import { IFederationQuery } from '@devexpress/analytics-core/query-builder/dataSource/utils';
import * as ko from 'knockout';
import { DataSourceBrowser, IDataSourceProvider } from '../../common/_data-source-browser';
import { Dashboard, DataSource, FederationDataSource, QueryNode, Source } from '../../model';
import { IDashboardDataSourceWizardSettings } from './data-source-wizard-extension';
export interface IDashboardDataSourceInfo extends IDataSourceInfo {
    componentName: string;
}
export declare function getDataSourceInfo(dataSource: DataSource): IDashboardDataSourceInfo;
export declare function createNewFederationDataSource(federationWizardModel: IFederationDataSourceWizardState, usedDataSources: ko.Computed<IDashboardDataSourceInfo[]>): FederationDataSource;
export declare function toFederationDataSource(analyticsDataSource: AnalyticsFederationDataSource, usedDataSources: IDashboardDataSourceInfo[]): FederationDataSource;
export declare function addSourceIfNotExists(analyticsSource: FederationSource, dashboardFederationDataSource: FederationDataSource, usedDataSources: IDashboardDataSourceInfo[]): void;
export declare function toSameSourcesFederationQuery(analyticsQuery: IFederationQuery): QueryNode;
export declare function toAnalyticsFederationDataSource(federationDataSource: FederationDataSource, usedDataSources: IDashboardDataSourceInfo[], dataSourceBrowser: DataSourceBrowser): AnalyticsFederationDataSource;
export declare let initialQueryAliasSymbol: string;
export declare function addOrUpdateQuery(dashboard: Dashboard, federationDataSource: FederationDataSource, index: number, newQuery: QueryNode): void;
export declare function createDataSourceInfos(dashboardDataSources: DataSource[]): IDashboardDataSourceInfo[];
export declare function createWizardSettings(publicSettings: IDashboardDataSourceWizardSettings): IDashboardDataSourceWizardSettings;
export declare function getFederationFieldList(pathRequest: IPathRequest, dataSourceBrowser: DataSourceBrowser): JQueryPromise<IDataMemberInfo[]>;
export declare class FederationDataSourceProviderWrapper implements IDataSourceProvider {
    private readonly _basic;
    constructor(basic: IDataSourceProvider);
    findDataSource(name: string): DataSource;
}
export declare class FederationDataSourceAnalyticsWrapper extends AnalyticsFederationDataSource {
    private readonly _sources;
    private readonly _dataSources;
    constructor(sources: Source[], dataSources: ko.ObservableArray<IDashboardDataSourceInfo>, fieldListProvider: IItemsProvider);
    getQueryNameFromPath(path: string): string;
    getPathFromQueryName(sourceName: string): string;
    createQuery(queryJson: any): IFederationQuery | UnionQuery | TransformQuery;
}
export declare function renameDataMember(dashboard: Dashboard, dataSource: DataSource, oldDataMember: string, newDataMember: string): void;
