﻿/**
* DevExpress Dashboard (treemap-item.js)
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
exports.TreemapItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const serializable_model_1 = require("../../serializable-model");
const data_dashboard_item_1 = require("../data-dashboard-item");
const _treemap_item_1 = require("./metadata/_treemap-item");
class TreemapItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.values = ko.observableArray([]);
        this.__arguments = ko.observableArray([]);
        this.arguments = ko.observableArray([]);
        this.__arguments.subscribe((newArguments) => {
            data_dashboard_item_1.DataDashboardItem._addColoringMeta(newArguments);
        });
        this.__arguments(analytics_utils_1.deserializeArray(modelJson.Arguments, (item) => new data_item_1.DataItemLink(this, item, serializer))());
        this._subscribeDataItemLinkArrays(_treemap_item_1.treeMapArgumentsMeta);
        this.__values = analytics_utils_1.deserializeArray(modelJson.Values, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_treemap_item_1.treeMapvalues);
    }
    _getInfoCore() {
        return _treemap_item_1.treemapDashboardItemSerializationsInfo;
    }
    _clearBindings() {
        super._clearBindings();
        this.__arguments.removeAll();
        this.__values.removeAll();
    }
    _isCalculationSupported() {
        return false;
    }
    _getDefaultItemType() {
        return 'Treemap';
    }
    _getCanColorByMeasures() { return true; }
    _getCanColorByDimensions() { return true; }
    _getAreMeasuresColoredByDefault() { return this.__values().length > 1 && this.__arguments().length === 0; }
    _getIsDimensionColoredByDefault(dimension) {
        return this.__arguments().length > 0 && this.__arguments()[0].dataItem() === dimension;
    }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return this.interactivityOptions.isDrillDownEnabled(); }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getInteractivityDimensionLinks() { return this.__arguments(); }
    _getLayersCount() {
        return !!this.__arguments && this.__arguments().length > 0 ? this.__values().length : 0;
    }
    _getLayerName() {
        return this._getDataItemDisplayName(this.__values()[this._selectedElementIndex() || 0].dataItem());
    }
    _getColorizableDataItemsInfo() {
        return [{
                items: this.__arguments(),
                prefixId: _base_metadata_1.BindingSectionTitles.Arguments
            }];
    }
    _isSortingEnabled() {
        return false;
    }
}
__decorate([
    _utils_1.collectionItemType('Value')
], TreemapItem.prototype, "__values", void 0);
__decorate([
    _utils_1.collectionItemType('Argument')
], TreemapItem.prototype, "__arguments", void 0);
exports.TreemapItem = TreemapItem;
serializable_model_1.itemTypesMap['Treemap'] = { type: TreemapItem, groupName: 'common', title: 'DashboardStringId.DefaultNameTreemapItem', index: 40 };
