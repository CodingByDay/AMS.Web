﻿/**
* DevExpress Dashboard (_scatter-chart-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FormatRuleChartElement } from '../../model/enums';
import { ChartItemFormatRuleModelBase } from '../conditional-formatting/_view-model';
import { chartDataControllerProto } from './_chart-data-controller-proto';
export declare class scatterChartDataController extends chartDataControllerProto {
    constructor(options: any);
    getArgument(argumentAxisPoint: any): number;
    protected getArgumentBindingValue(argumentPoint: any, pointIndex: any): number;
    getArgumentDisplayPath(axisPoint: any): any;
    getArgumentFormat(): any;
    getArgumentText(argument: any): string;
    _getTooltipHtml(series: any, point: any, seriesFormats: any, encodeHtml: any, color: any): HTMLTableElement;
    _getMeasureIds(): any[];
    getTooltipArgumentText(obj: any): any;
    _getTooltipArgumentText(axisPoint: any): any;
    _customizePointLabelText(valueContainer: any, pointLabel: any, seriesInfo: any): any;
    isQualitativeArgument(): boolean;
    isDiscreteArgument(): boolean;
    protected showPointLabels(pointLabelInfo: any): boolean;
    protected _getStyleSettingsInfo(argumentAxisPoint: any, seriesAxisPoint: any, seriesMeasureId: string, chartElement: FormatRuleChartElement): any;
    protected _getStyleIndexes(rule: ChartItemFormatRuleModelBase, seriesInfo: any, points: any): number[];
}
