/**
* DevExpress Dashboard (format-condition-range-gradient-bar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { StyleSettingsBase } from '../../style-settings/style-settings-base';
import { FormatConditionBarOptions } from '../format-condition-bar-options';
import { FormatConditionRangeGradient } from './format-condition-range-gradient';
import { FormatConditionRangeGradientPredefinedType } from './range-converter';
export declare class FormatConditionGradientRangeBar extends FormatConditionRangeGradient {
    barOptions: FormatConditionBarOptions;
    get _isApplyToRowColumnRestricted(): boolean;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    getActualPredefinedType(): FormatConditionRangeGradientPredefinedType;
    setActualPredefinedType(type: FormatConditionRangeGradientPredefinedType): void;
    protected _isGradientStop(style: StyleSettingsBase): boolean;
    protected _generateByDefault(segmentNumber: number): void;
}
