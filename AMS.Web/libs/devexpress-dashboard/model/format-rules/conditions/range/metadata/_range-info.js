﻿/**
* DevExpress Dashboard (_range-info.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeInfoSerializationsInfo = exports.rangeValueComparison = exports.rangeValue = void 0;
const _base_metadata_1 = require("../../../../metadata/_base-metadata");
const format_rules_common_1 = require("../../../format-rules-common");
exports.rangeValue = { propertyName: 'value', modelName: 'Value', displayName: 'DashboardStringId.CommandFormatRuleValue', type: format_rules_common_1.ComplexValue };
exports.rangeValueComparison = {
    propertyName: 'valueComparison', modelName: '@ValueComparison', displayName: 'DashboardWebStringId.ConditionalFormatting.ValueComparison', defaultVal: 'GreaterOrEqual', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Greater': '>',
        'GreaterOrEqual': '≥'
    }
};
exports.rangeInfoSerializationsInfo = [_base_metadata_1.itemType, exports.rangeValue, exports.rangeValueComparison];
