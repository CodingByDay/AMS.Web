﻿/**
* DevExpress Dashboard (_item-data-tuple.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDataTuple = void 0;
class itemDataTuple {
    constructor(axisPoints) {
        this._axisPoints = axisPoints;
    }
    getAxisPoint(axisName) {
        if (axisName) {
            return this._axisPoints.filter(axisPoint => {
                return axisPoint.getAxisName() == axisName;
            })[0];
        }
        else {
            return this._axisPoints[0];
        }
    }
}
exports.itemDataTuple = itemDataTuple;
