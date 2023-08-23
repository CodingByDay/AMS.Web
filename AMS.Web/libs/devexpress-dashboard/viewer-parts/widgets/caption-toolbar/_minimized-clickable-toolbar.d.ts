﻿/**
* DevExpress Dashboard (_minimized-clickable-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CaptionToolbar } from './_caption-toolbar-base';
import { ClickableFloatingCaptionToolbar } from './_clickable-floating-toolbar';
export declare class MinimizedClickableCaptionToolbar extends ClickableFloatingCaptionToolbar {
    private _previewFloatingPanel;
    private _previewToolbarDiv;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, isBottomPosition: boolean, itemHasOwnContent: boolean);
    showPreviewFloatingPanel(): void;
    hideFloatingPanel(): void;
    dispose(): void;
    protected _createInstance(): CaptionToolbar;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    protected _subscribeOnShieldEvents(): void;
}
