﻿/**
* DevExpress Dashboard (_geo-point-map-item-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPointMapDashboardItemBaseSerializationsInfo = exports.enableClustering = exports.tooltipDimensions = exports.longitude = exports.latitude = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _map_item_1 = require("./_map-item");
exports.latitude = { propertyName: '__latitude', modelName: 'Latitude', displayName: 'DashboardStringId.Latitude', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.longitude = { propertyName: '__longitude', modelName: 'Longitude', displayName: 'DashboardStringId.Longitude', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.tooltipDimensions = { propertyName: '__tooltipDimensions', modelName: 'TooltipDimensions', displayName: 'DashboardWebStringId.Map.TooltipDimensions', array: true };
exports.enableClustering = { propertyName: 'enableClustering', modelName: '@EnableClustering', displayName: 'DashboardWebStringId.GeoPointMapClusterization', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.geoPointMapDashboardItemBaseSerializationsInfo = _map_item_1.mapDashboardItemSerializationsInfo.concat([exports.latitude, exports.longitude, exports.tooltipDimensions, exports.enableClustering]);
