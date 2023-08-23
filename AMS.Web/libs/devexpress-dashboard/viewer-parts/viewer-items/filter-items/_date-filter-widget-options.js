﻿/**
* DevExpress Dashboard (_date-filter-widget-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerButtons = exports.DatePickerButtonElement = exports.DateFilterWidgetOptions = exports.dateFilterWidgetClassNames = void 0;
exports.dateFilterWidgetClassNames = {
    widget: 'dx-dashboard-date-filter-widget',
    buttons: 'dx-dashboard-date-filter-buttons',
    buttonsNoPaddings: 'dx-dashboard-date-filter-buttons-no-caption',
    buttonsLeftToRight: 'dx-dashboard-date-filter-buttons-left-to-right',
    buttonsTopDown: 'dx-dashboard-date-filter-buttons-top-down',
    button: 'dx-dashboard-date-filter-button',
    datePickerButtonEmpty: 'dx-dashboard-date-filter-datepicker-button-empty',
    overlayWrapper: 'dx-dashboard-date-filter-overlay-wrapper',
    overlay: 'dx-dashboard-date-filter-overlay',
    mobile: 'dx-dashboard-date-filter-mobile',
    overlayCalendarContainer: 'dx-dashboard-date-filter-overlay-calendar-container',
    overlayCalendar: 'dx-dashboard-date-filter-overlay-calendar',
    overlayTextBox: 'dx-dashboard-date-filter-overlay-text-box',
    overlayButton: 'dx-dashboard-date-filter-overlay-button'
};
class DateFilterWidgetOptions {
}
exports.DateFilterWidgetOptions = DateFilterWidgetOptions;
class DatePickerButtonElement {
}
exports.DatePickerButtonElement = DatePickerButtonElement;
class DatePickerButtons {
    constructor() {
        this.showDropDown = false;
        this.checkButton = { key: 'Check' };
        this.dropDownButton = { key: 'DropDown', icon: 'edit' };
    }
    get text() {
        return this.checkButton.text;
    }
    set text(value) {
        this.checkButton.text = value;
    }
    getButtons() {
        var buttons = [];
        buttons.push(this.checkButton);
        if (this.showDropDown)
            buttons.push(this.dropDownButton);
        return buttons;
    }
}
exports.DatePickerButtons = DatePickerButtons;
