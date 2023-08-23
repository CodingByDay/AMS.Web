﻿/**
* DevExpress Dashboard (chart-item-format-rule-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardItemFormatRule } from './dashboard-item-format-rule';
export declare abstract class ChartItemFormatRuleBase extends DashboardItemFormatRule {
    showInLegend: ko.Observable<boolean>;
    displayName: ko.Observable<string>;
    dataItemName: ko.Observable<string>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
}
