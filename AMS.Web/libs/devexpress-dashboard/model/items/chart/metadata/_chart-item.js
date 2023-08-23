﻿/**
* DevExpress Dashboard (_chart-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartItemSerializationInfo = exports.chartAxisX = exports.chartLegend = exports.chartIndicators = exports.panes = exports.chartRotated = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _chart_item_base_1 = require("../../metadata/_chart-item-base");
const interactivity_options_1 = require("../../options/interactivity-options");
const chart_axis_1 = require("../chart-axis");
const chart_legend_1 = require("../chart-legend");
exports.chartRotated = { propertyName: 'rotated', modelName: '@Rotated', displayName: 'DashboardWebStringId.Chart.Rotated', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.panes = { propertyName: 'panes', modelName: 'Panes', displayName: 'DashboardWebStringId.Chart.Panes', array: true };
exports.chartIndicators = { propertyName: 'indicators', modelName: 'Indicators', array: true };
exports.chartLegend = { propertyName: 'legend', modelName: 'ChartLegend', displayName: 'DashboardWebStringId.Chart.Legend', type: chart_legend_1.ChartLegend };
exports.chartAxisX = { propertyName: 'axisX', modelName: 'AxisX', displayName: 'DashboardWebStringId.Chart.AxisX', type: chart_axis_1.ChartAxisX };
exports.chartItemSerializationInfo = _chart_item_base_1.chartItemBaseSerializationsInfo.concat([exports.panes, exports.chartIndicators, exports.chartRotated, exports.chartLegend, exports.chartAxisX, interactivity_options_1._chartItemInteractivityOptionsMeta]);
