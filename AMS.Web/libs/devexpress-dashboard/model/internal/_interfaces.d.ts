﻿/**
* DevExpress Dashboard (_interfaces.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSource } from '../data-sources/data-source';
import { DashboardItem } from '../items/dashboard-item';
import { DataDashboardItem } from '../items/data-dashboard-item';
import { GroupItem } from '../items/group/group-item';
import { DashboardTabPage } from '../items/tab-container-item/dashboard-tab-page';
import { DashboardLayoutNode } from '../layout/dashboard-layout-node';
export interface IDashboardItemsProvider {
    findItem(itemId: string): DashboardItem;
    items: ko.ObservableArray<DashboardItem>;
    groups: ko.ObservableArray<GroupItem>;
    dataSources: ko.ObservableArray<DataSource>;
    layout: ko.Observable<DashboardLayoutNode>;
    _createDashboardLayoutItem(modelItemJson?: any): DashboardLayoutNode;
    _createDashboardLayoutNode(dashboardItem: DashboardItem): DashboardLayoutNode;
    _getDisplayDashboardItem(tabPage: DashboardTabPage): DashboardItem;
    _allItems: ko.PureComputed<Array<DashboardItem>>;
}
export interface IExternalFilter {
    dimensions: Array<any>;
    range: Array<any>;
    values: Array<any>;
    isExcludingAllFilter: boolean;
}
export interface IMasterFilterItemsProvider {
    _masterFilterItems: ko.Subscribable<Array<DataDashboardItem>>;
}
export interface IColorSignaturesProvider {
    _colorableItems: ko.Subscribable<DashboardItem[]>;
}
export interface Notification {
    title: string;
    detail?: string;
}
export interface IViewport {
    RightLongitude: number;
    LeftLongitude: number;
    BottomLatitude: number;
    TopLatitude: number;
    CenterPointLongitude: number;
    CenterPointLatitude: number;
}
export interface IViewportViewModel extends IViewport {
    CreateViewerPaddings: boolean;
}
