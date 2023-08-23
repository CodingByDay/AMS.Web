﻿/**
* DevExpress Dashboard (_slice-table.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceTableSerializationsInfo = exports.sliceTableName = exports.measures = exports.dimensions = void 0;
exports.dimensions = { propertyName: 'dimensions', modelName: 'Dimensions', displayName: 'DashboardStringId.DescriptionDimensions', array: true };
exports.measures = { propertyName: 'measures', modelName: 'Measures', array: true };
exports.sliceTableName = { propertyName: 'name', modelName: '@Name', simpleFormAdapterItem: 'textBoxEditor' };
exports.sliceTableSerializationsInfo = [exports.dimensions, exports.measures, exports.sliceTableName];
