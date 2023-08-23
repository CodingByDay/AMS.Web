﻿/**
* DevExpress Dashboard (_item-data.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemData = void 0;
const _formatter_1 = require("../_formatter");
const _utils_1 = require("../_utils");
const _item_meta_data_1 = require("./internal/_item-meta-data");
const item_data_axis_names_1 = require("./item-data-axis-names");
const _item_data_axis_1 = require("./_item-data-axis");
const _item_data_axis_point_1 = require("./_item-data-axis-point");
const _item_data_tuple_1 = require("./_item-data-tuple");
class itemData {
    constructor(metaData, storage, rootItems) {
        this._metaData = metaData;
        this._storage = storage;
        this._rootItems = rootItems;
    }
    isEmpty() {
        return this._storage.isEmpty();
    }
    getCurrentFilterValues(dimensionIds, axisName, selectedValues) {
        var that = this, dimensionCount = dimensionIds.length;
        if (dimensionCount > 0) {
            var axis = this.getAxis(axisName), tuples = [];
            if (selectedValues) {
                for (let valueIndex = 0; valueIndex < selectedValues.length; valueIndex++) {
                    const point = selectedValues[valueIndex];
                    var value = point[0];
                    var axisPoint = axis.getPointsByDimension(dimensionIds[0]).filter((point) => {
                        return _utils_1.checkValuesAreEqual(value, point.getUniqueValue());
                    })[0];
                    for (let i = 1; i < dimensionCount; i++) {
                        value = point[i];
                        axisPoint = axisPoint.getChildren().filter((point) => {
                            return _utils_1.checkValuesAreEqual(value, point.getUniqueValue());
                        })[0];
                    }
                    tuples.push(new _item_data_tuple_1.itemDataTuple([axisPoint]));
                }
            }
            return tuples;
        }
        return null;
    }
    getCurrentDrillDownValues(dimensionIds, axisName) {
        let dimensionCount = dimensionIds.length;
        if (dimensionCount > 0) {
            var axis = this.getAxis(axisName);
            if (axis) {
                let axisPoints = axis.getPointsByDimension(dimensionIds[0]);
                if (axisPoints.length > 0) {
                    var parentPoint = axisPoints[0].getParent();
                    if (parentPoint.getParent() != null) {
                        return new _item_data_tuple_1.itemDataTuple([parentPoint]);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        return null;
    }
    getAvailableTuples(dimensionIds, axisName) {
        var that = this, dimensionCount = dimensionIds.length;
        if (dimensionCount > 0) {
            var axis = this.getAxis(axisName);
            if (axis) {
                var tuples = [];
                axis.getPointsByDimension(dimensionIds[dimensionCount - 1]).forEach((axisPoint) => {
                    tuples.push(new _item_data_tuple_1.itemDataTuple([axisPoint]));
                });
                return tuples;
            }
        }
        return null;
    }
    getAllSelectionValues(dimensionIds) {
        var multiData = this, allAxisNames = multiData.getAxisNames(), axisNames = [], selectionList = [], fillAvailableValues = function (axes, row, inputSelection) {
            var firstAxis = multiData.getAxis(axes[0]), nextAxes = axes.slice(1, axes.length), axisPoints = firstAxis.getPoints() || [];
            axisPoints.forEach((axisPoint) => {
                var newRow = row.slice();
                axisPoint.getAxisPath().forEach((pathPoint) => {
                    if (dimensionIds.filter((id) => { return id === pathPoint.getDimension().id; }).length > 0) {
                        newRow.push(pathPoint.getUniqueValue());
                    }
                });
                if (axes.length > 1) {
                    fillAvailableValues(nextAxes, newRow, inputSelection);
                }
                else {
                    inputSelection.push(newRow);
                }
            });
        };
        if (dimensionIds && dimensionIds.length > 0) {
            dimensionIds.forEach((id) => {
                allAxisNames.forEach((axisName) => {
                    if (multiData.getAxis(axisName).getDimensions().filter((descr) => {
                        return descr.id === id;
                    }).length > 0
                        && axisNames.indexOf(axisName) === -1) {
                        axisNames.push(axisName);
                    }
                });
            });
            fillAvailableValues(axisNames, [], selectionList);
        }
        return selectionList;
    }
    getMeasuresByIds(measureIds) {
        var that = this, measures = [];
        measureIds.forEach((id) => {
            measures.push(that.getMeasureById(id));
        });
        return measures;
    }
    getAxisNames() {
        return this._metaData.getAxisNames();
    }
    getAxis(axisName) {
        if (axisName === undefined) {
            axisName = item_data_axis_names_1.itemDataAxisNames.defaultAxis;
        }
        var dimensions = this.getDimensions(axisName), root = this._rootItems[axisName];
        return root ? new _item_data_axis_1.itemDataAxis(dimensions, root) : null;
    }
    getDimensions(axisName) {
        return this._metaData.getDimensions(axisName);
    }
    getColorMeasures() {
        return this._metaData.getColorMeasures();
    }
    getMeasures() {
        return this._metaData.getMeasures();
    }
    getDeltas() {
        return this._metaData.getDeltas();
    }
    getMeasureById(id) {
        return this._metaData.getMeasureById(id);
    }
    getDeltaById(id) {
        return this._metaData.getDeltaById(id);
    }
    getSlice(value) {
        return (value instanceof _item_data_tuple_1.itemDataTuple) ? this._getSliceByTuple(value) :
            (value instanceof _item_data_axis_point_1.itemDataAxisPoint) ? this._getSliceByAxisPoint(value) : null;
    }
    getMeasureFormat(measureId) {
        return this._metaData.getMeasureFormat(measureId);
    }
    getMeasureExpression(measureId) {
        return this._metaData.getMeasureExpression(measureId);
    }
    getMeasureCalculation(measureId) {
        return this._metaData.getMeasureCalculation(measureId);
    }
    getMeasureWindowDefinition(measureId) {
        return this._metaData.getMeasureWindowDefinition(measureId);
    }
    getDimensionFormat(dimensionId) {
        return this._metaData.getDimensionFormat(dimensionId);
    }
    getColorMeasureValue(colorMeasureId) {
        return this._getValue(colorMeasureId);
    }
    getConditionalFormattingMeasureValue(cfMeasureId) {
        return this._getValue(cfMeasureId);
    }
    getMeasureValue(measureId) {
        var that = this, format = that.getMeasureFormat(measureId);
        return that._getMeasureValueByKeys(that._getKeys(), measureId, format);
    }
    getPointsByDimensionId(dimensionId) {
        var points = [], root, axis;
        var that = this;
        let axes = that._metaData.getAxes();
        Object.keys(axes).forEach((axisName) => {
            let dimensions = axes[axisName];
            var foundDimensions = dimensions.filter((dimension) => {
                return dimension.id === dimensionId;
            });
            if (foundDimensions) {
                root = that._rootItems[axisName];
                axis = new _item_data_axis_1.itemDataAxis(dimensions, root);
                points = axis.getPointsByDimension(dimensionId);
                return false;
            }
        });
        return points;
    }
    _getKeys(points) {
        var that = this, rootItems = that._rootItems, keysList = [];
        Object.keys(rootItems).forEach((axisName) => {
            var userPoint = (points && points[axisName]), point = userPoint || rootItems[axisName];
            keysList.push(point.getKey());
        });
        return keysList;
    }
    _getValue(measureId) {
        var that = this;
        return that._getCellValue(that._getKeys(), measureId);
    }
    _getMeasureValueByKeys(keys, mId, format) {
        var that = this;
        return {
            getValue: function () {
                return that._getCellValue(keys, mId);
            },
            getDisplayText: function () {
                return that._getCellDisplayText(keys, mId, format);
            }
        };
    }
    _getDeltaValueByKeys(keys, deltaIds, formats) {
        var that = this, names = _item_meta_data_1.deltaValueNames, getValueItem = function (valueName) {
            return {
                getValue: function () {
                    return that._getCellValue(keys, deltaIds[valueName]);
                },
                getDisplayText: function () {
                    var format = formats[valueName];
                    if (format) {
                        format = {
                            NumericFormat: format
                        };
                    }
                    return that._getCellDisplayText(keys, deltaIds[valueName], format);
                }
            };
        };
        return {
            getActualValue: function () {
                return getValueItem(names.actualValue);
            },
            getTargetValue: function () {
                return getValueItem(names.targetValue);
            },
            getAbsoluteVariation: function () {
                return getValueItem(names.absoluteVariation);
            },
            getPercentVariation: function () {
                return getValueItem(names.percentVariation);
            },
            getPercentOfTarget: function () {
                return getValueItem(names.percentOfTarget);
            },
            getIsGood: function () {
                return getValueItem(names.isGood);
            },
            getIndicatorType: function () {
                return getValueItem(names.indicatorType);
            },
            getDisplayValue: function () {
                return getValueItem(names.mainValue);
            },
            getDisplaySubValue1: function () {
                return getValueItem(names.subValue1);
            },
            getDisplaySubValue2: function () {
                return getValueItem(names.subValue2);
            }
        };
    }
    _createPointsCache(axisPoints) {
        var cache = {};
        for (var i = 0; i < axisPoints.length; i++) {
            var areaName = axisPoints[i].getAxisName();
            cache[areaName] = axisPoints[i];
        }
        return cache;
    }
    getMeasureValueByAxisPoints(measureId, axisPoints) {
        var that = this, format = that.getMeasureFormat(measureId), pointsCache = that._createPointsCache(axisPoints);
        return that._getMeasureValueByKeys(that._getKeys(pointsCache), measureId, format);
    }
    getDeltaValue(deltaId) {
        var that = this, metaData = that._metaData, deltaIds = metaData.getDeltaValueIds(deltaId), formats = metaData.getDeltaFormats(deltaId);
        return that._getDeltaValueByKeys(that._getKeys(), deltaIds, formats);
    }
    getDeltaValueByAxisPoints(deltaId, axisPoints) {
        var that = this, metaData = this._metaData, deltaIds = metaData.getDeltaValueIds(deltaId), formats = metaData.getDeltaFormats(deltaId), pointsCache = this._createPointsCache(axisPoints);
        return this._getDeltaValueByKeys(that._getKeys(pointsCache), deltaIds, formats);
    }
    getDataMembers() {
        return this._metaData.getDataMembers();
    }
    createTuple(values) {
        var that = this, axisPoints = [];
        if (values[0] instanceof _item_data_axis_point_1.itemDataAxisPoint) {
            axisPoints = values;
        }
        else {
            values.forEach((axisValue) => {
                var axis = that.getAxis(axisValue.axisName), axisPoint = axis.getPointByUniqueValues(axisValue.value);
                axisPoints.push(axisPoint);
            });
        }
        return new _item_data_tuple_1.itemDataTuple(axisPoints);
    }
    _getCellValue(keys, valueId) {
        return this._storage.getCrossValue(keys, valueId);
    }
    _getCellDisplayText(keys, valueId, format) {
        return format ? _formatter_1.format(this._getCellValue(keys, valueId), format) : undefined;
    }
    _getSliceByAxisPoint(axisPoint) {
        var that = this, rootItems = that._rootItems, newRootItems = {};
        Object.keys(rootItems).forEach((name) => {
            newRootItems[name] = axisPoint.getAxisName() === name ? axisPoint : rootItems[name];
        });
        return new itemData(that._metaData, that._storage, newRootItems);
    }
    _getSliceByTuple(tuple) {
        var data = this;
        tuple._axisPoints.forEach((axisPoint) => {
            data = data._getSliceByAxisPoint(axisPoint);
        });
        return data;
    }
}
exports.itemData = itemData;
