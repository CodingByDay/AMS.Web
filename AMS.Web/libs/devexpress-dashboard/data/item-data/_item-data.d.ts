﻿/**
* DevExpress Dashboard (_item-data.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataRowKey } from '../data-storage/_data-slice';
import { dataStorage } from '../data-storage/_data-storage';
import { PrimitiveType } from '../types';
import { itemDataDimension, itemDataMeasure, itemMetaData } from './internal/_item-meta-data';
import { ItemData, ItemDataAxisName, ItemDataDelta, ItemDataDeltaValue, ItemDataMeasure, ItemDataMeasureValue } from './item-data-definitions';
import { itemDataAxis } from './_item-data-axis';
import { itemDataAxisPoint } from './_item-data-axis-point';
import { itemDataTuple } from './_item-data-tuple';
export declare class itemData implements ItemData {
    _metaData: itemMetaData;
    _storage: dataStorage;
    _rootItems: {
        [axisName: string]: itemDataAxisPoint;
    };
    constructor(metaData: itemMetaData, storage: dataStorage, rootItems: {
        [name: string]: itemDataAxisPoint;
    });
    isEmpty(): boolean;
    getCurrentFilterValues(dimensionIds: Array<string>, axisName: ItemDataAxisName, selectedValues: Array<itemDataAxisPoint> | Array<Array<PrimitiveType>>): Array<itemDataTuple>;
    getCurrentDrillDownValues(dimensionIds: Array<string>, axisName: ItemDataAxisName): itemDataTuple;
    getAvailableTuples(dimensionIds: Array<string>, axisName: ItemDataAxisName): Array<itemDataTuple>;
    getAllSelectionValues(dimensionIds: Array<string>): any;
    getMeasuresByIds(measureIds: Array<string>): Array<ItemDataMeasure>;
    getAxisNames(): Array<ItemDataAxisName>;
    getAxis(axisName?: ItemDataAxisName): itemDataAxis;
    getDimensions(axisName?: ItemDataAxisName): Array<itemDataDimension>;
    getColorMeasures(): Array<ItemDataMeasure>;
    getMeasures(): Array<itemDataMeasure>;
    getDeltas(): Array<ItemDataDelta>;
    getMeasureById(id: string): ItemDataMeasure;
    getDeltaById(id: string): ItemDataDelta;
    getSlice(value: itemDataTuple | itemDataAxisPoint): itemData;
    getMeasureFormat(measureId: string): any;
    getMeasureExpression(measureId: string): any;
    getMeasureCalculation(measureId: string): any;
    getMeasureWindowDefinition(measureId: string): any;
    getDimensionFormat(dimensionId: string): any;
    getColorMeasureValue(colorMeasureId: string): any;
    getConditionalFormattingMeasureValue(cfMeasureId: string): any;
    getMeasureValue(measureId: string): ItemDataMeasureValue;
    getPointsByDimensionId(dimensionId: string): Array<itemDataAxisPoint>;
    _getKeys(points?: {
        [areaName: string]: itemDataAxisPoint;
    }): DataRowKey[];
    _getValue(measureId: any): any;
    _getMeasureValueByKeys(keys: any, mId: any, format: any): {
        getValue: () => any;
        getDisplayText: () => string;
    };
    _getDeltaValueByKeys(keys: any, deltaIds: any, formats: any): {
        getActualValue: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getTargetValue: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getAbsoluteVariation: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getPercentVariation: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getPercentOfTarget: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getIsGood: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getIndicatorType: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getDisplayValue: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getDisplaySubValue1: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
        getDisplaySubValue2: () => {
            getValue: () => any;
            getDisplayText: () => string;
        };
    };
    _createPointsCache(axisPoints: itemDataAxisPoint[]): {
        [areaName: string]: itemDataAxisPoint;
    };
    getMeasureValueByAxisPoints(measureId: string, axisPoints: Array<itemDataAxisPoint>): ItemDataMeasureValue;
    getDeltaValue(deltaId: string): ItemDataDeltaValue;
    getDeltaValueByAxisPoints(deltaId: string, axisPoints: Array<itemDataAxisPoint>): ItemDataDeltaValue;
    getDataMembers(): Array<string>;
    createTuple(values: Array<itemDataAxisPoint> | Array<{
        axisName: ItemDataAxisName;
        value: Array<PrimitiveType>;
    }>): itemDataTuple;
    _getCellValue(keys: DataRowKey[], valueId: any): any;
    _getCellDisplayText(keys: any, valueId: any, format: any): string;
    _getSliceByAxisPoint(axisPoint: any): itemData;
    _getSliceByTuple(tuple: any): itemData;
}
