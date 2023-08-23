/**
 * DevExtreme (cjs/localization/ldml/date.parser.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isPossibleForParsingFormat = exports.getRegExpInfo = exports.getPatternSetters = exports.getParser = void 0;
var _common = require("../../core/utils/common");
var _console = require("../../core/utils/console");
var FORMAT_TYPES = {
    3: "abbreviated",
    4: "wide",
    5: "narrow"
};
var monthRegExpGenerator = function(count, dateParts) {
    if (count > 2) {
        return Object.keys(FORMAT_TYPES).map((function(count) {
            return ["format", "standalone"].map((function(type) {
                return dateParts.getMonthNames(FORMAT_TYPES[count], type).join("|")
            })).join("|")
        })).join("|")
    }
    return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]"
};
var PATTERN_REGEXPS = {
    ":": function(count, dateParts) {
        var countSuffix = count > 1 ? "{".concat(count, "}") : "";
        var timeSeparator = (0, _common.escapeRegExp)(dateParts.getTimeSeparator());
        ":" !== timeSeparator && (timeSeparator = "".concat(timeSeparator, "|:"));
        return "".concat(timeSeparator).concat(countSuffix)
    },
    y: function(count) {
        return 2 === count ? "[0-9]{".concat(count, "}") : "[0-9]+?"
    },
    M: monthRegExpGenerator,
    L: monthRegExpGenerator,
    Q: function(count, dateParts) {
        if (count > 2) {
            return dateParts.getQuarterNames(FORMAT_TYPES[count], "format").join("|")
        }
        return "0?[1-4]"
    },
    E: function(count, dateParts) {
        return "\\D*"
    },
    a: function(count, dateParts) {
        return dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], "format").join("|")
    },
    d: function(count) {
        return 2 === count ? "3[01]|[12][0-9]|0?[1-9]" : "0??[1-9]|[12][0-9]|3[01]"
    },
    H: function(count) {
        return 2 === count ? "2[0-3]|1[0-9]|0?[0-9]" : "0??[0-9]|1[0-9]|2[0-3]"
    },
    h: function(count) {
        return 2 === count ? "1[012]|0?[1-9]" : "0??[1-9]|1[012]"
    },
    m: function(count) {
        return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]"
    },
    s: function(count) {
        return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]"
    },
    S: function(count) {
        return "[0-9]{1,".concat(count, "}")
    },
    w: function(count) {
        return 2 === count ? "[1-5][0-9]|0?[0-9]" : "0??[0-9]|[1-5][0-9]"
    }
};
var parseNumber = Number;
var caseInsensitiveIndexOf = function(array, value) {
    return array.map((function(item) {
        return item.toLowerCase()
    })).indexOf(value.toLowerCase())
};
var monthPatternParser = function(text, count, dateParts) {
    if (count > 2) {
        return ["format", "standalone"].map((function(type) {
            return Object.keys(FORMAT_TYPES).map((function(count) {
                var monthNames = dateParts.getMonthNames(FORMAT_TYPES[count], type);
                return caseInsensitiveIndexOf(monthNames, text)
            }))
        })).reduce((function(a, b) {
            return a.concat(b)
        })).filter((function(index) {
            return index >= 0
        }))[0]
    }
    return parseNumber(text) - 1
};
var PATTERN_PARSERS = {
    y: function(text, count) {
        var year = parseNumber(text);
        if (2 === count) {
            return year < 30 ? 2e3 + year : 1900 + year
        }
        return year
    },
    M: monthPatternParser,
    L: monthPatternParser,
    Q: function(text, count, dateParts) {
        if (count > 2) {
            return dateParts.getQuarterNames(FORMAT_TYPES[count], "format").indexOf(text)
        }
        return parseNumber(text) - 1
    },
    E: function(text, count, dateParts) {
        var dayNames = dateParts.getDayNames(FORMAT_TYPES[count < 3 ? 3 : count], "format");
        return caseInsensitiveIndexOf(dayNames, text)
    },
    a: function(text, count, dateParts) {
        var periodNames = dateParts.getPeriodNames(FORMAT_TYPES[count < 3 ? 3 : count], "format");
        return caseInsensitiveIndexOf(periodNames, text)
    },
    d: parseNumber,
    H: parseNumber,
    h: parseNumber,
    m: parseNumber,
    s: parseNumber,
    S: function(text, count) {
        count = Math.max(count, 3);
        text = text.slice(0, 3);
        while (count < 3) {
            text += "0";
            count++
        }
        return parseNumber(text)
    }
};
var ORDERED_PATTERNS = ["y", "M", "d", "h", "m", "s", "S"];
var PATTERN_SETTERS = {
    y: "setFullYear",
    M: "setMonth",
    L: "setMonth",
    a: function(date, value, datePartValues) {
        var hours = date.getHours();
        var hourPartValue = datePartValues.h;
        if (void 0 !== hourPartValue && hourPartValue !== hours) {
            hours--
        }
        if (!value && 12 === hours) {
            hours = 0
        } else if (value && 12 !== hours) {
            hours += 12
        }
        date.setHours(hours)
    },
    d: "setDate",
    H: "setHours",
    h: "setHours",
    m: "setMinutes",
    s: "setSeconds",
    S: "setMilliseconds"
};
var getSameCharCount = function(text, index) {
    var char = text[index];
    if (!char) {
        return 0
    }
    var count = 0;
    do {
        index++;
        count++
    } while (text[index] === char);
    return count
};
var createPattern = function(char, count) {
    var result = "";
    for (var i = 0; i < count; i++) {
        result += char
    }
    return result
};
var getRegExpInfo = function(format, dateParts) {
    var regexpText = "";
    var stubText = "";
    var isEscaping;
    var patterns = [];
    var addPreviousStub = function() {
        if (stubText) {
            patterns.push("'".concat(stubText, "'"));
            regexpText += "".concat((0, _common.escapeRegExp)(stubText), ")");
            stubText = ""
        }
    };
    for (var i = 0; i < format.length; i++) {
        var char = format[i];
        var isEscapeChar = "'" === char;
        var regexpPart = PATTERN_REGEXPS[char];
        if (isEscapeChar) {
            isEscaping = !isEscaping;
            if ("'" !== format[i - 1]) {
                continue
            }
        }
        if (regexpPart && !isEscaping) {
            var count = getSameCharCount(format, i);
            var pattern = createPattern(char, count);
            addPreviousStub();
            patterns.push(pattern);
            regexpText += "(".concat(regexpPart(count, dateParts), ")");
            i += count - 1
        } else {
            if (!stubText) {
                regexpText += "("
            }
            stubText += char
        }
    }
    addPreviousStub();
    if (!isPossibleForParsingFormat(patterns)) {
        _console.logger.warn("The following format may be parsed incorrectly: ".concat(format, "."))
    }
    return {
        patterns: patterns,
        regexp: new RegExp("^".concat(regexpText, "$"), "i")
    }
};
exports.getRegExpInfo = getRegExpInfo;
var digitFieldSymbols = ["d", "H", "h", "m", "s", "w", "M", "L", "Q"];
var isPossibleForParsingFormat = function(patterns) {
    var isDigitPattern = function(pattern) {
        if (!pattern) {
            return false
        }
        var char = pattern[0];
        return ["y", "S"].includes(char) || digitFieldSymbols.includes(char) && pattern.length < 3
    };
    var possibleForParsing = true;
    var ambiguousDigitPatternsCount = 0;
    return patterns.every((function(pattern, index, patterns) {
        if (isDigitPattern(pattern)) {
            if (function(pattern) {
                    return "S" !== pattern[0] && 2 !== pattern.length
                }(pattern)) {
                possibleForParsing = ++ambiguousDigitPatternsCount < 2
            }
            if (!isDigitPattern(patterns[index + 1])) {
                ambiguousDigitPatternsCount = 0
            }
        }
        return possibleForParsing
    }))
};
exports.isPossibleForParsingFormat = isPossibleForParsingFormat;
var getPatternSetters = function() {
    return PATTERN_SETTERS
};
exports.getPatternSetters = getPatternSetters;
var setPatternPart = function(date, pattern, text, dateParts, datePartValues) {
    var patternChar = pattern[0];
    var partSetter = PATTERN_SETTERS[patternChar];
    var partParser = PATTERN_PARSERS[patternChar];
    if (partSetter && partParser) {
        var value = partParser(text, pattern.length, dateParts);
        datePartValues[pattern] = value;
        if (date[partSetter]) {
            date[partSetter](value)
        } else {
            partSetter(date, value, datePartValues)
        }
    }
};
var setPatternPartFromNow = function(date, pattern, now) {
    var setterName = PATTERN_SETTERS[pattern];
    var getterName = "g" + setterName.substr(1);
    var value = now[getterName]();
    date[setterName](value)
};
var getShortPatterns = function(fullPatterns) {
    return fullPatterns.map((function(pattern) {
        if ("'" === pattern[0]) {
            return ""
        } else {
            return "H" === pattern[0] ? "h" : pattern[0]
        }
    }))
};
var getMaxOrderedPatternIndex = function(patterns) {
    var indexes = patterns.map((function(pattern) {
        return ORDERED_PATTERNS.indexOf(pattern)
    }));
    return Math.max.apply(Math, indexes)
};
var getOrderedFormatPatterns = function(formatPatterns) {
    var otherPatterns = formatPatterns.filter((function(pattern) {
        return ORDERED_PATTERNS.indexOf(pattern) < 0
    }));
    return ORDERED_PATTERNS.concat(otherPatterns)
};
var getParser = function(format, dateParts) {
    var regExpInfo = getRegExpInfo(format, dateParts);
    return function(text) {
        var regExpResult = regExpInfo.regexp.exec(text);
        if (regExpResult) {
            var now = new Date;
            var date = new Date(now.getFullYear(), 0, 1);
            var formatPatterns = getShortPatterns(regExpInfo.patterns);
            var maxPatternIndex = getMaxOrderedPatternIndex(formatPatterns);
            var orderedFormatPatterns = getOrderedFormatPatterns(formatPatterns);
            var datePartValues = {};
            orderedFormatPatterns.forEach((function(pattern, index) {
                if (!pattern || index < ORDERED_PATTERNS.length && index > maxPatternIndex) {
                    return
                }
                var patternIndex = formatPatterns.indexOf(pattern);
                if (patternIndex >= 0) {
                    var regExpPattern = regExpInfo.patterns[patternIndex];
                    var regExpText = regExpResult[patternIndex + 1];
                    setPatternPart(date, regExpPattern, regExpText, dateParts, datePartValues)
                } else {
                    setPatternPartFromNow(date, pattern, now)
                }
            }));
            return date
        }
        return null
    }
};
exports.getParser = getParser;
