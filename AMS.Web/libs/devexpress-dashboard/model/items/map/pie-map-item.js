﻿/**
* DevExpress Dashboard (pie-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieMapItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const serializable_model_1 = require("../../serializable-model");
const data_dashboard_item_1 = require("../data-dashboard-item");
const geo_point_map_item_base_1 = require("./geo-point-map-item-base");
const _pie_map_item_1 = require("./metadata/_pie-map-item");
class PieMapItem extends geo_point_map_item_base_1.GeoPointMapItemBase {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.values = ko.observableArray([]);
        this.__values = analytics_utils_1.deserializeArray(modelJson.Values, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_pie_map_item_1.pieMapValues);
        this._attachDataItem(this, _pie_map_item_1.pieMapArgument.propertyName);
        data_dashboard_item_1.DataDashboardItem._addColoringMeta([this.__argument]);
    }
    _clearBindings() {
        super._clearBindings();
        this.__values.removeAll();
        this.__argument.uniqueName(null);
    }
    _getInfoCore() {
        return _pie_map_item_1.pieMapDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'PieMap';
    }
    _getLayersCount() {
        return !!this.__values ? this.__values().length : 0;
    }
    _getLayerName() {
        return this._getDataItemDisplayName(this.__values()[this._selectedElementIndex() || 0].dataItem());
    }
    _getSliceDimensions() {
        return super._getSliceDimensions().concat(this.__argument);
    }
    _getIsDimensionColoredByDefault(dimension) {
        return this.__argument.dataItem() === dimension;
    }
    _getAreMeasuresColoredByDefault() {
        return this.__values().length > 1 && !this.__argument.dataItem();
    }
    _getCanColorByMeasures() { return true; }
    _getCanColorByDimensions() { return true; }
    _getColorizableDataItemsInfo() {
        return [{
                items: [this.__argument],
                prefixId: _base_metadata_1.BindingSectionTitles.SingleArgument
            }];
    }
}
__decorate([
    _utils_1.collectionItemType('Value')
], PieMapItem.prototype, "__values", void 0);
exports.PieMapItem = PieMapItem;
serializable_model_1.itemTypesMap['PieMap'] = { type: PieMapItem, groupName: 'maps', title: 'DashboardWebStringId.DefaultNamePieMapItem', index: 240 };
