﻿/**
* DevExpress Dashboard (_viewer-api.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PrimitiveType } from '../../data';
import { ItemData, ItemDataAxisPointTuple, ItemUnderlyingData, RangeFilterSelection, RequestUnderlyingDataParameters } from '../../data/item-data/item-data-definitions';
import { DisposableObject } from '../../model/disposable-object';
import { MasterFilterValues } from '../../model/items/data-dashboard-item';
import { IDashboardTitle } from '../../viewer-parts/title/_dashboard-title-view';
import { DashboardControl } from '../dashboard-control';
import { ViewerApiExtensionEvents } from '../extensions/viewer-api-extension';
import { EventSubscriber } from '../internal/_options-manager';
export declare type ViewerApiEvents = ViewerApiExtensionEvents;
export declare let viewerApiEventsNames: Array<keyof ViewerApiEvents>;
export declare class ViewerApi extends DisposableObject {
    private dashboardControl;
    private _viewerItems;
    private _dashboardDisposables;
    private _internalEvents;
    title: ko.Observable<IDashboardTitle>;
    on: EventSubscriber<ViewerApiEvents>;
    off: EventSubscriber<ViewerApiEvents>;
    constructor(dashboardControl: DashboardControl);
    private _checkIsRangeFilterItem;
    private _viewerItemCreated;
    private _viewerItemDispose;
    private _beforeApplyViewerItemOptions;
    private _raiseItemActionAvailabilityChanged;
    private _raiseItemClick;
    private _raiseItemSelectionChanged;
    private _raiseItemWidgetCreated;
    private _raiseItemWidgetUpdating;
    private _raiseItemWidgetUpdated;
    private _raiseItemWidgetOptionsPrepared;
    private _raiseItemCaptionToolbarUpdated;
    private _raiseTitleToolbarUpdated;
    private _raiseSelectedTabPageChanged;
    private _raiseItemElementCustomColor;
    private _raiseItemVisualInteractivity;
    private _raiseClearMasterFilter;
    start(): void;
    stop(): void;
    private _getItemCore;
    private _getItem;
    private _getDataItem;
    requestUnderlyingData: (itemName: string, args: RequestUnderlyingDataParameters, onCompleted: (result: ItemUnderlyingData) => void) => void;
    getCurrentRange(itemName: string): RangeFilterSelection;
    getEntireRange(itemName: string): RangeFilterSelection;
    setRange(itemName: string, range: RangeFilterSelection): void;
    setPredefinedRange(itemName: string, dateTimePeriodName: string): void;
    getAvailablePredefinedRanges(itemName: string): Array<string>;
    getCurrentPredefinedRange(itemName: string): string;
    getCurrentSelection(itemName: string): Array<ItemDataAxisPointTuple>;
    canSetMasterFilter(itemName: string): boolean;
    canClearMasterFilter(itemName: string): boolean;
    canPerformDrillDown(itemName: string): boolean;
    canPerformDrillUp(itemName: string): boolean;
    getItemData(itemName: string): ItemData;
    getCurrentFilterValues(itemName: string): Array<ItemDataAxisPointTuple>;
    getAvailableFilterValues(itemName: string): Array<ItemDataAxisPointTuple>;
    getCurrentDrillDownValues(itemName: string): ItemDataAxisPointTuple;
    getAvailableDrillDownValues(itemName: string): Array<ItemDataAxisPointTuple>;
    setMasterFilter(itemName: string, values: MasterFilterValues): void;
    clearMasterFilter(itemName: string): void;
    performDrillDown(itemName: string, value: PrimitiveType | ItemDataAxisPointTuple): void;
    performDrillUp(itemName: string): void;
    getAvailableActions(itemName: string): Array<string>;
    updateItemCaptionToolbar(itemName?: string): void;
    updateDashboardTitleToolbar(): void;
    setSelectedTabPage(tabPageName: string): void;
    setSelectedTabPageIndex(tabContainerName: string, index: number): void;
    getSelectedTabPageIndex(tabContainerName: string): number;
    getSelectedTabPage(tabContainerName: string): string;
    private _findParentTabContainer;
    private _getViewerItem;
}
