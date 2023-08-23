﻿/**
* DevExpress Dashboard (_cells-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cellsItemFormatRuleSerializationsInfo = exports.dataItemApplyTo = exports.formatRuleDataItem = exports.applyToRow = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _dashboard_item_format_rule_1 = require("./_dashboard-item-format-rule");
exports.applyToRow = { propertyName: 'applyToRow', modelName: '@ApplyToRow', displayName: 'DashboardStringId.FormatRuleApplyToRow', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.formatRuleDataItem = { propertyName: 'dataItemName', modelName: '@DataItem', displayName: 'DashboardWebStringId.ConditionalFormatting.CalculatedBy', simpleFormAdapterItem: 'selectBoxEditor' };
exports.dataItemApplyTo = { propertyName: '_dataItemApplyToName', modelName: '@DataItemApplyTo', displayName: 'DashboardStringId.FormatRuleApplyTo', simpleFormAdapterItem: 'selectBoxEditor' };
exports.cellsItemFormatRuleSerializationsInfo = _dashboard_item_format_rule_1.dashboardItemFormatRuleSerializationsInfo.concat([exports.applyToRow, exports.formatRuleDataItem, exports.dataItemApplyTo]);
