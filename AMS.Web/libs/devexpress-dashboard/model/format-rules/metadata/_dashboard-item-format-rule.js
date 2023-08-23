﻿/**
* DevExpress Dashboard (_dashboard-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardItemFormatRuleSerializationsInfo = exports.condition = exports.conditionTypes = exports.enabled = exports.classCaption = exports.formatRuleName = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const format_condition_average_1 = require("../conditions/format-condition-average");
const format_condition_bar_1 = require("../conditions/format-condition-bar");
const format_condition_date_occuring_1 = require("../conditions/format-condition-date-occuring");
const format_condition_expression_1 = require("../conditions/format-condition-expression");
const format_condition_top_bottom_1 = require("../conditions/format-condition-top-bottom");
const format_condition_value_1 = require("../conditions/format-condition-value");
const format_condition_range_color_bar_1 = require("../conditions/range/format-condition-range-color-bar");
const format_condition_range_gradient_1 = require("../conditions/range/format-condition-range-gradient");
const format_condition_range_gradient_bar_1 = require("../conditions/range/format-condition-range-gradient-bar");
const format_condition_range_set_1 = require("../conditions/range/format-condition-range-set");
exports.formatRuleName = {
    propertyName: 'name', modelName: '@Name', displayName: 'DashboardWebStringId.Options.Caption', simpleFormAdapterItem: 'textBoxEditor'
};
exports.classCaption = {
    propertyName: '_classCaption', displayName: 'DashboardWebStringId.Options.Caption', simpleFormAdapterItem: 'textBoxEditor'
};
exports.enabled = { propertyName: 'enabled', modelName: '@Enabled', displayName: 'DashboardWebStringId.TopNEnabled', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.conditionTypes = [
    { propertyName: 'conditionValue', displayName: 'DashboardStringId.CommandFormatRuleValue', modelName: 'FormatConditionValue', type: format_condition_value_1.FormatConditionValue },
    { propertyName: 'conditionTopBottom', displayName: 'DashboardStringId.CommandFormatRuleTopBottom', modelName: 'FormatConditionTopBottom', type: format_condition_top_bottom_1.FormatConditionTopBottom },
    { propertyName: 'conditionAverage', displayName: 'DashboardStringId.CommandFormatRuleAboveBelowAverage', modelName: 'FormatConditionAverage', type: format_condition_average_1.FormatConditionAverage },
    { propertyName: 'conditionDateOccuring', displayName: 'DashboardStringId.CommandFormatRuleDateOccurring', modelName: 'FormatConditionDateOccurring', type: format_condition_date_occuring_1.FormatConditionDateOccurring },
    { propertyName: 'conditionExpression', displayName: 'DashboardStringId.CommandFormatRuleExpression', modelName: 'FormatConditionExpression', type: format_condition_expression_1.FormatConditionExpression },
    { propertyName: 'conditionBar', displayName: 'DashboardStringId.CommandFormatRuleBar', modelName: 'FormatConditionBar', type: format_condition_bar_1.FormatConditionBar },
    { propertyName: 'conditionColorRangeBar', displayName: 'DashboardStringId.CommandFormatRuleColorRangeBar', modelName: 'FormatConditionColorRangeBar', type: format_condition_range_color_bar_1.FormatConditionColorRangeBar },
    { propertyName: 'conditionGradientRangeBar', displayName: 'DashboardWebStringId.ConditionalFormatting.GradientRangeBar', modelName: 'FormatConditionGradientRangeBar', type: format_condition_range_gradient_bar_1.FormatConditionGradientRangeBar },
    { propertyName: 'conditionRangeGradient', displayName: 'DashboardWebStringId.ConditionalFormatting.RangeGradient', modelName: 'FormatConditionRangeGradient', type: format_condition_range_gradient_1.FormatConditionRangeGradient },
    { propertyName: 'conditionRangeSet', displayName: 'DashboardStringId.CommandFormatRuleRangeSet', modelName: 'FormatConditionRangeSet', type: format_condition_range_set_1.FormatConditionRangeSet }
];
exports.condition = { propertyName: 'condition' };
exports.dashboardItemFormatRuleSerializationsInfo = [_base_metadata_1.itemType, exports.formatRuleName, exports.enabled, exports.condition].concat(exports.conditionTypes);
