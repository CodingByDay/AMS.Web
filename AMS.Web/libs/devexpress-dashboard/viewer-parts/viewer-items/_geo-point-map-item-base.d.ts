﻿/**
* DevExpress Dashboard (_geo-point-map-item-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { itemDataTupleValues } from '../../data/item-data/_item-data-tuple';
import { DataPoint } from './_base-item';
import { mapItem } from './_map-item';
export declare abstract class geoPointMapItemBase extends mapItem {
    raiseTimerClusterizationDataRequest: any;
    timer: any;
    constructor(container: HTMLElement, options: any);
    initialDataRequestUnsafe(): void;
    protected selectTupleUnsafe(tuple: itemDataTupleValues, state: any): void;
    protected _setSelectionUnsafe(values: any): void;
    protected renderContentUnsafe(element: HTMLElement, changeExisting: boolean, afterRenderCallback?: any): boolean;
    protected renderPartialContentUnsafe(): void;
    protected resetClientViewport(): void;
    protected updateContentStateUnsafe(): void;
    forceUpdateClientState(): void;
    private _getGeoPointMapViewerOptions;
    _getMarkerLayers(): any;
    _configureLayers(viewModel: any): any;
    _configureMarkerLayers(viewModel: any): any;
    _updateMarkerLayers(viewModel: any): void;
    _getMarker(viewModel: any, markerDataSource: any): any;
    _getArea(viewModel: any): {
        hoverEnabled: boolean;
        selectionMode: string;
        label: {
            enabled: any;
            dataField: string;
        };
    };
    _getLegends(viewModel: any): any[];
    _getColorLegend(viewModel: any): any;
    _getWeightLegend(viewModel: any): any;
    _getMinMaxValues(markerDataSource: any): {
        min: any;
        max: any;
    };
    _pointsCountTooltip(count: any): string;
    _getElementInteractionValue(element: any, viewModel: any): any[];
    _getDimensionsTooltipHtml(tooltipDimensions: any): string;
    _getMeasuresTooltipHtml(tooltipMeasures: any): string;
    _getDataPoint(element: any): DataPoint;
    _getDataPointMeasureIds(): any[];
    protected _updateContentSizeUnsafe(): void;
    _raiseClusterizationDataRequest(): void;
    _onViewPortChanged(): void;
    _onInitialExtentUnsafe(viewport?: any): void;
}
