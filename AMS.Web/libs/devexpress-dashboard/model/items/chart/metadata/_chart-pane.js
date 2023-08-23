﻿/**
* DevExpress Dashboard (_chart-pane.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartPaneSerializationsInfo = exports.chartPaneName = exports.secondaryAxisY = exports.primaryAxisY = exports.chartSeries = void 0;
const chart_axis_1 = require("../chart-axis");
exports.chartSeries = { propertyName: 'series', modelName: 'Series', displayName: 'DashboardStringId.DescriptionItemSeries', array: true };
exports.primaryAxisY = { propertyName: 'primaryAxisY', modelName: 'AxisY', displayName: 'DashboardWebStringId.Chart.PrimaryAxisY', type: chart_axis_1.ChartAxisY };
exports.secondaryAxisY = { propertyName: 'secondaryAxisY', modelName: 'SecondaryAxisY', displayName: 'DashboardWebStringId.Chart.SecondaryAxisY', type: chart_axis_1.ChartSecondaryAxisY };
exports.chartPaneName = { propertyName: 'name', modelName: '@Name', displayName: 'DashboardWebStringId.Chart.Name', simpleFormAdapterItem: 'textBoxEditor' };
exports.chartPaneSerializationsInfo = [exports.chartSeries, exports.primaryAxisY, exports.secondaryAxisY, exports.chartPaneName];
