﻿/**
* DevExpress Dashboard (_filter-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterItemPropertiesComposer = void 0;
const combo_box_item_1 = require("../../../model/items/filter-items/combo-box-item");
const list_box_item_1 = require("../../../model/items/filter-items/list-box-item");
const _combo_box_item_1 = require("../../../model/items/filter-items/metadata/_combo-box-item");
const _filter_element_item_base_1 = require("../../../model/items/filter-items/metadata/_filter-element-item-base");
const _list_box_item_1 = require("../../../model/items/filter-items/metadata/_list-box-item");
const _tree_view_item_1 = require("../../../model/items/filter-items/metadata/_tree-view-item");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class FilterItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler) {
        super(customizeHandler);
    }
    _composeTabsCore(model) {
        var disabledRules = {};
        disabledRules[_filter_element_item_base_1.showAllValue.propertyName] = (args) => {
            var model = args.model;
            if (model instanceof list_box_item_1.ListBoxItem) {
                return model.listBoxType() === 'Checked';
            }
            if (model instanceof combo_box_item_1.ComboBoxItem) {
                return model.comboBoxType() === 'Checked';
            }
            return false;
        };
        var showAllValuePropertyInfo = _filter_element_item_base_1.showAllValue;
        if (model._useNeutralFilterMode()) {
            showAllValuePropertyInfo.displayName = 'DashboardWebStringId.FilterItem.AllowEmptyFilter';
        }
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [
                _combo_box_item_1.comboBoxType,
                _list_box_item_1.listBoxType,
                _filter_element_item_base_1.showAllValue,
                _tree_view_item_1.autoExpand,
                _filter_element_item_base_1.enableSearch
            ], disabledRules))
        ];
        return result;
    }
}
exports.FilterItemPropertiesComposer = FilterItemPropertiesComposer;
