﻿/**
* DevExpress Dashboard (range-info.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardFormatConditionComparisonType } from '../../../enums';
import { TypedSerializableModel } from '../../../serializable-model';
import { ComplexValue } from '../../format-rules-common';
import { StyleSettingsBase } from '../../style-settings/style-settings-base';
export declare class RangeInfo extends TypedSerializableModel {
    styleSettings: ko.Observable<StyleSettingsBase>;
    value: ComplexValue;
    valueComparison: ko.Observable<DashboardFormatConditionComparisonType>;
    private _styleSettingsType;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    clone(): RangeInfo;
    protected _getDefaultItemType(): string;
}
