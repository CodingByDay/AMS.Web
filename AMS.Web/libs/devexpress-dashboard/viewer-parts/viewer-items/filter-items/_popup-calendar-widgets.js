﻿/**
* DevExpress Dashboard (_popup-calendar-widgets.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopupCalendarWidgets = void 0;
class PopupCalendarWidgets {
    constructor(calendarWidget, ..._widgetsToDispose) {
        this.calendarWidget = calendarWidget;
        this._widgetsToDispose = [];
        this._widgetsToDispose = _widgetsToDispose.filter(w => !!w);
    }
    dispose() {
        this.calendarWidget && this.calendarWidget.dispose();
        if (this._widgetsToDispose && this._widgetsToDispose.length) {
            this._widgetsToDispose.forEach(widget => widget.dispose());
        }
    }
}
exports.PopupCalendarWidgets = PopupCalendarWidgets;
