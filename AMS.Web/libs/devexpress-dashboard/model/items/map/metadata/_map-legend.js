﻿/**
* DevExpress Dashboard (_map-legend.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapLegendSerializationsInfo = exports.legendOrientation = exports.weightedLegendSerializationsInfo = exports.legendType = exports.legendPosition = exports.weightedLegendVisible = exports.legendVisible = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.legendVisible = { propertyName: 'visible', modelName: '@Visible', displayName: 'DashboardWebStringId.Map.ShowLegend', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.weightedLegendVisible = Object.assign(Object.assign({}, exports.legendVisible), { displayName: 'DashboardWebStringId.Map.ShowWeightedLegend' });
exports.legendPosition = {
    propertyName: 'position', modelName: '@Position', displayName: 'DashboardWebStringId.WeightedLegendGalleryGroup', defaultVal: 'TopLeft', simpleFormAdapterItem: 'listEditor',
    values: {
        'TopLeft': 'DashboardWebStringId.Map.Position.TopLeft',
        'TopCenter': 'DashboardWebStringId.Map.Position.TopCenter',
        'TopRight': 'DashboardWebStringId.Map.Position.TopRight',
        'BottomLeft': 'DashboardWebStringId.Map.Position.BottomLeft',
        'BottomCenter': 'DashboardWebStringId.Map.Position.BottomCenter',
        'BottomRight': 'DashboardWebStringId.Map.Position.BottomRight'
    }
};
exports.legendType = {
    propertyName: 'type', modelName: '@WeightedLegendType', displayName: 'DashboardWebStringId.Map.WeightedLegendType', defaultVal: 'Linear',
    values: {
        'Linear': 'DashboardWebStringId.Map.WeightedLegendType.Linear',
        'Nested': 'DashboardWebStringId.Map.WeightedLegendType.Nested'
    }
};
exports.weightedLegendSerializationsInfo = [exports.weightedLegendVisible, exports.legendPosition, exports.legendType];
exports.legendOrientation = {
    propertyName: 'orientation', modelName: '@Orientation', displayName: 'DashboardWebStringId.Chart.Orientation', defaultVal: 'Vertical', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Vertical': 'DashboardWebStringId.Map.Orientation.Vertical',
        'Horizontal': 'DashboardWebStringId.Map.Orientation.Horizontal'
    }
};
exports.mapLegendSerializationsInfo = [exports.legendVisible, exports.legendPosition, exports.legendOrientation];
