/**
 * DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/utils/normalizeDate.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.normalizeNewStartDate = exports.normalizeNewEndDate = void 0;
var _date_serialization = _interopRequireDefault(require("../../../../../../core/utils/date_serialization"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var validateAppointmentFormDate = function(date) {
    return null === date || !!date && !!new Date(date).getDate()
};
var normalizeNewDate = function(newDate, currentDate, currentOppositeDate, needCorrect) {
    if (!validateAppointmentFormDate(newDate)) {
        return currentDate
    }
    var normalizedDate = _date_serialization.default.deserializeDate(newDate);
    var normalizedOppositeDate = _date_serialization.default.deserializeDate(currentOppositeDate);
    var result = normalizedDate;
    if (normalizedOppositeDate && normalizedDate && needCorrect(normalizedOppositeDate, normalizedDate)) {
        var duration = normalizedOppositeDate.getTime() - normalizedDate.getTime();
        result = new Date(normalizedDate.getTime() + duration)
    }
    return result
};
var normalizeNewStartDate = function(newStartDate, currentStartDate, currentEndDate) {
    return normalizeNewDate(newStartDate, currentStartDate, currentEndDate, (function(endDate, startDate) {
        return endDate < startDate
    }))
};
exports.normalizeNewStartDate = normalizeNewStartDate;
var normalizeNewEndDate = function(newEndDate, currentStartDate, currentEndDate) {
    return normalizeNewDate(newEndDate, currentEndDate, currentStartDate, (function(startDate, endDate) {
        return endDate < startDate
    }))
};
exports.normalizeNewEndDate = normalizeNewEndDate;
