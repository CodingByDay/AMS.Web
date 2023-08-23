﻿/**
* DevExpress Dashboard (_gauge.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaugeSerializationsInfo = exports.scaleLabelNumericFormat = exports.maximum = exports.minimum = void 0;
const data_item_format_1 = require("../../../data-item/data-item-format");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _kpi_element_1 = require("../../kpi/metadata/_kpi-element");
exports.minimum = { propertyName: 'minimum', modelName: '@Minimum', displayName: 'DashboardWebStringId.Gauge.Min', defaultVal: NaN, from: _base_metadata_1.floatFromModel, toJsonObject: _base_metadata_1.nullableFloatToModel };
exports.maximum = { propertyName: 'maximum', modelName: '@Maximum', displayName: 'DashboardWebStringId.Gauge.Max', defaultVal: NaN, from: _base_metadata_1.floatFromModel, toJsonObject: _base_metadata_1.nullableFloatToModel };
exports.scaleLabelNumericFormat = { propertyName: 'scaleLabelNumericFormat', modelName: 'ScaleLabelNumericFormat', displayName: 'DashboardWebStringId.TextBoxFormatText', type: data_item_format_1.DataItemNumericFormat };
exports.gaugeSerializationsInfo = _kpi_element_1.kpiElementSerializationsInfo.concat([exports.minimum, exports.maximum, exports.scaleLabelNumericFormat]);
