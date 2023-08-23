﻿/**
* DevExpress Dashboard (_events-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/widget/ui.widget';
import Widget from 'devextreme/ui/widget/ui.widget';
import { ItemUnderlyingData, RequestUnderlyingDataParameters } from '../../data/item-data/item-data-definitions';
import { DashboardItem } from '../../model/items/dashboard-item';
import { DataDashboardItem } from '../../model/items/data-dashboard-item';
import { DataPoint } from '../viewer-items/_base-item';
import { ItemClickEventArgs, ItemElementCustomColorEventArgs, ItemSelectionChangedEventArgs, ItemVisualInteractivityEventArgs } from './events-arguments';
import { ItemWidgetEventArgs, ItemWidgetOptionEventArgs } from './item-widget-event-args';
export declare const createItemClickEventArgs: (dashboardItem: DataDashboardItem, dataPoint: DataPoint, requestUnderlyingDataFunc: (itemName: string, args: RequestUnderlyingDataParameters, onCompleted: (result: ItemUnderlyingData) => void) => void) => ItemClickEventArgs;
export declare const createItemSelectionChangedEventArgs: (dashboardItem: DataDashboardItem, tuples: any) => ItemSelectionChangedEventArgs;
export declare const createItemElementCustomColorEventArgs: (dashboardItem: DataDashboardItem, eventArgs: any) => ItemElementCustomColorEventArgs;
export declare const createItemInteractivityEventArgs: (dashboardItem: DataDashboardItem, interactivityOptions: any) => ItemVisualInteractivityEventArgs;
export declare const createWidgetEventArgs: (dashboardItem: DashboardItem, widget: Widget<any> | Element) => ItemWidgetEventArgs;
export declare const createWidgetOptionsEventArgs: (dashboardItem: DashboardItem, options: Object) => ItemWidgetOptionEventArgs;
