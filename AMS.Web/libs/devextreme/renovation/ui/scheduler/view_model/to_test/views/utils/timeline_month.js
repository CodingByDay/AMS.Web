/**
 * DevExtreme (renovation/ui/scheduler/view_model/to_test/views/utils/timeline_month.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.calculateStartViewDate = void 0;
var _date = _interopRequireDefault(require("../../../../../../../core/utils/date"));
var _base = require("./base");
var _month = require("./month");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var calculateStartViewDate = function(currentDate, startDayHour, startDate, intervalCount) {
    var firstViewDate = _date.default.getFirstMonthDate((0, _month.getViewStartByOptions)(startDate, currentDate, intervalCount, _date.default.getFirstMonthDate(startDate)));
    return (0, _base.setOptionHour)(firstViewDate, startDayHour)
};
exports.calculateStartViewDate = calculateStartViewDate;
