﻿/**
* DevExpress Dashboard (_filter-element-item-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterElementItemBaseSerializationInfo = exports.enableSearch = exports.showAllValue = exports.filterDimensions = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
exports.filterDimensions = { propertyName: '__filterDimensions', modelName: 'FilterDimensions', displayName: 'DashboardStringId.DescriptionDimensions', array: true };
exports.showAllValue = { propertyName: 'showAllValue', modelName: '@ShowAllValue', displayName: 'DashboardWebStringId.FilterItem.ShowAllValue', defaultVal: true, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.enableSearch = { propertyName: 'enableSearch', modelName: '@EnableSearch', displayName: 'DashboardWebStringId.FilterItem.EnableSearch', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel };
exports.filterElementItemBaseSerializationInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.filterDimensions, interactivity_options_1._filterItemInteractivityOptionsMeta, exports.enableSearch]);
