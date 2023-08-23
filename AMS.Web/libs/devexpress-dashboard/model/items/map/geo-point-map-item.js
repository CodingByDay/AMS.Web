﻿/**
* DevExpress Dashboard (geo-point-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeoPointMapItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_item_1 = require("../../data-item/data-item");
const serializable_model_1 = require("../../serializable-model");
const geo_point_map_item_base_1 = require("./geo-point-map-item-base");
const _geo_point_map_item_1 = require("./metadata/_geo-point-map-item");
class GeoPointMapItem extends geo_point_map_item_base_1.GeoPointMapItemBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._attachDataItem(this, _geo_point_map_item_1.value.propertyName);
        this.__value._specifics.acceptableShapingType = data_item_1.AcceptableShapingType.String;
    }
    _getInfoCore() {
        return _geo_point_map_item_1.geoPointMapDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'GeoPointMap';
    }
}
exports.GeoPointMapItem = GeoPointMapItem;
serializable_model_1.itemTypesMap['GeoPointMap'] = { type: GeoPointMapItem, groupName: 'maps', title: 'DashboardWebStringId.DefaultNameGeoPointMapItem', index: 210 };
