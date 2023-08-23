﻿/**
* DevExpress Dashboard (_difference-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.differenceCalculationSerializationsInfo = exports.differenceType = exports.target = void 0;
const _measure_calculation_1 = require("./_measure-calculation");
exports.target = {
    propertyName: 'target', modelName: '@Target', displayName: 'DashboardStringId.TargetValueCaption', defaultVal: 'Previous', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Previous': 'DashboardStringId.DifferenceCalculationTargetPrevious',
        'Next': 'DashboardStringId.DifferenceCalculationTargetNext',
        'First': 'DashboardStringId.DifferenceCalculationTargetFirst',
        'Last': 'DashboardStringId.DifferenceCalculationTargetLast'
    }
};
exports.differenceType = {
    propertyName: 'differenceType', modelName: '@DifferenceType', displayName: 'DashboardWebStringId.Calculations.DifferenceType', defaultVal: 'Absolute', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Absolute': 'DashboardStringId.DeltaThresholdTypeAbsolute',
        'Percentage': 'DashboardStringId.DeltaThresholdTypePercent'
    }
};
exports.differenceCalculationSerializationsInfo = _measure_calculation_1.measureCalculationSerializationsInfo.concat([exports.target, exports.differenceType]);
