/**
 * DevExtreme (esm/ui/calendar/ui.calendar.range.selection.strategy.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import dateUtils from "../../core/utils/date";
import CalendarSelectionStrategy from "./ui.calendar.selection.strategy";
var DAY_INTERVAL = 864e5;
var RANGE_OFFSET = 120 * DAY_INTERVAL;
class CalendarRangeSelectionStrategy extends CalendarSelectionStrategy {
    constructor(component) {
        super(component);
        this.NAME = "RangeSelection"
    }
    getViewOptions() {
        var value = this._getValues();
        var range = this._getDaysInRange(value[0], value[1]);
        return {
            value: value,
            range: range,
            selectionMode: "range",
            onCellHover: this._cellHoverHandler.bind(this)
        }
    }
    selectValue(selectedValue, e) {
        var [startDate, endDate] = this._getValues();
        this.skipNavigate();
        this._updateCurrentDate(selectedValue);
        this._currentDateChanged = true;
        if (true === this.calendar.option("_allowChangeSelectionOrder")) {
            this.calendar._valueSelected = true;
            if ("startDate" === this.calendar.option("_currentSelection")) {
                if (this.calendar._convertToDate(selectedValue) > this.calendar._convertToDate(endDate)) {
                    this.dateValue([selectedValue, null], e)
                } else {
                    this.dateValue([selectedValue, endDate], e)
                }
            } else if (this.calendar._convertToDate(selectedValue) >= this.calendar._convertToDate(startDate)) {
                this.dateValue([startDate, selectedValue], e)
            } else {
                this.dateValue([selectedValue, null], e)
            }
        } else if (!startDate || endDate) {
            this.dateValue([selectedValue, null], e)
        } else {
            this.dateValue(startDate < selectedValue ? [startDate, selectedValue] : [selectedValue, startDate], e)
        }
    }
    updateAriaSelected(value, previousValue) {
        var _value, _previousValue;
        null !== (_value = value) && void 0 !== _value ? _value : value = this._getValues();
        null !== (_previousValue = previousValue) && void 0 !== _previousValue ? _previousValue : previousValue = [];
        super.updateAriaSelected(value, previousValue)
    }
    processValueChanged(value, previousValue) {
        super.processValueChanged(value, previousValue);
        var range = this._getRange();
        this._updateViewsOption("range", range)
    }
    getDefaultCurrentDate() {
        var {
            _allowChangeSelectionOrder: _allowChangeSelectionOrder,
            _currentSelection: _currentSelection
        } = this.calendar.option();
        var values = this.dateOption("values");
        if (_allowChangeSelectionOrder) {
            if ("startDate" === _currentSelection && values[0]) {
                return values[0]
            }
            if ("endDate" === _currentSelection && values[1]) {
                return values[1]
            }
        }
        var dates = values.filter(value => value);
        return this._getLowestDateInArray(dates)
    }
    _getValues() {
        var values = this.dateOption("values");
        if (!values.length) {
            return values
        }
        var [startDate, endDate] = values;
        if (startDate && endDate && startDate > endDate) {
            [startDate, endDate] = [endDate, startDate]
        }
        return [startDate, endDate]
    }
    _getRange() {
        var [startDate, endDate] = this._getValues();
        return this._getDaysInRange(startDate, endDate)
    }
    _getDaysInRange(startDate, endDate) {
        if (!startDate || !endDate) {
            return []
        }
        var currentDate = this.calendar.option("currentDate").getTime();
        var rangeStartDate = new Date(Math.max(currentDate - RANGE_OFFSET, startDate));
        var rangeEndDate = new Date(Math.min(currentDate + RANGE_OFFSET, endDate));
        return [...dateUtils.getDatesOfInterval(rangeStartDate, rangeEndDate, DAY_INTERVAL), rangeEndDate]
    }
    _cellHoverHandler(e) {
        var isMaxZoomLevel = this._isMaxZoomLevel();
        var [startDate, endDate] = this._getValues();
        var {
            _allowChangeSelectionOrder: _allowChangeSelectionOrder,
            _currentSelection: _currentSelection
        } = this.calendar.option();
        if (isMaxZoomLevel) {
            var skipHoveredRange = _allowChangeSelectionOrder && "startDate" === _currentSelection;
            if (startDate && !endDate && !skipHoveredRange) {
                if (e.value > startDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(startDate, e.value));
                    return
                }
            } else if (!startDate && endDate && !(_allowChangeSelectionOrder && "endDate" === _currentSelection)) {
                if (e.value < endDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, endDate));
                    return
                }
            } else if (startDate && endDate) {
                if ("startDate" === _currentSelection && e.value < startDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(e.value, startDate));
                    return
                } else if ("endDate" === _currentSelection && e.value > endDate) {
                    this._updateViewsOption("hoveredRange", this._getDaysInRange(endDate, e.value));
                    return
                }
            }
            this._updateViewsOption("hoveredRange", [])
        }
    }
}
export default CalendarRangeSelectionStrategy;
