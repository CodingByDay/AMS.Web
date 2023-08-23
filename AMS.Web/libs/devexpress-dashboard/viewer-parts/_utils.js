﻿/**
* DevExpress Dashboard (_utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarHelper = void 0;
class CalendarHelper {
    static getCalendarMaxZoomLevel(groupInterval) {
        switch (groupInterval) {
            case 'Year':
                return 'decade';
            case 'QuarterYear':
            case 'MonthYear':
                return 'year';
            case 'WeekYear':
            case 'DayMonthYear':
            case 'DateHour':
            case 'DateHourMinute':
            case 'DateHourMinuteSecond':
            case 'None':
            default:
                return 'month';
        }
    }
    static getCalendarType(groupInterval) {
        switch (groupInterval) {
            case 'DateHour':
            case 'DateHourMinute':
            case 'DateHourMinuteSecond':
            case 'None':
                return 'datetime';
            case 'Year':
            case 'QuarterYear':
            case 'MonthYear':
            case 'WeekYear':
            case 'DayMonthYear':
            default:
                return 'date';
        }
    }
}
exports.CalendarHelper = CalendarHelper;
