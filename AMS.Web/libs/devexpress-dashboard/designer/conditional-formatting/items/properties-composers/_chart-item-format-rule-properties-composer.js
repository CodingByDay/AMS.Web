﻿/**
* DevExpress Dashboard (_chart-item-format-rule-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChartFormatRuleLegendSettingsTab = exports.chartFormatRuleConditionFilters = exports.createChartItemFormatRulePropertiesComposer = void 0;
const ko = require("knockout");
const model_1 = require("../../../../model");
const format_condition_range_base_1 = require("../../../../model/format-rules/conditions/range/format-condition-range-base");
const _chart_item_format_rule_1 = require("../../../../model/format-rules/metadata/_chart-item-format-rule");
const _chart_item_format_rule_base_1 = require("../../../../model/format-rules/metadata/_chart-item-format-rule-base");
const _chart_utils_1 = require("../../../../model/internal/_chart-utils");
const chart_series_1 = require("../../../../model/items/chart/chart-series");
const _form_adapter_editors_1 = require("../../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../../_display-name-provider");
const _shared_format_rule_properties_composer_1 = require("./_shared-format-rule-properties-composer");
function createChartItemFormatRulePropertiesComposer() {
    const opts = {
        conditionTypeFilter: exports.chartFormatRuleConditionFilters,
        createDataTypeObservable: _shared_format_rule_properties_composer_1.createDataTypeObservable,
        getCommonFormatRuleProperties: (model, dashboardItem, dataSourceBrowser, ruleAdded) => getCommonChartFormatRuleProperties(model, getDataItems(dashboardItem, dataSourceBrowser), _chart_utils_1.getChartApplyToDataItems(dashboardItem, dataSourceBrowser)),
        getConditionFormatRuleProperties: (model, dashboardItem, dataSourceBrowser) => ({
            properties: [_chart_item_format_rule_1.applyToChartElement],
            visibilityFilterRules: {
                [_chart_item_format_rule_1.applyToChartElement.propertyName]: _ => canChangeApplyToElement(dashboardItem, model)
            }
        }),
        getMiscFormatRuleProperties: () => ({ properties: [] }),
        getAdditionalTabs: (formatRule) => getChartFormatRuleLegendSettingsTab(formatRule),
    };
    return new _shared_format_rule_properties_composer_1.FormatRulePropertiesComposer(opts);
}
exports.createChartItemFormatRulePropertiesComposer = createChartItemFormatRulePropertiesComposer;
function getCommonChartFormatRuleProperties(formatRule, getDataItems, getApplyToDataItems) {
    const dataItems = ko.pureComputed(() => getDataItems().map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) })));
    const applyToDataItems = ko.pureComputed(() => getApplyToDataItems().map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) })));
    if (!formatRule.dataItemName() && dataItems().length) {
        formatRule.dataItemName(ko.unwrap(dataItems()[0].value));
    }
    const applyToDataItemsNames = applyToDataItems().map(di => ko.unwrap(di.value));
    if (!formatRule.dataItemApplyToName() && applyToDataItemsNames.length) {
        formatRule.dataItemApplyToName(applyToDataItemsNames[0]);
    }
    const commonProperties = [];
    commonProperties.push(Object.assign(Object.assign({}, _chart_item_format_rule_base_1.dataItemName), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: dataItems }) }));
    commonProperties.push(Object.assign(Object.assign({}, _chart_item_format_rule_1.dataItemApplyToName), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: applyToDataItems }) }));
    return {
        properties: commonProperties
    };
}
function getDataItems(dashboardItem, dataSourceBrowser) {
    return () => []
        .concat(..._chart_utils_1.getChartCFSeries(dashboardItem).map(s => s._measures), dashboardItem.arguments(), dashboardItem.seriesDimensions(), dashboardItem.hiddenMeasures())
        .map(dataItem => ({
        uniqueName: dataItem.uniqueName(),
        displayName: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dashboardItem, dataItem)
    }));
}
function canChangeApplyToElement(chartItem, formatRule) {
    const unsupportedSimpleSeriesTypes = ['Bar', 'StackedBar', 'FullStackedBar', 'Point'];
    const unsupportedRangeSeriesTypes = ['SideBySideRangeBar'];
    const selectedSeries = chartItem
        .panes()
        .reduce((seriesCollection, pane) => [...seriesCollection, ...pane.series()], [])
        .filter(series => series._measures.some(measure => measure.uniqueName() === formatRule.dataItemApplyToName()))[0];
    return (selectedSeries instanceof chart_series_1.SimpleSeries && unsupportedSimpleSeriesTypes.indexOf(selectedSeries.seriesType()) === -1)
        || (selectedSeries instanceof chart_series_1.RangeSeries && unsupportedRangeSeriesTypes.indexOf(selectedSeries.seriesType()) === -1);
}
exports.chartFormatRuleConditionFilters = {
    conditionTypeFilter: (name, subType) => {
        const disabledTypes = [{
                name: 'conditionBar'
            }, {
                name: 'conditionColorRangeBar'
            }, {
                name: 'conditionGradientRangeBar'
            }, {
                name: 'conditionRangeSet',
                subType: 'icons'
            }];
        return disabledTypes.filter(item => item.name === name && (!item.subType || item.subType === subType)).length === 0;
    },
    rangeGradientPredefinedTypeFilter: (type) => {
        var validTypes = [
            model_1.FormatConditionRangeGradientPredefinedType.YellowGreen,
            model_1.FormatConditionRangeGradientPredefinedType.GreenYellow,
            model_1.FormatConditionRangeGradientPredefinedType.YellowRed,
            model_1.FormatConditionRangeGradientPredefinedType.RedYellow,
            model_1.FormatConditionRangeGradientPredefinedType.BlueRed,
            model_1.FormatConditionRangeGradientPredefinedType.RedBlue,
            model_1.FormatConditionRangeGradientPredefinedType.YellowBlue,
            model_1.FormatConditionRangeGradientPredefinedType.BlueYellow,
            model_1.FormatConditionRangeGradientPredefinedType.GreenBlue,
            model_1.FormatConditionRangeGradientPredefinedType.BlueGreen,
            model_1.FormatConditionRangeGradientPredefinedType.GreenYellowRed,
            model_1.FormatConditionRangeGradientPredefinedType.RedYellowGreen,
            model_1.FormatConditionRangeGradientPredefinedType.BlueYellowRed,
            model_1.FormatConditionRangeGradientPredefinedType.RedYellowBlue,
            model_1.FormatConditionRangeGradientPredefinedType.GreenYellowBlue,
            model_1.FormatConditionRangeGradientPredefinedType.BlueYellowGreen
        ];
        return validTypes.indexOf(type) !== -1;
    },
    rangeSetPredefinedTypeFilter: (type) => {
        var validTypes = [
            model_1.FormatConditionRangeSetPredefinedType.ColorsRedGreen,
            model_1.FormatConditionRangeSetPredefinedType.ColorsRedGreenBlue,
            model_1.FormatConditionRangeSetPredefinedType.ColorsRedYellowGreenBlue,
            model_1.FormatConditionRangeSetPredefinedType.ColorsRedOrangeYellowGreenBlue
        ];
        return validTypes.indexOf(type) !== -1;
    }
};
function getChartFormatRuleLegendSettingsTab(formatRule) {
    const tab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.FormatRuleChartLegend, 'DashboardWebStringId.AccordionTab.ChartLegend');
    const wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
        model: formatRule,
        properties: [_chart_item_format_rule_base_1.displayName, _chart_item_format_rule_base_1.showInLegend],
        disabledFilterRules: {
            [_chart_item_format_rule_base_1.showInLegend.propertyName]: _ => !(formatRule.displayName() || formatRule.condition() instanceof format_condition_range_base_1.FormatConditionRangeBase)
        },
        visibilityFilterRules: {
            [_chart_item_format_rule_base_1.displayName.propertyName]: _ => !(formatRule.condition() instanceof format_condition_range_base_1.FormatConditionRangeBase)
        }
    });
    tab.tabModel(wrapper);
    return [tab];
}
exports.getChartFormatRuleLegendSettingsTab = getChartFormatRuleLegendSettingsTab;
