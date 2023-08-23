﻿/**
* DevExpress Dashboard (_minimized-hovered-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { CaptionToolbar } from './_caption-toolbar-base';
import { FloatingCaptionToolbarBase } from './_floating-toolbar-base';
export declare enum MinimizedToolbarState {
    Hidden = 0,
    Minimim = 1,
    Maximim = 2
}
export declare class MinimizedHoveredCaptionToolbar extends FloatingCaptionToolbarBase {
    private _previewFloatingPanel;
    private _previewToolbarDiv;
    private _toolbarState;
    private _containerHovered;
    private _onContainerHovered;
    private _onContainerLeave;
    private _onPreviewHovered;
    private _onToolbarLeave;
    private get hasItems();
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, isBottomPosition: boolean);
    calcMinWidth(options: DashboardItemCaptionToolbarOptions): number;
    dispose(): void;
    onResize(): void;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    protected _repaintFloatingPanel(): void;
    private _showPreviewFloatingPanel;
    private _hidePreviewFloatingPanel;
    protected _createInstance(): CaptionToolbar;
}
