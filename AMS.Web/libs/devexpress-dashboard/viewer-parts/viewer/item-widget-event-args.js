﻿/**
* DevExpress Dashboard (item-widget-event-args.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaugeContext = exports.GridContext = exports.ChartContext = void 0;
require("devextreme/ui/widget/ui.widget");
const _common_1 = require("../../data/_common");
class ChartContext {
    constructor(_dashboardItem) {
        this._dashboardItem = _dashboardItem;
    }
    getDashboardItemSeries(seriesOptions) {
        return this._dashboardItem
            .panes()
            .reduce((acc, pane) => acc.concat(pane.series()), [])
            .filter(series => seriesOptions[_common_1.DashboardDataIdField] && series._getDataId() === seriesOptions[_common_1.DashboardDataIdField])[0];
    }
}
exports.ChartContext = ChartContext;
class GridContext {
    constructor(_dashboardItem) {
        this._dashboardItem = _dashboardItem;
    }
    getDashboardItemColumn(columnOptions) {
        return this._dashboardItem
            .columns()
            .filter(column => columnOptions[_common_1.DashboardDataIdField] && column._getDataId() === columnOptions[_common_1.DashboardDataIdField])[0];
    }
}
exports.GridContext = GridContext;
class GaugeContext {
    constructor(_dashboardItem) {
        this._dashboardItem = _dashboardItem;
    }
    getDashboardItemGauge(gaugeOptions) {
        return this._dashboardItem
            .gauges()
            .filter(gauge => gaugeOptions[_common_1.DashboardDataIdField] && gauge._getDataId() === gaugeOptions[_common_1.DashboardDataIdField])[0];
    }
}
exports.GaugeContext = GaugeContext;
