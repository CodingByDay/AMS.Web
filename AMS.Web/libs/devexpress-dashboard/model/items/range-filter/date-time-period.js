﻿/**
* DevExpress Dashboard (date-time-period.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimePeriod = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _format_helper_1 = require("../../../data/_format-helper");
const _formatter_1 = require("../../../data/_formatter");
const _datetime_period_converter_1 = require("../../../viewer-parts/viewer-items/range-selector-item/_datetime-period-converter");
const _data_field_1 = require("../../data-sources/_data-field");
const _knockout_utils_1 = require("../../internal/_knockout-utils");
const serializable_model_1 = require("../../serializable-model");
const _date_time_period_1 = require("./metadata/_date-time-period");
const _period_limit_1 = require("./metadata/_period-limit");
class DateTimePeriod extends serializable_model_1.TypedSerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.argumentInterval = ko.observable('Year');
        this._firstDayOfWeek = ko.observable(0);
        this._getPeriodTextValue = ko.pureComputed(() => {
            let range = this.getDateTimeValue();
            var startTextValue = this.format(range.startValue);
            var endTextValue = this.format(range.endValue);
            if (startTextValue != null || endTextValue != null)
                return _formatter_1.constructIntervalFilterText({ left: startTextValue, right: endTextValue });
            return _default_1.getLocalizationById('DashboardStringId.EntireRangePeriodCaption');
        });
        ko.computed(() => {
            this.start.argumentInterval(this.argumentInterval());
            this.end.argumentInterval(this.argumentInterval());
        });
    }
    getInfo() {
        return _date_time_period_1.dateTimePeriodSerializationsInfo;
    }
    _getDefaultItemType() { return 'DateTimePeriod'; }
    getDateTimeValue() {
        let convertToLimit = (limit) => {
            if (limit.mode() === 'None')
                return undefined;
            let flowMode = limit.mode() === 'Flow';
            return {
                Relative: flowMode,
                Date: limit.mode() === 'Fixed' ? limit.fixed.date() : undefined,
                Interval: flowMode ? limit.flow.interval() : undefined,
                Offset: flowMode ? limit.flow.offset() : undefined
            };
        };
        let range = _datetime_period_converter_1.DateTimePeriodConverter.toRange({
            Start: convertToLimit(this.start),
            End: convertToLimit(this.end)
        }, this._firstDayOfWeek());
        return range;
    }
    getDateFormat() {
        var argumentInterval = _period_limit_1.convertDateTimeGroupInterval(this.argumentInterval()), startInterval = this.start.getInterval() || argumentInterval, endInterval = this.end.getInterval() || argumentInterval;
        var dateFormat = ['year', 'quarterYear', 'monthYear', 'weekYear', 'dayMonthYear', 'dateHour', 'dateHourMinute', 'dateHourMinuteSecond'];
        return dateFormat[Math.max(_period_limit_1.flowIntervalOrderedValues.indexOf(startInterval), _period_limit_1.flowIntervalOrderedValues.indexOf(endInterval))];
    }
    format(value) {
        if (value == null)
            return null;
        var dateFormatInfoType = this.getDateFormat(), correctedValue = value;
        switch (dateFormatInfoType) {
            case 'year':
                correctedValue = value.getFullYear();
                break;
        }
        return _format_helper_1.DashboardFormatHelper.format(correctedValue, { dateType: 'short', format: dateFormatInfoType });
    }
    _subscribeToGroupInterval(dimension) {
        return _knockout_utils_1.safeSubscribe({
            dataMember: dimension.dataMember,
            groupInterval: dimension.dateTimeGroupInterval
        }, (dim) => {
            this.argumentInterval(_data_field_1.DataField.isOlap(dim.dataMember) ? 'None' : dim.groupInterval);
        });
    }
}
exports.DateTimePeriod = DateTimePeriod;
