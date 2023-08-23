﻿/**
* DevExpress Dashboard (_map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapDashboardItemSerializationsInfo = exports.shapeTitleAttributeName = exports.lockNavigation = exports.tooltipMeasures = exports.viewport = exports.customShapefile = exports.weightedLegend = exports.colorLegend = exports.area = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
const custom_shape_file_1 = require("../custom-shape-file");
const map_legend_1 = require("../map-legend");
const map_viewport_1 = require("../map-viewport");
exports.area = {
    propertyName: 'area', modelName: '@ShapefileArea', defaultVal: 'WorldCountries',
    values: {
        'WorldCountries': 'DashboardWebStringId.Map.Area.WorldCountries',
        'Europe': 'DashboardWebStringId.Map.Area.Europe',
        'Asia': 'DashboardWebStringId.Map.Area.Asia',
        'NorthAmerica': 'DashboardWebStringId.Map.Area.NorthAmerica',
        'SouthAmerica': 'DashboardWebStringId.Map.Area.SouthAmerica',
        'Africa': 'DashboardWebStringId.Map.Area.Africa',
        'USA': 'DashboardWebStringId.Map.Area.USA',
        'Canada': 'DashboardWebStringId.Map.Area.Canada',
        'Custom': 'DashboardWebStringId.Map.Area.Custom'
    },
    category: _base_metadata_1.PropertyCategory.Map
};
exports.colorLegend = { propertyName: 'legend', modelName: 'MapLegend', displayName: 'DashboardWebStringId.Chart.Legend', type: map_legend_1.MapLegend };
exports.weightedLegend = { propertyName: 'weightedLegend', modelName: 'WeightedLegend', displayName: 'DashboardWebStringId.AccordionTab.WeightedLegend', type: map_legend_1.WeightedLegend };
exports.customShapefile = { propertyName: 'customShapefile', modelName: 'CustomShapefile', type: custom_shape_file_1.CustomShapefile };
exports.viewport = { propertyName: 'viewport', modelName: 'ViewArea', displayName: 'DashboardWebStringId.Map.Viewport', type: map_viewport_1.MapViewport };
exports.tooltipMeasures = { propertyName: '__tooltipMeasures', modelName: 'TooltipMeasures', displayName: 'DashboardWebStringId.Binding.TooltipMeasures', array: true };
exports.lockNavigation = {
    propertyName: 'lockNavigation', modelName: '@LockNavigation', displayName: 'DashboardWebStringId.MapLockNavigation', defaultVal: false, simpleFormAdapterItem: 'buttonGroupEditor', valuesArray: [
        { value: true, displayValue: 'DashboardWebStringId.MapLockNavigationLocked' },
        { value: false, displayValue: 'DashboardWebStringId.MapLockNavigationUnlocked' }
    ], from: _base_metadata_1.parseBool, category: _base_metadata_1.PropertyCategory.ViewModel
};
exports.shapeTitleAttributeName = { propertyName: 'shapeTitleAttributeName', modelName: '@ShapeTitleAttributeName', displayName: 'DashboardWebStringId.Map.ShapeTitleAttribute', defaultVal: '', category: _base_metadata_1.PropertyCategory.Map };
exports.mapDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.area, exports.customShapefile, exports.viewport, exports.tooltipMeasures, exports.lockNavigation, exports.shapeTitleAttributeName, interactivity_options_1._masterFilterInteractivityOptionsMeta]);
