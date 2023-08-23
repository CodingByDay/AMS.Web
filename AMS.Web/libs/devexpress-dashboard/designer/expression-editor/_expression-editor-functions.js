﻿/**
* DevExpress Dashboard (_expression-editor-functions.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpressionEditorFunctions = exports.ExpressionEditorFunctions = void 0;
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
var windowFunctions = {
    display: 'Window Functions',
    localizationId: 'DashboardStringId.FunctionCategoryWindow',
    items: {
        First: [{
                paramCount: 1,
                text: 'First()',
                displayName: 'First()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionFirst'
            }],
        Last: [{
                paramCount: 1,
                text: 'Last()',
                displayName: 'Last()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionLast'
            }],
        Index: [{
                paramCount: 1,
                text: 'Index()',
                displayName: 'Index()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionIndex'
            }],
        Size: [{
                paramCount: 1,
                text: 'Size()',
                displayName: 'Size()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionSize'
            }],
        Lookup: [{
                paramCount: 2,
                text: 'Lookup(, )',
                displayName: 'Lookup(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionLookup'
            }],
        RankCompetition: [{
                paramCount: 2,
                text: 'RankCompetition(, )',
                displayName: 'RankCompetition(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRankCompetition'
            }],
        RankDense: [{
                paramCount: 2,
                text: 'RankDense(, )',
                displayName: 'RankDense(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRankDense'
            }],
        RankUnique: [{
                paramCount: 2,
                text: 'RankUnique(, )',
                displayName: 'RankUnique(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRankUnique'
            }],
        RankModified: [{
                paramCount: 2,
                text: 'RankModified(, )',
                displayName: 'RankModified(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRankModified'
            }],
        RankPercentile: [{
                paramCount: 2,
                text: 'RankPercentile(, )',
                displayName: 'RankPercentile(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRankPercentile'
            }],
        RunningAggregate: [{
                paramCount: 2,
                text: 'RunningAggregate(, )',
                displayName: 'RunningAggregate(, )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRunningCustomAggregate'
            }],
        RunningAvg: [{
                paramCount: 1,
                text: 'RunningAvg()',
                displayName: 'RunningAvg()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRunningAvg'
            }],
        RunningCount: [{
                paramCount: 1,
                text: 'RunningCount()',
                displayName: 'RunningCount()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRunningCount'
            }],
        RunningMax: [{
                paramCount: 1,
                text: 'RunningMax()',
                displayName: 'RunningMax()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRunningMax'
            }],
        RunningMin: [{
                paramCount: 1,
                text: 'RunningMin()',
                displayName: 'RunningMin()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRunningMin'
            }],
        RunningSum: [{
                paramCount: 1,
                text: 'RunningSum()',
                displayName: 'RunningSum()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionRunningSum'
            }],
        WindowAggregate: [{
                paramCount: 4,
                text: 'WindowAggregate(, , , )',
                displayName: 'WindowAggregate(, , , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowCustomAggregate'
            }],
        WindowAvg: [{
                paramCount: 3,
                text: 'WindowAvg(, , )',
                displayName: 'WindowAvg(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowAvg'
            }],
        WindowCount: [{
                paramCount: 3,
                text: 'WindowCount(, , )',
                displayName: 'WindowCount(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowCount'
            }],
        WindowCountDistinct: [{
                paramCount: 3,
                text: 'WindowCountDistinct(, , )',
                displayName: 'WindowCountDistinct(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowCountDistinct'
            }],
        WindowMax: [{
                paramCount: 3,
                text: 'WindowMax(, , )',
                displayName: 'WindowMax(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowMax'
            }],
        WindowMin: [{
                paramCount: 3,
                text: 'WindowMin(, , )',
                displayName: 'WindowMin(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowMin'
            }],
        WindowSum: [{
                paramCount: 3,
                text: 'WindowSum(, , )',
                displayName: 'WindowSum(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowSum'
            }],
        WindowMedian: [{
                paramCount: 3,
                text: 'WindowMedian(, , )',
                displayName: 'WindowMedian(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowMedian'
            }],
        WindowMode: [{
                paramCount: 3,
                text: 'WindowMode(, , )',
                displayName: 'WindowMode(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowMode'
            }],
        WindowVar: [{
                paramCount: 3,
                text: 'WindowVar(, , )',
                displayName: 'WindowVar(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowVar'
            }],
        WindowVarp: [{
                paramCount: 3,
                text: 'WindowVarp(, , )',
                displayName: 'WindowVarp(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowVarp'
            }],
        WindowStdDev: [{
                paramCount: 3,
                text: 'WindowStdDev(, , )',
                displayName: 'WindowStdDev(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowStdDev'
            }],
        WindowStdDevp: [{
                paramCount: 3,
                text: 'WindowStdDevp(, , )',
                displayName: 'WindowStdDevp(, , )',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowStdDevp'
            }],
        Total: [{
                paramCount: 0,
                text: 'Total()',
                displayName: 'Total()',
                descriptionStringId: 'DashboardStringId.FunctionDescriptionTotal'
            }]
    }
};
var dashboardAggrFunctions = {
    display: 'Aggregate',
    localizationId: 'DashboardStringId.FunctionCategoryAggregate',
    category: 'DashboardAggregate',
    items: {
        Avg: [{ paramCount: 1, text: 'Avg()', displayName: 'Avg()', descriptionStringId: 'XtraEditorsExpressionEditor.AvgAggregate.Description' }],
        Count: [{ paramCount: 1, text: 'Count()', displayName: 'Count()', descriptionStringId: 'XtraEditorsExpressionEditor.CountAggregate.Description' }],
        Max: [{ paramCount: 1, text: 'Max()', displayName: 'Max()', descriptionStringId: 'XtraEditorsExpressionEditor.MaxAggregate.Description' }],
        Min: [{ paramCount: 1, text: 'Min()', displayName: 'Min()', descriptionStringId: 'XtraEditorsExpressionEditor.MinAggregate.Description' }],
        Sum: [{ paramCount: 1, text: 'Sum()', displayName: 'Sum()', descriptionStringId: 'XtraEditorsExpressionEditor.SumAggregate.Description' }],
        CountNotNull: [{ paramCount: 1, text: 'CountNotNull()', displayName: 'CountNotNull()', descriptionStringId: 'DashboardStringId.AggregateExFunctionDescriptionCountNotNull' }],
        CountDistinct: [{ paramCount: 1, text: 'CountDistinct()', displayName: 'CountDistinct()', descriptionStringId: 'DashboardStringId.FunctionDescriptionCountDistinct' }],
        Median: [{ paramCount: 1, text: 'Median()', displayName: 'Median()', descriptionStringId: 'DashboardStringId.FunctionDescriptionMedian' }],
        Mode: [{ paramCount: 1, text: 'Mode()', displayName: 'Mode()', descriptionStringId: 'DashboardStringId.AggregateExFunctionDescriptionMode' }],
        StdDev: [{ paramCount: 1, text: 'StdDev()', displayName: 'StdDev()', descriptionStringId: 'DashboardStringId.FunctionDescriptionStdDev' }],
        StdDevp: [{ paramCount: 1, text: 'StdDevp()', displayName: 'StdDevp()', descriptionStringId: 'DashboardStringId.FunctionDescriptionStdDevp' }],
        Var: [{ paramCount: 1, text: 'Var()', displayName: 'Var()', descriptionStringId: 'DashboardStringId.FunctionDescriptionVar' }],
        Varp: [{ paramCount: 1, text: 'Varp()', displayName: 'Varp()', descriptionStringId: 'DashboardStringId.FunctionDescriptionVarp' }]
    }
};
var dashboardAdvancedFunctions = {
    display: 'Advanced',
    localizationId: 'DashboardStringId.FunctionCategoryAdvanced',
    category: 'Advanced',
    items: {
        aggr: [{ paramCount: 1, text: 'aggr()', displayName: 'aggr()', descriptionStringId: 'DashboardStringId.FunctionDescriptionAggr' }],
        asc: [{ paramCount: 1, text: 'asc()', displayName: 'asc()', descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowDefinitionOrderAsc' }],
        desc: [{ paramCount: 1, text: 'desc()', displayName: 'desc()', descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowDefinitionOrderDesc' }],
        orderBy: [{ paramCount: 1, text: 'orderBy()', displayName: 'orderBy()', descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowDefinitionOrderBy' }],
        partitionBy: [{ paramCount: 1, text: 'partitionBy()', displayName: 'partitionBy()', descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowDefinitionPartitionBy' }],
        w: [{ paramCount: 3, text: 'w( , partitionBy(), orderBy() )', displayName: 'w()', descriptionStringId: 'DashboardStringId.FunctionDescriptionWindowDefinition' }],
        filter: [{ paramCount: 2, text: 'filter( , )', displayName: 'filter()', descriptionStringId: 'DashboardStringId.FunctionDescriptionAggregateFilter' }],
        joinRule: [{ paramCount: 2, text: 'joinRule()', displayName: 'joinRule()', descriptionStringId: 'DashboardStringId.FunctionDescriptionAggrJoinRule' }]
    }
};
var dashboardAdditionalFunctions = {
    'Date-Time': {
        GetDateHour: [{ paramCount: 1, text: 'GetDateHour()', displayName: 'GetDateHour()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetDateHour' }],
        GetDateHourMinute: [{ paramCount: 1, text: 'GetDateHourMinute()', displayName: 'GetDateHourMinute()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetDateHourMinute' }],
        GetDateHourMinuteSecond: [{ paramCount: 1, text: 'GetDateHourMinuteSecond()', displayName: 'GetDateHourMinuteSecond()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetDateHourMinuteSecond' }],
        GetDateMonthYear: [{ paramCount: 1, text: 'GetDateMonthYear()', displayName: 'GetDateMonthYear()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetDateMonthYear' }],
        GetDateWeekYear: [
            { paramCount: 1, text: 'GetDateWeekYear()', displayName: 'GetDateWeekYear()', descriptionStringId: 'DashboardStringId.FunctionDescriptionGetDateWeekYear' },
            { paramCount: 2, text: 'GetDateWeekYear(,)', displayName: 'GetDateWeekYear(,)', descriptionStringId: 'DashboardStringId.FunctionDescriptionGetDateWeekYear2' }
        ],
        GetDateQuarterYear: [{ paramCount: 1, text: 'GetDateQuarterYear()', displayName: 'GetDateQuarterYear()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetDateQuarterYear' }],
        GetQuarter: [{ paramCount: 1, text: 'GetQuarter()', displayName: 'GetQuarter()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetQuarter' }],
        GetWeekOfMonth: [{ paramCount: 1, text: 'GetWeekOfMonth()', displayName: 'GetWeekOfMonth()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetWeekOfMonth' }],
        GetWeekOfYear: [{ paramCount: 1, text: 'GetWeekOfYear()', displayName: 'GetWeekOfYear()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionGetWeekOfYear' }],
        ToDateTime: [{ paramCount: 1, text: 'ToDateTime()', displayName: 'ToDateTime()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionToDateTime' }],
        MakeDateTime: [
            { paramCount: 3, text: 'MakeDateTime(,,)', displayName: 'MakeDateTime(,,)', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionMakeDateTime3' },
            { paramCount: 4, text: 'MakeDateTime(,,,)', displayName: 'MakeDateTime(,,,)', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionMakeDateTime4' },
            { paramCount: 5, text: 'MakeDateTime(,,,,)', displayName: 'MakeDateTime(,,,,)', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionMakeDateTime5' },
            { paramCount: 6, text: 'MakeDateTime(,,,,,)', displayName: 'MakeDateTime(,,,,,)', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionMakeDateTime6' }
        ]
    },
    'Logical': {
        ToBoolean: [{ paramCount: 1, text: 'ToBoolean()', displayName: 'ToBoolean()', descriptionStringId: 'DashboardStringId.FunctionOperatorExFunctionDescriptionToBoolean' }]
    },
    'String': {
        Join: null
    }
};
class ExpressionEditorFunctions {
}
exports.ExpressionEditorFunctions = ExpressionEditorFunctions;
ExpressionEditorFunctions.customFunctions = [];
function getExpressionEditorFunctions() {
    return [dashboardAdvancedFunctions,
        dashboardAggrFunctions]
        .concat(analytics_widgets_internal_1.functionDisplay().filter(category => category.display !== 'Aggregate'))
        .map(functionCategory => {
        let category = functionCategory.display;
        if (dashboardAdditionalFunctions[category]) {
            var clone = Object.assign({}, functionCategory);
            clone.items = Object.assign(Object.assign({}, clone.items), dashboardAdditionalFunctions[category]);
            return clone;
        }
        else {
            return functionCategory;
        }
    })
        .concat([windowFunctions])
        .concat(ExpressionEditorFunctions.customFunctions);
}
exports.getExpressionEditorFunctions = getExpressionEditorFunctions;
