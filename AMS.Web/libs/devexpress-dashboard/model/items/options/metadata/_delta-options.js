﻿/**
* DevExpress Dashboard (_delta-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deltaOptionsSerializationsInfo = exports.cardDeltaOptionsSerializationsInfo = exports.resultIndicationThreshold = exports.resultIndicationThresholdType = exports.resultIndicationMode = exports.valueType = exports.deltaValueTypeMap = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.deltaValueTypeMap = {
    'ActualValue': 'DashboardStringId.DeltaValueTypeActualValueCaption',
    'AbsoluteVariation': 'DashboardStringId.DeltaValueTypeAbsoluteVariationCaption',
    'PercentVariation': 'DashboardStringId.DeltaValueTypePercentVariationCaption',
    'PercentOfTarget': 'DashboardStringId.DeltaValueTypePercentOfTargetCaption',
    'TargetValue': 'DashboardStringId.DeltaValueTypeTargetValueCaption'
};
exports.valueType = {
    propertyName: 'valueType', modelName: '@ValueType', displayName: 'DashboardWebStringId.Delta.ValueType', defaultVal: 'AbsoluteVariation', simpleFormAdapterItem: 'listEditor', values: exports.deltaValueTypeMap
};
exports.resultIndicationMode = {
    propertyName: 'resultIndicationMode', modelName: '@ResultIndicationMode', displayName: 'DashboardWebStringId.Delta.ResultIndication', defaultVal: 'GreaterIsGood', simpleFormAdapterItem: 'listEditor',
    values: {
        'GreaterIsGood': 'DashboardStringId.DeltaIndicationModeGreaterIsGoodCaption',
        'LessIsGood': 'DashboardStringId.DeltaIndicationModeLessIsGoodCaption',
        'WarningIfGreater': 'DashboardStringId.DeltaIndicationModeWarningIfGreaterCaption',
        'WarningIfLess': 'DashboardStringId.DeltaIndicationModeWarningIfLessCaption',
        'NoIndication': 'DashboardStringId.DeltaIndicationModeNoIndicationCaption'
    }
};
exports.resultIndicationThresholdType = {
    propertyName: 'resultIndicationThresholdType', modelName: '@ResultIndicationThresholdType', displayName: 'DashboardWebStringId.Delta.ThresholdType', defaultVal: 'Percent', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Absolute': 'DashboardStringId.DeltaThresholdTypeAbsolute',
        'Percent': 'DashboardStringId.DeltaThresholdTypePercent'
    }
};
exports.resultIndicationThreshold = { propertyName: 'resultIndicationThreshold', modelName: '@ResultIndicationThreshold', displayName: 'DashboardWebStringId.Delta.ThresholdValue', defaultVal: 0, simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.cardDeltaOptionsSerializationsInfo = [exports.resultIndicationMode, exports.resultIndicationThresholdType, exports.resultIndicationThreshold];
exports.deltaOptionsSerializationsInfo = [exports.valueType].concat(exports.cardDeltaOptionsSerializationsInfo);
