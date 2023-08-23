﻿/**
* DevExpress Dashboard (scatter-chart-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScatterChartItemFormatRule = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const chart_item_format_rule_base_1 = require("./chart-item-format-rule-base");
const _chart_item_format_rule_base_1 = require("./metadata/_chart-item-format-rule-base");
class ScatterChartItemFormatRule extends chart_item_format_rule_base_1.ChartItemFormatRuleBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    _getDefaultItemType() {
        return 'ScatterChartItemFormatRule';
    }
    getInfo() {
        return _chart_item_format_rule_base_1.chartItemFormatRuleSerializationsInfoBase;
    }
}
exports.ScatterChartItemFormatRule = ScatterChartItemFormatRule;
