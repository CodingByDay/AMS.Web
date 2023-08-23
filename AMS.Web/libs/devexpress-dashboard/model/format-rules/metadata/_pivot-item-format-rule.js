﻿/**
* DevExpress Dashboard (_pivot-item-format-rule.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pivotItemFormatRuleSerializationsInfo = exports.pivotLevel = exports.intersectionLevelMode = exports.restrictedIntersectionLevelModeValues = exports.intersectionLevelModeValues = exports.applyToColumn = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const pivot_item_format_rule_level_1 = require("../pivot-item-format-rule-level");
const _cells_item_format_rule_1 = require("./_cells-item-format-rule");
exports.applyToColumn = { propertyName: 'applyToColumn', modelName: '@ApplyToColumn', displayName: 'DashboardStringId.FormatRuleApplyToColumn', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.intersectionLevelModeValues = {
    'Auto': 'DashboardStringId.IntersectionLevelModeAuto',
    'FirstLevel': 'DashboardStringId.IntersectionLevelModeFirst',
    'LastLevel': 'DashboardStringId.IntersectionLevelModeLast',
    'AllLevels': 'DashboardStringId.IntersectionLevelModeAll',
    'SpecificLevel': 'DashboardStringId.IntersectionLevelModeSpecific'
};
exports.restrictedIntersectionLevelModeValues = Object.assign({}, exports.intersectionLevelModeValues);
delete exports.restrictedIntersectionLevelModeValues['AllLevels'];
exports.intersectionLevelMode = {
    propertyName: 'intersectionLevelMode', modelName: '@IntersectionLevelMode', displayName: 'DashboardWebStringId.ConditionalFormatting.IntersectionLevelMode', defaultVal: 'Auto'
};
exports.pivotLevel = { propertyName: 'level', modelName: 'PivotItemFormatRuleLevel', type: pivot_item_format_rule_level_1.PivotItemFormatRuleLevel };
exports.pivotItemFormatRuleSerializationsInfo = _cells_item_format_rule_1.cellsItemFormatRuleSerializationsInfo.concat([exports.applyToColumn, exports.intersectionLevelMode, exports.pivotLevel]);
