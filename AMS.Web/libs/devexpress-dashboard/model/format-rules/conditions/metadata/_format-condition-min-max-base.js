﻿/**
* DevExpress Dashboard (_format-condition-min-max-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatConditionMinMaxBaseSerializationsInfo = exports.formatConditionMaximum = exports.formatConditionMinimum = exports.maximumType = exports.minimumType = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _format_condition_style_base_1 = require("./_format-condition-style-base");
exports.minimumType = {
    propertyName: 'minimumType', modelName: '@MinimumType', displayName: 'DashboardWebStringId.ConditionalFormatting.MinimumType', defaultVal: 'Automatic', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Automatic': 'DashboardStringId.FormatConditionAutomaticValueType',
        'Number': 'DashboardStringId.FormatConditionNumberValueType',
        'Percent': 'DashboardStringId.FormatConditionPercentValueType'
    }
};
exports.maximumType = {
    propertyName: 'maximumType', modelName: '@MaximumType', displayName: 'DashboardWebStringId.ConditionalFormatting.MaximumType', defaultVal: 'Automatic', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Automatic': 'DashboardStringId.FormatConditionAutomaticValueType',
        'Number': 'DashboardStringId.FormatConditionNumberValueType',
        'Percent': 'DashboardStringId.FormatConditionPercentValueType'
    }
};
exports.formatConditionMinimum = { propertyName: 'minimum', modelName: '@Minimum', displayName: 'DashboardWebStringId.ConditionalFormatting.ConditionMinimum', defaultVal: 0, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.formatConditionMaximum = { propertyName: 'maximum', modelName: '@Maximum', displayName: 'DashboardWebStringId.ConditionalFormatting.ConditionMaximum', defaultVal: 0, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.formatConditionMinMaxBaseSerializationsInfo = _format_condition_style_base_1.formatConditionStyleBaseSerializationsInfo.concat([exports.minimumType, exports.maximumType, exports.formatConditionMinimum, exports.formatConditionMaximum]);
