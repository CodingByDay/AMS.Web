﻿/**
* DevExpress Dashboard (_range-filter-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartSeriesTypeInternal, PieSeriesType } from '../_chart-helper';
import { DataControllerOptions } from '../_factory';
import { DateTimeFormatInfo, NumericFormatInfo } from '../_formatter';
import { chartDataControllerProto } from './_chart-data-controller-proto';
export declare class rangeFilterDataController extends chartDataControllerProto {
    constructor(options: DataControllerOptions);
    getArgument(argumentAxisPoint: any): any;
    _iterateSeriesTemplates(proc: any): void;
    _isSelectionTagsRequired(): boolean;
    _getLastSeriesType(colorMeasureId: any): ChartSeriesTypeInternal | PieSeriesType;
    _createArgumentFormat(): NumericFormatInfo | DateTimeFormatInfo;
    protected showPointLabels(pointLabelInfo: any): boolean;
    protected getArgumentBindingValue(argumentPoint: any, pointIndex: number): any;
}
