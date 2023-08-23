﻿/**
* DevExpress Dashboard (_format-rules-common.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.barOptions = exports.styleSettings = exports.complexValueInfo = exports.complexValueValue = exports.complexValuePersistedValue = exports.complexValueType = exports.fieldTypes = exports.negativeInfinity = void 0;
const format_condition_bar_options_1 = require("../conditions/format-condition-bar-options");
exports.negativeInfinity = '-Infinity';
exports.fieldTypes = {
    Text: 'System.String',
    DateTime: 'System.DateTime',
    Bool: 'System.Boolean',
    Integer: 'System.Int32',
    Float: 'System.Single',
    Double: 'System.Double',
    Decimal: 'System.Decimal',
    Enum: 'Enum',
    Custom: 'Custom',
    Unknown: 'Unknown'
};
exports.complexValueType = { propertyName: 'type', modelName: '@Type', defaultVal: null };
exports.complexValuePersistedValue = { propertyName: '_persistedValue', modelName: '@Value', defaultVal: null };
exports.complexValueValue = { propertyName: 'value' };
exports.complexValueInfo = [exports.complexValueType, exports.complexValueValue, exports.complexValuePersistedValue];
exports.styleSettings = { propertyName: 'styleSettings', displayName: 'DashboardWebStringId.StyleSettings' };
exports.barOptions = { propertyName: 'barOptions', modelName: 'BarOptions', displayName: 'DashboardWebStringId.ConditionalFormatting.BarOptions', type: format_condition_bar_options_1.FormatConditionBarOptions };
