﻿/**
* DevExpress Dashboard (_map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxVectorMap, { Properties as dxVectorMapOptions } from 'devextreme/viz/vector_map';
import { IViewport, IViewportViewModel } from '../../model/internal/_interfaces';
import { ViewerToolbarItem } from '../widgets/caption-toolbar/caption-toolbar-options';
import { baseItem, ViewerItemInfo } from './_base-item';
export interface IClientSize {
    width: number;
    height: number;
}
export interface MapWidgetState {
    zoomFactor: number;
    center: Array<number>;
}
export interface MapClusterizationInfo {
    viewport: IViewport;
    clientSize: IClientSize;
}
export interface MapClientState {
    widgetState: MapWidgetState;
    clusterizationInfo: MapClusterizationInfo;
}
export declare abstract class mapItem extends baseItem {
    mapViewer: dxVectorMap;
    clientState: MapClientState;
    initialExtentChanged: (changed: any) => void;
    isInitialExtentChanged: boolean;
    previousViewportViewModel: IViewportViewModel;
    isViewportLocked: boolean;
    constructor($container: any, options: any);
    dispose(): void;
    protected _renderContentInternal(element: HTMLElement, changeExisting: boolean, options: dxVectorMapOptions): void;
    protected resetClientViewport(): void;
    private _shouldResetClientViewport;
    private _viewportEquals;
    private _updatePreviousViewport;
    protected _clearSelectionUnsafe(): void;
    protected getInfoUnsafe(): ViewerItemInfo;
    protected _getSpecificStatePanelItems(): Array<ViewerToolbarItem>;
    protected _getMapViewerOptions(): dxVectorMapOptions;
    protected _getLabelSettings(viewModel: any): {
        label: {
            enabled: any;
            dataField: string;
        };
    };
    private _calculateZoomFactor;
    private _translateLon;
    private _translateLat;
    protected _getMapDataSource(mapItems: any, titleName: any): any[];
    protected _configureGeometryLayers(mapDataSource: any, areaSettings: any): any;
    protected _getLegend(legendModel: any): any;
    private _updateLegendPosition;
    protected _isSelected(current: any): boolean;
    protected _getToolTip(name: any, value: any): any;
    protected _getColors(colorModels: any): any;
    protected _updateRangeStops(rangeStops: any, min: any, max: any, percent: any): any[];
    private _updatePercentRangeStops;
    private _getViewport;
    protected _getClientContext(): MapClientState;
    protected _getClusterizationInfo(): MapClusterizationInfo;
    private _getWidgetState;
    protected _updateClientStateUnsafe(clientState: MapClientState): void;
    protected _updateViewport(viewport: IViewport): void;
    private _updateWidgetState;
    protected _updateContentSizeUnsafe(): void;
    viewportChangedCallback: (viewport: any) => void;
    protected _onViewPortChanged(): void;
    onInitialExtent(newViewport?: IViewport): void;
    protected _onInitialExtentUnsafe(newViewport?: IViewport): void;
    private _onInitialExtentBase;
    protected _getWidget(): dxVectorMap;
    private _subscribeItemEvents;
    private _unsubscribeItemEvents;
    private _toggleInitialExtentChanged;
}
