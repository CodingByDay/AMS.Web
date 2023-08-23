﻿/**
* DevExpress Dashboard (item-widget-event-args.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ColumnBase as GridBaseColumn } from 'devextreme/ui/data_grid';
import 'devextreme/ui/widget/ui.widget';
import Widget from 'devextreme/ui/widget/ui.widget';
import { dxCircularGaugeOptions } from 'devextreme/viz/circular_gauge';
import { ChartSeries as dxChartSeries } from 'devextreme/viz/common';
import { dxLinearGaugeOptions } from 'devextreme/viz/linear_gauge';
import { ItemData } from '../../data/item-data/item-data-definitions';
import { ChartItem } from '../../model/items/chart/chart-item';
import { ChartSeries } from '../../model/items/chart/chart-series';
import { Gauge } from '../../model/items/gauge/gauge';
import { GaugeItem } from '../../model/items/gauge/gauge-item';
import { GridColumn } from '../../model/items/grid/grid-columns';
import { GridItem } from '../../model/items/grid/grid-item';
import { DashboardItemBaseEventArgs } from './events-arguments';
export interface ItemWidgetBaseEventArgs extends DashboardItemBaseEventArgs {
    itemData: ItemData;
    chartContext?: ChartContext;
    gridContext?: GridContext;
    gaugeContext?: GaugeContext;
}
export interface ItemWidgetOptionEventArgs extends ItemWidgetBaseEventArgs {
    options: Object;
}
export interface ItemWidgetEventArgs extends ItemWidgetBaseEventArgs {
    getWidget: () => Widget<any> | Element;
}
export declare class ChartContext {
    private _dashboardItem;
    constructor(_dashboardItem: ChartItem);
    getDashboardItemSeries(seriesOptions: dxChartSeries): ChartSeries;
}
export declare class GridContext {
    private _dashboardItem;
    constructor(_dashboardItem: GridItem);
    getDashboardItemColumn(columnOptions: GridBaseColumn): GridColumn;
}
export declare class GaugeContext {
    private _dashboardItem;
    constructor(_dashboardItem: GaugeItem);
    getDashboardItemGauge(gaugeOptions: dxLinearGaugeOptions | dxCircularGaugeOptions): Gauge;
}
