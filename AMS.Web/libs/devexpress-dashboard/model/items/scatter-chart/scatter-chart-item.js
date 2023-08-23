﻿/**
* DevExpress Dashboard (scatter-chart-item.js)
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
exports.ScatterChartItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const scatter_chart_calc_window_definition_1 = require("../../data-item/window-definition/scatter-chart-calc-window-definition");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const serializable_model_1 = require("../../serializable-model");
const data_dashboard_item_1 = require("../data-dashboard-item");
const _scatter_chart_item_1 = require("./metadata/_scatter-chart-item");
class ScatterChartItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.arguments = ko.observableArray([]);
        this.__arguments = analytics_utils_1.deserializeArray(modelJson.Dimensions, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_scatter_chart_item_1.scatterArgumentsMeta);
        this.__arguments.subscribe((newValue) => {
            data_dashboard_item_1.DataDashboardItem._addColoringMeta(newValue);
        });
        data_dashboard_item_1.DataDashboardItem._addColoringMeta(this.__arguments());
        this._attachDataItem(this, _scatter_chart_item_1.scatterChartWeight.propertyName);
        this._attachDataItem(this, _scatter_chart_item_1.axisXMeasure.propertyName);
        this._attachDataItem(this, _scatter_chart_item_1.axisYMeasure.propertyName);
    }
    _clearBindings() {
        super._clearBindings();
        this.__arguments.removeAll();
    }
    _getInfoCore() {
        return _scatter_chart_item_1.scatterChartDashboardItemSerializationsInfo;
    }
    _isCalculationSupported() {
        return true;
    }
    _getDefaultItemType() {
        return 'ScatterChart';
    }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return this.interactivityOptions.isDrillDownEnabled(); }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getInteractivityDimensionLinks() { return this.__arguments(); }
    _getCanColorByMeasures() { return false; }
    _getCanColorByDimensions() { return true; }
    _getColorizableDataItemsInfo() {
        return [{
                items: this.__arguments(),
                prefixId: _base_metadata_1.BindingSectionTitles.Arguments
            }];
    }
    _getDefaultCalculationWindowDefinition() {
        return new scatter_chart_calc_window_definition_1.ScatterWindowDefinition();
    }
    _isSortingEnabled() {
        return false;
    }
}
__decorate([
    _utils_1.collectionItemType('Dimension')
], ScatterChartItem.prototype, "__arguments", void 0);
exports.ScatterChartItem = ScatterChartItem;
serializable_model_1.itemTypesMap['ScatterChart'] = { type: ScatterChartItem, groupName: 'common', title: 'DashboardStringId.DefaultNameScatterChartItem', index: 50 };
