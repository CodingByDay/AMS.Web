﻿/**
* DevExpress Dashboard (tree-view-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeViewItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const filter_element_item_base_1 = require("./filter-element-item-base");
const _tree_view_item_1 = require("./metadata/_tree-view-item");
class TreeViewItem extends filter_element_item_base_1.FilterElementItemBase {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
    }
    _getInfoCore() {
        return _tree_view_item_1.treeViewDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'TreeView';
    }
    _allowAllValue() { return true; }
    _isMultiselectable() { return true; }
}
exports.TreeViewItem = TreeViewItem;
serializable_model_1.itemTypesMap['TreeView'] = { type: TreeViewItem, groupName: 'filter', title: 'DashboardStringId.DefaultNameTreeViewItem', index: 340 };
