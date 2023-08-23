/**
* DevExpress Dashboard (_custom-shape-file.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customShapefileSerializationsInfo = exports.customShapefileData = exports.customShapefileUrl = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const custom_shape_file_data_1 = require("../custom-shape-file-data");
exports.customShapefileUrl = { propertyName: 'url', modelName: '@Url', displayName: 'DashboardWebStringId.Map.CustomMapUrl', defaultVal: undefined, simpleFormAdapterItem: 'textBoxEditor', editorOptions: { placeholder: 'http://www.example.com/map.shp' }, category: _base_metadata_1.PropertyCategory.Map };
exports.customShapefileData = { propertyName: 'data', modelName: 'Data', type: custom_shape_file_data_1.CustomShapefileData };
exports.customShapefileSerializationsInfo = [exports.customShapefileUrl, exports.customShapefileData];
