﻿/**
* DevExpress Dashboard (_item-viewer-adapter-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DisposableObject } from '../../../model/disposable-object';
import { DashboardItem } from '../../../model/items/dashboard-item';
import { baseItem, ViewerItemOptions } from '../../../viewer-parts/viewer-items/_base-item';
import { IDashboardContext, IDashboardItemContext } from '../_viewer-interfaces';
export declare class ItemViewerAdapterBase<TViewerItem extends baseItem, TItemModel extends DashboardItem> extends DisposableObject {
    protected dashboardItem: TItemModel;
    protected element: HTMLElement;
    protected context: IDashboardContext;
    protected localContext?: IDashboardItemContext;
    private beforeRender;
    private onDisposed;
    protected item: TViewerItem;
    protected modelSubscriptions: Array<ko.Subscription>;
    get name(): string;
    protected get _isDesignMode(): boolean;
    constructor(dashboardItem: TItemModel, element: HTMLElement, context: IDashboardContext, localContext?: IDashboardItemContext, beforeRender?: (item: baseItem) => void, onDisposed?: () => void);
    itemUpdated: (viewerItem: baseItem) => void;
    ensureViewerItem(onlyCreation: boolean, content: ViewerItemOptions): void;
    initialize(): void;
    private updateServerContentHandler;
    dispose(): void;
    resume(): void;
    suspend(): void;
    protected ensureViewerItemCore(onlyCreation: boolean, content: ViewerItemOptions, additionalData?: any): void;
    protected updateItemContent(content: ViewerItemOptions): void;
    protected createDashboardViewerItem(element: HTMLElement, content: ViewerItemOptions, dashboardItem: TItemModel): TViewerItem;
    protected attachToModel(viewerItem: TViewerItem, dashboardItem: TItemModel): void;
    protected detachFromModel(viewerItem: TViewerItem, dashboardItem: TItemModel): void;
}
