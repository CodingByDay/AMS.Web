﻿/**
* DevExpress Dashboard (chart-series.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenHighLowCloseSeries = exports.HighLowCloseSeries = exports.WeightedSeries = exports.RangeSeries = exports.SimpleSeries = exports.ChartSeries = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const data_item_container_1 = require("../data-item-container");
const _chart_series_1 = require("./metadata/_chart-series");
class ChartSeries extends data_item_container_1.DataItemContainer {
    constructor(seriesJSON, serializer) {
        super(seriesJSON, serializer);
    }
    _getInfoCore() {
        throw new Error("Method 'getInfo' is not implemented.");
    }
    grabFrom(series) {
        super.grabFrom(series);
        this.plotOnSecondaryAxis(series.plotOnSecondaryAxis());
        this.ignoreEmptyPoints(series.ignoreEmptyPoints());
        this.showPointMarkers(series.showPointMarkers());
        this.ignoreEmptyPoints(series.ignoreEmptyPoints());
        this.pointLabelOptions.grabFrom(series.pointLabelOptions);
    }
    _getDataId() {
        const defaultMeasure = this._measures[0];
        return defaultMeasure && defaultMeasure.uniqueName() || null;
    }
}
exports.ChartSeries = ChartSeries;
class SimpleSeries extends ChartSeries {
    constructor(dataItemProvider, seriesJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(seriesJSON, serializer);
        dataItemProvider._attachDataItem(this, _chart_series_1.chartSeriesValue.propertyName);
    }
    _getBindingModel() {
        return [{
                propertyName: _chart_series_1.chartSeriesValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.ValueCaption'
            }];
    }
    _getContainerType() {
        return this.seriesType();
    }
    _getInfoCore() {
        return _chart_series_1.simpleSeriesSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Simple';
    }
    get _measures() { return [this.value()].filter(m => !!m); }
    get _isConditionalFormattingSupported() { return true; }
}
exports.SimpleSeries = SimpleSeries;
class RangeSeries extends ChartSeries {
    constructor(dataItemProvider, seriesJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(seriesJSON, serializer);
        dataItemProvider._attachDataItem(this, _chart_series_1.value1.propertyName);
        dataItemProvider._attachDataItem(this, _chart_series_1.value2.propertyName);
    }
    _getInfoCore() {
        return _chart_series_1.rangeSeriesSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Range';
    }
    _getBindingModel() {
        return [{
                propertyName: _chart_series_1.value1.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.Value1Caption'
            }, {
                propertyName: _chart_series_1.value2.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.Value2Caption'
            }];
    }
    _getContainerType() {
        return this.seriesType();
    }
    get _measures() { return [this.value1(), this.value2()].filter(m => !!m); }
    get _isConditionalFormattingSupported() { return true; }
}
exports.RangeSeries = RangeSeries;
class WeightedSeries extends ChartSeries {
    constructor(dataItemProvider, seriesJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(seriesJSON, serializer);
        dataItemProvider._attachDataItem(this, _chart_series_1.chartSeriesWeight.propertyName);
        dataItemProvider._attachDataItem(this, _chart_series_1.chartSeriesValue.propertyName);
    }
    _getInfoCore() {
        return _chart_series_1.weightedSeriesSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'Weighted';
    }
    _getBindingModel() {
        return [{
                propertyName: _chart_series_1.chartSeriesValue.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardWebStringId.Chart.Value'
            }, {
                propertyName: _chart_series_1.chartSeriesWeight.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.WeightCaption'
            }];
    }
    get _measures() { return [this.value(), this.weight()].filter(m => !!m); }
    get _isConditionalFormattingSupported() { return true; }
}
exports.WeightedSeries = WeightedSeries;
class HighLowCloseSeries extends ChartSeries {
    constructor(dataItemProvider, seriesJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(seriesJSON, serializer);
        dataItemProvider._attachDataItem(this, _chart_series_1.high.propertyName);
        dataItemProvider._attachDataItem(this, _chart_series_1.low.propertyName);
        dataItemProvider._attachDataItem(this, _chart_series_1.close.propertyName);
    }
    _getInfoCore() {
        return _chart_series_1.highLowCloseSeriesSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'HighLowClose';
    }
    _getBindingModel() {
        return [{
                propertyName: _chart_series_1.high.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.HighCaption'
            }, {
                propertyName: _chart_series_1.low.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.LowCaption'
            }, {
                propertyName: _chart_series_1.close.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.CloseCaption'
            }];
    }
    get _measures() { return [this.high(), this.low(), this.close()].filter(m => !!m); }
    get _isConditionalFormattingSupported() { return false; }
}
exports.HighLowCloseSeries = HighLowCloseSeries;
class OpenHighLowCloseSeries extends HighLowCloseSeries {
    constructor(dataItemProvider, seriesJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dataItemProvider, seriesJSON, serializer);
        dataItemProvider._attachDataItem(this, _chart_series_1.open.propertyName);
    }
    _getInfoCore() {
        return _chart_series_1.openHighLowCloseSeriesSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'OpenHighLowClose';
    }
    _getBindingModel() {
        return [{
                propertyName: _chart_series_1.open.propertyName,
                dataItemType: 'Measure',
                emptyPlaceholder: 'DashboardStringId.OpenCaption'
            }].concat(super._getBindingModel());
    }
    _getContainerType() {
        return this.seriesType();
    }
    get _measures() { return [this.open(), this.high(), this.low(), this.close()].filter(m => !!m); }
    get _isConditionalFormattingSupported() { return false; }
}
exports.OpenHighLowCloseSeries = OpenHighLowCloseSeries;
