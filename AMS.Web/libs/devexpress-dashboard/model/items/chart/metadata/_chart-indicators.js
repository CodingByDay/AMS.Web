/**
* DevExpress Dashboard (_chart-indicators.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartIndicatorSerializationInfo = exports.chartIndicatorTypeName = exports.chartIndicatorDisplayName = exports.chartIndicatorValueLevel = exports.chartIndicatorVisible = exports.chartIndicatorThickness = exports.chartIndicatorShowInLegend = exports.chartIndicatorValue = exports.chartIndicatorLegendText = exports.chartIndicatorType = exports.chartIndicatorIgnoreEmptyArgument = exports.chartIndicatorDashStyle = exports.chartIndicatorColor = exports.indicatorTypeMap = exports.dashStyleMap = void 0;
const color_1 = require("../../../color");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _chart_pane_1 = require("./_chart-pane");
exports.dashStyleMap = {
    'Solid': 'DashboardWebStringId.Chart.Indicator.DashStyle.Solid',
    'Dash': 'DashboardWebStringId.Chart.Indicator.DashStyle.Dash',
    'Dot': 'DashboardWebStringId.Chart.Indicator.DashStyle.Dot',
    'DashDot': 'DashboardWebStringId.Chart.Indicator.DashStyle.DashDot',
    'DashDotDot': 'DashboardWebStringId.Chart.Indicator.DashStyle.DashDotDot'
};
exports.indicatorTypeMap = {
    'RegressionLine': 'DashboardWebStringId.Chart.Indicator.Type.Regression',
    'TrendLine': 'DashboardWebStringId.Chart.Indicator.Type.Trend'
};
exports.chartIndicatorColor = { propertyName: 'color', modelName: '@Color', displayName: 'DashboardWebStringId.Chart.Indicator.Color', from: color_1.Color._colorRgbaFromModel, toJsonObject: color_1.Color._colorRgbaToModel, simpleFormAdapterItem: 'colorBoxEditor' };
exports.chartIndicatorDashStyle = { propertyName: 'dashStyle', modelName: '@DashStyle', displayName: 'DashboardWebStringId.Chart.Indicator.DashStyle', defaultVal: 'Solid', values: exports.dashStyleMap, simpleFormAdapterItem: 'selectBoxEditor' };
exports.chartIndicatorIgnoreEmptyArgument = { propertyName: 'ignoreEmptyArgument', modelName: '@IgnoreEmptyArgument', from: _base_metadata_1.parseBool };
exports.chartIndicatorType = { propertyName: 'itemType', modelName: '@ItemType', displayName: 'DashboardWebStringId.Chart.Indicator.Type', values: exports.indicatorTypeMap, simpleFormAdapterItem: 'selectBoxEditor' };
exports.chartIndicatorLegendText = { propertyName: 'legendText', modelName: '@LegendText', displayName: 'DashboardWebStringId.Chart.Indicator.LegendText', simpleFormAdapterItem: 'textBoxEditor' };
exports.chartIndicatorValue = { propertyName: 'value', modelName: '@Value', displayName: 'DashboardWebStringId.Chart.Indicator.Value', simpleFormAdapterItem: 'selectBoxEditor' };
exports.chartIndicatorShowInLegend = { propertyName: 'showInLegend', modelName: '@ShowInLegend', displayName: 'DashboardWebStringId.Chart.Indicator.ShowInLegend', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.chartIndicatorThickness = { propertyName: 'thickness', modelName: '@Thickness', displayName: 'DashboardWebStringId.Chart.Indicator.Thickness', defaultVal: 1, from: _base_metadata_1.floatFromModel };
exports.chartIndicatorVisible = { propertyName: 'visible', modelName: '@Visible', displayName: 'DashboardWebStringId.Chart.Indicator.Visible', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.chartIndicatorValueLevel = { propertyName: 'valueLevel', modelName: '@ValueLevel', displayName: 'DashboardWebStringId.Chart.Indicator.ValueLevel', isTwoWay: true };
exports.chartIndicatorDisplayName = { propertyName: 'displayName', modelName: '@DisplayName' };
exports.chartIndicatorTypeName = { propertyName: 'customTypeName', modelName: '@TypeName' };
exports.chartIndicatorSerializationInfo = [
    exports.chartIndicatorIgnoreEmptyArgument, exports.chartIndicatorValue,
    _chart_pane_1.chartPaneName, exports.chartIndicatorDisplayName, exports.chartIndicatorType,
    exports.chartIndicatorValueLevel, exports.chartIndicatorDashStyle, exports.chartIndicatorLegendText,
    exports.chartIndicatorShowInLegend,
    exports.chartIndicatorThickness, exports.chartIndicatorVisible, exports.chartIndicatorTypeName,
    exports.chartIndicatorColor
];
