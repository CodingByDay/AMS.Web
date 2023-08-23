﻿/**
* DevExpress Dashboard (_date-filter-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFilterItemPropertiesComposer = void 0;
const _default_1 = require("../../../data/localization/_default");
const _date_filter_item_1 = require("../../../model/items/filter-items/metadata/_date-filter-item");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class DateFilterItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler, editRuleHandler) {
        super(customizeHandler);
        this.editRuleHandler = editRuleHandler;
    }
    _composeTabsCore(model, args) {
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model, [], {})),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Layout, 'DashboardWebStringId.AccordionTab.Layout', this.getLayoutWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.CustomRanges, 'DashboardWebStringId.RangeFilter.CustomPeriods', _shared_composers_1.SharedComposers.getCustomRangesWrapper(model, this.editRuleHandler, args.dataSourceBrowser, model.dimension))
        ];
    }
    getLayoutWrapper(model) {
        var properties = [
            _date_filter_item_1.filterType,
            _date_filter_item_1.arrangementMode,
            _date_filter_item_1.datePickerLocation,
            _date_filter_item_1.displayTextPattern
        ];
        _date_filter_item_1.displayTextPattern.editorOptions['placeholder'] = _default_1.getLocalizationById(_date_filter_item_1.displayTextPattern.editorOptions['placeholder']);
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
}
exports.DateFilterItemPropertiesComposer = DateFilterItemPropertiesComposer;
