﻿/**
* DevExpress Dashboard (_chart-data-controller-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FormatRuleChartElement } from '../../model/enums';
import { ChartItemStyleSettingsProvider } from '../../viewer-parts/conditional-formatting/_chart-item-style-settings-provider';
import { ChartItemFormatRuleModelBase } from '../conditional-formatting/_view-model';
import { itemDataDimension } from '../item-data/internal/_item-meta-data';
import { ItemDataAxisPoint } from '../item-data/item-data-definitions';
import { itemData } from '../item-data/_item-data';
import { itemDataAxis } from '../item-data/_item-data-axis';
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { DataControllerOptions } from '../_factory';
import { DateTimeFormatInfo, NumericFormatInfo } from '../_formatter';
import { dataControllerBase } from './_data-controller-base';
export declare class chartDataControllerBase extends dataControllerBase {
    static _getLegendSeriesName(seriesName: string): void;
    static _getLegendSeriesDisplayName(seriesName: string): void;
    elementCustomColor: any;
    styleSettingsProvider: ChartItemStyleSettingsProvider;
    constructor(options: DataControllerOptions);
    getArgument(argumentAxisPoint: any): any;
    getArgumentAxisPoints(argumentId?: any): Array<itemDataAxisPoint>;
    getSeriesAxisPoints(seriesId?: any): Array<ItemDataAxisPoint>;
    getSingleArgumentDimensionFormat(): NumericFormatInfo | DateTimeFormatInfo;
    getColor(argumentAxisPoint: any, seriesAxisPoint: any, measuesIds: any, colorMeasureId: any): any;
    getConditionalFormattingColorCore(argumentAxisPoint: any, seriesAxisPoint: any, seriesMeasureId: any, seriesElement: FormatRuleChartElement): any;
    getConditionalFormattingSeriesColor(seriesAxisPoint: any, seriesMeasureId: any): any;
    getConditionalFormattingPointColor(argumentAxisPoint: any, seriesAxisPoint: any, seriesMeasureId: any): any;
    isDiscreteArgument(): boolean;
    isQualitativeArgument(): boolean;
    isSingleArgument(): boolean;
    hasSeriesPoints(): boolean;
    _getElementCustomColor(argumentAxisPoint: any, seriesAxisPoint: any, measuesIds: any, color: any): any;
    _getColorFromData(argumentAxisPoint: any, seriesAxisPoint: any, colorMeasureId: any): any;
    protected _getStyleSettingsInfo(argumentAxisPoint: any, seriesAxisPoint: any, seriesMeasureId: string, chartElement: FormatRuleChartElement): any;
    protected _getStyleIndexes(rule: ChartItemFormatRuleModelBase, seriesInfo: any, points: any): Array<number>;
    private findStylesForDimension;
    private findStylesOnPointIntersection;
    private findStylesOnPointPath;
    private findStylesOnPointPathsIntersection;
    private getStyleIndexesOnArgumentAxis;
    protected _getCrossSlice(argumentAxisPoint: any, seriesAxisPoint: any): itemData;
    _getArgumentAxis(): itemDataAxis;
    _getSeriesAxis(): itemDataAxis;
    _getArgumentAxisDimensions(): Array<itemDataDimension>;
    _getSingleArgumentDimension(): itemDataDimension;
}
