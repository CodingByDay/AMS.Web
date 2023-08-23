﻿/**
* DevExpress Dashboard (_chart-item-format-rule-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ScatterChartItemFormatRule } from '../../../../model';
import { ChartItemFormatRule } from '../../../../model/format-rules/chart-item-format-rule';
import { ChartItem } from '../../../../model/items/chart/chart-item';
import { AccordionTab } from '../../../properties-controller/_accordion-tab';
import { ConditionTypesFilters } from '../../_condition-type-editor';
import { FormatRulePropertiesComposer } from './_shared-format-rule-properties-composer';
export declare function createChartItemFormatRulePropertiesComposer(): FormatRulePropertiesComposer<ChartItemFormatRule, ChartItem>;
export declare const chartFormatRuleConditionFilters: ConditionTypesFilters;
export declare function getChartFormatRuleLegendSettingsTab<T extends ChartItemFormatRule | ScatterChartItemFormatRule>(formatRule: T): AccordionTab[];
