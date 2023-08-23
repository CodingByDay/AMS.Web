/**
 * DevExtreme (cjs/ui/scheduler/workspaces/view_model/view_data_generator_work_week.js)
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
exports.ViewDataGeneratorWorkWeek = void 0;
var _work_week = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/work_week");
var _view_data_generator_week = require("./view_data_generator_week");

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === _typeof(key) ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== _typeof(input) || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== _typeof(res)) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
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
var ViewDataGeneratorWorkWeek = function(_ViewDataGeneratorWee) {
    _inheritsLoose(ViewDataGeneratorWorkWeek, _ViewDataGeneratorWee);

    function ViewDataGeneratorWorkWeek() {
        return _ViewDataGeneratorWee.apply(this, arguments) || this
    }
    var _proto = ViewDataGeneratorWorkWeek.prototype;
    _proto.isSkippedDate = function(date) {
        return (0, _work_week.isDataOnWeekend)(date)
    };
    _proto._calculateStartViewDate = function(options) {
        return (0, _work_week.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, this._getIntervalDuration(options.intervalCount), this.getFirstDayOfWeek(options.firstDayOfWeek))
    };
    _proto.getFirstDayOfWeek = function(firstDayOfWeekOption) {
        return firstDayOfWeekOption || 0
    };
    _createClass(ViewDataGeneratorWorkWeek, [{
        key: "daysInInterval",
        get: function() {
            return 5
        }
    }, {
        key: "isWorkView",
        get: function() {
            return true
        }
    }]);
    return ViewDataGeneratorWorkWeek
}(_view_data_generator_week.ViewDataGeneratorWeek);
exports.ViewDataGeneratorWorkWeek = ViewDataGeneratorWorkWeek;
