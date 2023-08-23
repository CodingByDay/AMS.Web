﻿/**
* DevExpress Dashboard (_pie-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieMapDashboardItemSerializationsInfo = exports.isWeighted = exports.pieMapValues = exports.pieMapArgument = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _coloring_options_1 = require("../../options/metadata/_coloring-options");
const _geo_point_map_item_base_1 = require("./_geo-point-map-item-base");
const _map_item_1 = require("./_map-item");
exports.pieMapArgument = { propertyName: _base_metadata_1.argumentPropertyName, modelName: 'Argument', displayName: 'DashboardStringId.DescriptionItemArgument', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.pieMapValues = { propertyName: _base_metadata_1.valuesPropertyName, modelName: 'Values', displayName: 'DashboardStringId.DescriptionValues', array: true };
exports.isWeighted = { propertyName: 'isWeighted', modelName: '@IsWeighted', displayName: 'DashboardWebStringId.PieMapIsWeighted', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.pieMapDashboardItemSerializationsInfo = _geo_point_map_item_base_1.geoPointMapDashboardItemBaseSerializationsInfo.concat([exports.pieMapArgument, exports.pieMapValues, exports.isWeighted, _map_item_1.colorLegend, _map_item_1.weightedLegend, _coloring_options_1.coloringOptions]);
