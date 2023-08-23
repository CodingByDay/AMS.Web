﻿/**
* DevExpress Dashboard (parameters-editor-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { Dashboard } from '../../model/dashboard';
import { ParameterListEditorViewModel } from './_parameter-list-editor-viewmodel';
export declare class DashboardParameterEditorExtension implements IExtension {
    private dashboardControl;
    name: string;
    private _menuItem;
    _viewModel: ParameterListEditorViewModel;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    dashboard: ko.Computed<Dashboard>;
}
