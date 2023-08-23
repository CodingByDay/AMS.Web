/**
* DevExpress Dashboard (_chart-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultSeriesDataId = exports.getIndicatorDisplayNameFromSeries = exports.getAvailableValueLevels = exports.getChartSeries = exports.getChartApplyToDataItems = exports.getChartCFSeries = void 0;
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _display_name_provider_1 = require("../../designer/_display-name-provider");
const chart_series_1 = require("../../model/items/chart/chart-series");
const _chart_series_1 = require("../../model/items/chart/metadata/_chart-series");
const _chart_indicators_1 = require("../items/chart/metadata/_chart-indicators");
function getChartCFSeries(dashboardItem) {
    return []
        .concat(...dashboardItem.panes().map(pane => pane.series()))
        .filter(series => series._isConditionalFormattingSupported);
}
exports.getChartCFSeries = getChartCFSeries;
function getChartApplyToDataItems(dashboardItem, dataSourceBrowser, getChartSeries = getChartCFSeries) {
    return () => getChartSeries(dashboardItem).reduce((result, series) => {
        result.push({
            uniqueName: series._getDataId(),
            displayName: series.name() || _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, series)
        });
        return result;
    }, []);
}
exports.getChartApplyToDataItems = getChartApplyToDataItems;
function getChartSeries(dashboardItem) {
    return []
        .concat(...dashboardItem.panes().map(pane => pane.series()));
}
exports.getChartSeries = getChartSeries;
function getAvailableValueLevels(seriesDataId, dashboardItem) {
    const series = getChartSeries(dashboardItem);
    const chosenSeries = series.filter(series => series._getDataId() === seriesDataId)[0];
    let availableValueLevels = [];
    switch (chosenSeries === null || chosenSeries === void 0 ? void 0 : chosenSeries.constructor) {
        case chart_series_1.HighLowCloseSeries:
            availableValueLevels = [_chart_series_1.low, _chart_series_1.high, _chart_series_1.close];
            break;
        case chart_series_1.OpenHighLowCloseSeries:
            availableValueLevels = [_chart_series_1.open, _chart_series_1.low, _chart_series_1.high, _chart_series_1.close];
            break;
        case chart_series_1.SimpleSeries:
        case chart_series_1.WeightedSeries:
        case chart_series_1.RangeSeries:
            availableValueLevels = [_chart_series_1.chartSeriesValue];
            break;
    }
    return availableValueLevels.map(level => { return { value: level.modelName, displayValueId: level.displayName }; });
}
exports.getAvailableValueLevels = getAvailableValueLevels;
function getIndicatorDisplayNameFromSeries(model, dashboardItem, dataSourceBrowser) {
    var _a;
    let seriesDataId = model.value();
    let chosenSeriesName = ko.unwrap((_a = getChartApplyToDataItems(dashboardItem, dataSourceBrowser, getChartSeries)()
        .filter(x => x.uniqueName === seriesDataId)[0]) === null || _a === void 0 ? void 0 : _a.displayName);
    chosenSeriesName = chosenSeriesName + ' ' + _default_1.getLocalizationById(_chart_indicators_1.indicatorTypeMap[model.itemType()]);
    return chosenSeriesName;
}
exports.getIndicatorDisplayNameFromSeries = getIndicatorDisplayNameFromSeries;
function getDefaultSeriesDataId(model, dashboardItem, dataSourceBrowser) {
    const seriesDataItems = ko.pureComputed(() => {
        const chartSeries = getChartApplyToDataItems(dashboardItem, dataSourceBrowser, getChartSeries)();
        return chartSeries.map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) }));
    });
    const seriesDataItemNames = seriesDataItems().map(dataItem => ko.unwrap(dataItem.value));
    if (!model.value() && seriesDataItemNames.length) {
        model.value(seriesDataItemNames[0]);
    }
}
exports.getDefaultSeriesDataId = getDefaultSeriesDataId;
