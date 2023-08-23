﻿/**
* DevExpress Dashboard (_clickable-floating-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { CaptionToolbar } from './_caption-toolbar-base';
import { FloatingCaptionToolbarBase } from './_floating-toolbar-base';
export declare class ClickableFloatingCaptionToolbar extends FloatingCaptionToolbarBase {
    private static _toolbars;
    protected _itemHasOwnContent: boolean;
    protected static registerToolbar(toolbar: ClickableFloatingCaptionToolbar): void;
    protected static unregisterToolbar(toolbar: ClickableFloatingCaptionToolbar): void;
    protected static activateToolbar(toolbar: ClickableFloatingCaptionToolbar): void;
    protected _shieldDiv: HTMLElement;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, isBottomPosition: boolean, itemHasOwnContent: boolean);
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    showFloatingPanel(): void;
    hideFloatingPanel(): void;
    dispose(): void;
    protected _createInstance(): CaptionToolbar;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    protected _subscribeOnShieldEvents(): void;
    protected _disableShield(): void;
    protected _enableShield(): void;
}
