﻿/**
* DevExpress Dashboard (format-condition-min-max-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardFormatConditionValueType } from '../../enums';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { FormatConditionStyleBase } from './format-condition-style-base';
export declare abstract class FormatConditionMinMaxBase extends FormatConditionStyleBase {
    minimumType: ko.Observable<DashboardFormatConditionValueType>;
    maximumType: ko.Observable<DashboardFormatConditionValueType>;
    minimum: ko.Observable<number>;
    maximum: ko.Observable<number>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoButStyleSettings(): IDashboardSerializationInfoArray;
}
