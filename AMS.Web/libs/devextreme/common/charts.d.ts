/**
* DevExtreme (common/charts.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type AnimationEaseMode = 'easeOutCubic' | 'linear';

export type AnnotationType = 'text' | 'image' | 'custom';

export type ArgumentAxisHoverMode = 'allArgumentPoints' | 'none';

export type AxisScaleType = 'continuous' | 'discrete' | 'logarithmic';

export type ChartsAxisLabelOverlap = 'rotate' | 'stagger' | 'none' | 'hide';

export type ChartsLabelOverlap = 'hide' | 'none' | 'stack';

export type ChartsDataType = 'datetime' | 'numeric' | 'string';

export type DashStyle = 'dash' | 'dot' | 'longDash' | 'solid';

export type DiscreteAxisDivisionMode = 'betweenLabels' | 'crossLabels';

export type HatchDirection = 'left' | 'none' | 'right';

export type LabelOverlap = 'hide' | 'none';

export type ShiftLabelOverlap = 'hide' | 'none' | 'shift';

export type LabelPosition = 'columns' | 'inside' | 'outside';

export type LegendHoverMode = 'excludePoints' | 'includePoints' | 'none';

export type LegendMarkerState = 'normal' | 'hovered' | 'selected';

export type Palette = 'Bright' | 'Harmony Light' | 'Ocean' | 'Pastel' | 'Soft' | 'Soft Pastel' | 'Vintage' | 'Violet' | 'Carmine' | 'Dark Moon' | 'Dark Violet' | 'Green Mist' | 'Soft Blue' | 'Material' | 'Office';

export type PaletteColorSet = 'simpleSet' | 'indicatingSet' | 'gradientSet';

export type PaletteExtensionMode = 'alternate' | 'blend' | 'extrapolate';

export type PointInteractionMode = 'allArgumentPoints' | 'allSeriesPoints' | 'none' | 'onlyPoint';

export type PointSymbol = 'circle' | 'cross' | 'polygon' | 'square' | 'triangle' | 'triangleDown' | 'triangleUp';

export type RelativePosition = 'inside' | 'outside';

/**
 * A class describing a scale break range. Inherited by scale breaks in the Chart and RangeSelector.
 */
export type ScaleBreak = {
    /**
     * Along with the startValue property, limits the scale break.
     */
    endValue?: number | Date | string;
    /**
     * Along with the endValue property, limits the scale break.
     */
    startValue?: number | Date | string;
};

export type ScaleBreakLineStyle = 'straight' | 'waved';

export type SeriesType = 'area' | 'bar' | 'bubble' | 'candlestick' | 'fullstackedarea' | 'fullstackedbar' | 'fullstackedline' | 'fullstackedspline' | 'fullstackedsplinearea' | 'line' | 'rangearea' | 'rangebar' | 'scatter' | 'spline' | 'splinearea' | 'stackedarea' | 'stackedbar' | 'stackedline' | 'stackedspline' | 'stackedsplinearea' | 'steparea' | 'stepline' | 'stock';

export type SeriesHoverMode = 'allArgumentPoints' | 'allSeriesPoints' | 'excludePoints' | 'includePoints' | 'nearestPoint' | 'none' | 'onlyPoint';

export type SeriesSelectionMode = 'allArgumentPoints' | 'allSeriesPoints' | 'excludePoints' | 'includePoints' | 'none' | 'onlyPoint';

export type TextOverflow = 'ellipsis' | 'hide' | 'none';

export type Theme = 'generic.dark' | 'generic.light' | 'generic.contrast' | 'generic.carmine' | 'generic.darkmoon' | 'generic.darkviolet' | 'generic.greenmist' | 'generic.softblue' | 'material.blue.light' | 'material.lime.light' | 'material.orange.light' | 'material.purple.light' | 'material.teal.light';

export type TimeInterval = 'day' | 'hour' | 'millisecond' | 'minute' | 'month' | 'quarter' | 'second' | 'week' | 'year';

/**
 * A class describing various time intervals. Inherited by tick intervals in Chart and RangeSelector.
 */
export type TimeIntervalConfig = number | {
    /**
     * Specifies the time interval measured in days. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    days?: number;
    /**
     * Specifies the time interval measured in hours. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    hours?: number;
    /**
     * Specifies the time interval measured in milliseconds. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    milliseconds?: number;
    /**
     * Specifies the time interval measured in minutes. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    minutes?: number;
    /**
     * Specifies the time interval measured in months. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    months?: number;
    /**
     * Specifies the time interval measured in quarters. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    quarters?: number;
    /**
     * Specifies the time interval measured in seconds. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    seconds?: number;
    /**
     * Specifies the time interval measured in weeks. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    weeks?: number;
    /**
     * Specifies the time interval measured in years. Accepts integer values. Available only for an axis/scale that displays date-time values.
     */
    years?: number;
} | TimeInterval;

export type ValueErrorBarDisplayMode = 'auto' | 'high' | 'low' | 'none';

export type ValueErrorBarType = 'fixed' | 'percent' | 'stdDeviation' | 'stdError' | 'variance';

/**
 * 
 */
export type VisualRange = {
    /**
     * 
     */
    endValue?: number | Date | string;
    /**
     * 
     */
    length?: TimeIntervalConfig;
    /**
     * 
     */
    startValue?: number | Date | string;
};

export type VisualRangeUpdateMode = 'auto' | 'keep' | 'reset' | 'shift';

export type WordWrap = 'normal' | 'breakWord' | 'none';

export type ZoomPanAction = 'zoom' | 'pan';

/**
 * 
 */
export type ChartsColor = {
    /**
     * 
     */
    base?: string;
    /**
     * 
     */
    fillId?: string;
};

/**
 * 
 */
export function registerGradient(type: string, options: { rotationAngle?: number; colors: Array<GradientColor> }): string;
/**
 * 
 */
export function registerPattern(options: { width: number | string; height: number | string; template: (container: SVGGElement) => void }): string;
/**
 * 
 */
export type GradientColor = {
   /**
     * 
     */
    offset: number | string;
   /**
     * 
     */
    color: string;
};
