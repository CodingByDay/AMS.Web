﻿/**
* DevExpress Dashboard (_pie-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieMouseEventController = exports.pieItem = void 0;
const string_1 = require("devextreme/core/utils/string");
const $ = require("jquery");
const _chart_helper_1 = require("../../data/_chart-helper");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _selection_helper_1 = require("../../data/_selection-helper");
const _utils_1 = require("../../data/_utils");
const _z_index_1 = require("../../data/_z-index");
const item_data_axis_names_1 = require("../../data/item-data/item-data-axis-names");
const _render_helper_1 = require("../widgets/_render-helper");
const _widget_viewer_item_1 = require("./_widget-viewer-item");
var pieSizeGroup = 0;
const defaultPieProportions = 4 / 3;
const defaultPieAndLabelProportions = 3 / 5;
class pieItem extends _widget_viewer_item_1.widgetViewerItem {
    constructor(container, options) {
        super(container, options);
        this.itemElementCustomColor = _jquery_helpers_1.createJQueryCallbacks();
        this.sizeGroupId = undefined;
        this.sizeGroupId = ++pieSizeGroup;
        this._createPieMouseEventController();
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (this.dataController) {
            this._dataController.elementCustomColor = args => this._elementCustomColor(args);
        }
    }
    _clearSelectionUnsafe() {
        super._clearSelectionUnsafe();
        var that = this, viewModel = that.options.ViewModel, piesViewer = that.widgetsViewer;
        if (viewModel && viewModel.SelectionEnabled && viewModel.SelectionMode !== _chart_helper_1.chartHelper.SelectionMode.Series) {
            $.each(piesViewer.itemsList, function () {
                if (this._widget) {
                    this._widget.clearSelection();
                }
            });
        }
    }
    updateContentStateUnsafe() {
        var that = this;
        if (that._getCustomHoverEnabled()) {
            var argumentHoverMode = 'none', seriesHoverEnabled = false, targetAxes = this._getTargetAxes();
            if (targetAxes.length == 1) {
                if (targetAxes[0] == item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis)
                    argumentHoverMode = 'allArgumentPoints';
                else
                    seriesHoverEnabled = true;
            }
            else {
                if (targetAxes.length == 2) {
                    argumentHoverMode = 'point';
                    seriesHoverEnabled = true;
                }
            }
            $.each(this.widgetsViewer.itemsList, function (index, viewer) {
                viewer._widget.option('commonSeriesSettings.hoverMode', argumentHoverMode);
                viewer._hoverEnabled = seriesHoverEnabled;
            });
        }
    }
    selectTupleUnsafe(tuple, state) {
        var that = this, isPointSelection = that.options.ViewModel.SelectionMode === _chart_helper_1.chartHelper.SelectionMode.Points, seriesValue = _utils_1.getAxisPointValue(tuple, item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis), argumentValue = _utils_1.getAxisPointValue(tuple, item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis);
        $.each(that.widgetsViewer.itemsList, function (index, viewer) {
            if (seriesValue) {
                if (_selection_helper_1.selectionHelper._checkWidgetCorrespondsToValue(viewer, seriesValue)) {
                    if (argumentValue)
                        _selection_helper_1.selectionHelper.setSelectedArguments(viewer._widget, [argumentValue], state);
                    else if (isPointSelection)
                        _selection_helper_1.selectionHelper.selectWholePie(viewer._widget, state);
                    else
                        _selection_helper_1.selectionHelper.setSelectedWidgetViewer(viewer, [seriesValue], state);
                }
            }
            else if (argumentValue) {
                _selection_helper_1.selectionHelper.setSelectedArguments(viewer._widget, [argumentValue], state);
            }
        });
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.clearSelection();
        this._applySelection();
    }
    _elementCustomColor(eventArgs) {
        this.itemElementCustomColor.fire(this.getName(), eventArgs);
    }
    _createPieMouseEventController() {
        var that = this;
        that.pieMouseEventController = new pieMouseEventController();
        that.pieMouseEventController.ready.add(function () {
            var data = { pie: that.pieMouseEventController.pieData, slice: that.pieMouseEventController.sliceData };
            that._raiseItemClick(data);
        });
    }
    _isHoverEnabled() {
        return super._isHoverEnabled() && this._isItemSelectionEnabled();
    }
    _isItemSelectionEnabled() {
        var viewModel = this.options.ViewModel;
        return viewModel && viewModel.SelectionEnabled && (viewModel.SelectionMode === _chart_helper_1.chartHelper.SelectionMode.Series);
    }
    _isLabelsVisible() {
        var viewModel = this.options.ViewModel;
        return viewModel && (viewModel.LabelContentType !== 'None');
    }
    _isShowPieCaptions() {
        var viewModel = this.options.ViewModel;
        return viewModel && viewModel.ShowPieCaptions;
    }
    _supportAnimation() {
        return true;
    }
    _getSpecificWidgetViewerOptions() {
        var that = this, specificOptions = that._isLabelsVisible() ? {
            itemOptions: {
                minWidth: 200,
                proportions: defaultPieAndLabelProportions,
                ignoreProportions: true
            }
        } : {
            itemOptions: {
                minWidth: 100,
                proportions: this._isShowPieCaptions() ? defaultPieProportions : 1,
                ignoreProportions: true
            }
        };
        return _jquery_helpers_1.deepExtend(specificOptions, super._getSpecificWidgetViewerOptions());
    }
    _getWidgetType() {
        return 'pieChart';
    }
    _getDataSource() {
        if (!this.options.ViewModel) {
            return {};
        }
        var that = this, viewModel = that.options.ViewModel, isPointSelectionEnabled = that._getPointSelectionEnabled(), selectionMode = that._selectionMode(), seriesAxisPoints = that._dataController.getSeriesAxisPoints(), selectedValuesList = that._getSelectedValues(), dataSource = [], currentSeriesPath, seriesPropsValues;
        seriesAxisPoints.forEach(seriesAxisPoint => {
            currentSeriesPath = seriesAxisPoint.getUniquePath();
            that._dataController.getValueDataMembers().forEach((valueDataMember, valueIndex) => {
                let dataSourceItem = {
                    animation: that._getAnimationOptions(),
                    sizeGroup: that.sizeGroupId,
                    legend: {
                        visible: false
                    },
                    minDiameter: 0.75,
                    resolveLabelOverlapping: 'shift',
                    onIncidentOccurred: _render_helper_1.RenderHelper.widgetIncidentOccurred,
                    onPointClick: that._getSelectPointsHandler(),
                    onPointHoverChanged: that._getHoverPointsHandler(),
                    palette: _render_helper_1.RenderHelper.getDefaultPalette(),
                    pointSelectionMode: 'multiple',
                    commonSeriesSettings: {
                        hoverMode: isPointSelectionEnabled && (selectionMode !== 'none') ? 'allArgumentPoints' : 'none'
                    },
                    customizePoint: function () {
                        var result = { color: that._dataController.getColor(this.tag.axisPoint, seriesAxisPoint, that._getMeasuresIds(this.tag), this.tag.colorMeasureId) };
                        let interactionValue = that._getElementInteractionValue(this, that.options.ViewModel);
                        if (interactionValue && interactionValue.axisPoint && !_utils_1.allowSelectValue(interactionValue.axisPoint.getUniquePath())) {
                            result.hoverStyle = { hatching: 'none' };
                        }
                        return result;
                    }
                };
                dataSourceItem.tag = { axisPoint: seriesAxisPoint };
                _jquery_helpers_1.extend(dataSourceItem, that._configureHover(currentSeriesPath));
                if (selectedValuesList && that._isItemSelectionEnabled()) {
                    $.each(selectedValuesList, function (__, selectedValue) {
                        if (_utils_1.checkValuesAreEqual(currentSeriesPath, selectedValue))
                            dataSourceItem.isSelected = true;
                    });
                }
                if (viewModel.ShowPieCaptions) {
                    dataSourceItem.title = {
                        text: that._dataController.getValueDisplayNames(seriesAxisPoint, valueIndex),
                        font: {
                            size: 18
                        }
                    };
                }
                seriesPropsValues = {
                    type: (viewModel.PieType === 'Donut') ? 'doughnut' : 'pie',
                    argumentField: 'x',
                    valueField: 'y',
                    label: {
                        visible: that._isLabelsVisible(),
                        position: viewModel.LabelPosition == 'Inside' ? 'inside' : 'columns'
                    },
                    point: {
                        visible: true
                    },
                    segmentsDirection: 'anticlockwise',
                    paintNullPoints: true
                };
                if (seriesPropsValues.label.visible) {
                    seriesPropsValues.label.connector = {
                        visible: true,
                        width: 1
                    };
                    seriesPropsValues.label.customizeText = that._getFormatLabelHandler(viewModel.LabelContentType);
                }
                dataSourceItem.series = [seriesPropsValues];
                dataSourceItem.dataSource = that._dataController.createDataSource(seriesAxisPoint, valueDataMember);
                dataSourceItem.tooltip = {
                    enabled: (viewModel.TooltipContentType !== 'None')
                };
                if (dataSourceItem.tooltip.enabled) {
                    dataSourceItem.tooltip.container = _utils_1.tooltipContainerSelector;
                    dataSourceItem.tooltip.customizeTooltip = function (label) {
                        return { text: that._getFormatLabelHandler(viewModel.TooltipContentType)(label) };
                    };
                    dataSourceItem.tooltip.font = {
                        size: 14
                    };
                    dataSourceItem.tooltip.zIndex = _z_index_1.zIndex.dashboardItemTooltips;
                }
                dataSource.push(dataSourceItem);
            });
        });
        return (dataSource.length == 1 && dataSource[0].dataSource.length == 0) ? [] : dataSource;
    }
    _getPointSelectionEnabled() {
        var viewModel = this.options.ViewModel;
        return viewModel.SelectionEnabled && (viewModel.SelectionMode === _chart_helper_1.chartHelper.SelectionMode.Argument || viewModel.SelectionMode === _chart_helper_1.chartHelper.SelectionMode.Points);
    }
    _getFormatLabelHandler(valueType) {
        var that = this;
        return function (label) {
            var pointTexts = that._dataController.getPointDisplayTexts(label.point.tag, label.value, label.percent), tooltipPattern = that._getTooltipPattern(valueType);
            switch (valueType) {
                case 'Argument':
                    return pointTexts.argumentText;
                case 'Percent':
                    return pointTexts.percentText;
                case 'Value':
                    return pointTexts.valueText;
                case 'ValueAndPercent':
                    return string_1.format(tooltipPattern, pointTexts.valueText, pointTexts.percentText);
                case 'ArgumentAndPercent':
                    return string_1.format(tooltipPattern, pointTexts.argumentText, pointTexts.percentText);
                case 'ArgumentAndValue':
                    return string_1.format(tooltipPattern, pointTexts.argumentText, pointTexts.valueText);
                case 'ArgumentValueAndPercent':
                    return string_1.format(tooltipPattern, pointTexts.argumentText, pointTexts.valueText, pointTexts.percentText);
                default:
                    return '';
            }
        };
    }
    _getTooltipPattern(valueType) {
        switch (valueType) {
            case 'ValueAndPercent':
                return '{0} ({1})';
            case 'ArgumentAndPercent':
            case 'ArgumentAndValue':
                return '{0}: {1}';
            case 'ArgumentValueAndPercent':
                return '{0}: {1} ({2})';
            default:
                return '';
        }
    }
    _getElementInteractionValue(element, viewModel) {
        if (this._isItemSelectionEnabled())
            return super._getElementInteractionValue(element, viewModel);
        return element.tag;
    }
    _getOnClickHandler() {
        var that = this;
        return function (e) {
            that._pieMouseEventHandler(e.item);
        };
    }
    _getSelectPointsHandler() {
        var that = this;
        return function (e) {
            var viewModel = that.options.ViewModel, selectionMode = that._selectionMode(), isPointSelectionEnalbed = viewModel.SelectionEnabled && (viewModel.SelectionMode === _chart_helper_1.chartHelper.SelectionMode.Argument) && selectionMode !== 'none';
            that._sliceMouseEventHandler(e.target);
        };
    }
    _getOnHoverHandler() {
        var that = this;
        return function (e) {
            that.pieMouseEventController.pieData = e.item;
            that._raiseItemHover({ pie: e.item }, e.state);
        };
    }
    _getHoverPointsHandler() {
        var that = this;
        return function (e) {
            that._raiseItemHover({ pie: that.pieMouseEventController.pieData, slice: e.target });
        };
    }
    _pieMouseEventHandler(element) {
        this.pieMouseEventController.setPieData(element);
    }
    _sliceMouseEventHandler(element) {
        this.pieMouseEventController.setSliceData(element);
    }
    _getDataPoint(element) {
        var that = this, viewModel = that.options.ViewModel, slice = element.slice, sliceTag = slice ? slice.tag : undefined, pie = element.pie, pieTag = pie ? pie.tag : undefined, argumentsValues = sliceTag ? _utils_1.getTagValue(sliceTag) : [], titleValues = pieTag ? _utils_1.getTagValue(pieTag) : [], argumentIndex = (slice && !sliceTag) ? slice.index : undefined, elementIndex = (pie && !pieTag) ? pie.index : undefined, measureIndex = argumentIndex ? argumentIndex : elementIndex ? elementIndex : 0;
        return {
            getValues: function (name) {
                switch (name) {
                    case item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis:
                        return argumentsValues;
                    case item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis:
                        return titleValues;
                    default:
                        return null;
                }
            },
            getDeltaIds: function () {
                return [];
            },
            getMeasureIds: function () {
                return slice ? that._getMeasuresIds(slice.tag) : [];
            }
        };
    }
    _getMeasuresIds(sliceTag) {
        return sliceTag ? sliceTag.dataMembers : [];
    }
    _isMultiDataSupported() {
        return true;
    }
    _getWidget() {
        if (this.widgetsViewer) {
            var pieWidgetViewers = this.widgetsViewer.itemsList, piesList = [];
            $.each(pieWidgetViewers, function () {
                piesList.push(this._widget);
            });
            return piesList;
        }
        else {
            return undefined;
        }
    }
    _applySelectionUnsafe() {
        var that = this;
        that.getSelectedTuples().forEach(tuple => that.selectTuple(tuple, true));
    }
}
exports.pieItem = pieItem;
class pieMouseEventController {
    constructor() {
        this.shouldRaise = false;
        this.ready = _jquery_helpers_1.createJQueryCallbacks();
        this.timer = 0;
    }
    setPieData(data) {
        this.pieData = data;
        if (this.ready) {
            this.ready.fire();
        }
        this.pieData = undefined;
        this.sliceData = undefined;
    }
    setSliceData(data) {
        this.sliceData = data;
    }
}
exports.pieMouseEventController = pieMouseEventController;
