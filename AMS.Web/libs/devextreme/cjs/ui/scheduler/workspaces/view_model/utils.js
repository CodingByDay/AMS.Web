/**
 * DevExtreme (cjs/ui/scheduler/workspaces/view_model/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.alignToFirstDayOfWeek = alignToFirstDayOfWeek;
exports.alignToLastDayOfWeek = alignToLastDayOfWeek;
exports.calculateAlignedWeeksBetweenDates = calculateAlignedWeeksBetweenDates;
exports.calculateDaysBetweenDates = calculateDaysBetweenDates;
exports.getViewDataGeneratorByViewType = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _constants = require("../../constants");
var _view_data_generator = require("./view_data_generator");
var _view_data_generator_day = require("./view_data_generator_day");
var _view_data_generator_month = require("./view_data_generator_month");
var _view_data_generator_timeline_month = require("./view_data_generator_timeline_month");
var _view_data_generator_week = require("./view_data_generator_week");
var _view_data_generator_work_week = require("./view_data_generator_work_week");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var DAYS_IN_WEEK = 7;
var MS_IN_DAY = 864e5;
var getViewDataGeneratorByViewType = function(viewType) {
    switch (viewType) {
        case _constants.VIEWS.MONTH:
            return new _view_data_generator_month.ViewDataGeneratorMonth;
        case _constants.VIEWS.TIMELINE_MONTH:
            return new _view_data_generator_timeline_month.ViewDataGeneratorTimelineMonth;
        case _constants.VIEWS.DAY:
        case _constants.VIEWS.TIMELINE_DAY:
            return new _view_data_generator_day.ViewDataGeneratorDay;
        case _constants.VIEWS.WEEK:
        case _constants.VIEWS.TIMELINE_WEEK:
            return new _view_data_generator_week.ViewDataGeneratorWeek;
        case _constants.VIEWS.WORK_WEEK:
        case _constants.VIEWS.TIMELINE_WORK_WEEK:
            return new _view_data_generator_work_week.ViewDataGeneratorWorkWeek;
        default:
            return new _view_data_generator.ViewDataGenerator
    }
};
exports.getViewDataGeneratorByViewType = getViewDataGeneratorByViewType;

function alignToFirstDayOfWeek(date, firstDayOfWeek) {
    var newDate = new Date(date);
    var dayDiff = newDate.getDay() - firstDayOfWeek;
    if (dayDiff < 0) {
        dayDiff += DAYS_IN_WEEK
    }
    newDate.setDate(newDate.getDate() - dayDiff);
    return newDate
}

function alignToLastDayOfWeek(date, firstDayOfWeek) {
    var newDate = alignToFirstDayOfWeek(date, firstDayOfWeek);
    newDate.setDate(newDate.getDate() + DAYS_IN_WEEK - 1);
    return newDate
}

function calculateDaysBetweenDates(fromDate, toDate) {
    var msDiff = _date.default.trimTime(toDate).getTime() - _date.default.trimTime(fromDate).getTime();
    return Math.round(msDiff / MS_IN_DAY) + 1
}

function calculateAlignedWeeksBetweenDates(fromDate, toDate, firstDayOfWeek) {
    var alignedFromDate = alignToFirstDayOfWeek(fromDate, firstDayOfWeek);
    var alignedToDate = alignToLastDayOfWeek(toDate, firstDayOfWeek);
    var weekCount = calculateDaysBetweenDates(alignedFromDate, alignedToDate) / DAYS_IN_WEEK;
    return Math.max(weekCount, 6)
}
