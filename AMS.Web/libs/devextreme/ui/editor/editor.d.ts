/**
* DevExtreme (ui/editor/editor.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    NativeEventInfo,
} from '../../events/index';

import Widget, {
    WidgetOptions,
} from '../widget/ui.widget';

import {
    EditorStyle,
    Position,
    ValidationMessageMode,
    ValidationStatus,
} from '../../common';

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface ValueChangedInfo {
    /**
     * 
     */
    readonly previousValue?: any;
    /**
     * 
     */
    readonly value?: any;
}

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface EditorOptions<TComponent> extends WidgetOptions<TComponent> {
    /**
     * Specifies or indicates whether the editor&apos;s value is valid.
     */
    isValid?: boolean;
    /**
     * A function that is executed after the UI component&apos;s value is changed.
     */
    onValueChanged?: ((e: NativeEventInfo<TComponent, Event> & ValueChangedInfo) => void);
    /**
     * Specifies whether the editor is read-only.
     */
    readOnly?: boolean;
    /**
     * Information on the broken validation rule. Contains the first item from the validationErrors array.
     */
    validationError?: any;
    /**
     * An array of the validation rules that failed.
     */
    validationErrors?: Array<any>;
    /**
     * Specifies how the message about the validation rules that are not satisfied by this editor&apos;s value is displayed.
     */
    validationMessageMode?: ValidationMessageMode;
    /**
     * 
     */
    validationMessagePosition?: Position;
    /**
     * Indicates or specifies the current validation status.
     */
    validationStatus?: ValidationStatus;
    /**
     * Specifies the UI component&apos;s value.
     */
    value?: any;
    /**
     * 
     */
    stylingMode?: EditorStyle;
}
/**
 * A base class for editors.
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export default class Editor<TProperties = Properties> extends Widget<TProperties> {
    /**
     * Resets the value property to the default value.
     */
    reset(): void;
}

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
interface EditorInstance extends Editor<Properties> { }

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
type Properties = EditorOptions<EditorInstance>;
