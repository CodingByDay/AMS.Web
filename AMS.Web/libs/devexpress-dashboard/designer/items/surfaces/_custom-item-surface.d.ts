﻿/**
* DevExpress Dashboard (_custom-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { CustomItem } from '../../../model/items/custom-item/custom-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CustomizeDashboardItemTabs, DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class CustomItemPropertiesComposer extends DashboardItemPropertiesComposer<CustomItem> {
    constructor(customizeHandler: CustomizeDashboardItemTabs);
    private _mapLegacyPropertiesToTabs;
    _composeTabsCore(model: CustomItem): Array<AccordionTab>;
}
export declare class CustomItemSurface extends DataDashboardItemSurface<CustomItem> {
    protected get showDefaultSections(): boolean;
    fillSections(): void;
    constructor(dashboardItem: CustomItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    getPropertiesComposer(): DashboardItemPropertiesComposer<CustomItem>;
}
