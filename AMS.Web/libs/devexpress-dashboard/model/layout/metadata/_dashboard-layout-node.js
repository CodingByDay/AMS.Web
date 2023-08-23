﻿/**
* DevExpress Dashboard (_dashboard-layout-node.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layoutItemSerializationsInfo = exports.layoutItemsSerializable = exports.layoutWeight = exports.orientation = exports.dashboardItem = void 0;
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports.dashboardItem = { propertyName: 'dashboardItem', modelName: '@DashboardItem' };
exports.orientation = { propertyName: 'orientation', modelName: '@Orientation', displayName: 'DashboardWebStringId.Chart.Orientation', defaultVal: 'Horizontal', simpleFormAdapterItem: 'textBoxEditor' };
exports.layoutWeight = { propertyName: 'weight', modelName: '@Weight', defaultVal: 1, displayName: 'DashboardStringId.WeightCaption', simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel };
exports.layoutItemsSerializable = { propertyName: 'childNodes', modelName: 'LayoutItems', displayName: 'DashboardWebStringId.Dashboard.LayoutItems', array: true };
exports.layoutItemSerializationsInfo = [_base_metadata_1.itemType, exports.layoutWeight, exports.orientation, exports.layoutItemsSerializable, exports.dashboardItem];
