/**
* DevExtreme (ui/resizable.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { UserDefinedElement } from '../core/element';
import DOMComponent, {
    DOMComponentOptions,
} from '../core/dom_component';

import {
    EventInfo,
    NativeEventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

export type ResizeHandle = 'bottom' | 'left' | 'right' | 'top' | 'all';

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface ResizeInfo {
    /**
     * 
     */
    readonly width: number;
    /**
     * 
     */
    readonly height: number;
}

/**
 * 
 */
export type DisposingEvent = EventInfo<dxResizable>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxResizable>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxResizable> & ChangedOptionInfo;

/**
 * 
 */
export type ResizeEvent = NativeEventInfo<dxResizable, MouseEvent | TouchEvent> & ResizeInfo;

/**
 * 
 */
export type ResizeStartEvent = NativeEventInfo<dxResizable, MouseEvent | TouchEvent> & ResizeInfo;

/**
 * 
 */
export type ResizeEndEvent = NativeEventInfo<dxResizable, MouseEvent | TouchEvent> & ResizeInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxResizableOptions extends DOMComponentOptions<dxResizable> {
    /**
     * 
     */
    area?: string | UserDefinedElement;
    /**
     * Specifies which borders of the UI component element are used as a handle.
     */
    handles?: ResizeHandle | string;
    /**
     * Specifies the UI component&apos;s height.
     */
    height?: number | string | (() => number | string);
    /**
     * 
     */
    keepAspectRatio?: boolean;
    /**
     * Specifies the upper height boundary for resizing.
     */
    maxHeight?: number;
    /**
     * Specifies the upper width boundary for resizing.
     */
    maxWidth?: number;
    /**
     * Specifies the lower height boundary for resizing.
     */
    minHeight?: number;
    /**
     * Specifies the lower width boundary for resizing.
     */
    minWidth?: number;
    /**
     * A function that is executed each time the UI component is resized by one pixel.
     */
    onResize?: ((e: ResizeEvent) => void);
    /**
     * A function that is executed when resizing ends.
     */
    onResizeEnd?: ((e: ResizeEndEvent) => void);
    /**
     * A function that is executed when resizing starts.
     */
    onResizeStart?: ((e: ResizeStartEvent) => void);
    /**
     * Specifies the UI component&apos;s width.
     */
    width?: number | string | (() => number | string);
}
/**
 * The Resizable UI component enables its content to be resizable in the UI.
 */
export default class dxResizable extends DOMComponent<dxResizableOptions> { }

export type Properties = dxResizableOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxResizableOptions;


