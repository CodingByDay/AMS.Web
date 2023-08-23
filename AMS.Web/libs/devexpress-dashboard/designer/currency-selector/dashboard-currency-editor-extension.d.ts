﻿/**
* DevExpress Dashboard (dashboard-currency-editor-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
export declare class DashboardCurrencyEditorExtension implements IExtension {
    private dashboardControl;
    name: string;
    private _menuItem;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
}
