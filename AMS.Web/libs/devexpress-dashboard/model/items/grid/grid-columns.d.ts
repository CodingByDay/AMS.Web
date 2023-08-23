﻿/**
* DevExpress Dashboard (grid-columns.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItem, DataItemLink } from '../../data-item/data-item';
import { AbsoluteVariationNumericFormat, PercentOfTargetNumericFormat, PercentVariationNumericFormat } from '../../data-item/data-item-format';
import { Dimension } from '../../data-item/dimension';
import { Measure } from '../../data-item/measure';
import { DataFieldType, GridColumnFixedWidthType, GridColumnValueBarDisplayMode, GridDimensionColumnDisplayMode, GridMeasureColumnDisplayMode } from '../../enums';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { ConstrainedBindingProperty, IDataItemProvider } from '../_binding-model';
import { DataDashboardItem } from '../data-dashboard-item';
import { DataItemContainer } from '../data-item-container';
import { DeltaOptions } from '../options/delta-options';
import { SparklineOptions } from '../options/sparkline-options';
import { GridColumnTotal } from './grid-column-total';
export declare enum GridColumnType {
    Dimension = 0,
    Measure = 1,
    Delta = 2,
    Sparkline = 3,
    Hyperlink = 4
}
export declare abstract class GridColumn extends DataItemContainer {
    weight: ko.Observable<number>;
    fixedWidth: ko.Observable<number>;
    widthType: ko.Observable<GridColumnFixedWidthType>;
    totals: ko.ObservableArray<GridColumnTotal>;
    _displayNameSeparator: string;
    get actualDataItem(): DataItem;
    get _actualDataItemLink(): DataItemLink;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    grabFrom(column: GridColumn): void;
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getColumnType(): GridColumnType;
    abstract _getBindingModel(): Array<ConstrainedBindingProperty>;
    protected abstract _getActualDataItemLink(): DataItemLink;
    _getDataId(): string;
    _isAttribute(dataItem: DataItem): boolean;
    _getViewModel(): {
        Weight: number;
        FixedWidth: number;
        WidthType: GridColumnFixedWidthType;
    };
    _getAvailableTotalTypes(dataItemProvider: IDataItemProvider): IDisplayedValue[];
    protected _getTotalTypes(dataType: DataFieldType): Array<IDisplayedValue>;
}
export declare class GridDimensionColumn extends GridColumn {
    private __dimension;
    dimension: ko.Observable<Dimension>;
    displayMode: ko.Observable<GridDimensionColumnDisplayMode>;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getColumnType(): GridColumnType;
    protected _getActualDataItemLink(): DataItemLink;
    _getAvailableTotalTypes(dataItemProvider: IDataItemProvider): IDisplayedValue[];
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
}
export declare class GridMeasureColumn extends GridColumn {
    private __measure;
    measure: ko.Observable<Measure>;
    displayMode: ko.Observable<GridMeasureColumnDisplayMode>;
    alwaysShowZeroLevel: ko.Observable<boolean>;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getColumnType(): GridColumnType;
    protected _getActualDataItemLink(): DataItemLink;
    _getAvailableTotalTypes(dataItemProvider: IDataItemProvider): IDisplayedValue[];
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
}
export declare class GridDeltaColumn extends GridColumn {
    private __actualValue;
    private __targetValue;
    actualValue: ko.Observable<Measure>;
    targetValue: ko.Observable<Measure>;
    deltaOptions: DeltaOptions;
    displayMode: ko.Observable<GridColumnValueBarDisplayMode>;
    alwaysShowZeroLevel: ko.Observable<boolean>;
    absoluteVariationNumericFormat: AbsoluteVariationNumericFormat;
    percentVariationNumericFormat: PercentVariationNumericFormat;
    percentOfTargetNumericFormat: PercentOfTargetNumericFormat;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getColumnType(): GridColumnType;
    protected _getActualDataItemLink(): DataItemLink;
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
}
export declare class GridSparklineColumn extends GridColumn {
    private __measure;
    measure: ko.Observable<Measure>;
    showStartEndValues: ko.Observable<boolean>;
    sparklineOptions: SparklineOptions;
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getColumnType(): GridColumnType;
    protected _getActualDataItemLink(): DataItemLink;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
}
export declare class GridHyperlinkColumn extends GridColumn {
    private __uriAttribute;
    private __displayValue;
    displayValue: ko.Observable<Dimension>;
    uriPattern: ko.Observable<string>;
    constructor(dataItemProvider: DataDashboardItem, dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getColumnType(): GridColumnType;
    protected _getActualDataItemLink(): DataItemLink;
    protected _getDefaultItemType(): string;
    _isAttribute(dataItem: DataItem): boolean;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    _getAvailableTotalTypes(dataItemProvider: IDataItemProvider): IDisplayedValue[];
}
