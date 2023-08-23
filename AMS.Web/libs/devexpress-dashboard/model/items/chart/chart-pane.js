﻿/**
* DevExpress Dashboard (chart-pane.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartPane = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const chart_series_creator_1 = require("./chart-series-creator");
const _chart_pane_1 = require("./metadata/_chart-pane");
class ChartPane extends serializable_model_1.SerializableModel {
    constructor(dataItemProvider, dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.createSeriesByViewType = chart_series_creator_1.ChartSeriesCreator.getSeriesCreator(dataItemProvider);
        this.series = analytics_utils_1.deserializeArray(dashboardItemJSON.Series, (item) => chart_series_creator_1.ChartSeriesCreator.createSeries(dataItemProvider, item, serializer));
    }
    getInfo() {
        return _chart_pane_1.chartPaneSerializationsInfo;
    }
}
exports.ChartPane = ChartPane;
