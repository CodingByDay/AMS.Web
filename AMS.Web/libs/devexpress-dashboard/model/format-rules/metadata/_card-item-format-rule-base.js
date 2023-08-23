﻿/**
* DevExpress Dashboard (_card-item-format-rule-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardItemFormatRuleSerializationsInfoBase = exports.cardLayoutElement = exports.layoutItemApplyTo = void 0;
const card_format_rule_row_element_1 = require("../card-format-rule-row-element");
const _card_format_rule_row_element_1 = require("./_card-format-rule-row-element");
const _dashboard_item_format_rule_1 = require("./_dashboard-item-format-rule");
exports.layoutItemApplyTo = { propertyName: 'layoutItemApplyTo', modelName: '@LayoutItemApplyTo', displayName: 'DashboardStringId.FormatRuleApplyTo', defaultVal: 'Title' };
exports.cardLayoutElement = { propertyName: 'cardLayoutElement', modelName: 'CardFormatRuleLayoutElement', displayName: 'DashboardStringId.FormatRuleApplyTo', type: card_format_rule_row_element_1.CardFormatRuleRowElement, info: _card_format_rule_row_element_1.cardFormatRuleRowElementSerializationsInfo };
exports.cardItemFormatRuleSerializationsInfoBase = _dashboard_item_format_rule_1.dashboardItemFormatRuleSerializationsInfo.concat([exports.cardLayoutElement, exports.layoutItemApplyTo]);
