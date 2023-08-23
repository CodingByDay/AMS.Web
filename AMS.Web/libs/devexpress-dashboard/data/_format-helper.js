﻿/**
* DevExpress Dashboard (_format-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardFormatHelper = exports.invariantCurrencySymbol = exports.invariantCurrencyIdentifier = void 0;
const config_1 = require("devextreme/core/config");
const date_1 = require("devextreme/core/utils/date");
const string_1 = require("devextreme/core/utils/string");
const format_helper_1 = require("devextreme/format_helper");
const date_2 = require("devextreme/localization/date");
const number_1 = require("devextreme/localization/number");
const _utils_1 = require("../data/_utils");
const legacy_settings_1 = require("../viewer-parts/legacy-settings");
const _default_1 = require("./localization/_default");
const _jquery_helpers_1 = require("./_jquery-helpers");
exports.invariantCurrencyIdentifier = 'INVARIANT';
exports.invariantCurrencySymbol = '¤';
class DashboardFormatHelper {
    static defaultQuarterFormat() { return _default_1.getLocalizationById('DashboardStringId.DateTimeQuarterFormat'); }
    static format(value, format) {
        if (_jquery_helpers_1.isPlainObject(format) && format.format) {
            if (format.dateType)
                return this._formatDateEx(value, format);
            else if (_utils_1.type.isNumeric(value) && isFinite(value))
                return this._formatNumberEx(value, format);
        }
        return format_helper_1.default.format(value, format);
    }
    static _applyNumberFormat(value, formatConfig) {
        var numberStr = (+value).toString(10);
        if ((/e/).test(numberStr)) {
            console.warn('The number ' + numberStr + ' out of (1e21, 1e-7) range can`t be formatted. The number will be displayed as is.');
            return value.toString();
        }
        var invariantCurrency = formatConfig.currency === exports.invariantCurrencyIdentifier;
        if (invariantCurrency) {
            formatConfig.currency = 'USD';
        }
        var formattedValue = number_1.default.format(value, formatConfig);
        if (formattedValue != null && formatConfig.currency != 'default') {
            var currencySymbol = '';
            var symbolAltNarrow = '';
            try {
                let symbolInfo = number_1.default.getCurrencySymbol(formatConfig.currency);
                currencySymbol = symbolInfo['symbol'];
                symbolAltNarrow = symbolInfo['symbol-alt-narrow'];
            }
            catch (_a) { }
            try {
                let symbolInfo = number_1.default._getCurrencySymbolInfo(formatConfig.currency);
                currencySymbol = symbolInfo.symbol;
                symbolAltNarrow = symbolInfo.symbol;
            }
            catch (_b) { }
            if (invariantCurrency) {
                symbolAltNarrow = exports.invariantCurrencySymbol;
                formatConfig.currency = exports.invariantCurrencyIdentifier;
            }
            if (!!symbolAltNarrow && symbolAltNarrow !== currencySymbol) {
                return formattedValue.replace(currencySymbol, symbolAltNarrow);
            }
        }
        return formattedValue;
    }
    static _getQuarterString(date, format) {
        var quarter = date_1.default.getQuarter(date.getMonth());
        switch (format) {
            case 'q':
                return this.romanDigits[quarter];
            case 'qq':
                return string_1.format(this.defaultQuarterFormat(), this.romanDigits[quarter]);
            case 'Q':
                return (quarter + 1).toString();
            case 'QQ':
                return string_1.format(this.defaultQuarterFormat(), (quarter + 1).toString());
        }
        return '';
    }
    static _formatDateEx(value, formatInfo) {
        var that = this, format = formatInfo.format.toLowerCase(), dateType = formatInfo.dateType, time, index, dateStr;
        if (!_utils_1.type.isDefined(value)) {
            return '';
        }
        if (dateType !== 'num' || format === 'dayofweek') {
            switch (format) {
                case 'monthyear':
                    return date_2.default.format(value, 'monthandyear');
                case 'quarteryear':
                    return that._getQuarterString(value, 'QQ') + ' ' + value.getFullYear();
                case 'daymonthyear':
                case 'weekyear':
                    return date_2.default.format(value, dateType + 'Date');
                case 'datehour':
                    time = new Date(value.getTime());
                    time.setMinutes(0);
                    dateStr = dateType === 'timeOnly' ? '' : date_2.default.format(value, dateType + 'Date');
                    return dateType === 'timeOnly' ? date_2.default.format(time, 'shorttime') : dateStr + ' ' + date_2.default.format(time, 'shorttime');
                case 'datehourminute':
                    dateStr = dateType === 'timeOnly' ? '' : date_2.default.format(value, dateType + 'Date');
                    return dateType === 'timeOnly' ? date_2.default.format(value, 'shorttime') : dateStr + ' ' + date_2.default.format(value, 'shorttime');
                case 'datehourminutesecond':
                    dateStr = dateType === 'timeOnly' ? '' : date_2.default.format(value, dateType + 'Date');
                    return dateType === 'timeOnly' ? date_2.default.format(value, 'longtime') : dateStr + ' ' + date_2.default.format(value, 'longtime');
                case 'year':
                    dateStr = value.toString();
                    return (dateType === 'abbr') ? dateStr.slice(2, 4) : dateStr;
                case 'dateyear':
                    return (dateType === 'abbr') ? date_2.default.format(value, 'shortyear') : date_2.default.format(value, 'year');
                case 'quarter':
                    return string_1.format(that.defaultQuarterFormat(), value.toString());
                case 'month':
                    index = value - 1;
                    return date_2.default.getMonthNames(dateType === 'abbr' ? 'abbreviated' : undefined)[index];
                case 'hour':
                    if (dateType === 'long') {
                        time = new Date();
                        time.setHours(value);
                        time.setMinutes(0);
                        return date_2.default.format(time, 'shorttime');
                    }
                    return value.toString();
                case 'dayofweek':
                    index = _utils_1.type.isString(value) ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(value) : value;
                    if (dateType !== 'num') {
                        return date_2.default.getDayNames(dateType === 'abbr' ? 'abbreviated' : undefined)[index];
                    }
                    return ((index - date_2.default.firstDayOfWeekIndex() + 1 + 7) % 8).toString();
                default:
                    return value.toString();
            }
        }
        else {
            return value.toString();
        }
    }
    static _getMinimalPossibleValue(formatType, precision) {
        var maxPrecision = precision + 1;
        if (formatType === 'percent') {
            maxPrecision += 2;
        }
        return Math.pow(10, -maxPrecision);
    }
    static _formatNumberEx(value, formatInfo) {
        var that = this, formatType = formatInfo.format.toLowerCase(), formatSettings = that._getUnitFormatSettings(value, formatInfo), result = '', config;
        if (!_utils_1.type.isDefined(value)) {
            return '';
        }
        if (['currency', 'percent', 'fixedpoint'].indexOf(formatType) !== -1
            && formatSettings.precision >= 0
            && Math.abs(value) < that._getMinimalPossibleValue(formatType, formatSettings.precision)) {
            value = 0;
        }
        value = that._getNumberByPower(value, formatSettings.unitPower, 1000);
        if (['fixedpoint', 'currency', 'percent'].indexOf(formatType) !== -1) {
            config = that._generateNumericFormatConfig(Object.assign(Object.assign({}, formatSettings), { significantDigits: formatInfo.significantDigits, signsAfterPointCount: that._countSignsAfterPoint(value, formatType), formatType: formatType }), value);
        }
        switch (formatType) {
            case 'general':
                if (value === 0) {
                    return '0';
                }
                else if (Math.abs(value) < 0.0001) {
                    return this._applyNumberFormat(value, { type: 'exponential', precision: 2, minimumSignificantDigits: 1, maximumSignificantDigits: 20 });
                }
                else {
                    return this._applyNumberFormat(value, { useGrouping: false, minimumSignificantDigits: 1, maximumSignificantDigits: 20 });
                }
            case 'decimal':
                result = this._applyNumberFormat(value, that._normalizeFormatConfig(formatType, formatSettings.precision, value));
                break;
            case 'fixedpoint':
                result = this._applyNumberFormat(value, config);
                break;
            case 'currency':
                config.currency = formatInfo.currency || config_1.default().defaultCurrency;
                result = this._applyNumberFormat(value, config);
                break;
            case 'percent':
                config.style = 'percent';
                result = this._applyNumberFormat(value, config);
                break;
            case 'exponential':
                return this._applyNumberFormat(value, { type: 'exponential', precision: formatSettings.precision });
            default:
                throw "Illegal numeric format: '" + formatType + "'";
        }
        result = that._insertUnitPostfix(result, formatSettings.unitPower);
        return (formatInfo.plus && value > 0 ? '+' : '') + result;
    }
    static _getUnitFormatSettings(value, formatInfo) {
        var unitPower = formatInfo.unitPower || 0, precision = formatInfo.precision || 0, includeGroupSeparator = formatInfo.includeGroupSeparator || false, showTrailingZeros = formatInfo.showTrailingZeros === undefined ? true : formatInfo.showTrailingZeros, significantDigits = formatInfo.significantDigits || 1, absValue;
        if (unitPower.toString().toLowerCase() === 'auto') {
            showTrailingZeros = false;
            absValue = Math.abs(value);
            if (significantDigits < 1)
                significantDigits = 1;
            if (absValue >= 1000000000) {
                unitPower = 3;
                absValue /= 1000000000;
            }
            else if (absValue >= 1000000) {
                unitPower = 2;
                absValue /= 1000000;
            }
            else if (absValue >= 1000) {
                unitPower = 1;
                absValue /= 1000;
            }
            else
                unitPower = 0;
            if (absValue === 0)
                precision = 0;
            else if (absValue < 1) {
                precision = significantDigits;
                var smallValue = Math.pow(10, -significantDigits);
                while (absValue < smallValue) {
                    smallValue /= 10;
                    precision++;
                }
            }
            else {
                if (absValue >= 100)
                    precision = significantDigits - 3;
                else if (absValue >= 10)
                    precision = significantDigits - 2;
                else
                    precision = significantDigits - 1;
            }
        }
        if (precision < 0) {
            precision = 0;
        }
        return {
            unitPower: unitPower,
            precision: precision,
            showTrailingZeros: showTrailingZeros,
            includeGroupSeparator: includeGroupSeparator
        };
    }
    static _insertUnitPostfix(formattedNumber, unitPower) {
        var lastDigitReg = /(\d)([^\d]*)$/;
        return unitPower > 0
            ? formattedNumber.replace(lastDigitReg, '$1' + _default_1.getLocalizationById(this.defaultLargeNumberFormatPostfixes[unitPower]) + '$2')
            : formattedNumber;
    }
    static _generateNumericFormatConfig(settings, value) {
        var that = this, config;
        if (!settings.showTrailingZeros) {
            settings.precision = Math.min(settings.precision, settings.signsAfterPointCount);
        }
        config = that._normalizeFormatConfig(settings.formatType, settings.precision, value);
        config.useGrouping = settings.includeGroupSeparator;
        if (settings.significantDigits && value) {
            _jquery_helpers_1.extend(config, {
                minimumSignificantDigits: settings.showTrailingZeros ? settings.significantDigits : 1,
                maximumSignificantDigits: settings.significantDigits
            });
        }
        return config;
    }
    static _countSignsAfterPoint(num, formatType) {
        var strNum = String(num), pointPos = strNum.indexOf('.');
        if (formatType == 'percent') {
            pointPos += 2;
        }
        if (pointPos < 0) {
            return 0;
        }
        return strNum.substr(pointPos + 1, strNum.length).length;
    }
    static _excludeTrailingZeros(strValue, floatingSymbol) {
        var floatingIndex = strValue.indexOf(floatingSymbol), stopIndex, i;
        if (floatingIndex < 0)
            return strValue;
        stopIndex = strValue.length;
        for (i = stopIndex - 1; i >= floatingIndex && (strValue[i] === '0' || i === floatingIndex); i--) {
            stopIndex--;
        }
        return strValue.substring(0, stopIndex);
    }
    static _normalizeFormatConfig(format, precision, value) {
        var config = number_1.default._normalizeFormatConfig(format, {
            precision,
            useCurrencyAccountingStyle: legacy_settings_1.DashboardPrivateSettings.useCurrencyAccountingStyle
        }, value);
        if (format === 'decimal') {
            config = Object.assign(Object.assign({}, config), {
                minimumIntegerDigits: precision || 1,
                useGrouping: false,
                maximumFractionDigits: 0,
                round: value < 0 ? 'ceil' : 'floor'
            });
        }
        else {
            config = Object.assign(Object.assign({}, config), {
                minimumFractionDigits: precision,
                maximumFractionDigits: precision
            });
        }
        return config;
    }
    static _getNumberByPower(number, power, base) {
        var result = number;
        while (power > 0) {
            result = result / base;
            power--;
        }
        while (power < 0) {
            result = result * base;
            power++;
        }
        return result;
    }
}
exports.DashboardFormatHelper = DashboardFormatHelper;
DashboardFormatHelper.defaultLargeNumberFormatPostfixes = {
    1: 'DashboardStringId.NumericFormatUnitSymbolThousands',
    2: 'DashboardStringId.NumericFormatUnitSymbolMillions',
    3: 'DashboardStringId.NumericFormatUnitSymbolBillions',
    4: 'T'
};
DashboardFormatHelper.romanDigits = ['I', 'II', 'III', 'IV'];
