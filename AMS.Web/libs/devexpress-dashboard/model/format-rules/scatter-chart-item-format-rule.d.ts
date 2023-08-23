﻿/**
* DevExpress Dashboard (scatter-chart-item-format-rule.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ChartItemFormatRuleBase } from './chart-item-format-rule-base';
export declare class ScatterChartItemFormatRule extends ChartItemFormatRuleBase {
    constructor(modelJson?: any, serializer?: ModelSerializer);
    protected _getDefaultItemType(): string;
    getInfo(): ISerializationInfoArray;
}
