﻿/**
* DevExpress Dashboard (_date-filter-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { DateFilterItem } from '../../../model/items/filter-items/date-filter-item';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class DateFilterItemSurface extends DataDashboardItemSurface<DateFilterItem> {
    constructor(dashboardItem: DateFilterItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    fillSections(): void;
    getPropertiesComposer(): DashboardItemPropertiesComposer<DateFilterItem>;
}
