﻿/**
* DevExpress Dashboard (date-filter-item.d.ts)
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
import { DimensionFilterValues } from '../../data-item/_dimension-filter-values';
import { DateFilterArrangementMode, DateFilterType, DatePickerLocation } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { FilterableDashboardItemInteractivityOptions } from '../options/interactivity-options';
import { DateTimePeriod } from '../range-filter/date-time-period';
import { RangeStateController } from '../range-filter/_range-state-controller';
export declare class DateFilterItem extends DataDashboardItem {
    private __dimension;
    dimension: ko.Observable<Dimension>;
    filterType: ko.Observable<DateFilterType>;
    arrangementMode: ko.Observable<DateFilterArrangementMode>;
    datePickerLocation: ko.Observable<DatePickerLocation>;
    defaultDateTimePeriodName: ko.Observable<string>;
    displayTextPattern: ko.Observable<string>;
    dateTimePeriods: ko.ObservableArray<DateTimePeriod>;
    _defaultDateTimePeriodIndexSubscription: ko.Subscription;
    currentSelectedDateTimePeriodName: ko.Observable<string>;
    _stateController: RangeStateController;
    interactivityOptions: FilterableDashboardItemInteractivityOptions;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    _getSelectionByPeriod(period: DateTimePeriod): any[][];
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _getClearMasterFilterSupported(): boolean;
    protected _getIsMasterFilter(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getIsVisualInteractivitySupported(): boolean;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    _getDisplayFilterValues(limitCount?: number): Array<DimensionFilterValues>;
    protected _updateContentViewModel(content: any): void;
    _setState(itemState: ItemState): void;
    protected _removeSelectionFromState(state: ItemState): ItemState;
    protected _setPredefinedPeriodToState(state: ItemState, periodName: string): ItemState;
    protected _setSelectionToState(state: ItemState, selection: Array<Array<number | Date>>): ItemState;
    protected _getValidatedSelection(selectionValues: Array<Array<any>>): Array<Array<any>>;
    protected _extendContentState(content: any): void;
    protected _hasSelection(): boolean;
    _isSortingEnabled(): boolean;
    _isTopNEnabled(dataItem: Dimension): boolean;
    _getEntireRange(): Array<any>;
}
