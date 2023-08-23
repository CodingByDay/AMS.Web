/**
* DevExpress Dashboard (_drag-item-info.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LayoutItem } from '../core/_layout-item';
import { DragOverState } from './_layout-drag-over-state';
export declare abstract class DashboardDragItemInfo {
    abstract canDrop(layoutItem: LayoutItem): boolean;
    abstract drop(dragOverState: DragOverState): any;
    abstract dragStart(): any;
    abstract dragEnd(): any;
}
