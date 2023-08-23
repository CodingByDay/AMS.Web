﻿/**
* DevExpress Dashboard (format-condition-range-gradient.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Color } from '../../../color';
import { StyleSettingsBase } from '../../style-settings/style-settings-base';
import { FormatConditionRangeBase } from './format-condition-range-base';
import { FormatConditionRangeGradientPredefinedType } from './range-converter';
import { RangeInfo } from './range-info';
export declare class FormatConditionRangeGradient extends FormatConditionRangeBase {
    protected static isGradientStop(predefined: string, color: Color): boolean;
    segmentNumber: ko.Computed<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    isGradient(): boolean;
    getInfo(): ISerializationInfoArray;
    getActualPredefinedType(): FormatConditionRangeGradientPredefinedType;
    setActualPredefinedType(type: FormatConditionRangeGradientPredefinedType): void;
    getSpecificType: () => FormatConditionRangeGradientPredefinedType;
    setSpecificType: (specificType: any) => void;
    protected _generateByDefault(segmentNumber: number): void;
    generateAsPercent(startStyle: StyleSettingsBase, endStyle: StyleSettingsBase, segmentNumber: number): void;
    generateAsNumber(startStyle: StyleSettingsBase, endStyle: StyleSettingsBase, values: Array<any>): void;
    protected _getRangeIndexSettings(index: number): StyleSettingsBase;
    protected _getSortedRanges(): Array<RangeInfo>;
    protected _generate(startStyle: StyleSettingsBase, endStyle: StyleSettingsBase, rangeCount: number): void;
    protected _isGradientStop(style: StyleSettingsBase): boolean;
    private _validateStyle;
}
