﻿/**
* DevExpress Dashboard (measure-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculationsTypesMap = exports.MeasureCalculation = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _measure_calculation_1 = require("./metadata/_measure-calculation");
class MeasureCalculation extends serializable_model_1.SerializableModel {
    static _getWindowAggrFunction(summaryType) {
        switch (summaryType) {
            case 'Sum':
                return 'WindowSum';
            case 'Average':
                return 'WindowAvg';
            case 'Count':
                return 'WindowCount';
            case 'CountDistinct':
                return 'WindowCountDistinct';
            case 'Max':
                return 'WindowMax';
            case 'Median':
                return 'WindowMedian';
            case 'Mode':
                return 'WindowMode';
            case 'Min':
                return 'WindowMin';
            case 'StdDev':
                return 'WindowStdDev';
            case 'StdDevp':
                return 'WindowStdDevp';
            case 'Var':
                return 'WindowVar';
            case 'Varp':
                return 'WindowVarp';
            default:
                throw new Error('WindowAggrFunction: Unsupported SummaryType');
        }
    }
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson || {}, serializer);
    }
    getInfo() {
        return _measure_calculation_1.measureCalculationSerializationsInfo;
    }
    _getAggrName(summaryType) {
        return MeasureCalculation._getWindowAggrFunction(summaryType);
    }
}
exports.MeasureCalculation = MeasureCalculation;
exports.calculationsTypesMap = {};
