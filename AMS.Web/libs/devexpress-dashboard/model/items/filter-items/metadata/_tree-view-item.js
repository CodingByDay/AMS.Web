﻿/**
* DevExpress Dashboard (_tree-view-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeViewDashboardItemSerializationsInfo = exports.autoExpand = void 0;
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const _filter_element_item_base_1 = require("./_filter-element-item-base");
exports.autoExpand = { propertyName: 'autoExpand', modelName: '@AutoExpand', displayName: 'DashboardWebStringId.TreeView.AutoExpand', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.treeViewDashboardItemSerializationsInfo = _filter_element_item_base_1.filterElementItemBaseSerializationInfo.concat([exports.autoExpand]);
