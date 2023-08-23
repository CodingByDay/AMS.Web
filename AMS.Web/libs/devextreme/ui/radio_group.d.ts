/**
* DevExtreme (ui/radio_group.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DataSource from '../data/data_source';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Editor, {
    ValueChangedInfo,
    EditorOptions,
} from './editor/editor';

import {
    DataExpressionMixinOptions,
} from './editor/ui.data_expression';

import {
    Orientation,
} from '../common';

export {
    Orientation,
};

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxRadioGroup>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxRadioGroup>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxRadioGroup>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxRadioGroup> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxRadioGroup, KeyboardEvent | MouseEvent | PointerEvent | Event> & ValueChangedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxRadioGroupOptions extends EditorOptions<dxRadioGroup>, DataExpressionMixinOptions<dxRadioGroup> {
    /**
     * Specifies whether or not the UI component changes its state when interacting with a user.
     */
    activeStateEnabled?: boolean;
    /**
     * Specifies whether the UI component can be focused using keyboard navigation.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies whether the UI component changes its state when a user pauses on it.
     */
    hoverStateEnabled?: boolean;
    /**
     * Specifies the radio group layout.
     */
    layout?: Orientation;
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies the UI component&apos;s value.
     */
    value?: any;
}
/**
 * The RadioGroup is a UI component that contains a set of radio buttons and allows an end user to make a single selection from the set.
 */
export default class dxRadioGroup extends Editor<dxRadioGroupOptions> {
    getDataSource(): DataSource;
}

export type Properties = dxRadioGroupOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxRadioGroupOptions;


