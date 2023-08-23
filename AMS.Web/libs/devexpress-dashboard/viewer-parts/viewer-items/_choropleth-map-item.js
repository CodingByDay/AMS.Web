﻿/**
* DevExpress Dashboard (_choropleth-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choroplethMapItem = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _z_index_1 = require("../../data/_z-index");
const _consts_1 = require("../widgets/indicators/_consts");
const _map_item_1 = require("./_map-item");
class choroplethMapItem extends _map_item_1.mapItem {
    constructor(container, options) {
        super(container, options);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    selectTuple(tuple, state) {
        var that = this;
        that.mapViewer.getLayerByName('area').getElements().forEach(item => {
            if (item.attribute('selectionName') == tuple[0].value)
                item.selected(state);
        });
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        var that = this;
        this.clearSelection();
        if (values && values.length) {
            that.mapViewer.getLayerByName('area').getElements().forEach(item => {
                values.forEach(value => {
                    if (item.attribute('selectionName') == value)
                        item.selected(true);
                });
            });
        }
    }
    updateContentStateUnsafe() {
        this.mapViewer.option('layers[0].hoverEnabled', this._getCustomHoverEnabled());
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var options = _jquery_helpers_1.deepExtend(this._getMapViewerOptions(), this._getChoroplethMapViewerOptions());
        this._renderContentInternal(element, changeExisting, options);
        return false;
    }
    _getChoroplethMapViewerOptions() {
        var that = this, viewModel = that.options.ViewModel, mapItems = viewModel.MapItems, mapDataSource = that._getMapDataSource(mapItems, viewModel.ShapeTitleAttributeName), choroplethColorizer = viewModel.ChoroplethColorizer, tooltipAttributeName = viewModel.ToolTipAttributeName, tooltipMeasures = viewModel.TooltipMeasures, colors, rangeStops, legend, i;
        for (i = 0; i < mapItems.length; i++) {
            var attributeText = that._findAttributeValueByName(mapItems[i].Attributes, tooltipAttributeName);
            mapDataSource[i].attributes.tooltip = '<b>' + that._getHtml(attributeText) + '</b>';
        }
        if (choroplethColorizer && that._dataController.hasRecords()) {
            if (choroplethColorizer.ValueName) {
                that._fillValueMapDataSourceAttrs(mapDataSource, choroplethColorizer, tooltipMeasures, mapItems);
                rangeStops = that._getRangeStops(choroplethColorizer);
                colors = that._getColors(choroplethColorizer.Colorizer.Colors);
                if (!colors) {
                    colors = rangeStops.length > 2 ? ['#5F8195', '#B55951'] : ['#5F8195'];
                }
                legend = that._getColorLegend(viewModel.Legend, that._dataController.getMeasureDescriptorById(choroplethColorizer.ValueId));
            }
            if (choroplethColorizer.DeltaValueName) {
                that._fillDeltaMapDataSourceAttrs(mapDataSource, choroplethColorizer, tooltipMeasures, mapItems);
                colors = ['rgb(229, 82, 83)', 'rgb(224, 194, 58)', 'rgb(154, 181, 126)'];
                rangeStops = [0, 1, 2, 3];
            }
        }
        return {
            layers: that._configureGeometryLayers(mapDataSource, that._getArea(viewModel, colors, rangeStops)),
            onClick: function (e) {
                if (e.target && e.target.layer.name === 'area' && e.target.attribute('selectionName')) {
                    that._raiseItemClick(e.target);
                }
            },
            legends: [legend],
            tooltip: {
                enabled: true,
                zIndex: _z_index_1.zIndex.dashboardItemTooltips,
                container: _utils_1.tooltipContainerSelector,
                customizeTooltip: function (arg) {
                    if (arg.layer.name === 'area')
                        return {
                            html: arg.attribute('tooltip')
                        };
                }
            }
        };
    }
    _getColorLegend(legendViewModel, measureDescriptor) {
        var legend = this._getLegend(legendViewModel);
        if (legend) {
            legend.source = {
                layer: 'area',
                grouping: 'color'
            };
            legend.customizeText = function (arg) {
                return measureDescriptor.format(arg.start);
            };
        }
        return legend;
    }
    _fillMeasureToolTip(mapDataSourceItem, attribute, tooltipMeasures) {
        var displayText, tooltipViewModel, i;
        if (tooltipMeasures) {
            for (i = 0; i < tooltipMeasures.length; i++) {
                tooltipViewModel = tooltipMeasures[i];
                displayText = this._dataController.getDisplayText(attribute, tooltipViewModel.DataId);
                if (displayText != null) {
                    mapDataSourceItem.attributes.tooltip += '<br>' + this._getToolTip(tooltipViewModel.Caption, displayText);
                }
            }
        }
    }
    _fillValueMapDataSourceAttrs(mapDataSource, choroplethColorizer, tooltipMeasures, mapItems) {
        var attributeName = choroplethColorizer.AttributeName, attribute, selectionName, displayText;
        for (var i = 0; i < mapItems.length; i++) {
            attribute = this._findAttributeValueByName(mapItems[i].Attributes, attributeName);
            selectionName = this._dataController.getUniqueValue(attribute);
            if (selectionName) {
                displayText = this._dataController.getDisplayText(attribute, choroplethColorizer.ValueId);
                mapDataSource[i].attributes.selectionName = selectionName;
                mapDataSource[i].attributes.selected = this._isSelected([selectionName]);
                mapDataSource[i].attributes.value = this._dataController.getValue(attribute, choroplethColorizer.ValueId);
                mapDataSource[i].attributes.tooltip += '<br>' + this._getToolTip(choroplethColorizer.ValueName, displayText);
                this._correctAttributesTitle(mapDataSource[i].attributes, displayText);
                this._fillMeasureToolTip(mapDataSource[i], attribute, tooltipMeasures);
            }
        }
    }
    _fillDeltaMapDataSourceAttrs(mapDataSource, choroplethColorizer, tooltipMeasures, mapItems) {
        var attributeName = choroplethColorizer.AttributeName, selectionName, attribute, toolTip, deltaValue, value, isGood, displayText, indicatorType;
        for (var i = 0; i < mapItems.length; i++) {
            attribute = this._findAttributeValueByName(mapItems[i].Attributes, attributeName);
            selectionName = this._dataController.getUniqueValue(attribute);
            if (selectionName) {
                mapDataSource[i].attributes.selectionName = selectionName;
                mapDataSource[i].attributes.selected = this._isSelected([selectionName]);
                deltaValue = this._dataController.getDeltaValue(attribute, choroplethColorizer.DeltaValueId);
                isGood = deltaValue.getIsGood().getValue();
                indicatorType = this._convertIndicatorType(deltaValue.getIndicatorType().getValue());
                mapDataSource[i].attributes.value = this._getDeltaColorValue(indicatorType, isGood);
                displayText = deltaValue.getActualValue().getDisplayText();
                toolTip = '<br>' + this._getToolTip(choroplethColorizer.ActualValueName, displayText);
                value = this._getDeltaValue(deltaValue, choroplethColorizer.DeltaValueType);
                if (value) {
                    displayText = value.getDisplayText();
                    let deltaValueName = choroplethColorizer.DeltaValueType === 'TargetValue' ? choroplethColorizer.TargetValueName : choroplethColorizer.DeltaValueName;
                    toolTip += '<br>' + this._getToolTip(deltaValueName, displayText);
                }
                mapDataSource[i].attributes.tooltip += toolTip;
                this._correctAttributesTitle(mapDataSource[i].attributes, displayText);
                this._fillMeasureToolTip(mapDataSource[i], attribute, tooltipMeasures);
            }
        }
    }
    _correctAttributesTitle(attributes, displayText) {
        var viewModel = this.options.ViewModel;
        if (viewModel.IncludeSummaryValueToShapeTitle) {
            if (attributes.title)
                attributes.title += '\r\n' + displayText;
            else
                attributes.title = displayText;
        }
    }
    _getDeltaValue(deltaValue, deltaValueType) {
        switch (deltaValueType) {
            case 'AbsoluteVariation':
                return deltaValue.getAbsoluteVariation();
            case 'PercentVariation':
                return deltaValue.getPercentVariation();
            case 'PercentOfTarget':
                return deltaValue.getPercentOfTarget();
            case 'TargetValue':
                return deltaValue.getTargetValue();
            case 'ActualValue':
            default:
                return null;
        }
    }
    _findAttributeValueByName(attributes, attributeName) {
        for (var i = 0; i < attributes.length; i++) {
            if (attributes[i].Name === attributeName) {
                return attributes[i].Value;
            }
        }
    }
    _getRangeStops(choroplethColorizer) {
        var minMax = this._dataController.getMinMax(choroplethColorizer.ValueId);
        return this._updateRangeStops(choroplethColorizer.Colorizer.RangeStops, minMax.min, minMax.max, choroplethColorizer.Colorizer.UsePercentRangeStops);
    }
    _convertIndicatorType(type) {
        var indicatorTypes = ['none', 'up', 'down', 'warning'];
        return indicatorTypes[type];
    }
    _getDeltaColorValue(indicatorType, isGood) {
        switch (indicatorType) {
            case _consts_1.indicatorType.up:
            case _consts_1.indicatorType.down:
                return isGood ? 2.5 : 0.5;
            case _consts_1.indicatorType.warning:
                return 1.5;
            default:
                return -1;
        }
    }
    _getArea(viewModel, colors, rangeStops) {
        var that = this, selectionDisabled = that._selectionMode() === 'none';
        return Object.assign(Object.assign({}, that._getLabelSettings(viewModel)), { colorGroupingField: 'value', colorGroups: rangeStops, palette: colors, customize: items => {
                items.forEach(item => {
                    item.selected(item.attribute('selected'));
                    if (selectionDisabled || item.attribute('value') === undefined) {
                        item.applySettings({
                            hoveredBorderColor: null,
                            hoveredClass: null,
                            hoverEnabled: false
                        });
                    }
                });
            }, selectionMode: 'multiple' });
    }
    _getDataPoint(element) {
        var that = this;
        return {
            getValues: function () {
                return that._getElementInteractionValue(element, that.options.ViewModel);
            },
            getMeasureIds: function () {
                return [that.options.ViewModel.ChoroplethColorizer.ValueId];
            },
            getDeltaIds: function () {
                return [];
            }
        };
    }
    _getElementInteractionValue(element, viewModel) {
        return !!this.options.ViewModel.ChoroplethColorizer ? [element.attribute('selectionName')] : [];
    }
}
exports.choroplethMapItem = choroplethMapItem;
