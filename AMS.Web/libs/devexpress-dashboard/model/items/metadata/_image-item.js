﻿/**
* DevExpress Dashboard (_image-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageDashboardItemSerializationsInfo = exports.verticalAlignment = exports.horizontalAlignment = exports.sizeMode = exports.imageType = exports.image64 = exports.urlPath = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
const _dashboard_item_1 = require("./_dashboard-item");
exports.urlPath = { propertyName: 'urlPath', modelName: '@Url', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor' };
exports.image64 = { propertyName: 'image64', modelName: 'ImageData' };
exports.imageType = {
    propertyName: 'imageType', displayName: 'DashboardWebStringId.Title.Image', defaultVal: 'linked', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'linked': 'DashboardWebStringId.Title.ImageLinked',
        'embedded': 'DashboardWebStringId.Title.ImageEmbedded'
    }
};
exports.sizeMode = {
    propertyName: 'sizeMode', modelName: '@SizeMode', displayName: 'DashboardStringId.SizeMode', defaultVal: 'Clip', simpleFormAdapterItem: 'listEditor',
    values: {
        'Clip': 'DashboardWebStringId.Image.SizeMode.Clip',
        'Stretch': 'DashboardWebStringId.Image.SizeMode.Stretch',
        'Zoom': 'DashboardWebStringId.Image.SizeMode.Zoom',
        'Squeeze': 'DashboardWebStringId.Image.SizeMode.Squeeze'
    },
    category: _base_metadata_1.PropertyCategory.ViewModel
};
exports.horizontalAlignment = {
    propertyName: 'horizontalAlignment', modelName: '@HorizontalAlignment', displayName: 'DashboardWebStringId.Image.HorizontalAlignment', defaultVal: 'Center', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Left': 'DashboardWebStringId.Image.Alignment.Left',
        'Center': 'DashboardWebStringId.Image.Alignment.Center',
        'Right': 'DashboardWebStringId.Image.Alignment.Right'
    },
    category: _base_metadata_1.PropertyCategory.ViewModel
};
exports.verticalAlignment = {
    propertyName: 'verticalAlignment', modelName: '@VerticalAlignment', displayName: 'DashboardWebStringId.Image.VerticalAlignment', defaultVal: 'Center', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Top': 'DashboardWebStringId.Image.Alignment.Top',
        'Center': 'DashboardWebStringId.Image.Alignment.Center',
        'Bottom': 'DashboardWebStringId.Image.Alignment.Bottom'
    },
    category: _base_metadata_1.PropertyCategory.ViewModel
};
exports.imageDashboardItemSerializationsInfo = _dashboard_item_1.dashboardItemSerializationsInfo.concat([exports.urlPath, exports.imageType, exports.image64, exports.sizeMode, exports.horizontalAlignment, exports.verticalAlignment]);
