﻿/**
* DevExpress Dashboard (_grid-item-format-rule-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGridItemFormatRulePropertiesComposer = void 0;
const _default_1 = require("../../../../data/localization/_default");
const _cells_item_format_rule_1 = require("../../../../model/format-rules/metadata/_cells-item-format-rule");
const grid_columns_1 = require("../../../../model/items/grid/grid-columns");
const _section_descriptors_1 = require("../../../items/_section-descriptors");
const _display_name_provider_1 = require("../../../_display-name-provider");
const _shared_format_rule_properties_composer_1 = require("./_shared-format-rule-properties-composer");
function createGridItemFormatRulePropertiesComposer() {
    return new _shared_format_rule_properties_composer_1.FormatRulePropertiesComposer({
        createDataTypeObservable: _shared_format_rule_properties_composer_1.createDataTypeObservable,
        getCommonFormatRuleProperties: (formatRule, dashboardItem, dataSourceBrowser) => {
            return _shared_format_rule_properties_composer_1.getCommonCellsFormatRuleProperties(formatRule, grabDataItems(dashboardItem, dataSourceBrowser), grapApplyToItems(dashboardItem, dataSourceBrowser));
        },
        getConditionFormatRuleProperties: () => ({ properties: [] }),
        getMiscFormatRuleProperties: getMiscFormatRuleProperties
    });
}
exports.createGridItemFormatRulePropertiesComposer = createGridItemFormatRulePropertiesComposer;
function getMiscFormatRuleProperties(formatRule, dashboardItem, dataSourceBrowser) {
    let visibilityRules = {};
    visibilityRules[_cells_item_format_rule_1.applyToRow.propertyName] = m => !formatRule.condition()._isApplyToRowColumnRestricted;
    return {
        properties: [_cells_item_format_rule_1.applyToRow],
        visibilityFilterRules: visibilityRules
    };
}
function grabDataItems(dashboardItem, dataSourceBrowser) {
    return () => dashboardItem
        .columns()
        .filter(c => !(c instanceof grid_columns_1.GridDeltaColumn) && !(c instanceof grid_columns_1.GridSparklineColumn))
        .map(c => ({
        uniqueName: c.actualDataItem.uniqueName(),
        displayName: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, c)
    }))
        .concat(dashboardItem
        .hiddenMeasures()
        .map(m => ({
        uniqueName: m.uniqueName(),
        displayName: _default_1.getLocalizationById(_section_descriptors_1.SectionDescriptors.HiddenMeasures.title) + ' - ' + _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dashboardItem, m)
    })));
}
function grapApplyToItems(dashboardItem, dataSourceBrowser) {
    return () => dashboardItem
        .columns()
        .filter(c => !(c instanceof grid_columns_1.GridDeltaColumn))
        .map(c => {
        return {
            uniqueName: c.actualDataItem.uniqueName,
            displayName: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, c)
        };
    });
}
