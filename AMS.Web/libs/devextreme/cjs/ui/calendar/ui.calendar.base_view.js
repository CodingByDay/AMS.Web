/**
 * DevExtreme (cjs/ui/calendar/ui.calendar.base_view.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _element_data = require("../../core/element_data");
var _element = require("../../core/element");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _date = _interopRequireDefault(require("../../core/utils/date"));
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _date_serialization = _interopRequireDefault(require("../../core/utils/date_serialization"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _index = require("../../events/utils/index");
var _click = require("../../events/click");
var _hover = require("../../events/hover");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var abstract = _ui.default.abstract;
var CALENDAR_OTHER_VIEW_CLASS = "dx-calendar-other-view";
var CALENDAR_CELL_CLASS = "dx-calendar-cell";
var CALENDAR_CELL_START_CLASS = "dx-calendar-cell-start";
var CALENDAR_CELL_END_CLASS = "dx-calendar-cell-end";
var CALENDAR_CELL_START_IN_ROW_CLASS = "dx-calendar-cell-start-in-row";
var CALENDAR_CELL_END_IN_ROW_CLASS = "dx-calendar-cell-end-in-row";
var CALENDAR_WEEK_NUMBER_CELL_CLASS = "dx-calendar-week-number-cell";
var CALENDAR_EMPTY_CELL_CLASS = "dx-calendar-empty-cell";
var CALENDAR_TODAY_CLASS = "dx-calendar-today";
var CALENDAR_SELECTED_DATE_CLASS = "dx-calendar-selected-date";
var CALENDAR_CELL_IN_RANGE_CLASS = "dx-calendar-cell-in-range";
var CALENDAR_CELL_RANGE_HOVER_CLASS = "dx-calendar-cell-range-hover";
var CALENDAR_CELL_RANGE_HOVER_START_CLASS = "dx-calendar-cell-range-hover-start";
var CALENDAR_CELL_RANGE_HOVER_END_CLASS = "dx-calendar-cell-range-hover-end";
var CALENDAR_RANGE_START_DATE_CLASS = "dx-calendar-range-start-date";
var CALENDAR_RANGE_END_DATE_CLASS = "dx-calendar-range-end-date";
var CALENDAR_CONTOURED_DATE_CLASS = "dx-calendar-contoured-date";
var NOT_WEEK_CELL_SELECTOR = "td:not(.".concat(CALENDAR_WEEK_NUMBER_CELL_CLASS, ")");
var CALENDAR_DXCLICK_EVENT_NAME = (0, _index.addNamespace)(_click.name, "dxCalendar");
var CALENDAR_DXHOVERSTART_EVENT_NAME = (0, _index.addNamespace)(_hover.start, "dxCalendar");
var CALENDAR_DATE_VALUE_KEY = "dxDateValueKey";
var BaseView = _ui.default.inherit({
    _getViewName: function() {
        return "base"
    },
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            date: new Date,
            focusStateEnabled: false,
            cellTemplate: null,
            disabledDates: null,
            onCellClick: null,
            onCellHover: null,
            rowCount: 3,
            colCount: 4,
            allowValueSelection: true,
            _todayDate: function() {
                return new Date
            }
        })
    },
    _initMarkup: function() {
        this.callBase();
        this._renderImpl()
    },
    _renderImpl: function() {
        this.$element().append(this._createTable());
        this._createDisabledDatesHandler();
        this._renderBody();
        this._renderContouredDate();
        this._renderValue();
        this._renderRange();
        this._renderEvents()
    },
    _createTable: function() {
        this._$table = (0, _renderer.default)("<table>");
        var localizedWidgetName = _message.default.format("dxCalendar-ariaWidgetName");
        var localizedHotKeysInfo = _message.default.format("dxCalendar-ariaHotKeysInfo");
        this.setAria({
            label: "".concat(localizedWidgetName, ". ").concat(localizedHotKeysInfo),
            role: "grid"
        }, this._$table);
        return this._$table
    },
    _renderBody: function() {
        this.$body = (0, _renderer.default)("<tbody>").appendTo(this._$table);
        var rowData = {
            cellDate: this._getFirstCellData(),
            prevCellDate: null
        };
        for (var rowIndex = 0, rowCount = this.option("rowCount"); rowIndex < rowCount; rowIndex++) {
            rowData.row = this._createRow();
            for (var colIndex = 0, colCount = this.option("colCount"); colIndex < colCount; colIndex++) {
                this._renderCell(rowData, colIndex)
            }
            this._renderWeekNumberCell(rowData)
        }
    },
    _createRow: function() {
        var row = _dom_adapter.default.createElement("tr");
        this.setAria("role", "row", (0, _renderer.default)(row));
        this.$body.get(0).appendChild(row);
        return row
    },
    _createCell: function(cellDate, cellIndex) {
        var cell = _dom_adapter.default.createElement("td");
        var $cell = (0, _renderer.default)(cell);
        cell.className = this._getClassNameByDate(cellDate, cellIndex);
        cell.setAttribute("data-value", _date_serialization.default.serializeDate(cellDate, _date.default.getShortDateFormat()));
        (0, _element_data.data)(cell, CALENDAR_DATE_VALUE_KEY, cellDate);
        this.setAria({
            role: "gridcell",
            label: this.getCellAriaLabel(cellDate)
        }, $cell);
        return {
            cell: cell,
            $cell: $cell
        }
    },
    _renderCell: function(params, cellIndex) {
        var cellDate = params.cellDate,
            prevCellDate = params.prevCellDate,
            row = params.row;
        if (prevCellDate) {
            _date.default.fixTimezoneGap(prevCellDate, cellDate)
        }
        params.prevCellDate = cellDate;
        var _this$_createCell = this._createCell(cellDate, cellIndex),
            cell = _this$_createCell.cell,
            $cell = _this$_createCell.$cell;
        var cellTemplate = this.option("cellTemplate");
        (0, _renderer.default)(row).append(cell);
        if (cellTemplate) {
            cellTemplate.render(this._prepareCellTemplateData(cellDate, cellIndex, $cell))
        } else {
            cell.innerHTML = this._getCellText(cellDate)
        }
        params.cellDate = this._getNextCellData(cellDate)
    },
    _getClassNameByDate: function(cellDate, cellIndex) {
        var className = CALENDAR_CELL_CLASS;
        if (this._isTodayCell(cellDate)) {
            className += " ".concat(CALENDAR_TODAY_CLASS)
        }
        if (this._isDateOutOfRange(cellDate) || this.isDateDisabled(cellDate)) {
            className += " ".concat(CALENDAR_EMPTY_CELL_CLASS)
        }
        if (this._isOtherView(cellDate)) {
            className += " ".concat(CALENDAR_OTHER_VIEW_CLASS)
        }
        if ("range" === this.option("selectionMode")) {
            if (0 === cellIndex) {
                className += " ".concat(CALENDAR_CELL_START_IN_ROW_CLASS)
            }
            if (cellIndex === this.option("colCount") - 1) {
                className += " ".concat(CALENDAR_CELL_END_IN_ROW_CLASS)
            }
            if (this._isStartDayOfMonth(cellDate)) {
                className += " ".concat(CALENDAR_CELL_START_CLASS)
            }
            if (this._isEndDayOfMonth(cellDate)) {
                className += " ".concat(CALENDAR_CELL_END_CLASS)
            }
        }
        return className
    },
    _prepareCellTemplateData: function(cellDate, cellIndex, $cell) {
        var isDateCell = cellDate instanceof Date;
        var text = isDateCell ? this._getCellText(cellDate) : cellDate;
        var date = isDateCell ? cellDate : void 0;
        var view = this._getViewName();
        return {
            model: {
                text: text,
                date: date,
                view: view
            },
            container: (0, _element.getPublicElement)($cell),
            index: cellIndex
        }
    },
    _renderEvents: function() {
        var _this = this;
        this._createCellClickAction();
        _events_engine.default.off(this._$table, CALENDAR_DXCLICK_EVENT_NAME);
        _events_engine.default.on(this._$table, CALENDAR_DXCLICK_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, (function(e) {
            if (!(0, _renderer.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
                _this._cellClickAction({
                    event: e,
                    value: (0, _renderer.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
                })
            }
        }));
        _events_engine.default.off(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME);
        if ("range" === this.option("selectionMode")) {
            this._createCellHoverAction();
            _events_engine.default.on(this._$table, CALENDAR_DXHOVERSTART_EVENT_NAME, NOT_WEEK_CELL_SELECTOR, (function(e) {
                if (!(0, _renderer.default)(e.currentTarget).hasClass(CALENDAR_EMPTY_CELL_CLASS)) {
                    _this._cellHoverAction({
                        event: e,
                        value: (0, _renderer.default)(e.currentTarget).data(CALENDAR_DATE_VALUE_KEY)
                    })
                }
            }))
        }
    },
    _createCellClickAction: function() {
        this._cellClickAction = this._createActionByOption("onCellClick")
    },
    _createCellHoverAction: function() {
        this._cellHoverAction = this._createActionByOption("onCellHover")
    },
    _createDisabledDatesHandler: function() {
        var disabledDates = this.option("disabledDates");
        this._disabledDatesHandler = Array.isArray(disabledDates) ? this._getDefaultDisabledDatesHandler(disabledDates) : disabledDates || _common.noop
    },
    _getDefaultDisabledDatesHandler: function(disabledDates) {
        return _common.noop
    },
    _isTodayCell: abstract,
    _isDateOutOfRange: abstract,
    isDateDisabled: function(cellDate) {
        var dateParts = {
            date: cellDate,
            view: this._getViewName()
        };
        return this._disabledDatesHandler(dateParts)
    },
    _isOtherView: abstract,
    _isStartDayOfMonth: abstract,
    _isEndDayOfMonth: abstract,
    _getCellText: abstract,
    _getFirstCellData: abstract,
    _getNextCellData: abstract,
    _renderContouredDate: function(contouredDate) {
        if (!this.option("focusStateEnabled")) {
            return
        }
        contouredDate = contouredDate || this.option("contouredDate");
        var $oldContouredCell = this._getContouredCell();
        var $newContouredCell = this._getCellByDate(contouredDate);
        $oldContouredCell.removeClass(CALENDAR_CONTOURED_DATE_CLASS);
        if (contouredDate) {
            $newContouredCell.addClass(CALENDAR_CONTOURED_DATE_CLASS)
        }
    },
    _getContouredCell: function() {
        return this._$table.find(".".concat(CALENDAR_CONTOURED_DATE_CLASS))
    },
    _renderValue: function() {
        if (!this.option("allowValueSelection")) {
            return
        }
        var value = this.option("value");
        if (!Array.isArray(value)) {
            value = [value]
        }
        this._updateSelectedClass(value)
    },
    _updateSelectedClass: function(value) {
        var _this$_$selectedCells, _this2 = this;
        null === (_this$_$selectedCells = this._$selectedCells) || void 0 === _this$_$selectedCells ? void 0 : _this$_$selectedCells.forEach((function($cell) {
            $cell.removeClass(CALENDAR_SELECTED_DATE_CLASS)
        }));
        this._$selectedCells = value.map((function(value) {
            return _this2._getCellByDate(value)
        }));
        this._$selectedCells.forEach((function($cell) {
            $cell.addClass(CALENDAR_SELECTED_DATE_CLASS)
        }))
    },
    _renderRange: function() {
        var _this$_$rangeCells, _this$_$hoveredRangeC, _this$_$rangeStartHov, _this$_$rangeEndHover, _this$_$rangeStartDat, _this$_$rangeEndDateC, _this$_$rangeStartDat2, _this$_$rangeEndDateC2, _this3 = this;
        var _this$option = this.option(),
            allowValueSelection = _this$option.allowValueSelection,
            selectionMode = _this$option.selectionMode,
            value = _this$option.value,
            range = _this$option.range;
        if (!allowValueSelection || "range" !== selectionMode) {
            return
        }
        null === (_this$_$rangeCells = this._$rangeCells) || void 0 === _this$_$rangeCells ? void 0 : _this$_$rangeCells.forEach((function($cell) {
            $cell.removeClass(CALENDAR_CELL_IN_RANGE_CLASS)
        }));
        null === (_this$_$hoveredRangeC = this._$hoveredRangeCells) || void 0 === _this$_$hoveredRangeC ? void 0 : _this$_$hoveredRangeC.forEach((function($cell) {
            $cell.removeClass(CALENDAR_CELL_RANGE_HOVER_CLASS)
        }));
        null === (_this$_$rangeStartHov = this._$rangeStartHoverCell) || void 0 === _this$_$rangeStartHov ? void 0 : _this$_$rangeStartHov.removeClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
        null === (_this$_$rangeEndHover = this._$rangeEndHoverCell) || void 0 === _this$_$rangeEndHover ? void 0 : _this$_$rangeEndHover.removeClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
        null === (_this$_$rangeStartDat = this._$rangeStartDateCell) || void 0 === _this$_$rangeStartDat ? void 0 : _this$_$rangeStartDat.removeClass(CALENDAR_RANGE_START_DATE_CLASS);
        null === (_this$_$rangeEndDateC = this._$rangeEndDateCell) || void 0 === _this$_$rangeEndDateC ? void 0 : _this$_$rangeEndDateC.removeClass(CALENDAR_RANGE_END_DATE_CLASS);
        this._$rangeCells = range.map((function(value) {
            return _this3._getCellByDate(value)
        }));
        this._$rangeStartDateCell = this._getCellByDate(value[0]);
        this._$rangeEndDateCell = this._getCellByDate(value[1]);
        this._$rangeCells.forEach((function($cell) {
            $cell.addClass(CALENDAR_CELL_IN_RANGE_CLASS)
        }));
        null === (_this$_$rangeStartDat2 = this._$rangeStartDateCell) || void 0 === _this$_$rangeStartDat2 ? void 0 : _this$_$rangeStartDat2.addClass(CALENDAR_RANGE_START_DATE_CLASS);
        null === (_this$_$rangeEndDateC2 = this._$rangeEndDateCell) || void 0 === _this$_$rangeEndDateC2 ? void 0 : _this$_$rangeEndDateC2.addClass(CALENDAR_RANGE_END_DATE_CLASS)
    },
    _renderHoveredRange: function() {
        var _this$_$hoveredRangeC2, _this$_$rangeStartHov2, _this$_$rangeEndHover2, _this$_$rangeStartHov3, _this$_$rangeEndHover3, _this4 = this;
        var _this$option2 = this.option(),
            allowValueSelection = _this$option2.allowValueSelection,
            selectionMode = _this$option2.selectionMode,
            hoveredRange = _this$option2.hoveredRange;
        if (!allowValueSelection || "range" !== selectionMode) {
            return
        }
        null === (_this$_$hoveredRangeC2 = this._$hoveredRangeCells) || void 0 === _this$_$hoveredRangeC2 ? void 0 : _this$_$hoveredRangeC2.forEach((function($cell) {
            $cell.removeClass(CALENDAR_CELL_RANGE_HOVER_CLASS)
        }));
        null === (_this$_$rangeStartHov2 = this._$rangeStartHoverCell) || void 0 === _this$_$rangeStartHov2 ? void 0 : _this$_$rangeStartHov2.removeClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
        null === (_this$_$rangeEndHover2 = this._$rangeEndHoverCell) || void 0 === _this$_$rangeEndHover2 ? void 0 : _this$_$rangeEndHover2.removeClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS);
        this._$hoveredRangeCells = hoveredRange.map((function(value) {
            return _this4._getCellByDate(value)
        }));
        this._$rangeStartHoverCell = this._getCellByDate(hoveredRange[0]);
        this._$rangeEndHoverCell = this._getCellByDate(hoveredRange[hoveredRange.length - 1]);
        this._$hoveredRangeCells.forEach((function($cell) {
            $cell.addClass(CALENDAR_CELL_RANGE_HOVER_CLASS)
        }));
        null === (_this$_$rangeStartHov3 = this._$rangeStartHoverCell) || void 0 === _this$_$rangeStartHov3 ? void 0 : _this$_$rangeStartHov3.addClass(CALENDAR_CELL_RANGE_HOVER_START_CLASS);
        null === (_this$_$rangeEndHover3 = this._$rangeEndHoverCell) || void 0 === _this$_$rangeEndHover3 ? void 0 : _this$_$rangeEndHover3.addClass(CALENDAR_CELL_RANGE_HOVER_END_CLASS)
    },
    getCellAriaLabel: function(date) {
        return this._getCellText(date)
    },
    _getFirstAvailableDate: function() {
        var date = this.option("date");
        var min = this.option("min");
        date = _date.default.getViewFirstCellDate(this._getViewName(), date);
        return new Date(min && date < min ? min : date)
    },
    _getCellByDate: abstract,
    isBoundary: abstract,
    _optionChanged: function(args) {
        var name = args.name,
            value = args.value;
        switch (name) {
            case "value":
                this._renderValue();
                break;
            case "range":
                this._renderRange();
                break;
            case "hoveredRange":
                this._renderHoveredRange();
                break;
            case "contouredDate":
                this._renderContouredDate(value);
                break;
            case "onCellClick":
                this._createCellClickAction();
                break;
            case "onCellHover":
                this._createCellHoverAction();
                break;
            case "min":
            case "max":
            case "disabledDates":
            case "cellTemplate":
            case "selectionMode":
                this._invalidate();
                break;
            case "_todayDate":
                this._renderBody();
                break;
            default:
                this.callBase(args)
        }
    }
});
var _default = BaseView;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
