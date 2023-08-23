﻿/**
* DevExpress Dashboard (create-dashboard.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
export declare class CreateDashboardExtension implements IExtension {
    private dashboardControl;
    name: string;
    private _newDashboardMenuItem;
    private _viewModel;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    showCreateNewDashboard: () => void;
    performCreateDashboard(dashboardName: string, dashboardJson: string): JQueryPromise<void>;
    private _createNewDashboard;
}
