﻿/**
* DevExpress Dashboard (_format-condition-date-occuring.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionDateOccurringSerializationsInfo = exports.dateType = exports.extendedDateTypeValues = exports.baseDateTypeValues = void 0;
const ko = require("knockout");
const _common_1 = require("../../../../data/_common");
const enums_1 = require("../../../enums");
const _format_condition_style_base_1 = require("./_format-condition-style-base");
let parseFilterDateType = (typeModel) => {
    return _common_1.parseFlagsEnumType(typeModel, enums_1.FilterDateType.None, FilterDateTypeDictionary);
};
let serializeFilterDateType = (val) => {
    return _common_1.serializeFlagsEnumType(val, 'None', FilterDateTypeDictionary);
};
let getFilterDateTypeValues = (val) => {
    return _common_1.getFlagsEnumTypeValues(val, FilterDateTypeDictionary, 'key');
};
let FilterDateTypeDictionary = {
    'BeyondThisYear': enums_1.FilterDateType.BeyondThisYear,
    'LaterThisYear': enums_1.FilterDateType.LaterThisYear,
    'LaterThisMonth': enums_1.FilterDateType.LaterThisMonth,
    'LaterThisWeek': enums_1.FilterDateType.LaterThisWeek,
    'NextWeek': enums_1.FilterDateType.NextWeek,
    'Tomorrow': enums_1.FilterDateType.Tomorrow,
    'Today': enums_1.FilterDateType.Today,
    'Yesterday': enums_1.FilterDateType.Yesterday,
    'EarlierThisWeek': enums_1.FilterDateType.EarlierThisWeek,
    'LastWeek': enums_1.FilterDateType.LastWeek,
    'EarlierThisMonth': enums_1.FilterDateType.EarlierThisMonth,
    'EarlierThisYear': enums_1.FilterDateType.EarlierThisYear,
    'PriorThisYear': enums_1.FilterDateType.PriorThisYear,
    'Empty': enums_1.FilterDateType.Empty,
    'Beyond': enums_1.FilterDateType.Beyond,
    'ThisWeek': enums_1.FilterDateType.ThisWeek,
    'ThisMonth': enums_1.FilterDateType.ThisMonth,
    'MonthAfter1': enums_1.FilterDateType.MonthAfter1,
    'MonthAfter2': enums_1.FilterDateType.MonthAfter2,
    'MonthAgo1': enums_1.FilterDateType.MonthAgo1,
    'MonthAgo2': enums_1.FilterDateType.MonthAgo2,
    'MonthAgo3': enums_1.FilterDateType.MonthAgo3,
    'MonthAgo4': enums_1.FilterDateType.MonthAgo4,
    'MonthAgo5': enums_1.FilterDateType.MonthAgo5,
    'MonthAgo6': enums_1.FilterDateType.MonthAgo6,
    'Earlier': enums_1.FilterDateType.Earlier
};
exports.baseDateTypeValues = [
    { value: enums_1.FilterDateType.Yesterday, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringYesterday' },
    { value: enums_1.FilterDateType.Today, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringToday' },
    { value: enums_1.FilterDateType.Tomorrow, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringTomorrow' },
    { value: enums_1.FilterDateType.LastWeek, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringLastWeek' },
    { value: enums_1.FilterDateType.ThisWeek, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringThisWeek' },
    { value: enums_1.FilterDateType.NextWeek, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringNextWeek' },
    { value: enums_1.FilterDateType.MonthAgo1, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAgo1' },
    { value: enums_1.FilterDateType.ThisMonth, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringThisMonth' },
    { value: enums_1.FilterDateType.MonthAfter1, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAfter1' }
];
exports.extendedDateTypeValues = [
    { value: enums_1.FilterDateType.BeyondThisYear, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringBeyondThisYear' },
    { value: enums_1.FilterDateType.LaterThisYear, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringLaterThisYear' },
    { value: enums_1.FilterDateType.LaterThisMonth, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringLaterThisMonth' },
    { value: enums_1.FilterDateType.LaterThisWeek, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringLaterThisWeek' },
    { value: enums_1.FilterDateType.EarlierThisWeek, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringEarlierThisWeek' },
    { value: enums_1.FilterDateType.EarlierThisMonth, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringEarlierThisMonth' },
    { value: enums_1.FilterDateType.EarlierThisYear, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringEarlierThisYear' },
    { value: enums_1.FilterDateType.PriorThisYear, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringPriorThisYear' },
    { value: enums_1.FilterDateType.Empty, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringEmpty' },
    { value: enums_1.FilterDateType.Beyond, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringBeyond' },
    { value: enums_1.FilterDateType.MonthAfter2, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAfter2' },
    { value: enums_1.FilterDateType.MonthAgo2, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAgo2' },
    { value: enums_1.FilterDateType.MonthAgo3, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAgo3' },
    { value: enums_1.FilterDateType.MonthAgo4, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAgo4' },
    { value: enums_1.FilterDateType.MonthAgo5, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAgo5' },
    { value: enums_1.FilterDateType.MonthAgo6, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringMonthAgo6' },
    { value: enums_1.FilterDateType.Earlier, displayValueId: 'DashboardWebStringId.ConditionalFormatting.DatesOccurringEarlier' }
];
exports.dateType = {
    propertyName: 'dateType', modelName: '@DateType', defaultVal: 'Yesterday',
    from: d => ko.observable(parseFilterDateType(d)), toJsonObject: serializeFilterDateType,
};
exports.formatConditionDateOccurringSerializationsInfo = _format_condition_style_base_1.formatConditionStyleBaseSerializationsInfo.concat([exports.dateType]);
