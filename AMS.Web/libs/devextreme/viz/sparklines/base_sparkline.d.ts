/**
* DevExtreme (viz/sparklines/base_sparkline.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement,
} from '../../core/element';

import {
    template,
} from '../../core/templates/template';

import {
    EventInfo,
} from '../../events/index';

import BaseWidget, {
    BaseWidgetExport,
    BaseWidgetLoadingIndicator,
    BaseWidgetOptions,
    BaseWidgetTitle,
    BaseWidgetTooltip,
} from '../core/base_widget';

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface BaseSparklineOptions<TComponent> extends BaseWidgetOptions<TComponent> {
    /**
     * Configures the exporting and printing features.
     */
    export?: BaseWidgetExport;
    /**
     * Configures the loading indicator.
     */
    loadingIndicator?: BaseWidgetLoadingIndicator;
    /**
     * A function that is executed when a tooltip becomes hidden.
     */
    onTooltipHidden?: ((e: EventInfo<TComponent>) => void);
    /**
     * A function that is executed when a tooltip appears.
     */
    onTooltipShown?: ((e: EventInfo<TComponent>) => void);
    /**
     * Specifies whether to redraw the UI component when the size of the parent browser window changes or a mobile device rotates.
     */
    redrawOnResize?: boolean;
    /**
     * Configures the UI component&apos;s title.
     */
    title?: BaseWidgetTitle | string;
    /**
     * Configures the tooltip.
     */
    tooltip?: BaseSparklineTooltip;
}
/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface BaseSparklineTooltip extends BaseWidgetTooltip {
    /**
     * Specifies a custom template for tooltips.
     */
    contentTemplate?: template | ((pointsInfo: any, element: DxElement) => string | UserDefinedElement);
    /**
     * Allows you to change tooltip appearance.
     */
    customizeTooltip?: ((pointsInfo: any) => any);
    /**
     * Enables tooltips.
     */
    enabled?: boolean;
    /**
     * Allows users to interact with the tooltip content.
     */
    interactive?: boolean;
}
/**
 * Overridden by descriptions for particular UI components.
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export default class BaseSparkline<TProperties> extends BaseWidget<TProperties> {
    /**
     * Hides the loading indicator.
     */
    hideLoadingIndicator(): void;
    /**
     * Shows the loading indicator.
     */
    showLoadingIndicator(): void;
}
