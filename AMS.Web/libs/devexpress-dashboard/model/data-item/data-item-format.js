﻿/**
* DevExpress Dashboard (data-item-format.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataItemDateTimeFormat = exports.PercentOfTargetNumericFormat = exports.PercentVariationNumericFormat = exports.AbsoluteVariationNumericFormat = exports.DataItemNumericFormat = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../serializable-model");
const _data_item_format_1 = require("./metadata/_data-item-format");
class DataItemNumericFormat extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _data_item_format_1.dataItemNumericFormatSerializationsInfo;
    }
    _getViewModel() {
        return {
            NumericFormat: {
                CurrencyCulture: this.currencyCultureName(),
                FormatType: this.formatType(),
                Precision: this.precision(),
                Unit: this.unit(),
                IncludeGroupSeparator: this.includeGroupSeparator()
            }
        };
    }
}
exports.DataItemNumericFormat = DataItemNumericFormat;
class AbsoluteVariationNumericFormat extends DataItemNumericFormat {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _data_item_format_1.absoluteVariationNumericFormatSerializationsInfo;
    }
}
exports.AbsoluteVariationNumericFormat = AbsoluteVariationNumericFormat;
class PercentVariationNumericFormat extends DataItemNumericFormat {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _data_item_format_1.percentVariationNumericFormatSerializationsInfo;
    }
}
exports.PercentVariationNumericFormat = PercentVariationNumericFormat;
class PercentOfTargetNumericFormat extends DataItemNumericFormat {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _data_item_format_1.percentOfTargetNumericFormatSerializationsInfo;
    }
}
exports.PercentOfTargetNumericFormat = PercentOfTargetNumericFormat;
class DataItemDateTimeFormat extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _data_item_format_1.dataItemDateTimeFormatSerializationsInfo;
    }
    _getViewModel(groupInterval) {
        return {
            DateTimeFormat: {
                GroupInterval: groupInterval || 'None',
                YearFormat: this.yearFormat(),
                QuarterFormat: this.quarterFormat(),
                MonthFormat: this.monthFormat(),
                DayOfWeekFormat: this.dayOfWeekFormat(),
                DateFormat: this.dateFormat(),
                DateHourFormat: this.dateHourFormat(),
                DateHourMinuteFormat: this.dateHourMinuteFormat(),
                DateTimeFormat: this.dateTimeFormat(),
                HourFormat: this.hourFormat(),
                ExactDateFormat: this.exactDateFormat()
            }
        };
    }
}
exports.DataItemDateTimeFormat = DataItemDateTimeFormat;
