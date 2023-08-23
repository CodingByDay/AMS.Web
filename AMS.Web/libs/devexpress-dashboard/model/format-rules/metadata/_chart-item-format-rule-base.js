﻿/**
* DevExpress Dashboard (_chart-item-format-rule-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartItemFormatRuleSerializationsInfoBase = exports.dataItemName = exports.displayName = exports.showInLegend = void 0;
const _dashboard_item_format_rule_1 = require("./_dashboard-item-format-rule");
exports.showInLegend = { propertyName: 'showInLegend', modelName: '@ShowInLegend', displayName: 'DashboardStringId.FormatRuleDisplayInLegend', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor' };
exports.displayName = { propertyName: 'displayName', modelName: '@DisplayName', displayName: 'DashboardStringId.FormatRuleDisplayName', simpleFormAdapterItem: 'textBoxEditor' };
exports.dataItemName = { propertyName: 'dataItemName', modelName: '@DataItem', displayName: 'DashboardWebStringId.ConditionalFormatting.CalculatedBy', simpleFormAdapterItem: 'selectBoxEditor' };
exports.chartItemFormatRuleSerializationsInfoBase = _dashboard_item_format_rule_1.dashboardItemFormatRuleSerializationsInfo.concat([exports.showInLegend, exports.displayName, exports.dataItemName]);
