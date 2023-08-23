﻿/**
* DevExpress Dashboard (_dashboard-layout-creator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Dashboard } from '../dashboard';
import { DashboardItem } from '../items/dashboard-item';
import { DashboardLayoutGroup } from './dashboard-layout-group';
export declare class DashboardLayoutCreator {
    private _clientWidth;
    private _clientHeight;
    private _dashboard;
    _layoutRoot: DashboardLayoutGroup;
    constructor(_clientWidth: number, _clientHeight: number, _dashboard: Dashboard);
    rebuildLayout(): void;
    private _removeIncorrectLayoutNodes;
    private _getParentItem;
    _createLayoutNodes(dashboardItems: Array<DashboardItem>): void;
    _createLayoutNode(dashboardItem: DashboardItem, layoutGroup: DashboardLayoutGroup): void;
}
