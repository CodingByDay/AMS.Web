﻿/**
* DevExpress Dashboard (format-condition-top-bottom.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardFormatConditionTopBottomType, DashboardFormatConditionValueType } from '../../enums';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { FormatConditionStyleBase } from './format-condition-style-base';
export declare class FormatConditionTopBottom extends FormatConditionStyleBase {
    rank: ko.Observable<number>;
    rankType: ko.Observable<DashboardFormatConditionValueType>;
    topBottom: ko.Observable<DashboardFormatConditionTopBottomType>;
    _actualRankType: ko.PureComputed<DashboardFormatConditionValueType>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoButStyleSettings(): IDashboardSerializationInfoArray;
    getSpecificType: () => DashboardFormatConditionTopBottomType;
    setSpecificType: (type: DashboardFormatConditionTopBottomType) => void;
}
