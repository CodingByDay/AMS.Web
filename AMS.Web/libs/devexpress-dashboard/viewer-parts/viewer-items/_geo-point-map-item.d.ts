﻿/**
* DevExpress Dashboard (_geo-point-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MapLayer } from 'devextreme/viz/vector_map';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { geoPointMapItemBase } from './_geo-point-map-item-base';
export declare class geoPointMapItem extends geoPointMapItemBase {
    private _dataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    _getMarkerLayers(): MapLayer[];
    _configureMarkerLayers(viewModel: any): any[];
    _getMarkerDataSource(): {
        dotDataSource: any[];
        bubbleDataSource: any[];
    };
    _getDorMarker(viewModel: any, markerDataSource: any): any;
    _getBubbleMarker(viewModel: any, markerDataSource: any): any;
    _getColorLegend(viewModel: any): void;
    _getWeightLegend(viewModel: any): void;
    _getClusterBubbleColor(value: any): "rgb(27, 73, 165)" | "rgb(63, 136, 48)" | "rgb(228, 124, 2)" | "rgb(214, 5, 5)";
    _getClusterBubbleSizeIndex(value: any): number;
    _getDataPointMeasureIds(): any[];
}
