﻿/**
* DevExpress Dashboard (_chorolpeth-map-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { ChoroplethMapItem } from '../../../model/items/map/chorolpeth-map-item';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class ChoroplethMapItemSurface extends DataDashboardItemSurface<ChoroplethMapItem> {
    constructor(dashboardItem: ChoroplethMapItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    fillSections(): void;
    getPropertiesComposer(): DashboardItemPropertiesComposer<ChoroplethMapItem>;
}
