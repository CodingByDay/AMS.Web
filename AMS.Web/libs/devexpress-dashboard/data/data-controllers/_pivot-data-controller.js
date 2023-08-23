﻿/**
* DevExpress Dashboard (_pivot-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pivotDataController = void 0;
const _pivot_grid_item_helper_1 = require("../../viewer-parts/viewer-items/pivot-grid-item/_pivot-grid-item-helper");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const _utils_1 = require("../_utils");
const _data_controller_base_1 = require("./_data-controller-base");
var GT_UNIQUE_PATH = 'GT';
class pivotDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this._measureIds = this._getMeasureIds();
        this._collapseStateCache = {};
        this._conditionalFormattingInfoCache = [];
    }
    getStyleSettingsInfo(cellItem, collapseStateCache, conditionalFormattingInfoCache, pointsCache) {
        if (this.cfModel && this.cfModel.RuleModels.length !== 0) {
            var cellInfo = this._getCellInfo(cellItem, pointsCache), rules = this._getFormatRules(cellItem, cellInfo);
            this._collapseStateCache = collapseStateCache;
            this._conditionalFormattingInfoCache = conditionalFormattingInfoCache;
            return this._getStyleSettingsInfoCore(cellInfo, rules, item_data_axis_names_1.itemDataAxisNames.pivotColumnAxis, item_data_axis_names_1.itemDataAxisNames.pivotRowAxis);
        }
    }
    _getMeasureIds() {
        var measureIds = [];
        for (var i = 0; i < this.viewModel.Values.length; i++)
            measureIds.push(this.viewModel.Values[i].DataId);
        return measureIds;
    }
    _getColumnAxis() {
        return _pivot_grid_item_helper_1.pivotHelper.getColumnAxis(this.multiData);
    }
    _getRowAxis() {
        return _pivot_grid_item_helper_1.pivotHelper.getRowAxis(this.multiData);
    }
    _getCellInfo(cellItem, pointsCache) {
        let columnAxisPoint;
        let rowAxisPoint;
        if (cellItem.area === _utils_1.pivotArea.column || cellItem.area === _utils_1.pivotArea.data)
            columnAxisPoint = this._getAxisPointByPath(pointsCache.columns, cellItem.columnPath, cellItem.columnType, false);
        if (cellItem.area === _utils_1.pivotArea.row || cellItem.area === _utils_1.pivotArea.data)
            rowAxisPoint = this._getAxisPointByPath(pointsCache.rows, cellItem.rowPath, cellItem.rowType, true);
        return {
            columnAxisPoint: columnAxisPoint,
            rowAxisPoint: rowAxisPoint
        };
    }
    _getStyleIndexes(rule, cellInfo, points) {
        var that = this, currentStyleIndexes, styleIndexes = [];
        if (rule.ApplyToRow) {
            currentStyleIndexes = that._findStyleSettingsOnAxis(cellInfo.rowAxisPoint, cellInfo.columnAxisPoint, rule.FormatConditionMeasureId, true);
            if (currentStyleIndexes.length > 0)
                styleIndexes = styleIndexes.concat(currentStyleIndexes);
        }
        if (rule.ApplyToColumn) {
            currentStyleIndexes = that._findStyleSettingsOnAxis(cellInfo.rowAxisPoint, cellInfo.columnAxisPoint, rule.FormatConditionMeasureId, false);
            if (currentStyleIndexes.length > 0)
                styleIndexes = styleIndexes.concat(currentStyleIndexes);
        }
        if (!rule.ApplyToRow && !rule.ApplyToColumn) {
            if (cellInfo.columnAxisPoint)
                points.push(cellInfo.columnAxisPoint);
            if (cellInfo.rowAxisPoint)
                points.push(cellInfo.rowAxisPoint);
            currentStyleIndexes = that._getMeasureValueByAxisPoints(points, rule.FormatConditionMeasureId);
            if (currentStyleIndexes)
                styleIndexes = styleIndexes.concat(currentStyleIndexes);
        }
        return styleIndexes;
    }
    _findStyleSettingsOnAxis(rowAxisPoint, columnAxisPoint, measureId, isRowAxis) {
        var that = this, styleIndexes = [], rowPoint = rowAxisPoint ? rowAxisPoint : this._getRowAxis().getRootPoint(), columnPoint = columnAxisPoint ? columnAxisPoint : this._getColumnAxis().getRootPoint(), slicePoint = isRowAxis ? rowPoint : columnPoint, intersectingRootPoint, slice, intersectingPoints = [], cfAxisPoint, conditionalFormattingInfo = {
            slicePoint: slicePoint,
            measureId: measureId,
            styleIndexes: [],
            toString: function () {
                return this.slicePoint.getUniquePath() + this.measureId;
            }
        }, iteratePoints = function (intersectingPoints, point) {
            var children = point.getChildren(), child, collapseStateKey = point.getUniquePath().concat(isRowAxis ? 'column' : 'row'), wasCollapsed = that._collapseStateCache[collapseStateKey];
            if (wasCollapsed === undefined) {
                intersectingPoints.push(point);
                if (children && children.length > 0) {
                    for (var i = 0; i < children.length; i++) {
                        child = children[i];
                        iteratePoints(intersectingPoints, child);
                    }
                }
            }
        };
        cfAxisPoint = this._conditionalFormattingInfoCache[conditionalFormattingInfo];
        if (cfAxisPoint)
            return cfAxisPoint.styleIndexes;
        slice = this.multiData.getSlice(slicePoint);
        intersectingRootPoint = isRowAxis ? this._getColumnAxis().getRootPoint() : this._getRowAxis().getRootPoint();
        iteratePoints(intersectingPoints, intersectingRootPoint);
        for (let index = 0; index < intersectingPoints.length; index++) {
            const intersectingPoint = intersectingPoints[index], finalSlice = slice.getSlice(intersectingPoint), currentStyleIndexes = finalSlice.getConditionalFormattingMeasureValue(measureId);
            if (currentStyleIndexes) {
                styleIndexes = currentStyleIndexes;
                break;
            }
        }
        conditionalFormattingInfo.styleIndexes = styleIndexes;
        this._conditionalFormattingInfoCache[conditionalFormattingInfo] = conditionalFormattingInfo;
        return styleIndexes;
    }
    _getFormatRules(cellItem, cellInfo) {
        var that = this, dataId, rules = [];
        switch (cellItem.area) {
            case _utils_1.pivotArea.column:
                dataId = that._getPointId(cellInfo.columnAxisPoint);
                rules = rules.concat(that._getFormatRulesByDataId(dataId));
                break;
            case _utils_1.pivotArea.row:
                dataId = that._getPointId(cellInfo.rowAxisPoint);
                rules = rules.concat(that._getFormatRulesByDataId(dataId));
                break;
            default: {
                dataId = that._measureIds[cellItem.cellIndex];
                rules = that.cfModel.RuleModels.filter(rule => {
                    return rule.ApplyToRow || (that._isRowValuePosition() && rule.ApplyToColumn) || rule.ApplyToDataId === dataId;
                });
                break;
            }
        }
        return rules;
    }
    _isRowValuePosition() {
        return this.viewModel.ValuesPosition === 'Rows';
    }
    _getAxisPointByPath(pointsCache, path, type, isRowAxisPoint) {
        var correctedPath = path, axisPoint;
        if (type === GT_UNIQUE_PATH)
            correctedPath = GT_UNIQUE_PATH;
        axisPoint = pointsCache[correctedPath];
        if (!axisPoint) {
            let axis = isRowAxisPoint ? this._getRowAxis() : this._getColumnAxis();
            axisPoint = axis.getPointByUniqueValues(path);
        }
        return axisPoint;
    }
    _getFormatRulesByDataId(dataId) {
        var that = this, formatRules = [];
        if (that.cfModel) {
            that.cfModel.RuleModels.forEach(rule => {
                if (rule.ApplyToDataId === dataId) {
                    formatRules.push(rule);
                }
            });
        }
        return formatRules;
    }
    _getPointId(point) {
        var dimension, columnPointId;
        if (point) {
            dimension = point.getDimension();
            columnPointId = dimension ? dimension.id : undefined;
        }
        return columnPointId;
    }
}
exports.pivotDataController = pivotDataController;
