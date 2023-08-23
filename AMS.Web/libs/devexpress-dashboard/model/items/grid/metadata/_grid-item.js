﻿/**
* DevExpress Dashboard (_grid-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardGridItemSerializationsInfo = exports.sparklineArgument = exports.gridColumns = exports.gridColumnFilter = exports.gridOptions = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
const grid_column_filter_options_1 = require("../grid-column-filter-options");
const grid_options_1 = require("../grid-options");
exports.gridOptions = { propertyName: 'gridOptions', modelName: 'GridOptions', displayName: 'DashboardWebStringId.Grid.Options', type: grid_options_1.GridOptions };
exports.gridColumnFilter = { propertyName: 'columnFilterOptions', modelName: 'ColumnFilterOptions', displayName: 'DashboardWebStringId.Grid.GridColumnFilter', type: grid_column_filter_options_1.GridColumnFilterOptions };
exports.gridColumns = { propertyName: 'columns', modelName: 'GridColumns', displayName: 'DashboardStringId.PivotCalculationAlongColumns', array: true };
exports.sparklineArgument = { propertyName: _base_metadata_1.sparklineArgumentPropertyName, modelName: 'SparklineArgument', displayName: 'DashboardStringId.GridCalculationAlongSparklineArgument', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.dashboardGridItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat(exports.gridColumns, exports.sparklineArgument, exports.gridOptions, interactivity_options_1._dashboardItemInteractivityOptionsMeta, exports.gridColumnFilter);
