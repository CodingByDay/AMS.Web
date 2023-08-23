/**
 * DevExtreme (cjs/renovation/ui/scheduler/timeZoneCalculator/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.TimeZoneCalculator = void 0;
var _type = require("../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _types = require("./types");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var MS_IN_MINUTE = 6e4;
var MS_IN_HOUR = 60 * MS_IN_MINUTE;
var TimeZoneCalculator = function() {
    function TimeZoneCalculator(options) {
        this.options = options
    }
    var _proto = TimeZoneCalculator.prototype;
    _proto.createDate = function(sourceDate, info) {
        var date = new Date(sourceDate);
        switch (info.path) {
            case _types.PathTimeZoneConversion.fromSourceToAppointment:
                return this.getConvertedDate(date, info.appointmentTimeZone, true, false);
            case _types.PathTimeZoneConversion.fromAppointmentToSource:
                return this.getConvertedDate(date, info.appointmentTimeZone, true, true);
            case _types.PathTimeZoneConversion.fromSourceToGrid:
                return this.getConvertedDate(date, info.appointmentTimeZone, false, false);
            case _types.PathTimeZoneConversion.fromGridToSource:
                return this.getConvertedDate(date, info.appointmentTimeZone, false, true);
            default:
                throw new Error("not specified pathTimeZoneConversion")
        }
    };
    _proto.getOffsets = function(date, appointmentTimezone) {
        var clientOffset = -this.getClientOffset(date) / _date.default.dateToMilliseconds("hour");
        var commonOffset = this.getCommonOffset(date);
        var appointmentOffset = this.getAppointmentOffset(date, appointmentTimezone);
        return {
            client: clientOffset,
            common: !(0, _type.isDefined)(commonOffset) ? clientOffset : commonOffset,
            appointment: "number" !== typeof appointmentOffset ? clientOffset : appointmentOffset
        }
    };
    _proto.getConvertedDateByOffsets = function(date, clientOffset, targetOffset, isBack) {
        var direction = isBack ? -1 : 1;
        var resultDate = new Date(date);
        resultDate.setMinutes(resultDate.getMinutes() - direction * (60 * clientOffset));
        resultDate.setMinutes(resultDate.getMinutes() + direction * (60 * targetOffset));
        return new Date(resultDate)
    };
    _proto.getOriginStartDateOffsetInMs = function(date, timezone, isUTCDate) {
        var offsetInHours = this.getOffsetInHours(date, timezone, isUTCDate);
        return offsetInHours * MS_IN_HOUR
    };
    _proto.getOffsetInHours = function(date, timezone, isUTCDate) {
        var _this$getOffsets = this.getOffsets(date, timezone),
            appointment = _this$getOffsets.appointment,
            client = _this$getOffsets.client,
            common = _this$getOffsets.common;
        if (!!timezone && isUTCDate) {
            return appointment - client
        }
        if (!!timezone && !isUTCDate) {
            return appointment - common
        }
        if (!timezone && isUTCDate) {
            return common - client
        }
        return 0
    };
    _proto.getClientOffset = function(date) {
        return this.options.getClientOffset(date)
    };
    _proto.getCommonOffset = function(date) {
        return this.options.tryGetCommonOffset(date)
    };
    _proto.getAppointmentOffset = function(date, appointmentTimezone) {
        return this.options.tryGetAppointmentOffset(date, appointmentTimezone)
    };
    _proto.getConvertedDate = function(date, appointmentTimezone, useAppointmentTimeZone, isBack) {
        var newDate = new Date(date.getTime());
        var offsets = this.getOffsets(newDate, appointmentTimezone);
        if (useAppointmentTimeZone && !!appointmentTimezone) {
            return this.getConvertedDateByOffsets(date, offsets.client, offsets.appointment, isBack)
        }
        return this.getConvertedDateByOffsets(date, offsets.client, offsets.common, isBack)
    };
    return TimeZoneCalculator
}();
exports.TimeZoneCalculator = TimeZoneCalculator;
