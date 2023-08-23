/**
* DevExtreme (ui/date_range_box.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
  EventInfo,
  NativeEventInfo,
  InitializedEventInfo,
  ChangedOptionInfo,
} from '../events/index';

import {
  DxElement,
  UserDefinedElement,
} from '../core/element';

import {
  DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import { DateBoxBase, DateBoxBaseOptions } from './date_box';

import {
  ValueChangedInfo,
} from './editor/editor';

/**
 * 
 */
export type ChangeEvent = NativeEventInfo<dxDateRangeBox>;

/**
 * 
 */
export type ClosedEvent = EventInfo<dxDateRangeBox>;

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxDateRangeBox>;

/**
 * 
 */
export type CopyEvent = NativeEventInfo<dxDateRangeBox, ClipboardEvent>;

/**
 * 
 */
export type CutEvent = NativeEventInfo<dxDateRangeBox, ClipboardEvent>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxDateRangeBox>;

/**
 * 
 */
export type EnterKeyEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/**
 * 
 */
export type FocusInEvent = NativeEventInfo<dxDateRangeBox, FocusEvent>;

/**
 * 
 */
export type FocusOutEvent = NativeEventInfo<dxDateRangeBox, FocusEvent>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxDateRangeBox>;

/**
 * 
 */
export type InputEvent = NativeEventInfo<dxDateRangeBox, UIEvent & { target: HTMLInputElement }>;

/**
 * 
 */
export type KeyDownEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

export type KeyPressEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/**
 * 
 */
export type KeyUpEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent>;

/**
 * 
 */
export type OpenedEvent = EventInfo<dxDateRangeBox>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxDateRangeBox> & ChangedOptionInfo;

/**
 * 
 */
export type PasteEvent = NativeEventInfo<dxDateRangeBox, ClipboardEvent>;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxDateRangeBox, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * 
 */
export type Properties = Omit<DateBoxBaseOptions<dxDateRangeBox>, 'inputAttr' | 'label' | 'maxLength' | 'name' | 'placeholder' | 'text'> & {
    /**
     * 
     */
    disableOutOfRangeSelection?: boolean;
    /**
     * 
     */
    endDate?: Date | number | string;
    /**
     * 
     */
    endDateInputAttr?: any;
    /**
     * 
     */
    endDateLabel?: string;
    /**
     * 
     */
    endDateName?: string;
    /**
     * 
     */
    endDateOutOfRangeMessage?: string;
    /**
     * 
     */
    endDatePlaceholder?: string;
    /**
     * 
     */
    endDateText?: string;
    /**
     * 
     */
    invalidEndDateMessage?: string;
    /**
     * 
     */
    invalidStartDateMessage?: string;
    /**
     * 
     */
    multiView?: boolean;
    /**
     * 
     */
    openOnFieldClick?: boolean;
    /**
     * 
     */
    startDate?: Date | number | string;
    /**
     * 
     */
    startDateInputAttr?: any;
    /**
     * 
     */
    startDateLabel?: string;
    /**
     * 
     */
    startDateName?: string;
    /**
     * 
     */
    startDateOutOfRangeMessage?: string;
    /**
     * 
     */
    startDatePlaceholder?: string;
    /**
     * 
     */
    startDateText?: string;
    /**
     * 
     */
    value?: Array<Date | number | string>;
};

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
declare const DateRangeBoxBase: new(element: UserDefinedElement, options?: Properties) => Omit<DateBoxBase<Properties>, 'field'>;

/**
 * 
 */
export default class dxDateRangeBox extends DateRangeBoxBase {
  /**
   * 
   */
  endDateField(): DxElement;
  /**
   * 
   */
  startDateField(): DxElement;
}


