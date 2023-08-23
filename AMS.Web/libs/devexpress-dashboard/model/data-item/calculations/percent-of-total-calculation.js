﻿/**
* DevExpress Dashboard (percent-of-total-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PercentOfTotalCalculation = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calculation_1 = require("./measure-calculation");
const _percent_of_total_calculation_1 = require("./metadata/_percent-of-total-calculation");
class PercentOfTotalCalculation extends measure_calculation_1.MeasureCalculation {
    get name() {
        return 'DashboardWebStringId.Calculations.PercentOfTotal';
    }
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _percent_of_total_calculation_1.percentOfTotalCalculationSerializationsInfo;
    }
    _createInstance() {
        return new PercentOfTotalCalculation();
    }
    _getExpression(argument) {
        return `ToDouble(${argument}) / Total(${argument})`;
    }
}
exports.PercentOfTotalCalculation = PercentOfTotalCalculation;
measure_calculation_1.calculationsTypesMap['PercentOfTotal'] = PercentOfTotalCalculation;
