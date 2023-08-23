﻿/**
* DevExpress Dashboard (_static-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { ViewerToolbarLocatedItem } from './_caption-toolbar-arranger';
import { CaptionToolbar, DashboardCaptionToolbarBase } from './_caption-toolbar-base';
export declare class StaticCaptionToolbar extends DashboardCaptionToolbarBase {
    protected _className: string;
    private _hasBorder;
    private allowHideEmptyToolbar;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml: boolean, _className: string, _hasBorder: boolean, allowHideEmptyToolbar: any);
    calcHeight(options: DashboardItemCaptionToolbarOptions): number;
    calcMinWidth(options: DashboardItemCaptionToolbarOptions): any;
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
    protected _createInstance(): CaptionToolbar;
    private _visible;
}
