﻿/**
* DevExpress Dashboard (_geo-point-map-data-controller-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPointMapDataControllerBase = void 0;
const _data_controller_base_1 = require("./_data-controller-base");
class geoPointMapDataControllerBase extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this.axisPoints = [];
        this._prepare();
    }
    getPoint(index, valueIndex) {
        var pointsCount = this._getPointsCount(index);
        return {
            lat: this._getLatitudeValue(index),
            lon: this._getLongitudeValue(index),
            latSel: this._getLatitudeUniqueValue(index),
            lonSel: this._getLongitudeUniqueValue(index),
            pointsCount: pointsCount,
            tooltipDimensions: pointsCount < 2 ? this._getTooltipDimensions(index) : [],
            tooltipMeasures: this._getTooltipMeasures(index)
        };
    }
    getCount() {
        return this.axisPoints.length;
    }
    _prepare() {
        var dimensionId = this._getAxisPointDimensionDescriptorId(), axis = this.multiData.getAxis();
        this.axisPoints = dimensionId ? axis.getPointsByDimension(dimensionId) : [];
    }
    _getAxisPointDimensionDescriptorId() {
        return this.viewModel.LongitudeDataId;
    }
    _getMeasure(index, measureName, groupByDimensionId) {
        var axisPoint = this._getAxisPoint(index);
        if (groupByDimensionId)
            axisPoint = axisPoint.getParentByDimensionId(groupByDimensionId);
        return this.multiData.getSlice(axisPoint).getMeasureValue(measureName);
    }
    _getMeasureValue(index, measureName) {
        return this._getMeasure(index, measureName).getValue();
    }
    _getMeasureDisplayText(index, measureName, groupByDimensionId) {
        return this._getMeasure(index, measureName, groupByDimensionId).getDisplayText();
    }
    _getLatitude(index) {
        var point = this._getAxisPoint(index);
        return point.getParentByDimensionId(this.viewModel.LatitudeDataId);
    }
    _getLatitudeValue(index) {
        return this._getLatitude(index).getValue();
    }
    _getLatitudeUniqueValue(index) {
        return this._getLatitude(index).getUniqueValue();
    }
    _getLongitude(index) {
        var point = this._getAxisPoint(index);
        return point.getParentByDimensionId(this.viewModel.LongitudeDataId);
    }
    _getLongitudeValue(index) {
        return this._getLongitude(index).getValue();
    }
    _getLongitudeUniqueValue(index) {
        return this._getLongitude(index).getUniqueValue();
    }
    _getPointsCount(index) {
        var axisPoint = this._getAxisPoint(index).getParentByDimensionId(this.viewModel.LongitudeDataId);
        return this.multiData.getSlice(axisPoint).getMeasureValue(this.viewModel.PointsCountDataId).getValue();
    }
    _getTooltipDimensions(index) {
        var tooltipDimensionsViewModel = this.viewModel.TooltipDimensions, tooltipDimensions = [], values, distinctValues;
        if (tooltipDimensionsViewModel) {
            for (var i = 0; i < tooltipDimensionsViewModel.length; i++) {
                var axisPoint = this._getAxisPoint(index);
                axisPoint = axisPoint.getParentByDimensionId(this.viewModel.LongitudeDataId);
                values = axisPoint.getDisplayTextsByDimensionId(tooltipDimensionsViewModel[i].DataId).filter((v, i, a) => a.indexOf(v) === i);
                distinctValues = values.filter((el, index) => {
                    return index === values.indexOf(el);
                });
                tooltipDimensions.push({
                    caption: tooltipDimensionsViewModel[i].Caption,
                    values: distinctValues
                });
            }
        }
        return tooltipDimensions;
    }
    _getTooltipMeasures(index) {
        var tooltipMeasuresViewModel = this.viewModel.TooltipMeasures;
        var tooltipMeasures = [];
        if (tooltipMeasuresViewModel) {
            for (var i = 0; i < tooltipMeasuresViewModel.length; i++) {
                tooltipMeasures.push({
                    caption: tooltipMeasuresViewModel[i].Caption,
                    value: this._getMeasureDisplayText(index, tooltipMeasuresViewModel[i].DataId, this.viewModel.LongitudeDataId)
                });
            }
        }
        return tooltipMeasures;
    }
    _getAxisPoint(index) {
        return this.axisPoints[index];
    }
}
exports.geoPointMapDataControllerBase = geoPointMapDataControllerBase;
