﻿/**
* DevExpress Dashboard (_chart-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxChart, { Properties as dxChartOptions } from 'devextreme/viz/chart';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { itemDataTupleValues } from '../../data/item-data/_item-data-tuple';
import { ChartItemStyleSettingsProvider } from '../conditional-formatting/_chart-item-style-settings-provider';
import { baseItem, DataPoint, ViewerItemInfo } from './_base-item';
export declare class chartItem extends baseItem {
    itemElementCustomColor: JQuery.Callbacks<Function>;
    chartViewer: dxChart;
    static _maxTooltipValues: number;
    _styleSettingsProvider: ChartItemStyleSettingsProvider;
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    dispose(): void;
    protected _initializeData(newOptions: any): void;
    protected _clearSelectionUnsafe(): void;
    protected selectTupleUnsafe(tuple: itemDataTupleValues, state: any): void;
    protected _setSelectionUnsafe(values: any): void;
    protected updateContentStateUnsafe(): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected getInfoUnsafe(): ViewerItemInfo;
    _elementCustomColor(eventArgs: any): void;
    _getZoomAndPanOption(viewModel: any): {
        argumentAxis: string;
    };
    _getViewOptions(): any;
    _getCommonOptions(): dxChartOptions;
    protected _applySelectionUnsafe(): void;
    _getDataPoint(element: any): DataPoint;
    _getMeasuresIds(elementSeriesTag: any): any;
    _isMultiDataSupported(): boolean;
    _getElementInteractionValue(element: any, viewModel: any): any;
    _isAxisInPercentFormat(pane: any, isSecondaryAxis: any): boolean;
    _isAxisInScientificFormat(pane: any, isSecondaryAxis: any): boolean;
    _isFullStackedSeriesType(seriesType: any): boolean;
    _convertHoverMode(selectionMode: any): "none" | "allArgumentPoints" | "allSeriesPoints";
    _convertPointHoverMode(selectionMode: any): "none" | "allArgumentPoints" | "allSeriesPoints" | "onlyPoint";
    protected _resizeUnsafe(): void;
    _getWidget(): dxChart;
}
