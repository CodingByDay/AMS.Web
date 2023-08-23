﻿/**
* DevExpress Dashboard (difference-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DifferenceCalculation = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calculation_1 = require("./measure-calculation");
const _difference_calculation_1 = require("./metadata/_difference-calculation");
class DifferenceCalculation extends measure_calculation_1.MeasureCalculation {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    static getLookupShiftExpression(target) {
        switch (target) {
            case 'Previous':
                return '-1';
            case 'Next':
                return '1';
            case 'First':
                return 'First()';
            case 'Last':
                return 'First()';
            default:
                throw new Error('Unsupported Target');
        }
    }
    get name() {
        return 'DashboardWebStringId.Calculations.DifferenceCalculation';
    }
    get lookupShiftExpression() {
        return DifferenceCalculation.getLookupShiftExpression(this.target());
    }
    getInfo() {
        return _difference_calculation_1.differenceCalculationSerializationsInfo;
    }
    _createInstance() {
        return new DifferenceCalculation();
    }
    _getExpression(argument) {
        switch (this.differenceType()) {
            case 'Absolute':
                return `${argument} - Lookup(${argument}, ${this.lookupShiftExpression})`;
            case 'Percentage':
                return `ToDouble(${argument} - Lookup(${argument}, ${this.lookupShiftExpression})) / Lookup(${argument}, ${this.lookupShiftExpression})`;
            default:
                throw new Error('Unexpected DifferenceType');
        }
    }
}
exports.DifferenceCalculation = DifferenceCalculation;
measure_calculation_1.calculationsTypesMap['DifferenceCalculation'] = DifferenceCalculation;
