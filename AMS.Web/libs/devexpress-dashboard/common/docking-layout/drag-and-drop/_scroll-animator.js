﻿/**
* DevExpress Dashboard (_scroll-animator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrollAnimator = void 0;
class ScrollAnimator {
    constructor(_scrollViewProvider) {
        this._scrollViewProvider = _scrollViewProvider;
    }
    _requestAnimationFrame() {
        this._nextAnimationFrame = window.requestAnimationFrame(() => this._animationStep());
    }
    _animationStep() {
        if (this._cursorPosition && this._scrollViewBoundary && this._scrollViewProvider) {
            processScrollStep(this._cursorPosition.x, this._cursorPosition.y, this._scrollViewProvider, this._scrollViewBoundary);
        }
        this._requestAnimationFrame();
    }
    start() {
        this._scrollViewBoundary = this._scrollViewProvider.getBoundingClientRect();
        this._requestAnimationFrame();
    }
    updateCursorPosition(cursorX, cursorY) {
        if (cursorX > 0 && cursorY > 0) {
            this._cursorPosition = { x: cursorX, y: cursorY };
        }
        else {
            this.resetCursorPosition();
        }
    }
    resetCursorPosition() {
        this._cursorPosition = null;
    }
    stop() {
        window.cancelAnimationFrame(this._nextAnimationFrame);
        this._scrollViewBoundary = null;
        this.resetCursorPosition();
    }
    dispose() {
        this.stop();
        this._scrollViewProvider = undefined;
    }
}
exports.ScrollAnimator = ScrollAnimator;
ScrollAnimator.scrollSpeed = 30;
ScrollAnimator.scrollSensitivity = 60;
const processScrollStep = (cursorX, cursorY, scrollViewInstance, scrollViewBoundaries) => {
    let distanceToTop = cursorY - scrollViewBoundaries.top;
    let distanceToBottom = scrollViewBoundaries.bottom - cursorY;
    let distanceToLeft = cursorX - scrollViewBoundaries.left;
    let distanceToRight = scrollViewBoundaries.right - cursorX;
    if (distanceToTop >= 0 && distanceToBottom >= 0 && distanceToLeft >= 0 && distanceToRight >= 0) {
        let scrollSpeed = Object.assign(Object.assign(Object.assign(Object.assign({}, calculateScrollSpeed(distanceToTop, 'top', -1)), calculateScrollSpeed(distanceToBottom, 'top', 1)), calculateScrollSpeed(distanceToLeft, 'left', -1)), calculateScrollSpeed(distanceToRight, 'left', 1));
        if (scrollSpeed.left || scrollSpeed.top) {
            let currentOffset = scrollViewInstance.getScrollOffset();
            scrollViewInstance.setScrollOffset({
                top: currentOffset.top + (scrollSpeed.top || 0),
                left: currentOffset.left + (scrollSpeed.left || 0)
            });
        }
    }
};
const calculateScrollSpeed = (distanceToBorder, mainAxisDirection, scrollAxisDirection) => {
    if (distanceToBorder <= ScrollAnimator.scrollSensitivity) {
        const sensitivity = ScrollAnimator.scrollSensitivity;
        const maxSpeed = ScrollAnimator.scrollSpeed;
        return {
            [mainAxisDirection]: scrollAxisDirection * Math.ceil(Math.pow((sensitivity - distanceToBorder) / sensitivity, 2) * maxSpeed),
        };
    }
    return null;
};
