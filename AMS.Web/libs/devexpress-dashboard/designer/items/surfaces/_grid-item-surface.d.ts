﻿/**
* DevExpress Dashboard (_grid-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { NotificationController } from '../../../common/notification-controller/notificator';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { GridItem } from '../../../model/items/grid/grid-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { DataDashboardItemSurface } from './_base-item-surface';
export declare class GridItemSurface extends DataDashboardItemSurface<GridItem> {
    private addConditionalFormattingOptions;
    protected extendHiddenMeasuresTabs(tabs: AccordionTab[], model: any): void;
    fillSections(): void;
    constructor(dashboardItem: GridItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, notificationController: NotificationController);
    private editRuleHandler;
    getPropertiesComposer(): DashboardItemPropertiesComposer<GridItem>;
}
