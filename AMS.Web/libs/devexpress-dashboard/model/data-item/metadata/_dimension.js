﻿/**
* DevExpress Dashboard (_dimension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dimensionItemSerializationsInfo = exports.topNOptionsSerializationsInfo = exports.topNOptionsShowOthers = exports.topNOptionsMeasure = exports.topNOptionsCount = exports.topNOptionsMode = exports.topNOptionsModeValues = exports.topNOptionsEnabled = exports.realSortMode = exports.sortMeasure = exports.coloringMode = exports.groupChildValues = exports.isDiscreteNumericScale = exports.textGroupInterval = exports.sortMode = exports.sortOrderNonOlap = exports.sortOrderOlap = exports.sortOrderBase = exports.rangeDateTimeGroupInterval = exports.dateTimeGroupInterval = exports.dimensionGroupIndex = exports.dateTimeGroupIntervalsDict = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _data_item_1 = require("./_data-item");
exports.dateTimeGroupIntervalsDict = {
    'Year': 'DashboardStringId.DateTimeGroupIntervalYear',
    'Quarter': 'DashboardStringId.DateTimeGroupIntervalQuarter',
    'Month': 'DashboardStringId.DateTimeGroupIntervalMonth',
    'Day': 'DashboardStringId.DateTimeGroupIntervalDay',
    'Hour': 'DashboardStringId.DateTimeGroupIntervalHour',
    'Minute': 'DashboardStringId.DateTimeGroupIntervalMinute',
    'Second': 'DashboardStringId.DateTimeGroupIntervalSecond',
    'DayOfYear': 'DashboardStringId.DateTimeGroupIntervalDayOfYear',
    'DayOfWeek': 'DashboardStringId.DateTimeGroupIntervalDayOfWeek',
    'WeekOfYear': 'DashboardStringId.DateTimeGroupIntervalWeekOfYear',
    'WeekOfMonth': 'DashboardStringId.DateTimeGroupIntervalWeekOfMonth',
    'QuarterYear': 'DashboardStringId.DateTimeGroupIntervalQuarterYear',
    'MonthYear': 'DashboardStringId.DateTimeGroupIntervalMonthYear',
    'WeekYear': 'DashboardStringId.DateTimeGroupIntervalWeekYear',
    'DayMonthYear': 'DashboardStringId.DateTimeGroupIntervalDayMonthYear',
    'DateHour': 'DashboardStringId.DateTimeGroupIntervalDateHour',
    'DateHourMinute': 'DashboardStringId.DateTimeGroupIntervalDateHourMinute',
    'DateHourMinuteSecond': 'DashboardStringId.DateTimeGroupIntervalDateHourMinuteSecond',
    'None': 'DashboardStringId.DateTimeGroupIntervalExactDate'
};
exports.dimensionGroupIndex = { propertyName: 'groupIndex', modelName: '@GroupIndex' };
exports.dateTimeGroupInterval = {
    propertyName: 'dateTimeGroupInterval', modelName: '@DateTimeGroupInterval', displayName: 'DashboardWebStringId.Dimension.GroupInterval', defaultVal: 'Year', simpleFormAdapterItem: 'selectBoxEditor', values: exports.dateTimeGroupIntervalsDict
};
exports.rangeDateTimeGroupInterval = {
    propertyName: 'dateTimeGroupInterval', modelName: '@DateTimeGroupInterval', displayName: 'DashboardWebStringId.Dimension.GroupInterval', defaultVal: 'Year', simpleFormAdapterItem: 'selectBoxEditor', values: {
        'Year': 'DashboardStringId.DateTimeGroupIntervalYear',
        'QuarterYear': 'DashboardStringId.DateTimeGroupIntervalQuarterYear',
        'MonthYear': 'DashboardStringId.DateTimeGroupIntervalMonthYear',
        'DayMonthYear': 'DashboardStringId.DateTimeGroupIntervalDayMonthYear',
        'DateHour': 'DashboardStringId.DateTimeGroupIntervalDateHour',
        'DateHourMinute': 'DashboardStringId.DateTimeGroupIntervalDateHourMinute',
        'DateHourMinuteSecond': 'DashboardStringId.DateTimeGroupIntervalDateHourMinuteSecond',
        'None': 'DashboardStringId.DateTimeGroupIntervalExactDate'
    }
};
exports.sortOrderBase = {
    propertyName: 'sortOrder', modelName: '@SortOrder', displayName: 'DevExpress.DashboardCommon.DynamicListLookUpSettings.SortOrder', defaultVal: 'Ascending', simpleFormAdapterItem: 'buttonGroupEditor'
};
exports.sortOrderOlap = Object.assign({ values: {
        'Ascending': 'DevExpress.DashboardCommon.DimensionSortOrder.Ascending',
        'Descending': 'DevExpress.DashboardCommon.DimensionSortOrder.Descending',
        'None': 'DevExpress.DashboardCommon.DimensionSortOrder.None'
    } }, exports.sortOrderBase);
exports.sortOrderNonOlap = Object.assign({ values: {
        'Ascending': 'DevExpress.DashboardCommon.DimensionSortOrder.Ascending',
        'Descending': 'DevExpress.DashboardCommon.DimensionSortOrder.Descending'
    } }, exports.sortOrderBase);
exports.sortMode = {
    propertyName: 'sortMode', modelName: '@SortMode', displayName: 'DashboardWebStringId.Dimension.SortMode', defaultVal: 'Value', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'DisplayText': 'DashboardStringId.CommandDimensionSortModeDisplayText',
        'Value': 'DashboardStringId.CommandDimensionSortModeValue',
        'ID': 'DashboardStringId.CommandDimensionSortModeID',
        'Key': 'DashboardStringId.CommandDimensionSortModeKey'
    }
};
exports.textGroupInterval = {
    propertyName: 'textGroupInterval', modelName: '@TextGroupInterval', displayName: 'DashboardWebStringId.Dimension.GroupInterval', defaultVal: 'None', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'None': 'DashboardStringId.GroupIntervalNone',
        'Alphabetical': 'DashboardStringId.TextGroupIntervalAlphabetical'
    }
};
exports.isDiscreteNumericScale = { propertyName: 'isDiscreteNumericScale', modelName: '@IsDiscreteScale', displayName: 'DashboardWebStringId.Dialog.ArgumentMode', defaultVal: false, simpleFormAdapterItem: 'discreteContinuousButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.groupChildValues = { propertyName: 'groupChildValues', modelName: '@GroupChildValues', displayName: 'DashboardStringId.CommandDimensionGroupChildValues', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.coloringMode = {
    propertyName: 'coloringMode', modelName: '@ColoringMode', displayName: 'DashboardWebStringId.ColoringOptions', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardWebStringId.ColoringModeAuto',
        'None': 'DashboardWebStringId.ColoringModeOff',
        'Hue': 'DashboardWebStringId.ColoringModeOn'
    }
};
exports.sortMeasure = { propertyName: 'sortMeasure', modelName: '@SortByMeasure', displayName: 'DashboardWebStringId.DimensionSortBy' };
exports.realSortMode = { propertyName: 'realSortMode', defaultVal: 'DXValue', displayName: 'DashboardWebStringId.DimensionSortBy', simpleFormAdapterItem: 'selectBoxEditor' };
exports.topNOptionsEnabled = { propertyName: 'topNOptionsEnabled', modelName: '@TopNEnabled', displayName: 'DashboardWebStringId.TopNEnabled', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.topNOptionsModeValues = {
    'Top': 'DashboardWebStringId.TopN.Top',
    'Bottom': 'DashboardWebStringId.TopN.Bottom'
};
exports.topNOptionsMode = {
    propertyName: 'topNOptionsMode', modelName: '@TopNMode', displayName: 'DashboardWebStringId.TopNMode', defaultVal: 'Top', simpleFormAdapterItem: 'buttonGroupEditor', values: exports.topNOptionsModeValues
};
exports.topNOptionsCount = { propertyName: 'topNOptionsCount', modelName: '@TopNCount', displayName: 'DashboardStringId.SummaryTypeCount', defaultVal: 5, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel, editorOptions: { min: 1 }, validateBeforeSet: true, validationRules: [_base_metadata_1.integerValidationRule] };
exports.topNOptionsMeasure = { propertyName: 'topNOptionsMeasureName', modelName: '@TopNMeasure', displayName: 'DashboardStringId.DescriptionItemMeasure', simpleFormAdapterItem: 'selectBoxEditor' };
exports.topNOptionsShowOthers = { propertyName: 'topNOptionsShowOthers', modelName: '@TopNShowOthers', displayName: 'DashboardWebStringId.ShowOthersValue', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.topNOptionsSerializationsInfo = [exports.topNOptionsEnabled, exports.topNOptionsMode, exports.topNOptionsCount, exports.topNOptionsMeasure, exports.topNOptionsShowOthers];
exports.dimensionItemSerializationsInfo = _data_item_1.dataItemSerializationsInfo
    .concat(exports.dimensionGroupIndex, exports.dateTimeGroupInterval, exports.sortOrderBase, exports.sortMeasure, exports.sortMode, exports.textGroupInterval, exports.isDiscreteNumericScale, exports.groupChildValues, exports.coloringMode)
    .concat(exports.topNOptionsSerializationsInfo);
