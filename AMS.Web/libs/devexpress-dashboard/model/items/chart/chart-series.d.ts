﻿/**
* DevExpress Dashboard (chart-series.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Measure } from '../../data-item/measure';
import { OpenHighLowCloseSeriesType, RangeSeriesType, SimpleSeriesType } from '../../enums';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { DataDashboardItem } from '../data-dashboard-item';
import { DataItemContainer } from '../data-item-container';
import { ConstrainedBindingProperty } from '../_binding-model';
import { PointLabelOptions } from './point-label-options';
export declare abstract class ChartSeries extends DataItemContainer {
    plotOnSecondaryAxis: ko.Observable<boolean>;
    ignoreEmptyPoints: ko.Observable<boolean>;
    showPointMarkers: ko.Observable<boolean>;
    pointLabelOptions: PointLabelOptions;
    constructor(seriesJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    grabFrom(series: ChartSeries): void;
    abstract get _measures(): Array<Measure>;
    _getDataId(): string;
    abstract _getBindingModel(): Array<ConstrainedBindingProperty>;
    abstract get _isConditionalFormattingSupported(): boolean;
}
export declare class SimpleSeries extends ChartSeries {
    private __value;
    value: ko.Observable<Measure>;
    seriesType: ko.Observable<SimpleSeriesType>;
    constructor(dataItemProvider: DataDashboardItem, seriesJSON?: any, serializer?: ModelSerializer);
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    _getContainerType(): SimpleSeriesType;
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    protected _getDefaultItemType(): string;
    get _measures(): Measure[];
    get _isConditionalFormattingSupported(): boolean;
}
export declare class RangeSeries extends ChartSeries {
    private __value1;
    private __value2;
    value1: ko.Observable<Measure>;
    value2: ko.Observable<Measure>;
    seriesType: ko.Observable<RangeSeriesType>;
    constructor(dataItemProvider: DataDashboardItem, seriesJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    _getContainerType(): RangeSeriesType;
    get _measures(): Measure[];
    get _isConditionalFormattingSupported(): boolean;
}
export declare class WeightedSeries extends ChartSeries {
    private __weight;
    private __value;
    weight: ko.Observable<Measure>;
    value: ko.Observable<Measure>;
    constructor(dataItemProvider: DataDashboardItem, seriesJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    get _measures(): Measure[];
    get _isConditionalFormattingSupported(): boolean;
}
export declare class HighLowCloseSeries extends ChartSeries {
    private __high;
    private __low;
    private __close;
    high: ko.Observable<Measure>;
    low: ko.Observable<Measure>;
    close: ko.Observable<Measure>;
    constructor(dataItemProvider: DataDashboardItem, seriesJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    get _measures(): Measure[];
    get _isConditionalFormattingSupported(): boolean;
}
export declare class OpenHighLowCloseSeries extends HighLowCloseSeries {
    private __open;
    open: ko.Observable<Measure>;
    seriesType: ko.Observable<OpenHighLowCloseSeriesType>;
    constructor(dataItemProvider: DataDashboardItem, seriesJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    _getContainerType(): OpenHighLowCloseSeriesType;
    get _measures(): Measure[];
    get _isConditionalFormattingSupported(): boolean;
}
