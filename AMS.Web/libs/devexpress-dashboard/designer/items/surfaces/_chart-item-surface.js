﻿/**
* DevExpress Dashboard (_chart-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartItemSurface = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const chart_item_format_rule_1 = require("../../../model/format-rules/chart-item-format-rule");
const _chart_utils_1 = require("../../../model/internal/_chart-utils");
const _helper_classes_1 = require("../../../model/internal/_helper-classes");
const chart_indicator_1 = require("../../../model/items/chart/chart-indicator");
const chart_pane_1 = require("../../../model/items/chart/chart-pane");
const chart_series_creator_1 = require("../../../model/items/chart/chart-series-creator");
const _format_rule_surface_1 = require("../../conditional-formatting/items/surfaces/_format-rule-surface");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _chart_item_properties_composer_1 = require("../properties-composers/_chart-item-properties-composer");
const _chart_series_properties_composer_1 = require("../properties-composers/_chart-series-properties-composer");
const _data_item_properties_composer_1 = require("../properties-composers/_data-item-properties-composer");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _data_item_container_collection_surface_1 = require("../sections/_data-item-container-collection-surface");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
const _indicator_item_surface_1 = require("./_indicator-item-surface");
class ChartItemSurface extends _base_item_surface_1.DataDashboardItemSurface {
    editCFRuleRuleHandler(item, args, container) {
        var surface = new _format_rule_surface_1.FormatRuleSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
        surface.startEditing(args);
    }
    createCFRuleDelegate() {
        return new chart_item_format_rule_1.ChartItemFormatRule();
    }
    editChartIndicatorHandler(item, args, container) {
        var surface = new _indicator_item_surface_1.IndicatorSurface(container, this.dashboardItem, this._dataSourceBrowser, this.propertiesController);
        surface.startEditing(args, this.findExtension);
    }
    createChartIndicatorDelegate() {
        return chart_indicator_1.ChartIndicator._createNew(this.dashboardItem, this._dataSourceBrowser);
    }
    addConditionalFormattingOptions(tabs, dataItem) {
        const dataItemName = dataItem && dataItem.uniqueName();
        if (!dataItemName)
            return;
        const createRule = () => {
            const cfRule = this.createCFRuleDelegate();
            cfRule.dataItemName(dataItemName);
            const dataItemApplyTo = _chart_utils_1.getChartApplyToDataItems(this.dashboardItem, this._dataSourceBrowser)()[0];
            dataItemApplyTo && cfRule.dataItemApplyToName(ko.unwrap(dataItemApplyTo.uniqueName));
            return cfRule;
        };
        tabs.push(new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting', _data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(this.dashboardItem, createRule, (cfRule) => cfRule.dataItemName() === dataItemName, this.editCFRuleRuleHandler.bind(this))));
    }
    extendHiddenMeasuresTabs(tabs, model) {
        this.addConditionalFormattingOptions(tabs, model);
    }
    fillSections() {
        var createPaneSection = (pane, index) => {
            var numberPostfix = this.dashboardItem.panes().length === 1 ? '' : ' (' + pane.name() + ')', sectionsBeforePanes = 1;
            var sectionInfo = {
                title: _default_1.formatLocalizable('DashboardWebStringId.Binding.ValuesPattern', numberPostfix),
                bindingProperty: {
                    propertyName: 'series',
                    groupName: 'Series',
                    dataItemType: 'Measure',
                    emptyPlaceholder: 'DashboardWebStringId.Binding.AddValues',
                    selectedPlaceholder: 'DashboardWebStringId.Binding.ConfigureValues',
                    creator: (itemType = 'Bar') => {
                        return pane.createSeriesByViewType(itemType);
                    },
                    containersMap: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap
                },
                actions: undefined,
                detailsPropertiesComposer: new _chart_series_properties_composer_1.ChartSeriesPropertiesComposer(this._dataItemContainerCustomization, chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap, true, true, this.editCFRuleRuleHandler.bind(this), this.createCFRuleDelegate)
            };
            if (index > 0) {
                sectionInfo.actions = [{
                        title: 'DashboardWebStringId.Binding.RemovePane',
                        icon: 'dx-dashboard-remove-small',
                        action: () => {
                            this.dashboardItem.panes.remove(pane);
                            return false;
                        }
                    }];
            }
            this.dataSections.splice(index + sectionsBeforePanes, 0, new _data_item_container_collection_surface_1.DataItemContainerCollectionSurface(this, pane, sectionInfo, ko.computed(() => (this.dashboardItem.arguments().length > 0 || this.dashboardItem.seriesDimensions().length > 0) && this.dashboardItem.panes().every(p => p.series().length === 0))));
        };
        this.dataSections.push({
            template: 'dx-dashboard-add-pane-section',
            addPane: () => {
                var pane = new chart_pane_1.ChartPane(this.dashboardItem, { '@Name': _helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.DefaultNameChartPane') + ' ', this.dashboardItem.panes(), 'name', 1), '@ItemType': 'Pane' });
                this.dashboardItem.panes.push(pane);
            },
            dispose: () => { }
        });
        this._disposables.push(ko.computed(() => {
            var newPanes = this.dashboardItem.panes();
            let lastPaneSectionIndex = 1;
            for (; lastPaneSectionIndex < this.dataSections().length; lastPaneSectionIndex++) {
                if (!(this.dataSections()[lastPaneSectionIndex] instanceof _data_item_container_collection_surface_1.DataItemContainerCollectionSurface)) {
                    break;
                }
            }
            this.dataSections.splice(1, lastPaneSectionIndex - 1);
            this.dashboardItem.panes().forEach((pane, index) => {
                createPaneSection(pane, index);
            });
        }));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.Arguments, this.addConditionalFormattingOptions.bind(this)));
        this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.SeriesDimension, this.addConditionalFormattingOptions.bind(this)));
    }
    constructor(dashboardItem, dashboardModel, dataSourceBrowser, notificationController, findExtension) {
        super(dashboardItem, dashboardModel, dataSourceBrowser, notificationController, findExtension);
    }
    getPropertiesComposer() {
        return new _chart_item_properties_composer_1.ChartItemPropertiesComposer({
            customizeHandler: this._dashboardItemCustomization,
            editCFRuleHandler: this.editCFRuleRuleHandler.bind(this),
            createCFRuleDelegate: this.createCFRuleDelegate,
            editChartIndicatorHandler: this.editChartIndicatorHandler.bind(this),
            createIndicatorDelegate: this.createChartIndicatorDelegate.bind(this)
        });
    }
}
exports.ChartItemSurface = ChartItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Chart', ChartItemSurface);
