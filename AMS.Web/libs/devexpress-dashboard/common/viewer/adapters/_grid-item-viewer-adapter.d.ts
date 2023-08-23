﻿/**
* DevExpress Dashboard (_grid-item-viewer-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GridItem } from '../../../model/items/grid/grid-item';
import { dataGridItem } from '../../../viewer-parts/viewer-items/data-grid-item/_data-grid-item';
import { DataItemViewerAdapter } from './_data-item-viewer-adapter';
export declare class GridItemViewerAdapter extends DataItemViewerAdapter<dataGridItem, GridItem> {
    protected attachToModel(viewerItem: dataGridItem, dataDashboardItem: GridItem): void;
    protected detachFromModel(viewerItem: dataGridItem, dataDashboardItem: GridItem): void;
}
