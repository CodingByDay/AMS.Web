/**
* DevExpress Dashboard (chart-indicator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartIndicator = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _chart_utils_1 = require("../../internal/_chart-utils");
const _default_palette_1 = require("../../internal/_default-palette");
const _helper_classes_1 = require("../../internal/_helper-classes");
const serializable_model_1 = require("../../serializable-model");
const _chart_indicators_1 = require("./metadata/_chart-indicators");
class ChartIndicator extends serializable_model_1.SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info);
        this._typeName = ko.observable(this.customTypeName() || this.itemType());
    }
    static _createNew(chartItem, dataSourceBrowser) {
        const defaultName = _default_1.getLocalizationById('DashboardStringId.DefaultNameChartIndicator');
        const name = _helper_classes_1.NameGenerator.generateName(defaultName, chartItem.indicators(), 'name', 1);
        const newModel = new ChartIndicator({
            '@Name': name,
            '@Visible': true,
            '@ShowInLegend': true,
            '@ItemType': 'TrendLine'
        });
        const currentColorIndex = chartItem.panes().reduce((accumulator, currentPane) => {
            return accumulator + currentPane.series().length;
        }, 0);
        const existedColors = chartItem.indicators().map(x => x.color());
        newModel.color(_default_palette_1.DefaultDashboardPalette.getNextColor(currentColorIndex, existedColors));
        const chartSeries = _chart_utils_1.getChartApplyToDataItems(chartItem, dataSourceBrowser, _chart_utils_1.getChartSeries)()[0];
        if (chartSeries) {
            newModel.value(ko.unwrap(chartSeries.uniqueName));
            const displayName = _chart_utils_1.getIndicatorDisplayNameFromSeries(newModel, chartItem, dataSourceBrowser);
            newModel.legendText(displayName);
        }
        return newModel;
    }
    getInfo() {
        return _chart_indicators_1.chartIndicatorSerializationInfo;
    }
    _updateItemType() {
        let typeName = this._typeName();
        if (typeName in _chart_indicators_1.indicatorTypeMap) {
            this.itemType(typeName);
        }
        else {
            this.customTypeName(typeName);
            this.itemType('CustomIndicator');
        }
    }
}
exports.ChartIndicator = ChartIndicator;
