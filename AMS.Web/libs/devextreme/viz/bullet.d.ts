/**
* DevExtreme (viz/bullet.d.ts)
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

import BaseSparkline, {
    BaseSparklineOptions,
} from './sparklines/base_sparkline';

/**
 * 
 */
export type DisposingEvent = EventInfo<dxBullet>;

/**
 * 
 */
export type DrawnEvent = EventInfo<dxBullet>;

/**
 * 
 */
export type ExportedEvent = EventInfo<dxBullet>;

/**
 * 
 */
export type ExportingEvent = EventInfo<dxBullet> & ExportInfo;

/**
 * 
 */
export type FileSavingEvent = FileSavingEventInfo<dxBullet>;

/**
 * 
 */
export type IncidentOccurredEvent = EventInfo<dxBullet> & IncidentInfo;

/**
 * 
 */
export type InitializedEvent = InitializedEventInfo<dxBullet>;

/**
 * 
 */
export type OptionChangedEvent = EventInfo<dxBullet> & ChangedOptionInfo;

/**
 * 
 */
export type TooltipHiddenEvent = EventInfo<dxBullet>;

/**
 * 
 */
export type TooltipShownEvent = EventInfo<dxBullet>;

/**
 * 
 * @deprecated 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export interface dxBulletOptions extends BaseSparklineOptions<dxBullet> {
    /**
     * Specifies a color for the bullet bar.
     */
    color?: string;
    /**
     * Specifies an end value for the invisible scale.
     */
    endScaleValue?: number;
    /**
     * Specifies whether or not to show the target line.
     */
    showTarget?: boolean;
    /**
     * Specifies whether or not to show the line indicating zero on the invisible scale.
     */
    showZeroLevel?: boolean;
    /**
     * Specifies a start value for the invisible scale.
     */
    startScaleValue?: number;
    /**
     * Specifies the value indicated by the target line.
     */
    target?: number;
    /**
     * Specifies a color for both the target and zero level lines.
     */
    targetColor?: string;
    /**
     * Specifies the width of the target line.
     */
    targetWidth?: number;
    /**
     * Specifies the primary value indicated by the bullet bar.
     */
    value?: number;
}
/**
 * The Bullet UI component is useful when you need to compare a single measure to a target value. The UI component comprises a horizontal bar indicating the measure and a vertical line indicating the target value.
 */
export default class dxBullet extends BaseSparkline<dxBulletOptions> { }

export type Properties = dxBulletOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please submit a ticket to our {@link https://supportcenter.devexpress.com/ticket/create Support Center}. We will check if there is an alternative solution.
 */
export type Options = dxBulletOptions;


