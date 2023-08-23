﻿/**
* DevExpress Dashboard (_layout-drag-over-state.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { LayoutItemInsertPosition } from '../../../model/layout/dashboard-layout-node';
import { LayoutItem, LayoutItemInsertionBehavior } from '../core/_layout-item';
export interface DragOverState {
    targetItem: LayoutItem;
    targetItemBehavior: LayoutItemInsertionBehavior;
    hoverLocation: LayoutItemInsertPosition;
}
export declare class DragOverStateController {
    private _dragOverItem;
    private _hoverLocation;
    private _currentTargetItem;
    private _currentTargetItemBehavior;
    private _timer;
    private _inTimer;
    constructor();
    update(targetItem: LayoutItem, currentHoverLocation: LayoutItemInsertPosition): void;
    getState(): DragOverState;
    reset(): void;
}
