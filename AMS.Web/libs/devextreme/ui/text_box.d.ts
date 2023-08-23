/**
* DevExtreme (ui/text_box.d.ts)
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

import dxTextEditor, {
    dxTextEditorOptions,
} from './text_box/ui.text_editor.base';

export type TextBoxType = 'email' | 'password' | 'search' | 'tel' | 'text' | 'url';

/**
 * 
 */
export type ChangeEvent = NativeEventInfo<dxTextBox, Event>;

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxTextBox>;

/**
 * 
 */
export type CopyEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/**
 * 
 */
export type CutEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxTextBox>;

/**
 * 
 */
export type EnterKeyEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/**
 * 
 */
export type FocusInEvent = NativeEventInfo<dxTextBox, FocusEvent>;

/**
 * 
 */
export type FocusOutEvent = NativeEventInfo<dxTextBox, FocusEvent>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxTextBox>;

/**
 * 
 */
export type InputEvent = NativeEventInfo<dxTextBox, UIEvent & { target: HTMLInputElement }>;

/**
 * 
 */
export type KeyDownEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

export type KeyPressEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/**
 * 
 */
export type KeyUpEvent = NativeEventInfo<dxTextBox, KeyboardEvent>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxTextBox> & ChangedOptionInfo;

/**
 * 
 */
export type PasteEvent = NativeEventInfo<dxTextBox, ClipboardEvent>;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxTextBox, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxTextBoxOptions<TComponent> extends dxTextEditorOptions<TComponent> {
    /**
     * Specifies the maximum number of characters you can enter into the textbox.
     */
    maxLength?: string | number;
    /**
     * The &apos;mode&apos; attribute value of the actual HTML input element representing the text box.
     */
    mode?: TextBoxType;
    /**
     * Specifies a value the UI component displays.
     */
    value?: string;
}
/**
 * The TextBox is a UI component that enables a user to enter and edit a single line of text.
 */
export default class dxTextBox<TProperties = Properties> extends dxTextEditor<TProperties> { }

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
interface TextBoxInstance extends dxTextBox<Properties> { }

export type Properties = dxTextBoxOptions<TextBoxInstance>;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = Properties;


