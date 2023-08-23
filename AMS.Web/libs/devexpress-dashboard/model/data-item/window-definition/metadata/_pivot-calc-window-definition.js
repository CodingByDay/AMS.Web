﻿/**
* DevExpress Dashboard (_pivot-calc-window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pivotWindowDefinitionSerializationsInfo = exports.pivotDefinitionMode = void 0;
const _measure_calc_window_definition_1 = require("./_measure-calc-window-definition");
exports.pivotDefinitionMode = {
    propertyName: 'definitionMode', modelName: '@DefinitionMode', defaultVal: 'Columns', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Columns': 'DashboardStringId.PivotCalculationAlongColumns',
        'Rows': 'DashboardStringId.PivotCalculationAlongRows',
        'ColumnsAndRows': 'DashboardStringId.PivotCalculationAlongColumnsAndRows',
        'RowsAndColumns': 'DashboardStringId.PivotCalculationAlongRowsAndColumns',
        'GroupsInColumns': 'DashboardStringId.PivotCalculationAlongGroupsInColumns',
        'GroupsInRows': 'DashboardStringId.PivotCalculationAlongGroupsInRows',
        'GroupsInColumnsAndRows': 'DashboardStringId.PivotCalculationAlongGroupsInColumnsAndRows',
        'GroupsInRowsAndColumns': 'DashboardStringId.PivotCalculationAlongGroupsInRowsAndColumns'
    }
};
exports.pivotWindowDefinitionSerializationsInfo = _measure_calc_window_definition_1.measureCalculationWindowDefinitionSerializationsInfo.concat([exports.pivotDefinitionMode]);
