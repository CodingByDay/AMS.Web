﻿/**
* DevExpress Dashboard (_image-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Dashboard } from '../../../model/dashboard';
import { ImageItem } from '../../../model/items/image-item';
import { DashboardItemPropertiesComposer } from '../properties-composers/_base-properties-composer';
import { BaseItemSurface } from './_base-item-surface';
export declare class ImageItemSurface extends BaseItemSurface<ImageItem> {
    constructor(dashboardItem: ImageItem, dashboardModel: Dashboard, dataSourceBrowser: DataSourceBrowser);
    getPropertiesComposer(): DashboardItemPropertiesComposer<ImageItem>;
}
