﻿/**
* DevExpress Dashboard (_rank-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rankCalculationSerializationsInfo = exports.calculationRankOrder = exports.calculationRankType = void 0;
const _measure_calculation_1 = require("./_measure-calculation");
exports.calculationRankType = {
    propertyName: 'rankType', modelName: '@RankType', displayName: 'DashboardWebStringId.Calculations.RankType', defaultVal: 'Competition', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Unique': 'DashboardStringId.RankTypeUnique',
        'Competition': 'DashboardStringId.RankTypeCompetition',
        'Dense': 'DashboardStringId.RankTypeDense',
        'Modified': 'DashboardStringId.RankTypeModified',
        'Percentile': 'DashboardStringId.RankTypePercentile'
    }
};
exports.calculationRankOrder = {
    propertyName: 'rankOrder', modelName: '@RankOrder', displayName: 'DashboardWebStringId.Calculations.RankOrder', defaultVal: 'Ascending', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Ascending': 'DashboardStringId.RankOrderAscending',
        'Descending': 'DashboardStringId.RankOrderDescending'
    }
};
exports.rankCalculationSerializationsInfo = _measure_calculation_1.measureCalculationSerializationsInfo.concat([exports.calculationRankType, exports.calculationRankOrder]);
