/**
* DevExpress Dashboard (_utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Dashboard, DashboardItem } from '../../model';
export declare function findItemForApi<T extends DashboardItem>(dashboard: Dashboard, itemName: string, expectedItemClass?: any): T;
