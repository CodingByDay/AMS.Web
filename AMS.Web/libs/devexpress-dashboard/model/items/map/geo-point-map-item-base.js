﻿/**
* DevExpress Dashboard (geo-point-map-item-base.js)
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
exports.GeoPointMapItemBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const data_item_1 = require("../../data-item/data-item");
const _dimension_filter_values_1 = require("../../data-item/_dimension-filter-values");
const _data_field_1 = require("../../data-sources/_data-field");
const _array_utils_1 = require("../../internal/_array-utils");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const map_item_1 = require("./map-item");
const _geo_point_map_item_base_1 = require("./metadata/_geo-point-map-item-base");
class GeoPointMapItemBase extends map_item_1.MapItem {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.tooltipDimensions = ko.observableArray([]);
        this._selectedClusters = ko.observable();
        this._clustersContent = ko.observable();
        this._processDataRequest = () => {
            var clientState = this._clientState();
            if (clientState) {
                this._dataRequestArgs(Object.assign({ unclusteredSelection: this._selectionValues.peek() }, clientState.clusterizationInfo));
            }
        };
        this._actualSelectedValues = ko.computed(() => {
            return this.enableClustering() && this._selectedClusters() || this._selectionValues();
        });
        this.__tooltipDimensions = analytics_utils_1.deserializeArray(modelJson.TooltipDimensions, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_geo_point_map_item_base_1.tooltipDimensions);
        this._attachDataItem(this, _geo_point_map_item_base_1.latitude.propertyName);
        this._attachDataItem(this, _geo_point_map_item_base_1.longitude.propertyName);
        this.enableClustering.subscribe(newValue => {
            if (newValue) {
                this._processDataRequest();
            }
        });
    }
    get _actualSelectionValues() {
        return this._actualSelectedValues;
    }
    _clearBindings() {
        super._clearBindings();
        this.__tooltipDimensions.removeAll();
        this.__latitude.uniqueName(null);
        this.__longitude.uniqueName(null);
    }
    _getInfoCore() {
        return _geo_point_map_item_base_1.geoPointMapDashboardItemBaseSerializationsInfo;
    }
    _getInteractivityDimensionLinks() {
        return [this.__latitude, this.__longitude];
    }
    _getExportingSelection() {
        return this._selectedClusters() || (this._outputFilter() && this._outputFilter().values);
    }
    _getDisplayFilterValues(limitCount) {
        var metaData = this._dataManager() ? this._dataManager().getMetaData() : undefined, selection = this._getExportingSelection(), outFilterValues = [], latName = this.__latitude.uniqueName(), lonName = this.__longitude.uniqueName();
        var dataStorage = this._dataManager() ? this._dataManager().getDataStorage() : undefined;
        if (dataStorage && selection && this.__tooltipDimensions().length) {
            var slice = dataStorage.getSliceByIds(this._getSliceDimensions()
                .map(dataItemLink => dataItemLink.uniqueName())
                .filter(uniqueName => !!uniqueName));
            this.__tooltipDimensions().forEach((tooltipDimension) => {
                var uniqueValues = {}, valueCount = 0, filterValues = new _dimension_filter_values_1.DimensionFilterValues(this._getDimensionDisplayName(tooltipDimension.dataItem().uniqueName())), format = metaData ? metaData.getDimensionFormat(tooltipDimension.uniqueName()) : undefined, isOlap = _data_field_1.DataField.isOlap(tooltipDimension.dataItem().dataMember());
                slice.forEach((dataKey) => {
                    var rowKey = dataKey.rowKey, latitudeValue = slice.getKeyValue(rowKey, latName), longitudeValue = slice.getKeyValue(rowKey, lonName);
                    selection.every((selectionValue) => {
                        if (latitudeValue === selectionValue[0] && longitudeValue === selectionValue[1]) {
                            if (!!limitCount && valueCount >= limitCount) {
                                filterValues.Truncated = true;
                                return false;
                            }
                            var value = slice.getKeyValue(rowKey, tooltipDimension.uniqueName());
                            if (!uniqueValues[value]) {
                                uniqueValues[value] = value;
                                valueCount++;
                            }
                        }
                        return true;
                    });
                });
                filterValues.Values = Object.keys(uniqueValues).map(v => this._createFormattableValue(tooltipDimension.dataItem(), v));
                outFilterValues.push(filterValues);
            });
        }
        return outFilterValues;
    }
    _getSliceDimensions() {
        return [this.__latitude, this.__longitude].concat(this.__tooltipDimensions());
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        var mapContent = this._paneContentHolder.getContent(_base_metadata_1.PropertyCategory.Data);
        this._clustersContent(mapContent.ClustersContent);
        if (content && content.SelectedValues) {
            this._setSelectionData(content.SelectedValues);
        }
    }
    _setSelectionData(selection) {
        if (this._clustersContent()) {
            let realSelectionPoints = [];
            this._clustersContent().forEach(clusterDto => {
                var x = clusterDto.Cluster.Latitude, y = clusterDto.Cluster.Longitude;
                if ((selection || []).filter((s) => {
                    return s[0] === x && s[1] === y;
                })[0]) {
                    clusterDto.Points.forEach(pointInCluster => realSelectionPoints.push(pointInCluster));
                }
            });
            this._selectedClusters(selection);
            selection = realSelectionPoints;
        }
        if (!_array_utils_1.arrayEquals(this._selectionValues(), selection)) {
            this._selectionValues(selection);
            if (this.enableClustering()) {
                this._processDataRequest();
            }
        }
    }
    _isTopNEnabled(dataItem) {
        return this.tooltipDimensions.indexOf(dataItem) == -1 && this.hiddenDimensions().indexOf(dataItem) == -1;
    }
}
__decorate([
    _utils_1.collectionItemType('TooltipDimension')
], GeoPointMapItemBase.prototype, "__tooltipDimensions", void 0);
exports.GeoPointMapItemBase = GeoPointMapItemBase;
