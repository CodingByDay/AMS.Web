﻿/**
* DevExpress Dashboard (_title-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { ViewerToolbarLocatedItem } from './_caption-toolbar-arranger';
import { CaptionToolbar, DashboardCaptionToolbarBase } from './_caption-toolbar-base';
export declare class DashboardTitleToolbar extends DashboardCaptionToolbarBase {
    private allowHideEmptyToolbar;
    private _optionalClass?;
    private _showStaticItemsOnCenter;
    protected get _staticItemsClass(): string;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, allowHideEmptyToolbar?: boolean, _optionalClass?: any);
    calcHeight(options: DashboardItemCaptionToolbarOptions): number;
    update(options: DashboardItemCaptionToolbarOptions, showStaticItemsOnCenter?: boolean): boolean;
    protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
    protected _createInstance(): CaptionToolbar;
    private _visible;
}
