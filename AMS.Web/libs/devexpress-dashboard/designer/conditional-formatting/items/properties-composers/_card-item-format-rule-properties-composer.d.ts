﻿/**
* DevExpress Dashboard (_card-item-format-rule-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { CardItemDeltaFormatRule } from '../../../../model/format-rules/card-item-delta-format-rule';
import { CardItemFormatRule } from '../../../../model/format-rules/card-item-format-rule';
import { DashboardItemFormatRule } from '../../../../model/format-rules/dashboard-item-format-rule';
import { CardItem } from '../../../../model/items/card/card-item';
import { ConditionTypesFilters } from '../../_condition-type-editor';
import { FormatRulePropertiesComposer } from './_shared-format-rule-properties-composer';
export declare function isDataItemFormatRuleAvaliable(dashboardItem: CardItem): boolean;
export declare function createCardItemFormatRulePropertiesComposer(selectedRuleContainer: ko.Observable<DashboardItemFormatRule>): FormatRulePropertiesComposer<CardItemFormatRule, CardItem>;
export declare function isDeltaFormatRuleAvaliable(dashboardItem: CardItem): boolean;
export declare function createCardItemDeltaFormatRulePropertiesComposer(selectedRuleContainer: ko.Observable<DashboardItemFormatRule>): FormatRulePropertiesComposer<CardItemDeltaFormatRule, CardItem>;
export declare let cardItemConditionTypeFilters: ConditionTypesFilters;
