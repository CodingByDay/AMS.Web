﻿/**
* DevExpress Dashboard (pivot-item.js)
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
exports.PivotItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const measure_1 = require("../../data-item/measure");
const _data_item_1 = require("../../data-item/metadata/_data-item");
const pivot_calc_window_definition_1 = require("../../data-item/window-definition/pivot-calc-window-definition");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const data_dashboard_item_1 = require("../data-dashboard-item");
const _pivot_item_1 = require("./metadata/_pivot-item");
class PivotItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.columns = ko.observableArray([]);
        this.rows = ko.observableArray([]);
        this.values = ko.observableArray([]);
        this.__columns = analytics_utils_1.deserializeArray(dashboardItemJSON.Columns, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this.__rows = analytics_utils_1.deserializeArray(dashboardItemJSON.Rows, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this.__values = analytics_utils_1.deserializeArray(dashboardItemJSON.Values, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_pivot_item_1.pivotColumns, _pivot_item_1.pivotRows, _pivot_item_1.pivotValues);
        this.__values.subscribe((newValue) => {
            this._setCustomOptionsPropertyOnMeasures(newValue);
            this._setLinkCollectionAcceptableShapingType(newValue, data_item_1.AcceptableShapingType.String);
        });
        this.__rows.subscribe((newValue) => {
            this._setCustomOptionsPropertyOnDimensions(newValue);
        });
        this.__columns.subscribe((newValue) => {
            this._setCustomOptionsPropertyOnDimensions(newValue);
        });
        this._setCustomOptionsPropertyOnMeasures(this.__values());
        this._setLinkCollectionAcceptableShapingType(this.__values(), data_item_1.AcceptableShapingType.String);
        this._setCustomOptionsPropertyOnDimensions(this.__rows());
        this._setCustomOptionsPropertyOnDimensions(this.__columns());
        this.autoExpandColumnGroups.subscribe((newValue) => {
            this._expandingManager.resetExpandingParams();
            this._expandingManager.resetColumnViewState(newValue);
        });
        this.autoExpandRowGroups.subscribe((newValue) => {
            this._expandingManager.resetExpandingParams();
            this._expandingManager.resetRowViewState(newValue);
        });
    }
    _clearBindings() {
        super._clearBindings();
        this.__columns.removeAll();
        this.__rows.removeAll();
        this.__values.removeAll();
    }
    _getInfoCore() {
        return _pivot_item_1.pivotDashboardItemSerializationsInfo;
    }
    _canChangeDataItemVisibilityOptions(dataItem) {
        return this.__values().some(value => value.dataItem() === dataItem) || this.__rows().some(value => value.dataItem() === dataItem) || this.__columns().some(value => value.dataItem() === dataItem);
    }
    _isTotalsVisibilityOptionEnabled(dataItem) {
        if (dataItem instanceof measure_1.Measure)
            return true;
        var localRows = this.__rows();
        if (localRows.length > 0 && localRows.some(row => row.dataItem() == dataItem)) {
            return localRows.length > 0 && this.layoutType() != 'Compact' && dataItem != localRows[localRows.length - 1].dataItem();
        }
        var localColumns = this.__columns();
        return localColumns.length > 0 && localColumns.some(column => column.dataItem() == dataItem) && dataItem != localColumns[localColumns.length - 1].dataItem();
    }
    _setCustomOptionsPropertyOnMeasures(links) {
        links.forEach((value) => {
            value._specifics.customOptionsProperties = [{
                    serializationInfo: _data_item_1.showValues
                }, {
                    serializationInfo: _data_item_1.showTotals
                }, {
                    serializationInfo: _data_item_1.showGrandTotals
                }];
        });
    }
    _setCustomOptionsPropertyOnDimensions(links) {
        links.forEach((row) => {
            row._specifics.customOptionsProperties = [{
                    serializationInfo: _data_item_1.showTotals,
                    filter: (dataItem) => { return this._canChangeDataItemVisibilityOptions(dataItem); },
                    disabledRule: (dataItem) => { return !this._isTotalsVisibilityOptionEnabled(dataItem); }
                }];
        });
    }
    _getDefaultItemType() {
        return 'Pivot';
    }
    _extendContentState(content) {
        content.PivotExpandViewState = this._expandingManager.getPivotExpandViewState();
    }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getDefaultCalculationWindowDefinition() {
        return new pivot_calc_window_definition_1.PivotWindowDefinition();
    }
    _getIsVisualInteractivitySupported() { return false; }
}
__decorate([
    _utils_1.collectionItemType('Column')
], PivotItem.prototype, "__columns", void 0);
__decorate([
    _utils_1.collectionItemType('Row')
], PivotItem.prototype, "__rows", void 0);
__decorate([
    _utils_1.collectionItemType('Value')
], PivotItem.prototype, "__values", void 0);
exports.PivotItem = PivotItem;
serializable_model_1.itemTypesMap['Pivot'] = { type: PivotItem, groupName: 'common', title: 'DashboardStringId.DefaultNamePivotItem', index: 20 };
