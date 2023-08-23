/**
 * DevExtreme (cjs/ui/scheduler/workspaces/view_model/view_data_generator_month.js)
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
exports.ViewDataGeneratorMonth = void 0;
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _view_data_generator = require("./view_data_generator");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _month = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/month");
var _utils = require("./utils");
var _date2 = _interopRequireDefault(require("../../../../localization/date"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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
var DAY_IN_MILLISECONDS = _date.default.dateToMilliseconds("day");
var DAYS_IN_WEEK = 7;
var ViewDataGeneratorMonth = function(_ViewDataGenerator) {
    _inheritsLoose(ViewDataGeneratorMonth, _ViewDataGenerator);

    function ViewDataGeneratorMonth() {
        return _ViewDataGenerator.apply(this, arguments) || this
    }
    var _proto = ViewDataGeneratorMonth.prototype;
    _proto.getCellData = function(rowIndex, columnIndex, options, allDay) {
        var data = _ViewDataGenerator.prototype.getCellData.call(this, rowIndex, columnIndex, options, false);
        var startDate = data.startDate;
        var indicatorTime = options.indicatorTime,
            timeZoneCalculator = options.timeZoneCalculator,
            intervalCount = options.intervalCount;
        data.today = this.isCurrentDate(startDate, indicatorTime, timeZoneCalculator);
        data.otherMonth = this.isOtherMonth(startDate, this._minVisibleDate, this._maxVisibleDate);
        data.firstDayOfMonth = (0, _month.isFirstCellInMonthWithIntervalCount)(startDate, intervalCount);
        data.text = (0, _month.getCellText)(startDate, intervalCount);
        return data
    };
    _proto.isCurrentDate = function(date, indicatorTime, timeZoneCalculator) {
        return _date.default.sameDate(date, (0, _base.getToday)(indicatorTime, timeZoneCalculator))
    };
    _proto.isOtherMonth = function(cellDate, minDate, maxDate) {
        return !_date.default.dateInRange(cellDate, minDate, maxDate, "date")
    };
    _proto._calculateCellIndex = function(rowIndex, columnIndex, rowCount, columnCount) {
        return (0, _month.calculateCellIndex)(rowIndex, columnIndex, rowCount, columnCount)
    };
    _proto.calculateEndDate = function(startDate, interval, endDayHour) {
        return (0, _base.setOptionHour)(startDate, endDayHour)
    };
    _proto.getInterval = function() {
        return DAY_IN_MILLISECONDS
    };
    _proto._calculateStartViewDate = function(options) {
        return (0, _month.calculateStartViewDate)(options.currentDate, options.startDayHour, options.startDate, options.intervalCount, this.getFirstDayOfWeek(options.firstDayOfWeek))
    };
    _proto._setVisibilityDates = function(options) {
        var intervalCount = options.intervalCount,
            startDate = options.startDate,
            currentDate = options.currentDate;
        var firstMonthDate = _date.default.getFirstMonthDate(startDate);
        var viewStart = (0, _month.getViewStartByOptions)(startDate, currentDate, intervalCount, firstMonthDate);
        this._minVisibleDate = new Date(viewStart.setDate(1));
        var nextMonthDate = new Date(viewStart.setMonth(viewStart.getMonth() + intervalCount));
        this._maxVisibleDate = new Date(nextMonthDate.setDate(0))
    };
    _proto.getCellCount = function() {
        return DAYS_IN_WEEK
    };
    _proto.getRowCount = function(options) {
        var _options$firstDayOfWe;
        var startDate = new Date(options.currentDate);
        startDate.setDate(1);
        var endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + options.intervalCount);
        endDate.setDate(0);
        return (0, _utils.calculateAlignedWeeksBetweenDates)(startDate, endDate, null !== (_options$firstDayOfWe = options.firstDayOfWeek) && void 0 !== _options$firstDayOfWe ? _options$firstDayOfWe : _date2.default.firstDayOfWeekIndex())
    };
    _proto.getCellCountInDay = function() {
        return 1
    };
    _proto.setHiddenInterval = function() {
        this.hiddenInterval = 0
    };
    _createClass(ViewDataGeneratorMonth, [{
        key: "tableAllDay",
        get: function() {
            return
        }
    }]);
    return ViewDataGeneratorMonth
}(_view_data_generator.ViewDataGenerator);
exports.ViewDataGeneratorMonth = ViewDataGeneratorMonth;
