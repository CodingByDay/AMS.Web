﻿/**
* DevExpress Dashboard (_chart-data-controller-proto.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PointLabelContentType } from '../../model/enums';
import { ChartItemFormatRuleModelBase } from '../conditional-formatting/_view-model';
import { ItemDataAxisPoint } from '../item-data/item-data-definitions';
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { PrimitiveType } from '../types';
import { ChartSeriesTypeInternal, PieSeriesType } from '../_chart-helper';
import { DataControllerOptions } from '../_factory';
import { DateTimeFormatInfo, NumericFormatInfo } from '../_formatter';
import { chartDataControllerBase } from './_chart-data-controller-base';
export declare abstract class chartDataControllerProto extends chartDataControllerBase {
    _legendSeriesPrefix: string;
    _argumentAxisPoints: Array<itemDataAxisPoint>;
    _argumentFormat: any;
    _axisXFormat: any;
    constructor(options: DataControllerOptions);
    getLegendSeriesName(seriesName: string): string;
    getLegendSeriesDisplayName(seriesName: string): string;
    getDataSourceAndSeries(encodeHtml: any): {
        dataSource: Array<ChartDataSourceItem>;
        series: Array<any>;
        argumentAxis: {
            categories: Array<Number | String | Date>;
        };
    };
    protected getDataSourceAndCategories(seriesInfoList: Array<SeriesInfo>): {
        dataSource: Array<ChartDataSourceItem>;
        categories?: Array<Number | String | Date>;
    };
    protected getDataDefinedDataSourceAndCategories(seriesInfoList: Array<SeriesInfo>): {
        dataSource: Array<ChartDataSourceItem>;
        categories?: Array<Number | String | Date>;
    };
    protected abstract getArgumentBindingValue(argumentPoint: any, pointIndex: number): any;
    generatePaneName(paneName: any, paneIndex: any): any;
    _getSeriesInfo(encodeHtml: any): Array<SeriesInfo>;
    customizeTooltipText(series: any, point: any, seriesFormats: any, encodeHtml: any): Element;
    _getTooltipHtml(series: any, point: any, seriesFormats: any, encodeHtml: any, color: any): Element;
    _getTooltipSpanInternal(series: any, point: any, seriesFormats: any, encodeHtml: any): HTMLElement;
    getTooltipArgumentText(obj: any): any;
    getZoomArguments(): {
        start: number;
        end: number;
    } | undefined;
    getArgumentUniquePath(value: any): Array<PrimitiveType>;
    _getArgumentAutoFormat(): NumericFormatInfo;
    _createArgumentFormat(): NumericFormatInfo | DateTimeFormatInfo;
    _createAxisXFormat(): NumericFormatInfo | DateTimeFormatInfo;
    getArgumentFormat(): NumericFormatInfo | DateTimeFormatInfo;
    getAxisXFormat(): NumericFormatInfo | DateTimeFormatInfo;
    getArgumentText(argument: any): any;
    getAxisXLabelText(axisValue: any): any;
    _getArgumentText(argumentValue: any, formatGetter: () => NumericFormatInfo | DateTimeFormatInfo): any;
    _validatePoint(point: any, seriesType: any): boolean;
    _getCustomizeTooltipTextColor(point: any): any;
    _getLegendInfo(): any[];
    _getConditionalFormattingLegendItems(): Array<any>;
    _getConditionalFormattingRangeLegendItems(rule: ChartItemFormatRuleModelBase): any[];
    _getConditionalFormattingLegendItem(desription: string, color: any): {
        name: string;
        color: any;
    };
    _getRuleColors(rule: ChartItemFormatRuleModelBase): Array<any>;
    _valuesContainsValueSet(values: any, valueSet: any): boolean;
    _getLastSeriesType(colorMeasureId: any): ChartSeriesTypeInternal | PieSeriesType;
    _getDisplayTextBySeriesTemplates(): string;
    _iterateSeriesTemplates(proc: any): void;
    _isSelectionTagsRequired(): boolean;
    _createSeriesItem(seriesInfo: SeriesInfo, includeTags: any, encodeHtml: any): any;
    _customizePointLabelText(valueContainer: any, pointLabel: any, seriesInfo: any): string;
    _getPercentSupported(seriesInfo: any): boolean;
    _formatOpenHighLowCloseValues(values: any, formats: any, hasOpenValueField: any, encodeHtml: any, delimiter: any): HTMLElement[];
    _formatValuesList(valuesList: any, formats: any, encodeHtml: any): string;
    _formatValue(value: any, format: any, encodeHtml: any): string;
    _isNumericDataType(type: any): boolean;
    _convertContentType(typeModel: any): PointLabelContentType;
    _showPointMarker(seriesTemplate: any): boolean;
    checkSeriesTemplatePointLabels(seriesTemplateViewModel: any): boolean;
    protected showPointLabels(pointLabelInfo: any): boolean;
    private _getPointLabelInfo;
}
export declare const allowedTypesForShowPointMarkers: string[];
export interface SeriesInfo {
    name: string;
    dataId: string;
    paneName: string;
    pointVisible: boolean;
    seriesType: any;
    originalSeriesType: any;
    plotOnSecondaryAxis: any;
    ignoreEmptyPoints: boolean;
    axisPoint: ItemDataAxisPoint;
    dataMembers: Array<string>;
    colorMeasureId: string;
    valueFormats: any;
    pointLabel: any;
    seriesItem?: any;
    title?: any;
    parentTitle?: any;
    width?: number;
    staticColor?: string;
    dashStyle?: string;
    showInLegend?: boolean;
    visible?: boolean;
    legendText?: string;
    valueFields: Array<{
        name: string;
        getValue: {
            (axisPoint: ItemDataAxisPoint): any;
        };
    }>;
}
export interface ChartDataSourceItem {
    x: any;
    tag?: any;
    nullColumn?: any;
    [measureName: string]: any;
}
