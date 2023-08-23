﻿/**
* DevExpress Dashboard (_item-data-axis-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { itemDataAxisPoint } from '../_item-data-axis-point';
export declare let itemDataAxisHelper: {
    eachPoint: (point: itemDataAxisPoint, _process: (point: itemDataAxisPoint) => boolean | void) => boolean;
    findFirstPoint: (root: itemDataAxisPoint, predicate: (points: itemDataAxisPoint[]) => boolean) => any;
    findFirstPointByUniqueValues: (root: itemDataAxisPoint, values: any[]) => itemDataAxisPoint;
    findFirstPointByValues: (root: any, values: any) => any;
    findFirstPointByUniqueValueAndDimension: (root: any, value: any, dimensionId: any) => any;
    _areEqual: (value1: any, value2: any) => boolean;
    _equalPredicate: (points: itemDataAxisPoint[], values: any, equal: (value: any, point: itemDataAxisPoint) => boolean) => boolean;
    forSamePoints: (baseItem: any, item: any, process: any) => void;
    findChildByUniqueValue: (point: any, value: any) => any;
    getValuesByTuples: (tuples: any, dimensionIds: any) => any[];
};
