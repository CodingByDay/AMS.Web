/**
 * DevExtreme (cjs/core/utils/common.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.splitPair = exports.pairToObject = exports.normalizeKey = exports.noop = exports.grep = exports.getKeyHash = exports.findBestMatches = exports.executeAsync = exports.escapeRegExp = exports.equalByValue = exports.ensureDefined = exports.denormalizeKey = exports.deferUpdater = exports.deferUpdate = exports.deferRenderer = exports.deferRender = exports.asyncNoop = exports.applyServerDecimalSeparator = void 0;
var _config = _interopRequireDefault(require("../config"));
var _guid = _interopRequireDefault(require("../guid"));
var _deferred = require("../utils/deferred");
var _data = require("./data");
var _iterator = require("./iterator");
var _type = require("./type");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
var ensureDefined = function(value, defaultValue) {
    return (0, _type.isDefined)(value) ? value : defaultValue
};
exports.ensureDefined = ensureDefined;
var executeAsync = function(action, context) {
    var deferred = new _deferred.Deferred;
    var normalizedContext = context || this;
    var task = {
        promise: deferred.promise(),
        abort: function() {
            clearTimeout(timerId);
            deferred.rejectWith(normalizedContext)
        }
    };
    var callback = function() {
        var result = action.call(normalizedContext);
        if (result && result.done && (0, _type.isFunction)(result.done)) {
            result.done((function() {
                deferred.resolveWith(normalizedContext)
            }))
        } else {
            deferred.resolveWith(normalizedContext)
        }
    };
    var timerId = (arguments[2] || setTimeout)(callback, "number" === typeof context ? context : 0);
    return task
};
exports.executeAsync = executeAsync;
var delayedFuncs = [];
var delayedNames = [];
var delayedDeferreds = [];
var executingName;
var deferExecute = function(name, func, deferred) {
    if (executingName && executingName !== name) {
        delayedFuncs.push(func);
        delayedNames.push(name);
        deferred = deferred || new _deferred.Deferred;
        delayedDeferreds.push(deferred);
        return deferred
    } else {
        var oldExecutingName = executingName;
        var currentDelayedCount = delayedDeferreds.length;
        executingName = name;
        var result = func();
        if (!result) {
            if (delayedDeferreds.length > currentDelayedCount) {
                result = _deferred.when.apply(this, delayedDeferreds.slice(currentDelayedCount))
            } else if (deferred) {
                deferred.resolve()
            }
        }
        executingName = oldExecutingName;
        if (deferred && result && result.done) {
            result.done(deferred.resolve).fail(deferred.reject)
        }
        if (!executingName && delayedFuncs.length) {
            ("render" === delayedNames.shift() ? deferRender : deferUpdate)(delayedFuncs.shift(), delayedDeferreds.shift())
        }
        return result || (0, _deferred.when)()
    }
};
var deferRender = function(func, deferred) {
    return deferExecute("render", func, deferred)
};
exports.deferRender = deferRender;
var deferUpdate = function(func, deferred) {
    return deferExecute("update", func, deferred)
};
exports.deferUpdate = deferUpdate;
var deferRenderer = function(func) {
    return function() {
        var that = this;
        return deferExecute("render", (function() {
            return func.call(that)
        }))
    }
};
exports.deferRenderer = deferRenderer;
var deferUpdater = function(func) {
    return function() {
        var that = this;
        return deferExecute("update", (function() {
            return func.call(that)
        }))
    }
};
exports.deferUpdater = deferUpdater;
var findBestMatches = function(targetFilter, items, mapFn) {
    var bestMatches = [];
    var maxMatchCount = 0;
    (0, _iterator.each)(items, (function(index, itemSrc) {
        var matchCount = 0;
        var item = mapFn ? mapFn(itemSrc) : itemSrc;
        (0, _iterator.each)(targetFilter, (function(paramName, targetValue) {
            var value = item[paramName];
            if (void 0 === value) {
                return
            }
            if (match(value, targetValue)) {
                matchCount++;
                return
            }
            matchCount = -1;
            return false
        }));
        if (matchCount < maxMatchCount) {
            return
        }
        if (matchCount > maxMatchCount) {
            bestMatches.length = 0;
            maxMatchCount = matchCount
        }
        bestMatches.push(itemSrc)
    }));
    return bestMatches
};
exports.findBestMatches = findBestMatches;
var match = function(value, targetValue) {
    if (Array.isArray(value) && Array.isArray(targetValue)) {
        var mismatch = false;
        (0, _iterator.each)(value, (function(index, valueItem) {
            if (valueItem !== targetValue[index]) {
                mismatch = true;
                return false
            }
        }));
        if (mismatch) {
            return false
        }
        return true
    }
    if (value === targetValue) {
        return true
    }
    return false
};
var splitPair = function(raw) {
    var _raw$x, _raw$y;
    switch ((0, _type.type)(raw)) {
        case "string":
            return raw.split(/\s+/, 2);
        case "object":
            return [null !== (_raw$x = raw.x) && void 0 !== _raw$x ? _raw$x : raw.h, null !== (_raw$y = raw.y) && void 0 !== _raw$y ? _raw$y : raw.v];
        case "number":
            return [raw];
        case "array":
            return raw;
        default:
            return null
    }
};
exports.splitPair = splitPair;
var normalizeKey = function(id) {
    var key = (0, _type.isString)(id) ? id : id.toString();
    var arr = key.match(/[^a-zA-Z0-9_]/g);
    arr && (0, _iterator.each)(arr, (function(_, sign) {
        key = key.replace(sign, "__" + sign.charCodeAt() + "__")
    }));
    return key
};
exports.normalizeKey = normalizeKey;
var denormalizeKey = function(key) {
    var arr = key.match(/__\d+__/g);
    arr && arr.forEach((function(char) {
        var charCode = parseInt(char.replace("__", ""));
        key = key.replace(char, String.fromCharCode(charCode))
    }));
    return key
};
exports.denormalizeKey = denormalizeKey;
var pairToObject = function(raw, preventRound) {
    var pair = splitPair(raw);
    var h = preventRound ? parseFloat(pair && pair[0]) : parseInt(pair && pair[0], 10);
    var v = preventRound ? parseFloat(pair && pair[1]) : parseInt(pair && pair[1], 10);
    if (!isFinite(h)) {
        h = 0
    }
    if (!isFinite(v)) {
        v = h
    }
    return {
        h: h,
        v: v
    }
};
exports.pairToObject = pairToObject;
var getKeyHash = function(key) {
    if (key instanceof _guid.default) {
        return key.toString()
    } else if ((0, _type.isObject)(key) || Array.isArray(key)) {
        try {
            var keyHash = JSON.stringify(key);
            return "{}" === keyHash ? key : keyHash
        } catch (e) {
            return key
        }
    }
    return key
};
exports.getKeyHash = getKeyHash;
var escapeRegExp = function(string) {
    return string.replace(/[[\]{}\-()*+?.\\^$|\s]/g, "\\$&")
};
exports.escapeRegExp = escapeRegExp;
var applyServerDecimalSeparator = function(value) {
    var separator = (0, _config.default)().serverDecimalSeparator;
    if ((0, _type.isDefined)(value)) {
        value = value.toString().replace(".", separator)
    }
    return value
};
exports.applyServerDecimalSeparator = applyServerDecimalSeparator;
var noop = function() {};
exports.noop = noop;
var asyncNoop = function() {
    return (new _deferred.Deferred).resolve().promise()
};
exports.asyncNoop = asyncNoop;
var grep = function(elements, checkFunction, invert) {
    var result = [];
    var check;
    var expectedCheck = !invert;
    for (var i = 0; i < elements.length; i++) {
        check = !!checkFunction(elements[i], i);
        if (check === expectedCheck) {
            result.push(elements[i])
        }
    }
    return result
};
exports.grep = grep;
var compareArrays = function(array1, array2, depth, options) {
    if (array1.length !== array2.length) {
        return false
    }
    return !array1.some((function(item, idx) {
        return !compareByValue(item, array2[idx], depth + 1, _extends({}, options, {
            strict: true
        }))
    }))
};
var compareObjects = function(object1, object2, depth, options) {
    var keys1 = Object.keys(object1);
    var keys2 = Object.keys(object2);
    if (keys1.length !== keys2.length) {
        return false
    }
    var keys2Set = new Set(keys2);
    return !keys1.some((function(key) {
        return !keys2Set.has(key) || !compareByValue(object1[key], object2[key], depth + 1, options)
    }))
};
var DEFAULT_EQUAL_BY_VALUE_OPTS = {
    maxDepth: 3,
    strict: true
};
var compareByValue = function(value1, value2, depth, options) {
    var strict = options.strict,
        maxDepth = options.maxDepth;
    var comparable1 = (0, _data.toComparable)(value1, true);
    var comparable2 = (0, _data.toComparable)(value2, true);
    var comparisonResult = strict ? comparable1 === comparable2 : comparable1 == comparable2;
    switch (true) {
        case comparisonResult:
        case depth >= maxDepth:
            return true;
        case (0, _type.isObject)(comparable1) && (0, _type.isObject)(comparable2):
            return compareObjects(comparable1, comparable2, depth, options);
        case Array.isArray(comparable1) && Array.isArray(comparable2):
            return compareArrays(comparable1, comparable2, depth, options);
        default:
            return false
    }
};
var equalByValue = function(value1, value2) {
    var options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : DEFAULT_EQUAL_BY_VALUE_OPTS;
    var compareOptions = _extends({}, DEFAULT_EQUAL_BY_VALUE_OPTS, options);
    return compareByValue(value1, value2, 0, compareOptions)
};
exports.equalByValue = equalByValue;
