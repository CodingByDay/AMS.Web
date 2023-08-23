﻿/**
* DevExpress Dashboard (layout-options-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../../common/common-interfaces';
import { DashboardControl } from '../../../common/dashboard-control';
import { DisposableObject } from '../../../model/disposable-object';
export declare class LayoutOptionEditorExtension extends DisposableObject implements IExtension {
    name: string;
    private _dashboardControl;
    static readonly _toolbarItemsIndex = 100;
    private _predefinedToolbarItems;
    private _defaultToolbarItems;
    private _refreshItems;
    private _disposeItems;
    private _extensionsChangeSubscription;
    private _dashboardSubscription;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    private _addToolbarItems;
    private _removeToolbarItems;
    dispose(): void;
}
