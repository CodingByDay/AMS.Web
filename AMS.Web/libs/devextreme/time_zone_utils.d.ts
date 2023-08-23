/**
* DevExtreme (time_zone_utils.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * A time zone object.
 */
export interface dxSchedulerTimeZone {
    /**
     * A time zone text string from the IANA database.
     */
    id: string;
    /**
     * A GMT offset.
     */
    offset: number;
    /**
     * A time zone in the following format: `(GMT ±[hh]:[mm]) [id]`.
     */
    title: string;
}

/**
 * Gets the list of IANA time zone objects.
 */
export function getTimeZones(date?: Date): Array<dxSchedulerTimeZone>;
