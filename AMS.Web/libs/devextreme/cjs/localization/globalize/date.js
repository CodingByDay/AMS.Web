/**
 * DevExtreme (cjs/localization/globalize/date.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}
require("./core");
require("./number");
require("globalize/date");
var _globalize = _interopRequireDefault(require("globalize"));
var _date2 = _interopRequireDefault(require("../date"));
var _type = require("../../core/utils/type");
var iteratorUtils = _interopRequireWildcard(require("../../core/utils/iterator"));

function _getRequireWildcardCache(nodeInterop) {
    if ("function" !== typeof WeakMap) {
        return null
    }
    var cacheBabelInterop = new WeakMap;
    var cacheNodeInterop = new WeakMap;
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop
    })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj
    }
    if (null === obj || "object" !== _typeof(obj) && "function" !== typeof obj) {
        return {
            default: obj
        }
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj)
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
        if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc)
            } else {
                newObj[key] = obj[key]
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj)
    }
    return newObj
}

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var ACCEPTABLE_JSON_FORMAT_PROPERTIES = ["skeleton", "date", "time", "datetime", "raw"];
var RTL_MARKS_REGEX = /[\u200E\u200F]/g;
if (_globalize.default && _globalize.default.formatDate) {
    if ("en" === _globalize.default.locale().locale) {
        _globalize.default.locale("en")
    }
    var formattersCache = {};
    var FORMATS_TO_GLOBALIZE_MAP = {
        shortdate: {
            path: "dateTimeFormats/availableFormats/yMd"
        },
        shorttime: {
            path: "timeFormats/short"
        },
        longdate: {
            path: "dateFormats/full"
        },
        longtime: {
            path: "timeFormats/medium"
        },
        monthandday: {
            path: "dateTimeFormats/availableFormats/MMMMd"
        },
        monthandyear: {
            path: "dateTimeFormats/availableFormats/yMMMM"
        },
        quarterandyear: {
            path: "dateTimeFormats/availableFormats/yQQQ"
        },
        day: {
            path: "dateTimeFormats/availableFormats/d"
        },
        year: {
            path: "dateTimeFormats/availableFormats/y"
        },
        shortdateshorttime: {
            path: "dateTimeFormats/short",
            parts: ["shorttime", "shortdate"]
        },
        longdatelongtime: {
            path: "dateTimeFormats/medium",
            parts: ["longtime", "longdate"]
        },
        month: {
            pattern: "LLLL"
        },
        shortyear: {
            pattern: "yy"
        },
        dayofweek: {
            pattern: "EEEE"
        },
        quarter: {
            pattern: "QQQ"
        },
        millisecond: {
            pattern: "SSS"
        },
        hour: {
            pattern: "HH"
        },
        minute: {
            pattern: "mm"
        },
        second: {
            pattern: "ss"
        }
    };
    var globalizeDateLocalization = {
        engine: function() {
            return "globalize"
        },
        _getPatternByFormat: function(format) {
            var that = this;
            var lowerFormat = format.toLowerCase();
            var globalizeFormat = FORMATS_TO_GLOBALIZE_MAP[lowerFormat];
            if ("datetime-local" === lowerFormat) {
                return "yyyy-MM-ddTHH':'mm':'ss"
            }
            if (!globalizeFormat) {
                return
            }
            var result = globalizeFormat.path && that._getFormatStringByPath(globalizeFormat.path) || globalizeFormat.pattern;
            if (globalizeFormat.parts) {
                iteratorUtils.each(globalizeFormat.parts, (function(index, part) {
                    result = result.replace("{" + index + "}", that._getPatternByFormat(part))
                }))
            }
            return result
        },
        _getFormatStringByPath: function(path) {
            return _globalize.default.locale().main("dates/calendars/gregorian/" + path)
        },
        getPeriodNames: function(format, type) {
            format = format || "wide";
            type = "format" === type ? type : "stand-alone";
            var json = _globalize.default.locale().main("dates/calendars/gregorian/dayPeriods/".concat(type, "/").concat(format));
            return [json.am, json.pm]
        },
        getMonthNames: function(format, type) {
            var months = _globalize.default.locale().main("dates/calendars/gregorian/months/" + ("format" === type ? type : "stand-alone") + "/" + (format || "wide"));
            return iteratorUtils.map(months, (function(month) {
                return month
            }))
        },
        getDayNames: function(format) {
            var days = _globalize.default.locale().main("dates/calendars/gregorian/days/stand-alone/" + (format || "wide"));
            return iteratorUtils.map(days, (function(day) {
                return day
            }))
        },
        getTimeSeparator: function() {
            return _globalize.default.locale().main("numbers/symbols-numberSystem-latn/timeSeparator")
        },
        removeRtlMarks: function(text) {
            return text.replace(RTL_MARKS_REGEX, "")
        },
        format: function(date, _format) {
            if (!date) {
                return
            }
            if (!_format) {
                return date
            }
            var formatter;
            var formatCacheKey;
            if ("function" === typeof _format) {
                return _format(date)
            }
            if (_format.formatter) {
                return _format.formatter(date)
            }
            _format = _format.type || _format;
            if ("string" === typeof _format) {
                formatCacheKey = _globalize.default.locale().locale + ":" + _format;
                formatter = formattersCache[formatCacheKey];
                if (!formatter) {
                    _format = {
                        raw: this._getPatternByFormat(_format) || _format
                    };
                    formatter = formattersCache[formatCacheKey] = _globalize.default.dateFormatter(_format)
                }
            } else {
                if (!this._isAcceptableFormat(_format)) {
                    return
                }
                formatter = _globalize.default.dateFormatter(_format)
            }
            return this.removeRtlMarks(formatter(date))
        },
        parse: function(text, format) {
            if (!text) {
                return
            }
            if (!format || "function" === typeof format || (0, _type.isObject)(format) && !this._isAcceptableFormat(format)) {
                if (format) {
                    var parsedValue = this.callBase(text, format);
                    if (parsedValue) {
                        return parsedValue
                    }
                }
                return _globalize.default.parseDate(text)
            }
            if (format.parser) {
                return format.parser(text)
            }
            if ("string" === typeof format) {
                format = {
                    raw: this._getPatternByFormat(format) || format
                }
            }
            var parsedDate = _globalize.default.parseDate(text, format);
            return parsedDate ? parsedDate : this.callBase(text, format)
        },
        _isAcceptableFormat: function(format) {
            if (format.parser) {
                return true
            }
            for (var i = 0; i < ACCEPTABLE_JSON_FORMAT_PROPERTIES.length; i++) {
                if (Object.prototype.hasOwnProperty.call(format, ACCEPTABLE_JSON_FORMAT_PROPERTIES[i])) {
                    return true
                }
            }
        },
        firstDayOfWeekIndex: function() {
            var firstDay = _globalize.default.locale().supplemental.weekData.firstDay();
            return this._getDayKeys().indexOf(firstDay)
        },
        _getDayKeys: function() {
            var days = _globalize.default.locale().main("dates/calendars/gregorian/days/format/short");
            return iteratorUtils.map(days, (function(day, key) {
                return key
            }))
        }
    };
    _date2.default.resetInjection();
    _date2.default.inject(globalizeDateLocalization)
}
