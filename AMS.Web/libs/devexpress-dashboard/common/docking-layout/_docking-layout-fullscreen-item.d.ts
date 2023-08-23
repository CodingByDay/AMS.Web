﻿/**
* DevExpress Dashboard (_docking-layout-fullscreen-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DashboardItem } from '../../model/items/dashboard-item';
import { FullscreenItemProvider, ISizeController } from '../internal/_interfaces';
import { IDashboardContext, IDashboardItemContext } from '../viewer/_viewer-interfaces';
interface IFullscreenItemModelViewModel {
    dashboardItem: DashboardItem;
    dashboardContext: IDashboardContext;
    localContext: IDashboardItemContext;
    repaintRequest: JQueryCallback;
    getSizeController: (element: Element) => ISizeController;
}
export declare class FullscreenItemModel implements FullscreenItemProvider {
    private dashboardContext;
    private localContext?;
    private repaintRequest;
    _dashboardItem: ko.Observable<DashboardItem>;
    _visible: ko.Observable<boolean>;
    dashboardItem: ko.Computed<DashboardItem>;
    visible: ko.Computed<boolean>;
    viewModel: ko.Computed<IFullscreenItemModelViewModel>;
    get maximizedItemName(): string;
    constructor(dashboardContext: IDashboardContext, localContext?: IDashboardItemContext, repaintRequest?: JQuery.Callbacks<Function>);
    maximizeItem(dashboardItem: DashboardItem): void;
    restoreDownItem(): void;
}
export {};
