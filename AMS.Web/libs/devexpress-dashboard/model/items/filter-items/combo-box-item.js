﻿/**
* DevExpress Dashboard (combo-box-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComboBoxItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const filter_element_item_base_1 = require("./filter-element-item-base");
const _combo_box_item_1 = require("./metadata/_combo-box-item");
class ComboBoxItem extends filter_element_item_base_1.FilterElementItemBase {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
    }
    _getInfoCore() {
        return _combo_box_item_1.comboBoxDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'ComboBox';
    }
    _allowAllValue() { return this._isMultiselectable() || this.showAllValue(); }
    _isMultiselectable() { return this.comboBoxType() === 'Checked'; }
}
exports.ComboBoxItem = ComboBoxItem;
serializable_model_1.itemTypesMap['ComboBox'] = { type: ComboBoxItem, groupName: 'filter', title: 'DashboardStringId.DefaultNameComboBoxItem', index: 320 };
