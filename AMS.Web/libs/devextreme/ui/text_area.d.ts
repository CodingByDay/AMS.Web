/**
* DevExtreme (ui/text_area.d.ts)
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
    ValueChangedInfo,
} from './editor/editor';

import dxTextBox, {
    dxTextBoxOptions,
} from './text_box';

/**
 * 
 */
export type ChangeEvent = NativeEventInfo<dxTextArea, Event>;

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxTextArea>;

/**
 * 
 */
export type CopyEvent = NativeEventInfo<dxTextArea, ClipboardEvent>;

/**
 * 
 */
export type CutEvent = NativeEventInfo<dxTextArea, ClipboardEvent>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxTextArea>;

/**
 * 
 */
export type EnterKeyEvent = NativeEventInfo<dxTextArea, KeyboardEvent>;

/**
 * 
 */
export type FocusInEvent = NativeEventInfo<dxTextArea, FocusEvent>;

/**
 * 
 */
export type FocusOutEvent = NativeEventInfo<dxTextArea, FocusEvent>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxTextArea>;

/**
 * 
 */
export type InputEvent = NativeEventInfo<dxTextArea, UIEvent & { target: HTMLInputElement }>;

/**
 * 
 */
export type KeyDownEvent = NativeEventInfo<dxTextArea, KeyboardEvent>;

export type KeyPressEvent = NativeEventInfo<dxTextArea, KeyboardEvent>;

/**
 * 
 */
export type KeyUpEvent = NativeEventInfo<dxTextArea, KeyboardEvent>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxTextArea> & ChangedOptionInfo;

/**
 * 
 */
export type PasteEvent = NativeEventInfo<dxTextArea, ClipboardEvent>;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxTextArea, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxTextAreaOptions extends dxTextBoxOptions<dxTextArea> {
    /**
     * A Boolean value specifying whether or not the auto resizing mode is enabled.
     */
    autoResizeEnabled?: boolean;
    /**
     * Specifies the maximum height of the UI component.
     */
    maxHeight?: number | string;
    /**
     * Specifies the minimum height of the UI component.
     */
    minHeight?: number | string;
    /**
     * Specifies whether or not the UI component checks the inner text for spelling mistakes.
     */
    spellcheck?: boolean;
}
/**
 * The TextArea is a UI component that enables a user to enter and edit a multi-line text.
 */
export default class dxTextArea extends dxTextBox<dxTextAreaOptions> { }

export type Properties = dxTextAreaOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxTextAreaOptions;


