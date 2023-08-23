﻿/**
* DevExpress Dashboard (scatter-chart-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { Measure } from '../../data-item/measure';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { ChartAxisY } from '../chart/chart-axis';
import { ChartLegend } from '../chart/chart-legend';
import { DataDashboardItem } from '../data-dashboard-item';
import { DashboardItemInteractivityOptions } from '../options/interactivity-options';
import { ScatterPointLabelOptions } from './scatter-point-label-options';
export declare class ScatterChartItem extends DataDashboardItem {
    private __arguments;
    arguments: ko.ObservableArray<Dimension>;
    private __axisXMeasure;
    private __axisYMeasure;
    private __weight;
    weight: ko.Observable<Measure>;
    axisXMeasure: ko.Observable<Measure>;
    axisYMeasure: ko.Observable<Measure>;
    interactivityOptions: DashboardItemInteractivityOptions;
    rotated: ko.Observable<boolean>;
    legend: ChartLegend;
    axisX: ChartAxisY;
    axisY: ChartAxisY;
    pointLabelOptions: ScatterPointLabelOptions;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _isCalculationSupported(): boolean;
    protected _getDefaultItemType(): string;
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    protected _getCanColorByMeasures(): boolean;
    protected _getCanColorByDimensions(): boolean;
    _getColorizableDataItemsInfo(): Array<{
        items: Array<DataItemLink>;
        prefixId: string;
    }>;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
    _isSortingEnabled(): boolean;
}
