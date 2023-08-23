﻿/**
* DevExpress Dashboard (_scatter-chart-item-format-rule-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createScatterChartItemFormatRulePropertiesComposer = void 0;
const ko = require("knockout");
const _chart_item_format_rule_base_1 = require("../../../../model/format-rules/metadata/_chart-item-format-rule-base");
const _form_adapter_editors_1 = require("../../../form-adapter/_form-adapter-editors");
const _display_name_provider_1 = require("../../../_display-name-provider");
const _chart_item_format_rule_properties_composer_1 = require("./_chart-item-format-rule-properties-composer");
const _shared_format_rule_properties_composer_1 = require("./_shared-format-rule-properties-composer");
function createScatterChartItemFormatRulePropertiesComposer() {
    const opts = {
        conditionTypeFilter: _chart_item_format_rule_properties_composer_1.chartFormatRuleConditionFilters,
        createDataTypeObservable: _shared_format_rule_properties_composer_1.createDataTypeObservable,
        getCommonFormatRuleProperties: (formatRule, dashboardItem, dataSourceBrowser) => getCommonScatterChartFormatRuleProperties(formatRule, getDataItems(dashboardItem, dataSourceBrowser)),
        getConditionFormatRuleProperties: (formatRule, dashboardItem, dataSourceBrowser) => ({ properties: [] }),
        getMiscFormatRuleProperties: () => ({ properties: [] }),
        getAdditionalTabs: (formatRule) => _chart_item_format_rule_properties_composer_1.getChartFormatRuleLegendSettingsTab(formatRule),
    };
    return new _shared_format_rule_properties_composer_1.FormatRulePropertiesComposer(opts);
}
exports.createScatterChartItemFormatRulePropertiesComposer = createScatterChartItemFormatRulePropertiesComposer;
function getCommonScatterChartFormatRuleProperties(formatRule, getDataItems) {
    const dataItems = ko.pureComputed(() => getDataItems().map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) })));
    if (!formatRule.dataItemName() && dataItems().length) {
        formatRule.dataItemName(ko.unwrap(dataItems()[0].value));
    }
    return {
        properties: [Object.assign(Object.assign({}, _chart_item_format_rule_base_1.dataItemName), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: dataItems }) })]
    };
}
function getDataItems(dashboardItem, dataSourceBrowser) {
    return () => [
        dashboardItem.axisXMeasure(),
        dashboardItem.axisYMeasure(),
        dashboardItem.weight(),
        ...dashboardItem.arguments(),
        ...dashboardItem.hiddenMeasures(),
    ]
        .filter(dataItem => !!dataItem)
        .map(dataItem => ({
        uniqueName: dataItem.uniqueName(),
        displayName: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dashboardItem, dataItem)
    }));
}
