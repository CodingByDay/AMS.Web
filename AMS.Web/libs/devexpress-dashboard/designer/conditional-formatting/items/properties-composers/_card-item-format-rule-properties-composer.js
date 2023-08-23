﻿/**
* DevExpress Dashboard (_card-item-format-rule-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardItemConditionTypeFilters = exports.createCardItemDeltaFormatRulePropertiesComposer = exports.isDeltaFormatRuleAvaliable = exports.createCardItemFormatRulePropertiesComposer = exports.isDataItemFormatRuleAvaliable = void 0;
const ko = require("knockout");
const _default_1 = require("../../../../data/localization/_default");
const model_1 = require("../../../../model");
const card_item_delta_format_rule_1 = require("../../../../model/format-rules/card-item-delta-format-rule");
const card_item_format_rule_1 = require("../../../../model/format-rules/card-item-format-rule");
const _card_format_rule_row_element_1 = require("../../../../model/format-rules/metadata/_card-format-rule-row-element");
const _card_item_delta_format_rule_1 = require("../../../../model/format-rules/metadata/_card-item-delta-format-rule");
const _card_item_format_rule_1 = require("../../../../model/format-rules/metadata/_card-item-format-rule");
const _card_item_format_rule_base_1 = require("../../../../model/format-rules/metadata/_card-item-format-rule-base");
const _card_layout_template_element_1 = require("../../../../model/items/card/metadata/_card-layout-template-element");
const _delta_options_1 = require("../../../../model/items/options/metadata/_delta-options");
const _base_metadata_1 = require("../../../../model/metadata/_base-metadata");
const _form_adapter_editors_1 = require("../../../form-adapter/_form-adapter-editors");
const _display_name_provider_1 = require("../../../_display-name-provider");
const _shared_format_rule_properties_composer_1 = require("./_shared-format-rule-properties-composer");
function getCardItemFormatRuleDataItems(dashboardItem) {
    return dashboardItem.seriesDimensions().concat(dashboardItem.hiddenMeasures());
}
function isDataItemFormatRuleAvaliable(dashboardItem) {
    return getCardItemFormatRuleDataItems(dashboardItem).length > 0;
}
exports.isDataItemFormatRuleAvaliable = isDataItemFormatRuleAvaliable;
function createCardItemFormatRulePropertiesComposer(selectedRuleContainer) {
    return new _shared_format_rule_properties_composer_1.FormatRulePropertiesComposer({
        createDataTypeObservable: _shared_format_rule_properties_composer_1.createDataTypeObservable,
        getCommonFormatRuleProperties: (formatRule, dashboardItem, dataSourceBrowser) => {
            let propertiesInfo = {
                properties: [],
                disabledFilterRules: {},
                dynamicEditorRules: {},
                visibilityFilterRules: {}
            };
            var dataItems = getCardItemFormatRuleDataItems(dashboardItem);
            let dataItemsDisplayText = ko.pureComputed(() => dataItems.map(dataItem => {
                return {
                    value: dataItem.uniqueName(),
                    displayValueId: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dashboardItem, dataItem)
                };
            }));
            if (!formatRule.dataItemName() && dataItems.length) {
                formatRule.dataItemName(dataItems[0].uniqueName());
            }
            propertiesInfo.properties.push(Object.assign(Object.assign({}, _card_item_format_rule_1.cardItemformatRuleDataItem), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: dataItemsDisplayText }) }));
            return getCommonCardFormatRuleProperties(formatRule, dashboardItem, propertiesInfo, selectedRuleContainer);
        },
        getMiscFormatRuleProperties: () => ({ properties: [] }),
        conditionTypeFilter: exports.cardItemConditionTypeFilters,
        getConditionFormatRuleProperties: getConditionFormatRuleProperties,
    });
}
exports.createCardItemFormatRulePropertiesComposer = createCardItemFormatRulePropertiesComposer;
function cardItemDeltaFormatRuleCards(dashboardItem) {
    return dashboardItem.cards();
}
function isDeltaFormatRuleAvaliable(dashboardItem) {
    return cardItemDeltaFormatRuleCards(dashboardItem).length > 0;
}
exports.isDeltaFormatRuleAvaliable = isDeltaFormatRuleAvaliable;
function createCardItemDeltaFormatRulePropertiesComposer(selectedRuleContainer) {
    return new _shared_format_rule_properties_composer_1.FormatRulePropertiesComposer({
        createDataTypeObservable: _shared_format_rule_properties_composer_1.createDeltaDataTypeObservable,
        getCommonFormatRuleProperties: (formatRule, dashboardItem, dataSourceBrowser, requestRecalculation) => {
            let propertiesInfo = {
                properties: [],
                disabledFilterRules: {},
                dynamicEditorRules: {},
                visibilityFilterRules: {}
            };
            var card = cardItemDeltaFormatRuleCards(dashboardItem);
            let cardsDisplayText = ko.pureComputed(() => card.map(card => {
                return {
                    value: card._getDataId(),
                    displayValueId: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, card)
                };
            }));
            if (!formatRule.cardId() && cardsDisplayText().length) {
                formatRule.cardId(cardsDisplayText()[0].value);
            }
            propertiesInfo.disabledFilterRules[_card_item_delta_format_rule_1.cardId.propertyName] = _ => !!formatRule.condition();
            propertiesInfo.disabledFilterRules[_card_item_delta_format_rule_1.deltaValueType.propertyName] = _ => !!formatRule.condition();
            propertiesInfo.properties.push(Object.assign(Object.assign({}, _card_item_delta_format_rule_1.cardId), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: cardsDisplayText }) }));
            propertiesInfo.properties.push(Object.assign(Object.assign({}, _card_item_delta_format_rule_1.deltaValueType), { simpleFormAdapterItem: 'selectBoxEditor', values: _delta_options_1.deltaValueTypeMap }));
            propertiesInfo.properties.push(Object.assign(Object.assign({}, _card_item_delta_format_rule_1.deltaValueType), { replacementPropertyName: 'fakeDeltaValueTypeActual', sourceObject: ko.observable('ActualValue'), simpleFormAdapterItem: 'selectBoxEditor', values: { 'ActualValue': 'DashboardStringId.DeltaValueTypeActualValueCaption' } }));
            propertiesInfo.properties.push(Object.assign(Object.assign({}, _card_item_delta_format_rule_1.deltaValueType), { sourceObject: ko.observable('TargetValue'), replacementPropertyName: 'fakeDeltaValueTypeTarget', simpleFormAdapterItem: 'selectBoxEditor', values: { 'TargetValue': 'DashboardStringId.DeltaValueTypeTargetValueCaption' } }));
            const getActualCard = () => dashboardItem.cards().filter(card => card._getDataId() === formatRule.cardId())[0];
            const hasActualDataItem = () => !!getActualCard().actualValue();
            const hasTargetDataItem = () => !!getActualCard().targetValue();
            requestRecalculation.add(_ => {
                if (dashboardItem.formatRules.indexOf(formatRule) === -1) {
                    if (hasActualDataItem() && !hasTargetDataItem())
                        formatRule.deltaValueType('ActualValue');
                    else if (!hasActualDataItem() && hasTargetDataItem()) {
                        formatRule.deltaValueType('TargetValue');
                    }
                }
            });
            propertiesInfo.visibilityFilterRules[_card_item_delta_format_rule_1.deltaValueType.propertyName] = _ => hasActualDataItem() && hasTargetDataItem();
            propertiesInfo.visibilityFilterRules['fakeDeltaValueTypeActual'] = _ => hasActualDataItem() && !hasTargetDataItem();
            propertiesInfo.visibilityFilterRules['fakeDeltaValueTypeTarget'] = _ => !hasActualDataItem() && hasTargetDataItem();
            propertiesInfo.disabledFilterRules['fakeDeltaValueTypeActual'] = _ => true;
            propertiesInfo.disabledFilterRules['fakeDeltaValueTypeTarget'] = _ => true;
            return getCommonCardFormatRuleProperties(formatRule, dashboardItem, propertiesInfo, selectedRuleContainer);
        },
        getConditionFormatRuleProperties: getConditionFormatRuleProperties,
        getMiscFormatRuleProperties: () => ({ properties: [] }),
        conditionTypeFilter: exports.cardItemConditionTypeFilters
    });
}
exports.createCardItemDeltaFormatRulePropertiesComposer = createCardItemDeltaFormatRulePropertiesComposer;
function getConditionFormatRuleProperties(formatRule, dashboardItem, dataSourceBrowser) {
    let layoutElementTypeValues = Object.keys(_card_layout_template_element_1.cardFormatRuleLayoutElementValuesMap).map(key => {
        return { value: key, displayValue: _default_1.getLocalizationById(_card_layout_template_element_1.cardFormatRuleLayoutElementValuesMap[key]) };
    });
    layoutElementTypeValues.push({ value: 'Dimension', displayValue: _default_1.getLocalizationById('DashboardWebStringId.FormatRuleApplyToDimensionElement') });
    layoutElementTypeValues.push({ value: 'Text', displayValue: _default_1.getLocalizationById('DashboardWebStringId.FormatRuleApplyToTextElement') });
    let textEditorValues = getAllApplyToTextElements(formatRule, dashboardItem);
    let dimensionEditorValues = dashboardItem.seriesDimensions().map(dimension => {
        return { value: dimension.uniqueName(), displayValue: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dashboardItem, dimension) };
    });
    let visibilityFilterRules = {};
    visibilityFilterRules[_card_format_rule_row_element_1.dimensionId.propertyName] = (model) => model.elementTypeApplyTo() === 'Dimension';
    visibilityFilterRules[_card_format_rule_row_element_1.textId.propertyName] = (model) => model.elementTypeApplyTo() === 'Text';
    let properties = [{
            container: _card_item_format_rule_base_1.cardLayoutElement,
            properties: [
                Object.assign(Object.assign({}, _card_format_rule_row_element_1.elementTypeApplyTo), { valuesArray: layoutElementTypeValues }),
                Object.assign(Object.assign({}, _card_format_rule_row_element_1.dimensionId), { valuesArray: dimensionEditorValues }),
                Object.assign(Object.assign({}, _card_format_rule_row_element_1.textId), { valuesArray: textEditorValues })
            ]
        }];
    return {
        properties: properties,
        disabledFilterRules: {},
        dynamicEditorRules: {},
        visibilityFilterRules: visibilityFilterRules
    };
}
function getAllApplyToTextElements(formatRule, dashboardItem) {
    let isExpressionRule = formatRule.condition() instanceof model_1.FormatConditionExpression;
    let isHiddenMeasureRule = formatRule instanceof card_item_format_rule_1.CardItemFormatRule && dashboardItem.hiddenMeasures().filter(measure => measure.uniqueName() === formatRule.dataItemName()).length > 0;
    let affectedCards = isExpressionRule || isHiddenMeasureRule ? dashboardItem.cards() : [(dashboardItem.cards()[dashboardItem._selectedElementIndex() || 0])];
    return affectedCards.map(card => getCardApplyToTextElements(card)).reduce((prev, curr) => [...prev, ...curr]);
}
function getCardApplyToTextElements(card) {
    let textElements = getCardRows(card).map(row => row.elements().filter(element => element instanceof model_1.CardRowTextElement));
    if (textElements.length > 0) {
        return textElements.reduce((prev, current) => [...prev, ...current])
            .map(textElement => {
            return { value: textElement.text(), displayValue: textElement.text() };
        });
    }
    else
        return [];
}
function getCardRows(card) {
    let layoutTemplate = card.layoutTemplate();
    let layout = layoutTemplate ? layoutTemplate.layout : null;
    return layout ? layout.rows().filter(element => element instanceof model_1.CardRow) : [];
}
exports.cardItemConditionTypeFilters = {
    conditionTypeFilter: (conditionTypePropertyName) => {
        return ['conditionBar', 'conditionColorRangeBar', 'conditionGradientRangeBar'].indexOf(conditionTypePropertyName) === -1;
    }
};
function getCommonCardFormatRuleProperties(formatRule, dashboardItem, calculatedByProperties, selectedRuleContainer) {
    let propertiesInfo = {
        properties: [],
        disabledFilterRules: {},
        dynamicEditorRules: {},
        visibilityFilterRules: {}
    };
    let selectedRuleType = ko.observable(formatRule.itemType());
    selectedRuleType.subscribe(newSelectedContainer => {
        if (newSelectedContainer === 'CardItemFormatRule') {
            selectedRuleContainer(new card_item_format_rule_1.CardItemFormatRule());
        }
        else if (newSelectedContainer === 'CardItemDeltaFormatRule') {
            selectedRuleContainer(new card_item_delta_format_rule_1.CardItemDeltaFormatRule());
        }
    });
    propertiesInfo.properties.push(Object.assign(Object.assign({}, _base_metadata_1.itemType), { sourceObject: selectedRuleType, replacementPropertyName: 'selectedContainer', displayName: 'DashboardWebStringId.ConditionalFormatting.CalculatedBy', formAdapterItem: _form_adapter_editors_1.buttonGroupEditor([
            {
                displayValueId: 'DashboardWebStringId.ConditionalFormatting.CardRuleTypeCard',
                value: 'CardItemDeltaFormatRule'
            },
            {
                displayValueId: 'DashboardWebStringId.ConditionalFormatting.CardRuleTypeDataItem',
                value: 'CardItemFormatRule'
            }
        ]) }));
    propertiesInfo.disabledFilterRules['selectedContainer'] = m => !!formatRule.condition() || !isDeltaFormatRuleAvaliable(dashboardItem) || !isDataItemFormatRuleAvaliable(dashboardItem);
    propertiesInfo.properties.push(...calculatedByProperties.properties);
    propertiesInfo.disabledFilterRules = Object.assign(Object.assign({}, propertiesInfo.disabledFilterRules), calculatedByProperties.disabledFilterRules);
    propertiesInfo.dynamicEditorRules = Object.assign(Object.assign({}, propertiesInfo.dynamicEditorRules), calculatedByProperties.dynamicEditorRules);
    propertiesInfo.visibilityFilterRules = Object.assign(Object.assign({}, propertiesInfo.visibilityFilterRules), calculatedByProperties.visibilityFilterRules);
    return propertiesInfo;
}
