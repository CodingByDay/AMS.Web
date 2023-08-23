﻿/**
* DevExpress Dashboard (format-condition-range-color-bar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { FormatConditionBarOptions } from '../format-condition-bar-options';
import { FormatConditionRangeSet } from './format-condition-range-set';
import { FormatConditionRangeSetPredefinedType } from './range-converter';
export declare class FormatConditionColorRangeBar extends FormatConditionRangeSet {
    barOptions: FormatConditionBarOptions;
    get _isApplyToRowColumnRestricted(): boolean;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    getActualPredefinedType(): FormatConditionRangeSetPredefinedType;
    setActualPredefinedType(type: FormatConditionRangeSetPredefinedType): void;
    createStyleSettings(styleListItem: any): any;
}
