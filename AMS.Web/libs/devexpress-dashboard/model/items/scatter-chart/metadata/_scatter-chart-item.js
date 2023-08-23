﻿/**
* DevExpress Dashboard (_scatter-chart-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scatterChartDashboardItemSerializationsInfo = exports.scatterChartWeight = exports.axisYMeasure = exports.axisXMeasure = exports.pointLabelOptions = exports.axisY = exports.axisX = exports.legend = exports.rotated = exports.scatterArgumentsMeta = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const chart_axis_1 = require("../../chart/chart-axis");
const chart_legend_1 = require("../../chart/chart-legend");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
const _coloring_options_1 = require("../../options/metadata/_coloring-options");
const scatter_point_label_options_1 = require("../scatter-point-label-options");
exports.scatterArgumentsMeta = { propertyName: _base_metadata_1.argumentsPropertyName, modelName: 'Dimensions', array: true };
exports.rotated = { propertyName: 'rotated', modelName: '@Rotated', displayName: 'DashboardWebStringId.Chart.Rotated', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.legend = { propertyName: 'legend', modelName: 'ChartLegend', displayName: 'DashboardWebStringId.Chart.Legend', type: chart_legend_1.ChartLegend };
exports.axisX = { propertyName: 'axisX', modelName: 'AxisX', displayName: 'DashboardWebStringId.Chart.AxisX', type: chart_axis_1.ChartAxisY };
exports.axisY = { propertyName: 'axisY', modelName: 'AxisY', displayName: 'DashboardWebStringId.Chart.AxisY', type: chart_axis_1.ScatterChartAxisY };
exports.pointLabelOptions = { propertyName: 'pointLabelOptions', modelName: 'PointLabelOptions', displayName: 'DashboardWebStringId.Chart.PointLabelOptions', type: scatter_point_label_options_1.ScatterPointLabelOptions };
exports.axisXMeasure = { propertyName: '__axisXMeasure', modelName: 'MeasureX', displayName: 'DashboardWebStringId.Chart.AxisXMeasure', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.axisYMeasure = { propertyName: '__axisYMeasure', modelName: 'MeasureY', displayName: 'DashboardWebStringId.Chart.AxisYMeasure', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.scatterChartWeight = { propertyName: _base_metadata_1.weightPropertyName, modelName: 'MeasureWeight', displayName: 'DashboardWebStringId.Chart.Weight', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.scatterChartDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.scatterArgumentsMeta, interactivity_options_1._dashboardItemInteractivityOptionsMeta, exports.rotated, exports.legend, exports.axisX, exports.axisY, exports.pointLabelOptions, exports.axisXMeasure, exports.axisYMeasure, exports.scatterChartWeight, _coloring_options_1.coloringOptions]);
