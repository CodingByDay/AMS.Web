﻿/**
* DevExpress Dashboard (_date-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DayOfWeekNumber } from '../../data/_formatter';
export declare function tryConvertToDateTime(value: any): any;
export declare function patchDateTime(storageDTO: any): void;
export declare function toStringArray(value: any): any;
export declare function toUtcDate(value: any): Date;
export declare function fromUtcDateToString(date: Date): string;
export declare function serializeDate(date: Date): string;
export declare function clone(date: Date): Date;
export declare function addDays(date: Date, days: number): void;
export declare type CalendarWeekRule = 'FirstDay' | 'FirstFullWeek' | 'FirstFourDayWeek';
export declare function getIsStartOfFirstWeek(calendarWeekRule: CalendarWeekRule): {
    (date: any): boolean;
};
export declare function divideIntoWeeks(start: Date, end: Date, firstDayOfWeek: DayOfWeekNumber, calendarWeekRule: CalendarWeekRule, add: {
    (date: Date): void;
}): void;
export declare function getStartOfFirstWeek(year: number, firstDayOfWeek: DayOfWeekNumber, calendarWeekRule: CalendarWeekRule): Date;
