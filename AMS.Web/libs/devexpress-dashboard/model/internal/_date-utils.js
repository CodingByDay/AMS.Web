﻿/**
* DevExpress Dashboard (_date-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartOfFirstWeek = exports.divideIntoWeeks = exports.getIsStartOfFirstWeek = exports.addDays = exports.clone = exports.serializeDate = exports.fromUtcDateToString = exports.toUtcDate = exports.toStringArray = exports.patchDateTime = exports.tryConvertToDateTime = void 0;
const isoDataTimePattern = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d/;
function tryConvertToDateTime(value) {
    if (typeof (value) === 'string' && isoDataTimePattern.test(value)) {
        return toUtcDate(value);
    }
    return value;
}
exports.tryConvertToDateTime = tryConvertToDateTime;
function patchDateTime(storageDTO) {
    var _tryPatchDateTime = (obj, property) => {
        obj[property] = tryConvertToDateTime(obj[property]);
    };
    for (var sliceId in storageDTO.Slices) {
        var slice = storageDTO.Slices[sliceId];
        for (var keyIds in slice.Data) {
            var dataPoint = slice.Data[keyIds];
            for (var valueId in dataPoint) {
                _tryPatchDateTime(dataPoint, valueId);
            }
        }
    }
    for (var dataItemName in storageDTO.EncodeMaps) {
        var uniqueValues = storageDTO.EncodeMaps[dataItemName];
        var len = uniqueValues.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                _tryPatchDateTime(uniqueValues, i);
            }
        }
    }
}
exports.patchDateTime = patchDateTime;
function toStringArray(value) {
    if (!value) {
        return value;
    }
    if (Array.isArray(value)) {
        return value.map(v => toStringArray(v));
    }
    else if (value instanceof Date) {
        return fromUtcDateToString(value);
    }
    else if (value instanceof Object) {
        for (var key in value) {
            value[key] = toStringArray(value[key]);
        }
    }
    return value;
}
exports.toStringArray = toStringArray;
function toUtcDate(value) {
    var hasDateZone = value[value.length - 3] == ':' && ['+', '-'].indexOf(value[value.length - 6]) !== -1;
    if (value[value.length - 1] !== 'Z' && !hasDateZone) {
        value += 'Z';
    }
    var date = new Date(value);
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
}
exports.toUtcDate = toUtcDate;
function fromUtcDateToString(date) {
    var toString = (n, useThreeDigits = false) => {
        var s = n.toString();
        if (useThreeDigits) {
            return s.length == 2 ? '0' + s : (s.length == 1 ? '00' + s : s);
        }
        else {
            return s.length == 1 ? '0' + s : s;
        }
    };
    return date.getFullYear() + '-' +
        toString(date.getMonth() + 1) + '-' +
        toString(date.getDate()) + 'T' +
        toString(date.getHours()) + ':' +
        toString(date.getMinutes()) + ':' +
        toString(date.getSeconds()) + '.' +
        toString(date.getMilliseconds(), true);
}
exports.fromUtcDateToString = fromUtcDateToString;
function serializeDate(date) {
    return date instanceof Date ? fromUtcDateToString(date) : String(date);
}
exports.serializeDate = serializeDate;
function clone(date) {
    return new Date(date.valueOf());
}
exports.clone = clone;
function addDays(date, days) {
    date.setDate(date.getDate() + days);
}
exports.addDays = addDays;
function getIsStartOfFirstWeek(calendarWeekRule) {
    switch (calendarWeekRule) {
        case 'FirstDay':
            return (date) => isStartOfFirstWeek(date, 1);
        case 'FirstFourDayWeek':
            return (date) => isStartOfFirstWeek(date, 4);
        case 'FirstFullWeek':
            return (date) => isStartOfFirstWeek(date, 7);
    }
}
exports.getIsStartOfFirstWeek = getIsStartOfFirstWeek;
function isStartOfFirstWeek(weekStart, numberOfWeekDaysNeededInYear) {
    let month = weekStart.getMonth();
    let day = weekStart.getDate();
    return month === 11 && day >= 25 + numberOfWeekDaysNeededInYear ||
        month === 0 && day <= numberOfWeekDaysNeededInYear;
}
function divideIntoWeeks(start, end, firstDayOfWeek, calendarWeekRule, add) {
    if (start > end)
        throw new Error("'start' must be less or equal to 'end'.");
    if (start.getMonth() === 0 && start.getDate() === 1) {
        let firstWeekStart = getStartOfFirstWeek(start.getFullYear(), firstDayOfWeek, calendarWeekRule);
        let secondWeekStart = clone(firstWeekStart);
        addDays(secondWeekStart, 7);
        if (firstWeekStart < start && secondWeekStart > start) {
            add(clone(start));
            start = secondWeekStart;
        }
        else if (firstWeekStart > start) {
            add(clone(start));
            start = firstWeekStart;
        }
        if (start > end)
            return;
    }
    let current = clone(start);
    let isInFirstWeek = getIsStartOfFirstWeek(calendarWeekRule);
    while (current < end) {
        add(clone(current));
        if (current.getMonth() === 11 &&
            current.getDate() !== 25 &&
            isInFirstWeek(current))
            add(new Date(current.getFullYear() + 1, 0, 1));
        addDays(current, 7);
    }
    add(clone(end));
}
exports.divideIntoWeeks = divideIntoWeeks;
function getStartOfFirstWeek(year, firstDayOfWeek, calendarWeekRule) {
    let current = new Date(year, 0, 1);
    addDays(current, -7);
    while (current.getDay() !== firstDayOfWeek)
        addDays(current, 1);
    let isStartOfFirstWeek = getIsStartOfFirstWeek(calendarWeekRule);
    while (!isStartOfFirstWeek(current))
        addDays(current, 7);
    return current;
}
exports.getStartOfFirstWeek = getStartOfFirstWeek;
