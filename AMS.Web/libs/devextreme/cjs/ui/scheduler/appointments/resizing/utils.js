/**
 * DevExtreme (cjs/ui/scheduler/appointments/resizing/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.normalizeStartDate = exports.normalizeEndDate = void 0;
var normalizeDate = function(options, date, sourceDate, isStartDate) {
    if (!options.considerTime) {
        return date
    }
    var result = new Date(date);
    result.setHours(sourceDate.getHours(), sourceDate.getMinutes(), sourceDate.getSeconds());
    var startDayHour = options.startDayHour,
        endDayHour = options.endDayHour,
        allDay = options.appointmentSettings.allDay;
    var minDate = new Date(date);
    var maxDate = new Date(date);
    minDate.setHours(startDayHour, 0, 0, 0);
    maxDate.setHours(endDayHour, 0, 0, 0);
    var isDateOutInterval = isStartDate ? result < minDate.getTime() || result >= maxDate.getTime() : result <= minDate.getTime() || result > maxDate.getTime();
    if (isDateOutInterval) {
        result = !allDay ? maxDate : minDate
    }
    return result
};
var normalizeStartDate = function(options, startDate, sourceStartDate) {
    return normalizeDate(options, startDate, sourceStartDate, true)
};
exports.normalizeStartDate = normalizeStartDate;
var normalizeEndDate = function(options, endDate, sourceEndDate) {
    return normalizeDate(options, endDate, sourceEndDate, false)
};
exports.normalizeEndDate = normalizeEndDate;
