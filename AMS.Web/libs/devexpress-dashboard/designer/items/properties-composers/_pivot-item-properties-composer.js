﻿/**
* DevExpress Dashboard (_pivot-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotItemPropertiesComposer = void 0;
const _dashboard_item_format_rule_1 = require("../../../model/format-rules/metadata/_dashboard-item-format-rule");
const data_dashboard_item_1 = require("../../../model/items/data-dashboard-item");
const _data_dashboard_item_1 = require("../../../model/items/metadata/_data-dashboard-item");
const _pivot_item_1 = require("../../../model/items/pivot/metadata/_pivot-item");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class PivotItemPropertiesComposer extends _base_properties_composer_1.DashboardItemPropertiesComposer {
    constructor(customizeHandler, editRuleHandler) {
        super(customizeHandler);
        this.editRuleHandler = editRuleHandler;
    }
    _composeTabsCore(model, args) {
        var result = [
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', _shared_composers_1.SharedComposers.getCommonWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DataLayout, 'DashboardWebStringId.AccordionTab.Layout', this.getLayoutDataWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DataLayout, 'DashboardWebStringId.AccordionTab.PivotInitialState', this.getInitialStateDataWrapper(model)),
            new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', PivotItemPropertiesComposer.getFormatRulesWrapper(model, args.dataSourceBrowser, this.editRuleHandler))
        ];
        return result;
    }
    static getFormatRulesWrapper(model, dataSourceBrowser, editHandler) {
        const collectionEditorOptions = {
            propertyName: _dashboard_item_format_rule_1.classCaption.propertyName,
            createNewItemHandler: () => data_dashboard_item_1.DataDashboardItem._createFormatRule(null, { '@ItemType': 'PivotItemFormatRule' }),
            editItemHandler: editHandler
        };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [Object.assign(Object.assign({}, _data_dashboard_item_1.formatRules), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })]
        });
    }
    getLayoutDataWrapper(model) {
        var properties = [
            _pivot_item_1.layoutType,
            _pivot_item_1.showColumnTotals,
            _pivot_item_1.showRowTotals,
            _pivot_item_1.showColumnGrandTotals,
            _pivot_item_1.showRowGrandTotals,
            _pivot_item_1.columnTotalsPosition,
            _pivot_item_1.rowTotalsPosition,
            _pivot_item_1.valuesPosition
        ];
        var disabledRules = {};
        disabledRules[_pivot_item_1.rowTotalsPosition.propertyName] = (m) => { return model.layoutType() === 'Compact'; };
        disabledRules[_pivot_item_1.showRowTotals.propertyName] = (m) => { return model.layoutType() === 'Compact'; };
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties,
            disabledFilterRules: disabledRules
        });
    }
    getInitialStateDataWrapper(model) {
        var properties = [
            _pivot_item_1.autoExpandColumnGroups,
            _pivot_item_1.autoExpandRowGroups
        ];
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: properties
        });
    }
}
exports.PivotItemPropertiesComposer = PivotItemPropertiesComposer;
