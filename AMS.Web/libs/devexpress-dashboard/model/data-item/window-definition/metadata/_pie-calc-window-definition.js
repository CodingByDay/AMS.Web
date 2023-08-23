﻿/**
* DevExpress Dashboard (_pie-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieWindowDefinitionSerializationsInfo = exports.pieDefinitionMode = void 0;
const _measure_calc_window_definition_1 = require("./_measure-calc-window-definition");
exports.pieDefinitionMode = {
    propertyName: 'definitionMode', modelName: '@DefinitionMode', defaultVal: 'Series', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Arguments': 'DashboardStringId.PieCalculationAlongArguments',
        'Series': 'DashboardStringId.PieCalculationAlongSeries',
        'ArgumentsAndSeries': 'DashboardStringId.PieCalculationAlongArgumentsAndSeries',
        'SeriesAndArguments': 'DashboardStringId.PieCalculationAlongSeriesAndArguments'
    }
};
exports.pieWindowDefinitionSerializationsInfo = _measure_calc_window_definition_1.measureCalculationWindowDefinitionSerializationsInfo.concat([exports.pieDefinitionMode]);
