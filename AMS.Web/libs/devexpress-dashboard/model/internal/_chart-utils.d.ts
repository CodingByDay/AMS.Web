﻿/**
* DevExpress Dashboard (_chart-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { DashboardLocalizationId } from '../../data/localization/_default';
import { ChartItem } from '../../model/items/chart/chart-item';
import { ChartSeries } from '../../model/items/chart/chart-series';
import { ChartIndicator } from '../items/chart/chart-indicator';
export declare function getChartCFSeries(dashboardItem: ChartItem): ChartSeries[];
export declare function getChartApplyToDataItems(dashboardItem: ChartItem, dataSourceBrowser: DataSourceBrowser, getChartSeries?: (dashboardItem: ChartItem) => ChartSeries[]): () => {
    uniqueName: string | ko.Observable<string>;
    displayName: string | ko.Observable<string>;
}[];
export declare function getChartSeries(dashboardItem: ChartItem): ChartSeries[];
export declare function getAvailableValueLevels(seriesDataId: string, dashboardItem: ChartItem): {
    value: string;
    displayValueId: DashboardLocalizationId;
}[];
export declare function getIndicatorDisplayNameFromSeries(model: ChartIndicator, dashboardItem: ChartItem, dataSourceBrowser: DataSourceBrowser): string;
export declare function getDefaultSeriesDataId(model: ChartIndicator, dashboardItem: ChartItem, dataSourceBrowser: DataSourceBrowser): void;
