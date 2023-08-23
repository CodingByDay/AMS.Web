﻿/**
* DevExpress Dashboard (_chorolpeth-map.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deltaMapSerializationsInfo = exports.deltaName = exports.actualValueName = exports.deltaMapDeltaOptions = exports.deltaMapTargetValue = exports.deltaMapActualValue = exports.valueMapSerializationsInfo = exports.chorolpethMapValue = exports.valueName = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const delta_options_1 = require("../../options/delta-options");
exports.valueName = { propertyName: 'valueName', modelName: '@ValueName', displayName: 'DashboardWebStringId.Map.TooltipCaption', simpleFormAdapterItem: 'textBoxEditor' };
exports.chorolpethMapValue = { propertyName: _base_metadata_1.valuePropertyName, modelName: 'Value', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.valueMapSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.chorolpethMapValue, exports.valueName];
exports.deltaMapActualValue = { propertyName: _base_metadata_1.actualValuePropertyName, modelName: 'ActualValue', displayName: 'DashboardStringId.ActualValueCaption', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.deltaMapTargetValue = { propertyName: _base_metadata_1.targetValuePropertyName, modelName: 'TargetValue', displayName: 'DashboardStringId.TargetValueCaption', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.deltaMapDeltaOptions = { propertyName: 'deltaOptions', modelName: 'DeltaOptions', displayName: 'DashboardWebStringId.Grid.DeltaOptions', type: delta_options_1.DeltaOptions };
exports.actualValueName = { propertyName: 'actualValueName', modelName: '@ActualValueName', displayName: 'DashboardWebStringId.Map.TooltipActualValueCaption', simpleFormAdapterItem: 'textBoxEditor' };
exports.deltaName = { propertyName: 'deltaName', modelName: '@DeltaName', displayName: 'DashboardWebStringId.Map.TooltipDeltaCaption', simpleFormAdapterItem: 'textBoxEditor' };
exports.deltaMapSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.deltaMapActualValue, exports.deltaMapTargetValue, exports.actualValueName, exports.deltaName, exports.deltaMapDeltaOptions, _data_item_1.absoluteVariationNumericFormat, _data_item_1.percentVariationNumericFormat, _data_item_1.percentOfTargetNumericFormat];
