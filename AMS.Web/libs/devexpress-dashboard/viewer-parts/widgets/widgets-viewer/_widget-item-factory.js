﻿/**
* DevExpress Dashboard (_widget-item-factory.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widgetItemFactory = void 0;
const chart_1 = require("devextreme/viz/chart");
const circular_gauge_1 = require("devextreme/viz/circular_gauge");
const linear_gauge_1 = require("devextreme/viz/linear_gauge");
const pie_chart_1 = require("devextreme/viz/pie_chart");
function getAdditionalCircularGaugeOptions(container, options) {
    return null;
}
var getAdditionalOptionsHandlers = {
    'circulargauge': getAdditionalCircularGaugeOptions
};
exports.widgetItemFactory = {
    createWidget: function (widgetType, container, options) {
        switch ((widgetType || '').toLowerCase()) {
            case 'chart':
                let chart = chart_1.default.getInstance(container);
                if (chart) {
                    chart.option(options);
                }
                else {
                    chart = new chart_1.default(container, options);
                }
                return chart;
            case 'piechart':
                let pieChart = pie_chart_1.default.getInstance(container);
                if (pieChart) {
                    pieChart.option(options);
                }
                else {
                    pieChart = new pie_chart_1.default(container, options);
                }
                return pieChart;
            case 'circulargauge':
                let circularGauge = circular_gauge_1.default.getInstance(container);
                if (circularGauge) {
                    circularGauge.option(options);
                }
                else {
                    circularGauge = new circular_gauge_1.default(container, options);
                }
                return circularGauge;
            case 'lineargauge':
                let linearGauge = linear_gauge_1.default.getInstance(container);
                if (linearGauge) {
                    linearGauge.option(options);
                }
                else {
                    linearGauge = new linear_gauge_1.default(container, options);
                }
                return linearGauge;
            default:
                return null;
        }
    },
    getAdditionalOptions: function (widgetType, container, options) {
        var handler = getAdditionalOptionsHandlers[(widgetType || '').toLowerCase()];
        return handler ? handler(container, options) : null;
    }
};
