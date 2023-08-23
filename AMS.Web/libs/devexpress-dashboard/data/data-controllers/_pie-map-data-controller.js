﻿/**
* DevExpress Dashboard (_pie-map-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieMapDataController = void 0;
const _jquery_helpers_1 = require("../_jquery-helpers");
const _utils_1 = require("../_utils");
const _geo_point_map_data_controller_base_1 = require("./_geo-point-map-data-controller-base");
class pieMapDataController extends _geo_point_map_data_controller_base_1.geoPointMapDataControllerBase {
    constructor(options) {
        super(options);
        this.elementCustomColor = options.elementCustomColor;
    }
    getPoint(index, valueIndex) {
        var point = super.getPoint(index), multiData = this.multiData, viewModel = this.viewModel, filledValues = viewModel.Values && viewModel.Values.length > 0, axisPoint = this._getAxisPoint(index), argument, argumentDisplayText, value, valueDisplayText, valueId, colorId, colorValue;
        if (viewModel.ArgumentDataId) {
            argument = axisPoint.getUniqueValue();
            argumentDisplayText = axisPoint.getDisplayText();
            if (filledValues) {
                valueId = viewModel.Values[0];
                value = this._getMeasureValue(index, valueId);
                valueDisplayText = this._getMeasureDisplayText(index, valueId);
            }
            else {
                value = point.pointsCount > 1 ? point.pointsCount : 1;
            }
            colorId = viewModel.ColorIds[0];
            colorValue = viewModel.ColorByArgument ? this._getMeasureValue(index, colorId) : multiData.getMeasureValue(colorId).getValue();
        }
        else {
            valueId = viewModel.Values[valueIndex];
            argument = multiData.getMeasureById(valueId).name;
            argumentDisplayText = argument;
            value = this._getMeasureValue(index, valueId);
            valueDisplayText = this._getMeasureDisplayText(index, valueId);
            colorValue = multiData.getMeasureValue(viewModel.ColorIds[valueIndex]).getValue();
        }
        return _jquery_helpers_1.deepExtend(point, {
            argument: argument,
            argumentDisplayText: argumentDisplayText,
            value: Math.abs(value),
            valueDisplayText: valueDisplayText,
            color: _utils_1.toColor(colorValue),
            valueId: valueId,
            axisPoint: axisPoint
        });
    }
    _getAxisPointDimensionDescriptorId() {
        return this.viewModel.ArgumentDataId || this.viewModel.LongitudeDataId;
    }
    formatValue(value) {
        var measure;
        if (this.viewModel.Values.length > 0) {
            measure = this.multiData.getMeasureById(this.viewModel.Values[0]);
        }
        return measure ? measure.format(value) : value;
    }
}
exports.pieMapDataController = pieMapDataController;
