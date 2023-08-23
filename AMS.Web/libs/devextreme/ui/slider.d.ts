/**
* DevExtreme (ui/slider.d.ts)
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

import {
    Format,
} from '../localization';

import {
    SliderValueChangeMode,
    TooltipShowMode,
    VerticalEdge,
} from '../common';

export {
    TooltipShowMode,
    VerticalEdge,
};

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxSlider>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxSlider>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxSlider>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxSlider> & ChangedOptionInfo;

/**
 * 
 */
export type ValueChangedEvent = NativeEventInfo<dxSlider, KeyboardEvent | MouseEvent | PointerEvent | TouchEvent | UIEvent | Event> & ValueChangedInfo;

/**
 * @deprecated Use /common/SliderValueChangeMode instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type ValueChangeMode = SliderValueChangeMode;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxSliderOptions extends dxSliderBaseOptions<dxSlider> {
    /**
     * The current slider value.
     */
    value?: number;
}
/**
 * The Slider is a UI component that allows an end user to set a numeric value on a continuous range of possible values.
 */
export default class dxSlider extends dxTrackBar<dxSliderOptions> { }

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxSliderBaseOptions<TComponent> extends dxTrackBarOptions<TComponent> {
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
     * Specifies the step by which a handle moves when a user presses Page Up or Page Down.
     */
    keyStep?: number;
    /**
     * Configures the labels displayed at the min and max values.
     */
    label?: {
      /**
       * Formats a value before it is displayed in a label.
       */
      format?: Format;
      /**
       * Specifies whether labels are over or under the scale.
       */
      position?: VerticalEdge;
      /**
       * Specifies whether slider labels are visible.
       */
      visible?: boolean;
    };
    /**
     * The value to be assigned to the `name` attribute of the underlying HTML element.
     */
    name?: string;
    /**
     * Specifies whether to highlight the selected range.
     */
    showRange?: boolean;
    /**
     * Specifies the step by which the UI component&apos;s value changes when a user drags a handler.
     */
    step?: number;
    /**
     * Configures a tooltip.
     */
    tooltip?: {
      /**
       * Specifies whether a tooltip is enabled.
       */
      enabled?: boolean;
      /**
       * Specifies a tooltip&apos;s display format.
       */
      format?: Format;
      /**
       * Specifies whether a tooltip is over or under the slider.
       */
      position?: VerticalEdge;
      /**
       * Specifies when the UI component shows a tooltip.
       */
      showMode?: TooltipShowMode;
    };
    /**
      * 
      */
     valueChangeMode?: SliderValueChangeMode;
}

/**
                                                                   * 
                                                                   * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
                                                                   */
                                                                  export interface dxSliderBase { }

export type Properties = dxSliderOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxSliderOptions;


