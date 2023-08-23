﻿/**
* DevExpress Dashboard (_range-state-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PrimitiveType } from '../../../data';
import { ItemState } from '../../dashboard-state';
import { DimensionFilterValues } from '../../data-item/_dimension-filter-values';
import { DateFilterItem } from '../filter-items/date-filter-item';
import { DateTimePeriod } from './date-time-period';
import { RangeFilterItem } from './range-filter-item';
export declare class RangeStateController {
    item: DateFilterItem | RangeFilterItem;
    get defaultDateTimePeriodName(): ko.Observable<string>;
    get currentSelectedDateTimePeriodName(): ko.Observable<string>;
    get dateTimePeriods(): ko.ObservableArray<DateTimePeriod>;
    get _selectionValues(): ko.Observable<PrimitiveType[][]>;
    _getSelectionByPeriod(period: DateTimePeriod): any[][];
    _setSelection(stateSelection: any): void;
    constructor(item: DateFilterItem | RangeFilterItem);
    initialize(): void;
    setState(itemState: ItemState): void;
    removeSelectionFromState(state: ItemState): any;
    setPredefinedPeriodToState(state: ItemState, periodName: string): any;
    setSelectionToState(state: ItemState, selection: Array<Array<number | Date>>): ItemState;
    extendContentState(content: any): void;
    _getDisplayFilterValues(limitCount?: number): Array<DimensionFilterValues>;
}
