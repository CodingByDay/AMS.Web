﻿/**
* DevExpress Dashboard (_widgets-viewer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxScrollView from 'devextreme/ui/scroll_view';
import { ArrangementInfo } from './_arrangement-info';
import { BaseWidgetItem } from './_base-widget-item';
import { WidgetsViewerArrangerAlign, WidgetsViewerBase, WidgetsViewerOptions } from './_widgets-viewer-base';
export declare class dxWidgetsViewer extends WidgetsViewerBase {
    _viewerID: any;
    _content: HTMLElement;
    _scrollBarWidth: number;
    _resizeHandler: () => void;
    totalMarginsAndBorders: {
        width: number;
        height: number;
    };
    _drawTimer: number;
    itemsList: BaseWidgetItem[];
    _widgetType: any;
    _styleTag: () => void;
    _hasVerticalScroll: 0 | 1;
    _hasHorizontalScroll: 0 | 1;
    align: WidgetsViewerArrangerAlign;
    minItemWidth: number;
    curItemWidth: number;
    _itemProportions: any;
    _needVerticalCentering: boolean;
    minItemHeight: number;
    curItemHeight: number;
    _firstDraw: boolean;
    innerContainer: HTMLElement;
    _viewerParams: any;
    countCallInternalProcessBatchItems: number;
    private container;
    constructor(element: HTMLElement, options?: WidgetsViewerOptions);
    _getDefaultOptions(): WidgetsViewerOptions;
    _init(): void;
    _update(): void;
    private initContainer;
    clear(): void;
    dispose(): void;
    _getScrollable(): dxScrollView;
    _updateScrollable(): void;
    _scrollTo(left: any, top: any): void;
    _scrollOffset(): any;
    _rootContent(): HTMLElement;
    _parentHeight(): number;
    _parentWidth(): number;
    _parentWidthWithoutScroll(): number;
    _parentHeightWithoutScroll(): number;
    _getResizeHandler(): () => void;
    _updateByOptions(): void;
    getSizeParams(): {
        virtualSize: {
            width: any;
            height: any;
        };
        scroll: {
            top: any;
            left: any;
            size: number;
            horizontal: boolean;
            vertical: boolean;
        };
        itemMargin: {
            width: number;
            height: number;
        };
    };
    getSelectedItems(): BaseWidgetItem[];
    clearSelections(): void;
    _createItems(): void;
    _refresh(): void;
    _calcTotalMarginsAndBorders(): {
        width: number;
        height: number;
    };
    _render(drawOptions?: any): void;
    _verticalCentering(table: any): void;
    redraw(): void;
    _calcItemIndex(i: any, j: any, direction: any, rowCount: any, columnCount: any): any;
    _calcVisibleRow(cardHeight: any): number;
    _calcVisibleColumn(cardWidth: any): number;
    _getPartArray(array: any, count: any, indexOfPart: any): any[];
    _createTable(arrangementInfo: any, enableAnimation: any): HTMLElement;
    _getItemProportions(): any;
    _calcViewerParams(parentWidth: any, parentHeight: any, itemCount: any, method: any): any;
    _createArrangementInfo(width: any, lineCount: any, itemMinWidth: any, proportions: any, direction: any): ArrangementInfo;
    _calculateArrangementInfo(width: any, height: any, itemCount: any, method: any): any;
    _drawItems(method?: any, itemCount?: any, enableAnimation?: any): HTMLElement;
    getItemByIndex(index?: any): any;
    _getScrollBarWidth(): number;
    _processBatchItems(functionName?: any, startIndex?: any, enableAnimation?: any): void;
}
