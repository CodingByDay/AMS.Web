﻿/**
* DevExpress Dashboard (_chart-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartWindowDefinitionSerializationsInfo = exports.chartDefinitionMode = void 0;
const _measure_calc_window_definition_1 = require("./_measure-calc-window-definition");
exports.chartDefinitionMode = {
    propertyName: 'definitionMode', modelName: '@DefinitionMode', defaultVal: 'Arguments', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Arguments': 'DashboardStringId.ChartCalculationAlongArguments',
        'Series': 'DashboardStringId.ChartCalculationAlongSeries',
        'ArgumentsAndSeries': 'DashboardStringId.ChartCalculationAlongArgumentsAndSeries',
        'SeriesAndArguments': 'DashboardStringId.ChartCalculationAlongSeriesAndArguments'
    }
};
exports.chartWindowDefinitionSerializationsInfo = _measure_calc_window_definition_1.measureCalculationWindowDefinitionSerializationsInfo.concat([exports.chartDefinitionMode]);
