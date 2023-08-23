/**
* DevExtreme (ui/scroll_view.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    DxPromise,
} from '../core/utils/deferred';

import {
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo,
} from '../events/index';

import dxScrollable, {
    dxScrollableOptions,
    ScrollEventInfo,
} from './scroll_view/ui.scrollable';

/**
 * 
 */
export type DisposingEvent = EventInfo<dxScrollView>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxScrollView>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxScrollView> & ChangedOptionInfo;

/**
 * 
 */
export type PullDownEvent = EventInfo<dxScrollView>;

/**
 * 
 */
export type ReachBottomEvent = EventInfo<dxScrollView>;

/**
 * 
 */
export type ScrollEvent = ScrollEventInfo<dxScrollView>;

/**
 * 
 */
export type UpdatedEvent = ScrollEventInfo<dxScrollView>;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxScrollViewOptions extends dxScrollableOptions<dxScrollView> {
    /**
     * A function that is executed when the &apos;pull to refresh&apos; gesture is performed. Supported on mobile devices only.
     */
    onPullDown?: ((e: PullDownEvent) => void);
    /**
     * A function that is executed when the content is scrolled down to the bottom.
     */
    onReachBottom?: ((e: ReachBottomEvent) => void);
    /**
     * Specifies the text shown in the pullDown panel when pulling the content down lowers the refresh threshold.
     */
    pulledDownText?: string;
    /**
     * Specifies the text shown in the pullDown panel while pulling the content down to the refresh threshold.
     */
    pullingDownText?: string;
    /**
     * Specifies the text shown in the pullDown panel displayed when content is scrolled to the bottom.
     */
    reachBottomText?: string;
    /**
     * Specifies the text shown in the pullDown panel displayed when the content is being refreshed.
     */
    refreshingText?: string;
}
/**
 * The ScrollView is a UI component that enables a user to scroll its content.
 */
export default class dxScrollView extends dxScrollable<dxScrollViewOptions> {
    /**
     * Locks the UI component until the release(preventScrollBottom) method is called and executes the function passed to the onPullDown property and the handler assigned to the pullDown event.
     */
    refresh(): void;
    /**
     * Notifies the ScrollView that data loading is finished.
     */
    release(preventScrollBottom: boolean): DxPromise<void>;
}

export type Properties = dxScrollViewOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxScrollViewOptions;


