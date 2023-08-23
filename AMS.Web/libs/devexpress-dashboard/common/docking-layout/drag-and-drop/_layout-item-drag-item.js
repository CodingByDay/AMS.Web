﻿/**
* DevExpress Dashboard (_layout-item-drag-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutItemDragItemInfo = void 0;
const _drag_item_info_1 = require("./_drag-item-info");
class LayoutItemDragItemInfo extends _drag_item_info_1.DashboardDragItemInfo {
    constructor(_currentLayoutItem) {
        super();
        this._currentLayoutItem = _currentLayoutItem;
    }
    canDrop(layoutItem) {
        return this._currentLayoutItem !== layoutItem && layoutItem.canAttach(this._currentLayoutItem.viewModel);
    }
    drop(dragOverState) {
        this._currentLayoutItem.moveTo(dragOverState.targetItem, dragOverState.hoverLocation, dragOverState.targetItemBehavior);
    }
    dragStart() {
        this._currentLayoutItem.visible(false);
    }
    dragEnd() {
        this._currentLayoutItem.visible(true);
    }
}
exports.LayoutItemDragItemInfo = LayoutItemDragItemInfo;
