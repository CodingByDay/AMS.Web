﻿/**
* DevExpress Dashboard (_dashboard-update-hub.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Dashboard } from '../../model/dashboard';
import { DisposableObject } from '../../model/disposable-object';
import { DashboardItem } from '../../model/items/dashboard-item';
import { PropertyCategory } from '../../model/metadata/_base-metadata';
import { DataRequestOptions } from '../control-options';
import { VisibleItemsProvider } from '../internal/_interfaces';
import { DashboardEvent } from './_dashboard-event';
import { DashboardItemChangedEventArgs, DataSourceChangedEventArgs } from './_item-change-subscriber';
interface UpdateHubCallbacks {
    getItemData: (item: DashboardItem) => JQueryPromise<{}>;
    getBatchItemData: (items: DashboardItem[]) => JQueryPromise<{}>;
    getMapShapeFile: (item: DashboardItem) => JQueryPromise<{}>;
    clearDimensionValuesCache?: () => void;
}
export declare class DashboardUpdateHub extends DisposableObject {
    private _dashboard;
    private _dataRequestOptions;
    private _callBacks;
    private _requestVisibleItemsProvider?;
    private _timer;
    private _requestQueue;
    private _suspendItem;
    private _visibleItemsProvider;
    private _isUpdating;
    private _dequeueRequest;
    private _enqueueRequest;
    _getDataRequestPriority(dashboardItem: DashboardItem): 1 | 2 | 0;
    _getRequestLockingMasterFilterItems(dashboardItem: DashboardItem): DashboardItem[];
    private visibleItemsFilter;
    private _resolveItems;
    private _processItemChanged;
    private _itemChanged;
    private _resolveItemsDeffered;
    initializeItem: (item: DashboardItem) => void;
    constructor(_dashboard: Dashboard, _dataRequestOptions: DataRequestOptions, _callBacks: UpdateHubCallbacks, _requestVisibleItemsProvider?: () => VisibleItemsProvider);
    _getItemData: (item: DashboardItem) => JQueryPromise<any>;
    _performServerRequest(item: DashboardItem, category: any): JQueryPromise<any>;
    refreshItems(itemsNames: Array<string>): void;
    reloadAllItems(caterory: PropertyCategory): void;
    reloadGlobalColoredItems(caterory: PropertyCategory): void;
    initialize(): void;
    itemBeginUpdate: (itemName: string) => void;
    itemEndUpdate: (itemName: string) => void;
    dashboardBeginUpdate: () => void;
    dashboardEndUpdate: () => void;
    dataSourcePropertyChanged: DashboardEvent<DataSourceChangedEventArgs>;
    dashboardItemPropertyChanged: DashboardEvent<DashboardItemChangedEventArgs>;
    dispose(): void;
}
export {};
