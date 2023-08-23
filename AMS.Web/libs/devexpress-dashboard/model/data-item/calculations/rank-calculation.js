﻿/**
* DevExpress Dashboard (rank-calculation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankCalculation = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const measure_calculation_1 = require("./measure-calculation");
const _rank_calculation_1 = require("./metadata/_rank-calculation");
class RankCalculation extends measure_calculation_1.MeasureCalculation {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    static _getRankFunction(rankType) {
        switch (rankType) {
            case 'Competition':
                return 'RankCompetition';
            case 'Unique':
                return 'RankUnique';
            case 'Dense':
                return 'RankDense';
            case 'Modified':
                return 'RankModified';
            case 'Percentile':
                return 'RankPercentile';
            default:
                throw new Error('Unsupported RankType');
        }
    }
    get name() {
        return 'DashboardWebStringId.Calculations.Rank';
    }
    getInfo() {
        return _rank_calculation_1.rankCalculationSerializationsInfo;
    }
    _createInstance() {
        return new RankCalculation();
    }
    _getExpression(argument) {
        var order = this.rankOrder() == 'Ascending' ? 'asc' : 'desc';
        return `${RankCalculation._getRankFunction(this.rankType())}(${argument}, '${order}')`;
    }
}
exports.RankCalculation = RankCalculation;
measure_calculation_1.calculationsTypesMap['Rank'] = RankCalculation;
