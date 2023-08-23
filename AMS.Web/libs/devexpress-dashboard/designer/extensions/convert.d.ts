/**
* DevExpress Dashboard (convert.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataServiceClient } from '../../common/_service-client';
import { IExtension } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { Dashboard } from '../../model/dashboard';
import { DashboardItem } from '../../model/items/dashboard-item';
import { DashboardItemMenu } from '../items/_dashboard-item-menu';
export declare class ConversionPanelExtension implements IExtension {
    private dashboardControl;
    name: string;
    private _subscriptions;
    constructor(dashboardControl: DashboardControl);
    _contextMenuSubscriber(itemContextMenu: DashboardItemMenu): void;
    start(): void;
    stop(): void;
    _updateContextMenu(itemContextMenu: DashboardItemMenu, dashboardItem: DashboardItem, dashboard: Dashboard, serviceClient: IDataServiceClient): void;
}
