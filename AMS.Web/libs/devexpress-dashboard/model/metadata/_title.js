﻿/**
* DevExpress Dashboard (_title.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardTitleSerializationsInfo = exports.titleImageType = exports.titleImageUrl = exports.titleImage64 = exports.titleAlignment = exports.includeMasterFilter = exports.titleVisible = exports.titleText = void 0;
const _base_metadata_1 = require("./_base-metadata");
exports.titleText = { propertyName: 'text', modelName: '@Text', displayName: 'DashboardWebStringId.Title.Text', simpleFormAdapterItem: 'textBoxEditor' };
exports.titleVisible = { propertyName: 'visible', displayName: 'DashboardWebStringId.Title.Visible', modelName: '@Visible', defaultVal: true, simpleFormAdapterItem: 'checkBoxEditor', from: _base_metadata_1.parseBool };
exports.includeMasterFilter = { propertyName: 'includeMasterFilter', displayName: 'DashboardWebStringId.Title.IncludeMasterFilter', modelName: '@IncludeMasterFilterState', defaultVal: true, simpleFormAdapterItem: 'checkBoxEditor', from: _base_metadata_1.parseBool };
exports.titleAlignment = {
    propertyName: 'alignment', modelName: '@Alignment', defaultVal: 'Center', displayName: 'DashboardWebStringId.Title.Aligment', simpleFormAdapterItem: 'listEditor',
    values: {
        'Left': 'DashboardWebStringId.Title.Aligment.Left',
        'Center': 'DashboardWebStringId.Title.Aligment.Center',
    }
};
exports.titleImage64 = { propertyName: 'image64', modelName: 'ImageData' };
exports.titleImageUrl = { propertyName: 'url', modelName: '@Url', simpleFormAdapterItem: 'textBoxEditor' };
exports.titleImageType = {
    propertyName: 'imageType', displayName: 'DashboardWebStringId.Title.Image', defaultVal: 'none', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'embedded': 'DashboardWebStringId.Title.ImageEmbedded',
        'linked': 'DashboardWebStringId.Title.ImageLinked',
        'none': 'DashboardWebStringId.Title.ImageNone'
    }
};
exports.dashboardTitleSerializationsInfo = [exports.titleText, exports.titleVisible, exports.titleAlignment, exports.includeMasterFilter, exports.titleImageType, exports.titleImage64, exports.titleImageUrl];
