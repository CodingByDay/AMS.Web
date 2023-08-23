﻿/**
* DevExpress Dashboard (_drag-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutDragController = void 0;
const events_1 = require("devextreme/events");
const ko = require("knockout");
const _layout_item_1 = require("../core/_layout-item");
const _layout_drag_over_state_1 = require("./_layout-drag-over-state");
const _layout_item_drag_item_1 = require("./_layout-item-drag-item");
const _scroll_animator_1 = require("./_scroll-animator");
class LayoutDragController {
    constructor() {
        this._dragOverState = new _layout_drag_over_state_1.DragOverStateController();
        this._layoutMainElement = null;
        this._externalElements = [];
        this._firstOverEvent = false;
    }
    initScrollAnimator(scrollViewProvider) {
        this._scrollAnimator = new _scroll_animator_1.ScrollAnimator(scrollViewProvider);
    }
    cleanScrollAnimator() {
        this._scrollAnimator && this._scrollAnimator.dispose();
        this._scrollAnimator = null;
    }
    initLayoutMainElement(element) {
        if (this._layoutMainElement) {
            throw new Error('Layout main element already initialized');
        }
        this._layoutMainElement = element;
        events_1.on(element, 'dragstart.dx-layout-drag', '.dx-layout-item-plate', args => {
            let originalEvent = args.originalEvent;
            let item = ko.dataFor(originalEvent.target);
            if (item instanceof _layout_item_1.LayoutItem) {
                this._onDragStart(args, new _layout_item_drag_item_1.LayoutItemDragItemInfo(item));
                return true;
            }
        });
        events_1.on(element, 'dragover.dx-layout-drag', args => {
            let originalEvent = args.originalEvent;
            let item = ko.dataFor(originalEvent.target);
            this._onDragOver(args, item);
        });
        events_1.on(element, 'drag.dx-layout-drag', args => this._onDrag(args));
        events_1.on(element, 'dragleave.dx-layout-drag', args => this._onDragLeave());
        events_1.on(element, 'drop.dx-layout-drag', args => this._onDrop(args));
        events_1.on(element, 'dragend.dx-layout-drag', args => this._onDragEnd());
    }
    cleanLayoutMainElement(element) {
        if (this._layoutMainElement === element) {
            events_1.off(element, '.dx-layout-drag');
            this._layoutMainElement = null;
        }
    }
    initExternalElement(element, dragItemInfo) {
        this._externalElements.push(element);
        events_1.on(element, 'dragstart.dx-layout-drag', args => {
            this._onDragStart(args, dragItemInfo);
        });
        events_1.on(element, 'drag.dx-layout-drag', args => this._onDrag(args));
        events_1.on(element, 'dragend.dx-layout-drag', args => this._onDragEnd());
    }
    cleanExternalElement(element) {
        this._externalElements && this._externalElements.splice(this._externalElements.indexOf(element), 1);
        events_1.off(element, '.dx-layout-drag');
    }
    dispose() {
        this.cleanScrollAnimator();
        this.cleanLayoutMainElement(this._layoutMainElement);
        this._externalElements && this._externalElements.slice().forEach(element => this.cleanExternalElement(element));
        this._externalElements = null;
    }
    _onDragStart(eventArgs, dragData) {
        let originalEvent = eventArgs.originalEvent;
        originalEvent.dataTransfer.effectAllowed = 'move';
        this._dragData = dragData;
        this._firstOverEvent = true;
        this._dragOverState.reset();
        this._scrollAnimator && this._scrollAnimator.start();
    }
    _onDragOver(eventArgs, targetLayoutItem) {
        let originalEvent = eventArgs.originalEvent;
        let cursorClientX = originalEvent.clientX;
        let cursorClientY = originalEvent.clientY;
        let targetElement = eventArgs.target;
        if (this._firstOverEvent) {
            this._dragData.dragStart();
            this._firstOverEvent = false;
        }
        if (targetLayoutItem instanceof _layout_item_1.LayoutItem && this._dragData && this._dragData.canDrop(targetLayoutItem)) {
            let dragOverController = targetLayoutItem.viewModel.dragOverInnerElementController;
            if (dragOverController) {
                let index = findElementIndex(targetElement, dragOverController.selector, cursorClientX, cursorClientY);
                if (index !== -1) {
                    dragOverController.onDragOver(index);
                }
            }
            let itemBounds = targetElement.getBoundingClientRect();
            let currentHoverLocation = getLocation(cursorClientX - itemBounds.left, cursorClientY - itemBounds.top, itemBounds.width, itemBounds.height);
            this._dragOverState.update(targetLayoutItem, currentHoverLocation);
            eventArgs.preventDefault();
            return true;
        }
        else {
            this._dragOverState.reset();
        }
    }
    _onDragLeave() {
        this._dragOverState.reset();
    }
    _onDrop(eventArgs) {
        let dragOverState = this._dragOverState.getState();
        if (dragOverState) {
            this._dragData.drop(dragOverState);
            eventArgs.stopPropagation();
        }
        this._onDragEnd();
    }
    _onDrag(eventArgs) {
        if (this._scrollAnimator) {
            let originalEvent = eventArgs.originalEvent;
            this._scrollAnimator.updateCursorPosition(originalEvent.clientX, originalEvent.clientY);
        }
    }
    _onDragEnd() {
        this._scrollAnimator && this._scrollAnimator.stop();
        this._dragOverState.reset();
        this._dragData && this._dragData.dragEnd();
        this._dragData = null;
    }
}
exports.LayoutDragController = LayoutDragController;
const getLocation = (x, y, width, height) => {
    if (y >= height / width * x) {
        return (y >= -height / width * x + height) ? 'bottom' : 'left';
    }
    else {
        return (y >= -height / width * x + height) ? 'right' : 'top';
    }
};
const findElementIndex = (originalElement, selector, mouseClientX, mouseClientY) => {
    let elements = originalElement
        .parentElement
        .querySelectorAll(selector);
    for (let index = 0; index < elements.length; index++) {
        let element = elements[index];
        let rect = element.getBoundingClientRect();
        if (rect.left < mouseClientX && rect.right > mouseClientX
            && rect.top < mouseClientY && rect.bottom > mouseClientY) {
            return index;
        }
    }
    return -1;
};
