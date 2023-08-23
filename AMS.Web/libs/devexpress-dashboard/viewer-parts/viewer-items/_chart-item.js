﻿/**
* DevExpress Dashboard (_chart-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartItem = void 0;
const chart_1 = require("devextreme/viz/chart");
const item_data_axis_names_1 = require("../../data/item-data/item-data-axis-names");
const _chart_helper_1 = require("../../data/_chart-helper");
const _common_1 = require("../../data/_common");
const _format_helper_1 = require("../../data/_format-helper");
const _formatter_1 = require("../../data/_formatter");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _selection_helper_1 = require("../../data/_selection-helper");
const _utils_1 = require("../../data/_utils");
const _z_index_1 = require("../../data/_z-index");
const _chart_item_style_settings_provider_1 = require("../conditional-formatting/_chart-item-style-settings-provider");
const _render_helper_1 = require("../widgets/_render-helper");
const _dx_devextreme_themes_integration_1 = require("../_dx-devextreme-themes-integration");
const _base_item_1 = require("./_base-item");
class chartItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
        this.itemElementCustomColor = _jquery_helpers_1.createJQueryCallbacks();
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    dispose() {
        super.dispose();
        this.chartViewer && this.chartViewer.dispose();
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        this._styleSettingsProvider = new _chart_item_style_settings_provider_1.ChartItemStyleSettingsProvider();
        this._styleSettingsProvider.initialize(this.options.ConditionalFormattingModel);
        if (this.dataController) {
            this._dataController.elementCustomColor = (e) => this._elementCustomColor(e);
            this._dataController.styleSettingsProvider = this._styleSettingsProvider;
        }
    }
    _clearSelectionUnsafe() {
        this.chartViewer.clearSelection();
    }
    selectTupleUnsafe(tuple, state) {
        _selection_helper_1.selectionHelper.setSelectedPoint(this.chartViewer, _utils_1.getAxisPointValue(tuple, item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis), _utils_1.getAxisPointValue(tuple, item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis), state);
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.clearSelection();
        this._applySelection();
    }
    updateContentStateUnsafe() {
        if (this._getCustomHoverEnabled()) {
            var hoverMode = null, targetAxes = this._getTargetAxes();
            if (targetAxes.length == 1) {
                if (targetAxes[0] == item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis)
                    hoverMode = _chart_helper_1.chartHelper.SelectionMode.Argument;
                else
                    hoverMode = _chart_helper_1.chartHelper.SelectionMode.Series;
            }
            else if (targetAxes.length == 2) {
                hoverMode = _chart_helper_1.chartHelper.SelectionMode.Points;
            }
            this.chartViewer.option('commonSeriesSettings.hoverMode', this._convertHoverMode(hoverMode));
            this.chartViewer.option('commonSeriesSettings.point.hoverMode', this._convertPointHoverMode(hoverMode));
        }
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var opts = this._getViewOptions();
        if (changeExisting && this.chartViewer) {
            switch (this.options.ContentType) {
                case _common_1.contentType.viewModel:
                    break;
                default:
                    _jquery_helpers_1.deepExtend(opts, this._getCommonOptions());
                    break;
            }
            this._raiseItemWidgetOptionsPrepared(opts);
            this.chartViewer.option(opts);
        }
        else {
            var options = Object.assign(Object.assign({}, opts), this._getCommonOptions());
            this._raiseItemWidgetOptionsPrepared(options);
            this.chartViewer = new chart_1.default(element, options);
        }
        return false;
    }
    getInfoUnsafe() {
        var info = super.getInfoUnsafe();
        var zoomAndPanMode = this.chartViewer.option('zoomAndPan');
        if (zoomAndPanMode && (zoomAndPanMode === 'both' || zoomAndPanMode === 'pan')) {
            var viewport = this.chartViewer.getVisibleArgumentBounds();
            info = _jquery_helpers_1.deepExtend(info, {
                chartViewport: {
                    min: this._dataController.getArgumentUniquePath(viewport.minVisible),
                    max: this._dataController.getArgumentUniquePath(viewport.maxVisible)
                }
            });
        }
        return info;
    }
    _elementCustomColor(eventArgs) {
        this.itemElementCustomColor.fire(this.getName(), eventArgs);
    }
    _getZoomAndPanOption(viewModel) {
        var zoomAndPanOptions = {
            argumentAxis: 'none'
        };
        if (viewModel.AxisX.EnableZooming) {
            zoomAndPanOptions.argumentAxis = 'both';
        }
        else if (viewModel.AxisX.LimitVisiblePoints) {
            zoomAndPanOptions.argumentAxis = 'pan';
        }
        return zoomAndPanOptions;
    }
    _getViewOptions() {
        var viewModel = this.options ? this.options.ViewModel : undefined;
        if (!viewModel)
            return {};
        let that = this;
        const forceShowPointMarkers = viewModel.Panes
            .reduce((seriesTemplates, pane) => [...seriesTemplates, ...pane.SeriesTemplates], [])
            .reduce((forceShow, seriesTemplate) => forceShow || seriesTemplate.ForceShowPointMarkers, false);
        var dataSourceAndSeries = that._dataController.getDataSourceAndSeries(that._isEncodeHtml()), panes = viewModel.Panes, isSelectable = that.isInteractivityActionEnabled(), seriesFormats = {}, isDiscreteArgument = that._dataController.isDiscreteArgument(), argumentAxisLabelFormat = that._dataController.getAxisXFormat(), rotated = viewModel.Rotated, axisGridColor = _dx_devextreme_themes_integration_1.getBaseColorScheme() === 'light' ? '#d3d3d3' : '#555555', isOverlappingModeHide = function () {
            var isHideMode = false;
            panes.forEach(pane => {
                pane.SeriesTemplates.forEach(seriesTemplate => {
                    if (seriesTemplate.PointLabel) {
                        var pointLabelsEnabled = that._dataController.checkSeriesTemplatePointLabels(seriesTemplate);
                        if (pointLabelsEnabled && (seriesTemplate.PointLabel.OverlappingMode == 'Hide' || seriesTemplate.PointLabel.OverlappingMode == 'Reposition'))
                            isHideMode = true;
                    }
                });
            });
            return isHideMode;
        }, configureLogarithmicOptions = function (axis, axisModel) {
            if (axisModel.Logarithmic) {
                axis.type = 'logarithmic';
                axis.logarithmBase = axisModel.LogarithmicBase;
            }
        }, customizeTextProc = function (isPercentAxis, isScientificAxis, customFormat) {
            return function () {
                if (customFormat != null)
                    return _format_helper_1.DashboardFormatHelper.format(this.value, _formatter_1.convertToFormat({ NumericFormat: customFormat }));
                if (isPercentAxis)
                    return _formatter_1.formatPercentValue(this.value);
                if (isScientificAxis)
                    return _formatter_1.formatScientificAxisValue(this.value);
                return _formatter_1.formatAxisValue(this.value, this.min, this.max);
            };
        }, options = {
            panes: [],
            valueAxis: [],
            rotated: rotated,
            zoomAndPan: this._getZoomAndPanOption(viewModel),
            resizePanesOnZoom: true,
            scrollBar: {
                visible: viewModel.AxisX.EnableZooming || viewModel.AxisX.LimitVisiblePoints,
                position: 'bottom'
            },
            autoHidePointMarkers: !forceShowPointMarkers
        };
        options.resolveLabelsOverlapping = isOverlappingModeHide();
        options.disableTwoWayBinding = true;
        options.resolveLabelOverlapping = isOverlappingModeHide() ? 'hide' : 'none';
        panes.forEach((pane, index) => {
            var paneName = that._dataController.generatePaneName(pane.Name, index), isPrimaryAxisInPercentFormat = that._isAxisInPercentFormat(pane, false), isPrimaryAxisInScientificFormat = that._isAxisInScientificFormat(pane, false), isSecondaryAxisInPercentFormat = that._isAxisInPercentFormat(pane, true), isSecondaryAxisInScientificFormat = that._isAxisInScientificFormat(pane, true);
            seriesFormats[paneName] = {};
            options.panes.push({
                name: paneName
            });
            let axis = {
                name: paneName + 'primary',
                position: rotated ? 'bottom' : 'left',
                pane: paneName,
                inverted: pane.PrimaryAxisY.Reverse,
                color: axisGridColor,
                tick: {
                    visible: false,
                },
                minorTick: {
                    visible: false,
                },
                label: {
                    visible: pane.PrimaryAxisY.Visible,
                    customizeText: customizeTextProc(isPrimaryAxisInPercentFormat, isPrimaryAxisInScientificFormat, pane.PrimaryAxisY.Format && pane.PrimaryAxisY.Format.NumericFormat)
                },
                title: {
                    text: pane.PrimaryAxisY.Visible ? pane.PrimaryAxisY.Title : null
                },
                visible: pane.PrimaryAxisY.Visible,
                grid: {
                    visible: pane.PrimaryAxisY.ShowGridLines
                },
                showZero: pane.PrimaryAxisY.ShowZeroLevel
            };
            configureLogarithmicOptions(axis, pane.PrimaryAxisY);
            options.valueAxis.push(axis);
            if (pane.SecondaryAxisY) {
                let axis = {
                    name: paneName + 'secondary',
                    position: rotated ? 'top' : 'right',
                    pane: paneName,
                    inverted: pane.SecondaryAxisY.Reverse,
                    color: axisGridColor,
                    tick: {
                        visible: false,
                    },
                    minorTick: {
                        visible: false,
                    },
                    label: {
                        visible: pane.SecondaryAxisY.Visible,
                        customizeText: customizeTextProc(isSecondaryAxisInPercentFormat, isSecondaryAxisInScientificFormat, pane.SecondaryAxisY.Format && pane.SecondaryAxisY.Format.NumericFormat)
                    },
                    title: {
                        text: pane.SecondaryAxisY.Visible ? pane.SecondaryAxisY.Title : null
                    },
                    visible: pane.SecondaryAxisY.Visible,
                    grid: {
                        visible: pane.SecondaryAxisY.ShowGridLines
                    },
                    showZero: pane.SecondaryAxisY.ShowZeroLevel
                };
                configureLogarithmicOptions(axis, pane.SecondaryAxisY);
                options.valueAxis.push(axis);
            }
        });
        if (rotated) {
            options.panes.reverse();
        }
        options.commonSeriesSettings = {
            hoverMode: isSelectable ? that._convertHoverMode(viewModel.SelectionMode) : 'none',
            point: {
                visible: false,
                hoverMode: isSelectable ? that._convertPointHoverMode(viewModel.SelectionMode) : 'none'
            },
            stackedbar: {
                label: {
                    backgroundColor: 'none'
                }
            }
        };
        var zoomArguments = that._dataController ? that._dataController.getZoomArguments() : null;
        options.argumentAxis = {
            argumentType: null,
            inverted: viewModel.AxisX.Reverse,
            color: axisGridColor,
            tick: {
                visible: false,
            },
            minorTick: {
                visible: false,
            },
            label: {
                visible: viewModel.AxisX.Visible,
                overlappingBehavior: (!viewModel.Argument.IsOrderedDiscrete && isDiscreteArgument ? 'auto' : 'hide'),
                customizeText: function (argument) {
                    return that._dataController.getAxisXLabelText(argument);
                }
            },
            title: {
                text: viewModel.AxisX.Visible ? viewModel.AxisX.Title : null
            },
            grid: {
                visible: viewModel.AxisX.ShowGridLines
            },
            visible: viewModel.AxisX.Visible,
            valueMarginsEnabled: _chart_helper_1.chartHelper.allowArgumentAxisMargins(panes),
            tickInterval: null,
            visualRange: zoomArguments ? [zoomArguments.start, zoomArguments.end] : [null, null]
        };
        configureLogarithmicOptions(options.argumentAxis, viewModel.AxisX);
        if (isDiscreteArgument) {
            options.argumentAxis.type = 'discrete';
            options.argumentAxis.argumentType = 'string';
        }
        else {
            if (options.argumentAxis.type === undefined)
                options.argumentAxis.type = 'continuous';
        }
        options.dataPrepareSettings = {
            sortingMethod: false
        };
        if (argumentAxisLabelFormat && !(viewModel.Argument && viewModel.Argument.IsContinuousDateTimeScale)) {
            options.argumentAxis.axisDivisionFactor = 70;
            switch (argumentAxisLabelFormat.format) {
                case 'monthYear':
                    options.argumentAxis.tickInterval = 'month';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                case 'dayMonthYear':
                    options.argumentAxis.tickInterval = 'day';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                case 'quarterYear':
                    options.argumentAxis.tickInterval = 'quarter';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                case 'dateHour':
                    options.argumentAxis.tickInterval = 'hour';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                case 'dateHourMinute':
                    options.argumentAxis.tickInterval = 'minute';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                case 'dateHourMinuteSecond':
                    options.argumentAxis.tickInterval = 'second';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                case 'weekYear':
                    options.argumentAxis.workWeek = [argumentAxisLabelFormat.firstDayOfWeek];
                    options.argumentAxis.tickInterval = 'week';
                    options.argumentAxis.label.minSpacing = 10;
                    break;
                default:
                    options.argumentAxis.tickInterval = null;
                    break;
            }
        }
        if (viewModel.Legend) {
            let legendParams = viewModel.Legend.IsInsideDiagram ?
                _chart_helper_1.chartHelper.convertLegendInsidePosition(viewModel.Legend.InsidePosition) :
                _chart_helper_1.chartHelper.convertLegendOutsidePosition(viewModel.Legend.OutsidePosition);
            legendParams.border = {
                visible: viewModel.Legend.IsInsideDiagram
            };
            options.legend = Object.assign(Object.assign({}, legendParams), { position: viewModel.Legend.IsInsideDiagram ? 'inside' : 'outside', visible: viewModel.Legend.Visible, itemTextPosition: 'right', customizeText: (args) => this._dataController.getLegendSeriesDisplayName(args.seriesName) });
            if (viewModel.Legend.IsInsideDiagram)
                options.legend.margin = 10;
        }
        return _jquery_helpers_1.deepExtend(dataSourceAndSeries, options);
    }
    _getCommonOptions() {
        var that = this, animation = that._getAnimationOptions(), options = {
            sortSeriesPointsByAxis: true,
            redrawOnResize: false,
            pointSelectionMode: 'multiple',
            seriesSelectionMode: 'multiple',
            palette: _render_helper_1.RenderHelper.getDefaultPalette(),
            encodeHtml: that._isEncodeHtml(),
            onIncidentOccurred: (e) => {
                if (e['target'].id === 'W2002' && (e['target'].args.indexOf('legendFakeArgument') || (e['target'].args.indexOf('legendFakeValue'))))
                    return;
                if (e['target'].id === 'W2103' || e['target'].id === 'W2104' || e['target'].id === 'W2105' || e['target'].id === 'W2106')
                    return;
                _render_helper_1.RenderHelper.widgetIncidentOccurred(e);
            },
            adjustOnZoom: false,
            customizePoint: function () {
                var argumentTag = this.tag, seriesTag = this.series.tag, result = {};
                if (!_chart_helper_1.chartHelper.isFinancialType(this.series.type)) {
                    result.color = that._dataController.getColor(argumentTag.axisPoint, seriesTag.axisPoint, that._getMeasuresIds(seriesTag), seriesTag.colorMeasureId);
                }
                let interactionValue = that._getElementInteractionValue(this, that.options.ViewModel);
                if (interactionValue && interactionValue.axisPoint && !_utils_1.allowSelectValue(interactionValue.axisPoint.getUniquePath())) {
                    result.hoverStyle = { hatching: 'none' };
                }
                return result;
            }
        };
        options.onPointClick = function (e) {
            that._raiseItemClick(e.target);
            e['cancel'] = true;
        };
        options.onSeriesClick = function (e) {
            that._raiseItemClick({ series: e.target });
        };
        options.onPointHoverChanged = function (e) {
            that._raiseItemHover(e.target);
        };
        options.tooltip = {
            enabled: true,
            container: _utils_1.tooltipContainerSelector,
            contentTemplate: function (obj) {
                var pane = obj.point.series.pane, argumentText = that._dataController.getTooltipArgumentText(obj), allSeries = that.chartViewer.getAllSeries();
                var table = document.createElement('table');
                let ARGUMENT_VALUE_CLASS = 'dx-argument-value';
                let createCell = (element, className) => {
                    var tr = document.createElement('tr');
                    var td = document.createElement('td');
                    if (className)
                        td.classList.add(className);
                    tr.appendChild(td);
                    if (typeof element === 'string')
                        td.innerHTML = element;
                    else
                        td.appendChild(element);
                    return tr;
                };
                table.appendChild(createCell(that._getHtml(argumentText), ARGUMENT_VALUE_CLASS));
                let valueCount = 0;
                let truncated = false;
                for (let i = 0; i < allSeries.length; i++) {
                    let series = allSeries[i];
                    if (series.pane === pane) {
                        var points = series.getPointsByArg(obj.argument), point = points.length > 1 ? obj.point : points[0];
                        if (point) {
                            var textNode = that._dataController.customizeTooltipText(series, point, series.tag.valueFormats, that._isEncodeHtml());
                            if (textNode) {
                                if (valueCount < chartItem._maxTooltipValues) {
                                    table.appendChild(createCell(textNode));
                                    valueCount++;
                                }
                                else {
                                    truncated = true;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (truncated) {
                    table.appendChild(createCell('...'));
                }
                var div = document.createElement('div');
                div.appendChild(table);
                return div;
            },
            font: {
                size: 14
            },
            zIndex: _z_index_1.zIndex.dashboardItemTooltips
        };
        options.commonPaneSettings = {
            border: {
                visible: true
            }
        };
        options.animation = {
            enabled: animation.enabled,
            duration: animation.duration
        };
        options.margin = {
            top: 10,
            right: 22,
            bottom: 22,
            left: 22
        };
        return options;
    }
    _applySelectionUnsafe() {
        var that = this, viewModel = that.options.ViewModel, tuples = that.getSelectedTuples();
        if (viewModel && viewModel.SelectionEnabled && tuples.length > 0) {
            that.chartViewer.clearSelection();
            tuples.forEach(tuple => {
                that.selectTuple(tuple, true);
            });
        }
    }
    _getDataPoint(element) {
        var that = this, elementTag = element.tag, elementSeries = element.series, elementSeriesTag = elementSeries ? elementSeries.tag : undefined, seriesValues = elementSeriesTag ? _utils_1.getTagValue(elementSeriesTag) : [], argumentValues = elementTag ? _utils_1.getTagValue(elementTag) : [], seriesIndex = elementSeries ? elementSeries.index : undefined;
        return {
            getValues: function (name) {
                switch (name) {
                    case item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis:
                        return argumentValues;
                    case item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis:
                        return seriesValues;
                    default:
                        return null;
                }
            },
            getDeltaIds: function () {
                return [];
            },
            getMeasureIds: function () {
                return that._getMeasuresIds(elementSeriesTag);
            }
        };
    }
    _getMeasuresIds(elementSeriesTag) {
        return elementSeriesTag ? elementSeriesTag.dataMembers : [];
    }
    _isMultiDataSupported() {
        return true;
    }
    _getElementInteractionValue(element, viewModel) {
        return (viewModel.SelectionEnabled && viewModel.SelectionMode === _chart_helper_1.chartHelper.SelectionMode.Series) ? element.series.tag : element.tag;
    }
    _isAxisInPercentFormat(pane, isSecondaryAxis) {
        var seriesTemplate;
        for (var i = 0; i < pane.SeriesTemplates.length; i++) {
            seriesTemplate = pane.SeriesTemplates[i];
            if (isSecondaryAxis == seriesTemplate.PlotOnSecondaryAxis && !seriesTemplate.OnlyPercentValues && !this._isFullStackedSeriesType(seriesTemplate.SeriesType))
                return false;
        }
        return true;
    }
    _isAxisInScientificFormat(pane, isSecondaryAxis) {
        var seriesTemplate;
        for (var i = 0; i < pane.SeriesTemplates.length; i++) {
            seriesTemplate = pane.SeriesTemplates[i];
            if (isSecondaryAxis == seriesTemplate.PlotOnSecondaryAxis && !seriesTemplate.OnlyScientificValues)
                return false;
        }
        return true;
    }
    _isFullStackedSeriesType(seriesType) {
        switch (seriesType) {
            case 'FullStackedArea':
            case 'FullStackedBar':
            case 'FullStackedLine':
            case 'FullStackedSplineArea':
                return true;
            default:
                return false;
        }
    }
    _convertHoverMode(selectionMode) {
        switch (selectionMode) {
            case _chart_helper_1.chartHelper.SelectionMode.Argument:
                return 'allArgumentPoints';
            case _chart_helper_1.chartHelper.SelectionMode.Series:
                return 'allSeriesPoints';
            case _chart_helper_1.chartHelper.SelectionMode.Points:
            default:
                return 'none';
        }
    }
    _convertPointHoverMode(selectionMode) {
        switch (selectionMode) {
            case _chart_helper_1.chartHelper.SelectionMode.Argument:
                return 'allArgumentPoints';
            case _chart_helper_1.chartHelper.SelectionMode.Series:
                return 'allSeriesPoints';
            case _chart_helper_1.chartHelper.SelectionMode.Points:
                return 'onlyPoint';
            default:
                return 'none';
        }
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        if (_jquery_helpers_1.isVisible(this.container)) {
            this.chartViewer.render();
        }
    }
    _getWidget() {
        return this.chartViewer;
    }
}
exports.chartItem = chartItem;
chartItem._maxTooltipValues = 20;
