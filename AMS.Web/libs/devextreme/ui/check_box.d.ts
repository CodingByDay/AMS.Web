/**
* DevExtreme (ui/check_box.d.ts)
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

import Editor, {
    EditorOptions,
    ValueChangedInfo,
} from './editor/editor';

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxCheckBox>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxCheckBox>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxCheckBox>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxCheckBox> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxCheckBox, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | Event> & ValueChangedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxCheckBoxOptions extends EditorOptions<dxCheckBox> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * 
     */
    enableThreeStateBehavior?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies the check box icon&apos;s width and height.
     */
    iconSize?: number | string;
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies the text displayed by the check box.
     */
    text?: string;
    /**
     * Specifies the UI component state.
     */
    value?: boolean | null | undefined;
}
/**
 * The CheckBox is a small box, which when selected by the end user, shows that a particular feature has been enabled or a specific property has been chosen.
 */
export default class dxCheckBox extends Editor<dxCheckBoxOptions> {
    /**
      * Removes focus from the check box.
      */
     blur(): void;
}

export type Properties = dxCheckBoxOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxCheckBoxOptions;


