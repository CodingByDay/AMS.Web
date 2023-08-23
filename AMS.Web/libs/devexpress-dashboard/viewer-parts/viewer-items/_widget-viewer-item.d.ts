﻿/**
* DevExpress Dashboard (_widget-viewer-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { WidgetsViewerBase, WidgetsViewerOptions, WidgetsViewerWidgetType } from '../widgets/widgets-viewer/_widgets-viewer-base';
import { baseItem, ViewerItemInfo } from './_base-item';
import { IWidgetItemDataAccessor, widgetItemCore } from './_widget-viewer-item-core';
export declare abstract class widgetViewerItem<TWidgetOptions extends widgetItemCore = widgetItemCore> extends baseItem {
    widgetsViewer: WidgetsViewerBase;
    constructor(container: HTMLElement, options: any);
    protected _clearSelectionUnsafe(): void;
    protected getInfoUnsafe(): ViewerItemInfo;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected createWidgetViewer(element: HTMLElement, options: any): WidgetsViewerBase;
    protected _getContainerPositionUnsafe(): {
        left: any;
        top: any;
        width: any;
        height: any;
        offsetX: number;
        offsetY: number;
    };
    _getSpecificWidgetViewerOptions(): {
        itemOptions: {
            encodeHtml: any;
            itemWidgetOptionsPrepared: (options: Object) => void;
        };
    };
    _getWidgetType(): WidgetsViewerWidgetType;
    _isHoverEnabled(): boolean;
    _configureHover(selectionValues: any): {
        hoverEnabled: boolean;
        cursor: string;
    };
    _getWidgetViewerOptions(): WidgetsViewerOptions;
    _supportAnimation(): boolean;
    _getDataSource(): any;
    _getElementInteractionValue(element: any, viewModel?: any): any;
    _getOnClickHandler(): (e: any) => void;
    _getOnHoverHandler(): (e: any) => void;
    _convertContentArrangementMode(contentArrangementMode: any): "auto" | "column" | "row";
    protected _resizeUnsafe(): void;
    protected updateContentStateUnsafe(): void;
    _setSourceItemProperties(sourceItem: TWidgetOptions, elementModel: any, props: IWidgetItemDataAccessor): void;
    _isMultiDataSupported(): boolean;
    _ensureOptions(options: any): void;
    dispose(): void;
}
