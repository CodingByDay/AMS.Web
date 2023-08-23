﻿/**
* DevExpress Dashboard (_bound-image-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boundImageDashboardItemSerializationsInfo = exports.uriPattern = exports.dataBindingMode = exports.imageItem = void 0;
const _data_item_1 = require("../../data-item/metadata/_data-item");
const interactivity_options_1 = require("../options/interactivity-options");
const _data_dashboard_item_1 = require("./_data-dashboard-item");
const _image_item_1 = require("./_image-item");
exports.imageItem = { propertyName: '__imageItem', modelName: 'ImageItem', displayName: 'DashboardStringId.DescriptionBoundImageAttribute', info: _data_item_1.dataItemLinkSerializationsInfo };
exports.dataBindingMode = {
    propertyName: 'dataBindingMode', modelName: '@DataBindingMode', displayName: 'DashboardWebStringId.Image.BindingMode', defaultVal: 'BinaryArray', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'BinaryArray': 'DashboardWebStringId.Image.BindingMode.BinaryArray',
        'Uri': 'DashboardWebStringId.Image.BindingMode.Uri'
    }
};
exports.uriPattern = { propertyName: 'uriPattern', modelName: '@UriPattern', displayName: 'DashboardWebStringId.RangeFilter.UriPattern', defaultVal: '', simpleFormAdapterItem: 'textBoxEditor', editorOptions: { placeholder: 'http://www.example.com/{0}.jpg' } };
exports.boundImageDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([
    exports.imageItem, exports.dataBindingMode, exports.uriPattern, interactivity_options_1._baseInteractivityOptionsMeta, _image_item_1.sizeMode, _image_item_1.horizontalAlignment, _image_item_1.verticalAlignment
]);
