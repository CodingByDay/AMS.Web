﻿/**
* DevExpress Dashboard (_item-data-axis-point.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataRowKey, dataSlice } from '../data-storage/_data-slice';
import { PrimitiveType } from '../types';
import { ItemDataAxisName, ItemDataAxisPoint, ItemDataDimension, ItemDataDimensionValue } from './item-data-definitions';
export declare let dataStorageSpecialIds: {
    DisplayText: string;
    Value: string;
};
export declare class itemDataAxisPoint implements ItemDataAxisPoint {
    _info: LevelInfo;
    _dataRowKey: DataRowKey;
    _children: any;
    _parent: any;
    constructor(levelInfo: LevelInfo, dataRowKey: DataRowKey);
    _getSpecialValue(specialId: any): any;
    getUniqueValue(): PrimitiveType;
    getValue(): PrimitiveType;
    _getLevel(): number;
    _getServerText(): any;
    getKey(): DataRowKey;
    getAxisName(): ItemDataAxisName;
    getChildren(): Array<itemDataAxisPoint>;
    getParent(): itemDataAxisPoint;
    getAvaliableLeafPoints(): Array<itemDataAxisPoint>;
    _setParent(parent: any): void;
    _setChildren(children: itemDataAxisPoint[]): void;
    getParentByDimensionId(dimensionId: string): itemDataAxisPoint;
    getDimensionValue(dimensionId?: string): ItemDataDimensionValue;
    getDisplayText(): string;
    getDimension(): ItemDataDimension;
    getDimensions(): Array<ItemDataDimension>;
    getAxisPath(): Array<itemDataAxisPoint>;
    getUniquePath(): Array<PrimitiveType>;
    getValuePath(includeProc: any): Array<PrimitiveType>;
    getDisplayPath(includeProc?: any): Array<string>;
    getValues(): void;
    _selectIncludedPath(includeProc: any, pointProc: any): any;
    _selectPath(predicate: {
        (point: itemDataAxisPoint): any;
    }): any;
    getPointsByDimensionId(dimensionId: string): Array<itemDataAxisPoint>;
    getDisplayTextsByDimensionId(dimensionId: any): Array<string>;
    _getPointsByDimensionId(dimensionId: any, pointProc: any): any[];
    _findPoints(dimensionId: any, result: any, pointProc: any): void;
}
export interface LevelInfo {
    axisName: ItemDataAxisName;
    metaData: any;
    dataSlice: dataSlice;
    level: number;
    getMetaDataValue: {
        (dataRowKey: DataRowKey, valueId: any): any;
    };
    getBaseValue: {
        (dataRowKey: DataRowKey): any;
    };
}
