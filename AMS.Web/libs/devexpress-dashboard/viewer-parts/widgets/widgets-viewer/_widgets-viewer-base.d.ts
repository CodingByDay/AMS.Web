﻿/**
* DevExpress Dashboard (_widgets-viewer-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { cardLayout } from './cards/_card-layout';
export declare type WidgetsViewerArrangerMethod = 'auto' | 'row' | 'column';
export declare type WidgetsViewerWidgetType = 'card' | 'chart' | 'pieChart' | 'lineargauge' | 'circulargauge';
export declare type WidgetsViewerArrangerAlign = 'left' | 'center';
export interface WidgetsViewerViewerOptions {
    hoverEnabled?: boolean;
    align?: WidgetsViewerArrangerAlign;
    overflow?: 'auto';
    method?: WidgetsViewerArrangerMethod;
    count?: number;
    widgetType?: WidgetsViewerWidgetType;
    redrawOnResize?: boolean;
    onclick?: (e: any) => void;
    onhover?: (e: any) => void;
    onRenderComplete?: (e: any) => void;
    onAllItemsRenderComplete?: () => void;
    bulkTimesRenderingTimeInterval?: number;
    useNativeScrolling?: 'auto' | boolean;
    ignorePadding?: boolean;
    supportAnimation?: boolean;
}
export interface WidgetsViewerItemOptions {
    encodeHtml: boolean;
    minWidth: number;
    proportions: number;
    ignoreProportions: boolean;
    itemMargin: {
        width: number;
        height: number;
    };
    borderWidth: number;
    hasSparkline: boolean;
    widgetType?: WidgetsViewerWidgetType;
    hoverEnabled?: boolean;
    isSelected?: boolean;
    cursor?: any;
    tag?: any;
    parentRootElement?: HTMLElement;
    layouts?: cardLayout[];
}
export interface WidgetsViewerOptions {
    dataSource?: Array<any>;
    viewer?: WidgetsViewerViewerOptions;
    itemOptions?: WidgetsViewerItemOptions;
    useFlex?: boolean;
}
export declare abstract class WidgetsViewerBase {
    element(): HTMLElement;
    private _optionManager;
    option(): WidgetsViewerOptions;
    option(name: string): any;
    option(name: string, value: any): any;
    option(args: WidgetsViewerOptions): any;
    get _option(): WidgetsViewerOptions;
    _element: HTMLElement;
    protected _initalized: boolean;
    constructor(element: HTMLElement, options?: WidgetsViewerOptions);
    abstract _getDefaultOptions(): WidgetsViewerOptions;
    abstract _init(): any;
    abstract _update(): any;
    abstract redraw(): any;
    itemsList: any[];
    abstract clearSelections(): any;
    abstract getSizeParams(): any;
    abstract clear(): any;
    dispose(): void;
}
