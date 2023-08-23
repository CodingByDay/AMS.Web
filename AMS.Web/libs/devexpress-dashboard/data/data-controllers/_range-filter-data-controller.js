﻿/**
* DevExpress Dashboard (_range-filter-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFilterDataController = void 0;
const _chart_helper_1 = require("../_chart-helper");
const _formatter_1 = require("../_formatter");
const _localization_ids_1 = require("../_localization-ids");
const _localizer_1 = require("../_localizer");
const _chart_data_controller_proto_1 = require("./_chart-data-controller-proto");
class rangeFilterDataController extends _chart_data_controller_proto_1.chartDataControllerProto {
    constructor(options) {
        super(options);
    }
    getArgument(argumentAxisPoint) {
        if (argumentAxisPoint.getParent() != null) {
            return argumentAxisPoint.getValue();
        }
        else {
            return _localizer_1.localizer.getString(_localization_ids_1.localizationId.ChartTotalValue);
        }
    }
    _iterateSeriesTemplates(proc) {
        this.viewModel.SeriesTemplates.forEach(seriesTemplate => {
            proc(undefined, seriesTemplate);
        });
    }
    _isSelectionTagsRequired() {
        return false;
    }
    _getLastSeriesType(colorMeasureId) {
        var seriesTemplates = this.viewModel.SeriesTemplates;
        for (var i = seriesTemplates.length - 1; i >= 0; i--) {
            if (colorMeasureId === seriesTemplates[i].ColorMeasureID) {
                return _chart_helper_1.chartHelper.convertSeriesType(seriesTemplates[i].SeriesType);
            }
        }
    }
    _createArgumentFormat() {
        const argument = this.viewModel ? this.viewModel.Argument : undefined;
        let argumentAxisLabelFormat = undefined;
        if (argument && !this.isDiscreteArgument()) {
            argumentAxisLabelFormat = _formatter_1.convertToFormat(argument.AxisXLabelFormat);
            if (this._isNumericDataType(argument.Type)) {
                if (!argumentAxisLabelFormat || !argument.AxisXLabelFormat.NumericFormat) {
                    argumentAxisLabelFormat = this._getArgumentAutoFormat();
                }
                else if (argument.AxisXLabelFormat.NumericFormat.Unit == 'Auto') {
                    argumentAxisLabelFormat = Object.assign(Object.assign({}, this._getArgumentAutoFormat()), { format: argumentAxisLabelFormat.format });
                }
                argumentAxisLabelFormat.dateType = null;
            }
            if (argumentAxisLabelFormat) {
                argumentAxisLabelFormat.showTrailingZeros = false;
            }
        }
        else {
            argumentAxisLabelFormat = super._createArgumentFormat();
        }
        return argumentAxisLabelFormat;
    }
    showPointLabels(pointLabelInfo) {
        return false;
    }
    getArgumentBindingValue(argumentPoint, pointIndex) {
        return argumentPoint.getValue();
    }
}
exports.rangeFilterDataController = rangeFilterDataController;
