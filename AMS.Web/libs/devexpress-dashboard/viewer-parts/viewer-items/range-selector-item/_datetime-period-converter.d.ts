﻿/**
* DevExpress Dashboard (_datetime-period-converter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DayOfWeekNumber } from '../../../data/_formatter';
import { DateTimeInterval } from '../../../model/enums';
export interface IRange {
    startValue: any;
    endValue: any;
}
export interface IEntireRange {
    minimum: any;
    maximum: any;
}
export interface IDateTimePeriod {
    Start: IDateTimePeriodLimit;
    End: IDateTimePeriodLimit;
}
export interface IDateTimePeriodLimit {
    Relative: boolean;
    Interval?: DateTimeInterval;
    Offset?: number;
    Date?: Date;
}
export declare class DateTimePeriodConverter {
    static toRange(period: IDateTimePeriod, firstDayOfWeek: DayOfWeekNumber): IRange;
    static _getDateTime(limit: IDateTimePeriodLimit, now: Date, firstDayOfWeek: DayOfWeekNumber): Date;
}
