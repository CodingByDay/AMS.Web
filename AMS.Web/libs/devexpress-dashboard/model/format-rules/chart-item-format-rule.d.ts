﻿/**
* DevExpress Dashboard (chart-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { FormatRuleChartElement } from '../enums';
import { ChartItemFormatRuleBase } from './chart-item-format-rule-base';
export declare class ChartItemFormatRule extends ChartItemFormatRuleBase {
    dataItemApplyToName: ko.Observable<string>;
    applyToChartElement: ko.Observable<FormatRuleChartElement>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getDefaultItemType(): string;
    getInfo(): ISerializationInfoArray;
}
