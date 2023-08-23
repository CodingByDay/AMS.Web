﻿/**
* DevExpress Dashboard (_map-item-viewer-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MapItem } from '../../../model/items/map/map-item';
import { ViewerItemOptions } from '../../../viewer-parts/viewer-items/_base-item';
import { mapItem } from '../../../viewer-parts/viewer-items/_map-item';
import { DataItemViewerAdapter } from './_data-item-viewer-adapter';
export declare class MapItemViewerAdapter extends DataItemViewerAdapter<mapItem, MapItem> {
    protected updateItemContent(content: ViewerItemOptions): void;
    protected createDashboardViewerItem(element: HTMLElement, content: ViewerItemOptions, dashboardItem: MapItem): mapItem;
    protected attachToModel(viewerItem: mapItem, dataDashboardItem: MapItem): void;
    protected detachFromModel(viewerItem: mapItem, dataDashboardItem: MapItem): void;
    resume(): void;
}
