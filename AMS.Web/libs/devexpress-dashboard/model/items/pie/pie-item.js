﻿/**
* DevExpress Dashboard (pie-item.js)
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
exports.PieItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const pie_calc_window_definition_1 = require("../../data-item/window-definition/pie-calc-window-definition");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const chart_item_base_1 = require("../chart-item-base");
const _pie_item_1 = require("./metadata/_pie-item");
class PieItem extends chart_item_base_1.ChartItemBase {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.values = ko.observableArray([]);
        this.__values = analytics_utils_1.deserializeArray(dashboardItemJSON.Values, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_pie_item_1.pieValues);
    }
    _getInfoCore() {
        return _pie_item_1.pieDashboardItemSerializationsInfo;
    }
    _clearBindings() {
        super._clearBindings();
        this.__values.removeAll();
    }
    _getDefaultItemType() {
        return 'Pie';
    }
    _getTargetDimensions() { return this.interactivityOptions.targetDimensions(); }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return this.interactivityOptions.isDrillDownEnabled(); }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getAreMeasuresColoredByDefault() { return this.values().length > 1 && this.arguments().length == 0; }
    _getIsDimensionColoredByDefault(dimension) {
        return !!this.arguments().filter(dim => dim === dimension)[0];
    }
    _getLayersCount() {
        return !!this.__seriesDimensions && this.__seriesDimensions().length > 0 ? this.__values().length : 0;
    }
    _getLayerName() {
        return this._getDataItemDisplayName(this.__values()[this._selectedElementIndex() || 0].dataItem());
    }
    _getDefaultCalculationWindowDefinition() {
        return new pie_calc_window_definition_1.PieWindowDefinition();
    }
}
__decorate([
    _utils_1.collectionItemType('Value')
], PieItem.prototype, "__values", void 0);
exports.PieItem = PieItem;
serializable_model_1.itemTypesMap['Pie'] = { type: PieItem, groupName: 'common', title: 'DashboardStringId.DefaultNamePieItem', index: 45 };
