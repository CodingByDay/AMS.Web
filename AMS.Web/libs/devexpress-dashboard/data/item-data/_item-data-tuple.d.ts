﻿/**
* DevExpress Dashboard (_item-data-tuple.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ItemDataAxisName, ItemDataAxisPointTuple } from './item-data-definitions';
import { itemDataAxisPoint } from './_item-data-axis-point';
export declare class itemDataTuple implements ItemDataAxisPointTuple {
    private _axisPoints;
    constructor(axisPoints: Array<itemDataAxisPoint>);
    getAxisPoint(axisName?: ItemDataAxisName): itemDataAxisPoint;
}
export declare type itemDataTupleValue = {
    axisName: ItemDataAxisName;
    value: any[];
};
export declare type itemDataTupleValues = itemDataTupleValue[];
