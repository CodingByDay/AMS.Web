﻿/**
* DevExpress Dashboard (_shared-format-rule-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonCellsFormatRuleProperties = exports.addConditionEditor = exports.createDataTypeObservable = exports.createDeltaDataTypeObservable = exports.FormatRulePropertiesComposer = void 0;
const ko = require("knockout");
const common_1 = require("../../../../common");
const _default_1 = require("../../../../data/localization/_default");
const model_1 = require("../../../../model");
const dimension_1 = require("../../../../model/data-item/dimension");
const measure_1 = require("../../../../model/data-item/measure");
const enums_1 = require("../../../../model/enums");
const format_condition_average_1 = require("../../../../model/format-rules/conditions/format-condition-average");
const format_condition_expression_1 = require("../../../../model/format-rules/conditions/format-condition-expression");
const format_condition_top_bottom_1 = require("../../../../model/format-rules/conditions/format-condition-top-bottom");
const _format_condition_bar_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-bar");
const _format_condition_bar_options_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-bar-options");
const _format_condition_date_occuring_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-date-occuring");
const _format_condition_expression_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-expression");
const _format_condition_min_max_base_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-min-max-base");
const _format_condition_top_bottom_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-top-bottom");
const _format_condition_value_1 = require("../../../../model/format-rules/conditions/metadata/_format-condition-value");
const _format_condition_range_base_1 = require("../../../../model/format-rules/conditions/range/metadata/_format-condition-range-base");
const _format_condition_range_gradient_1 = require("../../../../model/format-rules/conditions/range/metadata/_format-condition-range-gradient");
const _cells_item_format_rule_1 = require("../../../../model/format-rules/metadata/_cells-item-format-rule");
const _dashboard_item_format_rule_1 = require("../../../../model/format-rules/metadata/_dashboard-item-format-rule");
const _format_rules_common_1 = require("../../../../model/format-rules/metadata/_format-rules-common");
const _helper_classes_1 = require("../../../../model/internal/_helper-classes");
const _knockout_utils_1 = require("../../../../model/internal/_knockout-utils");
const _parameters_helper_1 = require("../../../../model/parameters/_parameters-helper");
const _filter_utils_1 = require("../../../filtering/_filter-utils");
const _item_filter_display_name_provider_1 = require("../../../filtering/_item-filter-display-name-provider");
const _item_filter_items_provider_1 = require("../../../filtering/_item-filter-items-provider");
const _form_adapter_editors_1 = require("../../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../../properties-controller/_accordion-tab");
class FormatRulePropertiesComposer {
    constructor(_options) {
        this._options = _options;
    }
    composeTabs(model, args) {
        const commonTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.FormatRuleCommon, 'DashboardWebStringId.AccordionTab.Common');
        const conditionTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.FormatRuleCondition, 'DashboardWebStringId.ConditionalFormatting.Condition');
        const miscTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.FormatRuleMisc, 'DashboardWebStringId.ConditionalFormatting.Miscellaneous');
        let additionalTabs = [];
        this._fillCommonFormatRuleCommonWrapper(commonTab, model, args.dashboardItem, args.dataSourceBrowser, args.requestRecalculation, args.specificTypeChanged);
        if (ko.unwrap(model && model.condition)) {
            this._fillConditionWrapper(conditionTab, model, args.dashboardItem, args.dataSourceBrowser);
            additionalTabs = this._options.getAdditionalTabs && this._options.getAdditionalTabs(model, args.dashboardItem, args.dataSourceBrowser);
            this._fillMiscWrapper(miscTab, model, args.dashboardItem, args.dataSourceBrowser);
        }
        return [commonTab, conditionTab, ...(additionalTabs || []), miscTab].filter(tab => !!tab);
    }
    _fillCommonFormatRuleCommonWrapper(tab, formatRule, dashboardItem, dataSourceBrowser, requestRecalculation, specificTypeChanged) {
        let propertiesInfo = this._options.getCommonFormatRuleProperties(formatRule, dashboardItem, dataSourceBrowser, requestRecalculation);
        let disabledRules = {};
        const dataType = this._options.createDataTypeObservable(formatRule, dashboardItem, dataSourceBrowser);
        disabledRules[_cells_item_format_rule_1.formatRuleDataItem.propertyName] = () => !!ko.unwrap(formatRule.condition);
        disabledRules['typeChooser'] = function () { return !!ko.unwrap(formatRule.condition); };
        let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: formatRule,
            visibilityFilterRules: propertiesInfo.visibilityFilterRules,
            properties: propertiesInfo.properties,
            disabledFilterRules: Object.assign(Object.assign({}, disabledRules), propertiesInfo.disabledFilterRules)
        });
        addConditionEditor(wrapper, dataType, formatRule, dashboardItem, requestRecalculation, specificTypeChanged, this._options.conditionTypeFilter);
        tab.tabModel(wrapper);
    }
    _fillConditionWrapper(tab, model, dashboardItem, dataSourceBrowser) {
        let p = [];
        let visibilityRules = {};
        visibilityRules[_format_condition_range_base_1.rangeValueType.propertyName] = () => model.condition() && !model.condition().dateTimeGroupInterval();
        const isChartItem = dashboardItem instanceof model_1.ChartItem || dashboardItem instanceof model_1.ScatterChartItem;
        const isAppearanceItem = dashboardItem instanceof model_1.GridItem
            || dashboardItem instanceof model_1.PivotItem
            || dashboardItem instanceof model_1.CardItem;
        const enableCustomStyles = isChartItem || isAppearanceItem;
        const restrictToColor = !isAppearanceItem;
        let simpleStylesAppearance = isChartItem ? 'RichColors' : 'Appearance';
        let barStylesAppearance = 'AllColors';
        let gradientStylesAppearance = 'GradientColors';
        let simpleStyleSettingsEditorOptions = {
            allowChangeViewMode: !isChartItem,
            appearanceMode: simpleStylesAppearance,
            isEmptyAllowed: false,
            enableCustomStyles,
            restrictToColor
        };
        let barStyleSettingsEditorOptions = {
            allowChangeViewMode: false,
            appearanceMode: barStylesAppearance,
            isEmptyAllowed: false,
            enableCustomStyles,
            restrictToColor
        };
        switch (model.condition() && model.condition().constructor) {
            case model_1.FormatConditionValue:
                const { simpleFormAdapterItem, editorOptions } = _parameters_helper_1.ParameterHelper.getEditorType(model.condition()[_format_condition_value_1.formatConditionValue1.propertyName].type());
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [{
                            container: _format_condition_value_1.formatConditionValue1,
                            properties: [
                                Object.assign({ simpleFormAdapterItem,
                                    editorOptions, displayName: 'DashboardStringId.ValueCaption', replacementPropertyName: 'value1_value' }, _format_rules_common_1.complexValueValue)
                            ]
                        }, {
                            container: _format_condition_value_1.formatConditionValue2,
                            properties: [Object.assign({ simpleFormAdapterItem,
                                    editorOptions, displayName: 'DashboardStringId.Value2Caption', replacementPropertyName: 'value2_value' }, _format_rules_common_1.complexValueValue)]
                        }, Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { formAdapterItem: _form_adapter_editors_1.styleSettingsEditor(simpleStyleSettingsEditorOptions) }), _format_condition_value_1.conditionInCondition,]
                });
                visibilityRules['value2_value'] =
                    [_format_condition_value_1.conditionInCondition.propertyName, 'contains', 'Between'];
                visibilityRules[_format_condition_value_1.conditionInCondition.propertyName] = () => false;
                break;
            case format_condition_top_bottom_1.FormatConditionTopBottom:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { formAdapterItem: _form_adapter_editors_1.styleSettingsEditor(simpleStyleSettingsEditorOptions) }),
                        _format_condition_top_bottom_1.rank,
                        _format_condition_top_bottom_1._actualRankType
                    ]
                });
                break;
            case format_condition_average_1.FormatConditionAverage:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { formAdapterItem: _form_adapter_editors_1.styleSettingsEditor(simpleStyleSettingsEditorOptions) }),
                    ]
                });
                break;
            case model_1.FormatConditionDateOccurring:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { formAdapterItem: _form_adapter_editors_1.styleSettingsEditor(simpleStyleSettingsEditorOptions) }),
                        Object.assign(Object.assign({}, _format_condition_date_occuring_1.dateType), { formAdapterItem: _form_adapter_editors_1.flagsEnumTagBoxEditor({
                                values: _format_condition_date_occuring_1.baseDateTypeValues.concat(common_1.LegacySettings.showExtendedDateOccurringList ? _format_condition_date_occuring_1.extendedDateTypeValues : []),
                                enumDeclaration: enums_1.FilterDateType
                            }) })
                    ]
                });
                break;
            case format_condition_expression_1.FormatConditionExpression:
                let expressionCondition = model.condition();
                let ruleExpressionEditorParams = {
                    fieldListProvider: ko.observable(new _item_filter_items_provider_1.ItemFilterItemsProvider(dataSourceBrowser, dataSourceBrowser, dataSourceBrowser.parameters, dashboardItem, (di) => dashboardItem._conditionFormattingExpressionEditorFilter(di))),
                    options: _filter_utils_1.createItemFilterOptions(expressionCondition.expression, expressionCondition, dataSourceBrowser, { text: 'Expression', localizationId: 'DashboardStringId.CommandFormatRuleExpression' }),
                    displayNameProvider: new _item_filter_display_name_provider_1.ItemFilterDisplayNameProvider(dashboardItem, dataSourceBrowser)
                };
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        Object.assign(Object.assign({}, _format_condition_expression_1.formatConditionFilter), { formAdapterItem: _form_adapter_editors_1.filterEditor(ruleExpressionEditorParams) }),
                        Object.assign(Object.assign({}, _format_rules_common_1.styleSettings), { formAdapterItem: _form_adapter_editors_1.styleSettingsEditor(simpleStyleSettingsEditorOptions) }),
                    ]
                });
                break;
            case model_1.FormatConditionBar:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        _format_condition_min_max_base_1.minimumType,
                        _format_condition_min_max_base_1.formatConditionMinimum,
                        _format_condition_min_max_base_1.maximumType,
                        _format_condition_min_max_base_1.formatConditionMaximum,
                        _format_condition_bar_1.barCurrentStyleSettingsType,
                        Object.assign(Object.assign({}, _format_condition_bar_1.barCurrentStyleSettings), { formAdapterItem: _form_adapter_editors_1.styleSettingsEditor(barStyleSettingsEditorOptions) }),
                        {
                            container: _format_rules_common_1.barOptions,
                            properties: [
                                _format_condition_bar_options_1.allowNegativeAxis,
                                _format_condition_bar_options_1.drawAxis,
                                _format_condition_bar_options_1.showBarOnly
                            ]
                        }
                    ]
                });
                visibilityRules[_format_condition_min_max_base_1.formatConditionMinimum.propertyName] = [_format_condition_min_max_base_1.minimumType.propertyName, '<>', 'Automatic'];
                visibilityRules[_format_condition_min_max_base_1.formatConditionMaximum.propertyName] = [_format_condition_min_max_base_1.maximumType.propertyName, '<>', 'Automatic'];
                break;
            case model_1.FormatConditionColorRangeBar:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        _format_condition_range_base_1.rangeValueType,
                        Object.assign(Object.assign({}, _format_condition_range_base_1.rangeSet), { formAdapterItem: _form_adapter_editors_1.ruleRangesEditor({ condition: model.condition(), appearanceMode: barStylesAppearance, enableCustomStyles, restrictToColor: true }) }),
                        {
                            container: _format_rules_common_1.barOptions,
                            properties: [
                                _format_condition_bar_options_1.allowNegativeAxis,
                                _format_condition_bar_options_1.drawAxis,
                                _format_condition_bar_options_1.showBarOnly
                            ]
                        }
                    ]
                });
                break;
            case model_1.FormatConditionGradientRangeBar:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        _format_condition_range_base_1.rangeValueType,
                        _format_condition_range_gradient_1.segmentNumber,
                        Object.assign(Object.assign({}, _format_condition_range_base_1.rangeSet), { formAdapterItem: _form_adapter_editors_1.ruleRangesEditor({ condition: model.condition(), appearanceMode: gradientStylesAppearance, enableCustomStyles, restrictToColor: true }) }),
                        {
                            container: _format_rules_common_1.barOptions,
                            properties: [
                                _format_condition_bar_options_1.allowNegativeAxis,
                                _format_condition_bar_options_1.drawAxis,
                                _format_condition_bar_options_1.showBarOnly
                            ]
                        }
                    ]
                });
                break;
            case model_1.FormatConditionRangeGradient:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        _format_condition_range_base_1.rangeValueType,
                        _format_condition_range_gradient_1.segmentNumber,
                        Object.assign(Object.assign({}, _format_condition_range_base_1.rangeSet), { formAdapterItem: _form_adapter_editors_1.ruleRangesEditor({ condition: model.condition(), appearanceMode: gradientStylesAppearance, enableCustomStyles, restrictToColor }) }),
                    ]
                });
                break;
            case model_1.FormatConditionRangeSet:
                p.push({
                    container: _dashboard_item_format_rule_1.condition,
                    properties: [
                        _format_condition_range_base_1.rangeValueType,
                        Object.assign(Object.assign({}, _format_condition_range_base_1.rangeSet), { formAdapterItem: _form_adapter_editors_1.ruleRangesEditor({ condition: model.condition(), appearanceMode: simpleStylesAppearance, enableCustomStyles, restrictToColor }) }),
                    ]
                });
                break;
            case undefined:
                break;
            default:
                throw new Error('Unsupported formatting rule condition');
        }
        var additionProperties = this._options.getConditionFormatRuleProperties(model, dashboardItem, dataSourceBrowser);
        let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: p.concat(additionProperties.properties),
            visibilityFilterRules: Object.assign(Object.assign({}, visibilityRules), additionProperties.visibilityFilterRules),
            disabledFilterRules: additionProperties.disabledFilterRules,
            dynamicEditorRules: additionProperties.dynamicEditorRules
        });
        tab.tabModel(wrapper);
    }
    _fillMiscWrapper(tab, model, dashboardItem, dataSourceBrowser) {
        let miscProperties = this._options.getMiscFormatRuleProperties(model, dashboardItem, dataSourceBrowser);
        let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [
                _dashboard_item_format_rule_1.enabled,
                ...miscProperties.properties
            ],
            disabledFilterRules: miscProperties.disabledFilterRules,
            dynamicEditorRules: miscProperties.dynamicEditorRules,
            visibilityFilterRules: miscProperties.visibilityFilterRules
        });
        tab.tabModel(wrapper);
    }
}
exports.FormatRulePropertiesComposer = FormatRulePropertiesComposer;
function createDeltaDataTypeObservable(model, dashboardItem, dataSourceBrowser) {
    const dataType = ko.observable(model.condition() && model.condition().dataType());
    let fillDataTypeForDelta = () => {
        let fillDataTypes = (measure) => {
            dataSourceBrowser.findDataField(dashboardItem.dataSource(), dashboardItem.dataMember(), measure.dataMember()).done(field => {
                let summaryType = measure.summaryType();
                if ((summaryType === 'Count') || (summaryType === 'CountDistinct')) {
                    dataType('Integer');
                    model.condition() && model.condition().dataType(dataType());
                }
                else if (['Sum', 'Average', 'StdDev', 'StdDevp', 'Var', 'VarP'].indexOf(summaryType) !== -1) {
                    dataType('Decimal');
                    model.condition() && model.condition().dataType(dataType());
                }
                else {
                    dataType(field.fieldType());
                    model.condition() && model.condition().dataType(dataType());
                }
            });
        };
        let kpiElement = dashboardItem.cards().filter(card => card._getDataId() === model.cardId())[0];
        let deltaValueType = model.deltaValueType();
        if (deltaValueType === 'ActualValue') {
            fillDataTypes(kpiElement.actualValue());
        }
        else if (deltaValueType === 'TargetValue') {
            fillDataTypes(kpiElement.targetValue());
        }
        else {
            dataType('Decimal');
            model.condition() && model.condition().dataType(dataType());
        }
    };
    fillDataTypeForDelta();
    model.cardId.subscribe(containerId => {
        fillDataTypeForDelta();
    });
    model.deltaValueType.subscribe(deltaValueTypeId => {
        fillDataTypeForDelta();
    });
    return { dataType: dataType, dateTimeGroupInterval: ko.observable() };
}
exports.createDeltaDataTypeObservable = createDeltaDataTypeObservable;
function createDataTypeObservable(formatRule, dashboardItem, dataSourceBrowser) {
    const dataItemCalculateBy = dashboardItem.dataItems().filter(d => formatRule.dataItemName() === d.uniqueName())[0];
    const dateTimeGroupInterval = ko.observable(dataItemCalculateBy instanceof dimension_1.Dimension ? dataItemCalculateBy.dateTimeGroupInterval() : undefined);
    const dataType = ko.observable(formatRule.condition() && formatRule.condition().dataType());
    let fillDataType = uniqueName => dashboardItem
        .dataItems()
        .filter(dataItem => uniqueName === dataItem.uniqueName() && !!dataItem.dataMember())
        .map(dataItem => ({
        dataItem: dataItem,
        fieldPromise: dataSourceBrowser.findDataField(dashboardItem.dataSource(), dashboardItem.dataMember(), dataItem.dataMember())
    }))
        .forEach(d => d.fieldPromise.done(field => {
        let newDataType = field.fieldType();
        if (d.dataItem instanceof dimension_1.Dimension) {
            newDataType = _item_filter_items_provider_1.getRealDimensionType(d.dataItem, field);
            dateTimeGroupInterval(field.fieldType() === 'DateTime' ? d.dataItem.dateTimeGroupInterval() : undefined);
            formatRule.condition() && formatRule.condition().dateTimeGroupInterval(dateTimeGroupInterval());
        }
        if (d.dataItem instanceof measure_1.Measure) {
            let summaryType = d.dataItem.summaryType();
            if ((summaryType === 'Count') || (summaryType === 'CountDistinct')) {
                newDataType = 'Integer';
            }
            else if (['Sum', 'Average', 'StdDev', 'StdDevp', 'let', 'letp'].indexOf(summaryType) !== -1) {
                newDataType = 'Decimal';
            }
        }
        dataType(newDataType);
        formatRule.condition() && formatRule.condition().dataType(dataType());
    }));
    if (!dataType() && formatRule.dataItemName())
        fillDataType(formatRule.dataItemName());
    formatRule.dataItemName.subscribe(fillDataType);
    return { dataType: dataType, dateTimeGroupInterval: dateTimeGroupInterval };
}
exports.createDataTypeObservable = createDataTypeObservable;
function addConditionEditor(wrapper, dataTypeInfo, formatRuleModel, dashboardItem, requestRecalculation, specificTypeChanged, conditionTypeFilter) {
    const originalConditionType = formatRuleModel._classId;
    const conditionType = ko.observable(formatRuleModel._classId).extend({ notify: 'always' });
    const specificType = ko.observable(formatRuleModel.condition() && formatRuleModel.condition().getSpecificType());
    wrapper.addProperty(ko.observable(), {
        propertyName: 'typeChooser',
        displayName: 'DashboardWebStringId.ConditionType',
        formAdapterItem: _form_adapter_editors_1.conditionTypeEditor({ dataType: dataTypeInfo.dataType, conditionType, specificType, filters: conditionTypeFilter })
    });
    specificType.subscribe((newSpecificType) => {
        let condition = formatRuleModel.condition(), newRule = !condition, changedConditionType = originalConditionType !== conditionType(), realConditionType = conditionType().split('_')[0];
        if (newRule || changedConditionType) {
            formatRuleModel._changeConditionType(realConditionType);
            condition = formatRuleModel.condition();
            condition.dataType(dataTypeInfo.dataType());
            condition.dateTimeGroupInterval(dataTypeInfo.dateTimeGroupInterval());
        }
        condition.setSpecificType(newSpecificType);
        if (newRule) {
            formatRuleModel.name(_helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardWebStringId.FormatRule') + ' ', dashboardItem.formatRules(), 'name', 1));
        }
        if (newRule || changedConditionType) {
            requestRecalculation.fire();
        }
        specificTypeChanged();
    });
}
exports.addConditionEditor = addConditionEditor;
function getCommonCellsFormatRuleProperties(formatRule, getDataItems, getApplyToDataItems) {
    const dataItems = ko.pureComputed(() => getDataItems().map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) })));
    const applyToDataItems = ko.pureComputed(() => getApplyToDataItems().map((m) => ({ value: ko.unwrap(m.uniqueName), displayValueId: ko.unwrap(m.displayName) })));
    if (!formatRule.dataItemName() && dataItems().length) {
        formatRule.dataItemName(ko.unwrap(dataItems()[0].value));
    }
    const externalUpdateCallback = formUpdateHandler => _knockout_utils_1.safeSubscribe({
        dataItemName: formatRule.dataItemApplyToName,
        applyToDataItems
    }, () => formUpdateHandler({ forceValidate: true }));
    const getApplyToPlaceHolder = () => {
        const dataItemApplyToInfo = applyToDataItems().filter(item => item.value === formatRule.dataItemApplyToName())[0];
        return dataItemApplyToInfo && dataItemApplyToInfo.displayValueId;
    };
    const commonProperties = [];
    commonProperties.push(Object.assign(Object.assign({}, _cells_item_format_rule_1.formatRuleDataItem), { formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({ values: dataItems }) }));
    commonProperties.push(Object.assign(Object.assign({}, _cells_item_format_rule_1.dataItemApplyTo), { externalUpdateCallback, formAdapterItem: _form_adapter_editors_1.dynamicSelectBoxEditor({
            values: applyToDataItems,
            additionalOptions: () => ({
                placeholder: getApplyToPlaceHolder()
            }),
            comparableEditorOptions: ['placeholder']
        }), validationRules: [{
                type: 'custom',
                message: _default_1.getLocalizationById('DashboardWebStringId.ConditionalFormatting.InvalidApplyToValue'),
                reevaluate: true,
                validationCallback: (e) => {
                    const applyToDataItemsNames = applyToDataItems().map(di => di.value);
                    return !e.value && applyToDataItemsNames.indexOf(formatRule.dataItemName()) !== -1
                        || !!e.value && applyToDataItemsNames.indexOf(e.value) !== -1;
                }
            }] }));
    return {
        properties: commonProperties
    };
}
exports.getCommonCellsFormatRuleProperties = getCommonCellsFormatRuleProperties;
