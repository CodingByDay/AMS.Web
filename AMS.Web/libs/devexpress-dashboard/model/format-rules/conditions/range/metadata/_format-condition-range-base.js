﻿/**
* DevExpress Dashboard (_format-condition-range-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionRangeBaseSerializationsInfo = exports.rangeSet = exports.rangeValueType = void 0;
const _format_condition_base_1 = require("../../metadata/_format-condition-base");
const range_set_1 = require("../range-set");
exports.rangeValueType = {
    propertyName: 'valueType', modelName: '@ValueType', displayName: 'DashboardWebStringId.Delta.ValueType', defaultVal: 'Automatic', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Number': 'DashboardStringId.FormatConditionNumberValueType',
        'Percent': 'DashboardStringId.FormatConditionPercentValueType',
        'Automatic': 'DashboardStringId.FormatConditionAutomaticValueType'
    }
};
exports.rangeSet = { propertyName: 'rangeSet', modelName: 'RangeSet', type: range_set_1.RangeSet };
exports.formatConditionRangeBaseSerializationsInfo = _format_condition_base_1.formatConditionBaseSerializationsInfo.concat([exports.rangeValueType, exports.rangeSet]);
