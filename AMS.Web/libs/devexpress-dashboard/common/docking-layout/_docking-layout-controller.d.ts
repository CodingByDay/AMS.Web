﻿/**
* DevExpress Dashboard (_docking-layout-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Properties as dxScrollViewOptions } from 'devextreme/ui/scroll_view';
import * as ko from 'knockout';
import { type } from '../../data/_utils';
import { DashboardItem } from '../../model';
import { Dashboard } from '../../model/dashboard';
import { DisposableObject } from '../../model/disposable-object';
import { DataSourceBrowser } from '../_data-source-browser';
import { IExtension, KnockoutTemplate } from '../common-interfaces';
import { DashboardLayoutController, ISizeController, VisibleItemsProvider } from '../internal/_interfaces';
import { ElementAccessorKoComponentArgs } from '../internal/_ko-element-accessor';
import { ViewerApi } from '../viewer/_viewer-api';
import { IDashboardContext } from '../viewer/_viewer-interfaces';
import { DashboardTitleContext } from '../viewer/title/_title-component';
import { FullscreenItemModel } from './_docking-layout-fullscreen-item';
import { LayoutItem } from './core/_layout-item';
import { LayoutDragController } from './drag-and-drop/_drag-controller';
export declare class DockingLayoutController extends DisposableObject implements DashboardLayoutController {
    dashboardModel: Dashboard;
    dataSourceBrowser: DataSourceBrowser;
    context: IDashboardContext;
    findExtension: (name: string) => IExtension;
    allowMaximizeItems: boolean;
    resizeByTimer: ko.Observable<boolean>;
    repaintRequest: JQueryCallback;
    encodeHtml: boolean;
    constructor(dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser, context: IDashboardContext, findExtension: (name: string) => IExtension, allowMaximizeItems: boolean, resizeByTimer: ko.Observable<boolean>, repaintRequest: JQueryCallback, encodeHtml: boolean, viewerApi: ViewerApi);
    selectedLayoutItem: ko.Computed<ISizeController>;
    titleContext: DashboardTitleContext;
    get fullscreenItemProvider(): FullscreenItemModel;
    select(item: LayoutItem): void;
    dragController: LayoutDragController;
    _scrollSubscriptions: any[];
    scrollViewEvents: dxScrollViewOptions;
    subscribeOnScroll(handler: () => void): void;
    unsubscribeOnScroll(handler: () => void): void;
    rootItem: LayoutItem;
    allowExportDashboard: boolean;
    fullscreenItemModel: FullscreenItemModel;
    layoutMainElementEvents: ElementAccessorKoComponentArgs;
    itemInteractionInProgress: ko.Observable<boolean>;
    _selectedLayoutItem: ko.Observable<LayoutItem>;
    selectedDashboardItem: ko.Computed<DashboardItem>;
    emptyItemTemplates: ko.ObservableArray<KnockoutTemplate>;
    emptyItemTemplatesService: (layoutItem: LayoutItem) => KnockoutTemplate;
    contextMenu: (layoutItem: LayoutItem) => KnockoutTemplate;
    layoutItemPlaceholderService: (layoutItem: LayoutItem) => KnockoutTemplate;
    addDashboardItem: (data: {
        type: string;
    }) => void;
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    headerHeight: ko.Observable<number>;
    visibleItemsProvider: VisibleItemsProvider;
    dispose(): void;
}
