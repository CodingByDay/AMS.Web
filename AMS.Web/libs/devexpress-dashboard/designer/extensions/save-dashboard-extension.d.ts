﻿/**
* DevExpress Dashboard (save-dashboard-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { IExtension, SequenceAction } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { ConfirmDialogViewModel } from '../confirm-dialog/_confirm-dialog';
export declare class SaveDashboardExtension implements IExtension {
    private dashboardControl;
    private _menuItem;
    name: string;
    _confirmDialogViewModel: ConfirmDialogViewModel;
    private _customTemplate;
    private _isDashboardDirty;
    canSaveDashboard: ko.Computed<boolean>;
    designerToViewerAction: SequenceAction;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    private get _toolboxExtension();
    private get _undoEngineExtension();
    performSaveDashboard(dashboardId: string, dashboardJson: string): JQueryPromise<any>;
    ensureDashboardSaved(action: () => void): void;
    _ensureDashboardSaved(): JQueryPromise<{}>;
    saveDashboard(): JQueryPromise<any>;
}
