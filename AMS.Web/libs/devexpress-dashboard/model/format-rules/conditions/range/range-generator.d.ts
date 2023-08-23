﻿/**
* DevExpress Dashboard (range-generator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Color } from '../../../color';
import { StyleSettingsBase } from '../../style-settings/style-settings-base';
import { FormatConditionRangeBase } from './format-condition-range-base';
import { FormatConditionRangeGradient } from './format-condition-range-gradient';
import { FormatConditionRangeSet } from './format-condition-range-set';
import { FormatConditionRangeGradientPredefinedType, FormatConditionRangeSetPredefinedType } from './range-converter';
export declare class FormatConditionRangeGenerator {
    static generateRangeSet(condition: FormatConditionRangeSet, type: FormatConditionRangeSetPredefinedType): void;
    static generateGradientByType(condition: FormatConditionRangeGradient, type: FormatConditionRangeGradientPredefinedType, segmentNumber: number, isBar?: boolean): void;
    static generateGradientByStyles(condition: FormatConditionRangeGradient, styles: Array<StyleSettingsBase>, segmentNumber: number): void;
    static generateGradientColors(gradientType: FormatConditionRangeGradientPredefinedType, count: number): Array<Color>;
    static getPredefinedType(actualStyles: Array<StyleSettingsBase>, func: (type: FormatConditionRangeSetPredefinedType) => FormatConditionRangeBase): FormatConditionRangeSetPredefinedType;
    static getGradientPredefinedType(actualStyles: Array<StyleSettingsBase>, func: (type: FormatConditionRangeGradientPredefinedType) => FormatConditionRangeBase): FormatConditionRangeGradientPredefinedType;
    static calculateRangePercentValues(segmentCount: number): Array<number>;
    static compareValues(val1: any, val2: any, changeType: boolean): number;
    private static _isStylesEqual;
    private static _getPercentRangeStops;
    private static _calculateRangePercent;
    private static _generateRangeSet;
    private static _calculateRangeDate;
}
