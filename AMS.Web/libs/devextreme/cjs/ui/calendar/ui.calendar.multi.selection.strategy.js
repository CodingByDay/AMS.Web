/**
 * DevExtreme (cjs/ui/calendar/ui.calendar.multi.selection.strategy.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _uiCalendarSelection = _interopRequireDefault(require("./ui.calendar.selection.strategy"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var CalendarMultiSelectionStrategy = function(_CalendarSelectionStr) {
    _inheritsLoose(CalendarMultiSelectionStrategy, _CalendarSelectionStr);

    function CalendarMultiSelectionStrategy(component) {
        var _this;
        _this = _CalendarSelectionStr.call(this, component) || this;
        _this.NAME = "MultiSelection";
        return _this
    }
    var _proto = CalendarMultiSelectionStrategy.prototype;
    _proto.getViewOptions = function() {
        return {
            value: this.dateOption("values"),
            range: [],
            selectionMode: "multi"
        }
    };
    _proto.selectValue = function(selectedValue, e) {
        var values = _toConsumableArray(this.dateOption("values"));
        var alreadySelectedIndex = values.findIndex((function(date) {
            return (null === date || void 0 === date ? void 0 : date.toDateString()) === selectedValue.toDateString()
        }));
        if (alreadySelectedIndex > -1) {
            values.splice(alreadySelectedIndex, 1)
        } else {
            values.push(selectedValue)
        }
        this.skipNavigate();
        this._updateCurrentDate(selectedValue);
        this._currentDateChanged = true;
        this.dateValue(values, e)
    };
    _proto.updateAriaSelected = function(value, previousValue) {
        var _value, _previousValue;
        null !== (_value = value) && void 0 !== _value ? _value : value = this.dateOption("values");
        null !== (_previousValue = previousValue) && void 0 !== _previousValue ? _previousValue : previousValue = [];
        _CalendarSelectionStr.prototype.updateAriaSelected.call(this, value, previousValue)
    };
    _proto.getDefaultCurrentDate = function() {
        var dates = this.dateOption("values").filter((function(value) {
            return value
        }));
        return this._getLowestDateInArray(dates)
    };
    return CalendarMultiSelectionStrategy
}(_uiCalendarSelection.default);
var _default = CalendarMultiSelectionStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
