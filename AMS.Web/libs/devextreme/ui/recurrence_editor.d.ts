/**
* DevExtreme (ui/recurrence_editor.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor, {
    EditorOptions, ValueChangedInfo,
} from './editor/editor';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
    NativeEventInfo,
} from '../events/index';

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxRecurrenceEditor>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxRecurrenceEditor>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxRecurrenceEditor>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxRecurrenceEditor> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxRecurrenceEditor, Event> & ValueChangedInfo;

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxRecurrenceEditorOptions extends EditorOptions<dxRecurrenceEditor> {
    /**
     * Specifies the UI component&apos;s value.
     */
    value?: string;
}
/**
 * A base class for editors.
 */
export default class dxRecurrenceEditor extends Editor<dxRecurrenceEditorOptions> { }

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Properties = dxRecurrenceEditorOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxRecurrenceEditorOptions;


