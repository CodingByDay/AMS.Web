/**
 * DevExtreme (esm/ui/calendar/ui.calendar.multi.selection.strategy.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import CalendarSelectionStrategy from "./ui.calendar.selection.strategy";
class CalendarMultiSelectionStrategy extends CalendarSelectionStrategy {
    constructor(component) {
        super(component);
        this.NAME = "MultiSelection"
    }
    getViewOptions() {
        return {
            value: this.dateOption("values"),
            range: [],
            selectionMode: "multi"
        }
    }
    selectValue(selectedValue, e) {
        var values = [...this.dateOption("values")];
        var alreadySelectedIndex = values.findIndex(date => (null === date || void 0 === date ? void 0 : date.toDateString()) === selectedValue.toDateString());
        if (alreadySelectedIndex > -1) {
            values.splice(alreadySelectedIndex, 1)
        } else {
            values.push(selectedValue)
        }
        this.skipNavigate();
        this._updateCurrentDate(selectedValue);
        this._currentDateChanged = true;
        this.dateValue(values, e)
    }
    updateAriaSelected(value, previousValue) {
        var _value, _previousValue;
        null !== (_value = value) && void 0 !== _value ? _value : value = this.dateOption("values");
        null !== (_previousValue = previousValue) && void 0 !== _previousValue ? _previousValue : previousValue = [];
        super.updateAriaSelected(value, previousValue)
    }
    getDefaultCurrentDate() {
        var dates = this.dateOption("values").filter(value => value);
        return this._getLowestDateInArray(dates)
    }
}
export default CalendarMultiSelectionStrategy;
