/**
* DevExtreme (ui/popover.d.ts)
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
    PositionConfig,
} from '../animation/position';

import {
    UserDefinedElement,
} from '../core/element';

import {
    DxPromise,
} from '../core/utils/deferred';

import {
    DxEvent,
    Cancelable,
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import dxPopup, {
    dxPopupAnimation,
    dxPopupOptions,
    TitleRenderedInfo,
} from './popup';

import {
    Position,
} from '../common';

/**
 * 
 */
export type ContentReadyEvent = EventInfo<dxPopover>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxPopover>;

/**
 * 
 */
export type HidingEvent = Cancelable & EventInfo<dxPopover>;

/**
 * 
 */
export type HiddenEvent = EventInfo<dxPopover>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxPopover>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxPopover> & ChangedOptionInfo;

/**
 * 
 */
export type ShowingEvent = Cancelable & EventInfo<dxPopover>;

/**
 * 
 */
export type ShownEvent = EventInfo<dxPopover>;

/**
 * 
 */
export type TitleRenderedEvent = EventInfo<dxPopover> & TitleRenderedInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxPopoverOptions<TComponent> extends dxPopupOptions<TComponent> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxPopoverAnimation;
    /**
     * Specifies whether to close the UI component if a user clicks outside the popover window or outside the target element.
     * @deprecated 
     */
    closeOnOutsideClick?: boolean | ((event: DxEvent<MouseEvent | PointerEvent | TouchEvent>) => boolean);
    /**
     * Specifies the UI component&apos;s height.
     */
    height?: number | string | (() => number | string);
    /**
     * Specifies properties of popover hiding. Ignored if the shading property is set to true.
     */
    hideEvent?: {
      /**
       * The delay in milliseconds after which the UI component is hidden.
       */
      delay?: number;
      /**
       * Specifies the event names on which the UI component is hidden.
       */
      name?: string;
    } | string;
    /**
     * 
     */
    hideOnOutsideClick?: boolean | ((event: DxEvent<MouseEvent | PointerEvent | TouchEvent>) => boolean);
    /**
     * Specifies whether to hide the widget when users scroll one of its parent elements.
     */
    hideOnParentScroll?: boolean;
    /**
     * An object defining UI component positioning properties.
     */
    position?: Position | PositionConfig;
    /**
     * Specifies whether to shade the background when the UI component is active.
     */
    shading?: boolean;
    /**
     * Specifies properties for displaying the UI component.
     */
    showEvent?: {
      /**
       * The delay in milliseconds after which the UI component is displayed.
       */
      delay?: number;
      /**
       * Specifies the event names on which the UI component is shown.
       */
      name?: string;
    } | string;
    /**
     * A Boolean value specifying whether or not to display the title in the overlay window.
     */
    showTitle?: boolean;
    /**
     * The target element associated with the widget.
     */
    target?: string | UserDefinedElement;
    /**
     * Specifies the UI component&apos;s width.
     */
    width?: number | string | (() => number | string);
}
/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxPopoverAnimation extends dxPopupAnimation {
    /**
     * An object that defines the animation properties used when the UI component is being hidden.
     */
    hide?: AnimationConfig;
    /**
     * An object that defines the animation properties used when the UI component is being shown.
     */
    show?: AnimationConfig;
}
/**
 * The Popover is a UI component that shows notifications within a box with an arrow pointing to a specified UI element.
 */
export default class dxPopover<TProperties = Properties> extends dxPopup<TProperties> {
    show(): DxPromise<boolean>;
    /**
     * Shows the UI component for a target element.
     */
    show(target: string | UserDefinedElement): DxPromise<boolean>;
}

/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
interface PopoverInstance extends dxPopover<Properties> { }

export type Properties = dxPopoverOptions<PopoverInstance>;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = Properties;


