﻿/**
* DevExpress Dashboard (_item-viewer-adapter-factory.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DisposableObject } from '../../../model/disposable-object';
import { DashboardItem } from '../../../model/items/dashboard-item';
import { baseItem } from '../../../viewer-parts/viewer-items/_base-item';
import { IDashboardContext, IDashboardItemContext } from '../_viewer-interfaces';
import { ItemViewerAdapterBase } from './_item-viewer-adapter-base';
export declare class ViewerItemAdaptersManager extends DisposableObject {
    private viewerItemAdaptersMap;
    private modelSubscriberDict;
    private createAdapterCore;
    private releaseAdapter;
    create(dashboardItem: DashboardItem, element: HTMLElement, context: IDashboardContext, localContext?: IDashboardItemContext, beforeRender?: (item: baseItem) => void): ItemViewerAdapterBase<baseItem, DashboardItem>;
    dispose(): void;
}
