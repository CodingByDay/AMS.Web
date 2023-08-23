/**
* DevExpress Dashboard (_dashboard-standalone-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DashboardItem } from '../../model/items/dashboard-item';
import { IDashboardContext, IDashboardItemContext } from '../viewer/_viewer-interfaces';
export interface IStandaloneItemBindings {
    dashboardItem: DashboardItem;
    dashboardContext: IDashboardContext;
    localContext: IDashboardItemContext;
    repaintRequest: JQueryCallback;
}
