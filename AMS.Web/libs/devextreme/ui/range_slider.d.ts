/**
* DevExtreme (ui/range_slider.d.ts)
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

import {
    dxSliderBaseOptions,
} from './slider';

import dxTrackBar from './track_bar';

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxRangeSlider>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxRangeSlider>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxRangeSlider>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxRangeSlider> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxRangeSlider, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | UIEvent | Event> & ValueChangedInfo & {
    /**
     * 
     */
    readonly start?: number;
    /**
     * 
     */
    readonly end?: number;
    /**
     * 
     */
    readonly value?: Array<number>;
};

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxRangeSliderOptions extends dxSliderBaseOptions<dxRangeSlider> {
    /**
     * The right edge of the interval currently selected using the range slider.
     */
    end?: number;
    /**
     * The value to be assigned to the name attribute of the underlying `` element.
     */
    endName?: string;
    /**
     * A function that is executed after the UI component&apos;s value is changed.
     */
    onValueChanged?: ((e: ValueChangedEvent) => void);
    /**
     * The left edge of the interval currently selected using the range slider.
     */
    start?: number;
    /**
     * The value to be assigned to the name attribute of the underlying `` element.
     */
    startName?: string;
    /**
     * Specifies the UI component&apos;s value.
     */
    value?: Array<number>;
}
/**
 * The RangeSlider is a UI component that allows an end user to choose a range of numeric values.
 */
export default class dxRangeSlider extends dxTrackBar<dxRangeSliderOptions> { }

export type Properties = dxRangeSliderOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxRangeSliderOptions;


