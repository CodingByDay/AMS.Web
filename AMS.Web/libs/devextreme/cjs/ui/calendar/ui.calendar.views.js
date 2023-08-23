/**
 * DevExtreme (cjs/ui/calendar/ui.calendar.views.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _uiCalendar = _interopRequireDefault(require("./ui.calendar.base_view"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _common = require("../../core/utils/common");
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _date2 = _interopRequireDefault(require("../../localization/date"));
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var CALENDAR_OTHER_MONTH_CLASS = "dx-calendar-other-month";
var CALENDAR_OTHER_VIEW_CLASS = "dx-calendar-other-view";
var CALENDAR_WEEK_NUMBER_CELL_CLASS = "dx-calendar-week-number-cell";
var Views = {
    month: _uiCalendar.default.inherit({
        _getViewName: function() {
            return "month"
        },
        _getDefaultOptions: function() {
            return (0, _extend.extend)(this.callBase(), {
                firstDayOfWeek: 0,
                rowCount: 6,
                colCount: 7
            })
        },
        _renderImpl: function() {
            this.callBase();
            this._renderHeader()
        },
        _renderBody: function() {
            this.callBase();
            this._$table.find(".".concat(CALENDAR_OTHER_VIEW_CLASS)).addClass(CALENDAR_OTHER_MONTH_CLASS)
        },
        _renderFocusTarget: _common.noop,
        getCellAriaLabel: function(date) {
            return _date2.default.format(date, "longdate")
        },
        _renderHeader: function() {
            var $headerRow = (0, _renderer.default)("<tr>");
            var $header = (0, _renderer.default)("<thead>").append($headerRow);
            this._$table.prepend($header);
            for (var colIndex = 0, colCount = this.option("colCount"); colIndex < colCount; colIndex++) {
                this._renderHeaderCell(colIndex, $headerRow)
            }
            if (this.option("showWeekNumbers")) {
                this._renderWeekHeaderCell($headerRow)
            }
        },
        _renderHeaderCell: function(cellIndex, $headerRow) {
            var _this$option = this.option(),
                firstDayOfWeek = _this$option.firstDayOfWeek;
            var _this$_getDayCaption = this._getDayCaption(firstDayOfWeek + cellIndex),
                fullCaption = _this$_getDayCaption.full,
                abbrCaption = _this$_getDayCaption.abbreviated;
            var $cell = (0, _renderer.default)("<th>").attr({
                scope: "col",
                abbr: fullCaption
            }).text(abbrCaption);
            $headerRow.append($cell)
        },
        _renderWeekHeaderCell: function($headerRow) {
            var $weekNumberHeaderCell = (0, _renderer.default)("<th>").attr({
                scope: "col",
                abbr: "WeekNumber",
                class: "dx-week-number-header"
            });
            $headerRow.prepend($weekNumberHeaderCell)
        },
        _renderWeekNumberCell: function(rowData) {
            var _this$option2 = this.option(),
                showWeekNumbers = _this$option2.showWeekNumbers,
                cellTemplate = _this$option2.cellTemplate;
            if (!showWeekNumbers) {
                return
            }
            var weekNumber = this._getWeekNumber(rowData.prevCellDate);
            var cell = _dom_adapter.default.createElement("td");
            var $cell = (0, _renderer.default)(cell);
            cell.className = CALENDAR_WEEK_NUMBER_CELL_CLASS;
            if (cellTemplate) {
                cellTemplate.render(this._prepareCellTemplateData(weekNumber, -1, $cell))
            } else {
                cell.innerHTML = weekNumber
            }
            rowData.row.prepend(cell);
            this.setAria({
                role: "gridcell",
                label: "Week ".concat(weekNumber)
            }, $cell)
        },
        _getWeekNumber: function(date) {
            var _this$option3 = this.option(),
                weekNumberRule = _this$option3.weekNumberRule,
                firstDayOfWeek = _this$option3.firstDayOfWeek;
            if ("auto" === weekNumberRule) {
                return _date.default.getWeekNumber(date, firstDayOfWeek, 1 === firstDayOfWeek ? "firstFourDays" : "firstDay")
            }
            return _date.default.getWeekNumber(date, firstDayOfWeek, weekNumberRule)
        },
        getNavigatorCaption: function() {
            return _date2.default.format(this.option("date"), "monthandyear")
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return _date.default.sameDate(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var minDate = this.option("min");
            var maxDate = this.option("max");
            return !_date.default.dateInRange(cellDate, minDate, maxDate, "date")
        },
        _isOtherView: function(cellDate) {
            return cellDate.getMonth() !== this.option("date").getMonth()
        },
        _isStartDayOfMonth: function(cellDate) {
            return _date.default.sameDate(cellDate, _date.default.getFirstMonthDate(this.option("date")))
        },
        _isEndDayOfMonth: function(cellDate) {
            return _date.default.sameDate(cellDate, _date.default.getLastMonthDate(this.option("date")))
        },
        _getCellText: function(cellDate) {
            return _date2.default.format(cellDate, "d")
        },
        _getDayCaption: function(day) {
            var daysInWeek = this.option("colCount");
            var dayIndex = day % daysInWeek;
            return {
                full: _date2.default.getDayNames()[dayIndex],
                abbreviated: _date2.default.getDayNames("abbreviated")[dayIndex]
            }
        },
        _getFirstCellData: function() {
            var _this$option4 = this.option(),
                firstDayOfWeek = _this$option4.firstDayOfWeek;
            var firstDay = _date.default.getFirstMonthDate(this.option("date"));
            var firstMonthDayOffset = firstDayOfWeek - firstDay.getDay();
            var daysInWeek = this.option("colCount");
            if (firstMonthDayOffset >= 0) {
                firstMonthDayOffset -= daysInWeek
            }
            firstDay.setDate(firstDay.getDate() + firstMonthDayOffset);
            return firstDay
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setDate(date.getDate() + 1);
            return date
        },
        _getCellByDate: function(date) {
            return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(date, _date.default.getShortDateFormat()), "']"))
        },
        isBoundary: function(date) {
            return _date.default.sameMonthAndYear(date, this.option("min")) || _date.default.sameMonthAndYear(date, this.option("max"))
        },
        _getDefaultDisabledDatesHandler: function(disabledDates) {
            return function(args) {
                var isDisabledDate = disabledDates.some((function(item) {
                    return _date.default.sameDate(item, args.date)
                }));
                if (isDisabledDate) {
                    return true
                }
            }
        }
    }),
    year: _uiCalendar.default.inherit({
        _getViewName: function() {
            return "year"
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return _date.default.sameMonthAndYear(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            return !_date.default.dateInRange(cellDate, _date.default.getFirstMonthDate(this.option("min")), _date.default.getLastMonthDate(this.option("max")))
        },
        _isOtherView: function() {
            return false
        },
        _isStartDayOfMonth: function() {
            return false
        },
        _isEndDayOfMonth: function() {
            return false
        },
        _getCellText: function(cellDate) {
            return _date2.default.getMonthNames("abbreviated")[cellDate.getMonth()]
        },
        _getFirstCellData: function() {
            var currentDate = this.option("date");
            var data = new Date(currentDate);
            data.setDate(1);
            data.setMonth(0);
            return data
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setMonth(date.getMonth() + 1);
            return date
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(foundDate, _date.default.getShortDateFormat()), "']"))
        },
        getCellAriaLabel: function(date) {
            return _date2.default.format(date, "monthandyear")
        },
        getNavigatorCaption: function() {
            return _date2.default.format(this.option("date"), "yyyy")
        },
        isBoundary: function(date) {
            return _date.default.sameYear(date, this.option("min")) || _date.default.sameYear(date, this.option("max"))
        },
        _renderWeekNumberCell: _common.noop
    }),
    decade: _uiCalendar.default.inherit({
        _getViewName: function() {
            return "decade"
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return _date.default.sameYear(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var min = this.option("min");
            var max = this.option("max");
            return !_date.default.dateInRange(cellDate.getFullYear(), min && min.getFullYear(), max && max.getFullYear())
        },
        _isOtherView: function(cellDate) {
            var date = new Date(cellDate);
            date.setMonth(1);
            return !_date.default.sameDecade(date, this.option("date"))
        },
        _isStartDayOfMonth: function() {
            return false
        },
        _isEndDayOfMonth: function() {
            return false
        },
        _getCellText: function(cellDate) {
            return _date2.default.format(cellDate, "yyyy")
        },
        _getFirstCellData: function() {
            var year = _date.default.getFirstYearInDecade(this.option("date")) - 1;
            return _date.default.createDateWithFullYear(year, 0, 1)
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setFullYear(date.getFullYear() + 1);
            return date
        },
        getNavigatorCaption: function() {
            var currentDate = this.option("date");
            var firstYearInDecade = _date.default.getFirstYearInDecade(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstYearInDecade);
            endDate.setFullYear(firstYearInDecade + 9);
            return _date2.default.format(startDate, "yyyy") + "-" + _date2.default.format(endDate, "yyyy")
        },
        _isValueOnCurrentView: function(currentDate, value) {
            return _date.default.sameDecade(currentDate, value)
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            foundDate.setMonth(0);
            return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(foundDate, _date.default.getShortDateFormat()), "']"))
        },
        isBoundary: function(date) {
            return _date.default.sameDecade(date, this.option("min")) || _date.default.sameDecade(date, this.option("max"))
        },
        _renderWeekNumberCell: _common.noop
    }),
    century: _uiCalendar.default.inherit({
        _getViewName: function() {
            return "century"
        },
        _isTodayCell: function(cellDate) {
            var today = this.option("_todayDate")();
            return _date.default.sameDecade(cellDate, today)
        },
        _isDateOutOfRange: function(cellDate) {
            var decade = _date.default.getFirstYearInDecade(cellDate);
            var minDecade = _date.default.getFirstYearInDecade(this.option("min"));
            var maxDecade = _date.default.getFirstYearInDecade(this.option("max"));
            return !_date.default.dateInRange(decade, minDecade, maxDecade)
        },
        _isOtherView: function(cellDate) {
            var date = new Date(cellDate);
            date.setMonth(1);
            return !_date.default.sameCentury(date, this.option("date"))
        },
        _isStartDayOfMonth: function() {
            return false
        },
        _isEndDayOfMonth: function() {
            return false
        },
        _getCellText: function(cellDate) {
            var startDate = _date2.default.format(cellDate, "yyyy");
            var endDate = new Date(cellDate);
            endDate.setFullYear(endDate.getFullYear() + 9);
            return startDate + " - " + _date2.default.format(endDate, "yyyy")
        },
        _getFirstCellData: function() {
            var decade = _date.default.getFirstDecadeInCentury(this.option("date")) - 10;
            return _date.default.createDateWithFullYear(decade, 0, 1)
        },
        _getNextCellData: function(date) {
            date = new Date(date);
            date.setFullYear(date.getFullYear() + 10);
            return date
        },
        _getCellByDate: function(date) {
            var foundDate = new Date(date);
            foundDate.setDate(1);
            foundDate.setMonth(0);
            foundDate.setFullYear(_date.default.getFirstYearInDecade(foundDate));
            return this._$table.find("td[data-value='".concat(_date_serialization.default.serializeDate(foundDate, _date.default.getShortDateFormat()), "']"))
        },
        getNavigatorCaption: function() {
            var currentDate = this.option("date");
            var firstDecadeInCentury = _date.default.getFirstDecadeInCentury(currentDate);
            var startDate = new Date(currentDate);
            var endDate = new Date(currentDate);
            startDate.setFullYear(firstDecadeInCentury);
            endDate.setFullYear(firstDecadeInCentury + 99);
            return _date2.default.format(startDate, "yyyy") + "-" + _date2.default.format(endDate, "yyyy")
        },
        isBoundary: function(date) {
            return _date.default.sameCentury(date, this.option("min")) || _date.default.sameCentury(date, this.option("max"))
        },
        _renderWeekNumberCell: _common.noop
    })
};
var _default = Views;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
