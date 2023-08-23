﻿/**
* DevExpress Dashboard (_scroll-animator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare type ScrollOffset = {
    top?: number;
    left?: number;
};
export interface ScrollViewProvider {
    setScrollOffset(offset: ScrollOffset): any;
    getScrollOffset(): ScrollOffset;
    getBoundingClientRect(): ClientRect;
}
export declare class ScrollAnimator {
    private _scrollViewProvider;
    static scrollSpeed: number;
    static scrollSensitivity: number;
    private _cursorPosition;
    private _scrollViewBoundary;
    private _nextAnimationFrame;
    constructor(_scrollViewProvider: ScrollViewProvider);
    _requestAnimationFrame(): void;
    _animationStep(): void;
    start(): void;
    updateCursorPosition(cursorX: number, cursorY: number): void;
    resetCursorPosition(): void;
    stop(): void;
    dispose(): void;
}
