﻿/**
* DevExpress Dashboard (_layout-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutOptionsSerializationInfo = void 0;
const layout_dimension_options_1 = require("../layout-dimension-options");
const _layout_dimension_options_1 = require("./_layout-dimension-options");
let heightSerializationInfo = { propertyName: 'height', modelName: 'Height', type: layout_dimension_options_1.LayoutDimensionOptions, info: _layout_dimension_options_1.heightOptionsSerializationInfo };
let widthSerializationInfo = { propertyName: 'width', modelName: 'Width', type: layout_dimension_options_1.LayoutDimensionOptions, info: _layout_dimension_options_1.widthOptionsSerializationInfo };
exports.layoutOptionsSerializationInfo = [heightSerializationInfo, widthSerializationInfo];
