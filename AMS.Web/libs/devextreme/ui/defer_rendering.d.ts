/**
* DevExtreme (ui/defer_rendering.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    AnimationConfig,
} from '../animation/fx';

import {
    DxElement,
} from '../core/element';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import Widget, {
    WidgetOptions,
} from './widget/ui.widget';

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxDeferRendering>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxDeferRendering>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxDeferRendering>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxDeferRendering> & ChangedOptionInfo;

/**
 * 
 */
export type RenderedEvent = EventInfo<dxDeferRendering>;

/**
 * 
 */
export type ShownEvent = EventInfo<dxDeferRendering>;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxDeferRenderingOptions extends WidgetOptions<dxDeferRendering> {
    /**
     * Specifies the animation to be used to show the rendered content.
     */
    animation?: AnimationConfig;
    /**
     * A function that is executed when the content is rendered but not yet displayed.
     */
    onRendered?: ((e: { component?: dxDeferRendering; element?: DxElement; model?: any }) => void);
    /**
     * A function that is executed when the content is displayed and animation is completed.
     */
    onShown?: ((e: { component?: dxDeferRendering; element?: DxElement; model?: any }) => void);
    /**
     * Specifies when the UI component content is rendered.
     */
    renderWhen?: PromiseLike<void> | boolean;
    /**
     * Indicates if a load indicator should be shown until the UI component&apos;s content is rendered.
     */
    showLoadIndicator?: boolean;
    /**
     * Specifies a jQuery selector of items that should be rendered using a staggered animation.
     */
    staggerItemSelector?: string;
}
/**
 * The DeferRendering is a UI component that waits for its content to be ready before rendering it. While the content is getting ready, the DeferRendering displays a loading indicator.
 */
export default class dxDeferRendering extends Widget<dxDeferRenderingOptions> { }

export type Properties = dxDeferRenderingOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxDeferRenderingOptions;


