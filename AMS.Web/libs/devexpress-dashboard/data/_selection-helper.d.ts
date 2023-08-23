﻿/**
* DevExpress Dashboard (_selection-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class selectionHelper {
    static setSelectedArguments(widget: any, values: any, state: any): void;
    static setSelectedSeries(widget: any, values: any, state: any): void;
    static setSelectedPoint(widget: any, seriesValue: any, argumentValue: any, state: any): void;
    static setSelectedWidgetViewer(widget: any, values: any, state: any): void;
    static selectWholePie(widgetViewer: any, state: any): void;
    static _selectSeries(widget: any, seriesValue: any, state: any): void;
    static _selectArgument(widget: any, argumentValue: any, state: any): void;
    static _selectSeriesPoints(series: any, argumentValue: any, state: any): void;
    static _selectValue(widget: any, value: any, state: any): void;
    static _selectWidget(widget: any, state: any): void;
    static _checkWidgetCorrespondsToValue(widget: any, value: any): boolean;
}
