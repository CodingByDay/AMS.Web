﻿/**
* DevExpress Dashboard (_group-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { GroupItem } from '../../../model/items/group/group-item';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { BaseItemSurface } from './_base-item-surface';
export declare class GroupItemSurface extends BaseItemSurface<GroupItem> {
    constructor(dashboardItem: GroupItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser);
    getPropertiesComposer(): DashboardItemPropertiesComposer<GroupItem>;
}
