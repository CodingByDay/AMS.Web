﻿/**
* DevExpress Dashboard (_service-client.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DimensionFilterValues } from '../model/data-item/_dimension-filter-values';
import { Dimension } from '../model/data-item/dimension';
import { DataSource } from '../model/data-sources/data-source';
import { DashboardItem } from '../model/items/dashboard-item';
import { DataDashboardItem } from '../model/items/data-dashboard-item';
import { IQueryParameter } from '../model/parameters/parameter';
import { IExportOptions } from '../viewer-parts/_export-options';
import { IFilterItem } from './_data-source-browser';
import { DashboardContainer, IRemoteService } from './common-interfaces';
import { ClientExportState, ExportMode } from './extensions/_export-dialog-binder';
import { DashboardExportFormat } from './extensions/export-extension';
import { IDataServiceUrls, IErrorHandler } from './internal/_interfaces';
export interface ExportInfo {
    Mode: ExportMode;
    GroupName: string;
    FileName: string;
    ClientState: ClientExportState;
    Format: DashboardExportFormat;
    DocumentOptions: IExportOptions;
    ItemType: string;
}
export interface ItemExportModel {
    name: string;
    query: any;
    drillDownFormattableValues: Array<DimensionFilterValues>;
    filterFormattableValues: Array<DimensionFilterValues>;
    selectedValues: Array<DimensionFilterValues>;
}
interface ICommonQueryArgs {
    dashboardId: string;
    parameters: IQueryParameter[];
    dashboard?: Object;
}
export interface IDataServiceClient {
    convertItem(item: DashboardItem, destinationItemTypeName: string): JQueryPromise<{}>;
    getParameterValues(dataSourceId: string, dataSource: DataSource, dataMember: string, valueMember: string, displayMember: string, sortOrder: string, sortByMember: string, parameterType: string): JQueryPromise<{}>;
    getDimensionUniqueValues(dataSource: DataSource, dataMember: string, dimension: Dimension): JQueryPromise<{}>;
    getDimensionFilterItems(dashboardItem: DashboardItem, dimensionDataMember: string, previousState: Array<IFilterItem>, branch: Array<any>): JQueryPromise<Array<IFilterItem>>;
    getDimensionFilterString(dashboardItem: DashboardItem, dimensionDataMember: string, previousState: Array<IFilterItem>): JQueryPromise<string>;
    getFieldList(dataSource: DataSource, dataMember: string, fieldPath: string): JQueryPromise<{}>;
    getItemData(item: DashboardItem, isModeAllowsToReduceData: boolean): JQueryPromise<{}>;
    getColoringScheme: (itemName: string) => JQueryPromise<{}>;
    getMapShapeFile: (itemName: string) => JQueryPromise<{}>;
    getDashboardPalette: () => JQueryPromise<Object>;
    getUnderlyingData: (itemName: string, columnValues: Array<string>, rowValues: Array<string>, columnNames: Array<string>, dataQueryParams: any) => JQueryPromise<{}>;
    markDataSourcesForReload: () => JQueryPromise<{}>;
    performExport(exportArgs: ExportInfo, exportModels: ItemExportModel[]): any;
    getBatchItemData(args: Array<DashboardItem>, isModeAllowsToReduceData: boolean): JQueryPromise<any>;
    getAvailableFontFamilies: () => JQueryPromise<string[]>;
}
export declare class ViewerDataServiceClient implements IDataServiceClient {
    protected _dashboardContainer: DashboardContainer;
    protected _errorHandler: IErrorHandler;
    protected _dataServiceUrls: IDataServiceUrls;
    protected _remoteService: IRemoteService;
    static maxQueryStringLength: number;
    constructor(_dashboardContainer: DashboardContainer, _errorHandler: IErrorHandler, _dataServiceUrls: IDataServiceUrls, _remoteService: IRemoteService);
    getParameterValues(dataSourceId: string, dataSource: DataSource, dataMember: string, valueMember: string, displayMember: string, sortOrder: string, sortByMember: string, parameterType: string): JQueryPromise<{}>;
    performExport(exportInfo: ExportInfo, exportModels: ItemExportModel[]): void;
    getDimensionUniqueValues(dataSource: DataSource, dataMember: string, dimension: Dimension): JQueryPromise<{}>;
    getDimensionFilterItems(dashboardItem: DashboardItem, dimensionDataMember: string, previousState: Array<IFilterItem>, branch: Array<any>): JQueryPromise<Array<IFilterItem>>;
    getDimensionFilterString(dashboardItem: DashboardItem, dimensionDataMember: string, previousState: Array<IFilterItem>): JQueryPromise<string>;
    getFieldList(dataSource: DataSource, dataMember: string, fieldPath: string): JQueryPromise<{}>;
    getColoringScheme: (itemName?: string) => JQueryPromise<{}>;
    getDashboardPalette: () => JQueryPromise<{}>;
    convertItem(item: DashboardItem, destinationItemTypeName: string): JQueryPromise<{}>;
    getAvailableFontFamilies: () => JQueryPromise<string[]>;
    _getItemDataQuery(item: DashboardItem, isModeAllowsToReduceData: boolean): any;
    getItemData: (item: DashboardItem, isModeAllowsToReduceData: boolean) => JQueryPromise<any>;
    getBatchItemData: (items: Array<DashboardItem>, isModeAllowsToReduceData: boolean) => JQueryPromise<any>;
    getMapShapeFile: (itemName: string) => JQueryXHR;
    getUnderlyingData: (itemName: string, columnValues: Array<string>, rowValues: Array<string>, columnNames: Array<string>, dataQueryParams: any) => JQueryPromise<{}>;
    markDataSourcesForReload: () => JQueryPromise<{}>;
    private _queryParamsToQueryString;
    protected _createCommonArgs(): ICommonQueryArgs;
    protected _performRequest(url: string, requestArgs: Object): JQueryXHR;
    protected _performRequestCore(url: string, params: Object): JQueryXHR;
    protected _ensureClientServerContract(requestParams: any): void;
}
export declare class DesignerDataServiceClient extends ViewerDataServiceClient implements IDataServiceClient {
    constructor(_dashboardContainer: DashboardContainer, _errorHandler: IErrorHandler, _dataServiceUrls: IDataServiceUrls, _remoteService: IRemoteService);
    convertItem(item: DashboardItem, destinationItemTypeName: string): JQueryPromise<{}>;
    getDimensionUniqueValues(dataSource: DataSource, dataMember: string, dimension: Dimension): JQueryPromise<{}>;
    getDimensionFilterItems(item: DataDashboardItem, dimensionDataMember: string, previousState: Array<IFilterItem>, branch: Array<any>): JQueryPromise<Array<IFilterItem>>;
    getDimensionFilterString(item: DataDashboardItem, dimensionDataMember: string, previousState: Array<IFilterItem>): JQueryPromise<string>;
    getFieldList(dataSource: DataSource, dataMember: string, fieldPath: string): JQueryPromise<{}>;
    getColoringScheme: (itemName?: string) => JQueryPromise<{}>;
    getDashboardPalette: () => JQueryPromise<{}>;
    getAvailableFontFamilies: () => JQueryPromise<string[]>;
    protected _createCommonArgs(): ICommonQueryArgs;
    protected _performRequestCore(url: any, data: any): any;
}
export {};
