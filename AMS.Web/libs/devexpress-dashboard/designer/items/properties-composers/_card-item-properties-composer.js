﻿/**
* DevExpress Dashboard (_card-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardItemPropertiesComposer = void 0;
const card_item_delta_format_rule_1 = require("../../../model/format-rules/card-item-delta-format-rule");
const card_item_format_rule_1 = require("../../../model/format-rules/card-item-format-rule");
const _card_item_format_rule_properties_composer_1 = require("../../conditional-formatting/items/properties-composers/_card-item-format-rule-properties-composer");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _data_item_properties_composer_1 = require("./_data-item-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class CardItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler, editRuleHandler) {
        super(customizeHandler);
        this.editRuleHandler = editRuleHandler;
    }
    _composeTabsCore(model, args) {
        return [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ContentArrangement, 'DashboardWebStringId.AccordionTab.Layout', _shared_composers_1.SharedComposers.getContentArrangementWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(model, () => !_card_item_format_rule_properties_composer_1.isDeltaFormatRuleAvaliable(model) ? new card_item_format_rule_1.CardItemFormatRule() : new card_item_delta_format_rule_1.CardItemDeltaFormatRule(), () => true, this.editRuleHandler))
        ];
    }
}
exports.CardItemPropertiesComposer = CardItemPropertiesComposer;
