/**
* DevExtreme (ui/date_box.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable max-classes-per-file */
import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import {
    ComponentDisabledDate,
    dxCalendarOptions,
} from './calendar';

import dxDropDownEditor, {
    dxDropDownEditorOptions,
    DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    Format,
} from '../localization';

import {
    Properties as PopupProperties,
} from './popup';

export type DateType = 'date' | 'datetime' | 'time';
export type DatePickerType = 'calendar' | 'list' | 'native' | 'rollers';

/**
 * 
 */
export type ChangeEvent = NativeEventInfo<dxDateBox, Event>;

/**
 * 
 */
export type ClosedEvent = EventInfo<dxDateBox>;

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxDateBox>;

/**
 * 
 */
export type CopyEvent = NativeEventInfo<dxDateBox, ClipboardEvent>;

/**
 * 
 */
export type CutEvent = NativeEventInfo<dxDateBox, ClipboardEvent>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxDateBox>;

/**
 * 
 */
export type EnterKeyEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/**
 * 
 */
export type FocusInEvent = NativeEventInfo<dxDateBox, FocusEvent>;

/**
 * 
 */
export type FocusOutEvent = NativeEventInfo<dxDateBox, FocusEvent>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxDateBox>;

/**
 * 
 */
export type InputEvent = NativeEventInfo<dxDateBox, UIEvent & { target: HTMLInputElement }>;

/**
 * 
 */
export type KeyDownEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

export type KeyPressEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/**
 * 
 */
export type KeyUpEvent = NativeEventInfo<dxDateBox, KeyboardEvent>;

/**
 * 
 */
export type OpenedEvent = EventInfo<dxDateBox>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxDateBox> & ChangedOptionInfo;

/**
 * 
 */
export type PasteEvent = NativeEventInfo<dxDateBox, ClipboardEvent>;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxDateBox, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

export type DisabledDate = ComponentDisabledDate<dxDateBox>;

export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxDateBoxOptions extends DateBoxBaseOptions<dxDateBox> {
    /**
     * Specifies whether or not adaptive UI component rendering is enabled on a small screen.
     */
    adaptivityEnabled?: boolean;
    /**
     * Specifies the message displayed if the specified date is later than the max value or earlier than the min value.
     */
    dateOutOfRangeMessage?: string;
    /**
     * Specifies dates that users cannot select. Applies only if pickerType is &apos;calendar&apos;.
     */
    disabledDates?: Array<Date> | ((data: DisabledDate) => boolean);
    /**
     * 
     */
    inputAttr?: any;
    /**
     * Specifies the interval between neighboring values in the popup list in minutes.
     */
    interval?: number;
    /**
     * Specifies the message displayed if the typed value is not a valid date or time.
     */
    invalidDateMessage?: string;
    /**
     * 
     */
    label?: string;
    /**
     * 
     */
    maxLength?: string | number;
    /**
     * 
     */
    name?: string;
    /**
     * Specifies the type of the date/time picker.
     */
    pickerType?: DatePickerType;
    /**
     * Specifies a placeholder for the input field.
     */
    placeholder?: string;
    /**
     * Specifies whether to show the analog clock in the value picker. Applies only if type is &apos;datetime&apos; and pickerType is &apos;calendar&apos;.
     */
    showAnalogClock?: boolean;
    /**
     * 
     */
    text?: string;
    /**
     * A format used to display date/time information.
     */
    type?: DateType;
    /**
     * An object or a value specifying the date and time currently selected using the date box.
     */
    value?: Date | number | string;
}

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface DateBoxBaseOptions<TComponent> extends dxDropDownEditorOptions<TComponent> {
    /**
     * 
     */
    applyButtonText?: string;
    /**
     * 
     */
    calendarOptions?: dxCalendarOptions;
    /**
     * 
     */
    cancelButtonText?: string;
    /**
     * 
     */
    dateSerializationFormat?: string;
    /**
     * 
     */
    displayFormat?: Format;
    /**
     * 
     */
    max?: Date | number | string;
    /**
     * 
     */
    min?: Date | number | string;
    /**
     * 
     */
    todayButtonText?: string;
    /**
     * 
     */
    useMaskBehavior?: boolean;
    /**
     * 
     */
    dropDownOptions?: PopupProperties;
}

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export class DateBoxBase<TProperties = Properties> extends dxDropDownEditor<TProperties> {
    /**
     * 
     */
    close(): void;
    /**
     * 
     */
    open(): void;
}

/**
 * The DateBox is a UI component that displays date and time in a specified format, and enables a user to pick or type in the required date/time value.
 */
export default class dxDateBox extends DateBoxBase<Properties> {}

export type Properties = dxDateBoxOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = Properties;


