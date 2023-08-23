﻿/**
* DevExpress Dashboard (chart-item-format-rule-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartItemFormatRuleBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const dashboard_item_format_rule_1 = require("./dashboard-item-format-rule");
const _dashboard_item_format_rule_1 = require("./metadata/_dashboard-item-format-rule");
const color_style_settings_1 = require("./style-settings/color-style-settings");
class ChartItemFormatRuleBase extends dashboard_item_format_rule_1.DashboardItemFormatRule {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        if (!this.condition()) {
            _dashboard_item_format_rule_1.conditionTypes
                .map(type => type.propertyName)
                .forEach(propertyName => this[propertyName] && this[propertyName].styleSettings && this[propertyName].styleSettings(new color_style_settings_1.ColorStyleSettings({})));
        }
    }
}
exports.ChartItemFormatRuleBase = ChartItemFormatRuleBase;
