﻿/**
* DevExpress Dashboard (series-item.js)
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
exports.SeriesItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../data-item/data-item");
const _utils_1 = require("../internal/_utils");
const data_dashboard_item_1 = require("./data-dashboard-item");
const _series_item_1 = require("./metadata/_series-item");
class SeriesItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.__seriesDimensions = ko.observableArray([]);
        this.seriesDimensions = ko.observableArray([]);
        this.__seriesDimensions(analytics_utils_1.deserializeArray(modelJson.SeriesDimensions, (item) => new data_item_1.DataItemLink(this, item, serializer))());
        this._subscribeDataItemLinkArrays(_series_item_1.seriesDimensions);
    }
    _getInfoCore() {
        return _series_item_1.seriesDashboardItemSerializationsInfo;
    }
    _clearBindings() {
        super._clearBindings();
        this.__seriesDimensions.removeAll();
    }
    _getInteractivityDimensionLinks() {
        return this.__seriesDimensions();
    }
}
__decorate([
    _utils_1.collectionItemType('SeriesDimension')
], SeriesItem.prototype, "__seriesDimensions", void 0);
exports.SeriesItem = SeriesItem;
