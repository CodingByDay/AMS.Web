﻿/**
* DevExpress Dashboard (_item-data-axis.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PrimitiveType } from '../types';
import { itemDataDimension } from './internal/_item-meta-data';
import { ItemDataAxis } from './item-data-definitions';
import { itemDataAxisPoint } from './_item-data-axis-point';
export declare class itemDataAxis implements ItemDataAxis {
    _dimensions: itemDataDimension[];
    _axisPoint: itemDataAxisPoint;
    constructor(dimensions: itemDataDimension[], axisPoint: itemDataAxisPoint);
    getDimensions(): Array<itemDataDimension>;
    getRootPoint(): itemDataAxisPoint;
    getPoints(ignoreRootPoint?: boolean): Array<itemDataAxisPoint>;
    getAvaliableLeafPoints(): Array<itemDataAxisPoint>;
    getPointsByDimension(dimensionId: string): Array<itemDataAxisPoint>;
    getPointByUniqueValues(values: Array<PrimitiveType>): itemDataAxisPoint;
    getPointByUniqueValueAndDimension(value: any, dimensionId: string): itemDataAxisPoint;
    getPointByValues(values: Array<PrimitiveType>): itemDataAxisPoint;
}
