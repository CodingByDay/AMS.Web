/**
* DevExpress Dashboard (_dashboard-item_helper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItem } from '../items/dashboard-item';
export declare function getIconName(typeName: any, icon?: any): any;
export declare function getItemIconName(item: DashboardItem): any;
export declare function getItemTitle(item: DashboardItem): any;
export declare function getItemJson(itemType: string): {
    '@ItemType': string;
    '@CustomItemType': string;
};
