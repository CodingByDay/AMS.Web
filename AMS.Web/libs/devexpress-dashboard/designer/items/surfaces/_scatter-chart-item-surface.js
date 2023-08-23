﻿/**
* DevExpress Dashboard (_scatter-chart-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScatterChartItemSurface = void 0;
const ko = require("knockout");
const scatter_chart_item_format_rule_1 = require("../../../model/format-rules/scatter-chart-item-format-rule");
const _format_rule_surface_1 = require("../../conditional-formatting/items/surfaces/_format-rule-surface");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _data_item_properties_composer_1 = require("../properties-composers/_data-item-properties-composer");
const _scatter_chart_item_properties_composer_1 = require("../properties-composers/_scatter-chart-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _single_data_item_surface_1 = require("../sections/_single-data-item-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class ScatterChartItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController);
    }
    fillSections() {
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.AxisXMeasure,
            warning: ko.computed(() => !this.dashboardItem.axisXMeasure() && (!!this.dashboardItem.arguments().length || !!this.dashboardItem.weight() || !!this.dashboardItem.axisYMeasure())),
            extendTabsHandler: this.addConditionalFormattingOptions.bind(this),
        }));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.AxisYMeasure,
            warning: ko.computed(() => !this.dashboardItem.axisYMeasure() && (!!this.dashboardItem.arguments().length || !!this.dashboardItem.weight() || !!this.dashboardItem.axisXMeasure())),
            extendTabsHandler: this.addConditionalFormattingOptions.bind(this),
        }));
        this.dataSections.push(new _single_data_item_surface_1.SingleDataItemSurface({
            itemSurface: this,
            sectionInfo: _section_descriptors_1.SectionDescriptors.Weight,
            extendTabsHandler: this.addConditionalFormattingOptions.bind(this),
        }));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Arguments, this.addConditionalFormattingOptions.bind(this), ko.computed(() => !!this.dashboardItem.weight() && !this.dashboardItem.arguments().length)));
    }
    getPropertiesComposer() {
        return new _scatter_chart_item_properties_composer_1.ScatterChartItemPropertiesComposer(this._dashboardItemCustomization, this.editCFRuleRuleHandler.bind(this), this.createCFRuleDelegate.bind(this));
    }
    editCFRuleRuleHandler(item, args, container) {
        var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
        surface.startEditing(args);
    }
    createCFRuleDelegate() {
        return new scatter_chart_item_format_rule_1.ScatterChartItemFormatRule();
    }
    addConditionalFormattingOptions(tabs, dataItem) {
        const dataItemName = dataItem && dataItem.uniqueName();
        if (!dataItemName)
            return;
        const createRule = () => {
            const cfRule = this.createCFRuleDelegate();
            cfRule.dataItemName(dataItemName);
            return cfRule;
        };
        tabs.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(this.dashboardItem, createRule, (cfRule) => cfRule.dataItemName() === dataItemName, this.editCFRuleRuleHandler.bind(this))));
    }
    extendHiddenMeasuresTabs(tabs, model) {
        this.addConditionalFormattingOptions(tabs, model);
    }
}
exports.ScatterChartItemSurface = ScatterChartItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('ScatterChart', ScatterChartItemSurface);
