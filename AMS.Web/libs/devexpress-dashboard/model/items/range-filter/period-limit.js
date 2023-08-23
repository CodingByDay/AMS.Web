﻿/**
* DevExpress Dashboard (period-limit.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowDateTimePeriodLimit = exports.FixedDateTimePeriodLimit = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const serializable_model_1 = require("../../serializable-model");
const _period_limit_1 = require("./metadata/_period-limit");
class FixedDateTimePeriodLimit extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.isEmpty = ko.observable(false);
    }
    getInfo() {
        return _period_limit_1.fixedDateTimePeriodLimitSerializationsInfo;
    }
    getDateTimeValue() {
        return this.date();
    }
}
exports.FixedDateTimePeriodLimit = FixedDateTimePeriodLimit;
class FlowDateTimePeriodLimit extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.isEmpty = ko.observable(false);
        this.argumentInterval = ko.observable('Year');
    }
    getInfo() {
        return _period_limit_1.flowDateTimePeriodLimitSerializationsInfo;
    }
    _getAvailableIntervals() {
        return _period_limit_1.flowIntervalOrderedValues
            .slice(0, _period_limit_1.flowIntervalOrderedValues.indexOf(_period_limit_1.convertDateTimeGroupInterval(this.argumentInterval())) + 1)
            .map(value => {
            return {
                value: value,
                displayValue: _default_1.getLocalizationById(_period_limit_1.flowIntervalValues[value])
            };
        });
    }
}
exports.FlowDateTimePeriodLimit = FlowDateTimePeriodLimit;
