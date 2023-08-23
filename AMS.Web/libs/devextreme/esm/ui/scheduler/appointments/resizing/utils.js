/**
 * DevExtreme (esm/ui/scheduler/appointments/resizing/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var normalizeDate = (options, date, sourceDate, isStartDate) => {
    if (!options.considerTime) {
        return date
    }
    var result = new Date(date);
    result.setHours(sourceDate.getHours(), sourceDate.getMinutes(), sourceDate.getSeconds());
    var {
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        appointmentSettings: {
            allDay: allDay
        }
    } = options;
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
export var normalizeStartDate = (options, startDate, sourceStartDate) => normalizeDate(options, startDate, sourceStartDate, true);
export var normalizeEndDate = (options, endDate, sourceEndDate) => normalizeDate(options, endDate, sourceEndDate, false);
