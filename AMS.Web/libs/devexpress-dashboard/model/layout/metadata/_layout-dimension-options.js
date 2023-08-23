﻿/**
* DevExpress Dashboard (_layout-dimension-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.widthOptionsSerializationInfo = exports.heightOptionsSerializationInfo = exports._defaultWidth = exports._defaultHeight = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports._defaultHeight = 800;
exports._defaultWidth = 1000;
let mode = { propertyName: 'mode', modelName: '@Mode', values: {
        'Auto': 'DashboardStringId.LayoutDimensionModeAuto',
        'Fixed': 'DashboardStringId.LayoutDimensionModeFixed',
    }, defaultVal: 'Auto' };
let height = { propertyName: 'value', modelName: '@Value', defaultVal: exports._defaultHeight, from: _base_metadata_1.floatFromModel };
let width = { propertyName: 'value', modelName: '@Value', defaultVal: exports._defaultWidth, from: _base_metadata_1.floatFromModel };
exports.heightOptionsSerializationInfo = [mode, height];
exports.widthOptionsSerializationInfo = [mode, width];
