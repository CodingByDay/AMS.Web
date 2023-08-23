﻿/**
* DevExpress Dashboard (_dashboard-layout-mode-helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class DashboardLayoutModeHelper {
    private static _forceTouchMode?;
    private static _forceMobileMode?;
    static get isMobile(): boolean;
    static set isMobile(value: boolean);
    static get isTouch(): boolean;
    static set isTouch(value: boolean);
}
