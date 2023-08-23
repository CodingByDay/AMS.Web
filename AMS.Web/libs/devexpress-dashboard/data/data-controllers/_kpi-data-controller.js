﻿/**
* DevExpress Dashboard (_kpi-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kpiDataController = void 0;
const _render_helper_1 = require("../../viewer-parts/widgets/_render-helper");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const _common_1 = require("../_common");
const _data_controller_base_1 = require("./_data-controller-base");
class kpiDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this._initialize();
    }
    getDataSource() {
        var that = this, axisPoints = that._axisPoints, sourceItem, dataSource = [], i;
        if (that.multiData) {
            that._iterateKpiItems(function (kpiElement) {
                if (axisPoints) {
                    for (i = 0; i < axisPoints.length; i++) {
                        sourceItem = that._createSourceItem(axisPoints[i], kpiElement);
                        dataSource.push(sourceItem);
                    }
                }
                else {
                    sourceItem = that._createSourceItem(null, kpiElement);
                    dataSource.push(sourceItem);
                }
            });
        }
        return dataSource;
    }
    _createSourceItem(axisPoint, kpiElement) {
        var that = this, deltaValue = that._getDeltaValue(axisPoint, kpiElement), measure = that.multiData.getMeasureById(kpiElement.ID), measureValue = that._getMeasureValue(axisPoint, kpiElement), sparklineValues = that._getSparklineValues(axisPoint, kpiElement), getDeltaValue = (getter) => {
            return deltaValue ? getter(deltaValue) : undefined;
        }, getCaptions = () => {
            if (axisPoint) {
                var axisName = axisPoint.getAxisName();
                if (that.drillDownState[axisName]) {
                    var text = axisPoint.getDisplayText();
                    return text == undefined ? [''] : [text];
                }
                else {
                    return axisPoint.getDisplayPath();
                }
            }
            else
                return [kpiElement.Title];
        }, properties = {
            getActualValue: function () {
                var value = getDeltaValue((d) => d.getActualValue().getValue());
                return value || measureValue.getValue();
            },
            getActualValueText: function () {
                var text = getDeltaValue((d) => d.getActualValue().getDisplayText());
                return text || measureValue.getDisplayText();
            },
            getTargetValue: function () {
                return getDeltaValue((d) => d.getTargetValue().getValue());
            },
            getTargetValueText: function () {
                return getDeltaValue((d) => d.getTargetValue().getDisplayText());
            },
            getAbsoluteVariationValue: function () {
                return getDeltaValue((d) => d.getAbsoluteVariation().getValue());
            },
            getAbsoluteVariationText: function () {
                return getDeltaValue((d) => d.getAbsoluteVariation().getDisplayText());
            },
            getPercentVariationValue: function () {
                return getDeltaValue((d) => d.getPercentVariation().getValue());
            },
            getPercentVariationText: function () {
                return getDeltaValue((d) => d.getPercentVariation().getDisplayText());
            },
            getPercentOfTargetValue: function () {
                return getDeltaValue((d) => d.getPercentOfTarget().getValue());
            },
            getPercentOfTargetText: function () {
                return getDeltaValue((d) => d.getPercentOfTarget().getDisplayText());
            },
            getDimensionValue: function (dataId) {
                return axisPoint.getParentByDimensionId(dataId).getValue();
            },
            getDimensionValueText: function (dataId) {
                return axisPoint.getParentByDimensionId(dataId).getDisplayText();
            },
            getIndicatorType: function () {
                return that._convertIndicatorType(getDeltaValue((d) => d.getIndicatorType().getValue()));
            },
            getIsGood: function () {
                return getDeltaValue((d) => d.getIsGood().getValue());
            },
            getMainValueText: function () {
                return getDeltaValue((d) => d.getDisplayValue().getDisplayText());
            },
            getSubValue1Text: function () {
                return getDeltaValue((d) => d.getDisplaySubValue1().getDisplayText());
            },
            getSubValue2Text: function () {
                return getDeltaValue((d) => d.getDisplaySubValue2().getDisplayText());
            },
            getMeasureValue: function () {
                return measureValue.getValue();
            },
            getMeasureDisplayText: function () {
                return measureValue.getDisplayText();
            },
            getSparklineOptions: function () {
                var sparklineOptions = undefined;
                if (sparklineValues) {
                    sparklineOptions = that._generateSparklineOptions(sparklineValues, kpiElement.SparklineOptions, measure.format);
                }
                return sparklineOptions;
            },
            getSelectionValues: function () {
                return axisPoint ? axisPoint.getUniquePath() : null;
            },
            getCaptions: function () {
                return getCaptions();
            },
            getTitle: function () {
                var captions = getCaptions();
                if (captions.length > 0)
                    return captions.pop();
            },
            getSubtitle: function () {
                var captions = getCaptions();
                if (captions.length > 1)
                    captions.pop();
                return captions.join(_data_controller_base_1.DEFAULT_SUBTITLE_SEPARATOR);
            },
            getGaugeRange: function () {
                return that._getGaugeRange(kpiElement);
            },
            getCardName: function () {
                return kpiElement.Title;
            },
            getStyleSettingsInfo: (ruleFilter) => {
                return this._getStyleSettingsInfo(axisPoint, kpiElement.ID, ruleFilter);
            },
            getKpiElementId: function () {
                return kpiElement.ID;
            }
        };
        var sourceItem = {};
        sourceItem[_common_1.DashboardDataIdField] = kpiElement.ID;
        sourceItem.onIncidentOccurred = _render_helper_1.RenderHelper.widgetIncidentOccurred;
        that.setSourceItemProperties(sourceItem, kpiElement, properties);
        return sourceItem;
    }
    _getDeltaValue(axisPoint, kpiElement) {
        var multiData = this.multiData, measureId = kpiElement.ID;
        if (!multiData.getDeltaById(measureId))
            return undefined;
        return axisPoint ? multiData.getDeltaValueByAxisPoints(measureId, [axisPoint]) : multiData.getDeltaValue(measureId);
    }
    _getMeasureValue(axisPoint, kpiElement) {
        var multiData = this.multiData, measureId = kpiElement.ID;
        return axisPoint ? multiData.getMeasureValueByAxisPoints(measureId, [axisPoint]) : multiData.getMeasureValue(measureId);
    }
    _getSparklineValues(axisPoint, kpiElement) {
        if (!this._sparklineAxisPoints)
            return;
        var that = this, values = [], measureValue, measureId = kpiElement.ID, multiData = that.multiData;
        that._sparklineAxisPoints.forEach(sparklinePoint => {
            measureValue = axisPoint ?
                multiData.getMeasureValueByAxisPoints(measureId, [axisPoint, sparklinePoint]) :
                multiData.getMeasureValueByAxisPoints(measureId, [sparklinePoint]);
            values.push(measureValue.getValue() || 0);
        });
        return values;
    }
    _getStyleSettingsInfo(axisPoint, kpiElementId, ruleFilter) {
        let rules = [], cellInfo = {
            axisPoint: axisPoint
        };
        rules = this.cfModel.RuleModels.filter(rule => ruleFilter(rule, kpiElementId));
        return this._getStyleSettingsInfoCore(cellInfo, rules, this.viewModel.ColumnAxisName, item_data_axis_names_1.itemDataAxisNames.defaultAxis);
    }
    _correctAxisPoint(axisPoint, ruleModel) {
        var correctAxisPoint = null;
        if (ruleModel.CalcByDataId)
            correctAxisPoint = this._findAxisPoint(ruleModel.CalcByDataId, axisPoint);
        return correctAxisPoint || axisPoint;
    }
    _getStyleIndexes(rule, cellInfo, points) {
        var axisPoint, currentStyleIndexes, styleIndexes = [];
        axisPoint = this._correctAxisPoint(cellInfo.axisPoint, rule);
        if (axisPoint)
            points.push(axisPoint);
        currentStyleIndexes = this._getMeasureValueByAxisPoints(points, rule.FormatConditionMeasureId);
        if (currentStyleIndexes) {
            styleIndexes = styleIndexes.concat(currentStyleIndexes);
        }
        return styleIndexes;
    }
    _initialize() {
        if (!this.multiData)
            return;
        var that = this, viewModel = that.viewModel, multiData = that.multiData;
        that._axisPoints = !!this.viewModel.SeriesAxisName ? multiData.getAxis(viewModel.SeriesAxisName).getPoints() : undefined;
        that._sparklineAxisPoints = !!this.viewModel.SparklineAxisName ? multiData.getAxis(viewModel.SparklineAxisName).getPoints() : undefined;
    }
    _iterateKpiItems(delegate) {
    }
    _getGaugeRange(element) {
    }
}
exports.kpiDataController = kpiDataController;
