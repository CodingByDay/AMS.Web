/**
 * DevExtreme (cjs/renovation/ui/scheduler/timeZoneCalculator/createTimeZoneCalculator.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.createTimeZoneCalculator = void 0;
var _utils = require("./utils");
var _utils2 = _interopRequireDefault(require("../../../../ui/scheduler/utils.timeZone"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var createTimeZoneCalculator = function(currentTimeZone) {
    return new _utils.TimeZoneCalculator({
        getClientOffset: function(date) {
            return _utils2.default.getClientTimezoneOffset(date)
        },
        tryGetCommonOffset: function(date) {
            return _utils2.default.calculateTimezoneByValue(currentTimeZone, date)
        },
        tryGetAppointmentOffset: function(date, appointmentTimezone) {
            return _utils2.default.calculateTimezoneByValue(appointmentTimezone, date)
        }
    })
};
exports.createTimeZoneCalculator = createTimeZoneCalculator;
