﻿/**
* DevExpress Dashboard (_card-row-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardRowIndicatorElementSerializationInfo = exports.size = exports.cardRowTextElementSerializationInfo = exports.text = exports.cardRowDataElementSerializationInfo = exports.cardRowDataElementDimensionIndex = exports.cardRowDataElementValueType = exports.cardRowTextElementBaseSerializationInfo = exports.predefinedForeColor = exports.cardRowFontSize = exports.cardRowFontFamily = exports.cardRowElementColor = exports.cardRowElementSerializationsInfo = exports.hAlignment = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.hAlignment = { propertyName: 'hAlignment', modelName: '@HAlignment' };
exports.cardRowElementSerializationsInfo = [_base_metadata_1.itemType, exports.hAlignment];
exports.cardRowElementColor = { propertyName: 'color', modelName: '@ForeColor' };
exports.cardRowFontFamily = { propertyName: 'fontFamily', modelName: '@FontFamily' };
exports.cardRowFontSize = { propertyName: 'fontSize', modelName: '@FontSize' };
exports.predefinedForeColor = { propertyName: 'predefinedForeColor', modelName: '@PredefinedForeColor' };
exports.cardRowTextElementBaseSerializationInfo = exports.cardRowElementSerializationsInfo.concat([exports.cardRowElementColor, exports.cardRowFontFamily, exports.cardRowFontSize, exports.predefinedForeColor]);
exports.cardRowDataElementValueType = { propertyName: 'valueType', modelName: '@ValueType', defaultVal: 'DimensionValue' };
exports.cardRowDataElementDimensionIndex = { propertyName: 'dimensionIndex', modelName: '@DimensionIndex', defaultVal: 0 };
exports.cardRowDataElementSerializationInfo = exports.cardRowTextElementBaseSerializationInfo.concat([exports.cardRowDataElementValueType, exports.cardRowDataElementDimensionIndex]);
exports.text = { propertyName: 'text', modelName: '@Text' };
exports.cardRowTextElementSerializationInfo = exports.cardRowTextElementBaseSerializationInfo.concat([exports.text]);
exports.size = { propertyName: 'size', modelName: '@Size', defaultVal: 16 };
exports.cardRowIndicatorElementSerializationInfo = exports.cardRowElementSerializationsInfo.concat([exports.size]);
