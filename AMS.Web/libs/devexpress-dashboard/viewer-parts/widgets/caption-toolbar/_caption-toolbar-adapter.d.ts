/**
* DevExpress Dashboard (_caption-toolbar-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ViewerToolbarLocatedItem } from './_caption-toolbar-arranger';
import { dxToolbarItem } from './_caption-toolbar-base';
export declare class DashboardCaptionToolbarAdapter {
    private _encodeHtml;
    constructor(_encodeHtml: boolean);
    createToolbarItem(item: ViewerToolbarLocatedItem, controlContainer?: HTMLElement, popupContainer?: HTMLElement, onMenuItemClick?: () => void): dxToolbarItem;
    private _applyText;
    private _createToolbarItemOptions;
    private _createTooltipOptions;
    private _fillCssClasses;
    private _validate;
    private _createSeparatorItem;
}
