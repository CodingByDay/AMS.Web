﻿/**
* DevExpress Dashboard (filter-element-item-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { PrimitiveType } from '../../../data/types';
import { DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { IExternalFilter } from '../../internal/_interfaces';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { FilterableDashboardItemInteractivityOptions } from '../options/interactivity-options';
export declare abstract class FilterElementItemBase extends DataDashboardItem {
    private __filterDimensions;
    filterDimensions: ko.ObservableArray<Dimension>;
    enableSearch: ko.Observable<boolean>;
    interactivityOptions: FilterableDashboardItemInteractivityOptions;
    _unselectedValues: ko.Observable<any[][]>;
    _isExcludingAllFilter: ko.Computed<boolean>;
    get _supportParallelRequests(): boolean;
    private get _useCriteriaOptimization();
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    _clearBindings(): void;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    _isCalculationSupported(): boolean;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    protected _getMasterFilterMode(): string;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getClearMasterFilterSupported(): boolean;
    protected _getIsMasterFilter(): boolean;
    protected _getIsVisualInteractivitySupported(): boolean;
    protected _isMultiselectable(): boolean;
    protected _updateContentViewModel(content: any): void;
    protected _performOutputFilterOptimization(filter: IExternalFilter): IExternalFilter;
    protected _validateSelectionByData(origSelection: Array<Array<any>>): void;
    _setSelectionData(selection: Array<Array<PrimitiveType>>, forceSetSelection?: boolean): void;
    private _correctSelectionValues;
    private _updateUnselectedValues;
    private _arrayContains;
}
