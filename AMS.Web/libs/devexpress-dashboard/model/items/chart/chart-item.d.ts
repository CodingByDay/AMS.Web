﻿/**
* DevExpress Dashboard (chart-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { TargetDimensions } from '../..';
import { Dimension } from '../../data-item/dimension';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { ChartItemBase } from '../chart-item-base';
import { ChartAxisX } from './chart-axis';
import { ChartIndicator } from './chart-indicator';
import { ChartLegend } from './chart-legend';
import { ChartPane } from './chart-pane';
export declare class ChartItem extends ChartItemBase {
    rotated: ko.Observable<boolean>;
    axisX: ChartAxisX;
    legend: ChartLegend;
    panes: ko.ObservableArray<ChartPane>;
    indicators: ko.ObservableArray<ChartIndicator>;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _updateContentViewModel(content: any): void;
    protected _getTargetDimensions(): TargetDimensions;
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getCanColorByDimensions(): boolean;
    protected _getAreMeasuresColoredByDefault(): boolean;
    protected _getIsDimensionColoredByDefault(dimension: Dimension): boolean;
    private _addNewPane;
    private _coloredSeries;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
}
