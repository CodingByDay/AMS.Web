﻿/**
* DevExpress Dashboard (_datetime-period-converter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimePeriodConverter = void 0;
const _range_filter_selection_validator_1 = require("./_range-filter-selection-validator");
function getFirstWeekDate(date, firstDayOfWeek) {
    const delta = (date.getDay() - firstDayOfWeek + 7) % 7;
    const result = new Date(date);
    result.setDate(date.getDate() - delta);
    return result;
}
class DateTimePeriodConverter {
    static toRange(period, firstDayOfWeek) {
        let now = new Date();
        var range = {
            startValue: this._getDateTime(period.Start, now, firstDayOfWeek),
            endValue: this._getDateTime(period.End, now, firstDayOfWeek)
        };
        let endLimit = period.Start && period.End && period.End < period.Start ? period.Start : period.End;
        range = _range_filter_selection_validator_1.RangeFilterSelectionValidator.validateLimitsOrder(range);
        if (endLimit && endLimit.Relative) {
            range.endValue.setMilliseconds(range.endValue.getMilliseconds() - 1);
            range = _range_filter_selection_validator_1.RangeFilterSelectionValidator.validateLimitsOrder(range);
        }
        return range;
    }
    static _getDateTime(limit, now, firstDayOfWeek) {
        if (limit) {
            if (!limit.Relative)
                return limit.Date;
            switch (limit.Interval) {
                case 'Year':
                    return new Date(now.getFullYear() + limit.Offset, 0, 1);
                case 'Quarter':
                    var quarterIndex = Math.floor(now.getMonth() / 3);
                    return new Date(now.getFullYear(), quarterIndex * 3 + 3 * limit.Offset, 1);
                case 'Month':
                    return new Date(now.getFullYear(), now.getMonth() + limit.Offset, 1);
                case 'Week':
                    var firstDayOfCurrentWeek = getFirstWeekDate(now, firstDayOfWeek);
                    return new Date(firstDayOfCurrentWeek.getFullYear(), firstDayOfCurrentWeek.getMonth(), firstDayOfCurrentWeek.getDate() + 7 * limit.Offset);
                case 'Day':
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate() + limit.Offset);
                case 'Hour':
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + limit.Offset, 0, 0, 0);
                case 'Minute':
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + limit.Offset, 0, 0);
                case 'Second':
                    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds() + limit.Offset, 0);
            }
        }
    }
}
exports.DateTimePeriodConverter = DateTimePeriodConverter;
