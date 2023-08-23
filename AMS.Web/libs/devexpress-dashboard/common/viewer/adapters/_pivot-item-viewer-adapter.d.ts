/**
* DevExpress Dashboard (_pivot-item-viewer-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PivotItem } from '../../../model/items/pivot/pivot-item';
import { pivotGridItem } from '../../../viewer-parts/viewer-items/pivot-grid-item/_pivot-grid-item';
import { DataItemViewerAdapter } from './_data-item-viewer-adapter';
export declare class PivotItemViewerAdapter extends DataItemViewerAdapter<pivotGridItem, PivotItem> {
    private expandValueHandler;
    private expandStateChangedHandler;
    protected attachToModel(viewerItem: pivotGridItem, dataDashboardItem: PivotItem): void;
    protected detachFromModel(viewerItem: pivotGridItem, dataDashboardItem: PivotItem): void;
}
