﻿/**
* DevExpress Dashboard (_range-selector-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxRangeSelector, { Properties as dxRangeSelectorOptions } from 'devextreme/viz/range_selector';
import { ChartDataSourceItem } from '../../../data/data-controllers/_chart-data-controller-proto';
import { dataControllerBase } from '../../../data/data-controllers/_data-controller-base';
import { DateTimeFormatInfo, NumericFormatInfo } from '../../../data/_formatter';
import { ViewerToolbarItem } from '../../widgets/caption-toolbar/caption-toolbar-options';
import { customTimePeriodDialog } from '../../widgets/dialogs/_custom-time-period-dialog';
import { baseItem } from '../_base-item';
import { IEntireRange, IRange } from './_datetime-period-converter';
export declare class rangeSelectorItem extends baseItem {
    itemElementCustomColor: any;
    timePeriodMenuSelectedIndex: number | undefined;
    rangeSelectorViewer: dxRangeSelector;
    _customTimePeriodDialog: customTimePeriodDialog;
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    protected get _isBottomFloatingToolbarPosition(): boolean;
    constructor(container: HTMLElement, options: any);
    private _getCustomTimePeriodDialog;
    protected _initializeData(newOptions: any): void;
    protected _clearSelectionUnsafe(): void;
    protected _clearSelectionBase(): void;
    protected _setSelectionUnsafe(values: Array<Array<any>>): void;
    _getCurrentRange(): rangeFilterSelection;
    getEntireRange(): rangeFilterSelection;
    dispose(): void;
    _setRange(range: Array<Date | number>): void;
    _setPredefinedRange(dateTimePeriodName: string): void;
    _getAvailablePredefinedRanges(): any;
    predefinedRangeChanged: (rangeName: any) => void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    _isBorderRequired(): boolean;
    protected _getContainerPositionUnsafe(): {
        left: any;
        top: any;
        width: any;
        height: any;
        offsetX: number;
        offsetY: number;
    };
    private _getFirstDayOfWeek;
    _getRangeSelectorViewerOptions(): dxRangeSelectorOptions;
    protected _getEntireRange(): IRange;
    protected _getEntireRangeByDataSource(dataSource: Array<ChartDataSourceItem>): IRange;
    private _checkAxisXValue;
    protected _getSelectedValues(): any[];
    _isValidValues(values: Array<any>): boolean;
    _getSliderMarkerFormat(): NumericFormatInfo | DateTimeFormatInfo;
    private static _getScaleType;
    private static _getStringScaleTypeByGroupInterval;
    private static _getDateTimeScaleType;
    _getSelectedRangeChangedHandler(): (e: any) => void;
    protected _resizeUnsafe(): void;
    _getWidget(): dxRangeSelector;
    _elementCustomColor(eventArgs: any): void;
    _hasTimePeriods(): boolean;
    _isDateTimePeriodSupported(): any;
    _getSpecificActionToolbarItems(): Array<ViewerToolbarItem>;
    _raisePredefinedPeriodSelected(index: number): void;
    _showCustomTimePeriodDialog(): void;
    _isIntYearGroupInterval(): boolean;
}
export declare class rangeFilterSelection implements IEntireRange {
    minimum: number | Date;
    maximum: number | Date;
    constructor(range: IRange);
    getMaximum(): number | Date;
    setMaximum(value: any): void;
    getMinimum(): number | Date;
    setMinimum(value: any): void;
}
