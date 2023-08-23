﻿/**
* DevExpress Dashboard (_dashboard-item-coloring-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardItemColoringOptionsSerializationsInfo = exports.measuresColoringMode = exports.useGlobalColors = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.useGlobalColors = {
    propertyName: 'useGlobalColors', modelName: '@UseGlobalColors', displayName: 'DashboardWebStringId.Colorization.ColorSchemeType', defaultVal: true, simpleFormAdapterItem: 'buttonGroupEditor', from: _base_metadata_1.parseBool,
    valuesArray: [{
            value: true,
            displayValue: 'DashboardWebStringId.Coloring.Global'
        }, {
            value: false,
            displayValue: 'DashboardWebStringId.Coloring.Local'
        }],
    category: _base_metadata_1.PropertyCategory.Coloring
};
exports.measuresColoringMode = {
    propertyName: 'measuresColoringMode', modelName: '@MeasuresColoringMode', displayName: 'DashboardWebStringId.Coloring.MeasuresColoringMode', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardWebStringId.ColoringModeAuto',
        'None': 'DashboardWebStringId.ColoringModeOff',
        'Hue': 'DashboardWebStringId.ColoringModeOn'
    }
};
exports.dashboardItemColoringOptionsSerializationsInfo = [exports.useGlobalColors, exports.measuresColoringMode];
