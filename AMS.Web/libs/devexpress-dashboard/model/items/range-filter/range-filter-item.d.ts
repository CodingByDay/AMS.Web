﻿/**
* DevExpress Dashboard (range-filter-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ItemState } from '../../dashboard-state';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { DimensionFilterValues } from '../../data-item/_dimension-filter-values';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { ChartSeries } from '../chart/chart-series';
import { FilterableDashboardItemInteractivityOptions } from '../options/interactivity-options';
import { SeriesItem } from '../series-item';
import { DateTimePeriod } from './date-time-period';
import { RangeStateController } from './_range-state-controller';
export declare class RangeFilterItem extends SeriesItem {
    static rangeSeriesViewTypesMap: {
        Line: any;
        StackedLine: any;
        FullStackedLine: any;
        Area: any;
        StackedArea: any;
        FullStackedArea: any;
        Bar: any;
        StackedBar: any;
        FullStackedBar: any;
    };
    private __argument;
    argument: ko.Observable<Dimension>;
    interactivityOptions: FilterableDashboardItemInteractivityOptions;
    dateTimePeriods: ko.ObservableArray<DateTimePeriod>;
    series: ko.ObservableArray<ChartSeries>;
    defaultDateTimePeriodName: ko.Observable<string>;
    _defaultDateTimePeriodIndexSubscription: ko.Subscription;
    currentSelectedDateTimePeriodName: ko.Observable<string>;
    _stateController: RangeStateController;
    get _supportParallelRequests(): boolean;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getClearMasterFilterSupported(): boolean;
    protected _getIsMasterFilter(): boolean;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    protected _getIsVisualInteractivitySupported(): boolean;
    protected _getCanColorByDimensions(): boolean;
    protected _getCanColorByMeasures(): boolean;
    protected _getAreMeasuresColoredByDefault(): boolean;
    protected _getIsDimensionColoredByDefault(dimension: Dimension): boolean;
    _getColorizableDataItemsInfo(): Array<{
        items: Array<DataItemLink>;
        prefixId: string;
    }>;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
    protected _hasSelection(): boolean;
    _getSelectionByPeriod(period: DateTimePeriod): any[][];
    _getDisplayFilterValues(limitCount?: number): Array<DimensionFilterValues>;
    _getEntireRange(): Array<any>;
    protected _validateSelectionByData(selection: Array<Array<any>>): void;
    protected _getValidatedSelection(selectionValues: Array<Array<any>>): Array<Array<any>>;
    _setState(itemState: ItemState): void;
    protected _removeSelectionFromState(state: ItemState): ItemState;
    protected _setPredefinedPeriodToState(state: ItemState, periodName: string): ItemState;
    protected _setSelectionToState(state: ItemState, selection: Array<Array<number | Date>>): ItemState;
    protected _extendContentState(content: any): void;
    _isSortingEnabled(): boolean;
    _isTopNEnabled(dataItem: Dimension): boolean;
}
