﻿/**
* DevExpress Dashboard (_grid-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridWindowDefinitionSerializationsInfo = exports.gridDefinitionMode = void 0;
const _measure_calc_window_definition_1 = require("./_measure-calc-window-definition");
exports.gridDefinitionMode = {
    propertyName: 'definitionMode', modelName: '@DefinitionMode', defaultVal: 'Rows', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Rows': 'DashboardStringId.GridCalculationAlongRows',
        'SparklineArgument': 'DashboardStringId.GridCalculationAlongSparklineArgument',
        'RowsAndSparklineArgument': 'DashboardStringId.GridCalculationAlongRowsAndSparklineArgument',
        'SparklineArgumentAndRows': 'DashboardStringId.GridCalculationAlongSparklineArgumentAndRows'
    }
};
exports.gridWindowDefinitionSerializationsInfo = _measure_calc_window_definition_1.measureCalculationWindowDefinitionSerializationsInfo.concat([exports.gridDefinitionMode]);
