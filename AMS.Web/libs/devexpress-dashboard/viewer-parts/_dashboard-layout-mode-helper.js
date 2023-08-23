﻿/**
* DevExpress Dashboard (_dashboard-layout-mode-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutModeHelper = void 0;
const devices_1 = require("devextreme/core/devices");
const support_1 = require("devextreme/core/utils/support");
class DashboardLayoutModeHelper {
    static get isMobile() {
        if (DashboardLayoutModeHelper._forceMobileMode !== null)
            return DashboardLayoutModeHelper._forceMobileMode;
        return devices_1.default.current().phone || devices_1.default.current().tablet;
    }
    static set isMobile(value) {
        DashboardLayoutModeHelper._forceMobileMode = value;
    }
    static get isTouch() {
        if (DashboardLayoutModeHelper._forceTouchMode !== null)
            return DashboardLayoutModeHelper._forceTouchMode;
        return support_1.touch;
    }
    static set isTouch(value) {
        DashboardLayoutModeHelper._forceTouchMode = value;
    }
}
exports.DashboardLayoutModeHelper = DashboardLayoutModeHelper;
DashboardLayoutModeHelper._forceTouchMode = null;
DashboardLayoutModeHelper._forceMobileMode = null;
