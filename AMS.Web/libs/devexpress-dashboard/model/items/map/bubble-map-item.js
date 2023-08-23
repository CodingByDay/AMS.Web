﻿/**
* DevExpress Dashboard (bubble-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BubbleMapItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const geo_point_map_item_base_1 = require("./geo-point-map-item-base");
const _bubble_map_item_1 = require("./metadata/_bubble-map-item");
class BubbleMapItem extends geo_point_map_item_base_1.GeoPointMapItemBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._attachDataItem(this, _bubble_map_item_1.bubbleMapWeight.propertyName);
        this._attachDataItem(this, _bubble_map_item_1.bubbleMapColor.propertyName);
    }
    _getInfoCore() {
        return _bubble_map_item_1.bubbleMapDashboardItemSerializationsInfo;
    }
    _clearBindings() {
        super._clearBindings();
        this.__weight.uniqueName(null);
        this.__color.uniqueName(null);
    }
    _getDefaultItemType() {
        return 'BubbleMap';
    }
}
exports.BubbleMapItem = BubbleMapItem;
serializable_model_1.itemTypesMap['BubbleMap'] = { type: BubbleMapItem, groupName: 'maps', title: 'DashboardWebStringId.DefaultNameBubbleMapItem', index: 230 };
