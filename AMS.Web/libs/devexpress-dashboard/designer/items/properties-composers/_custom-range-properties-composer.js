﻿/**
* DevExpress Dashboard (_custom-range-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomRangePropertiesComposer = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _date_time_period_1 = require("../../../model/items/range-filter/metadata/_date-time-period");
const _limit_container_1 = require("../../../model/items/range-filter/metadata/_limit-container");
const _period_limit_1 = require("../../../model/items/range-filter/metadata/_period-limit");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _form_adapter_editors_1 = require("../../form-adapter/_form-adapter-editors");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
class CustomRangePropertiesComposer {
    composeTabs(model, args) {
        var commonTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.AccordionTab.Common', this.getCommonWrapper(model, args.argument, args.rangeFilterItem));
        return [commonTab];
    }
    getCommonWrapper(model, argument, rangeFilterItem) {
        var p = [], visibilityRules = {}, dateOnly = ['Year', 'MonthYear', 'QuarterYear', 'DayMonthYear'].indexOf(argument.dateTimeGroupInterval()) !== -1;
        p.push(Object.assign(Object.assign({}, _base_metadata_1.name), { validateBeforeSet: true, validationRules: [
                {
                    type: 'custom',
                    validationCallback: (options) => { return !rangeFilterItem.dateTimePeriods().filter(period => period.name() === options.value)[0]; },
                    message: _default_1.getLocalizationById('DashboardStringId.UniqueNameValidationMessage')
                }
            ] }));
        p.push({
            container: _date_time_period_1.startLimit,
            properties: [Object.assign({ displayName: 'DashboardWebStringId.RangeFilter.StartMode', replacementPropertyName: 'start_mode' }, _date_time_period_1.mode), Object.assign(Object.assign({ displayName: 'DashboardWebStringId.RangeFilter.StartIntervalAndOffset', replacementPropertyName: 'start_flow_options' }, _limit_container_1.flowDateTimePeriodLimitProperty), { formAdapterItem: _form_adapter_editors_1.flowModeSettingsEditor() }), {
                    container: _limit_container_1.fixedDateTimePeriodLimitProperty,
                    properties: [Object.assign({ displayName: 'DashboardWebStringId.RangeFilter.StartDate', replacementPropertyName: 'start_date', editorOptions: {
                                type: dateOnly ? 'date' : 'datetime'
                            } }, _period_limit_1.date)]
                }]
        });
        visibilityRules['start_date'] = ['start_mode', '=', 'Fixed'];
        visibilityRules['start_flow_options'] = ['start_mode', '=', 'Flow'];
        p.push({
            container: _date_time_period_1.endLimit,
            properties: [Object.assign({ displayName: 'DashboardWebStringId.RangeFilter.EndMode', replacementPropertyName: 'end_mode' }, _date_time_period_1.mode), Object.assign(Object.assign({ displayName: 'DashboardWebStringId.RangeFilter.EndIntervalAndOffset', replacementPropertyName: 'end_flow_options' }, _limit_container_1.flowDateTimePeriodLimitProperty), { formAdapterItem: _form_adapter_editors_1.flowModeSettingsEditor() }), {
                    container: _limit_container_1.fixedDateTimePeriodLimitProperty,
                    properties: [Object.assign({ displayName: 'DashboardWebStringId.RangeFilter.EndDate', replacementPropertyName: 'end_date', editorOptions: {
                                type: dateOnly ? 'date' : 'datetime'
                            } }, _period_limit_1.date)]
                }]
        });
        visibilityRules['end_date'] = ['end_mode', '=', 'Fixed'];
        visibilityRules['end_flow_options'] = ['end_mode', '=', 'Flow'];
        p.push({
            propertyName: 'dateSampleFakeProperty',
            formAdapterItem: _form_adapter_editors_1.textPreviewEditor({ target: model._getPeriodTextValue }),
        });
        p.push({
            propertyName: 'buttonsFakeProperty',
            formAdapterItem: _form_adapter_editors_1.actionButtons([
                {
                    text: analytics_internal_1.localize('DashboardWebStringId.RangeFilter.SetDefaultCustomPeriod'),
                    onClick: () => rangeFilterItem.defaultDateTimePeriodName(model.name()),
                    visible: ko.computed(() => rangeFilterItem.defaultDateTimePeriodName() !== model.name())
                },
                {
                    text: analytics_internal_1.localize('DashboardWebStringId.RangeFilter.ClearDefaultCustomPeriod'),
                    onClick: () => rangeFilterItem.defaultDateTimePeriodName(null),
                    visible: ko.computed(() => rangeFilterItem.defaultDateTimePeriodName() === model.name())
                }
            ]),
        });
        var wrapper = new _object_properties_wrapper_1.ObjectPropertiesWrapper({
            model: model,
            properties: p,
            visibilityFilterRules: visibilityRules,
            modelExtention: { buttonsFakeProperty: {}, dateSampleFakeProperty: {} }
        });
        return wrapper;
    }
}
exports.CustomRangePropertiesComposer = CustomRangePropertiesComposer;
