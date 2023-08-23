﻿/**
* DevExpress Dashboard (_card-item-delta-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardItemDeltaFormatRuleSerializationsInfo = exports.cardId = exports.deltaValueType = void 0;
const _card_item_format_rule_base_1 = require("./_card-item-format-rule-base");
exports.deltaValueType = { propertyName: 'deltaValueType', modelName: '@DeltaValueType', defaultVal: 'AbsoluteVariation', displayName: 'DashboardWebStringId.Delta.ValueType' };
exports.cardId = { propertyName: 'cardId', modelName: '@CardId' };
exports.cardItemDeltaFormatRuleSerializationsInfo = _card_item_format_rule_base_1.cardItemFormatRuleSerializationsInfoBase.concat([exports.deltaValueType, exports.cardId]);
