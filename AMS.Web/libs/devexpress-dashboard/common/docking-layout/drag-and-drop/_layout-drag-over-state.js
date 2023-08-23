﻿/**
* DevExpress Dashboard (_layout-drag-over-state.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragOverStateController = void 0;
const _layout_item_1 = require("../core/_layout-item");
class DragOverStateController {
    constructor() {
    }
    update(targetItem, currentHoverLocation) {
        if (!this._inTimer && (this._dragOverItem !== targetItem || currentHoverLocation !== this._hoverLocation)) {
            this.reset();
            this._hoverLocation = currentHoverLocation;
            this._dragOverItem = targetItem;
            _layout_item_1.setHoverLocation(this._dragOverItem, this._hoverLocation);
            this._currentTargetItem = this._dragOverItem;
            this._currentTargetItemBehavior = 'InsertBesideGroup';
            var selectionList = this._dragOverItem.getSelectionParentsList(this._hoverLocation);
            if (selectionList.length > 1) {
                var currentIndex = 1;
                this._timer && clearInterval(this._timer);
                this._timer = window.setInterval(() => {
                    this._inTimer = true;
                    try {
                        _layout_item_1.setHoverLocation(this._currentTargetItem, null, this._currentTargetItemBehavior);
                        this._currentTargetItem = selectionList[currentIndex].node;
                        this._currentTargetItemBehavior = selectionList[currentIndex].dropBehavior;
                        _layout_item_1.setHoverLocation(this._currentTargetItem, this._hoverLocation, this._currentTargetItemBehavior);
                        currentIndex++;
                        if (currentIndex >= selectionList.length) {
                            currentIndex = 0;
                        }
                    }
                    finally {
                        this._inTimer = false;
                    }
                }, 1000);
            }
        }
    }
    getState() {
        if (this._currentTargetItem) {
            return {
                targetItem: this._currentTargetItem,
                targetItemBehavior: this._currentTargetItemBehavior,
                hoverLocation: this._hoverLocation
            };
        }
        return null;
    }
    reset() {
        this._timer && clearInterval(this._timer);
        _layout_item_1.setHoverLocation(this._dragOverItem);
        _layout_item_1.setHoverLocation(this._currentTargetItem);
        this._currentTargetItem = null;
        this._currentTargetItemBehavior = 'InsertBesideGroup';
        this._dragOverItem = null;
        this._timer = null;
        this._inTimer = null;
    }
}
exports.DragOverStateController = DragOverStateController;
