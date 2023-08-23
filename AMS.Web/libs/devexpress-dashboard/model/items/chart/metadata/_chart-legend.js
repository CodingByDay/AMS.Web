﻿/**
* DevExpress Dashboard (_chart-legend.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartLegendSerializationsInfo = exports.chartLegendVisible = exports.isInsideDiagram = exports.insidePosition = exports.outsidePosition = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.outsidePosition = {
    propertyName: 'outsidePosition', modelName: '@OutsidePosition', displayName: 'DashboardWebStringId.Chart.Position', defaultVal: 'TopRightHorizontal', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'TopLeftVertical': 'DashboardWebStringId.Chart.Position.TopLeftVertical',
        'TopLeftHorizontal': 'DashboardWebStringId.Chart.Position.TopLeftHorizontal',
        'TopCenterHorizontal': 'DashboardWebStringId.Chart.Position.TopCenterHorizontal',
        'TopRightVertical': 'DashboardWebStringId.Chart.Position.TopRightVertical',
        'TopRightHorizontal': 'DashboardWebStringId.Chart.Position.TopRightHorizontal',
        'BottomLeftVertical': 'DashboardWebStringId.Chart.Position.BottomLeftVertical',
        'BottomLeftHorizontal': 'DashboardWebStringId.Chart.Position.BottomLeftHorizontal',
        'BottomCenterHorizontal': 'DashboardWebStringId.Chart.Position.BottomCenterHorizontal',
        'BottomRightVertical': 'DashboardWebStringId.Chart.Position.BottomRightVertical',
        'BottomRightHorizontal': 'DashboardWebStringId.Chart.Position.BottomRightHorizontal'
    }
};
exports.insidePosition = {
    propertyName: 'insidePosition', modelName: '@InsidePosition', displayName: 'DashboardWebStringId.Chart.Position', defaultVal: 'TopRightHorizontal', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'TopLeftVertical': 'DashboardWebStringId.Chart.Position.TopLeftVertical',
        'TopLeftHorizontal': 'DashboardWebStringId.Chart.Position.TopLeftHorizontal',
        'TopCenterHorizontal': 'DashboardWebStringId.Chart.Position.TopCenterHorizontal',
        'TopCenterVertical': 'DashboardWebStringId.Chart.Position.TopCenterVertical',
        'TopRightVertical': 'DashboardWebStringId.Chart.Position.TopRightVertical',
        'TopRightHorizontal': 'DashboardWebStringId.Chart.Position.TopRightHorizontal',
        'BottomLeftVertical': 'DashboardWebStringId.Chart.Position.BottomLeftVertical',
        'BottomLeftHorizontal': 'DashboardWebStringId.Chart.Position.BottomLeftHorizontal',
        'BottomCenterHorizontal': 'DashboardWebStringId.Chart.Position.BottomCenterHorizontal',
        'BottomCenterVertical': 'DashboardWebStringId.Chart.Position.BottomCenterVertical',
        'BottomRightVertical': 'DashboardWebStringId.Chart.Position.BottomRightVertical',
        'BottomRightHorizontal': 'DashboardWebStringId.Chart.Position.BottomRightHorizontal'
    }
};
exports.isInsideDiagram = { propertyName: 'isInsideDiagram', modelName: '@IsInsidePosition', displayName: 'DashboardWebStringId.Chart.IsInsideOfDiagram', defaultVal: false, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.chartLegendVisible = { propertyName: 'visible', modelName: '@Visible', displayName: 'DashboardWebStringId.Chart.ShowLegend', defaultVal: true, simpleFormAdapterItem: 'yesNoButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.chartLegendSerializationsInfo = [exports.outsidePosition, exports.insidePosition, exports.isInsideDiagram, exports.chartLegendVisible];
