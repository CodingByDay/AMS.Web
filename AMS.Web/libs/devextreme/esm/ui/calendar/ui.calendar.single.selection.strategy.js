/**
 * DevExtreme (esm/ui/calendar/ui.calendar.single.selection.strategy.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import CalendarSelectionStrategy from "./ui.calendar.selection.strategy";
class CalendarSingleSelectionStrategy extends CalendarSelectionStrategy {
    constructor(component) {
        super(component);
        this.NAME = "SingleSelection"
    }
    getViewOptions() {
        return {
            value: this.dateOption("value"),
            range: [],
            selectionMode: "single"
        }
    }
    selectValue(selectedValue, e) {
        this.skipNavigate();
        this.dateValue(selectedValue, e)
    }
    updateAriaSelected(value, previousValue) {
        var _value, _previousValue;
        null !== (_value = value) && void 0 !== _value ? _value : value = [this.dateOption("value")];
        null !== (_previousValue = previousValue) && void 0 !== _previousValue ? _previousValue : previousValue = [];
        super.updateAriaSelected(value, previousValue)
    }
    getDefaultCurrentDate() {
        return this.dateOption("value")
    }
    _updateViewsValue(value) {
        this._updateViewsOption("value", value[0])
    }
}
export default CalendarSingleSelectionStrategy;
