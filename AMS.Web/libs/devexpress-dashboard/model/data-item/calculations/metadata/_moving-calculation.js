﻿/**
* DevExpress Dashboard (_moving-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movingCalculationSerializationsInfo = exports.nextValuesCount = exports.previousValuesCount = exports.summaryType = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _measure_calculation_1 = require("./_measure-calculation");
exports.summaryType = {
    propertyName: 'summaryType', modelName: '@SummaryType', displayName: 'DashboardWebStringId.SummaryType', defaultVal: 'Sum', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Count': 'DashboardStringId.SummaryTypeCount',
        'Sum': 'DashboardStringId.SummaryTypeSum',
        'Min': 'DashboardStringId.SummaryTypeMin',
        'Max': 'DashboardStringId.SummaryTypeMax',
        'Average': 'DashboardStringId.SummaryTypeAverage',
        'StdDev': 'DashboardStringId.SummaryTypeStdDev',
        'StdDevp': 'DashboardStringId.SummaryTypeStdDevp',
        'Var': 'DashboardStringId.SummaryTypeVar',
        'Varp': 'DashboardStringId.SummaryTypeVarp',
        'CountDistinct': 'DashboardStringId.SummaryTypeCountDistinct',
        'Median': 'DashboardStringId.SummaryTypeMedian',
        'Mode': 'DashboardStringId.SummaryTypeMode'
    }
};
exports.previousValuesCount = { propertyName: 'previousValuesCount', modelName: '@PreviousValuesCount', displayName: 'DashboardWebStringId.Calculations.PreviousValuesCount', defaultVal: 2, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.nextValuesCount = { propertyName: 'nextValuesCount', modelName: '@NextValuesCount', displayName: 'DashboardWebStringId.Calculations.NextValuesCount', defaultVal: 0, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.movingCalculationSerializationsInfo = _measure_calculation_1.measureCalculationSerializationsInfo.concat([exports.summaryType, exports.previousValuesCount, exports.nextValuesCount]);
