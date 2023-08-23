﻿/**
* DevExpress Dashboard (interactivity-panel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { DashboardItem } from '../../model/items/dashboard-item';
import { IDashboardItemMenu } from '../items/_dashboard-item-menu';
export declare class InteractivityPanelExtension implements IExtension {
    private dashboardControl;
    name: string;
    private _subscriptions;
    constructor(dashboardControl: DashboardControl);
    _contextMenuSubscriber(itemContextMenu: IDashboardItemMenu): void;
    _updateContextMenu(menu: IDashboardItemMenu, item: DashboardItem): void;
    start(): void;
    stop(): void;
}
