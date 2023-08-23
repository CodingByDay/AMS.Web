/**
 * DevExtreme (cjs/localization/globalize/number.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
require("./core");
var _globalize = _interopRequireDefault(require("globalize"));
var _number = _interopRequireDefault(require("../number"));
var _errors = _interopRequireDefault(require("../../core/errors"));
require("globalize/number");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}
var MAX_FRACTION_DIGITS = 20;
if (_globalize.default && _globalize.default.formatNumber) {
    if ("en" === _globalize.default.locale().locale) {
        _globalize.default.locale("en")
    }
    var formattersCache = {};
    var getFormatter = function(format) {
        var formatter;
        var formatCacheKey;
        if ("object" === _typeof(format)) {
            formatCacheKey = _globalize.default.locale().locale + ":" + JSON.stringify(format)
        } else {
            formatCacheKey = _globalize.default.locale().locale + ":" + format
        }
        formatter = formattersCache[formatCacheKey];
        if (!formatter) {
            formatter = formattersCache[formatCacheKey] = _globalize.default.numberFormatter(format)
        }
        return formatter
    };
    var globalizeNumberLocalization = {
        engine: function() {
            return "globalize"
        },
        _formatNumberCore: function(value, format, formatConfig) {
            if ("exponential" === format) {
                return this.callBase.apply(this, arguments)
            }
            return getFormatter(this._normalizeFormatConfig(format, formatConfig, value))(value)
        },
        _normalizeFormatConfig: function(format, formatConfig, value) {
            var config;
            if ("decimal" === format) {
                config = {
                    minimumIntegerDigits: formatConfig.precision || 1,
                    useGrouping: false,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: MAX_FRACTION_DIGITS,
                    round: value < 0 ? "ceil" : "floor"
                }
            } else {
                config = this._getPrecisionConfig(formatConfig.precision)
            }
            if ("percent" === format) {
                config.style = "percent"
            }
            return config
        },
        _getPrecisionConfig: function(precision) {
            var config;
            if (null === precision) {
                config = {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: MAX_FRACTION_DIGITS
                }
            } else {
                config = {
                    minimumFractionDigits: precision || 0,
                    maximumFractionDigits: precision || 0
                }
            }
            return config
        },
        format: function(value, _format) {
            if ("number" !== typeof value) {
                return value
            }
            _format = this._normalizeFormat(_format);
            if (!_format || "function" !== typeof _format && !_format.type && !_format.formatter) {
                return getFormatter(_format)(value)
            }
            return this.callBase.apply(this, arguments)
        },
        parse: function(text, format) {
            if (!text) {
                return
            }
            if (format && (format.parser || "string" === typeof format)) {
                return this.callBase.apply(this, arguments)
            }
            if (format) {
                _errors.default.log("W0011")
            }
            var result = _globalize.default.parseNumber(text);
            if (isNaN(result)) {
                result = this.callBase.apply(this, arguments)
            }
            return result
        }
    };
    _number.default.resetInjection();
    _number.default.inject(globalizeNumberLocalization)
}
