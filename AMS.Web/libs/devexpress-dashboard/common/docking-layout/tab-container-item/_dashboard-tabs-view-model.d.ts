﻿/**
* DevExpress Dashboard (_dashboard-tabs-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableObject } from '../../../model/disposable-object';
import { DashboardItem } from '../../../model/items/dashboard-item';
import { DashboardTabPage } from '../../../model/items/tab-container-item/dashboard-tab-page';
import { SingleTabItemSizeController } from '../../internal/_interfaces';
import { DashboardItemContext } from '../../viewer/_viewer-interfaces';
import { LayoutItem } from '../core/_layout-item';
export interface PageBinding {
    dashboardItem: DashboardItem;
    pageDashboardItem: DashboardTabPage;
    id: string;
    sizeController: SingleTabItemSizeController;
    context: any;
    localContext: DashboardItemContext;
    ignoreBorder: ko.Observable<boolean>;
}
export declare class DashboardTabsViewModel extends DisposableObject {
    layoutItem: LayoutItem;
    headerHeight: ko.Observable<number>;
    private element;
    showMenu: ko.Observable<boolean>;
    tabPageBindings: ko.ObservableArray<PageBinding>;
    selectedItemKeys: ko.ObservableArray<string>;
    showAddButton: ko.Computed<any>;
    private _defaultButtonWidth;
    private _tabsInfoCache;
    private _toolbarCache;
    private headersViewModel;
    private get viewModel();
    private get showCaption();
    private get _containerSizeController();
    constructor(layoutItem: LayoutItem, headerHeight: ko.Observable<number>, element: HTMLElement);
    toggleMenu(bindings: any, args: any): void;
    createTabPage(): void;
    onSelectionChanged(e: any): void;
    private _syncTabPageBindings;
    private _initialize;
    private _createMenuToolbarItem;
    private _getSelectedKeys;
    private _createPageBinding;
    private _prepareLocalContext;
    private _onContainerRepaint;
    private _onToolbarUpdated;
    private _updateTabHeaders;
}
