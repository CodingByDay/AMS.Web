﻿/**
* DevExpress Dashboard (_measure.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.measureItemSerializationsInfo = exports.measureFilterString = exports.calculations = exports.expression = exports.windowDefinition = exports.calculation = exports.summaryTypeNonNumericToString = exports.summaryTypeNonNumericToNumeric = exports.summaryTypeAttribute = exports.summaryTypeNumericToAny = exports.summaryTypeTemplate = exports.summaryTypeDict = void 0;
const calculation_1 = require("../calculations/calculation");
const window_definition_1 = require("../window-definition/window-definition");
const _data_item_1 = require("./_data-item");
exports.summaryTypeDict = {
    'Count': 'DashboardStringId.SummaryTypeCount',
    'CountDistinct': 'DashboardStringId.SummaryTypeCountDistinct',
    'Sum': 'DashboardStringId.SummaryTypeSum',
    'Min': 'DashboardStringId.SummaryTypeMin',
    'Max': 'DashboardStringId.SummaryTypeMax',
    'Average': 'DashboardStringId.SummaryTypeAverage',
    'StdDev': 'DashboardStringId.SummaryTypeStdDev',
    'StdDevp': 'DashboardStringId.SummaryTypeStdDevp',
    'Var': 'DashboardStringId.SummaryTypeVar',
    'Varp': 'DashboardStringId.SummaryTypeVarp',
    'Median': 'DashboardStringId.SummaryTypeMedian',
    'Mode': 'DashboardStringId.SummaryTypeMode'
};
exports.summaryTypeTemplate = {
    propertyName: 'summaryType', modelName: '@SummaryType', displayName: 'DashboardWebStringId.SummaryType'
};
exports.summaryTypeNumericToAny = Object.assign({ defaultVal: 'Sum', simpleFormAdapterItem: 'selectBoxEditor', values: exports.summaryTypeDict }, exports.summaryTypeTemplate);
exports.summaryTypeAttribute = Object.assign({ defaultVal: 'Min', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'Min': 'DashboardStringId.SummaryTypeMin'
    } }, exports.summaryTypeTemplate);
exports.summaryTypeNonNumericToNumeric = Object.assign({ defaultVal: 'Count', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'Count': 'DashboardStringId.SummaryTypeCount',
        'CountDistinct': 'DashboardStringId.SummaryTypeCountDistinct'
    } }, exports.summaryTypeTemplate);
exports.summaryTypeNonNumericToString = Object.assign({ defaultVal: 'Count', simpleFormAdapterItem: 'selectBoxEditor', values: {
        'Count': 'DashboardStringId.SummaryTypeCount',
        'CountDistinct': 'DashboardStringId.SummaryTypeCountDistinct',
        'Min': 'DashboardStringId.SummaryTypeMin',
        'Max': 'DashboardStringId.SummaryTypeMax',
        'Mode': 'DashboardStringId.SummaryTypeMode'
    } }, exports.summaryTypeTemplate);
exports.calculation = { propertyName: 'calculation', modelName: 'Calculation', type: calculation_1.Calculation };
exports.windowDefinition = { propertyName: 'windowDefinition', modelName: 'WindowDefinition', type: window_definition_1.WindowDefinition, displayName: 'DashboardWebStringId.Calculations.WindowDefinition' };
exports.expression = { propertyName: 'expression', modelName: '@Expression' };
exports.calculations = { propertyName: 'calculations' };
exports.measureFilterString = { propertyName: 'filterString', modelName: '@FilterString' };
exports.measureItemSerializationsInfo = _data_item_1.dataItemSerializationsInfo.concat(exports.summaryTypeNumericToAny, exports.calculation, exports.windowDefinition, exports.expression, exports.measureFilterString);
