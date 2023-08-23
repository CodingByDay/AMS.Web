/**
* DevExtreme (ui/progress_bar.d.ts)
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

import dxTrackBar, {
    dxTrackBarOptions,
} from './track_bar';

/**
 * 
 */
export type CompleteEvent = NativeEventInfo<dxProgressBar>;

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxProgressBar>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxProgressBar>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxProgressBar>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxProgressBar> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxProgressBar> & ValueChangedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxProgressBarOptions extends dxTrackBarOptions<dxProgressBar> {
    /**
     * A function that is executed when the value reaches the maximum.
     */
    onComplete?: ((e: CompleteEvent) => void);
    /**
     * Specifies whether or not the UI component displays a progress status.
     */
    showStatus?: boolean;
    /**
     * Specifies a format for the progress status.
     */
    statusFormat?: string | ((ratio: number, value: number) => string);
    /**
     * The current UI component value.
     */
    value?: number | false;
}
/**
 * The ProgressBar is a UI component that shows current progress.
 */
export default class dxProgressBar extends dxTrackBar<dxProgressBarOptions> { }

export type Properties = dxProgressBarOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxProgressBarOptions;


