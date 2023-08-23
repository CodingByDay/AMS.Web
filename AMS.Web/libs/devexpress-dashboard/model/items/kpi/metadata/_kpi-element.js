﻿/**
* DevExpress Dashboard (_kpi-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kpiElementSerializationsInfo = exports.kpiItemTargetValue = exports.kpiItemActualValue = exports.kpiItemdeltaOptions = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const delta_options_1 = require("../../options/delta-options");
exports.kpiItemdeltaOptions = { propertyName: 'deltaOptions', modelName: 'DeltaOptions', displayName: 'DashboardWebStringId.Grid.DeltaOptions', type: delta_options_1.DeltaOptions };
exports.kpiItemActualValue = { propertyName: _base_metadata_1.actualValuePropertyName, modelName: 'ActualValue', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.ActualValueCaption' };
exports.kpiItemTargetValue = { propertyName: _base_metadata_1.targetValuePropertyName, modelName: 'TargetValue', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.TargetValueCaption' };
exports.kpiElementSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.kpiItemdeltaOptions, exports.kpiItemActualValue, exports.kpiItemTargetValue, _data_item_1.absoluteVariationNumericFormat, _data_item_1.percentVariationNumericFormat, _data_item_1.percentOfTargetNumericFormat];
