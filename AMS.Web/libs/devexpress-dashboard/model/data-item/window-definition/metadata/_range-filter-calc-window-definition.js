/**
* DevExpress Dashboard (_range-filter-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFilterWindowDefinitionSerializationsInfo = exports.rangeFilterDefinitionMode = void 0;
const _measure_calc_window_definition_1 = require("./_measure-calc-window-definition");
exports.rangeFilterDefinitionMode = {
    propertyName: 'definitionMode', modelName: '@DefinitionMode', defaultVal: 'Argument', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Argument': 'DashboardStringId.RangeFilterCalculationAlongArgument',
        'Series': 'DashboardStringId.RangeFilterCalculationAlongSeries',
        'ArgumentAndSeries': 'DashboardStringId.RangeFilterCalculationAlongArgumentAndSeries',
        'SeriesAndArgument': 'DashboardStringId.RangeFilterCalculationAlongSeriesAndArgument'
    }
};
exports.rangeFilterWindowDefinitionSerializationsInfo = _measure_calc_window_definition_1.measureCalculationWindowDefinitionSerializationsInfo.concat([exports.rangeFilterDefinitionMode]);
