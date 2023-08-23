﻿/**
* DevExpress Dashboard (_date-filter-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { baseItem, ViewerItemOptions } from '../_base-item';
import { DateFilterWidget } from './date-filter-widget';
import { DateFilterWidgetOptions } from './_date-filter-widget-options';
export declare let cssDateFilterClassNames: {
    item: string;
};
export declare class dateFilterElement extends baseItem {
    static readonly MinMeasureId: string;
    static readonly MaxMeasureId: string;
    widget: DateFilterWidget;
    timePeriodMenuSelectedIndex: number;
    predefinedRangeChanged: (rangeName: any) => void;
    protected get _allowPreview(): boolean;
    constructor(container: HTMLElement, options: ViewerItemOptions);
    _getMinContentHeight(): number;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected getInfoUnsafe(): {
        selectedPeriodName: any;
        name: string;
        headerHeight: number;
        position: JQuery.Coordinates;
        width: number;
        height: number;
        virtualSize: any;
        scroll: any;
    };
    protected _setSelectionUnsafe(values: any): void;
    protected _clearSelectionUnsafe(): void;
    protected _initializeData(newOptions: ViewerItemOptions): void;
    _clearSelectedValues(): void;
    _applySelectionToWidget(): void;
    getWidgetOptions(): DateFilterWidgetOptions;
    _mobileLayout(): boolean;
    _convertSelectedValues(value: any): Date;
    _getCurrentPredefinedRange(): any;
    _setPredefinedRange(dateTimePeriodName: string): void;
    _ensureYearValue(value: any): any;
    _updateContentSizeUnsafe(): void;
    protected _getWidget(): DateFilterWidget;
    _isBorderRequired(): boolean;
    protected _isPaneEmpty(): boolean;
    _isTransparentBackground(): boolean;
    _generateInnerBorderClassesUnsafe(element: HTMLElement): string[];
    dispose(): void;
}
