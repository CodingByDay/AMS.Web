﻿/**
* DevExpress Dashboard (viewer-api-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PrimitiveType } from '../../data';
import { ItemData, ItemDataAxisPointTuple, ItemUnderlyingData, RangeFilterSelection, RequestUnderlyingDataParameters } from '../../data/item-data/item-data-definitions';
import { DisposableObject } from '../../model/disposable-object';
import { MasterFilterValues } from '../../model/items/data-dashboard-item';
import { DashboardTitleToolbarUpdatedEventArgs, ItemActionAvailabilityChangedEventArgs, ItemCaptionToolbarUpdatedEventArgs, ItemClickEventArgs, ItemDrillDownStateChangedEventArgs, ItemElementCustomColorEventArgs, ItemMasterFilterStateChangedEventArgs, ItemSelectionChangedEventArgs, ItemVisualInteractivityEventArgs, SelectedTabPageChangedEventArgs } from '../../viewer-parts/viewer/events-arguments';
import { ItemWidgetEventArgs, ItemWidgetOptionEventArgs } from '../../viewer-parts/viewer/item-widget-event-args';
import { DashboardControl } from '../dashboard-control';
import { ISupportOptionExtension } from '../internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../internal/_options-manager';
export interface ViewerApiExtensionOptions {
    onItemClick?: (args: ItemClickEventArgs) => void;
    onItemSelectionChanged?: (args: ItemSelectionChangedEventArgs) => void;
    onItemWidgetCreated?: (args: ItemWidgetEventArgs) => void;
    onItemWidgetUpdating?: (args: ItemWidgetEventArgs) => void;
    onItemWidgetUpdated?: (args: ItemWidgetEventArgs) => void;
    onItemWidgetOptionsPrepared?: (args: ItemWidgetOptionEventArgs) => void;
    onItemElementCustomColor?: (args: ItemElementCustomColorEventArgs) => void;
    onItemVisualInteractivity?: (args: ItemVisualInteractivityEventArgs) => void;
    onItemMasterFilterStateChanged?: (args: ItemMasterFilterStateChangedEventArgs) => void;
    onItemDrillDownStateChanged?: (args: ItemDrillDownStateChangedEventArgs) => void;
    onItemActionAvailabilityChanged?: (args: ItemActionAvailabilityChangedEventArgs) => void;
    onItemCaptionToolbarUpdated?: (args: ItemCaptionToolbarUpdatedEventArgs) => void;
    onDashboardTitleToolbarUpdated?: (args: DashboardTitleToolbarUpdatedEventArgs) => void;
    onSelectedTabPageChanged?: (args: SelectedTabPageChangedEventArgs) => void;
}
export declare type ViewerApiExtensionEvents = {
    itemClick: ItemClickEventArgs;
    itemSelectionChanged: ItemSelectionChangedEventArgs;
    itemWidgetCreated: ItemWidgetEventArgs;
    itemWidgetUpdating: ItemWidgetEventArgs;
    itemWidgetUpdated: ItemWidgetEventArgs;
    itemWidgetOptionsPrepared: ItemWidgetOptionEventArgs;
    itemElementCustomColor: ItemElementCustomColorEventArgs;
    itemVisualInteractivity: ItemVisualInteractivityEventArgs;
    itemMasterFilterStateChanged: ItemMasterFilterStateChangedEventArgs;
    itemDrillDownStateChanged: ItemDrillDownStateChangedEventArgs;
    itemActionAvailabilityChanged: ItemActionAvailabilityChangedEventArgs;
    itemCaptionToolbarUpdated: ItemCaptionToolbarUpdatedEventArgs;
    dashboardTitleToolbarUpdated: DashboardTitleToolbarUpdatedEventArgs;
    selectedTabPageChanged: SelectedTabPageChangedEventArgs;
};
export declare class ViewerApiExtension extends DisposableObject implements ISupportOptionExtension<ViewerApiExtensionOptions> {
    name: string;
    _optionsManager: OptionsManager<ViewerApiExtensionOptions, ViewerApiExtensionEvents>;
    private _viewerApi;
    on: EventSubscriber<ViewerApiExtensionEvents>;
    off: EventSubscriber<ViewerApiExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: ViewerApiExtensionOptions);
    start(): void;
    stop(): void;
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
}
