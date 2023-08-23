﻿/**
* DevExpress Dashboard (_layout-item-drag-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LayoutItem } from '../core/_layout-item';
import { DashboardDragItemInfo } from './_drag-item-info';
import { DragOverState } from './_layout-drag-over-state';
export declare class LayoutItemDragItemInfo extends DashboardDragItemInfo {
    private _currentLayoutItem;
    constructor(_currentLayoutItem: LayoutItem);
    canDrop(layoutItem: LayoutItem): boolean;
    drop(dragOverState: DragOverState): void;
    dragStart(): void;
    dragEnd(): void;
}
