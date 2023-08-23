﻿/**
* DevExpress Dashboard (_bubble-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bubbleMapItem = void 0;
const color_1 = require("devextreme/color");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _geo_point_map_item_base_1 = require("./_geo-point-map-item-base");
class bubbleMapItem extends _geo_point_map_item_base_1.geoPointMapItemBase {
    constructor(container, options) {
        super(container, options);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    _getMarkerLayers() {
        return [this.mapViewer.getLayerByName('bubble')];
    }
    _configureMarkerLayers(viewModel) {
        var markerDataSource = this._getMarkerDataSource(), markerSettings = markerDataSource.length > 0 ? this._getMarker(viewModel, markerDataSource) : null;
        return [Object.assign({ name: 'bubble', type: 'marker', elementType: 'bubble', dataField: 'value', dataSource: markerDataSource }, markerSettings)];
    }
    _getMarkerDataSource() {
        var viewModel = this.options.ViewModel, markerDataSource = [], point;
        for (var i = 0; i < this._dataController.getCount(); i++) {
            point = this._dataController.getPoint(i);
            markerDataSource.push({
                coordinates: [point.lon, point.lat],
                attributes: {
                    latSelection: point.latSel,
                    lonSelection: point.lonSel,
                    selected: this._isSelected([point.latSel, point.lonSel]),
                    value: point.weight || (point.pointsCount > 1 ? 1 : 0),
                    colorValue: point.color || 0,
                    tooltip: this._getBubbleTooltip(viewModel, point.weightText, point.colorText, point.pointsCount),
                    dimensionsTooltip: this._getDimensionsTooltipHtml(point.tooltipDimensions),
                    measuresTooltip: this._getMeasuresTooltipHtml(point.tooltipMeasures)
                }
            });
        }
        return markerDataSource;
    }
    _getMarker(viewModel, markerDataSource) {
        var rangeStops = viewModel.ColorId ? this._getBubbleRangeStops(viewModel.Colorizer, markerDataSource) : [0, 1], colors = this._getBubbleColors(viewModel.Colorizer.Colors, rangeStops.length - 1), minSize, maxSize, options = {
            palette: colors,
            colorGroups: rangeStops,
            colorGroupingField: 'colorValue',
            sizeGroups: viewModel.WeightId ? this._getBubbleWeightRangeStops(markerDataSource) : null
        }, baseMarkers = super._getMarker(viewModel, markerDataSource);
        if (viewModel.WeightId) {
            minSize = 20;
            maxSize = 60;
        }
        else {
            var res = this._getMinMaxValues(markerDataSource);
            if (res.min !== res.max) {
                minSize = 20;
                maxSize = 40;
            }
            else if (res.min === 1) {
                minSize = 40;
                maxSize = 40;
            }
            else {
                minSize = 20;
                maxSize = 20;
            }
        }
        options.minSize = minSize;
        options.maxSize = maxSize;
        return _jquery_helpers_1.deepExtend(baseMarkers, options);
    }
    _getColorLegend(viewModel) {
        var that = this;
        if (!viewModel.ColorId) {
            return;
        }
        var legend = super._getColorLegend(viewModel);
        if (legend) {
            legend.source.layer = 'bubble';
            legend.customizeText = function (arg) {
                return that._dataController.formatColor(arg.start);
            };
        }
        return legend;
    }
    _getWeightLegend(viewModel) {
        var that = this;
        if (!viewModel.WeightId) {
            return;
        }
        var legend = super._getWeightLegend(viewModel);
        if (legend) {
            legend.source.layer = 'bubble';
            legend.customizeText = function (arg) {
                return that._dataController.formatWeight(arg.start);
            };
        }
        return legend;
    }
    _getBubbleTooltip(viewModel, weight, color, pointsCount) {
        var strs = [];
        if (pointsCount && pointsCount > 1) {
            strs.push(this._pointsCountTooltip(pointsCount));
        }
        if (weight) {
            strs.push(this._getToolTip(viewModel.WeightName, weight));
        }
        if (color && viewModel.ColorName !== viewModel.WeightName) {
            strs.push(this._getToolTip(viewModel.ColorName, color));
        }
        return strs.join('<br>');
    }
    _getBubbleRangeStops(colorizer, markerDataSource) {
        var max = markerDataSource[0].attributes.colorValue, min = markerDataSource[0].attributes.colorValue;
        for (var i = 1; i < markerDataSource.length; i++) {
            if (markerDataSource[i].attributes.colorValue > max) {
                max = markerDataSource[i].attributes.colorValue;
            }
            if (markerDataSource[i].attributes.colorValue < min) {
                min = markerDataSource[i].attributes.colorValue;
            }
        }
        return this._updateRangeStops(colorizer.RangeStops, min, max, colorizer.UsePercentRangeStops);
    }
    _getBubbleWeightRangeStops(markerDataSource) {
        var max = markerDataSource[0].attributes.value, min = markerDataSource[0].attributes.value;
        for (var i = 1; i < markerDataSource.length; i++) {
            if (markerDataSource[i].attributes.value > max) {
                max = markerDataSource[i].attributes.value;
            }
            if (markerDataSource[i].attributes.value < min) {
                min = markerDataSource[i].attributes.value;
            }
        }
        return this._updateRangeStops([0, 25, 50, 75], min, max, true);
    }
    _getBubbleColors(colorModels, defaultColorsCount) {
        var colors = this._getColors(colorModels);
        return colors ? colors : this._getDefaultBubbleColorizerColors(defaultColorsCount);
    }
    _getDefaultBubbleColorizerColors(count) {
        var startColor = new color_1.default('rgb(54, 170, 206)'), endColor = new color_1.default('rgb(255, 93, 106)'), colors = [];
        if (count === 1) {
            return [startColor.toHex()];
        }
        for (var i = 0; i < count; i++) {
            colors.push(startColor.blend(endColor, i / (count - 1)).toHex());
        }
        return colors;
    }
    _getDataPointMeasureIds() {
        var viewModel = this.options.ViewModel, measureIds = [];
        measureIds.push(viewModel.WeightId);
        measureIds.push(viewModel.ColorId);
        return measureIds;
    }
}
exports.bubbleMapItem = bubbleMapItem;
