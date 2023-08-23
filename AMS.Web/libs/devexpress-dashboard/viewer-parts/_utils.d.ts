/**
* DevExpress Dashboard (_utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DateTimeGroupInterval } from '../model';
export declare type CalendarZoomLevel = 'century' | 'decade' | 'month' | 'year';
export declare class CalendarHelper {
    static getCalendarMaxZoomLevel(groupInterval: DateTimeGroupInterval): CalendarZoomLevel;
    static getCalendarType(groupInterval: DateTimeGroupInterval): 'date' | 'datetime' | 'time';
}
