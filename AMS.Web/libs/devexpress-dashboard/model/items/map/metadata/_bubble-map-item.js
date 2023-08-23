﻿/**
* DevExpress Dashboard (_bubble-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleMapDashboardItemSerializationsInfo = exports.bubbleMapColor = exports.bubbleMapWeight = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _geo_point_map_item_base_1 = require("./_geo-point-map-item-base");
const _map_item_1 = require("./_map-item");
exports.bubbleMapWeight = { propertyName: _base_metadata_1.weightPropertyName, modelName: 'Weight', displayName: 'DashboardStringId.WeightCaption', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.bubbleMapColor = { propertyName: _base_metadata_1.colorPropertyName, modelName: 'Color', displayName: 'DashboardStringId.DescriptionItemColor', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.bubbleMapDashboardItemSerializationsInfo = _geo_point_map_item_base_1.geoPointMapDashboardItemBaseSerializationsInfo.concat([exports.bubbleMapWeight, exports.bubbleMapColor, _map_item_1.colorLegend, _map_item_1.weightedLegend]);
