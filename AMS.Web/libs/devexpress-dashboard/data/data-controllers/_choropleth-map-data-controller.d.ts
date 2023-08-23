﻿/**
* DevExpress Dashboard (_choropleth-map-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataDeltaValue, ItemDataMeasure, ItemDataMeasureValue } from '../item-data/item-data-definitions';
import { itemDataAxisPoint } from '../item-data/_item-data-axis-point';
import { PrimitiveType } from '../types';
import { dataControllerBase } from './_data-controller-base';
export declare class choroplethMapDataController extends dataControllerBase {
    axisCache: {
        [value: string]: itemDataAxisPoint;
    };
    isEmpty: any;
    constructor(options: any);
    _prepare(): void;
    hasRecords(): boolean;
    getDeltaValue(attribute: any, deltaId: any): ItemDataDeltaValue;
    getValue(attribute: any, measureName: any): number;
    getDisplayText(attribute: any, measureName: any): string;
    getUniqueValue(attribute: any): PrimitiveType;
    getMinMax(measureName: any): {
        min: any;
        max: any;
    };
    getMeasureDescriptorById(valueId: any): ItemDataMeasure;
    _getMeasureValue(attribute: any, measureName: any): ItemDataMeasureValue;
}
