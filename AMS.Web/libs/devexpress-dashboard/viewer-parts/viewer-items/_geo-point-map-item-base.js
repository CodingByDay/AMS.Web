﻿/**
* DevExpress Dashboard (_geo-point-map-item-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geoPointMapItemBase = void 0;
const themes_1 = require("devextreme/viz/themes");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _z_index_1 = require("../../data/_z-index");
const _map_item_1 = require("./_map-item");
class geoPointMapItemBase extends _map_item_1.mapItem {
    constructor(container, options) {
        super(container, options);
        var that = this;
        that.raiseTimerClusterizationDataRequest = function () {
            var clientState = that._getClusterizationInfo();
            if (clientState.clientSize.width > 0 && clientState.clientSize.height > 0) {
                that._onDataRequest();
            }
            clearTimeout(that.timer);
            that.timer = false;
        };
    }
    initialDataRequestUnsafe() {
        this._raiseClusterizationDataRequest();
    }
    selectTupleUnsafe(tuple, state) {
        var that = this;
        that._getMarkerLayers().forEach(layer => {
            layer.getElements().forEach(item => {
                if (item.attribute('latSelection') == tuple[0].value[0] && item.attribute('lonSelection') == tuple[0].value[1]) {
                    item.selected(state);
                }
            });
        });
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.clearSelection();
        if (values && values.length > 0) {
            this._getMarkerLayers().forEach(layer => {
                layer.getElements().forEach(item => {
                    values.forEach((value, i) => {
                        if (item.attribute('latSelection') == value[0] && item.attribute('lonSelection') == value[1]) {
                            item.selected(true);
                        }
                    });
                });
            });
        }
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var options = _jquery_helpers_1.deepExtend(this._getMapViewerOptions(), this._getGeoPointMapViewerOptions());
        this._renderContentInternal(element, changeExisting, options);
        return false;
    }
    renderPartialContentUnsafe() {
        var viewModel = this.options.ViewModel;
        this._updateMarkerLayers(viewModel);
    }
    resetClientViewport() {
        super.resetClientViewport();
        this._raiseClusterizationDataRequest();
    }
    updateContentStateUnsafe() {
        var that = this, layers = that.mapViewer.option('layers');
        layers.forEach(layer => {
            if (layer.type === 'marker')
                layer.hoverEnabled = that._getCustomHoverEnabled();
        });
        this.mapViewer.option('layers', layers);
    }
    forceUpdateClientState() {
        if (this.hasWidget) {
            this._onClientStateUpdate(this._getClientContext());
        }
    }
    _getGeoPointMapViewerOptions() {
        var that = this, viewModel = that.options.ViewModel;
        return {
            layers: that._configureLayers(viewModel),
            onClick: function (e) {
                if (e.target && e.target.layer.type === 'marker')
                    that._raiseItemClick(e.target);
            },
            legends: that._getLegends(viewModel),
            tooltip: {
                enabled: true,
                zIndex: _z_index_1.zIndex.dashboardItemTooltips,
                container: _utils_1.tooltipContainerSelector,
                customizeTooltip: function (arg) {
                    var dimensionText, measureText, mainText, resultHtml = '';
                    if (arg.layer.type === 'marker') {
                        dimensionText = arg.attribute('dimensionsTooltip');
                        mainText = arg.attribute('tooltip');
                        measureText = arg.attribute('measuresTooltip');
                        if (dimensionText)
                            resultHtml += '<tr><td>' + dimensionText + '</td></tr>';
                        if (mainText)
                            resultHtml += '<tr><td>' + mainText + (measureText ? '' : '</td></tr>');
                        if (measureText)
                            resultHtml += (mainText ? '<br>' : '</td></tr>') + measureText + '</td></tr>';
                    }
                    return {
                        html: (resultHtml != '') ? '<table align="left">' + resultHtml + '</table>' : ''
                    };
                }
            }
        };
    }
    _getMarkerLayers() {
    }
    _configureLayers(viewModel) {
        var mapDataSource = this._getMapDataSource(viewModel.MapItems, viewModel.ShapeTitleAttributeName);
        return this._configureGeometryLayers(mapDataSource, this._getArea(viewModel)).concat(this._configureMarkerLayers(viewModel));
    }
    _configureMarkerLayers(viewModel) {
    }
    _updateMarkerLayers(viewModel) {
        var layers = this.mapViewer.option('layers'), markerLayers = this._configureMarkerLayers(viewModel);
        markerLayers.forEach((layer, index) => {
            layers[index + 1] = layer;
        });
        this.mapViewer.option('layers', layers);
    }
    _getMarker(viewModel, markerDataSource) {
        var style;
        return {
            customize: function (items) {
                items.forEach(item => {
                    item.selected(item.attribute('selected'));
                    style = { color: item.attribute('color') };
                    var size = item.attribute('size');
                    if (size)
                        style.size = size;
                    item.applySettings(style);
                });
            },
            selectionMode: 'multiple'
        };
    }
    _getArea(viewModel) {
        var that = this;
        return Object.assign(Object.assign({}, that._getLabelSettings(viewModel)), { hoverEnabled: false, selectionMode: that._selectionMode() });
    }
    _getLegends(viewModel) {
        var legends = [], colorLegend = this._getColorLegend(viewModel), sizeLegend = this._getWeightLegend(viewModel);
        if (colorLegend) {
            legends.push(colorLegend);
        }
        if (sizeLegend) {
            legends.push(sizeLegend);
        }
        return legends;
    }
    _getColorLegend(viewModel) {
        var legend = this._getLegend(viewModel.ColorLegend);
        if (legend) {
            legend.source = { grouping: 'color' };
        }
        return legend;
    }
    _getWeightLegend(viewModel) {
        var legend = this._getLegend(viewModel.WeightedLegend);
        if (legend) {
            legend.source = { grouping: 'size' };
            legend.markerShape = 'circle';
            legend.markerColor = themes_1.getTheme(themes_1.currentTheme()).map['layer:area'].color;
            legend.orientation = 'vertical';
        }
        return legend;
    }
    _getMinMaxValues(markerDataSource) {
        var min, max;
        if (markerDataSource.length > 0) {
            for (var i = 0; i < markerDataSource.length; i++) {
                if (max === undefined || markerDataSource[i].attributes.value !== undefined && (markerDataSource[i].attributes.value > max)) {
                    max = markerDataSource[i].attributes.value;
                }
                if (min === undefined || markerDataSource[i].attributes.value !== undefined && (markerDataSource[i].attributes.value < min)) {
                    min = markerDataSource[i].attributes.value;
                }
            }
        }
        return {
            min: min,
            max: max
        };
    }
    _pointsCountTooltip(count) {
        return '<b>' + count + ' points</b>';
    }
    _getElementInteractionValue(element, viewModel) {
        return [element.attribute('latSelection'), element.attribute('lonSelection')];
    }
    _getDimensionsTooltipHtml(tooltipDimensions) {
        var values = [];
        if (tooltipDimensions.length === 1) {
            if (tooltipDimensions[0].values) {
                for (var i = 0; i < tooltipDimensions[0].values.length; i++) {
                    values.push('<b>' + this._getHtml(tooltipDimensions[0].values[i]) + '</b>');
                }
                return values.join('<br>');
            }
        }
        else {
            for (var i = 0; i < tooltipDimensions.length; i++) {
                var tooltipDimension = tooltipDimensions[i];
                if (tooltipDimension.values) {
                    values.push('<b>' + this._getHtml(tooltipDimension.caption) + '</b>');
                    for (var j = 0; j < tooltipDimension.values.length; j++) {
                        values.push(this._getHtml(tooltipDimension.values[j]));
                    }
                }
            }
            return values.join('<br>');
        }
        return '';
    }
    _getMeasuresTooltipHtml(tooltipMeasures) {
        var result = [];
        for (var i = 0; i < tooltipMeasures.length; i++) {
            result.push(this._getToolTip(tooltipMeasures[i].caption, tooltipMeasures[i].value));
        }
        return result.join('<br>');
    }
    _getDataPoint(element) {
        var that = this, viewModel = that.options.ViewModel;
        return {
            getValues: function () {
                return that._getElementInteractionValue(element, viewModel);
            },
            getMeasureIds: function () {
                return that._getDataPointMeasureIds();
            },
            getDeltaIds: function () {
                return [];
            }
        };
    }
    _getDataPointMeasureIds() {
        return [];
    }
    _updateContentSizeUnsafe() {
        super._updateContentSizeUnsafe();
        if (!!this.mapViewer) {
            this._raiseClusterizationDataRequest();
        }
    }
    _raiseClusterizationDataRequest() {
        if (this.options.ViewModel.EnableClustering) {
            var clientContext = this._getClientContext();
            this._onClientStateUpdate(clientContext);
            if (clientContext.clusterizationInfo.clientSize.width > 0 && clientContext.clusterizationInfo.clientSize.height > 0) {
                this._onDataRequest();
            }
        }
    }
    _onViewPortChanged() {
        super._onViewPortChanged();
        if (this.options.ViewModel.EnableClustering && !this._isLocked() && !this.timer) {
            this.timer = setTimeout(this.raiseTimerClusterizationDataRequest, 500);
        }
    }
    _onInitialExtentUnsafe(viewport) {
        super._onInitialExtentUnsafe(viewport);
        this._raiseClusterizationDataRequest();
    }
}
exports.geoPointMapItemBase = geoPointMapItemBase;
