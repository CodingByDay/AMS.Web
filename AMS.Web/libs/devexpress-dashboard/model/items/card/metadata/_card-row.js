﻿/**
* DevExpress Dashboard (_card-row.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardSparklineRowSerializationInfo = exports.cardSparklineRowOptions = exports.height = exports.cardRowSerializationInfo = exports.elements = exports.cardRowBaseSerializationInfo = exports.indent = exports.vAlignment = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
exports.vAlignment = { propertyName: 'vAlignment', modelName: '@VAlignment' };
exports.indent = { propertyName: 'indent', modelName: '@Indent' };
exports.cardRowBaseSerializationInfo = [exports.vAlignment, exports.indent, _base_metadata_1.itemType];
exports.elements = { propertyName: 'elements', modelName: 'CardRowElements', array: true };
exports.cardRowSerializationInfo = exports.cardRowBaseSerializationInfo.concat([exports.elements]);
exports.height = { propertyName: 'height', modelName: '@Height' };
exports.cardSparklineRowOptions = { propertyName: 'sparklineOptions', modelName: 'sparklineOptions' };
exports.cardSparklineRowSerializationInfo = exports.cardRowBaseSerializationInfo.concat([exports.height, exports.cardSparklineRowOptions]);
