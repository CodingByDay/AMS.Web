﻿/**
* DevExpress Dashboard (_range-filter-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFilterDashboardItemSerializationsInfo = exports.argument = exports.rangeSeries = exports.dateTimePeriods = exports.defaultDateTimePeriodName = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _dashboard_item_1 = require("../../metadata/_dashboard-item");
const _series_item_1 = require("../../metadata/_series-item");
const interactivity_options_1 = require("../../options/interactivity-options");
const _coloring_options_1 = require("../../options/metadata/_coloring-options");
exports.defaultDateTimePeriodName = { propertyName: 'defaultDateTimePeriodName', displayName: 'DashboardStringId.DateTimeFormatYearFormatDefaultCaption', modelName: '@SelectedDateTimePeriodIndex', simpleFormAdapterItem: 'textBoxEditor', category: _base_metadata_1.PropertyCategory.ViewModel };
exports.dateTimePeriods = { propertyName: 'dateTimePeriods', modelName: 'DateTimePeriods', array: true };
exports.rangeSeries = { propertyName: 'series', modelName: 'Series', displayName: 'DashboardStringId.RangeFilterCalculationAlongSeries', array: true };
exports.argument = { propertyName: _base_metadata_1.argumentPropertyName, modelName: 'Argument', displayName: 'DashboardStringId.DescriptionItemArgument', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.rangeFilterDashboardItemSerializationsInfo = _series_item_1.seriesDashboardItemSerializationsInfo
    .concat([exports.rangeSeries, exports.argument, interactivity_options_1._filterItemInteractivityOptionsMeta, _coloring_options_1.coloringOptions, exports.dateTimePeriods, exports.defaultDateTimePeriodName])
    .map(e => e === _dashboard_item_1.showCaption ? _dashboard_item_1.showCaptionDefaultFalse : e);
