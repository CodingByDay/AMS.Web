/**
* DevExtreme (ui/load_indicator.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
export type ContentReadyEvent = EventInfo<dxLoadIndicator>;

/**
 * 
 */
export type DisposingEvent = EventInfo<dxLoadIndicator>;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxLoadIndicator>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxLoadIndicator> & ChangedOptionInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxLoadIndicatorOptions extends WidgetOptions<dxLoadIndicator> {
    /**
     * Specifies the path to an image used as the indicator.
     */
    indicatorSrc?: string;
}
/**
 * The LoadIndicator is a UI element notifying the viewer that a process is in progress.
 */
export default class dxLoadIndicator extends Widget<dxLoadIndicatorOptions> { }

export type Properties = dxLoadIndicatorOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxLoadIndicatorOptions;


