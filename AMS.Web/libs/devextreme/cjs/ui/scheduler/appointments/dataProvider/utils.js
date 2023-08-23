/**
 * DevExtreme (cjs/ui/scheduler/appointments/dataProvider/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.sortAppointmentsByStartDate = exports.replaceWrongEndDate = exports.getRecurrenceException = exports.getAppointmentTakesSeveralDays = exports.compareDateWithStartDayHour = exports.compareDateWithEndDayHour = exports._isEndDateWrong = exports._convertRecurrenceException = exports._appointmentPartInInterval = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _utils = _interopRequireDefault(require("../../utils.timeZone"));
var _date_serialization = _interopRequireDefault(require("../../../../core/utils/date_serialization"));
var _expressionUtils = require("../../expressionUtils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var toMs = _date.default.dateToMilliseconds;
var FULL_DATE_FORMAT = "yyyyMMddTHHmmss";
var compareDateWithStartDayHour = function(startDate, endDate, startDayHour, allDay, severalDays) {
    var startTime = _date.default.dateTimeFromDecimal(startDayHour);
    var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
    return result
};
exports.compareDateWithStartDayHour = compareDateWithStartDayHour;
var compareDateWithEndDayHour = function(options) {
    var startDate = options.startDate,
        endDate = options.endDate,
        startDayHour = options.startDayHour,
        endDayHour = options.endDayHour,
        viewStartDayHour = options.viewStartDayHour,
        viewEndDayHour = options.viewEndDayHour,
        allDay = options.allDay,
        severalDays = options.severalDays,
        min = options.min,
        max = options.max,
        checkIntersectViewport = options.checkIntersectViewport;
    var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs("hour");
    var apptDuration = endDate.getTime() - startDate.getTime();
    var delta = (hiddenInterval - apptDuration) / toMs("hour");
    var apptStartHour = startDate.getHours();
    var apptStartMinutes = startDate.getMinutes();
    var result;
    var endTime = _date.default.dateTimeFromDecimal(endDayHour);
    var startTime = _date.default.dateTimeFromDecimal(startDayHour);
    var apptIntersectViewport = startDate < max && endDate > min;
    result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || 60 * endDate.getHours() + endDate.getMinutes() > 60 * startTime.hours);
    if (apptDuration < hiddenInterval) {
        if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
            result = false
        }
    }
    return result
};
exports.compareDateWithEndDayHour = compareDateWithEndDayHour;
var getAppointmentTakesSeveralDays = function(adapter) {
    return !_date.default.sameDate(adapter.startDate, adapter.endDate)
};
exports.getAppointmentTakesSeveralDays = getAppointmentTakesSeveralDays;
var _isEndDateWrong = function(startDate, endDate) {
    return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime()
};
exports._isEndDateWrong = _isEndDateWrong;
var _appointmentPartInInterval = function(startDate, endDate, startDayHour, endDayHour) {
    var apptStartDayHour = startDate.getHours();
    var apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour
};
exports._appointmentPartInInterval = _appointmentPartInInterval;
var getRecurrenceException = function(appointmentAdapter, timeZoneCalculator, timeZone) {
    var recurrenceException = appointmentAdapter.recurrenceException;
    if (recurrenceException) {
        var exceptions = recurrenceException.split(",");
        for (var i = 0; i < exceptions.length; i++) {
            exceptions[i] = _convertRecurrenceException(exceptions[i], appointmentAdapter.startDate, timeZoneCalculator, timeZone)
        }
        return exceptions.join()
    }
    return recurrenceException
};
exports.getRecurrenceException = getRecurrenceException;
var _convertRecurrenceException = function(exceptionString, startDate, timeZoneCalculator, timeZone) {
    exceptionString = exceptionString.replace(/\s/g, "");
    var getConvertedToTimeZone = function(date) {
        return timeZoneCalculator.createDate(date, {
            path: "toGrid"
        })
    };
    var exceptionDate = _date_serialization.default.deserializeDate(exceptionString);
    var convertedStartDate = getConvertedToTimeZone(startDate);
    var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
    convertedExceptionDate = _utils.default.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, timeZone);
    exceptionString = _date_serialization.default.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
    return exceptionString
};
exports._convertRecurrenceException = _convertRecurrenceException;
var replaceWrongEndDate = function(rawAppointment, startDate, endDate, appointmentDuration, dataAccessors) {
    if (_isEndDateWrong(startDate, endDate)) {
        var isAllDay = _expressionUtils.ExpressionUtils.getField(dataAccessors, "allDay", rawAppointment);
        var calculatedEndDate = function(isAllDay, startDate) {
            if (isAllDay) {
                return _date.default.setToDayEnd(new Date(startDate))
            }
            return new Date(startDate.getTime() + appointmentDuration * toMs("minute"))
        }(isAllDay, startDate);
        dataAccessors.setter.endDate(rawAppointment, calculatedEndDate)
    }
};
exports.replaceWrongEndDate = replaceWrongEndDate;
var sortAppointmentsByStartDate = function(appointments, dataAccessors) {
    appointments.sort((function(a, b) {
        var firstDate = new Date(_expressionUtils.ExpressionUtils.getField(dataAccessors, "startDate", a.settings || a));
        var secondDate = new Date(_expressionUtils.ExpressionUtils.getField(dataAccessors, "startDate", b.settings || b));
        return Math.sign(firstDate.getTime() - secondDate.getTime())
    }))
};
exports.sortAppointmentsByStartDate = sortAppointmentsByStartDate;
