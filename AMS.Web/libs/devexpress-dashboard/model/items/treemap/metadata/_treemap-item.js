﻿/**
* DevExpress Dashboard (_treemap-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treemapDashboardItemSerializationsInfo = exports.groupsTooltipContentType = exports.groupsLabelContentType = exports.tilesTooltipContentType = exports.tilesLabelContentType = exports.layoutDirection = exports.layoutAlgorithm = exports.treeMapArgumentsMeta = exports.treeMapvalues = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
const interactivity_options_1 = require("../../options/interactivity-options");
const _coloring_options_1 = require("../../options/metadata/_coloring-options");
exports.treeMapvalues = { propertyName: _base_metadata_1.valuesPropertyName, modelName: 'Values', displayName: 'DashboardWebStringId.Binding.Values', array: true };
exports.treeMapArgumentsMeta = { propertyName: _base_metadata_1.argumentsPropertyName, modelName: 'Arguments', array: true };
exports.layoutAlgorithm = {
    propertyName: 'layoutAlgorithm', modelName: '@LayoutAlgorithm', displayName: 'DashboardWebStringId.TreemapLayoutAlgorithm', defaultVal: 'Squarified', simpleFormAdapterItem: 'listEditor',
    values: {
        'SliceAndDice': 'DashboardWebStringId.Treemap.SliceAndDiceLayoutAlgorithm',
        'Squarified': 'DashboardWebStringId.Treemap.SquarifiedLayoutAlgorithm',
        'Striped': 'DashboardWebStringId.Treemap.StripedLayoutAlgorithm'
    }
};
exports.layoutDirection = {
    propertyName: 'layoutDirection', modelName: '@LayoutDirection', displayName: 'DashboardWebStringId.Treemap.LayoutDirection', defaultVal: 'TopLeftToBottomRight', simpleFormAdapterItem: 'listEditor',
    values: {
        'BottomLeftToTopRight': 'DashboardWebStringId.Treemap.BottomLeftToTopRightLayoutDirection',
        'BottomRightToTopLeft': 'DashboardWebStringId.Treemap.BottomRightToTopLeftLayoutDirection',
        'TopLeftToBottomRight': 'DashboardWebStringId.Treemap.TopLeftToBottomRightLayoutDirection',
        'TopRightToBottomLeft': 'DashboardWebStringId.Treemap.TopRightToBottomLeftLayoutDirection'
    }
};
exports.tilesLabelContentType = {
    propertyName: 'tilesLabelContentType', modelName: '@TilesLabelContentType', displayName: 'DashboardWebStringId.TilesLabelContentType', defaultVal: 'Argument', simpleFormAdapterItem: 'listEditor',
    values: {
        'None': 'DashboardWebStringId.Treemap.TileLabelsNone',
        'Argument': 'DashboardWebStringId.Treemap.TileLabelsArgument',
        'Value': 'DashboardWebStringId.Treemap.TileLabelsValue',
        'ArgumentAndValue': 'DashboardWebStringId.Treemap.TileLabelsArgumentAndValue'
    }
};
exports.tilesTooltipContentType = {
    propertyName: 'tilesTooltipContentType', modelName: '@TilesTooltipContentType', displayName: 'DashboardWebStringId.TilesTooltipContentType', defaultVal: 'ArgumentAndValue', simpleFormAdapterItem: 'listEditor',
    values: {
        'None': 'DashboardWebStringId.Treemap.TileTooltipsNone',
        'Argument': 'DashboardWebStringId.Treemap.TileTooltipsArgument',
        'Value': 'DashboardWebStringId.Treemap.TileTooltipsValue',
        'ArgumentAndValue': 'DashboardWebStringId.Treemap.TileTooltipsArgumentAndValue'
    }
};
exports.groupsLabelContentType = {
    propertyName: 'groupsLabelContentType', modelName: '@GroupsLabelContentType', displayName: 'DashboardWebStringId.GroupsLabelContentType', defaultVal: 'Argument', simpleFormAdapterItem: 'listEditor',
    values: {
        'None': 'DashboardWebStringId.Treemap.GroupLabelsNone',
        'Argument': 'DashboardWebStringId.Treemap.GroupLabelsArgument',
        'Value': 'DashboardWebStringId.Treemap.GroupLabelsValue',
        'ArgumentAndValue': 'DashboardWebStringId.Treemap.GroupLabelsArgumentAndValue'
    }
};
exports.groupsTooltipContentType = {
    propertyName: 'groupsTooltipContentType', modelName: '@GroupsTooltipContentType', displayName: 'DashboardWebStringId.GroupsTooltipContentType', defaultVal: 'ArgumentAndValue', simpleFormAdapterItem: 'listEditor',
    values: {
        'None': 'DashboardWebStringId.Treemap.GroupTooltipsNone',
        'Argument': 'DashboardWebStringId.Treemap.GroupTooltipsArgument',
        'Value': 'DashboardWebStringId.Treemap.GroupTooltipsValue',
        'ArgumentAndValue': 'DashboardWebStringId.Treemap.GroupTooltipsArgumentAndValue'
    }
};
exports.treemapDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.treeMapvalues, exports.treeMapArgumentsMeta, exports.layoutAlgorithm, exports.layoutDirection, exports.tilesLabelContentType, exports.tilesTooltipContentType, exports.groupsLabelContentType, exports.groupsTooltipContentType, interactivity_options_1._dashboardItemInteractivityOptionsMeta, _coloring_options_1.coloringOptions]);
