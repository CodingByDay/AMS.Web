﻿/**
* DevExpress Dashboard (_custom-time-period-dialog.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customTimePeriodDialog = void 0;
require("devextreme/ui/date_box");
const date_box_1 = require("devextreme/ui/date_box");
const _format_helper_1 = require("../../../data/_format-helper");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _dashboard_layout_mode_helper_1 = require("../../_dashboard-layout-mode-helper");
const _utils_1 = require("../../_utils");
const _dialog_form_1 = require("./_dialog-form");
var customTimePeriodDialogClassNames = {
    emptyButton: 'dx-dashboard-custom-time-period-empty-button',
    leftPeriod: 'dx-dashboard-custom-time-period-dialog-left-period',
    rightPeriod: 'dx-dashboard-custom-time-period-dialog-right-period'
};
class customTimePeriodDialog {
    constructor(options) {
        this.options = options;
        this.setRange = options.setRange;
        this._initialize();
    }
    _initialize() {
        this.dialogForm = new _dialog_form_1.dialogForm({
            dialogContainer: this.options.container,
            width: 'auto',
            height: 'auto',
            allowScrolling: true,
            deferredRendering: true,
            title: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SelectRange),
            buttons: [{
                    className: customTimePeriodDialogClassNames.emptyButton
                }, {
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonOK),
                    hide: true,
                    func: () => {
                        this.setRange({ startValue: this.leftCalendar.option('value'), endValue: this.rightCalendar.option('value') });
                    },
                    isDefault: true
                }, {
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonCancel),
                    hide: true,
                    func: () => { }
                }
            ],
            renderContent: () => {
                let form = document.createElement('div');
                form.classList.add(_dialog_form_1.dialogClasses.form);
                let fromText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.RangeFilterSelectRangeFromCaption);
                let toText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.RangeFilterSelectRangeToCaption);
                let leftDate = document.createElement('div');
                leftDate.style.width = '100%';
                let rightDate = document.createElement('div');
                rightDate.style.width = '100%';
                let left = document.createElement('div');
                left.classList.add(customTimePeriodDialogClassNames.leftPeriod);
                let right = document.createElement('div');
                right.classList.add(customTimePeriodDialogClassNames.rightPeriod);
                let options = {
                    pickerType: _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isTouch ? 'rollers' : 'calendar',
                    type: this.format,
                    calendarOptions: {
                        maxZoomLevel: this.maxZoomLevel,
                    },
                    displayFormat: this.displayFormatFunc,
                    acceptCustomValue: false,
                    applyButtonText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonOK),
                    cancelButtonText: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonCancel),
                    placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.SelectDate),
                    dropDownOptions: {
                        container: this.options.container
                    },
                    disabledDates: this.disabledDates,
                };
                let fromTextSpan = document.createElement('span');
                fromTextSpan.innerText = fromText;
                left.appendChild(fromTextSpan);
                left.appendChild(leftDate);
                this.leftCalendar = new date_box_1.default(leftDate, Object.assign(Object.assign({}, options), { value: this.range.minimum || new Date() }));
                let toTextSpan = document.createElement('span');
                toTextSpan.innerText = toText;
                right.appendChild(toTextSpan);
                right.appendChild(rightDate);
                this.rightCalendar = new date_box_1.default(rightDate, Object.assign(Object.assign({}, options), { value: this.range.maximum || new Date() }));
                form.appendChild(left);
                form.appendChild(document.createElement('br'));
                form.appendChild(right);
                return form;
            },
            disposeContent: () => {
                this.leftCalendar && this.leftCalendar.dispose();
                this.rightCalendar && this.rightCalendar.dispose();
            },
            setActualState: (width) => {
            }
        });
    }
    show(options) {
        this.range = options.range;
        if (options.isIntYearGroupInterval && this.range.minimum && this.range.maximum) {
            this.range.minimum = new Date(this.range.minimum, 0, 1);
            this.range.maximum = new Date(this.range.maximum, 0, 1);
        }
        this.format = _utils_1.CalendarHelper.getCalendarType(options.groupInterval);
        this.maxZoomLevel = _utils_1.CalendarHelper.getCalendarMaxZoomLevel(options.groupInterval);
        this.displayFormatFunc = value => {
            if (options.isIntYearGroupInterval)
                value = value.getFullYear();
            return _format_helper_1.DashboardFormatHelper.format(value, options.displayFormat);
        };
        this.disabledDates = options.groupInterval === 'WeekYear' ? (args) => args.date.getDay() !== options.firstDayOfWeek : undefined;
        this.dialogForm.showDialog();
    }
    dispose() {
        this.dialogForm && this.dialogForm.dispose();
    }
}
exports.customTimePeriodDialog = customTimePeriodDialog;
