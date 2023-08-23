﻿/**
* DevExpress Dashboard (_pivot-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PivotItemSurface = void 0;
const measure_1 = require("../../../model/data-item/measure");
const _format_rule_surface_1 = require("../../conditional-formatting/items/surfaces/_format-rule-surface");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _data_item_properties_composer_1 = require("../properties-composers/_data-item-properties-composer");
const _pivot_item_properties_composer_1 = require("../properties-composers/_pivot-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class PivotItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    addConditionalFormattingOptions(tabs, dataItem) {
        if (dataItem && dataItem.uniqueName()) {
            var editRuleHandler = (selection, args, container) => {
                var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
                surface.startEditing(args);
            };
            var dataItemApplyTo = dataItem;
            if (dataItemApplyTo instanceof measure_1.Measure && this.dashboardItem.hiddenMeasures().indexOf(dataItemApplyTo) !== -1) {
                dataItemApplyTo = this.dashboardItem.values()[0];
            }
            tabs.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(this.dashboardItem, _data_item_properties_composer_1.DataItemsPropertiesComposer.getCellFormatRuleCreator(dataItem, dataItemApplyTo, 'PivotItemFormatRule'), _data_item_properties_composer_1.DataItemsPropertiesComposer.getCellFormatRuleFilter(dataItem), editRuleHandler)));
        }
    }
    extendHiddenMeasuresTabs(tabs, model) {
        this.addConditionalFormattingOptions(tabs, model);
    }
    fillSections() {
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Values, this.addConditionalFormattingOptions.bind(this)));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Columns, this.addConditionalFormattingOptions.bind(this)));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Rows, this.addConditionalFormattingOptions.bind(this)));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    getPropertiesComposer() {
        var editRuleHandler = (selection, args, container) => {
            var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
            surface.startEditing(args);
        };
        return new _pivot_item_properties_composer_1.PivotItemPropertiesComposer(this._dashboardItemCustomization, editRuleHandler);
    }
}
exports.PivotItemSurface = PivotItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Pivot', PivotItemSurface);
