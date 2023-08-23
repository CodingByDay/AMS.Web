﻿/**
* DevExpress Dashboard (_item-data-axis.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDataAxis = void 0;
const _item_data_axis_helper_1 = require("./internal/_item-data-axis-helper");
var helper = _item_data_axis_helper_1.itemDataAxisHelper;
class itemDataAxis {
    constructor(dimensions, axisPoint) {
        this._dimensions = dimensions;
        this._axisPoint = axisPoint;
    }
    getDimensions() {
        return this._dimensions;
    }
    getRootPoint() {
        var getRoot = (point) => {
            var parent = point.getParent();
            if (parent)
                return getRoot(parent);
            return point;
        };
        return getRoot(this._axisPoint);
    }
    getPoints(ignoreRootPoint = false) {
        var dimensions = this.getDimensions(), lastLevelDimension = dimensions ? dimensions[dimensions.length - 1] : null;
        if (lastLevelDimension) {
            return this.getPointsByDimension(lastLevelDimension.id);
        }
        else {
            return ignoreRootPoint ? [] : [this.getRootPoint()];
        }
    }
    getAvaliableLeafPoints() {
        return this.getRootPoint().getAvaliableLeafPoints();
    }
    getPointsByDimension(dimensionId) {
        var root = this.getRootPoint(), points = [];
        if (dimensionId) {
            helper.eachPoint(root, function (point) {
                var dimension = point.getDimension();
                if (dimension && dimension.id == dimensionId) {
                    points.push(point);
                }
            });
        }
        else {
            points.push(root);
        }
        return points;
    }
    getPointByUniqueValues(values) {
        return helper.findFirstPointByUniqueValues(this.getRootPoint(), values);
    }
    getPointByUniqueValueAndDimension(value, dimensionId) {
        return helper.findFirstPointByUniqueValueAndDimension(this.getRootPoint(), value, dimensionId);
    }
    getPointByValues(values) {
        return helper.findFirstPointByValues(this.getRootPoint(), values);
    }
}
exports.itemDataAxis = itemDataAxis;
