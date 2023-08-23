﻿/**
* DevExpress Dashboard (_mobile-layout-caption-toolbar.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { CaptionToolbar } from './_caption-toolbar-base';
import { StaticCaptionToolbar } from './_static-toolbar';
export declare class MobileLayoutCaptionToolbar implements CaptionToolbar {
    private _container;
    private _controlContainer;
    private _popupContainer;
    private _encodeHtml;
    private _className;
    private _hasBorder;
    _actionToolbar: StaticCaptionToolbar;
    _contentToolbar: StaticCaptionToolbar;
    _toolbars: Array<StaticCaptionToolbar>;
    protected _disabled: boolean;
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, _encodeHtml: boolean, _className: string, _hasBorder?: boolean);
    get element(): any;
    get disabled(): boolean;
    calcHeight(options: DashboardItemCaptionToolbarOptions): number;
    calcMinWidth(options: DashboardItemCaptionToolbarOptions): number;
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    onResize(): void;
    dispose(): void;
    protected _createInstance(): CaptionToolbar;
    private _prepareContentToolbarOptions;
    private _prepareActionToolbarOptions;
    private _hasItems;
}
