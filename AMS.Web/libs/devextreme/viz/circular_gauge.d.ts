/**
* DevExtreme (viz/circular_gauge.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
} from '../core/element';

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
    template,
} from '../core/templates/template';

import {
    BaseGauge,
    BaseGaugeOptions,
    BaseGaugeRangeContainer,
    BaseGaugeScale,
    BaseGaugeScaleLabel,
    GaugeIndicator,
    TooltipInfo,
} from './gauges/base_gauge';

export type CircularGaugeElementOrientation = 'center' | 'inside' | 'outside';
export type CircularGaugeLabelOverlap = 'first' | 'last';

/**
 * 
 */
export type DisposingEvent = EventInfo<dxCircularGauge>;

/**
 * 
 */
export type DrawnEvent = EventInfo<dxCircularGauge>;

/**
 * 
 */
export type ExportedEvent = EventInfo<dxCircularGauge>;

/**
 * 
 */
export type ExportingEvent = EventInfo<dxCircularGauge> & ExportInfo;

/**
 * 
 */
export type FileSavingEvent = FileSavingEventInfo<dxCircularGauge>;

/**
 * 
 */
export type IncidentOccurredEvent = EventInfo<dxCircularGauge> & IncidentInfo;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxCircularGauge>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxCircularGauge> & ChangedOptionInfo;

/**
 * 
 */
export type TooltipHiddenEvent = EventInfo<dxCircularGauge> & TooltipInfo;

/**
 * 
 */
export type TooltipShownEvent = EventInfo<dxCircularGauge> & TooltipInfo;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxCircularGaugeOptions extends BaseGaugeOptions<dxCircularGauge> {
    /**
     * Specifies the properties required to set the geometry of the CircularGauge UI component.
     */
    geometry?: {
      /**
       * Specifies the end angle of the circular gauge&apos;s arc.
       */
      endAngle?: number;
      /**
       * Specifies the start angle of the circular gauge&apos;s arc.
       */
      startAngle?: number;
    };
    /**
     * 
     */
    centerTemplate?: template | ((component: dxCircularGauge, element: SVGGElement) => string | UserDefinedElement<SVGElement>);
    /**
     * Specifies gauge range container properties.
     */
    rangeContainer?: RangeContainer;
    /**
     * Specifies a gauge&apos;s scale properties.
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
     * Specifies the orientation of the range container in the CircularGauge UI component.
     */
    orientation?: CircularGaugeElementOrientation;
    /**
     * Specifies the range container&apos;s width in pixels.
     */
    width?: number;
};
/**
 * 
 */
export type Scale = BaseGaugeScale & {
    /**
     * Specifies common properties for scale labels.
     */
    label?: ScaleLabel;
    /**
     * Specifies the orientation of scale ticks.
     */
    orientation?: CircularGaugeElementOrientation;
};
/**
 * 
 */
export type ScaleLabel = BaseGaugeScaleLabel & {
    /**
     * Specifies which label to hide in case of overlapping.
     */
    hideFirstOrLast?: CircularGaugeLabelOverlap;
    /**
     * Specifies the spacing between scale labels and ticks.
     */
    indentFromTick?: number;
};
/**
 * The CircularGauge is a UI component that indicates values on a circular numeric scale.
 */
export default class dxCircularGauge extends BaseGauge<dxCircularGaugeOptions> { }

export type Properties = dxCircularGaugeOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxCircularGaugeOptions;

// #region deprecated in v23.1

/**
 * @deprecated Use RangeContainer instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type dxCircularGaugeRangeContainer = RangeContainer;

/**
 * @deprecated Use Scale instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type dxCircularGaugeScale = Scale;

/**
 * @deprecated Use ScaleLabel instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type dxCircularGaugeScaleLabel = ScaleLabel;

// #endregion


