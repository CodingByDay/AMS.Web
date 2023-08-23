﻿/**
* DevExpress Dashboard (_period-limit.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedDateTimePeriodLimitSerializationsInfo = exports.date = exports.flowDateTimePeriodLimitSerializationsInfo = exports.offset = exports.interval = exports.convertDateTimeGroupInterval = exports.flowIntervalValues = exports.flowIntervalOrderedValues = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.flowIntervalOrderedValues = ['Year', 'Quarter', 'Month', 'Week', 'Day', 'Hour', 'Minute', 'Second'];
exports.flowIntervalValues = {
    'Year': 'DashboardStringId.DateTimeIntervalYear',
    'Quarter': 'DashboardStringId.DateTimeIntervalQuarter',
    'Month': 'DashboardStringId.DateTimeIntervalMonth',
    'Week': 'DashboardStringId.DateTimeIntervalWeek',
    'Day': 'DashboardStringId.DateTimeIntervalDay',
    'Hour': 'DashboardStringId.DateTimeIntervalHour',
    'Minute': 'DashboardStringId.DateTimeIntervalMinute',
    'Second': 'DashboardStringId.DateTimeIntervalSecond'
};
function convertDateTimeGroupInterval(groupInterval) {
    var map = {
        'Year': 'Year',
        'QuarterYear': 'Quarter',
        'MonthYear': 'Month',
        'DayMonthYear': 'Day',
        'DateHour': 'Hour',
        'DateHourMinute': 'Minute',
        'DateHourMinuteSecond': 'Second',
        'None': 'Second'
    };
    var dateTimeInterval = map[groupInterval];
    if (!dateTimeInterval) {
        throw Error('Argument exception');
    }
    return dateTimeInterval;
}
exports.convertDateTimeGroupInterval = convertDateTimeGroupInterval;
exports.interval = { propertyName: 'interval', modelName: '@Interval', defaultVal: 'Year' };
exports.offset = { propertyName: 'offset', modelName: '@Offset', defaultVal: 0, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.flowDateTimePeriodLimitSerializationsInfo = [exports.interval, exports.offset];
exports.date = { propertyName: 'date', modelName: '@Date', defaultVal: _base_metadata_1.fromDateToString(new Date()), from: _base_metadata_1.fromStringToDate, toJsonObject: _base_metadata_1.fromDateToString, simpleFormAdapterItem: 'dateBoxEditor' };
exports.fixedDateTimePeriodLimitSerializationsInfo = [exports.date];
