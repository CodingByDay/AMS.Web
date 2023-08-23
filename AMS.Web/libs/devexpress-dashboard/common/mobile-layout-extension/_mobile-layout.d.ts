﻿/**
* DevExpress Dashboard (_mobile-layout.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxList, { Properties as dxListOptions } from 'devextreme/ui/list';
import * as ko from 'knockout';
import { Dashboard } from '../../model/dashboard';
import { DashboardItem } from '../../model/items/dashboard-item';
import { IExtension, KnockoutTemplate } from '../common-interfaces';
import { FullscreenItemModel } from '../docking-layout/_docking-layout-fullscreen-item';
import { DashboardLayoutController, VisibleItemsProvider } from '../internal/_interfaces';
import { ViewerApi } from '../viewer/_viewer-api';
import { IDashboardContext } from '../viewer/_viewer-interfaces';
import { DashboardTitleContext } from '../viewer/title/_title-component';
import { MasterFiltersEditorModel } from './_mobile-layout-master-filters-editor';
export declare class DashboardMobileLayoutController implements DashboardLayoutController {
    dashboard: Dashboard;
    dashboardContext: IDashboardContext;
    private _encodeHtml;
    fullscreenItemModel: FullscreenItemModel;
    masterFiltersEditorModel: MasterFiltersEditorModel;
    dashboardTitleContext: DashboardTitleContext;
    selectedDashboardItem: ko.Computed<any>;
    emptyItemTemplates: ko.ObservableArray<KnockoutTemplate>;
    selectedLayoutItem: ko.Computed<any>;
    get allowMaximizeItems(): boolean;
    set allowMaximizeItems(value: boolean);
    get fullscreenItemProvider(): FullscreenItemModel;
    visibleItemsProvider: VisibleItemsProvider;
    constructor(dashboard: Dashboard, dashboardContext: IDashboardContext, findExtension: (name: string) => IExtension, _encodeHtml: boolean, viewerApi: ViewerApi);
    private _getDashboardItemsInLayoutOrder;
    private _getGroupName;
    private _getGroupComponentName;
    private _getParentTabContainer;
    items: Array<DashboardMobileLayoutItem>;
}
export declare class DashboardMobileLayoutItem {
    dashboardItems: Array<DashboardItem>;
    groupName: string;
    constructor(dashboardItems: Array<DashboardItem>, groupName: string);
}
export interface FlatMobileLayoutItem {
    groupName: string;
    groupComponentName: string;
    itemComponentName: string;
}
export interface GroupedMobileLayoutItem {
    groupName: string;
    groupComponentName: string;
    itemComponentNames: Array<string>;
}
export declare function groupLayoutItems(flatItems: Array<FlatMobileLayoutItem>): Array<GroupedMobileLayoutItem>;
export declare type MobileLayoutKoComponentArgs = {
    dashboard: Dashboard;
    dashboardContext: IDashboardContext;
    dashboardTitleContext: DashboardTitleContext;
    masterFiltersEditorModel: MasterFiltersEditorModel;
    fullscreenItemModel: FullscreenItemModel;
    items: DashboardMobileLayoutItem[];
};
export declare let ungroupedItemKey: string;
export declare let groupWithoutCaptionItemKey: string;
export declare let dashboardTitleKey: string;
export declare var createLayoutViewModel: (element: Element, listSize: {
    width: number;
    height: number;
}, dashboardContext: IDashboardContext, repaintRequest: JQueryCallback, items: DashboardMobileLayoutItem[], fullscreenItemModel: FullscreenItemModel, getWidgetCallback: (widget: dxList) => void, titleViewModel: any, titleVisible: boolean) => dxListOptions;
