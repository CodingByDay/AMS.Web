﻿/**
* DevExpress Dashboard (_floating-toolbar-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { ViewerToolbarLocatedItem } from './_caption-toolbar-arranger';
import { CaptionToolbar, DashboardCaptionToolbarBase, dxToolbarItem } from './_caption-toolbar-base';
import { FloatingPanel } from './_floating-panel';
export declare class FloatingCaptionToolbarBase extends DashboardCaptionToolbarBase {
    protected _isBottomPosition: boolean;
    protected _floatingPanel: FloatingPanel;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, _isBottomPosition: boolean);
    set isBottomFloatingTypePosition(isBottom: boolean);
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    calcHeight(): number;
    onResize(): void;
    showFloatingPanel(): void;
    hideFloatingPanel(): void;
    dispose(): void;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    protected _updateToolbar(): void;
    protected _repaintFloatingPanel(): void;
    protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
    protected _createInstance(): CaptionToolbar;
    protected _getToolbarItems(items: Array<ViewerToolbarLocatedItem>): Array<dxToolbarItem>;
    protected _createFloatingPanel(toolbarDiv: HTMLElement, floatingPanelDiv: HTMLElement, preview: boolean): FloatingPanel;
}
