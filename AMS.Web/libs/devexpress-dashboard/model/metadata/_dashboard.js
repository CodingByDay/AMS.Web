﻿/**
* DevExpress Dashboard (_dashboard.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardSerializationsInfo = exports.layoutOptions = exports.layout = exports.dataSources = exports.groups = exports.colorScheme = exports.parameters = exports.items = exports.dashboardTitle = exports.currencyCultureName = void 0;
const layout_options_1 = require("../layout/layout-options");
const title_1 = require("../title");
const _title_1 = require("./_title");
exports.currencyCultureName = { propertyName: 'currencyCultureName', modelName: '@CurrencyCulture' };
exports.dashboardTitle = { propertyName: 'title', modelName: 'Title', displayName: 'DashboardStringId.Title', type: title_1.DashboardTitle, info: _title_1.dashboardTitleSerializationsInfo };
exports.items = { propertyName: 'items', modelName: 'Items', displayName: 'DashboardWebStringId.Dashboard.Items', array: true };
exports.parameters = { propertyName: 'parameters', modelName: 'Parameters', displayName: 'DashboardWebStringId.DashboardParameters', array: true };
exports.colorScheme = { propertyName: 'colorScheme', modelName: 'ColorScheme', displayName: 'DashboardWebStringId.DashboardMenuColorScheme', array: true };
exports.groups = { propertyName: 'groups', modelName: 'Groups', displayName: 'DashboardWebStringId.Dashboard.Groups', array: true };
exports.dataSources = { propertyName: 'dataSources', modelName: 'DataSources', displayName: 'DashboardWebStringId.DashboardMenuDataSources', array: true };
exports.layout = { propertyName: 'layout', modelName: 'LayoutTree' };
exports.layoutOptions = { propertyName: 'layoutOptions', modelName: 'LayoutOptions', type: layout_options_1.LayoutOptions };
exports.dashboardSerializationsInfo = [exports.dashboardTitle, exports.items, exports.groups, exports.dataSources, exports.currencyCultureName, exports.layout, exports.layoutOptions, exports.parameters, exports.colorScheme];
