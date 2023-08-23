﻿/**
* DevExpress Dashboard (_geo-point-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPointMapItem = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _geo_point_map_item_base_1 = require("./_geo-point-map-item-base");
class geoPointMapItem extends _geo_point_map_item_base_1.geoPointMapItemBase {
    constructor(container, options) {
        super(container, options);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    _getMarkerLayers() {
        return [this.mapViewer.getLayerByName('dot'), this.mapViewer.getLayerByName('bubble')];
    }
    _configureMarkerLayers(viewModel) {
        var markerDataSource = this._getMarkerDataSource(), dotSettings = markerDataSource.dotDataSource.length > 0 ? this._getDorMarker(viewModel, markerDataSource.dotDataSource) : null, bubbleSettings = markerDataSource.bubbleDataSource.length > 0 ? this._getBubbleMarker(viewModel, markerDataSource.bubbleDataSource) : null;
        return [
            Object.assign({ name: 'dot', type: 'marker', elementType: 'dot', dataSource: markerDataSource.dotDataSource }, dotSettings),
            Object.assign({ name: 'bubble', type: 'marker', elementType: 'bubble', dataField: 'value', dataSource: markerDataSource.bubbleDataSource }, bubbleSettings)
        ];
    }
    _getMarkerDataSource() {
        var viewModel = this.options.ViewModel, dotDataSource = [], bubbleDataSource = [], count = this.dataController ? this._dataController.getCount() : 0, tooltip, geoPoint, point;
        for (var i = 0; i < count; i++) {
            point = this._dataController.getPoint(i);
            tooltip = this._getToolTip(viewModel.ValueName, point.text);
            geoPoint = {
                coordinates: [point.lon, point.lat],
                attributes: {
                    latSelection: point.latSel,
                    lonSelection: point.lonSel,
                    selected: this._isSelected([point.latSel, point.lonSel]),
                    dimensionsTooltip: this._getDimensionsTooltipHtml(point.tooltipDimensions),
                    measuresTooltip: this._getMeasuresTooltipHtml(point.tooltipMeasures)
                }
            };
            if (point.pointsCount && point.pointsCount > 1) {
                geoPoint.attributes.value = this._getClusterBubbleSizeIndex(point.pointsCount);
                geoPoint.attributes.tooltip = this._pointsCountTooltip(point.pointsCount) + '<br>' + tooltip;
                geoPoint.attributes.color = this._getClusterBubbleColor(point.pointsCount);
                bubbleDataSource.push(geoPoint);
            }
            else {
                geoPoint.attributes.text = point.text;
                geoPoint.attributes.tooltip = tooltip;
                dotDataSource.push(geoPoint);
            }
        }
        return {
            dotDataSource: dotDataSource,
            bubbleDataSource: bubbleDataSource
        };
    }
    _getDorMarker(viewModel, markerDataSource) {
        return Object.assign(Object.assign({}, this._getMarker(viewModel, markerDataSource)), { label: {
                dataField: 'text'
            } });
    }
    _getBubbleMarker(viewModel, markerDataSource) {
        var res = this._getMinMaxValues(markerDataSource);
        return _jquery_helpers_1.deepExtend(this._getMarker(viewModel, markerDataSource), {
            minSize: 30 + res.min * 10,
            maxSize: 30 + res.max * 10
        });
    }
    _getColorLegend(viewModel) {
    }
    _getWeightLegend(viewModel) {
    }
    _getClusterBubbleColor(value) {
        if (value < 10) {
            return 'rgb(27, 73, 165)';
        }
        if (value < 100) {
            return 'rgb(63, 136, 48)';
        }
        if (value < 1000) {
            return 'rgb(228, 124, 2)';
        }
        return 'rgb(214, 5, 5)';
    }
    _getClusterBubbleSizeIndex(value) {
        for (var i = 0;; i++) {
            if (value < Math.pow(10, i)) {
                return i - 1;
            }
        }
    }
    _getDataPointMeasureIds() {
        var viewModel = this.options.ViewModel, measureIds = [];
        measureIds.push(viewModel.ValueId);
        return measureIds;
    }
}
exports.geoPointMapItem = geoPointMapItem;
