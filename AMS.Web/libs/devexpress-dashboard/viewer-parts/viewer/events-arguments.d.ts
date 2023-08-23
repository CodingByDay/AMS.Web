﻿/**
* DevExpress Dashboard (events-arguments.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemData, ItemDataAxisName, ItemDataAxisPoint, ItemDataAxisPointTuple, ItemDataDelta, ItemDataDimension, ItemDataMeasure, ItemUnderlyingData } from '../../data/item-data/item-data-definitions';
import { PrimitiveType } from '../../data/types';
import { Dashboard } from '../../model/dashboard';
import { DashboardItem } from '../../model/items/dashboard-item';
import { DashboardItemCaptionToolbarOptions, DashboardTitleToolbarOptions } from '../widgets/caption-toolbar/caption-toolbar-options';
export interface DashboardItemBaseEventArgs {
    itemName: string;
    dashboardItem: DashboardItem;
}
export interface ItemElementCustomColorEventArgs extends DashboardItemBaseEventArgs {
    getTargetElement: () => ItemDataAxisPointTuple;
    getMeasures: () => Array<ItemDataMeasure>;
    getColor: () => string;
    setColor: (color: string) => void;
}
export declare type DashboardSelectionMode = 'None' | 'Single' | 'Multiple';
export interface ItemVisualInteractivityEventArgs extends DashboardItemBaseEventArgs {
    getSelectionMode: () => DashboardSelectionMode;
    setSelectionMode: (value: DashboardSelectionMode) => void;
    isHighlightingEnabled: () => boolean;
    enableHighlighting: (value: boolean) => void;
    getTargetAxes: () => ItemDataAxisName[];
    setTargetAxes: (value?: ItemDataAxisName[]) => void;
    getDefaultSelection(): Array<ItemDataAxisPointTuple>;
    setDefaultSelection(selection: Array<ItemDataAxisPointTuple>): void;
}
export interface ItemClickEventArgs extends DashboardItemBaseEventArgs {
    getData: () => ItemData;
    getAxisPoint: (axis?: ItemDataAxisName) => ItemDataAxisPoint;
    getMeasures: () => Array<ItemDataMeasure>;
    getDeltas: () => Array<ItemDataDelta>;
    getDimensions: () => Array<ItemDataDimension>;
    requestUnderlyingData: (onCompleted: (data: ItemUnderlyingData) => void, dataMembers: string[]) => void;
}
export interface ItemMasterFilterStateChangedEventArgs extends DashboardItemBaseEventArgs {
    values: Array<Array<PrimitiveType>>;
}
export interface ItemDrillDownStateChangedEventArgs extends DashboardItemBaseEventArgs {
    values: Array<PrimitiveType>;
    action: 'Down' | 'Up';
}
export interface ItemActionAvailabilityChangedEventArgs extends DashboardItemBaseEventArgs {
}
export interface ItemSelectionChangedEventArgs extends DashboardItemBaseEventArgs {
    getCurrentSelection: () => Array<ItemDataAxisPointTuple>;
}
export interface SelectedTabPageChangedEventArgs {
    tabContainerName: string;
    selectedPage: string;
    previousPage: string;
}
export interface ItemCaptionToolbarUpdatedEventArgs extends DashboardItemBaseEventArgs {
    options: DashboardItemCaptionToolbarOptions;
}
export interface DashboardTitleToolbarUpdatedEventArgs {
    dashboard: Dashboard;
    options: DashboardTitleToolbarOptions;
}
