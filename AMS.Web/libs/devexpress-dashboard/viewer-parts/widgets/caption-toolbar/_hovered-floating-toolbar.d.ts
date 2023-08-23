﻿/**
* DevExpress Dashboard (_hovered-floating-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { CaptionToolbar } from './_caption-toolbar-base';
import { FloatingCaptionToolbarBase } from './_floating-toolbar-base';
export declare class HoveredFloatingCaptionToolbar extends FloatingCaptionToolbarBase {
    private _floatingPanelVisible;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, isBottomPosition: boolean);
    calcMinWidth(options: DashboardItemCaptionToolbarOptions): number;
    dispose(): void;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    protected _createInstance(): CaptionToolbar;
}
