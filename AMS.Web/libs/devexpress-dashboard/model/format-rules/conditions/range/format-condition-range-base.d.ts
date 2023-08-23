﻿/**
* DevExpress Dashboard (format-condition-range-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardFormatConditionValueType } from '../../../enums';
import { StyleSettingsBase } from '../../style-settings/style-settings-base';
import { FormatConditionBase } from '../format-condition-base';
import { RangeInfo } from './range-info';
import { RangeSet } from './range-set';
export declare abstract class FormatConditionRangeBase extends FormatConditionBase {
    valueType: ko.Observable<DashboardFormatConditionValueType>;
    rangeSet: RangeSet;
    get actualStyles(): Array<StyleSettingsBase>;
    get stopStyles(): Array<StyleSettingsBase>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    isValid(): boolean;
    isRange(): boolean;
    getSpecificType: () => any;
    setSpecificType: (specificType: any) => any;
    abstract getActualPredefinedType(): any;
    abstract setActualPredefinedType(specificType: any): any;
    setValues(values: Array<any>): void;
    createStyleSettings(styleListItem: any): any;
    protected _getSortedRanges(): Array<RangeInfo>;
    protected _getRangeIndexSettings(index: number): StyleSettingsBase;
}
