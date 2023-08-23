﻿/**
* DevExpress Dashboard (_custom-time-period-dialog.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/date_box';
import dxDateBox from 'devextreme/ui/date_box';
import { DayOfWeekNumber } from '../../../data/_formatter';
import { rangeFilterSelection } from '../../viewer-items/range-selector-item/_range-selector-item';
import { CalendarZoomLevel } from '../../_utils';
import { dialogForm } from './_dialog-form';
export interface CustomTimePeriodDialogOptions {
    range: rangeFilterSelection;
    isIntYearGroupInterval: boolean;
    groupInterval: any;
    displayFormat: any;
    firstDayOfWeek: DayOfWeekNumber;
}
export declare class customTimePeriodDialog {
    options: {
        container: HTMLElement;
        setRange: (range: any) => void;
    };
    setRange: any;
    range: any;
    format: 'date' | 'datetime' | 'time';
    displayFormatFunc: any;
    maxZoomLevel: CalendarZoomLevel;
    leftCalendar: dxDateBox;
    rightCalendar: dxDateBox;
    disabledDates: ((data: {
        component?: dxDateBox;
        date?: Date;
        view?: string;
    }) => boolean);
    dialogForm: dialogForm;
    constructor(options: {
        container: HTMLElement;
        setRange: (range: any) => void;
    });
    _initialize(): void;
    show(options: CustomTimePeriodDialogOptions): void;
    dispose(): void;
}
