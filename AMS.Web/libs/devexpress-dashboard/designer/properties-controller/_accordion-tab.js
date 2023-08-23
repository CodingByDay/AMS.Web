﻿/**
* DevExpress Dashboard (_accordion-tab.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BindingAccordionTab = exports.ItemGroupAccordionTab = exports.StyleAccordionTab = exports.TypeAccordionTab = exports.ContentInHeaderAccordionTab = exports.AccordionTab = exports.KnownTabs = void 0;
const ko = require("knockout");
exports.KnownTabs = {
    Binding: 'Binding',
    DataShaping: 'DataShaping',
    NumericFormat: 'NumericFormat',
    DateTimeFormat: 'DateTimeFormat',
    TopN: 'TopN',
    Interactivity: 'Interactivity',
    ItemFilter: 'ItemFilter',
    VisibleDataFilter: 'VisibleDataFilter',
    Common: 'Common',
    Totals: 'Totals',
    AxisX: 'AxisX',
    Indicators: 'Indicators',
    IndicatorSettings: 'Indicator settings',
    AxisY: 'AxisY',
    Legend: 'Legend',
    ColoringOptions: 'ColoringOptions',
    ColorLegend: 'ColorLegend',
    WeightedLegend: 'WeightedLegend',
    Layout: 'Layout',
    ConditionalFormatting: 'ConditionalFormatting',
    GridColumnFilter: 'GridColumnFilter',
    FormatRuleCommon: 'FormatRuleBinding',
    FormatRuleCondition: 'FormatRuleCondition',
    FormatRuleChartLegend: 'FormatRuleChartLegend',
    FormatRuleMisc: 'FormatRuleStyle',
    CustomRanges: 'CustomRanges',
    Type: 'Type',
    PointLabels: 'PointLabels',
    DeltaOptions: 'DeltaOptions',
    ScaleOptions: 'ScaleOptions',
    SparklineOptions: 'SparklineOptions',
    CardTemplates: 'CardTemplates',
    DeltaFormats: 'DeltaFormats',
    CardTemplateSettings: 'CardTemplateSettings',
    ContentArrangement: 'ContentArrangement',
    ShapeLabels: 'ShapeLabels',
    Labels: 'Labels',
    DataLayout: 'DataDesign',
    DataItemsGroup: 'DataItemsGroup',
    ColorScheme: 'ColorScheme',
    Calculations: 'Calculations',
    Expression: 'Expression',
    TileOptions: 'TileOptions',
    UnwrappedDataItem: 'UnwrappedDataItem',
    CustomMapOptions: 'CustomMapOptions',
    MeasureFilter: 'MeasureFilter',
    TabContainer: 'TabContainer'
};
class AccordionTab {
    constructor(name, category, tabModel) {
        this.name = name;
        this.category = category;
        this.tabModel = ko.observable();
        this.orderNo = undefined;
        this.visible = ko.computed(() => {
            let tabModel = this.tabModel();
            return !!(tabModel && ((tabModel.isEmpty === undefined) || !tabModel.isEmpty()));
        });
        if (tabModel) {
            this.tabModel(tabModel);
        }
    }
    grabData(tab) {
        const oldModel = this.tabModel(), newModel = tab.tabModel();
        if (oldModel === newModel) {
            return;
        }
        this.tabModel(tab.tabModel());
        this.disposeTabModel(oldModel);
    }
    get summary() {
        return this.tabModel() && this.tabModel().summary;
    }
    get buttons() {
        return this.tabModel() && this.tabModel().buttons;
    }
    unsubscribeTabModel(tabModel) {
        tabModel && tabModel.summary && tabModel.summary.dispose();
    }
    disposeTabModel(tabModel) {
        if (!tabModel) {
            return;
        }
        this.unsubscribeTabModel(tabModel);
        tabModel.unbindModel && tabModel.unbindModel();
    }
    dispose() {
        this.disposeTabModel(this.tabModel());
    }
}
exports.AccordionTab = AccordionTab;
class ContentInHeaderAccordionTab extends AccordionTab {
    constructor() {
        super(...arguments);
        this.orderNo = 50;
        this.style = 'dx-dashboard-item-type-selector';
        this.headerTemplate = 'dx-dashboard-content-in-tab-header-template';
        this.hasNoBorder = true;
        this.onTitleClick = (tabModel, data, event) => {
            event.stopPropagation();
            return false;
        };
    }
}
exports.ContentInHeaderAccordionTab = ContentInHeaderAccordionTab;
class TypeAccordionTab extends AccordionTab {
    constructor() {
        super(...arguments);
        this.orderNo = 50;
        this.style = 'dx-dashboard-item-type-selector';
        this.headerTemplate = 'dx-dashboard-container-type-selector-header';
        this.tabTemplate = 'dx-dashboard-container-type-selector-full';
        this.hasNoBorder = true;
        this.onTitleClick = (tabModel, data, event) => {
            var model = ko.unwrap(tabModel);
            if (model) {
                model.headerClick(data, event);
            }
        };
    }
}
exports.TypeAccordionTab = TypeAccordionTab;
class StyleAccordionTab extends AccordionTab {
    constructor() {
        super(...arguments);
        this.orderNo = 55;
        this.style = 'dx-dashboard-item-type-selector';
        this.headerTemplate = 'dx-dashboard-container-style-selector-header';
        this.hasNoBorder = true;
        this.onTitleClick = (tabModel, data, event) => {
            var model = ko.unwrap(tabModel);
            if (model) {
                model.headerClick(data, event);
            }
        };
    }
}
exports.StyleAccordionTab = StyleAccordionTab;
class ItemGroupAccordionTab extends AccordionTab {
    constructor() {
        super(...arguments);
        this.style = 'dx-dashboard-items-wrapper';
        this.orderNo = 60;
        this.headerTemplate = 'dx-dashboard-data-items-header';
        this.hasNoBorder = true;
    }
    get headerHeight() { return this.tabModel().model()._getBindingModel().length * 40 + 15; }
}
exports.ItemGroupAccordionTab = ItemGroupAccordionTab;
class BindingAccordionTab extends AccordionTab {
    constructor(name, category) {
        super(name, category);
        this.name = name;
        this.category = category;
        this.tabTemplate = 'dx-dashboard-data-item-general';
        this.orderNo = 70;
    }
    get summaryHint() {
        return this.tabModel() && this.tabModel().summaryHint;
    }
    unsubscribeTabModel(tabModel) {
        super.unsubscribeTabModel(tabModel);
        tabModel && tabModel.summaryHint && tabModel.summaryHint.dispose();
    }
    grabData(tab) {
        const oldModel = this.tabModel(), newModel = tab.tabModel();
        if (oldModel == newModel) {
            return;
        }
        if (oldModel.dataItemLink !== newModel.dataItemLink) {
            this.tabModel(tab.tabModel());
            this.disposeTabModel(oldModel);
        }
        else {
            this.unsubscribeTabModel(oldModel);
            oldModel.additionalProperties(newModel.additionalProperties());
            oldModel.dataMemberPath(newModel.dataMemberPath());
            oldModel.choosenField(newModel.choosenField());
            oldModel.dataItemLink = newModel.dataItemLink;
            oldModel.dataSourceBrowser = newModel.dataSourceBrowser;
            oldModel.summary = newModel.summary;
            oldModel.summaryHint = newModel.summaryHint;
        }
    }
}
exports.BindingAccordionTab = BindingAccordionTab;
