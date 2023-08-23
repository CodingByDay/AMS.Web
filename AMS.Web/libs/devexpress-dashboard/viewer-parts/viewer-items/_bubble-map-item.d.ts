﻿/**
* DevExpress Dashboard (_bubble-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MapLayer } from 'devextreme/viz/vector_map';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { geoPointMapItemBase } from './_geo-point-map-item-base';
export declare class bubbleMapItem extends geoPointMapItemBase {
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    _getMarkerLayers(): MapLayer[];
    _configureMarkerLayers(viewModel: any): any[];
    _getMarkerDataSource(): any[];
    _getMarker(viewModel: any, markerDataSource: any): any;
    _getColorLegend(viewModel: any): any;
    _getWeightLegend(viewModel: any): any;
    _getBubbleTooltip(viewModel: any, weight: any, color: any, pointsCount: any): string;
    _getBubbleRangeStops(colorizer: any, markerDataSource: any): any[];
    _getBubbleWeightRangeStops(markerDataSource: any): any[];
    _getBubbleColors(colorModels: any, defaultColorsCount: any): any;
    _getDefaultBubbleColorizerColors(count: any): any[];
    _getDataPointMeasureIds(): any[];
}
