﻿/**
* DevExpress Dashboard (_geo-point-map-data-controller-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataMeasureValue } from '../item-data/item-data-definitions';
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { PrimitiveType } from '../types';
import { dataControllerBase } from './_data-controller-base';
export declare class geoPointMapDataControllerBase extends dataControllerBase {
    axisPoints: Array<itemDataAxisPoint>;
    constructor(options: any);
    getPoint(index: any, valueIndex?: any): {
        lat: PrimitiveType;
        lon: PrimitiveType;
        latSel: PrimitiveType;
        lonSel: PrimitiveType;
        pointsCount: any;
        tooltipDimensions: any[];
        tooltipMeasures: any[];
    };
    getCount(): number;
    _prepare(): void;
    _getAxisPointDimensionDescriptorId(): any;
    _getMeasure(index: any, measureName: any, groupByDimensionId?: string): ItemDataMeasureValue;
    _getMeasureValue(index: any, measureName: any): number;
    _getMeasureDisplayText(index: any, measureName: any, groupByDimensionId?: string): string;
    _getLatitude(index: any): itemDataAxisPoint;
    _getLatitudeValue(index: any): PrimitiveType;
    _getLatitudeUniqueValue(index: any): PrimitiveType;
    _getLongitude(index: any): itemDataAxisPoint;
    _getLongitudeValue(index: any): PrimitiveType;
    _getLongitudeUniqueValue(index: any): PrimitiveType;
    _getPointsCount(index: any): number;
    _getTooltipDimensions(index: any): any[];
    _getTooltipMeasures(index: any): any[];
    _getAxisPoint(index: any): itemDataAxisPoint;
}
