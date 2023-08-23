/**
* DevExtreme (viz/linear_gauge.d.ts)
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

import {
    FileSavingEventInfo,
    ExportInfo,
    IncidentInfo,
} from './core/base_widget';

import {
    BaseGauge,
    BaseGaugeOptions,
    BaseGaugeRangeContainer,
    BaseGaugeScale,
    BaseGaugeScaleLabel,
    GaugeIndicator,
    TooltipInfo,
} from './gauges/base_gauge';

import {
    HorizontalAlignment,
    Orientation,
    VerticalAlignment,
} from '../common';

export {
    HorizontalAlignment,
    Orientation,
    VerticalAlignment,
};

/**
 * 
 */
export type DisposingEvent = EventInfo<dxLinearGauge>;

/**
 * 
 */
export type DrawnEvent = EventInfo<dxLinearGauge>;

/**
 * 
 */
export type ExportedEvent = EventInfo<dxLinearGauge>;

/**
 * 
 */
export type ExportingEvent = EventInfo<dxLinearGauge> & ExportInfo;

/**
 * 
 */
export type FileSavingEvent = FileSavingEventInfo<dxLinearGauge>;

/**
 * 
 */
export type IncidentOccurredEvent = EventInfo<dxLinearGauge> & IncidentInfo;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxLinearGauge>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxLinearGauge> & ChangedOptionInfo;

/**
 * 
 */
export type TooltipHiddenEvent = EventInfo<dxLinearGauge> & TooltipInfo;

/**
 * 
 */
export type TooltipShownEvent = EventInfo<dxLinearGauge> & TooltipInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxLinearGaugeOptions extends BaseGaugeOptions<dxLinearGauge> {
    /**
     * Specifies the properties required to set the geometry of the LinearGauge UI component.
     */
    geometry?: {
      /**
       * Indicates whether to display the LinearGauge UI component vertically or horizontally.
       */
      orientation?: Orientation;
    };
    /**
     * Specifies gauge range container properties.
     */
    rangeContainer?: RangeContainer;
    /**
     * Specifies the gauge&apos;s scale properties.
     */
    scale?: Scale;
    /**
     * Specifies the appearance properties of subvalue indicators.
     */
    subvalueIndicator?: GaugeIndicator;
    /**
     * Specifies the appearance properties of the value indicator.
     */
    valueIndicator?: GaugeIndicator;
}
/**
 * 
 */
export type RangeContainer = BaseGaugeRangeContainer & {
    /**
     * Specifies the orientation of the range container. Applies only if the geometry.orientation property is &apos;vertical&apos;.
     */
    horizontalOrientation?: HorizontalAlignment;
    /**
     * Specifies the orientation of the range container. Applies only if the geometry.orientation property is &apos;horizontal&apos;.
     */
    verticalOrientation?: VerticalAlignment;
    /**
     * Specifies the width of the range container&apos;s start and end boundaries in the LinearGauge UI component.
     */
    width?: {
      /**
       * Specifies a start width of a range container.
       */
      start?: number;
      /**
       * Specifies an end width of a range container.
       */
      end?: number;
    } | number;
};
/**
 * 
 */
export type Scale = BaseGaugeScale & {
    /**
     * Specifies the orientation of scale ticks. Applies only if the geometry.orientation property is &apos;vertical&apos;.
     */
    horizontalOrientation?: HorizontalAlignment;
    /**
     * Specifies common properties for scale labels.
     */
    label?: ScaleLabel;
    /**
     * Specifies the minimum distance between two neighboring major ticks in pixels.
     */
    scaleDivisionFactor?: number;
    /**
     * Specifies the orientation of scale ticks. Applies only if the geometry.orientation property is &apos;horizontal&apos;.
     */
    verticalOrientation?: VerticalAlignment;
};
/**
 * 
 */
export type ScaleLabel = BaseGaugeScaleLabel & {
    /**
     * Specifies the spacing between scale labels and ticks.
     */
    indentFromTick?: number;
};
/**
 * The LinearGauge is a UI component that indicates values on a linear numeric scale.
 */
export default class dxLinearGauge extends BaseGauge<dxLinearGaugeOptions> { }

export type Properties = dxLinearGaugeOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxLinearGaugeOptions;

// #region deprecated in v23.1

/**
 * @deprecated Use RangeContainer instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type dxLinearGaugeRangeContainer = RangeContainer;

/**
 * @deprecated Use Scale instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type dxLinearGaugeScale = Scale;

/**
 * @deprecated Use ScaleLabel instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type dxLinearGaugeScaleLabel = ScaleLabel;

// #endregion


