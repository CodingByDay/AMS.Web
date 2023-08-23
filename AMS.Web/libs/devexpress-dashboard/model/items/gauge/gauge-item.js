﻿/**
* DevExpress Dashboard (gauge-item.js)
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
exports.GaugeItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const gauge_calc_window_definition_1 = require("../../data-item/window-definition/gauge-calc-window-definition");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const kpi_item_1 = require("../kpi/kpi-item");
const gauge_1 = require("./gauge");
const _gauge_item_1 = require("./metadata/_gauge-item");
class GaugeItem extends kpi_item_1.KpiItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.gauges = analytics_utils_1.deserializeArray(modelJson.Gauges, (item) => new gauge_1.Gauge(this, item, serializer));
    }
    _clearBindings() {
        super._clearBindings();
        this.gauges.removeAll();
    }
    _itemInteractivityByColumnAxis() {
        return false;
    }
    _getInteractivityAxisDimensionCount() {
        return this.seriesDimensions().length;
    }
    _getInfoCore() {
        return _gauge_item_1.gaugeDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Gauge';
    }
    _getLayersCount() {
        return !!this.__seriesDimensions && this.__seriesDimensions().length > 0 ? this.gauges().length : 0;
    }
    _getLayerName() {
        return this._getDataItemContainerDisplayName(this.gauges()[this._selectedElementIndex() || 0]);
    }
    _getDefaultCalculationWindowDefinition() {
        return new gauge_calc_window_definition_1.GaugeWindowDefinition();
    }
}
__decorate([
    _utils_1.collectionItemType('GaugeElement')
], GaugeItem.prototype, "gauges", void 0);
exports.GaugeItem = GaugeItem;
serializable_model_1.itemTypesMap['Gauge'] = { type: GaugeItem, groupName: 'common', title: 'DashboardStringId.DefaultNameGaugeItem', index: 70 };
