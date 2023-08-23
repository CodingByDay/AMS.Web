﻿/**
* DevExpress Dashboard (_item-filter-display-name-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { IDisplayNameProvider } from '@devexpress/analytics-core/analytics-utils';
import { IDataFieldsProvider } from '../../common/_data-source-browser';
import { DataItem } from '../../model/data-item/data-item';
import { DataDashboardItem } from '../../model/items/data-dashboard-item';
export declare class ItemFilterDisplayNameProvider implements IDisplayNameProvider {
    private dashboardItem;
    private dataSourceBrowser;
    constructor(dashboardItem: DataDashboardItem, dataSourceBrowser: IDataFieldsProvider);
    _mapDataItemProperties(getSourceProperty: (i: DataItem) => any, getTargetProperty: (i: DataItem) => any, value: any): JQueryPromise<string>;
    getDisplayNameByPath(path: string, dataMember: string): JQueryPromise<string>;
    getRealName(path: string, displayDataMember: string): JQueryPromise<string>;
}
