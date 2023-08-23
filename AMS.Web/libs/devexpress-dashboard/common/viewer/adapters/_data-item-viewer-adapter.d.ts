﻿/**
* DevExpress Dashboard (_data-item-viewer-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { baseItem, ViewerItemOptions } from '../../../viewer-parts/viewer-items/_base-item';
import { ItemViewerAdapterBase } from './_item-viewer-adapter-base';
export declare class DataItemViewerAdapter<TViewerItem extends baseItem, TItemModel extends DataDashboardItem> extends ItemViewerAdapterBase<TViewerItem, TItemModel> {
    protected attachToModel(viewerItem: baseItem, dataDashboardItem: DataDashboardItem): void;
    protected detachFromModel(viewerItem: baseItem, dataDashboardItem: DataDashboardItem): void;
    protected ensureViewerItemCore(onlyCreation: boolean, content: ViewerItemOptions): void;
    protected updateItemContent(content: ViewerItemOptions): void;
    protected createDashboardViewerItem(element: HTMLElement, content: ViewerItemOptions, dashboardItem: TItemModel): TViewerItem;
    private getDrillUpState;
    private updateActionsModel;
    _createDefaultCustomInteractivityOptions: () => {
        selectionMode: string;
        hoverEnabled: boolean;
        targetAxes: any[];
        defaultSelectedValues: any[];
    };
    _ensureCustomInteractivityOptions: (interactivityOptions: any, interactivityEnable: any, itemData: any) => {
        selectionMode: any;
        hoverEnabled: any;
        targetAxes: any;
        defaultSelectedValues: any;
    };
}
