﻿/**
* DevExpress Dashboard (_helpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummaryExpression = exports.getDimensionExpression = void 0;
function getDimensionExpression(dataMember, gateTimeGroupInterval, textGroupInterval, fieldType) {
    let operand = `[${dataMember}]`;
    switch (fieldType) {
        case 'DateTime':
            switch (gateTimeGroupInterval) {
                case 'None':
                    return operand;
                case 'DayMonthYear':
                    return `GetDate(${operand})`;
                case 'Day':
                    return `GetDay(${operand})`;
                case 'DayOfWeek':
                    return `GetDayOfWeek(${operand})`;
                case 'DayOfYear':
                    return `GetDayOfYear(${operand})`;
                case 'DateHour':
                    return `GetDateHour(${operand})`;
                case 'DateHourMinute':
                    return `GetDateHourMinute(${operand})`;
                case 'DateHourMinuteSecond':
                    return `GetDateHourMinuteSecond(${operand})`;
                case 'Month':
                    return `GetMonth(${operand})`;
                case 'MonthYear':
                    return `GetDateMonthYear(${operand})`;
                case 'Quarter':
                    return `GetQuarter(${operand})`;
                case 'QuarterYear':
                    return `GetDateQuarterYear(${operand})`;
                case 'WeekOfMonth':
                    return `GetWeekOfMonth(${operand})`;
                case 'WeekOfYear':
                    return `GetWeekOfYear(${operand})`;
                case 'WeekYear':
                    return `GetDateWeekYear(${operand})`;
                case 'Year':
                    return `GetYear(${operand})`;
                case 'Hour':
                    return `GetHour(${operand})`;
                case 'Minute':
                    return `GetMinute(${operand})`;
                case 'Second':
                    return `GetSecond(${operand})`;
            }
        case 'Text':
            switch (textGroupInterval) {
                case 'Alphabetical':
                    return `Substring(${operand}, 0, 1)`;
            }
    }
    return operand;
}
exports.getDimensionExpression = getDimensionExpression;
function getSummaryExpression(dataMember, summaryType) {
    var operand = `[${dataMember}]`;
    switch (summaryType) {
        case 'Average':
            return `Avg(${operand})`;
        case 'Count':
            return `CountNotNull(${operand})`;
        case 'CountDistinct':
            return `CountDistinct(${operand})`;
        case 'Max':
            return `Max(${operand})`;
        case 'Median':
            return `Median(${operand})`;
        case 'Mode':
            return `Mode(${operand})`;
        case 'Min':
            return `Min(${operand})`;
        case 'StdDev':
            return `StdDev(${operand})`;
        case 'StdDevp':
            return `StdDevp(${operand})`;
        case 'Sum':
            return `Sum(${operand})`;
        case 'Var':
            return `Var(${operand})`;
        case 'Varp':
            return `Varp(${operand})`;
    }
    throw new Error(`Summary expression cannot be determined for the ${summaryType} summary type.`);
}
exports.getSummaryExpression = getSummaryExpression;
