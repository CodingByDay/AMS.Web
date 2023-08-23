﻿/**
* DevExpress Dashboard (card-item-delta-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardItemDeltaFormatRule = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const card_item_format_rule_base_1 = require("./card-item-format-rule-base");
const _card_item_delta_format_rule_1 = require("./metadata/_card-item-delta-format-rule");
class CardItemDeltaFormatRule extends card_item_format_rule_base_1.CardItemFormatRuleBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _card_item_delta_format_rule_1.cardItemDeltaFormatRuleSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'CardItemDeltaFormatRule';
    }
}
exports.CardItemDeltaFormatRule = CardItemDeltaFormatRule;
