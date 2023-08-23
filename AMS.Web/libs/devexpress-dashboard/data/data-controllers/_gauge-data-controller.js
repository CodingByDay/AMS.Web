﻿/**
* DevExpress Dashboard (_gauge-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaugeDataController = void 0;
const _gauge_range_calculator_1 = require("../_gauge-range-calculator");
const _utils_1 = require("../_utils");
const _kpi_data_controller_1 = require("./_kpi-data-controller");
class gaugeDataController extends _kpi_data_controller_1.kpiDataController {
    constructor(options) {
        super(options);
        this._gaugeRanges = {};
    }
    _iterateKpiItems(delegate) {
        var that = this;
        if (that.viewModel) {
            that.viewModel.Gauges.forEach(gauge => {
                delegate(gauge);
            });
        }
    }
    _getGaugeRange(element) {
        var elementId = element.ID, range = this._gaugeRanges[elementId], calculator;
        if (!range) {
            calculator = new _gauge_range_calculator_1.gaugeRangeCalculator({
                values: this._getGaugeValues(element),
                gaugeModel: {
                    Type: this._gaugeViewType,
                    MinValue: element.MinValue,
                    MaxValue: element.MaxValue
                }
            });
            range = calculator.getGaugeRange();
            this._gaugeRanges[elementId] = range;
        }
        return range;
    }
    _getGaugeValues(element) {
        var multiData = this.multiData, gaugeValues = [], axisPoints = this._axisPoints || [null], getMeasureValue = function (axisPoint) {
            var getMeasure = axisPoint ? multiData.getMeasureValueByAxisPoints : multiData.getMeasureValue;
            gaugeValues.push(getMeasure.call(multiData, element.ID, [axisPoint]).getValue());
        }, getDeltaValue = function (axisPoint) {
            var getDelta = axisPoint ? multiData.getDeltaValueByAxisPoints : multiData.getDeltaValue, deltaValue = getDelta.call(multiData, element.ID, [axisPoint]), actualValue = deltaValue.getActualValue(), targetValue = deltaValue.getTargetValue();
            gaugeValues.push(actualValue.getValue());
            gaugeValues.push(targetValue.getValue());
        }, getter = element.DataItemType === _utils_1.KpiValueMode.Measure ? getMeasureValue : getDeltaValue;
        axisPoints.forEach(axisPoint => {
            getter(axisPoint);
        });
        return gaugeValues;
    }
    _initialize() {
        super._initialize();
        this._gaugeViewType = this.viewModel ? this.viewModel.ViewType : undefined;
    }
}
exports.gaugeDataController = gaugeDataController;
