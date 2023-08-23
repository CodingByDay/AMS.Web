﻿/**
* DevExpress Dashboard (_custom-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customDashboardItemSerializationsInfo = exports.coloringMeasures = exports.coloringDimensions = exports.interactivityTargets = exports.sliceTables = exports.customItemType = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _data_dashboard_item_1 = require("../../metadata/_data-dashboard-item");
exports.customItemType = { propertyName: 'customItemType', modelName: '@CustomItemType' };
exports.sliceTables = { propertyName: 'sliceTables', modelName: 'SliceTables', array: true, category: _base_metadata_1.PropertyCategory.Data };
exports.interactivityTargets = { propertyName: 'interactivityTargets', modelName: 'InteractivityTargets', array: true };
exports.coloringDimensions = { propertyName: 'coloringDimensions', modelName: 'ColoringDimensions', array: true };
exports.coloringMeasures = { propertyName: 'coloringMeasures', modelName: 'ColoringMeasures', array: true };
exports.customDashboardItemSerializationsInfo = _data_dashboard_item_1.dataDashboardItemSerializationsInfo.concat([exports.customItemType, exports.sliceTables, exports.interactivityTargets]);
