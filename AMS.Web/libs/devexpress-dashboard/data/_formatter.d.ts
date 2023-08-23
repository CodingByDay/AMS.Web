﻿/**
* DevExpress Dashboard (_formatter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataItemNumericFormatType, DataItemNumericUnit, DateFormat, DateTimeFormat, DateTimeGroupInterval, DayOfWeekFormat, ExactDateFormat, HourFormat, MonthFormat, QuarterFormat, YearFormat } from '../model/enums';
import { CalendarWeekRule } from '../model/internal/_date-utils';
export declare let defaultNumericFormat: NumericFormatInfo;
export declare let defaultPercentFormat: NumericFormatInfo;
export declare let defaultScientificFormat: NumericFormatInfo;
declare type DateFormatInfoType = 'abbr' | 'full' | 'long' | 'num' | 'short' | 'timeOnly';
export declare let _types: {
    [name: string]: DateFormatInfoType;
};
export declare function format(value: any, formatViewModel: ValueFormatViewModel): string;
export declare function formatByFormatInfo(value: any, formatInfo: NumericFormatInfo | DateTimeFormatInfo): any;
export declare function formatFilterValue(filterValue: any): any;
export declare function constructIntervalFilterText(rangeText: {
    left: string;
    right: string;
}): any;
export declare function formatNumeric(value: any, numericFormatViewModel: NumericFormatViewModel): string;
export declare function formatDateTime(value: any, dateFormatViewModel: DateTimeFormatViewModel): string;
export declare function formatObject(value: any): string;
export declare function formatPercentValue(value: any): string;
export declare function formatScientificAxisValue(value: any): string;
export declare function formatAxisValue(value: any, axisMin: any, axisMax: any): string;
export declare function getAxisFormat(axisMin: any, axisMax: any): NumericFormatInfo;
export declare function calculateUnitPower(axisMin: any, axisMax: any): 1 | 2 | 3 | 0;
export declare function calculatePrecision(axisMin: any, axisMax: any): number;
export declare function convertToFormat(formatViewModel: ValueFormatViewModel): NumericFormatInfo | DateTimeFormatInfo;
export declare function _convertToNumberFormat(numericFormatViewModel: NumericFormatViewModel): NumericFormatInfo;
export declare function _convertToDateFormat(dateFormatViewModel: DateTimeFormatViewModel): DateTimeFormatInfo;
export declare function _getSyntheticDateTimeGroupInterval(groupInterval: DateTimeGroupInterval, exactDateFormat: ExactDateFormat): DateTimeGroupInterval | 'DateYear';
export declare function _convertNumericFormat(formatType: DataItemNumericFormatType): NumericFormatInfoType;
export declare function _convertNumericUnit(numericUnit: DataItemNumericUnit): string | number;
export interface ValueFormatViewModel {
    NumericFormat?: NumericFormatViewModel;
    DateTimeFormat?: DateTimeFormatViewModel;
}
export interface NumericFormatViewModel {
    FormatType?: DataItemNumericFormatType;
    Unit?: DataItemNumericUnit;
    Currency?: string;
    IncludeGroupSeparator?: boolean;
    ForcePlusSign?: boolean;
    SignificantDigits?: number;
    Precision?: number;
    CustomFormatString?: string;
}
export interface DateTimeFormatViewModel {
    GroupInterval?: DateTimeGroupInterval;
    ExactDateFormat?: ExactDateFormat;
    DateFormat?: DateFormat;
    DateHourFormat?: DateTimeFormat;
    DateHourMinuteFormat?: DateTimeFormat;
    DateTimeFormat: DateTimeFormat;
    YearFormat: YearFormat;
    QuarterFormat?: QuarterFormat;
    MonthFormat?: MonthFormat;
    HourFormat?: HourFormat;
    DayOfWeekFormat?: DayOfWeekFormat;
    FirstDayOfWeek?: DayOfWeekNumber;
    CalendarWeekRule?: CalendarWeekRule;
}
export declare type DayOfWeekNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface NumericFormatInfo {
    format?: NumericFormatInfoType;
    precision?: number;
    currency?: string;
    includeGroupSeparator?: boolean;
    significantDigits?: number;
    unitPower?: string | number;
    plus?: boolean;
    showTrailingZeros?: boolean;
    type?: string;
    unlimitedIntegerDigits?: boolean;
    dateType?: DateFormatInfoType;
}
export declare type NumericFormatInfoType = 'fixedPoint' | 'currency' | 'exponential' | 'percent' | 'general';
export declare type DateTimeGroupIntervalCamelCase = 'year' | 'quarter' | 'month' | 'day' | 'hour' | 'minute' | 'second' | 'dayOfYear' | 'dayOfWeek' | 'weekOfYear' | 'weekOfMonth' | 'quarterYear' | 'monthYear' | 'weekYear' | 'dayMonthYear' | 'dateHour' | 'dateHourMinute' | 'dateHourMinuteSecond' | 'none';
export declare type DateTimeFormatInfoType = DateTimeGroupIntervalCamelCase | 'dateYear';
export interface DateTimeFormatInfo {
    [key: string]: any;
    format: DateTimeFormatInfoType;
    dateType: DateFormatInfoType;
    firstDayOfWeek?: DayOfWeekNumber;
    calendarWeekRule?: CalendarWeekRule;
}
export {};
