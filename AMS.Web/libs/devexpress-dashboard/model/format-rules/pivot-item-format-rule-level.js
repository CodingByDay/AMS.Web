﻿/**
* DevExpress Dashboard (pivot-item-format-rule-level.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotItemFormatRuleLevel = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../serializable-model");
const _pivot_item_format_rule_level_1 = require("./metadata/_pivot-item-format-rule-level");
class PivotItemFormatRuleLevel extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _pivot_item_format_rule_level_1.pivotItemFormatRuleLevelSerializationsInfo;
    }
}
exports.PivotItemFormatRuleLevel = PivotItemFormatRuleLevel;
