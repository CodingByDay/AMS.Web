﻿/**
* DevExpress Dashboard (list-box-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListBoxItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const filter_element_item_base_1 = require("./filter-element-item-base");
const _list_box_item_1 = require("./metadata/_list-box-item");
class ListBoxItem extends filter_element_item_base_1.FilterElementItemBase {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
    }
    _getInfoCore() {
        return _list_box_item_1.listBoxDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'ListBox';
    }
    _allowAllValue() { return this._isMultiselectable() || this.showAllValue(); }
    _isMultiselectable() { return this.listBoxType() === 'Checked'; }
}
exports.ListBoxItem = ListBoxItem;
serializable_model_1.itemTypesMap['ListBox'] = { type: ListBoxItem, groupName: 'filter', title: 'DashboardStringId.DefaultNameListBoxItem', index: 330 };
