﻿/**
* DevExpress Dashboard (running-total-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RunningTotalCalculation = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calculation_1 = require("./measure-calculation");
const _running_total_calculation_1 = require("./metadata/_running-total-calculation");
class RunningTotalCalculation extends measure_calculation_1.MeasureCalculation {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    get name() {
        return 'DashboardWebStringId.Calculations.RunningTotal';
    }
    getInfo() {
        return _running_total_calculation_1.runningTotalCalculationSerializationsInfo;
    }
    _createInstance() {
        return new RunningTotalCalculation();
    }
    _getExpression(argument) {
        switch (this.summaryType()) {
            case 'Average':
                return `RunningAvg(${argument})`;
            case 'Count':
                return `RunningCount(${argument})`;
            case 'Max':
                return `RunningMax(${argument})`;
            case 'Min':
                return `RunningMin(${argument})`;
            case 'Sum':
                return `RunningSum(${argument})`;
            default:
                return `${this._getAggrName(this.summaryType())}(${argument}, First(), 0)`;
        }
    }
}
exports.RunningTotalCalculation = RunningTotalCalculation;
measure_calculation_1.calculationsTypesMap['RunningTotal'] = RunningTotalCalculation;
