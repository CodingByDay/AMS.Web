﻿/**
* DevExpress Dashboard (_pivot-item-format-rule-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPivotItemFormatRulePropertiesComposer = void 0;
const ko = require("knockout");
const _default_1 = require("../../../../data/localization/_default");
const model_1 = require("../../../../model");
const _cells_item_format_rule_1 = require("../../../../model/format-rules/metadata/_cells-item-format-rule");
const _pivot_item_format_rule_1 = require("../../../../model/format-rules/metadata/_pivot-item-format-rule");
const _pivot_item_format_rule_level_1 = require("../../../../model/format-rules/metadata/_pivot-item-format-rule-level");
const _form_adapter_1 = require("../../../form-adapter/_form-adapter");
const _form_adapter_editors_1 = require("../../../form-adapter/_form-adapter-editors");
const _section_descriptors_1 = require("../../../items/_section-descriptors");
const _display_name_provider_1 = require("../../../_display-name-provider");
const _shared_format_rule_properties_composer_1 = require("./_shared-format-rule-properties-composer");
function createPivotItemFormatRulePropertiesComposer() {
    return new _shared_format_rule_properties_composer_1.FormatRulePropertiesComposer({
        createDataTypeObservable: _shared_format_rule_properties_composer_1.createDataTypeObservable,
        getCommonFormatRuleProperties: (formatRule, dashboardItem, dataSourceBrowser) => {
            let info = _shared_format_rule_properties_composer_1.getCommonCellsFormatRuleProperties(formatRule, grabDataItems(dashboardItem, dataSourceBrowser), grapApplyToItems(dashboardItem, dataSourceBrowser));
            if (!info.disabledFilterRules)
                info.disabledFilterRules = {};
            info.disabledFilterRules[_cells_item_format_rule_1.dataItemApplyTo.propertyName] = (m) => {
                let pivot = dashboardItem;
                return !(pivot.values().filter(v => v.uniqueName() === m.dataItemName()).length
                    || pivot.hiddenMeasures().filter(v => v.uniqueName() === m.dataItemName()).length);
            };
            return info;
        },
        getConditionFormatRuleProperties: () => ({ properties: [] }),
        getMiscFormatRuleProperties: getMiscFormatRuleProperties
    });
}
exports.createPivotItemFormatRulePropertiesComposer = createPivotItemFormatRulePropertiesComposer;
function getMiscFormatRuleProperties(formatRule, pivot, dataSourceBrowser) {
    let visibilityRules = {};
    let properties = [];
    let intersectionLevelModeValuesObservable = ko.observable(_form_adapter_1.transformValuesDictionary(_pivot_item_format_rule_1.intersectionLevelModeValues));
    ko.computed(() => {
        if ((formatRule.condition() instanceof model_1.FormatConditionRangeBase && formatRule.condition().valueType() !== 'Number')
            || formatRule.condition() instanceof model_1.FormatConditionTopBottom
            || formatRule.condition() instanceof model_1.FormatConditionAverage) {
            intersectionLevelModeValuesObservable(_form_adapter_1.transformValuesDictionary(_pivot_item_format_rule_1.restrictedIntersectionLevelModeValues));
        }
        else {
            intersectionLevelModeValuesObservable(_form_adapter_1.transformValuesDictionary(_pivot_item_format_rule_1.intersectionLevelModeValues));
        }
    });
    properties.push(Object.assign(Object.assign({}, _pivot_item_format_rule_1.intersectionLevelMode), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: intersectionLevelModeValuesObservable }) }));
    properties.push({
        container: _pivot_item_format_rule_1.pivotLevel,
        properties: [
            Object.assign({ valuesArray: [{ value: null, displayValue: '[Grand Total]' }].concat(pivot.columns().map(m => ({ value: m.uniqueName(), displayValue: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, pivot, m) }))) }, _pivot_item_format_rule_level_1.pivotLevelColumn),
            Object.assign({ valuesArray: [{ value: null, displayValue: '[Grand Total]' }].concat(pivot.rows().map(m => ({ value: m.uniqueName(), displayValue: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, pivot, m) }))) }, _pivot_item_format_rule_level_1.pivotLevelRow)
        ]
    });
    properties.push(_pivot_item_format_rule_1.applyToColumn);
    properties.push(_cells_item_format_rule_1.applyToRow);
    let isMeasure = !!pivot.values().filter(v => v.uniqueName() === formatRule.dataItemApplyToName()).length;
    visibilityRules[_cells_item_format_rule_1.applyToRow.propertyName] = m => !formatRule.condition()._isApplyToRowColumnRestricted && isMeasure;
    visibilityRules[_pivot_item_format_rule_1.applyToColumn.propertyName] = m => !formatRule.condition()._isApplyToRowColumnRestricted && isMeasure;
    visibilityRules[_pivot_item_format_rule_level_1.pivotLevelColumn.propertyName] =
        [_pivot_item_format_rule_1.intersectionLevelMode.propertyName, '=', 'SpecificLevel'];
    visibilityRules[_pivot_item_format_rule_level_1.pivotLevelRow.propertyName] =
        [_pivot_item_format_rule_1.intersectionLevelMode.propertyName, '=', 'SpecificLevel'];
    return {
        properties: properties,
        visibilityFilterRules: visibilityRules
    };
}
function grabDataItems(dashboardItem, dataSourceBrowser) {
    return () => grapApplyToItems(dashboardItem, dataSourceBrowser)()
        .concat(dashboardItem
        .hiddenMeasures()
        .map(m => ({
        uniqueName: m.uniqueName(),
        displayName: _default_1.getLocalizationById(_section_descriptors_1.SectionDescriptors.HiddenMeasures.title) + ' - ' + _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dashboardItem, m)
    })));
}
function grapApplyToItems(pivot, dataSourceBrowser) {
    return () => pivot.values().map(m => ({
        uniqueName: m.uniqueName(),
        displayName: _default_1.getLocalizationById(_section_descriptors_1.SectionDescriptors.Values.title) + ' - ' + _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, pivot, m)
    })).concat(pivot.columns().map(d => ({
        uniqueName: d.uniqueName(),
        displayName: _default_1.getLocalizationById(_section_descriptors_1.SectionDescriptors.Columns.title) + ' - ' + _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, pivot, d)
    }))).concat(pivot.rows().map(d => ({
        uniqueName: d.uniqueName(),
        displayName: _default_1.getLocalizationById(_section_descriptors_1.SectionDescriptors.Rows.title) + ' - ' + _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, pivot, d)
    })));
}
