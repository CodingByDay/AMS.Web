﻿/**
* DevExpress Dashboard (_chart-series.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openHighLowCloseSeriesSerializationsInfo = exports.highLowCloseSeriesSerializationsInfo = exports.weightedSeriesSerializationsInfo = exports.rangeSeriesSerializationsInfo = exports.simpleSeriesSerializationsInfo = exports.close = exports.low = exports.high = exports.open = exports.chartSeriesWeight = exports.value2 = exports.value1 = exports.chartSeriesValue = exports.openHighLowCloseSeriesType = exports.rangeSeriesType = exports.simpleSeriesType = exports.chartSeriesType = exports.chartSeriesSerializationsInfo = exports.chartSeriesPointLabelOptions = exports.showPointMarkers = exports.ignoreEmptyPoints = exports.plotOnSecondaryAxis = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const point_label_options_1 = require("../point-label-options");
exports.plotOnSecondaryAxis = { propertyName: 'plotOnSecondaryAxis', modelName: '@PlotOnSecondaryAxis', displayName: 'DashboardWebStringId.Chart.PlotOnSecondaryAxis', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.ignoreEmptyPoints = { propertyName: 'ignoreEmptyPoints', modelName: '@IgnoreEmptyPoints', displayName: 'DashboardWebStringId.Chart.IgnoreEmptyPoints', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.showPointMarkers = { propertyName: 'showPointMarkers', modelName: '@ShowPointMarkers', displayName: 'DashboardWebStringId.Chart.ShowPointMarkers', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.chartSeriesPointLabelOptions = { propertyName: 'pointLabelOptions', modelName: 'PointLabelOptions', displayName: 'DashboardWebStringId.Chart.PointLabelOptions', type: point_label_options_1.PointLabelOptions };
exports.chartSeriesSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.plotOnSecondaryAxis, exports.ignoreEmptyPoints, exports.showPointMarkers, exports.chartSeriesPointLabelOptions];
exports.chartSeriesType = { propertyName: 'containerType', displayName: 'DashboardWebStringId.Chart.SeriesType' };
exports.simpleSeriesType = {
    propertyName: 'seriesType', modelName: '@SeriesType', defaultVal: 'Bar',
    values: {
        'Bar': 'DashboardStringId.SeriesTypeBar',
        'StackedBar': 'DashboardStringId.SeriesTypeStackedBar',
        'FullStackedBar': 'DashboardStringId.SeriesTypeFullStackedBar',
        'Point': 'DashboardStringId.SeriesTypePoint',
        'Line': 'DashboardStringId.SeriesTypeLine',
        'StackedLine': 'DashboardStringId.SeriesTypeStackedLine',
        'FullStackedLine': 'DashboardStringId.SeriesTypeFullStackedLine',
        'StepLine': 'DashboardStringId.SeriesTypeStepLine',
        'Spline': 'DashboardStringId.SeriesTypeSpline',
        'Area': 'DashboardStringId.SeriesTypeArea',
        'StackedArea': 'DashboardStringId.SeriesTypeStackedArea',
        'FullStackedArea': 'DashboardStringId.SeriesTypeFullStackedArea',
        'StepArea': 'DashboardStringId.SeriesTypeStepArea',
        'SplineArea': 'DashboardStringId.SeriesTypeSplineArea',
        'StackedSplineArea': 'DashboardStringId.SeriesTypeStackedSplineArea',
        'FullStackedSplineArea': 'DashboardStringId.SeriesTypeFullStackedSplineArea'
    }
};
exports.rangeSeriesType = {
    propertyName: 'seriesType', modelName: '@SeriesType', defaultVal: 'SideBySideRangeBar',
    values: {
        'SideBySideRangeBar': 'DashboardStringId.SeriesTypeSideBySideRangeBar',
        'RangeArea': 'DashboardStringId.SeriesTypeRangeArea'
    }
};
exports.openHighLowCloseSeriesType = {
    propertyName: 'seriesType', modelName: '@SeriesType', defaultVal: 'CandleStick',
    values: {
        'CandleStick': 'DashboardStringId.SeriesTypeCandleStick',
        'Stock': 'DashboardStringId.SeriesTypeStock'
    }
};
exports.chartSeriesValue = { propertyName: _base_metadata_1.valuePropertyName, modelName: 'Value', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardWebStringId.Chart.Value' };
exports.value1 = { propertyName: '__value1', modelName: 'Value1', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.Value1Caption' };
exports.value2 = { propertyName: '__value2', modelName: 'Value2', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.Value2Caption' };
exports.chartSeriesWeight = { propertyName: _base_metadata_1.weightPropertyName, modelName: 'Weight', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.WeightCaption' };
exports.open = { propertyName: '__open', modelName: 'Open', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.OpenCaption' };
exports.high = { propertyName: '__high', modelName: 'High', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.HighCaption' };
exports.low = { propertyName: '__low', modelName: 'Low', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.LowCaption' };
exports.close = { propertyName: '__close', modelName: 'Close', info: _data_item_1.dataItemLinkSerializationsInfo, displayName: 'DashboardStringId.CloseCaption' };
exports.simpleSeriesSerializationsInfo = exports.chartSeriesSerializationsInfo.concat([exports.simpleSeriesType, exports.chartSeriesValue]);
exports.rangeSeriesSerializationsInfo = exports.chartSeriesSerializationsInfo.concat([exports.rangeSeriesType, exports.value1, exports.value2]);
exports.weightedSeriesSerializationsInfo = exports.chartSeriesSerializationsInfo.concat([exports.chartSeriesWeight, exports.chartSeriesValue]);
exports.highLowCloseSeriesSerializationsInfo = exports.chartSeriesSerializationsInfo.concat([exports.high, exports.low, exports.close]);
exports.openHighLowCloseSeriesSerializationsInfo = exports.chartSeriesSerializationsInfo.concat([exports.openHighLowCloseSeriesType, exports.open, exports.high, exports.low, exports.close]);
