﻿/**
* DevExpress Dashboard (title-settings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { DisposableObject } from '../../model/disposable-object';
export declare class DashboardTitleEditorExtension extends DisposableObject implements IExtension {
    private dashboardControl;
    name: string;
    private _menuItem;
    private _titlePreviewViewModel;
    private _titleSettingsViewModel;
    private _perDashboardSubscriptions;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    dispose(): void;
    private _disposePerDashboardSubscriptions;
    private _updateTitleToolbar;
    private _createTitleSettings;
}
