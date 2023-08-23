﻿/**
* DevExpress Dashboard (_pie-map-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { MapLayer } from 'devextreme/viz/vector_map';
import { dataControllerBase } from '../../data/data-controllers/_data-controller-base';
import { pieMapDataController } from '../../data/data-controllers/_pie-map-data-controller';
import { geoPointMapItemBase } from './_geo-point-map-item-base';
export declare class pieMapItem extends geoPointMapItemBase {
    _pieUniqueArguments: any;
    _pieArgumentDisplayTexts: any;
    _pieArgumentColors: any;
    itemElementCustomColor: JQuery.Callbacks<Function>;
    protected _dataController: pieMapDataController;
    protected get dataController(): dataControllerBase;
    protected set dataController(dataController: dataControllerBase);
    constructor(container: HTMLElement, options: any);
    _getMarkerLayers(): MapLayer[];
    _configureMarkerLayers(viewModel: any): any[];
    _getPieMapMarker(viewModel: any, markerDataSource: any, pies: any): any;
    _getMarkerDataSource(pies: any, isWeighted: any): any[];
    _getColorLegend(viewModel: any): any;
    _getWeightLegend(viewModel: any): any;
    _getPieSegments(): any[];
    _fillArgumentParams(pieSegment: any): void;
    _getPiesData(pieSegments: any, viewModel: any): {};
    _getPieSegmentCount(pie: any): number;
    _getEmptyValues(length: any): any[];
    _getPieRangeStops(pies: any): any[];
    _getRangeStopIndex(value: any, rangeStops: any): number;
    _getDataPointMeasureIds(): any[];
    _elementCustomColor(eventArgs: any): void;
}
