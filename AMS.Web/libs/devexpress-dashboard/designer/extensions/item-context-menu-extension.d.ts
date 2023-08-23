﻿/**
* DevExpress Dashboard (item-context-menu-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { KeyEventType } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { DisposableObject } from '../../model/disposable-object';
import { IDashboardItemMenu } from '../items/_dashboard-item-menu';
export declare class DashboardItemMenuExtension extends DisposableObject {
    private dashboardControl;
    name: string;
    constructor(dashboardControl: DashboardControl);
    _itemContextMenu: ko.Observable<IDashboardItemMenu>;
    start(): void;
    stop(): void;
    processKeyEvent(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
    menuItemClick(menuItemId: string): void;
    private _updateExtension;
}
