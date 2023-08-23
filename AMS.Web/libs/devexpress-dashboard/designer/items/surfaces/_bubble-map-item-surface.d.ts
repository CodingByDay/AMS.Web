﻿/**
* DevExpress Dashboard (_bubble-map-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { BubbleMapItem } from '../../../model/items/map/bubble-map-item';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class BubbleMapItemSurface extends DataDashboardItemSurface<BubbleMapItem> {
    constructor(dashboardItem: BubbleMapItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    fillSections(): void;
    getPropertiesComposer(): DashboardItemPropertiesComposer<BubbleMapItem>;
}
