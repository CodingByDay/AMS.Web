﻿/**
* DevExpress Dashboard (_range-filter-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeFilterItemPropertiesComposer = void 0;
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class RangeFilterItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler, editRuleHandler) {
        super(customizeHandler);
        this.editRuleHandler = editRuleHandler;
    }
    _composeTabsCore(model, args) {
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.CustomRanges, 'DashboardWebStringId.RangeFilter.CustomPeriods', _shared_composers_1.SharedComposers.getCustomRangesWrapper(model, this.editRuleHandler, args.dataSourceBrowser, model.argument))
        ];
    }
}
exports.RangeFilterItemPropertiesComposer = RangeFilterItemPropertiesComposer;
