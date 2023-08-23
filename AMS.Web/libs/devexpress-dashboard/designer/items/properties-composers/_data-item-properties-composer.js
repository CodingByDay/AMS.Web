﻿/**
* DevExpress Dashboard (_data-item-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItemsPropertiesComposer = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const difference_calculation_1 = require("../../../model/data-item/calculations/difference-calculation");
const moving_calculation_1 = require("../../../model/data-item/calculations/moving-calculation");
const percent_of_total_calculation_1 = require("../../../model/data-item/calculations/percent-of-total-calculation");
const rank_calculation_1 = require("../../../model/data-item/calculations/rank-calculation");
const running_total_calculation_1 = require("../../../model/data-item/calculations/running-total-calculation");
const data_item_1 = require("../../../model/data-item/data-item");
const dimension_1 = require("../../../model/data-item/dimension");
const measure_1 = require("../../../model/data-item/measure");
const _data_item_1 = require("../../../model/data-item/metadata/_data-item");
const _data_item_format_1 = require("../../../model/data-item/metadata/_data-item-format");
const _dimension_1 = require("../../../model/data-item/metadata/_dimension");
const _measure_1 = require("../../../model/data-item/metadata/_measure");
const _data_field_1 = require("../../../model/data-sources/_data-field");
const cells_item_format_rule_1 = require("../../../model/format-rules/cells-item-format-rule");
const _dashboard_item_format_rule_1 = require("../../../model/format-rules/metadata/_dashboard-item-format-rule");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const data_dashboard_item_1 = require("../../../model/items/data-dashboard-item");
const _data_dashboard_item_1 = require("../../../model/items/metadata/_data-dashboard-item");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _calculation_surface_1 = require("../../calculations/items/surfaces/_calculation-surface");
const _filter_utils_1 = require("../../filtering/_filter-utils");
const _item_filter_display_name_provider_1 = require("../../filtering/_item-filter-display-name-provider");
const _item_filter_items_provider_1 = require("../../filtering/_item-filter-items-provider");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _properties_controller_1 = require("../../properties-controller/_properties-controller");
const _collection_editor_viewmodel_1 = require("../../ui-widgets/collection-editor/_collection-editor-viewmodel");
const _display_name_provider_1 = require("../../_display-name-provider");
const _calculation_properties_composer_1 = require("./_calculation-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class DataItemsPropertiesComposer {
    static _addConstraint(wrapper, condition, propertiesInCondition) {
        let rulesToAdd = {};
        wrapper.getInfo().map(propInfo => propInfo.propertyName).forEach(propName => rulesToAdd[propName] = condition);
        DataItemsPropertiesComposer._mergeRules(wrapper.visibilityFilterRules, rulesToAdd, 'and');
        propertiesInCondition.forEach(prop => {
            if (wrapper.getInfo().filter(p => p.propertyName === prop.info.propertyName).length === 0) {
                wrapper.addProperty(prop.value, prop.info);
                wrapper.visibilityFilterRules[prop.info.propertyName] = () => false;
            }
        });
    }
    static _mergeRules(into, rules, operator) {
        Object.keys(rules).forEach(propName => {
            let currentRule = into[propName];
            let ruleToAdd = rules[propName];
            let newRule = currentRule ? [currentRule, operator, ruleToAdd] :
                operator === 'and' ? ruleToAdd : [];
            into[propName] = newRule;
        });
    }
    composeTabs(model, args) {
        if (args.constraint === undefined)
            args.constraint = () => true;
        if (args.propertiesController === undefined)
            args.propertiesController = new _properties_controller_1.PropertiesController();
        var dataField = args.choosenField.peek(), bindingTab = new _accordion_tab_1.BindingAccordionTab(_accordion_tab_1.KnownTabs.Binding, 'DashboardWebStringId.Tabs.Binding'), optionsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.UnwrappedDataItem, 'DashboardWebStringId.Options'), dataShapingTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DataShaping, 'DashboardWebStringId.Tabs.DataShaping'), numericFormatTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.NumericFormat, 'DashboardWebStringId.Tabs.Format'), dateTimeFormatTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.DateTimeFormat, 'DashboardWebStringId.Tabs.Format'), topNTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.TopN, 'DashboardStringId.CommandFormatRuleTopN'), calculationsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Calculations, 'DashboardWebStringId.Calculations'), filterTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.MeasureFilter, 'DashboardWebStringId.AccordionTab.MeasureFilter'), result = [bindingTab, optionsTab, dataShapingTab, numericFormatTab, dateTimeFormatTab, topNTab, calculationsTab, filterTab];
        optionsTab.orderNo = 90;
        calculationsTab.orderNo = 190;
        filterTab.orderNo = 195;
        numericFormatTab.orderNo = 200;
        dateTimeFormatTab.orderNo = 205;
        topNTab.orderNo = 210;
        this.fillBindingTab(bindingTab, model, args.choosenField, args.dataSourceBrowser, args.dataDashboardItem, args.constraint);
        var dataItem = model.dataItem();
        if (dataItem) {
            var fieldType = dataField && dataField.fieldType();
            if (args.unwrappedDataItem) {
                this.fillOptionsTab(optionsTab, dataItem, model, args.dataDashboardItem);
            }
            if (dataItem instanceof dimension_1.Dimension) {
                let measures = args.dataDashboardItem._measures.filter(measure => !measure._hasCalculation());
                this.fillDataShapingPropertiesTab(dataShapingTab, args.dataDashboardItem, model, dataField, measures, args.dataSourceBrowser);
                if (args.dataDashboardItem._isTopNEnabled(dataItem)) {
                    this.fillTopNTab(topNTab, args.dataDashboardItem, dataItem, dataField, measures, model._specifics.supportsTopNOther, args.dataSourceBrowser);
                }
                if (!model._specifics.skipFormatting && dataField && !_data_field_1.DataField.isOlap(dataField.dataMember())) {
                    if (_data_field_1.DataField.isNumeric(dataField)) {
                        numericFormatTab.tabModel(_shared_composers_1.SharedComposers.getNumericFormatWrapper(dataItem.numericFormat));
                    }
                    else if (fieldType === 'DateTime') {
                        this.fillDimensionDatetimeFormatTab(dateTimeFormatTab, dataItem);
                    }
                }
                else if (model._specifics.forceAddOlapExactDateFormat && dataField && fieldType === 'DateTime' && _data_field_1.DataField.isOlap(dataField.dataMember())) {
                    this.fillDataItemExactDatetimeFormatTab(dateTimeFormatTab, dataItem);
                }
            }
            if (dataItem instanceof measure_1.Measure && !model._specifics.isAttribute) {
                if (args.dataDashboardItem._isCalculationSupported() && !_data_field_1.DataField.isOlap(dataItem.dataMember())) {
                    this.fillCalculationsTab(calculationsTab, dataItem, args.dataDashboardItem, args.dataSourceBrowser, args.propertiesController);
                }
                if (!model._specifics.skipFormatting) {
                    let numericFormatWrapper = _shared_composers_1.SharedComposers.getNumericFormatWrapper(dataItem.numericFormat);
                    if (!_data_field_1.DataField.isNumeric(dataField)) {
                        DataItemsPropertiesComposer._addConstraint(numericFormatWrapper, [
                            [_measure_1.summaryTypeTemplate.propertyName, '<>', 'Min'], 'and',
                            [_measure_1.summaryTypeTemplate.propertyName, '<>', 'Max'], 'and',
                            [_measure_1.summaryTypeTemplate.propertyName, '<>', 'Mode']
                        ], [{ info: _measure_1.summaryTypeTemplate, value: dataItem.summaryType }]);
                    }
                    numericFormatTab.tabModel(numericFormatWrapper);
                    if (fieldType === 'DateTime') {
                        let exactDateWrapper = this._createExactDatePropertiesWrapper(dataItem);
                        DataItemsPropertiesComposer._addConstraint(exactDateWrapper, [
                            [_measure_1.summaryTypeTemplate.propertyName, '=', 'Min'], 'or',
                            [_measure_1.summaryTypeTemplate.propertyName, '=', 'Max'], 'or',
                            [_measure_1.summaryTypeTemplate.propertyName, '=', 'Mode']
                        ], [{ info: _measure_1.summaryTypeTemplate, value: dataItem.summaryType }]);
                        dateTimeFormatTab.tabModel(exactDateWrapper);
                    }
                }
                this._fillFilterTab(filterTab, dataItem, args.dataDashboardItem, args.dataSourceBrowser);
            }
        }
        return result;
    }
    fillBindingTab(bindingTab, model, choosenField, dataSourceBrowser, dataDashboardItem, constraint) {
        bindingTab.tabModel({
            choosenField: ko.observable(choosenField),
            dataItemLink: model,
            constraint: constraint,
            dataSourceBrowser: dataSourceBrowser,
            dataMemberPath: ko.observable(ko.computed(() => {
                if (dataDashboardItem.dataSource() && dataDashboardItem.dataMember()) {
                    return [dataDashboardItem.dataSource(), dataDashboardItem.dataMember()].join('.');
                }
                else if (dataDashboardItem.dataSource()) {
                    return dataDashboardItem.dataSource();
                }
                return '';
            })),
            additionalProperties: ko.observable(ko.pureComputed(() => {
                if (model._specifics.isAttribute || !choosenField())
                    return null;
                var properties = [];
                var dataItem = model.dataItem();
                if (dataItem instanceof measure_1.Measure) {
                    var summaryTypeMeta = data_dashboard_item_1.DataDashboardItem._getAvaliableSummaryTypeInfo(choosenField(), model._specifics.acceptableShapingType, dataItem);
                    if (summaryTypeMeta) {
                        properties.push(summaryTypeMeta);
                    }
                }
                if ((model.dataItem() instanceof dimension_1.Dimension)
                    && (!_data_field_1.DataField.isOlap(model.dataItem().dataMember()))
                    && (choosenField() && choosenField().fieldType() === 'DateTime')) {
                    if (model._specifics.acceptableShapingType !== data_item_1.AcceptableShapingType.RangeDate) {
                        properties.push(_dimension_1.dateTimeGroupInterval);
                    }
                    else {
                        properties.push(_dimension_1.rangeDateTimeGroupInterval);
                    }
                }
                if (properties.length) {
                    return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                        model: model.dataItem(),
                        properties: properties
                    });
                }
                return null;
            })),
            summary: ko.pureComputed(() => {
                var dataItemLink = bindingTab.tabModel() && bindingTab.tabModel().dataItemLink;
                return dataItemLink.dataItem() && dataItemLink.dataItem().dataMember() || '';
            }),
            summaryHint: ko.pureComputed(() => {
                var dataItemLink = bindingTab.tabModel() && bindingTab.tabModel().dataItemLink;
                return dataItemLink.dataItem() && (dataItemLink.dataItem().dataMember() + ' (' + dataItemLink.uniqueName() + ')') || '';
            })
        });
    }
    fillOptionsTab(tab, dataItem, model, dataDashboardItem) {
        var properties = [];
        properties.push(_base_metadata_1.name);
        var newProperties = model
            ._specifics
            .customOptionsProperties
            .filter(p => !p.filter || p.filter(dataItem));
        properties = properties.concat(newProperties.map(p => p.serializationInfo));
        var disabledRules = {};
        newProperties
            .filter(x => !!x.disabledRule)
            .forEach((property) => {
            disabledRules[property.serializationInfo.propertyName] = (m) => { return property.disabledRule(dataItem); };
        });
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dataItem,
            properties: properties,
            disabledFilterRules: disabledRules
        }));
    }
    fillDataShapingPropertiesTab(tab, dataDashboardItem, model, dataField, measures, dataSourceBrowser) {
        var dataItem = model.dataItem();
        var disableRules = {};
        if (dataItem) {
            var fieldType = dataField && dataField.fieldType();
            ko.computed(() => {
                var properties = [];
                if (dataItem instanceof dimension_1.Dimension) {
                    var topNEnabledFunc = () => dataItem.topNOptionsEnabled();
                    if (dataDashboardItem._isSortingEnabled()) {
                        if (dataField && _data_field_1.DataField.isOlap(dataItem.dataMember())) {
                            properties.push(_dimension_1.sortOrderOlap);
                            disableRules[_dimension_1.sortOrderOlap.propertyName] = topNEnabledFunc;
                        }
                        else {
                            properties.push(_dimension_1.sortOrderNonOlap);
                            disableRules[_dimension_1.sortOrderNonOlap.propertyName] = topNEnabledFunc;
                        }
                        var values = [];
                        if (!_data_field_1.DataField.isOlap(dataItem.dataMember())) {
                            values.push({
                                value: 'DXValue',
                                displayValue: 'DashboardStringId.CommandDimensionSortModeValue'
                            });
                        }
                        else {
                            values.push({
                                value: 'DXDisplayText',
                                displayValue: 'DashboardStringId.CommandDimensionSortModeDisplayText'
                            });
                            values.push({
                                value: 'DXValue',
                                displayValue: 'DashboardStringId.CommandDimensionSortModeValue'
                            });
                            values.push({
                                value: 'DXID',
                                displayValue: 'DashboardStringId.CommandDimensionSortModeID'
                            });
                            values.push({
                                value: 'DXKey',
                                displayValue: 'DashboardStringId.CommandDimensionSortModeKey'
                            });
                        }
                        properties.push(Object.assign({ valuesArray: values.concat(measures.filter(m => m instanceof measure_1.Measure && !m.calculation.calculation() && !m.expression()).map(m => ({
                                value: m.uniqueName(),
                                displayValue: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dataDashboardItem, m)
                            }))) }, _dimension_1.realSortMode));
                        disableRules[_dimension_1.realSortMode.propertyName] = topNEnabledFunc;
                    }
                    switch (fieldType) {
                        case 'DateTime':
                            break;
                        case 'Text':
                            properties.push(_dimension_1.textGroupInterval);
                            break;
                    }
                }
                properties = properties.concat(model
                    ._specifics
                    .customDataShapingProperties
                    .filter(p => !p.filter || p.filter(dataField))
                    .map(p => p.serializationInfo));
                var tabModel = properties.length > 0 ?
                    new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                        model: dataItem,
                        properties: properties,
                        disabledFilterRules: disableRules
                    })
                    : null;
                tab.tabModel(tabModel);
            });
        }
    }
    _createExactDateProperties() {
        let properties = [
            _data_item_format_1.namelessYearFormat,
            _data_item_format_1.namelessDateFormat,
            _data_item_format_1.namelessDateHourFormat,
            _data_item_format_1.namelessDateHourMinuteFormat,
            _data_item_format_1.namelessDateTimeWithSecondsFormat
        ];
        let visibilityRules = {};
        visibilityRules[_data_item_format_1.namelessYearFormat.propertyName] = [_data_item_format_1.namelessExactDateFormat.propertyName, '=', 'Year'];
        visibilityRules[_data_item_format_1.namelessDateFormat.propertyName] = [_data_item_format_1.namelessExactDateFormat.propertyName, '=', 'Day'];
        visibilityRules[_data_item_format_1.namelessDateHourFormat.propertyName] = [_data_item_format_1.namelessExactDateFormat.propertyName, '=', 'Hour'];
        visibilityRules[_data_item_format_1.namelessDateHourMinuteFormat.propertyName] = [_data_item_format_1.namelessExactDateFormat.propertyName, '=', 'Minute'];
        visibilityRules[_data_item_format_1.namelessDateTimeWithSecondsFormat.propertyName] = [_data_item_format_1.namelessExactDateFormat.propertyName, '=', 'Second'];
        return { properties, visibilityRules };
    }
    fillDataItemExactDatetimeFormatTab(tab, model) {
        tab.tabModel(this._createExactDatePropertiesWrapper(model));
    }
    _createExactDatePropertiesWrapper(model) {
        let exactDateProperties = this._createExactDateProperties();
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [
                {
                    container: _data_item_1.dateTimeFormat,
                    properties: [_data_item_format_1.namelessExactDateFormat]
                },
                {
                    container: _data_item_1.dateTimeFormat,
                    properties: exactDateProperties.properties
                }
            ],
            visibilityFilterRules: exactDateProperties.visibilityRules
        });
    }
    fillDimensionDatetimeFormatTab(tab, model) {
        var visibilityRules = {};
        var properties = [
            _data_item_format_1.namelessExactDateFormat,
            _data_item_format_1.namelessYearFormat,
            _data_item_format_1.namelessMonthFormat,
            _data_item_format_1.namelessQuarterFormat,
            _data_item_format_1.namelessDayOfWeekFormat,
            _data_item_format_1.namelessHourFormat,
            _data_item_format_1.namelessDateFormat,
            _data_item_format_1.namelessDateHourFormat,
            _data_item_format_1.namelessDateHourMinuteFormat,
            _data_item_format_1.namelessDateTimeWithSecondsFormat
        ];
        visibilityRules[_dimension_1.dateTimeGroupInterval.propertyName] = () => false;
        visibilityRules[_data_item_format_1.namelessYearFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'Year'];
        visibilityRules[_data_item_format_1.namelessQuarterFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'Quarter'];
        visibilityRules[_data_item_format_1.namelessMonthFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'Month'];
        visibilityRules[_data_item_format_1.namelessHourFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'Hour'];
        visibilityRules[_data_item_format_1.namelessDayOfWeekFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'DayOfWeek'];
        visibilityRules[_data_item_format_1.namelessDateFormat.propertyName] = [
            [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'DayMonthYear'],
            'or',
            [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'WeekYear']
        ];
        visibilityRules[_data_item_format_1.namelessDateHourFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'DateHour'];
        visibilityRules[_data_item_format_1.namelessDateHourMinuteFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'DateHourMinute'];
        visibilityRules[_data_item_format_1.namelessDateTimeWithSecondsFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'DateHourMinuteSecond'];
        visibilityRules[_data_item_format_1.namelessExactDateFormat.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'None'];
        let exactDateProperties = this._createExactDateProperties();
        let exactDateIntervalConstraints = {};
        exactDateProperties.properties.forEach(edProp => exactDateIntervalConstraints[edProp.propertyName] = [_dimension_1.dateTimeGroupInterval.propertyName, '=', 'None']);
        DataItemsPropertiesComposer._mergeRules(exactDateProperties.visibilityRules, exactDateIntervalConstraints, 'and');
        DataItemsPropertiesComposer._mergeRules(visibilityRules, exactDateProperties.visibilityRules, 'or');
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [
                _dimension_1.dateTimeGroupInterval,
                {
                    container: _data_item_1.dateTimeFormat,
                    properties: properties
                }
            ],
            visibilityFilterRules: visibilityRules
        }));
    }
    fillTopNTab(tab, dataDashboardItem, dataItem, dataField, measures, supportsTopNOther, dataSourceBrowser) {
        var disabledRules = {};
        var isTopNUnavailable = () => measures.length === 0;
        var topNOptionsDisabled = () => !dataItem.topNOptionsEnabled() || isTopNUnavailable();
        disabledRules[_dimension_1.topNOptionsEnabled.propertyName] = isTopNUnavailable;
        disabledRules[_dimension_1.topNOptionsCount.propertyName] = topNOptionsDisabled;
        disabledRules[_dimension_1.topNOptionsMode.propertyName] = topNOptionsDisabled;
        disabledRules[_dimension_1.topNOptionsMeasure.propertyName] = topNOptionsDisabled;
        disabledRules[_dimension_1.topNOptionsShowOthers.propertyName] = topNOptionsDisabled;
        var visibilityRules = {};
        visibilityRules[_dimension_1.topNOptionsShowOthers.propertyName] = () => supportsTopNOther;
        var properties = [
            _dimension_1.topNOptionsEnabled,
            _dimension_1.topNOptionsMode,
            _dimension_1.topNOptionsCount,
            Object.assign({ valuesArray: measures.map((m) => { return { value: m.uniqueName(), displayValue: _display_name_provider_1.getDataItemDisplayName(dataSourceBrowser, dataDashboardItem, m) }; }) }, _dimension_1.topNOptionsMeasure)
        ];
        if (dataField && !_data_field_1.DataField.isOlap(dataField.dataMember())) {
            properties.push(_dimension_1.topNOptionsShowOthers);
        }
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: dataItem,
            properties: properties,
            disabledFilterRules: disabledRules,
            visibilityFilterRules: visibilityRules,
            summary: ko.computed(() => {
                if (!topNOptionsDisabled()) {
                    if (!dataItem.topNOptionsMeasureName()) {
                        dataItem.topNOptionsMeasureName(measures[0] && measures[0].uniqueName());
                    }
                    var topNDataItem = measures.filter(di => di.uniqueName.peek() === dataItem.topNOptionsMeasureName())[0];
                    var modeDisplayValue = _default_1.getLocalizationById(_dimension_1.topNOptionsModeValues[dataItem.topNOptionsMode()]);
                    return modeDisplayValue + ' ' + dataItem.topNOptionsCount() + ' - ' + (!!topNDataItem ? topNDataItem.dataMember() : '');
                }
                return '';
            })
        }));
    }
    fillCalculationsTab(tab, measure, dataDashboardItem, dataSourceBrowser, propertiesController) {
        var noneCalculation = { title: 'DashboardStringId.CalculationTypeNone', data: { type: undefined } };
        var expressionCalculation = { title: 'DashboardStringId.CalculationTypeExpression', data: { type: undefined } };
        var calculationsInfo = Object.assign({}, _measure_1.calculations);
        var disabledRules = {};
        disabledRules[calculationsInfo.propertyName] = () => {
            return dataDashboardItem
                ._dimensions
                .some(dimension => {
                return (dimension.topNOptionsEnabled() && dimension.topNOptionsMeasureName() === measure.uniqueName()) || (dimension.sortMeasure() === measure.uniqueName());
            });
        };
        var availableCalculations = [
            noneCalculation,
            { title: 'DashboardStringId.CalculationTypePercentOfTotal', data: { type: percent_of_total_calculation_1.PercentOfTotalCalculation } },
            { title: 'DashboardStringId.CalculationTypeRunningTotal', data: { type: running_total_calculation_1.RunningTotalCalculation } },
            { title: 'DashboardStringId.CalculationTypeDifference', data: { type: difference_calculation_1.DifferenceCalculation, isEqual: (calc) => calc.differenceType() !== 'Percentage' } },
            { title: 'DashboardStringId.CalculationTypePercentageDifference', data: { type: difference_calculation_1.DifferenceCalculation, default: { '@DifferenceType': 'Percentage' }, isEqual: (calc) => calc.differenceType() === 'Percentage' } },
            { title: 'DashboardStringId.CalculationTypeMovingCalculation', data: { type: moving_calculation_1.MovingCalculation } },
            { title: 'DashboardStringId.CalculationTypeRank', data: { type: rank_calculation_1.RankCalculation } },
            expressionCalculation
        ];
        var isEqual = (definition) => {
            return !!definition.data.type && measure.calculation.calculation() instanceof definition.data.type && (!definition.data.isEqual || definition.data.isEqual(measure.calculation.calculation()));
        };
        var selectedPredefinedCalculation = ko.computed({
            read: () => {
                var result = !!measure.expression() ? expressionCalculation : undefined;
                if (!result) {
                    result = availableCalculations.filter(definition => isEqual(definition))[0] || noneCalculation;
                }
                return result;
            },
            write: _undo_engine_helper_1.wrapFuncWithUndoRedo((val) => {
                if (val !== noneCalculation) {
                    if (val === expressionCalculation) {
                        if (!measure.expression()) {
                            _calculation_properties_composer_1.getCalculationArgumentExpression(measure, dataDashboardItem, dataSourceBrowser).done(expr => {
                                measure.expression(expr);
                            });
                            measure.windowDefinition.windowDefinition(dataDashboardItem._getDefaultCalculationWindowDefinition());
                        }
                    }
                    else if (!isEqual(val)) {
                        measure.expression(undefined);
                        measure.calculation.calculation(new (val.data.type)(val.data.default));
                        measure.windowDefinition.windowDefinition(dataDashboardItem._getDefaultCalculationWindowDefinition());
                    }
                }
                else {
                    measure.expression(undefined);
                    measure.calculation.calculation(undefined);
                    measure.windowDefinition.windowDefinition(undefined);
                }
            })
        });
        const singleChoiceEditorOptions = {
            propertyName: 'title',
            dataSource: availableCalculations,
            enableEditItem: (calcDefinition) => calcDefinition !== noneCalculation,
            editItemHandler: (calcDefinition) => {
                if (calcDefinition !== noneCalculation) {
                    var surface = new _calculation_surface_1.CalculationSurface(calcDefinition, measure, dataDashboardItem, dataSourceBrowser, propertiesController);
                    surface.startEditing(new _collection_editor_viewmodel_1.CollectionEditorEditItemArguments());
                }
            },
        };
        tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: {
                calculations: selectedPredefinedCalculation,
            },
            properties: [Object.assign(Object.assign({}, calculationsInfo), { formAdapterItem: _form_adapter_editors_1.editableListEditor(singleChoiceEditorOptions) })],
            disabledFilterRules: disabledRules,
            summary: ko.computed(() => selectedPredefinedCalculation().title !== noneCalculation.title ? selectedPredefinedCalculation().title : '')
        }));
    }
    _fillFilterTab(tab, model, dashboardItem, dataSourceBrowser) {
        if (!_data_field_1.DataField.isOlap(model.dataMember())) {
            let measureFilterEditorParams = {
                fieldListProvider: ko.observable(new _item_filter_items_provider_1.ItemFilterItemsProvider(dataSourceBrowser, dataSourceBrowser, dataSourceBrowser.parameters, dashboardItem, (di) => { return di instanceof dimension_1.Dimension; })),
                options: _filter_utils_1.createItemFilterOptions(model.filterString, undefined, dataSourceBrowser, { text: 'MeasureFilter', localizationId: 'DashboardWebStringId.AccordionTab.MeasureFilter' }),
                displayNameProvider: new _item_filter_display_name_provider_1.ItemFilterDisplayNameProvider(dashboardItem, dataSourceBrowser)
            };
            let wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                model: model,
                properties: [
                    Object.assign(Object.assign({}, _measure_1.measureFilterString), { formAdapterItem: _form_adapter_editors_1.filterEditor(measureFilterEditorParams) })
                ],
                summary: _knockout_utils_1.safeComputed({ filterString: model.filterString }, (args) => { return !!args.filterString ? _default_1.getLocalizationById('DashboardWebStringId.ButtonOn') : ''; }),
                visibilityFilterRules: {
                    [_measure_1.measureFilterString.propertyName]: () => !model.expression(),
                }
            });
            tab.tabModel(wrapper);
        }
    }
    static getCellFormatRuleCreator(dataItem, dataItemApplyTo, formatRuleItemType) {
        return () => {
            return data_dashboard_item_1.DataDashboardItem._createFormatRule(null, {
                '@ItemType': formatRuleItemType,
                '@DataItem': dataItem.uniqueName(),
                '@DataItemApplyTo': dataItemApplyTo.uniqueName()
            });
        };
    }
    static getCellFormatRuleFilter(dataItem) {
        return (rule) => {
            if (rule instanceof cells_item_format_rule_1.CellsItemFormatRule) {
                let uniqueName = dataItem.uniqueName();
                return rule.dataItemName() === uniqueName || rule.dataItemApplyToName() === uniqueName;
            }
            return false;
        };
    }
    static getFormatRulesWrapper(model, createNewItemHandler, visibleItemsFilter, editHandler) {
        var collectionEditorOptions = Object.assign(Object.assign({ propertyName: _dashboard_item_format_rule_1.classCaption.propertyName, createNewItemHandler: createNewItemHandler }, _dashboard_item_format_rule_1.classCaption), { editItemHandler: editHandler, visibleItemsFilter: visibleItemsFilter });
        return new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: [Object.assign(Object.assign({}, _data_dashboard_item_1.formatRules), { formAdapterItem: _form_adapter_editors_1.collectionEditor(collectionEditorOptions) })]
        });
    }
}
exports.DataItemsPropertiesComposer = DataItemsPropertiesComposer;
