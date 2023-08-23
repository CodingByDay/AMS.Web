/**
* DevExtreme (ui/autocomplete.d.ts)
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
    ItemInfo,
} from '../events/index';

import dxDropDownList, {
    dxDropDownListOptions,
    SelectionChangedInfo,
} from './drop_down_editor/ui.drop_down_list';

import {
    DropDownButtonTemplateDataModel,
} from './drop_down_editor/ui.drop_down_editor';

import {
    ValueChangedInfo,
} from './editor/editor';

import {
    Properties as PopupProperties,
} from './popup';

/**
 * 
 */
export type ChangeEvent = NativeEventInfo<dxAutocomplete, Event>;

/**
 * 
 */
export type ClosedEvent = EventInfo<dxAutocomplete>;

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxAutocomplete>;

/**
 * 
 */
export type CopyEvent = NativeEventInfo<dxAutocomplete, ClipboardEvent>;

/**
 * 
 */
export type CutEvent = NativeEventInfo<dxAutocomplete, ClipboardEvent>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxAutocomplete>;

/**
 * 
 */
export type EnterKeyEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/**
 * 
 */
export type FocusInEvent = NativeEventInfo<dxAutocomplete, FocusEvent>;

/**
 * 
 */
export type FocusOutEvent = NativeEventInfo<dxAutocomplete, FocusEvent>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxAutocomplete>;

/**
 * 
 */
export type InputEvent = NativeEventInfo<dxAutocomplete, UIEvent & { target: HTMLInputElement }>;

/**
 * 
 */
export type ItemClickEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent | MouseEvent | PointerEvent> & ItemInfo;

/**
 * 
 */
export type KeyDownEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

export type KeyPressEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/**
 * 
 */
export type KeyUpEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent>;

/**
 * 
 */
export type OpenedEvent = EventInfo<dxAutocomplete>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxAutocomplete> & ChangedOptionInfo;

/**
 * 
 */
export type PasteEvent = NativeEventInfo<dxAutocomplete, ClipboardEvent>;

/**
 * 
 */
export type SelectionChangedEvent = EventInfo<dxAutocomplete> & SelectionChangedInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxAutocomplete, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

export type DropDownButtonTemplateData = DropDownButtonTemplateDataModel;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxAutocompleteOptions extends dxDropDownListOptions<dxAutocomplete> {
    /**
     * Specifies the maximum count of items displayed by the UI component.
     */
    maxItemCount?: number;
    /**
     * The minimum number of characters that must be entered into the text box to begin a search.
     */
    minSearchLength?: number;
    /**
     * Specifies whether the drop-down button is visible.
     */
    showDropDownButton?: boolean;
    /**
     * Specifies the current value displayed by the UI component.
     */
    value?: string;

    /**
     * Configures the drop-down field which holds the content.
     */
    dropDownOptions?: PopupProperties;
}
/**
 * The Autocomplete UI component is a textbox that provides suggestions while a user types into it.
 */
export default class dxAutocomplete extends dxDropDownList<dxAutocompleteOptions> { }

export type Properties = dxAutocompleteOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxAutocompleteOptions;


