﻿/**
* DevExpress Dashboard (_data-item-format.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataItemDateTimeFormatSerializationsInfo = exports.namelessExactDateFormat = exports.exactDateFormat = exports.namelessHourFormat = exports.hourFormat = exports.namelessDateTimeWithSecondsFormat = exports.dateTimeWithSecondsFormat = exports.namelessDateHourMinuteFormat = exports.dateHourMinuteFormat = exports.namelessDateHourFormat = exports.dateHourFormat = exports.namelessDateFormat = exports.dateFormat = exports.namelessDayOfWeekFormat = exports.dayOfWeekFormat = exports.namelessMonthFormat = exports.monthFormat = exports.namelessQuarterFormat = exports.quarterFormat = exports.namelessYearFormat = exports.yearFormat = exports.percentOfTargetNumericFormatSerializationsInfo = exports.percentVariationNumericFormatSerializationsInfo = exports.absoluteVariationNumericFormatSerializationsInfo = exports.dataItemNumericFormatSerializationsInfo = exports.dataItemCurrencyCultureName = exports.includeGroupSeparator = exports.precision = exports.unit = exports.formatType = exports.customFormatString = exports.formatTypeValues = void 0;
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _base_metadata_1 = require("../../metadata/_base-metadata");
exports.formatTypeValues = {
    'Auto': 'DashboardStringId.NumericFormatFormatTypeAutoCaption',
    'General': 'DashboardStringId.NumericFormatFormatTypeGeneralCaption',
    'Number': 'DashboardStringId.NumericFormatFormatTypeNumberCaption',
    'Currency': 'DashboardStringId.NumericFormatFormatTypeCurrencyCaption',
    'Scientific': 'DashboardStringId.NumericFormatFormatTypeScientificCaption',
    'Percent': 'DashboardStringId.NumericFormatFormatTypePercentCaption',
    'Custom': 'Custom'
};
exports.customFormatString = { propertyName: 'customFormatString', modelName: '@CustomFormatString', displayName: 'Custom Format String', simpleFormAdapterItem: 'textBoxEditor' };
exports.formatType = { propertyName: 'formatType', modelName: '@FormatType', displayName: 'DashboardWebStringId.FormatType', simpleFormAdapterItem: 'selectBoxEditor', values: exports.formatTypeValues };
exports.unit = {
    propertyName: 'unit', modelName: '@Unit', displayName: 'DashboardStringId.NumericFormatUnitCaption', defaultVal: 'Auto', simpleFormAdapterItem: 'selectBoxEditor',
    values: {
        'Auto': 'DashboardStringId.NumericFormatUnitAutoCaption',
        'Ones': 'DashboardStringId.NumericFormatUnitOnesCaption',
        'Thousands': 'DashboardStringId.NumericFormatUnitThousandsCaption',
        'Millions': 'DashboardStringId.NumericFormatUnitMillionsCaption',
        'Billions': 'DashboardStringId.NumericFormatUnitBillionsCaption'
    }
};
exports.precision = { propertyName: 'precision', modelName: '@Precision', displayName: 'DashboardWebStringId.DataItem.Precision', simpleFormAdapterItem: 'numberBoxEditor', from: _base_metadata_1.floatFromModel, validationRules: [{ type: 'custom', validationCallback: (options) => { return options.value >= 0; }, message: "Precision shouldn't be negative." }] };
exports.includeGroupSeparator = { propertyName: 'includeGroupSeparator', modelName: '@IncludeGroupSeparator', displayName: 'DashboardWebStringId.DataItem.IncludeGroupSeparator', defaultVal: false, simpleFormAdapterItem: 'onOffButtonGroupEditor', from: _base_metadata_1.parseBool };
exports.dataItemCurrencyCultureName = { propertyName: 'currencyCultureName', modelName: '@CurrencyCultureName', displayName: 'DashboardStringId.NumericFormatFormatTypeCurrencyCaption', defaultVal: null };
const getNumericFormat = (defaultFormatType, defaultPrecision) => ([Object.assign(Object.assign({}, exports.formatType), { defaultVal: defaultFormatType }), exports.unit, Object.assign(Object.assign({}, exports.precision), { defaultVal: defaultPrecision }), exports.includeGroupSeparator,
    exports.dataItemCurrencyCultureName,
    exports.customFormatString]);
exports.dataItemNumericFormatSerializationsInfo = getNumericFormat('Auto', 2);
exports.absoluteVariationNumericFormatSerializationsInfo = getNumericFormat('Number', 0);
exports.percentVariationNumericFormatSerializationsInfo = getNumericFormat('Percent', 2);
exports.percentOfTargetNumericFormatSerializationsInfo = getNumericFormat('Percent', 2);
exports.yearFormat = {
    propertyName: 'yearFormat', modelName: '@YearFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatYearFormatDefaultCaption',
        'Full': 'DashboardStringId.DateTimeFormatYearFormatFullCaption',
        'Abbreviated': 'DashboardStringId.DateTimeFormatYearFormatAbbreviatedCaption'
    }
};
exports.namelessYearFormat = _jquery_helpers_1.deepExtend({}, exports.yearFormat);
delete exports.namelessYearFormat.displayName;
exports.quarterFormat = {
    propertyName: 'quarterFormat', modelName: '@QuarterFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatQuarterFormatDefaultCaption',
        'Numeric': 'DashboardStringId.DateTimeFormatQuarterFormatNumericCaption',
        'Full': 'DashboardStringId.DateTimeFormatQuarterFormatFullCaption'
    }
};
exports.namelessQuarterFormat = _jquery_helpers_1.deepExtend({}, exports.quarterFormat);
delete exports.namelessQuarterFormat.displayName;
exports.monthFormat = {
    propertyName: 'monthFormat', modelName: '@MonthFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatMonthFormatDefaultCaption',
        'Full': 'DashboardStringId.DateTimeFormatMonthFormatFullCaption',
        'Abbreviated': 'DashboardStringId.DateTimeFormatMonthFormatAbbreviatedCaption',
        'Numeric': 'DashboardStringId.DateTimeFormatMonthFormatNumericCaption'
    }
};
exports.namelessMonthFormat = _jquery_helpers_1.deepExtend({}, exports.monthFormat);
delete exports.namelessMonthFormat.displayName;
exports.dayOfWeekFormat = {
    propertyName: 'dayOfWeekFormat', modelName: '@DayOfWeekFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'listEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatDayOfWeekFormatDefaultCaption',
        'Full': 'DashboardStringId.DateTimeFormatDayOfWeekFormatFullCaption',
        'Abbreviated': 'DashboardStringId.DateTimeFormatDayOfWeekFormatAbbreviatedCaption',
        'Numeric': 'DashboardStringId.DateTimeFormatDayOfWeekFormatNumericCaption'
    }
};
exports.namelessDayOfWeekFormat = _jquery_helpers_1.deepExtend({}, exports.dayOfWeekFormat);
delete exports.namelessDayOfWeekFormat.displayName;
exports.dateFormat = {
    propertyName: 'dateFormat', modelName: '@DateFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatDateFormatDefaultCaption',
        'Long': 'DashboardStringId.DateTimeFormatDateFormatLongCaption',
        'Short': 'DashboardStringId.DateTimeFormatDateFormatShortCaption'
    }
};
exports.namelessDateFormat = _jquery_helpers_1.deepExtend({}, exports.dateFormat);
delete exports.namelessDateFormat.displayName;
exports.dateHourFormat = {
    propertyName: 'dateHourFormat', modelName: '@DateHourFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatDateTimeFormatDefaultCaption',
        'Long': 'DashboardStringId.DateTimeFormatDateTimeFormatLongCaption',
        'Short': 'DashboardStringId.DateTimeFormatDateTimeFormatShortCaption',
        'TimeOnly': 'DashboardStringId.DateTimeFormatDateTimeFormatTimeOnlyCaption'
    }
};
exports.namelessDateHourFormat = _jquery_helpers_1.deepExtend({}, exports.dateHourFormat);
delete exports.namelessDateHourFormat.displayName;
exports.dateHourMinuteFormat = {
    propertyName: 'dateHourMinuteFormat', modelName: '@DateHourMinuteFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatDateTimeFormatDefaultCaption',
        'Long': 'DashboardStringId.DateTimeFormatDateTimeFormatLongCaption',
        'Short': 'DashboardStringId.DateTimeFormatDateTimeFormatShortCaption',
        'TimeOnly': 'DashboardStringId.DateTimeFormatDateTimeFormatTimeOnlyCaption'
    }
};
exports.namelessDateHourMinuteFormat = _jquery_helpers_1.deepExtend({}, exports.dateHourMinuteFormat);
delete exports.namelessDateHourMinuteFormat.displayName;
exports.dateTimeWithSecondsFormat = {
    propertyName: 'dateTimeFormat', modelName: '@DateTimeFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatDateTimeFormatDefaultCaption',
        'Long': 'DashboardStringId.DateTimeFormatDateTimeFormatLongCaption',
        'Short': 'DashboardStringId.DateTimeFormatDateTimeFormatShortCaption',
        'TimeOnly': 'DashboardStringId.DateTimeFormatDateTimeFormatTimeOnlyCaption'
    }
};
exports.namelessDateTimeWithSecondsFormat = _jquery_helpers_1.deepExtend({}, exports.dateTimeWithSecondsFormat);
delete exports.namelessDateTimeWithSecondsFormat.displayName;
exports.hourFormat = {
    propertyName: 'hourFormat', modelName: '@HourFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Default', simpleFormAdapterItem: 'buttonGroupEditor',
    values: {
        'Default': 'DashboardStringId.DateTimeFormatDateTimeFormatDefaultCaption',
        'Short': 'DashboardStringId.DateTimeFormatDateTimeFormatShortCaption',
        'Long': 'DashboardStringId.DateTimeFormatDateTimeFormatLongCaption'
    }
};
exports.namelessHourFormat = _jquery_helpers_1.deepExtend({}, exports.hourFormat);
delete exports.namelessHourFormat.displayName;
exports.exactDateFormat = {
    propertyName: 'exactDateFormat', modelName: '@ExactDateFormat', displayName: 'DashboardWebStringId.FormatType', defaultVal: 'Day', simpleFormAdapterItem: 'listEditor',
    values: {
        'Year': 'DashboardStringId.ExactDateFormatYear',
        'Quarter': 'DashboardStringId.ExactDateFormatQuarter',
        'Month': 'DashboardStringId.ExactDateFormatMonth',
        'Day': 'DashboardStringId.ExactDateFormatDay',
        'Hour': 'DashboardStringId.ExactDateFormatHour',
        'Minute': 'DashboardStringId.ExactDateFormatMinute',
        'Second': 'DashboardStringId.ExactDateFormatSecond'
    }
};
exports.namelessExactDateFormat = _jquery_helpers_1.deepExtend({}, exports.exactDateFormat);
delete exports.namelessExactDateFormat.displayName;
exports.dataItemDateTimeFormatSerializationsInfo = [exports.yearFormat, exports.quarterFormat, exports.monthFormat, exports.dayOfWeekFormat, exports.dateFormat, exports.dateHourFormat, exports.dateHourMinuteFormat, exports.dateTimeWithSecondsFormat, exports.hourFormat, exports.exactDateFormat];
