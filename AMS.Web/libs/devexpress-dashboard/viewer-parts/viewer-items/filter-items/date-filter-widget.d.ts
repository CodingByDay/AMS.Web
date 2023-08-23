﻿/**
* DevExpress Dashboard (date-filter-widget.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import dxButtonGroup from 'devextreme/ui/button_group';
import dxCalendar from 'devextreme/ui/calendar';
import dxOverlay, { Options as dxOverlayOptions } from 'devextreme/ui/overlay/ui.overlay';
import { DateFilterWidgetOptions, DatePickerButtons } from './_date-filter-widget-options';
import { PopupCalendarWidgets } from './_popup-calendar-widgets';
export declare class DateFilterWidget {
    private boundaryElementContainer;
    private _defaultButtonText;
    private _dropDownContentDiv;
    private _datePickerDiv;
    private _widgetDiv;
    private _scrollableContent;
    private _overlayShown;
    private _lockSelectionEvents;
    private _updateScrollableContainer;
    private _getBtnsContainerScrollWidth;
    private _parent;
    _datePickerContent: DatePickerButtons;
    _options: DateFilterWidgetOptions;
    _startDate: Date;
    _endDate: Date;
    _overlay: dxOverlay<dxOverlayOptions<any>>;
    quickButtons: Array<dxButtonGroup>;
    datePickerButton: dxButtonGroup;
    get calendarFrom(): dxCalendar;
    get calendarTo(): dxCalendar;
    _calendarWidgetsFrom: PopupCalendarWidgets;
    _calendarWidgetsTo: PopupCalendarWidgets;
    constructor(element: HTMLElement, viewerOptions: any, boundaryElementContainer: HTMLElement);
    element(): DxElement;
    _update(widgetOptions: DateFilterWidgetOptions): void;
    _getHeight(): number;
    _updateSize(width: number, height: number): void;
    _setSelectedValues(values: any[]): void;
    _setPeriod(periodIndex: number): void;
    _clearSelectedPeriods(): void;
    _clearSelectedValues(): void;
    _submit(): void;
    private _applyValues;
    private _addDatePicker;
    private _getStartCalendarValue;
    private _getEndCalendarValue;
    private _createDiv;
    private _createButtonsDiv;
    private _createDropDownContent;
    private _createDatePicker;
    private _createDesktopCalendar;
    private _createMobileCalendar;
    private _createCalendar;
    private _createTextBox;
    private _createSubmitButton;
    private _processItemClick;
    private _updateDropDownButtonText;
    private _getDefaultOptions;
    private _addClass;
    private _removeClass;
    private _dispose;
    _disposeWithElement(): void;
    dispose(): void;
    private _getOverlayOptions;
    private _getOverlayWidth;
    private _setDatePickerText;
    private _selectQuickButton;
    private _showPopup;
    private _setDatePickerBtnState;
    private _onDatePickerUnchecked;
    private _performWithLockedEvents;
}
