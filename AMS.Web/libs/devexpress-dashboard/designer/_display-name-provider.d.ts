﻿/**
* DevExpress Dashboard (_display-name-provider.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataFieldsProvider } from '../common/_data-source-browser';
import { DataItem } from '../model/data-item/data-item';
import { DataDashboardItem } from '../model/items/data-dashboard-item';
import { IBindingModelProvider } from '../model/items/_binding-model';
export declare function getDataItemContainerDisplayName(dataSourceBrowser: IDataFieldsProvider, dashboardItem: DataDashboardItem, dataItemContainer: IBindingModelProvider): string;
export declare function getDataItemDisplayName(dataFieldProvider: IDataFieldsProvider, dataDashboardItem: DataDashboardItem, dataItem: DataItem): string;
