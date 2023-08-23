﻿/**
* DevExpress Dashboard (_gauges-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaugesItem = void 0;
const _format_helper_1 = require("../../data/_format-helper");
const _formatter_1 = require("../../data/_formatter");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _kpi_item_1 = require("./_kpi-item");
class gaugesItem extends _kpi_item_1.kpiItem {
    constructor(container, options) {
        super(container, options);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    _getWidgetViewerOptions() {
        var options = super._getWidgetViewerOptions();
        options.useFlex = true;
        return options;
    }
    _getSpecificWidgetViewerOptions() {
        var that = this, viewModel = that.options.ViewModel, specificOptions = {
            itemOptions: {
                ignoreProportions: true
            }
        }, baseOptions = super._getSpecificWidgetViewerOptions();
        if (viewModel) {
            switch (viewModel.ViewType) {
                case _utils_1.gaugeViewType.CircularHalf:
                    specificOptions.itemOptions.proportions = 0.85;
                    specificOptions.itemOptions.minWidth = 155;
                    break;
                case _utils_1.gaugeViewType.CircularQuarterLeft:
                case _utils_1.gaugeViewType.CircularQuarterRight:
                    specificOptions.itemOptions.proportions = 1.25;
                    specificOptions.itemOptions.minWidth = 150;
                    break;
                case _utils_1.gaugeViewType.CircularThreeFourth:
                case _utils_1.gaugeViewType.CircularFull:
                    specificOptions.itemOptions.proportions = 1;
                    specificOptions.itemOptions.minWidth = 180;
                    break;
                case _utils_1.gaugeViewType.LinearVertical:
                    specificOptions.itemOptions.proportions = 1.5;
                    specificOptions.itemOptions.minWidth = 150;
                    break;
                case _utils_1.gaugeViewType.LinearHorizontal:
                    specificOptions.itemOptions.proportions = 0.5;
                    specificOptions.itemOptions.minWidth = 200;
                    break;
            }
        }
        return _jquery_helpers_1.deepExtend(specificOptions, baseOptions);
    }
    _supportAnimation() {
        return true;
    }
    _getWidgetType() {
        var viewModel = this.options.ViewModel;
        if (viewModel) {
            switch (viewModel.ViewType) {
                case _utils_1.gaugeViewType.LinearVertical:
                case _utils_1.gaugeViewType.LinearHorizontal:
                    return 'lineargauge';
                default:
                    return 'circulargauge';
            }
        }
        return 'circulargauge';
    }
    _getElementsName() {
        return 'Gauges';
    }
    _showTitle() {
        if (this.options.ViewModel) {
            return this.options.ViewModel.ShowGaugeCaptions;
        }
        else {
            return super._showTitle();
        }
    }
    _getWidget() {
        if (this.widgetsViewer) {
            var gaugeList = [];
            this.widgetsViewer.itemsList.forEach(item => {
                gaugeList.push(item._widget);
            });
            return gaugeList;
        }
        else {
            return undefined;
        }
    }
    _setSourceItemProperties(sourceItem, gaugeModel, props) {
        super._setSourceItemProperties(sourceItem, gaugeModel, props);
        var captions = props.getCaptions(), range = props.getGaugeRange(), targetValue;
        this._setVisualProperties(sourceItem, gaugeModel, range);
        if (gaugeModel.DataItemType === _utils_1.KpiValueMode.Measure) {
            sourceItem.value = props.getMeasureValue();
            sourceItem.indicator = {
                text: {
                    value: props.getMeasureDisplayText(),
                    useDefaultColor: gaugeModel.IgnoreDeltaColor
                }
            };
        }
        else {
            sourceItem.value = props.getActualValue();
            targetValue = props.getTargetValue();
            if (targetValue)
                sourceItem.subvalues = [targetValue];
            sourceItem.indicator = {
                type: props.getIndicatorType(),
                hasPositiveMeaning: props.getIsGood(),
                text: {
                    value: props.getMainValueText(),
                    useDefaultColor: gaugeModel.IgnoreDeltaColor
                }
            };
        }
        if (this._showTitle() && captions.length > 0) {
            sourceItem.title = {
                text: captions.join(' - '),
                font: { size: 16 },
                subtitle: { font: { size: 14 } },
                margin: { top: 4, left: 0, right: 0, bottom: 0 },
                wordWrap: 'none'
            };
        }
    }
    _setVisualProperties(sourceItem, gaugeModel, range) {
        var that = this, viewModel = that.options.ViewModel, minRangeValue = range.min, maxRangeValue = range.max, width = maxRangeValue - minRangeValue, intervalCount = range.majorTickCount - 1, tickInterval, scaleFormat = gaugeModel.ScaleFormat != null ? _formatter_1.convertToFormat({ NumericFormat: gaugeModel.ScaleFormat }) : _formatter_1.defaultNumericFormat;
        switch (viewModel.ViewType) {
            case _utils_1.gaugeViewType.CircularHalf:
                sourceItem.geometry = {
                    startAngle: 180,
                    endAngle: 0
                };
                break;
            case _utils_1.gaugeViewType.CircularQuarterLeft:
                sourceItem.geometry = {
                    startAngle: 180,
                    endAngle: 90
                };
                break;
            case _utils_1.gaugeViewType.CircularQuarterRight:
                sourceItem.geometry = {
                    startAngle: 90,
                    endAngle: 0
                };
                break;
            case _utils_1.gaugeViewType.CircularThreeFourth:
                sourceItem.geometry = {
                    startAngle: 220,
                    endAngle: 320
                };
                break;
            case _utils_1.gaugeViewType.CircularFull:
                sourceItem.geometry = {
                    startAngle: 240,
                    endAngle: 300
                };
                break;
            case _utils_1.gaugeViewType.LinearVertical:
                sourceItem.geometry = {
                    orientation: 'vertical'
                };
                break;
            case _utils_1.gaugeViewType.LinearHorizontal:
                sourceItem.geometry = {
                    orientation: 'horizontal'
                };
                break;
        }
        sourceItem.valueIndicator = {
            type: sourceItem.geometry.orientation ? 'rangeBar' : 'twoColorNeedle'
        };
        sourceItem.subvalueIndicator = {
            offset: sourceItem.geometry.orientation ? 8 : 0
        };
        sourceItem.scale = {
            startValue: minRangeValue,
            endValue: maxRangeValue,
            label: {
                format: (value) => _format_helper_1.DashboardFormatHelper.format(value, scaleFormat)
            }
        };
        if (width > 0) {
            tickInterval = width / intervalCount;
            sourceItem.scale.tick = {
                tickInterval: (width >= intervalCount) ? Math.round(tickInterval) : tickInterval,
                useTicksAutoArrangement: false
            };
        }
        sourceItem.animation = that._getAnimationOptions();
    }
}
exports.gaugesItem = gaugesItem;
