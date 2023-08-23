/**
* DevExtreme (ui/calendar.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../core/element';

import {
    ChangedOptionInfo,
    EventInfo,
    InitializedEventInfo,
    NativeEventInfo,
} from '../events/index';

import {
    template,
} from '../core/templates/template';

import Editor, {
    ValueChangedInfo,
    EditorOptions,
} from './editor/editor';

import {
    FirstDayOfWeek,
} from '../common';

export {
    FirstDayOfWeek,
};

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface ComponentDisabledDate<T> {
    component: T;
    readonly date: Date;
    readonly view: string;
}

export type CalendarZoomLevel = 'century' | 'decade' | 'month' | 'year';

export type WeekNumberRule = 'auto' | 'firstDay' | 'fullWeek' | 'firstFourDays';

export type ContentReadyEvent = EventInfo<dxCalendar>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxCalendar>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxCalendar>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxCalendar> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxCalendar, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

export type CellTemplateData = {
    readonly date: Date;
    readonly view: string;
    readonly text?: string;
};

/**
 * 
 */
export type DisabledDate = ComponentDisabledDate<dxCalendar>;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxCalendarOptions extends EditorOptions<dxCalendar> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies a custom template for calendar cells.
     */
    cellTemplate?: template | ((itemData: CellTemplateData, itemIndex: number, itemElement: DxElement) => string | UserDefinedElement);
    /**
     * Specifies the date-time value serialization format. Use it only if you do not specify the value at design time.
     */
    dateSerializationFormat?: string;
    /**
     * Specifies dates that users cannot select.
     */
    disabledDates?: Array<Date> | ((data: DisabledDate) => boolean);
    /**
     * Specifies the first day of a week.
     */
    firstDayOfWeek?: FirstDayOfWeek;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * The latest date the UI component allows to select.
     */
    max?: Date | number | string;
    /**
     * Specifies the maximum zoom level of the calendar.
     */
    maxZoomLevel?: CalendarZoomLevel;
    /**
     * The earliest date the UI component allows to select.
     */
    min?: Date | number | string;
    /**
     * Specifies the minimum zoom level of the calendar.
     */
    minZoomLevel?: CalendarZoomLevel;
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies whether or not the UI component displays a button that selects the current date.
     */
    showTodayButton?: boolean;
    /**
     * 
     */
    showWeekNumbers?: boolean;
    /**
     * 
     */
    weekNumberRule?: WeekNumberRule;
    /**
     * An object or a value specifying the date and time currently selected in the calendar.
     */
    value?: Date | number | string;
    /**
     * Specifies the current calendar zoom level.
     */
    zoomLevel?: CalendarZoomLevel;
}
/**
 * The Calendar is a UI component that displays a calendar and allows an end user to select the required date within a specified date range.
 */
export default class dxCalendar extends Editor<dxCalendarOptions> { }

export type Properties = dxCalendarOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxCalendarOptions;


