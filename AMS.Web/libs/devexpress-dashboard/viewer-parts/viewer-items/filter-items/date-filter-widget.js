﻿/**
* DevExpress Dashboard (date-filter-widget.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateFilterWidget = void 0;
const fx_1 = require("devextreme/animation/fx");
const string_1 = require("devextreme/core/utils/string");
const button_1 = require("devextreme/ui/button");
const button_group_1 = require("devextreme/ui/button_group");
const calendar_1 = require("devextreme/ui/calendar");
const date_box_1 = require("devextreme/ui/date_box");
const ui_overlay_1 = require("devextreme/ui/overlay/ui.overlay");
const _default_1 = require("../../../data/localization/_default");
const _formatter_1 = require("../../../data/_formatter");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _render_helper_1 = require("../../widgets/_render-helper");
const _utils_1 = require("../../_utils");
const _date_filter_widget_options_1 = require("./_date-filter-widget-options");
const _popup_calendar_widgets_1 = require("./_popup-calendar-widgets");
class DateFilterWidget {
    constructor(element, viewerOptions, boundaryElementContainer) {
        this.boundaryElementContainer = boundaryElementContainer;
        this._defaultButtonText = _default_1.getLocalizationById('DashboardStringId.DateFilterDatePickerButtonDefaultText');
        this._overlayShown = false;
        this._lockSelectionEvents = false;
        this._updateScrollableContainer = () => { };
        this._getBtnsContainerScrollWidth = () => 0;
        this._datePickerContent = new _date_filter_widget_options_1.DatePickerButtons();
        this.quickButtons = [];
        this._parent = document.createElement('div');
        element.appendChild(this._parent);
        this._scrollableContent = _render_helper_1.RenderHelper.wrapScrollable(this._parent, viewerOptions.overflow, 'both');
        this._updateScrollableContainer = () => _render_helper_1.RenderHelper.updateScrollable(this._parent);
    }
    get calendarFrom() {
        return (this._calendarWidgetsFrom && this._calendarWidgetsFrom.calendarWidget || null);
    }
    get calendarTo() {
        return (this._calendarWidgetsTo && this._calendarWidgetsTo.calendarWidget || null);
    }
    element() {
        return _jquery_helpers_1.wrapPublicElement(this._scrollableContent);
    }
    _update(widgetOptions) {
        this._options = Object.assign(Object.assign({}, this._getDefaultOptions()), widgetOptions);
        this._dispose();
        this._startDate = this._options.startDate;
        this._endDate = this._options.endDate;
        var hasQuickFilters = this._options.buttonsInfo.length > 0;
        var content = this._scrollableContent;
        this._widgetDiv = this._createDiv(content, _date_filter_widget_options_1.dateFilterWidgetClassNames.widget);
        var buttonsDiv = this._createButtonsDiv();
        this._getBtnsContainerScrollWidth = () => Math.ceil(buttonsDiv.scrollWidth);
        if (this._options.datePickerLocation == 'Near')
            this._addDatePicker(buttonsDiv);
        if (hasQuickFilters) {
            this._options.buttonsInfo.forEach(info => {
                let buttonDiv = this._createDiv(buttonsDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.button);
                var button = new button_group_1.default(buttonDiv, {
                    items: [{ text: info }],
                    selectionMode: 'multiple',
                    focusStateEnabled: false,
                    onSelectionChanged: e => {
                        if (!this._lockSelectionEvents) {
                            if (e.removedItems.length > 0)
                                this._options.clearAction();
                            if (e.addedItems.length > 0) {
                                this._selectQuickButton(e.component);
                                this._options.buttonClick(e.component.option('items')[0].text);
                            }
                        }
                    }
                });
                this.quickButtons.push(button);
            });
        }
        if (this._options.datePickerLocation == 'Far')
            this._addDatePicker(buttonsDiv);
        var overlayDiv = this._createDiv(this._widgetDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayWrapper);
        this._createDropDownContent();
        this._overlay = new ui_overlay_1.default(overlayDiv, this._getOverlayOptions());
        this._updateDropDownButtonText();
    }
    _getHeight() {
        return this._widgetDiv.offsetHeight;
    }
    _updateSize(width, height) {
        this._widgetDiv.style.height = 'auto';
        if (this._options.arrangementMode === 'Vertical') {
            this._widgetDiv.style.height = height + 'px';
            this._widgetDiv.style.width = width + 'px';
            let btnsContainerWidth = this._getBtnsContainerScrollWidth();
            let negativeBtnsContainerMargin = this._options.hasOuterMargin ? 0 : 6;
            if (btnsContainerWidth - Math.ceil(width) - negativeBtnsContainerMargin > 0) {
                this._widgetDiv.style.width = `${btnsContainerWidth}px`;
            }
            this._updateScrollableContainer();
        }
        else
            this._widgetDiv.style.width = width + 'px';
    }
    _setSelectedValues(values) {
        if (!!values && values.length > 0 && (!!values[0] || !!values[1])) {
            this._startDate = values[0];
            this._endDate = values[1];
            this._setDatePickerBtnState(true);
        }
        else {
            this._clearSelectedPeriods();
            this._setDatePickerBtnState(false);
        }
        this._updateDropDownButtonText();
    }
    _setPeriod(periodIndex) {
        var buttons = this.quickButtons;
        if (periodIndex != null && periodIndex < buttons.length) {
            this._setDatePickerBtnState(false);
            var button = buttons[periodIndex];
            button.option('selectedItems', button.option('items'));
        }
    }
    _clearSelectedPeriods() {
        this._performWithLockedEvents(() => {
            var buttons = this.quickButtons;
            for (var i = 0; i < buttons.length; i++) {
                buttons[i].option('selectedItems', []);
            }
        });
    }
    _clearSelectedValues() {
        this._setSelectedValues([]);
        this._clearSelectedPeriods();
    }
    _submit() {
        var filterType = this._options.filterType;
        if (filterType === 'After') {
            this._startDate = this._calendarWidgetsFrom.calendarWidget.option('value');
            this._endDate = null;
        }
        if (filterType === 'Before') {
            this._startDate = null;
            this._endDate = this._calendarWidgetsTo.calendarWidget.option('value');
        }
        if (filterType === 'Exact') {
            this._startDate = this._calendarWidgetsFrom.calendarWidget.option('value');
            this._endDate = this._calendarWidgetsFrom.calendarWidget.option('value');
        }
        if (filterType === 'Between') {
            this._startDate = this._calendarWidgetsFrom.calendarWidget.option('value');
            this._endDate = this._calendarWidgetsTo.calendarWidget.option('value');
        }
        this._applyValues();
        this._overlay.hide();
        this._updateDropDownButtonText();
    }
    _applyValues() {
        this._processItemClick([this._startDate, this._endDate]);
        this._performWithLockedEvents(() => {
            for (var i = 0; i < this.quickButtons.length; i++) {
                this.quickButtons[i].option('selectedItems', []);
            }
            this._setDatePickerBtnState(true);
        });
    }
    _addDatePicker(parentElement) {
        this._datePickerDiv = this._createDiv(parentElement, _date_filter_widget_options_1.dateFilterWidgetClassNames.button);
        this.datePickerButton = new button_group_1.default(this._datePickerDiv, {
            items: this._datePickerContent.getButtons(),
            focusStateEnabled: false,
            keyExpr: 'key',
            selectionMode: 'multiple',
            onSelectionChanged: e => {
                if (!this._lockSelectionEvents) {
                    if (e.removedItems.length > 0 && e.removedItems[0].key === 'Check') {
                        this._onDatePickerUnchecked();
                    }
                    var clickedButton = e.addedItems[0];
                    if (clickedButton) {
                        if (clickedButton.key === 'DropDown') {
                            this._showPopup();
                        }
                        if (clickedButton.key === 'Check') {
                            if (this._startDate == null && this._endDate == null) {
                                e.component.option('selectedItemKeys', []);
                                this._showPopup();
                            }
                            else {
                                this._applyValues();
                            }
                        }
                        var selection = e.component.option('selectedItemKeys');
                        selection = selection.filter((key) => { return key !== 'DropDown'; });
                        e.component.option('selectedItemKeys', selection);
                    }
                }
            }
        });
    }
    _getStartCalendarValue() {
        return this._startDate || this._options.minimum;
    }
    _getEndCalendarValue() {
        return this._endDate || this._options.maximum;
    }
    _createDiv(container, ...classes) {
        var div = document.createElement('div');
        if (container != null)
            container.appendChild(div);
        classes.forEach(className => this._addClass(div, className));
        return div;
    }
    _createButtonsDiv() {
        var classNames = [_date_filter_widget_options_1.dateFilterWidgetClassNames.buttons];
        if (this._options.arrangementMode === 'Vertical')
            classNames.push(_date_filter_widget_options_1.dateFilterWidgetClassNames.buttonsTopDown);
        else
            classNames.push(_date_filter_widget_options_1.dateFilterWidgetClassNames.buttonsLeftToRight);
        if (!this._options.hasOuterMargin)
            classNames.push(_date_filter_widget_options_1.dateFilterWidgetClassNames.buttonsNoPaddings);
        return this._createDiv(this._widgetDiv, ...classNames);
    }
    _createDropDownContent() {
        var filterType = this._options.filterType;
        this._dropDownContentDiv = this._createDiv(null, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlay);
        if (this._options.mobileLayout)
            this._addClass(this._dropDownContentDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.mobile);
        var createCalendar1 = (withButton) => {
            this._calendarWidgetsFrom = this._createDatePicker(this._dropDownContentDiv, (value) => { this._startDate = value; }, withButton);
        };
        var createCalendar2 = (withButton) => {
            this._calendarWidgetsTo = this._createDatePicker(this._dropDownContentDiv, (value) => { this._endDate = value; }, withButton);
        };
        if (filterType === 'Between') {
            createCalendar1(false);
            createCalendar2(true);
        }
        else if (filterType === 'Before')
            createCalendar2(true);
        else
            createCalendar1(true);
    }
    _createDatePicker(containerDiv, setDate, createButton) {
        if (this._options.mobileLayout)
            return this._createMobileCalendar(containerDiv, setDate, createButton);
        return this._createDesktopCalendar(containerDiv, createButton);
    }
    _createDesktopCalendar(containerDiv, createButton) {
        var div = this._createDiv(containerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayCalendarContainer);
        var calendar = this._createCalendar(div, (e) => {
            dateBox.option('value', e.value);
        });
        var textBoxValueChanged = (value) => {
            calendar.option('value', value);
        };
        var dateBox = this._createTextBox(div, textBoxValueChanged);
        var submitButton = createButton ? this._createSubmitButton(div) : null;
        return new _popup_calendar_widgets_1.PopupCalendarWidgets(calendar, dateBox, submitButton);
    }
    _createMobileCalendar(containerDiv, setDate, createButton) {
        var div = this._createDiv(containerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayCalendarContainer);
        var textBoxValueChanged = (value) => {
            setDate(value);
        };
        var dateBox = this._createTextBox(div, textBoxValueChanged);
        var submitButton = createButton ? this._createSubmitButton(div) : null;
        return new _popup_calendar_widgets_1.PopupCalendarWidgets(dateBox, submitButton);
    }
    _createCalendar(containerDiv, valueChanged) {
        var div = this._createDiv(containerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayCalendar);
        return new calendar_1.default(div, {
            focusStateEnabled: false,
            maxZoomLevel: _utils_1.CalendarHelper.getCalendarMaxZoomLevel(this._options.groupInterval),
            onValueChanged: valueChanged
        });
    }
    _createTextBox(containerDiv, textBoxValueChanged) {
        var div = this._createDiv(containerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayTextBox);
        return new date_box_1.default(div, {
            width: 'auto',
            useMaskBehavior: true,
            displayFormat: 'shortdate',
            showDropDownButton: false,
            type: 'date',
            onValueChanged: (e) => {
                textBoxValueChanged(e.value);
            }
        });
    }
    _createSubmitButton(containerDiv) {
        var div = this._createDiv(containerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayButton);
        return new button_1.default(div, {
            text: _default_1.getLocalizationById('DashboardStringId.ButtonApply'),
            onClick: (e) => {
                this._submit();
            }
        });
    }
    _processItemClick(values) {
        this._options.valueChanged && this._options.valueChanged(values);
    }
    _updateDropDownButtonText() {
        var start = this._startDate;
        var end = this._endDate;
        if (this.datePickerButton) {
            if (start || end) {
                var formatHandler = this._options.format;
                var startText = start ? formatHandler(start) : null;
                var endText = end ? formatHandler(end) : null;
                var formatPatten = this._options.displayTextPattern;
                if (!formatPatten) {
                    this._setDatePickerText(_formatter_1.constructIntervalFilterText({ left: startText, right: endText }), true);
                }
                else
                    this._setDatePickerText(string_1.format(formatPatten, startText, endText), true);
            }
            else {
                this._setDatePickerText(this._defaultButtonText, false);
            }
        }
    }
    _getDefaultOptions() {
        return {
            arrangementMode: 'AutoHeight',
            filterType: 'Between',
            datePickerLocation: 'Far',
            buttonsInfo: [],
            displayTextPattern: _default_1.getLocalizationById('DashboardStringId.FromToDatePeriodCaption'),
            groupInterval: 'DayMonthYear',
            format: (value) => value.toString()
        };
    }
    _addClass(el, className) {
        el.classList.add(className);
    }
    _removeClass(el, className) {
        el.classList.remove(className);
    }
    _dispose() {
        if (this._calendarWidgetsFrom) {
            this._calendarWidgetsFrom.dispose();
            this._calendarWidgetsFrom = null;
        }
        if (this._calendarWidgetsTo) {
            this._calendarWidgetsTo.dispose();
            this._calendarWidgetsTo = null;
        }
        this._scrollableContent.innerHTML = '';
        if (this.datePickerButton != null) {
            this.datePickerButton.dispose();
            this.datePickerButton = null;
        }
        for (var i = 0; i < this.quickButtons.length; i++)
            this.quickButtons[i].dispose();
        this.quickButtons = [];
        if (this._overlay) {
            this._overlay.dispose();
            this._overlay = null;
        }
    }
    _disposeWithElement() {
        this._dispose();
        if (this._parent && this._parent.parentElement)
            this._parent.parentElement.removeChild(this._parent);
        this._parent = null;
    }
    dispose() {
        this._disposeWithElement();
    }
    _getOverlayOptions() {
        var that = this;
        return {
            container: that.boundaryElementContainer,
            animation: false,
            width: this._getOverlayWidth(),
            height: 'auto',
            position: {
                collision: 'flipfit',
                my: 'top left',
                at: 'bottom left',
                of: that._datePickerDiv,
                boundary: that.boundaryElementContainer
            },
            onHidden: (e) => {
                that._overlayShown = false;
            },
            contentTemplate: (contentElement) => {
                _jquery_helpers_1.$unwrap(contentElement).appendChild(this._dropDownContentDiv);
            },
            hideOnOutsideClick: true,
            wrapperAttr: {
                class: _date_filter_widget_options_1.dateFilterWidgetClassNames.overlayWrapper
            }
        };
    }
    _getOverlayWidth() {
        if (this._options.mobileLayout)
            return function () { return _jquery_helpers_1.getWidth(window) * 0.9; };
        return 'auto';
    }
    _setDatePickerText(text, showDropDown) {
        if (!showDropDown)
            this._addClass(this._datePickerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.datePickerButtonEmpty);
        else
            this._removeClass(this._datePickerDiv, _date_filter_widget_options_1.dateFilterWidgetClassNames.datePickerButtonEmpty);
        this._datePickerContent.showDropDown = showDropDown;
        this._datePickerContent.text = text;
        this.datePickerButton.option('items', this._datePickerContent.getButtons());
    }
    _selectQuickButton(button) {
        this._performWithLockedEvents(() => {
            this._setDatePickerBtnState(false);
            for (var i = 0; i < this.quickButtons.length; i++) {
                if (button != this.quickButtons[i])
                    this.quickButtons[i].option('selectedItems', []);
            }
        });
    }
    _showPopup() {
        this._overlayShown = !this._overlayShown;
        this._overlay.toggle(this._overlayShown);
        fx_1.default.off = true;
        this._calendarWidgetsFrom && this._calendarWidgetsFrom.calendarWidget.option('value', this._getStartCalendarValue());
        this._calendarWidgetsTo && this._calendarWidgetsTo.calendarWidget.option('value', this._getEndCalendarValue());
        fx_1.default.off = false;
    }
    _setDatePickerBtnState(checked) {
        if (this.datePickerButton) {
            if (checked && this.datePickerButton.option('selectedItemKeys')[0] !== 'Check') {
                this.datePickerButton.option('selectedItemKeys', ['Check']);
            }
            else if (!checked && this.datePickerButton.option('selectedItemKeys').length !== 0) {
                this.datePickerButton.option('selectedItemKeys', []);
            }
        }
    }
    _onDatePickerUnchecked() {
        if (this.quickButtons.every(button => button.option('selectedItemKeys').length === 0))
            this._options.clearAction();
    }
    _performWithLockedEvents(action) {
        this._lockSelectionEvents = true;
        try {
            action();
        }
        finally {
            this._lockSelectionEvents = false;
        }
    }
}
exports.DateFilterWidget = DateFilterWidget;
