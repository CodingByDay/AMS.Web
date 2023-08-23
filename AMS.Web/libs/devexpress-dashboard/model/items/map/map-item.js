﻿/**
* DevExpress Dashboard (map-item.js)
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
exports.MapItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const _array_utils_1 = require("../../internal/_array-utils");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const data_dashboard_item_1 = require("../data-dashboard-item");
const _custom_shape_file_data_1 = require("./metadata/_custom-shape-file-data");
const _map_item_1 = require("./metadata/_map-item");
class MapItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.tooltipMeasures = ko.observableArray([]);
        this._isGeometryChanged = false;
        this._shapeFilesAttributeNameList = ko.observableArray();
        this._initialExtentChanged = ko.observable(false);
        this._isGeometryChangedCallback = () => {
            this._isGeometryChanged = true;
            this.viewport.createViewerPaddings(true);
        };
        this.__tooltipMeasures = analytics_utils_1.deserializeArray(modelJson.TooltipMeasures, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_map_item_1.tooltipMeasures);
        this.__tooltipMeasures.subscribe((links) => {
            this._setLinkCollectionAcceptableShapingType(links, data_item_1.AcceptableShapingType.String);
        });
        this._setLinkCollectionAcceptableShapingType(this.__tooltipMeasures(), data_item_1.AcceptableShapingType.String);
        if (!modelJson[_map_item_1.viewport.modelName] &&
            !modelJson[_map_item_1.area.modelName] &&
            !modelJson[_custom_shape_file_data_1.shapeData.modelName]) {
            this.viewport._set({
                'TopLatitude': 83.64513000000001,
                'BottomLatitude': -55.61182999999996,
                'CenterPointLatitude': 44.08908074480383,
                'CenterPointLongitude': 1.4210854715202004e-13,
                'LeftLongitude': -179.99999999999997,
                'RightLongitude': 180
            });
        }
        this._supportedUIStates(['error', 'loading']);
    }
    _clearBindings() {
        super._clearBindings();
        this.__tooltipMeasures.removeAll();
    }
    _getInfoCore() {
        return _map_item_1.mapDashboardItemSerializationsInfo;
    }
    _isCalculationSupported() {
        return false;
    }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return false; }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _setClientState(clientState) {
        super._setClientState(clientState);
    }
    _getContentCategories() {
        return super._getContentCategories().concat([_base_metadata_1.PropertyCategory.Map]);
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        var mapContent = this._paneContentHolder.getContent(_base_metadata_1.PropertyCategory.Map);
        if (!_array_utils_1.areArraysEqual(this._shapeFilesAttributeNameList(), mapContent.MapAttributesNames)) {
            this._shapeFilesAttributeNameList(mapContent.MapAttributesNames);
        }
        if (mapContent && mapContent.ViewModel) {
            content.ViewModel.MapItems = mapContent.ViewModel.MapItems;
            content.ViewModel.ShapeTitleAttributeName = mapContent.ViewModel.ShapeTitleAttributeName;
            content.FullViewport = mapContent.FullViewport;
            if (this._isGeometryChanged) {
                this.viewport._set(mapContent.FullViewport);
                this._isGeometryChanged = false;
            }
        }
        content.ViewModel.Viewport = this.viewport._createViewModel();
    }
    _isSortingEnabled() {
        return false;
    }
}
__decorate([
    _utils_1.collectionItemType('TooltipMeasure')
], MapItem.prototype, "__tooltipMeasures", void 0);
exports.MapItem = MapItem;
