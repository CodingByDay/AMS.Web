/**
 * DevExtreme (cjs/localization/intl/date.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _extend = require("../../core/utils/extend");
var _core = _interopRequireDefault(require("../core"));

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
var SYMBOLS_TO_REMOVE_REGEX = /[\u200E\u200F]/g;
var NARROW_NO_BREAK_SPACE_REGEX = /[\u202F]/g;
var getIntlFormatter = function(format) {
    return function(date) {
        if (!format.timeZoneName) {
            var year = date.getFullYear();
            var recognizableAsTwentyCentury = String(year).length < 3;
            var temporaryYearValue = recognizableAsTwentyCentury ? year + 400 : year;
            var utcDate = new Date(Date.UTC(temporaryYearValue, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
            if (recognizableAsTwentyCentury) {
                utcDate.setFullYear(year)
            }
            var utcFormat = (0, _extend.extend)({
                timeZone: "UTC"
            }, format);
            return formatDateTime(utcDate, utcFormat)
        }
        return formatDateTime(date, format)
    }
};
var formattersCache = {};
var getFormatter = function(format) {
    var key = _core.default.locale() + "/" + JSON.stringify(format);
    if (!formattersCache[key]) {
        formattersCache[key] = new Intl.DateTimeFormat(_core.default.locale(), format).format
    }
    return formattersCache[key]
};

function formatDateTime(date, format) {
    return getFormatter(format)(date).replace(SYMBOLS_TO_REMOVE_REGEX, "").replace(NARROW_NO_BREAK_SPACE_REGEX, " ")
}
var formatNumber = function(number) {
    return new Intl.NumberFormat(_core.default.locale()).format(number)
};
var getAlternativeNumeralsMap = function() {
    var numeralsMapCache = {};
    return function(locale) {
        if (!(locale in numeralsMapCache)) {
            if ("0" === formatNumber(0)) {
                numeralsMapCache[locale] = false;
                return false
            }
            numeralsMapCache[locale] = {};
            for (var i = 0; i < 10; ++i) {
                numeralsMapCache[locale][formatNumber(i)] = i
            }
        }
        return numeralsMapCache[locale]
    }
}();
var normalizeNumerals = function(dateString) {
    var alternativeNumeralsMap = getAlternativeNumeralsMap(_core.default.locale());
    if (!alternativeNumeralsMap) {
        return dateString
    }
    return dateString.split("").map((function(sign) {
        return sign in alternativeNumeralsMap ? String(alternativeNumeralsMap[sign]) : sign
    })).join("")
};
var removeLeadingZeroes = function(str) {
    return str.replace(/(\D)0+(\d)/g, "$1$2")
};
var dateStringEquals = function(actual, expected) {
    return removeLeadingZeroes(actual) === removeLeadingZeroes(expected)
};
var normalizeMonth = function(text) {
    return text.replace("d\u2019", "de ")
};
var intlFormats = {
    day: {
        day: "numeric"
    },
    dayofweek: {
        weekday: "long"
    },
    longdate: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    },
    longdatelongtime: {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    },
    longtime: {
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    },
    month: {
        month: "long"
    },
    monthandday: {
        month: "long",
        day: "numeric"
    },
    monthandyear: {
        year: "numeric",
        month: "long"
    },
    shortdate: {},
    shorttime: {
        hour: "numeric",
        minute: "numeric"
    },
    shortyear: {
        year: "2-digit"
    },
    year: {
        year: "numeric"
    }
};
Object.defineProperty(intlFormats, "shortdateshorttime", {
    get: function() {
        var defaultOptions = Intl.DateTimeFormat(_core.default.locale()).resolvedOptions();
        return {
            year: defaultOptions.year,
            month: defaultOptions.month,
            day: defaultOptions.day,
            hour: "numeric",
            minute: "numeric"
        }
    }
});
var getIntlFormat = function(format) {
    return "string" === typeof format && intlFormats[format.toLowerCase()]
};
var monthNameStrategies = {
    standalone: function(monthIndex, monthFormat) {
        var date = new Date(1999, monthIndex, 13, 1);
        var dateString = getIntlFormatter({
            month: monthFormat
        })(date);
        return dateString
    },
    format: function(monthIndex, monthFormat) {
        var date = new Date(0, monthIndex, 13, 1);
        var dateString = normalizeMonth(getIntlFormatter({
            day: "numeric",
            month: monthFormat
        })(date));
        var parts = dateString.split(" ").filter((function(part) {
            return part.indexOf("13") < 0
        }));
        if (1 === parts.length) {
            return parts[0]
        } else if (2 === parts.length) {
            return parts[0].length > parts[1].length ? parts[0] : parts[1]
        }
        return monthNameStrategies.standalone(monthIndex, monthFormat)
    }
};
var _default = {
    engine: function() {
        return "intl"
    },
    getMonthNames: function(format, type) {
        var monthFormat = {
            wide: "long",
            abbreviated: "short",
            narrow: "narrow"
        } [format || "wide"];
        type = "format" === type ? type : "standalone";
        return Array.apply(null, new Array(12)).map((function(_, monthIndex) {
            return monthNameStrategies[type](monthIndex, monthFormat)
        }))
    },
    getDayNames: function(format) {
        var result = function(format) {
            return Array.apply(null, new Array(7)).map((function(_, dayIndex) {
                return getIntlFormatter({
                    weekday: format
                })(new Date(0, 0, dayIndex))
            }))
        }({
            wide: "long",
            abbreviated: "short",
            short: "narrow",
            narrow: "narrow"
        } [format || "wide"]);
        return result
    },
    getPeriodNames: function() {
        var hour12Formatter = getIntlFormatter({
            hour: "numeric",
            hour12: true
        });
        return [1, 13].map((function(hours) {
            var hourNumberText = formatNumber(1);
            var timeParts = hour12Formatter(new Date(0, 0, 1, hours)).split(hourNumberText);
            if (2 !== timeParts.length) {
                return ""
            }
            var biggerPart = timeParts[0].length > timeParts[1].length ? timeParts[0] : timeParts[1];
            return biggerPart.trim()
        }))
    },
    format: function(date, _format) {
        if (!date) {
            return
        }
        if (!_format) {
            return date
        }
        if ("function" !== typeof _format && !_format.formatter) {
            _format = _format.type || _format
        }
        var intlFormat = getIntlFormat(_format);
        if (intlFormat) {
            return getIntlFormatter(intlFormat)(date)
        }
        var formatType = _typeof(_format);
        if (_format.formatter || "function" === formatType || "string" === formatType) {
            return this.callBase.apply(this, arguments)
        }
        return getIntlFormatter(_format)(date)
    },
    parse: function(dateString, format) {
        var _this = this;
        var formatter;
        if (format && !format.parser && "string" === typeof dateString) {
            dateString = normalizeMonth(dateString);
            formatter = function(date) {
                return normalizeMonth(_this.format(date, format))
            }
        }
        return this.callBase(dateString, formatter || format)
    },
    _parseDateBySimpleFormat: function(dateString, format) {
        var _this2 = this;
        dateString = normalizeNumerals(dateString);
        var formatParts = this.getFormatParts(format);
        var dateParts = dateString.split(/\D+/).filter((function(part) {
            return part.length > 0
        }));
        if (formatParts.length !== dateParts.length) {
            return
        }
        var dateArgs = this._generateDateArgs(formatParts, dateParts);
        var constructValidDate = function(ampmShift) {
            var parsedDate = function(dateArgs, ampmShift) {
                var hoursShift = ampmShift ? 12 : 0;
                return new Date(dateArgs.year, dateArgs.month, dateArgs.day, (dateArgs.hours + hoursShift) % 24, dateArgs.minutes, dateArgs.seconds)
            }(dateArgs, ampmShift);
            if (dateStringEquals(normalizeNumerals(_this2.format(parsedDate, format)), dateString)) {
                return parsedDate
            }
        };
        return constructValidDate(false) || constructValidDate(true)
    },
    _generateDateArgs: function(formatParts, dateParts) {
        var currentDate = new Date;
        var dateArgs = {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
            hours: 0,
            minutes: 0,
            seconds: 0
        };
        formatParts.forEach((function(formatPart, index) {
            var datePart = dateParts[index];
            var parsed = parseInt(datePart, 10);
            if ("month" === formatPart) {
                parsed -= 1
            }
            dateArgs[formatPart] = parsed
        }));
        return dateArgs
    },
    formatUsesMonthName: function(format) {
        if ("object" === _typeof(format) && !(format.type || format.format)) {
            return "long" === format.month
        }
        return this.callBase.apply(this, arguments)
    },
    formatUsesDayName: function(format) {
        if ("object" === _typeof(format) && !(format.type || format.format)) {
            return "long" === format.weekday
        }
        return this.callBase.apply(this, arguments)
    },
    getTimeSeparator: function() {
        return normalizeNumerals(formatDateTime(new Date(2001, 1, 1, 11, 11), {
            hour: "numeric",
            minute: "numeric",
            hour12: false
        })).replace(/\d/g, "")
    },
    getFormatParts: function(format) {
        if ("string" === typeof format) {
            return this.callBase(format)
        }
        var intlFormat = (0, _extend.extend)({}, intlFormats[format.toLowerCase()]);
        var date = new Date(2001, 2, 4, 5, 6, 7);
        var formattedDate = getIntlFormatter(intlFormat)(date);
        formattedDate = normalizeNumerals(formattedDate);
        return [{
            name: "year",
            value: 1
        }, {
            name: "month",
            value: 3
        }, {
            name: "day",
            value: 4
        }, {
            name: "hours",
            value: 5
        }, {
            name: "minutes",
            value: 6
        }, {
            name: "seconds",
            value: 7
        }].map((function(part) {
            return {
                name: part.name,
                index: formattedDate.indexOf(part.value)
            }
        })).filter((function(part) {
            return part.index > -1
        })).sort((function(a, b) {
            return a.index - b.index
        })).map((function(part) {
            return part.name
        }))
    }
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
