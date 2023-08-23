﻿/**
* DevExpress Dashboard (grid-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { GridClientState } from '../../../viewer-parts/viewer-items/data-grid-item/_data-grid-item';
import { DataItem, DataItemLink } from '../../data-item/data-item';
import { Dimension } from '../../data-item/dimension';
import { MeasureCalculationWindowDefinition } from '../../data-item/window-definition/measure-calc-window-definition';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { DashboardItemInteractivityOptions } from '../options/interactivity-options';
import { GridColumnFilterOptions } from './grid-column-filter-options';
import { GridColumn, GridDeltaColumn, GridDimensionColumn, GridHyperlinkColumn, GridMeasureColumn, GridSparklineColumn } from './grid-columns';
import { GridOptions } from './grid-options';
export declare class GridItem extends DataDashboardItem {
    static _gridColumnTypesMap: {
        GridDimensionColumn: {
            constructor: typeof GridDimensionColumn;
            displayName: string;
            icon: string;
        };
        GridMeasureColumn: {
            constructor: typeof GridMeasureColumn;
            displayName: string;
            icon: string;
        };
        GridDeltaColumn: {
            constructor: typeof GridDeltaColumn;
            displayName: string;
            icon: string;
        };
        GridSparklineColumn: {
            constructor: typeof GridSparklineColumn;
            displayName: string;
            icon: string;
        };
        GridHyperlinkColumn: {
            constructor: typeof GridHyperlinkColumn;
            displayName: string;
            icon: string;
        };
    };
    private __sparklineArgument;
    sparklineArgument: ko.Observable<Dimension>;
    interactivityOptions: DashboardItemInteractivityOptions;
    gridOptions: GridOptions;
    columnFilterOptions: GridColumnFilterOptions;
    columns: ko.ObservableArray<GridColumn>;
    private readonly _gridClientFilterManager;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    private _canUpdateTotals;
    _clearBindings(): void;
    _createGridColumn(columnJSON: any, serializer?: ModelSerializer): GridColumn;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _getMasterFilterMode(): string;
    protected _getDrillDownEnabled(): boolean;
    protected _getIgnoreMasterFilter(): boolean;
    protected _getInteractivityDimensionLinks(): DataItemLink[];
    protected _cleanDataItemDependencies(): void;
    protected _updateContentViewModel(content: any): void;
    protected _updateDataQueryParams(params: any): void;
    protected _updateDataManagerByPartialDataSource(content: any, itemDataDTO: any): void;
    protected _extendContentState(content: any): void;
    _isAttribute(dataItem: DataItem): boolean;
    _setColumnWidthOptions(clientState: GridClientState): void;
    _getDefaultCalculationWindowDefinition(): MeasureCalculationWindowDefinition;
    _setClientState(clientState: GridClientState): void;
    _getInteractivityAxisDimensionCount(): number;
    _processClientFilterChanged: (clientFilter: string) => void;
    _processClientFilterStateChanged: (clientFilterState: any) => void;
}
