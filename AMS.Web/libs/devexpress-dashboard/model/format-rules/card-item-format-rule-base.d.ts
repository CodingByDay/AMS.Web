﻿/**
* DevExpress Dashboard (card-item-format-rule-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { CardFormatRuleRowElement } from './card-format-rule-row-element';
import { DashboardItemFormatRule } from './dashboard-item-format-rule';
export declare abstract class CardItemFormatRuleBase extends DashboardItemFormatRule {
    applyToCard: ko.Observable<boolean>;
    layoutItemApplyTo: ko.Computed<string>;
    cardLayoutElement: CardFormatRuleRowElement;
    constructor(modelJson?: any, serializer?: ModelSerializer);
}
