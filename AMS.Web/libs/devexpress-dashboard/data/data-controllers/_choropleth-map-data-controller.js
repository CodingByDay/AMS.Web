﻿/**
* DevExpress Dashboard (_choropleth-map-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choroplethMapDataController = void 0;
const $ = require("jquery");
const _data_controller_base_1 = require("./_data-controller-base");
class choroplethMapDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this.axisCache = {};
        this.isEmpty = true;
        this._prepare();
    }
    _prepare() {
        var attributeId = this.viewModel.AttributeDimensionId, axis = this.multiData.getAxis(), axisPoints = attributeId ? axis.getPointsByDimension(attributeId) : [];
        this.isEmpty = axisPoints.length == 0;
        for (var i = 0; i < axisPoints.length; i++) {
            let key = axisPoints[i].getValue();
            this.axisCache[key] = axisPoints[i];
        }
    }
    hasRecords() {
        return !this.isEmpty;
    }
    getDeltaValue(attribute, deltaId) {
        var axisPoint = this.axisCache[attribute];
        return axisPoint ? this.multiData.getSlice(axisPoint).getDeltaValue(deltaId) : null;
    }
    getValue(attribute, measureName) {
        var measureValue = this._getMeasureValue(attribute, measureName);
        return measureValue ? measureValue.getValue() : null;
    }
    getDisplayText(attribute, measureName) {
        var measureValue = this._getMeasureValue(attribute, measureName);
        return measureValue ? measureValue.getDisplayText() : null;
    }
    getUniqueValue(attribute) {
        var axisPoint = this.axisCache[attribute];
        return axisPoint ? axisPoint.getUniqueValue() : null;
    }
    getMinMax(measureName) {
        var that = this, min, max, value;
        $.each(this.axisCache, function (key, axisPoint) {
            value = that.multiData.getSlice(axisPoint).getMeasureValue(measureName).getValue();
            if (min == null || value < min)
                min = value;
            if (max == null || value > max)
                max = value;
        });
        return {
            min: min,
            max: max
        };
    }
    getMeasureDescriptorById(valueId) {
        return this.multiData.getMeasureById(valueId);
    }
    _getMeasureValue(attribute, measureName) {
        var axisPoint = this.axisCache[attribute];
        return axisPoint ? this.multiData.getSlice(axisPoint).getMeasureValue(measureName) : null;
    }
}
exports.choroplethMapDataController = choroplethMapDataController;
