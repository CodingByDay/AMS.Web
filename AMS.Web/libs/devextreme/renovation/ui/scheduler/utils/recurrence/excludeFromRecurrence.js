/**
 * DevExtreme (renovation/ui/scheduler/utils/recurrence/excludeFromRecurrence.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.excludeFromRecurrence = void 0;
var _appointmentAdapter = require("../../../../../ui/scheduler/appointmentAdapter");
var _date_serialization = _interopRequireDefault(require("../../../../../core/utils/date_serialization"));

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
var FULL_DATE_FORMAT = "yyyyMMddTHHmmss";
var UTC_FULL_DATE_FORMAT = "".concat(FULL_DATE_FORMAT, "Z");
var getSerializedDate = function(date, startDate, isAllDay) {
    if (isAllDay) {
        date.setHours(startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds())
    }
    return _date_serialization.default.serializeDate(date, UTC_FULL_DATE_FORMAT)
};
var createRecurrenceException = function(appointmentAdapter, exceptionDate) {
    var result = [];
    if (appointmentAdapter.recurrenceException) {
        result.push(appointmentAdapter.recurrenceException)
    }
    result.push(getSerializedDate(exceptionDate, appointmentAdapter.startDate, appointmentAdapter.allDay));
    return result.join()
};
var excludeFromRecurrence = function(appointment, exceptionDate, dataAccessors, timeZoneCalculator) {
    var appointmentAdapter = (0, _appointmentAdapter.createAppointmentAdapter)(_extends({}, appointment), dataAccessors, timeZoneCalculator);
    appointmentAdapter.recurrenceException = createRecurrenceException(appointmentAdapter, exceptionDate);
    return appointmentAdapter
};
exports.excludeFromRecurrence = excludeFromRecurrence;
