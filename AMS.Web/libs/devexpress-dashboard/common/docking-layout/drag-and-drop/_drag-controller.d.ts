﻿/**
* DevExpress Dashboard (_drag-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardDragItemInfo } from './_drag-item-info';
import { ScrollViewProvider } from './_scroll-animator';
export declare class LayoutDragController {
    private _dragOverState;
    private _scrollAnimator;
    private _layoutMainElement;
    private _externalElements;
    private _firstOverEvent;
    private _dragData;
    constructor();
    initScrollAnimator(scrollViewProvider: ScrollViewProvider): void;
    cleanScrollAnimator(): void;
    initLayoutMainElement(element: HTMLElement): void;
    cleanLayoutMainElement(element: HTMLElement): void;
    initExternalElement(element: HTMLElement, dragItemInfo: DashboardDragItemInfo): void;
    cleanExternalElement(element: HTMLElement): void;
    dispose(): void;
    _onDragStart(eventArgs: {
        originalEvent: DragEvent;
    }, dragData: DashboardDragItemInfo): void;
    _onDragOver(eventArgs: any, targetLayoutItem: any): boolean;
    _onDragLeave(): void;
    _onDrop(eventArgs: any): void;
    _onDrag(eventArgs: any): void;
    _onDragEnd(): void;
}
