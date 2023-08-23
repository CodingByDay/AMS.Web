﻿/**
* DevExpress Dashboard (format-condition-value.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardFormatCondition } from '../../enums';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { ComplexValue } from '../format-rules-common';
import { FormatConditionStyleBase } from './format-condition-style-base';
export declare class FormatConditionValue extends FormatConditionStyleBase {
    condition: ko.Observable<DashboardFormatCondition>;
    value1: ComplexValue;
    value2: ComplexValue;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoButStyleSettings(): IDashboardSerializationInfoArray;
    getSpecificType: () => DashboardFormatCondition;
    setSpecificType: (type: DashboardFormatCondition) => void;
}
