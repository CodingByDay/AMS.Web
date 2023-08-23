﻿/**
* DevExpress Dashboard (_chorolpeth-map-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.choroplethMapDashboardItemSerializationsInfo = exports.tooltipAttributeName = exports.attributeName = exports.attributeDimension = exports.includeSummaryValueToShapeTitle = exports.maps = void 0;
const _data_item_1 = require("../../../data-item/metadata/_data-item");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _map_item_1 = require("./_map-item");
exports.maps = {
    propertyName: 'maps',
    modelName: 'Maps',
    displayName: 'DashboardWebStringId.Binding.Maps',
    array: true
};
exports.includeSummaryValueToShapeTitle = {
    propertyName: 'includeSummaryValueToShapeTitle',
    modelName: '@IncludeSummaryValueToShapeTitle',
    displayName: 'DashboardWebStringId.Map.IncludeSummaryValueToShapeTitle',
    defaultVal: false,
    simpleFormAdapterItem: 'yesNoButtonGroupEditor',
    from: _base_metadata_1.parseBool
};
exports.attributeDimension = {
    propertyName: '__attributeDimension',
    modelName: 'AttributeDimension',
    displayName: 'DashboardWebStringId.Map.AttributeDimension',
    info: _data_item_1.dataItemLinkSerializationsInfo
};
exports.attributeName = {
    propertyName: 'attributeName',
    modelName: '@AttributeName',
    displayName: 'DashboardWebStringId.Map.AttributeName',
    defaultVal: '',
    category: _base_metadata_1.PropertyCategory.Map
};
exports.tooltipAttributeName = {
    propertyName: 'tooltipAttributeName',
    modelName: '@ToolTopAttributeName',
    displayName: 'DashboardWebStringId.Map.TooltipAttribute',
    defaultVal: '',
    category: _base_metadata_1.PropertyCategory.Map
};
exports.choroplethMapDashboardItemSerializationsInfo = _map_item_1.mapDashboardItemSerializationsInfo.concat([exports.maps, exports.attributeDimension, exports.attributeName, exports.includeSummaryValueToShapeTitle, exports.tooltipAttributeName, _map_item_1.colorLegend]);
