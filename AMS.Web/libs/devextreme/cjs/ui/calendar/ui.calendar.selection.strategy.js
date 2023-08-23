/**
 * DevExtreme (cjs/ui/calendar/ui.calendar.selection.strategy.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}
var CalendarSelectionStrategy = function() {
    function CalendarSelectionStrategy(component) {
        this.calendar = component
    }
    var _proto = CalendarSelectionStrategy.prototype;
    _proto.dateOption = function(optionName) {
        return this.calendar._dateOption(optionName)
    };
    _proto.dateValue = function(value, e) {
        this.calendar._dateValue(value, e)
    };
    _proto.skipNavigate = function() {
        this.calendar._skipNavigate = true
    };
    _proto.updateAriaSelected = function(value, previousValue) {
        this.calendar._updateAriaSelected(value, previousValue);
        if (value[0] && this.calendar.option("currentDate").getTime() === value[0].getTime()) {
            this.calendar._updateAriaId(value[0])
        }
    };
    _proto.processValueChanged = function(value, previousValue) {
        var _value, _previousValue, _this = this;
        value = (null === (_value = value) || void 0 === _value ? void 0 : _value.map((function(item) {
            return _this._convertToDate(item)
        }))) || [];
        previousValue = (null === (_previousValue = previousValue) || void 0 === _previousValue ? void 0 : _previousValue.map((function(item) {
            return _this._convertToDate(item)
        }))) || [];
        this._updateViewsValue(value);
        this.updateAriaSelected(value, previousValue);
        if (!this._currentDateChanged) {
            this.calendar._initCurrentDate()
        }
        this._currentDateChanged = false
    };
    _proto._getLowestDateInArray = function(dates) {
        if (dates.length) {
            return new Date(Math.min.apply(Math, _toConsumableArray(dates)))
        }
    };
    _proto._convertToDate = function(value) {
        return this.calendar._convertToDate(value)
    };
    _proto._isMaxZoomLevel = function() {
        return this.calendar._isMaxZoomLevel()
    };
    _proto._updateViewsOption = function(optionName, optionValue) {
        this.calendar._updateViewsOption(optionName, optionValue)
    };
    _proto._updateViewsValue = function(value) {
        this._updateViewsOption("value", value)
    };
    _proto._updateCurrentDate = function(value) {
        this.calendar.option("currentDate", null !== value && void 0 !== value ? value : new Date)
    };
    return CalendarSelectionStrategy
}();
var _default = CalendarSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
