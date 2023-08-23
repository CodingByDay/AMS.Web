﻿/**
* DevExpress Dashboard (_popup-calendar-widgets.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import Widget from 'devextreme/ui/widget/ui.widget';
export declare class PopupCalendarWidgets {
    calendarWidget: Widget<any>;
    private _widgetsToDispose;
    constructor(calendarWidget: Widget<any>, ..._widgetsToDispose: Widget<any>[]);
    dispose(): void;
}
