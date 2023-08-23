﻿/**
* DevExpress Dashboard (_tab-container-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { TabContainerItem } from '../../../model/items/tab-container-item/tab-container-item';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { BaseItemSurface } from './_base-item-surface';
export declare class TabContainerItemSurface extends BaseItemSurface<TabContainerItem> {
    private dashboardItem;
    private _dashboardModel;
    constructor(dashboardItem: TabContainerItem, _dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser);
    getPropertiesComposer(): DashboardItemPropertiesComposer<TabContainerItem>;
    dispose(): void;
}
