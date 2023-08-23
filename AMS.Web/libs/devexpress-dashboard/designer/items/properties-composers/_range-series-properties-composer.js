﻿/**
* DevExpress Dashboard (_range-series-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeSeriesPropertiesComposer = void 0;
const range_filter_item_1 = require("../../../model/items/range-filter/range-filter-item");
const _chart_series_properties_composer_1 = require("./_chart-series-properties-composer");
class RangeSeriesPropertiesComposer extends _chart_series_properties_composer_1.ChartSeriesPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler, range_filter_item_1.RangeFilterItem.rangeSeriesViewTypesMap, false, false);
    }
    _showIgnoreEmptyPointsVisible(model) {
        return false;
    }
    _fillConditionalFormattingTab() { }
}
exports.RangeSeriesPropertiesComposer = RangeSeriesPropertiesComposer;
