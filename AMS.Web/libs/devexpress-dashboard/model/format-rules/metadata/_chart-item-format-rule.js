﻿/**
* DevExpress Dashboard (_chart-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartItemFormatRuleSerializationsInfo = exports.applyToChartElement = exports.dataItemApplyToName = void 0;
const _chart_item_format_rule_base_1 = require("./_chart-item-format-rule-base");
exports.dataItemApplyToName = { propertyName: 'dataItemApplyToName', modelName: '@SeriesId', displayName: 'DashboardStringId.FormatRuleApplyTo', simpleFormAdapterItem: 'selectBoxEditor' };
exports.applyToChartElement = { propertyName: 'applyToChartElement', modelName: '@ApplyToChartElement', displayName: 'DashboardStringId.FormatRuleApplyToChartElement', defaultVal: 'Point',
    simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'Point': 'DashboardStringId.ChartElementPointCaption',
        'LineOrArea': 'DashboardStringId.ChartElementLineOrAreaCaption'
    }
};
exports.chartItemFormatRuleSerializationsInfo = _chart_item_format_rule_base_1.chartItemFormatRuleSerializationsInfoBase.concat([exports.dataItemApplyToName, exports.applyToChartElement]);
