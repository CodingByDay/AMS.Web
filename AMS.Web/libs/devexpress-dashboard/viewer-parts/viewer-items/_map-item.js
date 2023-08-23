﻿/**
* DevExpress Dashboard (_map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapItem = void 0;
const string_1 = require("devextreme/core/utils/string");
const vector_map_1 = require("devextreme/viz/vector_map");
const projection_1 = require("devextreme/viz/vector_map/projection");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _localization_ids_1 = require("../../data/_localization-ids");
const _localizer_1 = require("../../data/_localizer");
const caption_toolbar_options_1 = require("../widgets/caption-toolbar/caption-toolbar-options");
const _caption_toolbar_css_classes_1 = require("../widgets/caption-toolbar/_caption-toolbar-css-classes");
const _base_item_1 = require("./_base-item");
var projection = (function () {
    var parameters = projection_1.projection.get('mercator').source(), _to = parameters.to, _from = parameters.from;
    parameters.to = function (coordinates) {
        var coords = _to(coordinates);
        return [clamp(coords[0], -1, +1), coords[1]];
    };
    parameters.from = function (coordinates) {
        var coords = [clamp(coordinates[0], -1, +1), coordinates[1]];
        return _from(coords);
    };
    return projection_1.projection(parameters);
    function clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
}());
class mapItem extends _base_item_1.baseItem {
    constructor($container, options) {
        super($container, options);
        this.isInitialExtentChanged = false;
        this.isViewportLocked = false;
    }
    dispose() {
        super.dispose();
        this.mapViewer && this.mapViewer.dispose();
    }
    _renderContentInternal(element, changeExisting, options) {
        this._raiseItemWidgetOptionsPrepared(options);
        if (changeExisting && this.mapViewer) {
            this._unsubscribeItemEvents();
            this.mapViewer.option(options);
            if (this._shouldResetClientViewport(this.options.ViewModel.Viewport)) {
                this.resetClientViewport();
            }
        }
        else {
            this.mapViewer = new vector_map_1.default(element, options);
        }
        this._updatePreviousViewport(this.options.ViewModel.Viewport);
        this._subscribeItemEvents();
    }
    resetClientViewport() {
        this.clientState = null;
        this._onClientStateUpdate(this._getClientContext());
    }
    _shouldResetClientViewport(viewportViewModel) {
        if (this.previousViewportViewModel) {
            var viewportChanged = !this._viewportEquals(this.previousViewportViewModel, viewportViewModel) || this.previousViewportViewModel.CreateViewerPaddings !== viewportViewModel.CreateViewerPaddings;
            if (viewportChanged && this.clientState && this._viewportEquals(this.clientState.clusterizationInfo.viewport, viewportViewModel) && !viewportViewModel.CreateViewerPaddings)
                return false;
            return viewportChanged;
        }
        return false;
    }
    _viewportEquals(viewport1, viewport2) {
        return viewport1.RightLongitude === viewport2.RightLongitude && viewport1.LeftLongitude === viewport2.LeftLongitude
            && viewport1.BottomLatitude === viewport2.BottomLatitude && viewport1.TopLatitude === viewport2.TopLatitude
            && viewport1.CenterPointLongitude === viewport2.CenterPointLongitude && viewport1.CenterPointLatitude === viewport2.CenterPointLatitude;
    }
    _updatePreviousViewport(viewport) {
        this.previousViewportViewModel = {
            RightLongitude: viewport.RightLongitude,
            LeftLongitude: viewport.LeftLongitude,
            BottomLatitude: viewport.BottomLatitude,
            TopLatitude: viewport.TopLatitude,
            CenterPointLongitude: viewport.CenterPointLongitude,
            CenterPointLatitude: viewport.CenterPointLatitude,
            CreateViewerPaddings: viewport.CreateViewerPaddings
        };
    }
    _clearSelectionUnsafe() {
        this.mapViewer.clearSelection();
    }
    getInfoUnsafe() {
        return _jquery_helpers_1.deepExtend(super.getInfoUnsafe(), {
            viewport: this._getViewport()
        });
    }
    _getSpecificStatePanelItems() {
        if (!this.isViewportLocked && this.isInitialExtentChanged) {
            return [{
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.initialExtent,
                    click: (element) => {
                        this._toggleInitialExtentChanged(false);
                    },
                    icon: _caption_toolbar_css_classes_1.cssClasses.iconInitialExtent,
                    type: 'button',
                    hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.InitialExtent)
                }];
        }
        else
            return [];
    }
    _getMapViewerOptions() {
        var that = this, viewModel = that.options.ViewModel;
        return {
            projection: projection,
            encodeHtml: that._isEncodeHtml(),
            background: { borderWidth: 0, borderColor: 'none' },
            controlBar: { enabled: false },
            zoomFactor: that._calculateZoomFactor(viewModel.Viewport, _jquery_helpers_1.getWidth(that.contentRoot), _jquery_helpers_1.getHeight(that.contentRoot)),
            maxZoomFactor: 1 << 18,
            center: [viewModel.Viewport.CenterPointLongitude, viewModel.Viewport.CenterPointLatitude],
            panningEnabled: !this.isViewportLocked,
            zoomingEnabled: !this.isViewportLocked
        };
    }
    _getLabelSettings(viewModel) {
        return {
            label: {
                enabled: !!viewModel.ShapeTitleAttributeName || viewModel.IncludeSummaryValueToShapeTitle,
                dataField: 'title'
            }
        };
    }
    _calculateZoomFactor(viewport, width, height) {
        var min = width < height ? width : height, mapWidth = this._translateLon(viewport.RightLongitude, min) - this._translateLon(viewport.LeftLongitude, min), mapHeight = this._translateLat(viewport.BottomLatitude, min) - this._translateLat(viewport.TopLatitude, min), latitudeZoom = width / mapWidth, longitudeZoom = height / mapHeight, zoom = latitudeZoom < longitudeZoom ? latitudeZoom : longitudeZoom;
        if (viewport.CreateViewerPaddings) {
            zoom *= 0.95;
        }
        return zoom;
    }
    _translateLon(lon, size) {
        var lon_ = lon * Math.PI / 180;
        return (size / 2) + (size / (2 * Math.PI)) * lon_;
    }
    _translateLat(lat, size) {
        var lat_ = lat * Math.PI / 180;
        return (size / 2) - (size / (2 * Math.PI)) * Math.log(Math.tan(Math.PI / 4 + lat_ / 2));
    }
    _getMapDataSource(mapItems, titleName) {
        var mapDataSource = [], data, type, points, boundary, point, segments, segmentData, pushAction;
        for (var i = 0; i < mapItems.length; i++) {
            data = [];
            type = 'area';
            if (mapItems[i].Latitude && mapItems[i].Longitude && mapItems[i].Size) {
                data.push([mapItems[i].Longitude, mapItems[i].Latitude]);
            }
            if (mapItems[i].Segments) {
                segments = mapItems[i].Segments;
                for (var j = 0; j < segments.length; j++) {
                    pushAction = function (row) {
                        if (segments[j].IsClosed && row.length > 1) {
                            var first = row[0], last = row[row.length - 1];
                            if (first[0] != last[0] || first[1] != last[1])
                                row.push(first);
                        }
                        data.push(row);
                    };
                    if (!segments[j].IsFilled)
                        type = 'line';
                    points = segments[j].Points;
                    segmentData = [];
                    for (var k = 0; k < points.length; k++) {
                        segmentData.push([points[k].Longitude, points[k].Latitude]);
                    }
                    pushAction(segmentData);
                    for (var l = 0; l < segments[j].Boundaries.length; l++) {
                        segmentData = [];
                        boundary = segments[j].Boundaries[l];
                        for (var m = 0; m < boundary.Points.length; m++) {
                            point = boundary.Points[m];
                            segmentData.push([point.Longitude, point.Latitude]);
                        }
                        pushAction(segmentData);
                    }
                }
            }
            mapDataSource.push({
                coordinates: data,
                type: type,
                attributes: {}
            });
            for (var j = 0; j < mapItems[i].Attributes.length; j++) {
                if (mapItems[i].Attributes[j].Name === titleName) {
                    mapDataSource[i].attributes.title = mapItems[i].Attributes[j].Value;
                    break;
                }
            }
        }
        return mapDataSource;
    }
    _configureGeometryLayers(mapDataSource, areaSettings) {
        var areaDataSource = [], lineDataSource = [], layers = [];
        for (var i = 0; i < mapDataSource.length; i++) {
            if (mapDataSource[i].type === 'line')
                lineDataSource.push(mapDataSource[i]);
            else
                areaDataSource.push(mapDataSource[i]);
        }
        layers.push(Object.assign({ name: 'area', type: 'area', dataSource: areaDataSource }, areaSettings));
        if (lineDataSource.length > 0)
            layers.push({ name: 'line', type: 'line', dataSource: lineDataSource });
        return layers;
    }
    _getLegend(legendModel) {
        var legend = legendModel && !!legendModel.Visible ? {} : undefined;
        if (legend) {
            this._updateLegendPosition(legend, legendModel);
        }
        return legend;
    }
    _updateLegendPosition(legend, legendModel) {
        switch (legendModel.Orientation) {
            case 'Vertical':
                legend.orientation = 'vertical';
                legend.inverted = true;
                break;
            case 'Horizontal':
                legend.orientation = 'horizontal';
                break;
            default:
                break;
        }
        switch (legendModel.Position) {
            case 'TopLeft':
                legend.verticalAlignment = 'top';
                legend.horizontalAlignment = 'left';
                break;
            case 'TopCenter':
                legend.verticalAlignment = 'top';
                legend.horizontalAlignment = 'center';
                break;
            case 'TopRight':
                legend.verticalAlignment = 'top';
                legend.horizontalAlignment = 'right';
                break;
            case 'BottomLeft':
                legend.verticalAlignment = 'bottom';
                legend.horizontalAlignment = 'left';
                break;
            case 'BottomCenter':
                legend.verticalAlignment = 'bottom';
                legend.horizontalAlignment = 'center';
                break;
            case 'BottomRight':
                legend.verticalAlignment = 'bottom';
                legend.horizontalAlignment = 'right';
                break;
            default:
                break;
        }
    }
    _isSelected(current) {
        var selectedValues = this._getSelectedValues(), selected = false, equals;
        if (selectedValues && selectedValues.length > 0 && selectedValues[0].length === current.length) {
            for (var i = 0; i < selectedValues.length; i++) {
                equals = true;
                for (var j = 0; j < current.length; j++) {
                    if (selectedValues[i][j] !== current[j]) {
                        equals = false;
                        break;
                    }
                }
                if (equals) {
                    selected = true;
                    break;
                }
            }
        }
        return selected;
    }
    _getToolTip(name, value) {
        return string_1.format('{0}: {1}', this._getHtml(name), this._getHtml(value));
    }
    _getColors(colorModels) {
        var colors;
        if (colorModels) {
            colors = [];
            for (var i = 0; i < colorModels.length; i++) {
                colors.push('rgb(' + colorModels[i].R + ', ' + colorModels[i].G + ', ' + colorModels[i].B + ')');
            }
            return colors;
        }
    }
    _updateRangeStops(rangeStops, min, max, percent) {
        var res = [];
        for (var i = 0; i < rangeStops.length; i++) {
            res.push(rangeStops[i]);
        }
        if (percent) {
            this._updatePercentRangeStops(res, min, max);
        }
        if (res.length > 0 && res[0] > min) {
            res[0] = min;
        }
        if (res[res.length - 1] < max) {
            res.push(max);
        }
        else {
            res.push(res[res.length - 1] + 1);
        }
        return res;
    }
    _updatePercentRangeStops(rangeStops, min, max) {
        for (var i = 0; i < rangeStops.length; i++) {
            rangeStops[i] = min + (rangeStops[i] / 100) * (max - min);
        }
    }
    _getViewport() {
        var topLeft = this.mapViewer.convertCoordinates(0, 0), bottomRight = this.mapViewer.convertCoordinates(_jquery_helpers_1.getWidth(this.contentRoot), _jquery_helpers_1.getHeight(this.contentRoot)), viewport = this.mapViewer.viewport(), center = this.mapViewer.center();
        return {
            LeftLongitude: !!topLeft[0] ? topLeft[0] : viewport[0],
            TopLatitude: !!topLeft[1] ? topLeft[1] : viewport[1],
            RightLongitude: !!bottomRight[0] ? bottomRight[0] : viewport[2],
            BottomLatitude: !!bottomRight[1] ? bottomRight[1] : viewport[3],
            CenterPointLongitude: center[0],
            CenterPointLatitude: center[1]
        };
    }
    _getClientContext() {
        return {
            clusterizationInfo: this._getClusterizationInfo(),
            widgetState: this._getWidgetState()
        };
    }
    _getClusterizationInfo() {
        return {
            viewport: this._getViewport(),
            clientSize: {
                width: _jquery_helpers_1.getWidth(this.contentRoot),
                height: _jquery_helpers_1.getHeight(this.contentRoot)
            }
        };
    }
    _getWidgetState() {
        return this.mapViewer && {
            zoomFactor: this.mapViewer.zoomFactor(),
            center: this.mapViewer.center()
        };
    }
    _updateClientStateUnsafe(clientState) {
        this._updateWidgetState(clientState.widgetState);
    }
    _updateViewport(viewport) {
        this._updateWidgetState({
            zoomFactor: this._calculateZoomFactor(viewport, _jquery_helpers_1.getWidth(this.contentRoot), _jquery_helpers_1.getHeight(this.contentRoot)),
            center: [viewport.CenterPointLongitude, viewport.CenterPointLatitude]
        });
    }
    _updateWidgetState(widgetState) {
        this._lock();
        try {
            this.mapViewer.zoomFactor(widgetState.zoomFactor);
            this.mapViewer.center(widgetState.center);
        }
        finally {
            this._unlock();
        }
    }
    _updateContentSizeUnsafe() {
        super._updateContentSizeUnsafe();
        if (!!this.mapViewer) {
            if (this.clientState)
                this._updateWidgetState(this.clientState.widgetState);
            else
                this._updateViewport(this.options.ViewModel.Viewport);
            this.mapViewer.render();
            this._onClientStateUpdate(this._getClientContext());
        }
    }
    _onViewPortChanged() {
        if (!this._isLocked()) {
            this.clientState = this._getClientContext();
            this.viewportChangedCallback && this.viewportChangedCallback(this.clientState.clusterizationInfo.viewport);
            this._onClientStateUpdate(this.clientState);
            this._toggleInitialExtentChanged(true);
        }
    }
    onInitialExtent(newViewport) {
        if (this.hasWidget) {
            this._onInitialExtentUnsafe(newViewport);
        }
        else {
            this._onInitialExtentBase(newViewport);
        }
    }
    _onInitialExtentUnsafe(newViewport) {
        this._updateViewport(newViewport || this.options.ViewModel.Viewport);
        this.clientState = null;
        this._onClientStateUpdate(this._getClientContext());
    }
    _onInitialExtentBase(newViewport) {
        this.clientState = null;
    }
    _getWidget() {
        return this.mapViewer;
    }
    _subscribeItemEvents() {
        var that = this;
        this.mapViewer.option('onCenterChanged', function () { that._onViewPortChanged(); });
        this.mapViewer.option('onZoomFactorChanged', function () { that._onViewPortChanged(); });
    }
    _unsubscribeItemEvents() {
        this.mapViewer.option('onCenterChanged', null);
        this.mapViewer.option('onZoomFactorChanged', null);
    }
    _toggleInitialExtentChanged(changed) {
        if (this.isInitialExtentChanged != changed) {
            this.isInitialExtentChanged = changed;
            this.initialExtentChanged && this.initialExtentChanged(this.isInitialExtentChanged);
        }
    }
}
exports.mapItem = mapItem;
