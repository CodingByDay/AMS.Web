﻿/**
* DevExpress Dashboard (_data-dashboard-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataDashboardItemSerializationsInfo = exports.formatRules = exports.hiddenMeasures = exports.hiddenDimensions = exports.dataItemsSerializable = exports.itemColorScheme = exports.isMasterFilterCrossDataSource = exports.visibleDataFilterString = exports.filterString = exports.dataSource = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _dashboard_item_1 = require("./_dashboard-item");
exports.dataSource = { propertyName: 'dataSource', modelName: '@DataSource', displayName: 'DashboardStringId.DefaultDataSourceName', simpleFormAdapterItem: 'textBoxEditor' };
exports.filterString = { propertyName: 'filterString', modelName: '@FilterString' };
exports.visibleDataFilterString = { propertyName: 'visibleDataFilterString', modelName: '@VisibleDataFilterString' };
exports.isMasterFilterCrossDataSource = { propertyName: 'isMasterFilterCrossDataSource', modelName: '@IsMasterFilterCrossDataSource', displayName: 'DashboardWebStringId.CrossDataSourceFiltering', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.itemColorScheme = { propertyName: 'colorScheme', modelName: 'ColorScheme', displayName: 'DashboardWebStringId.DashboardMenuColorScheme', array: true };
exports.dataItemsSerializable = { propertyName: 'dataItems', modelName: 'DataItems', displayName: 'DashboardWebStringId.DataSources.DataItems', array: true };
exports.hiddenDimensions = { propertyName: '__hiddenDimensions', modelName: 'HiddenDimensions', displayName: 'DashboardWebStringId.Binding.HiddenDimensions', array: true };
exports.hiddenMeasures = { propertyName: '__hiddenMeasures', modelName: 'HiddenMeasures', displayName: 'DashboardWebStringId.Binding.HiddenMeasures', array: true };
exports.formatRules = { propertyName: 'formatRules', modelName: 'FormatRules', array: true };
exports.dataDashboardItemSerializationsInfo = _dashboard_item_1.dashboardItemSerializationsInfo.concat([exports.dataSource, _base_metadata_1.dataMember, exports.filterString, exports.visibleDataFilterString, exports.isMasterFilterCrossDataSource, exports.dataItemsSerializable, exports.formatRules, exports.hiddenDimensions, exports.hiddenMeasures, exports.itemColorScheme]);
