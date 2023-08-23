﻿/**
* DevExpress Dashboard (_date-filter-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFilterDashboardItemSerializationsInfo = exports.dateFilterDimension = exports.displayTextPattern = exports.datePickerLocation = exports.arrangementMode = exports.filterType = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
const _range_filter_item_1 = require("../../range-filter/metadata/_range-filter-item");
exports.filterType = {
    propertyName: 'filterType', modelName: '@FilterType', displayName: 'DashboardWebStringId.DateFilter.FilterType', defaultVal: 'Between', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'After': 'DashboardWebStringId.DateFilter.FilterTypeAfter',
        'Before': 'DashboardWebStringId.DateFilter.FilterTypeBefore',
        'Exact': 'DashboardWebStringId.DateFilter.FilterTypeExact',
        'Between': 'DashboardWebStringId.DateFilter.FilterTypeBetween'
    }
};
exports.arrangementMode = {
    propertyName: 'arrangementMode', modelName: '@ArrangementMode', displayName: 'DashboardWebStringId.DateFilter.ArrangementMode', defaultVal: 'AutoHeight', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'AutoHeight': 'DashboardWebStringId.DateFilter.ArrangementModeAutoHeight',
        'Horizontal': 'DashboardWebStringId.DateFilter.ArrangementModeHorizontal',
        'Vertical': 'DashboardWebStringId.DateFilter.ArrangementModeVertical'
    }
};
exports.datePickerLocation = {
    propertyName: 'datePickerLocation', modelName: '@DatePickerLocation', displayName: 'DashboardWebStringId.DateFilter.DatePickerLocation', defaultVal: 'Far', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Far': 'DashboardWebStringId.DateFilter.DatePickerLocationFar',
        'Near': 'DashboardWebStringId.DateFilter.DatePickerLocationNear',
        'Hidden': 'DashboardWebStringId.DateFilter.DatePickerLocationHidden'
    }
};
exports.displayTextPattern = { propertyName: 'displayTextPattern', modelName: '@DisplayTextPattern', displayName: 'DashboardStringId.DateFilterDisplayTextPattern', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor', editorOptions: { placeholder: 'DashboardStringId.FromToDatePeriodCaption' } };
exports.dateFilterDimension = { propertyName: '__dimension', modelName: 'Dimension', displayName: 'DashboardStringId.DescriptionItemDimension', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.dateFilterDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.dateFilterDimension, _range_filter_item_1.dateTimePeriods, exports.filterType, exports.arrangementMode, exports.datePickerLocation, exports.displayTextPattern, _range_filter_item_1.defaultDateTimePeriodName, interactivity_options_1._filterItemInteractivityOptionsMeta]);
