﻿/**
* DevExpress Dashboard (_hovered-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { ViewerToolbarLocatedItem } from './_caption-toolbar-arranger';
import { CaptionToolbar, DashboardCaptionToolbarBase } from './_caption-toolbar-base';
export declare class HoveredDashboardCaptionToolbar extends DashboardCaptionToolbarBase {
    private _hasBorder;
    private _containerHovered;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, _hasBorder: boolean);
    dispose(): void;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
    protected _createInstance(): CaptionToolbar;
    protected _processToolbarBeforeGettingSize(toolbar: CaptionToolbar): void;
    private setHoverState;
}
