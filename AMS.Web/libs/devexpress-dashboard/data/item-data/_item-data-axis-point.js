﻿/**
* DevExpress Dashboard (_item-data-axis-point.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDataAxisPoint = exports.dataStorageSpecialIds = void 0;
const special_values_1 = require("../special-values");
const _formatter_1 = require("../_formatter");
exports.dataStorageSpecialIds = {
    DisplayText: '_DisplayText_{4873F9E9-65B2-4307-BB25-BFD09F6A2E54}',
    Value: '_Value_{E5597004-313E-4F79-B02E-DEA46EEB1BFE}'
};
class itemDataAxisPoint {
    constructor(levelInfo, dataRowKey) {
        this._info = levelInfo;
        this._dataRowKey = dataRowKey;
        this._children = [];
        this._parent = undefined;
    }
    _getSpecialValue(specialId) {
        var that = this, info = that._info;
        return info.getMetaDataValue(that._dataRowKey, specialId);
    }
    getUniqueValue() {
        var that = this, info = that._info;
        return info.getBaseValue(that._dataRowKey);
    }
    getValue() {
        var that = this;
        var value = that._getSpecialValue(exports.dataStorageSpecialIds.Value);
        if (value === null || value === undefined)
            value = that.getUniqueValue();
        if (value === special_values_1.specialValues.nullValueGuid)
            value = null;
        return value;
    }
    _getLevel() {
        return this._info.level;
    }
    _getServerText() {
        var that = this;
        return that._getSpecialValue(exports.dataStorageSpecialIds.DisplayText);
    }
    getKey() {
        return this._dataRowKey;
    }
    getAxisName() {
        return this._info.axisName;
    }
    getChildren() {
        return this._children;
    }
    getParent() {
        return this._parent;
    }
    getAvaliableLeafPoints() {
        var children = this.getChildren();
        if (children && children.length) {
            return children.reduce((acc, child) => {
                var lastLevelPoints = child.getAvaliableLeafPoints();
                if (lastLevelPoints && lastLevelPoints.length) {
                    acc = acc.concat(lastLevelPoints);
                }
                return acc;
            }, []);
        }
        return [this];
    }
    _setParent(parent) {
        this._parent = parent;
    }
    _setChildren(children) {
        this._children = children;
    }
    getParentByDimensionId(dimensionId) {
        var current = this, dimension;
        while (current.getParent()) {
            dimension = current.getDimension();
            if (dimension && dimension.id == dimensionId) {
                return current;
            }
            current = current.getParent();
        }
        return dimensionId ? this : current;
    }
    getDimensionValue(dimensionId) {
        var that = this, dimension = that.getDimension();
        if (!dimensionId || dimension && dimension.id == dimensionId) {
            return {
                getValue: function () {
                    return that.getValue();
                },
                getUniqueValue: function () {
                    return that.getUniqueValue();
                },
                getDisplayText: function () {
                    return that.getDisplayText();
                }
            };
        }
        else {
            var parent = that.getParent();
            return parent ? parent.getDimensionValue(dimensionId) : null;
        }
    }
    getDisplayText() {
        var that = this, displayText = that._getServerText(), uniqueValue = that.getUniqueValue();
        if (uniqueValue === special_values_1.specialValues.olapNullValueGuid)
            return undefined;
        if (displayText == null) {
            var dimension = that.getDimension();
            if (dimension) {
                var format = that._info.metaData.getDimensionFormat(dimension.id);
                displayText = _formatter_1.format(this.getValue(), format);
            }
        }
        return displayText;
    }
    getDimension() {
        var that = this, axisName = that.getAxisName(), dimensions = that._info.metaData.getAxes()[axisName], dimension = dimensions[that._getLevel()];
        return dimension;
    }
    getDimensions() {
        var that = this, parent = that.getParent();
        return parent ? parent.getDimensions().concat([that.getDimension()]) : [];
    }
    getAxisPath() {
        return this._selectPath(undefined);
    }
    getUniquePath() {
        return this._selectPath(function (point) {
            return point.getUniqueValue();
        });
    }
    getValuePath(includeProc) {
        return this._selectIncludedPath(includeProc, function (point) {
            return point.getValue();
        });
    }
    getDisplayPath(includeProc) {
        return this._selectIncludedPath(includeProc, function (point) {
            return point.getDisplayText();
        });
    }
    getValues() {
        var value = [], axisPoint = this;
        while (axisPoint.getUniqueValue() != null) {
            value.push(axisPoint.getUniqueValue());
            if (this.getDimensions().length == 1)
                break;
            axisPoint = axisPoint.getParent();
        }
        value.reverse();
    }
    _selectIncludedPath(includeProc, pointProc) {
        return this._selectPath(function (point) {
            if (!includeProc || includeProc(point)) {
                return pointProc(point);
            }
            else {
                return undefined;
            }
        });
    }
    _selectPath(predicate) {
        var action = predicate ? predicate : function (axisPoint) {
            return axisPoint;
        }, buildParentsList = function (axisPoint) {
            var parent = axisPoint.getParent();
            if (parent) {
                var newValue = action(axisPoint);
                return buildParentsList(parent).concat(newValue === undefined ? [] : [newValue]);
            }
            else {
                return [];
            }
        };
        return buildParentsList(this);
    }
    getPointsByDimensionId(dimensionId) {
        return this._getPointsByDimensionId(dimensionId, function (point) {
            return point;
        });
    }
    getDisplayTextsByDimensionId(dimensionId) {
        return this._getPointsByDimensionId(dimensionId, function (point) {
            return point.getDisplayText();
        });
    }
    _getPointsByDimensionId(dimensionId, pointProc) {
        var result = [];
        this._findPoints(dimensionId, result, pointProc);
        return result;
    }
    _findPoints(dimensionId, result, pointProc) {
        var dimension = this.getDimension();
        if (dimension && dimension.id === dimensionId) {
            result.push(pointProc(this));
            return;
        }
        var children = this.getChildren();
        for (var i = 0; i < children.length; i++) {
            children[i]._findPoints(dimensionId, result, pointProc);
        }
    }
}
exports.itemDataAxisPoint = itemDataAxisPoint;
