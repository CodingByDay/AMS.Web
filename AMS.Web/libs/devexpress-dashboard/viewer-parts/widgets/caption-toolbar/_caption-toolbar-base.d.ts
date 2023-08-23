﻿/**
* DevExpress Dashboard (_caption-toolbar-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { DxElement } from 'devextreme/core/element';
import dxToolbar, { Properties as dxToolbarOptions } from 'devextreme/ui/toolbar';
import { DashboardItemCaptionToolbarOptions } from './caption-toolbar-options';
import { DashboardCaptionToolbarAdapter } from './_caption-toolbar-adapter';
import { ViewerToolbarLocatedItem } from './_caption-toolbar-arranger';
export interface CaptionToolbar {
    calcHeight: (options: DashboardItemCaptionToolbarOptions) => number;
    calcMinWidth: (options: DashboardItemCaptionToolbarOptions) => number;
    update: (options: DashboardItemCaptionToolbarOptions) => boolean;
    onResize: () => void;
    dispose: () => void;
    element: HTMLElement;
    disabled: boolean;
}
export interface dxToolbarItem {
    location: string;
    options?: dxToolbarItemOptions;
    widget?: string;
    template?: () => JQuery | Element | string;
    html?: string;
    text?: string;
}
export interface dxToolbarItemOptions {
    elementAttr?: dxToolbarItemElementAttr;
    disabled?: boolean;
    hint?: string;
    html?: string;
    text?: string;
    template?: (buttonData: any, contentElement: DxElement) => JQuery | Element | string;
    onClick?: (data: {
        element: DxElement;
    }) => void;
    onContentReady?: (data: any) => void;
}
export interface dxToolbarItemElementAttr {
    class?: string;
    id?: string;
}
export declare abstract class DashboardCaptionToolbarBase implements CaptionToolbar {
    protected _container: HTMLElement;
    protected _controlContainer: HTMLElement;
    protected _popupContainer: HTMLElement;
    protected encodeHtml: boolean;
    protected _adapter: DashboardCaptionToolbarAdapter;
    protected _toolbar: dxToolbar;
    protected _toolbarDiv: HTMLElement;
    protected _toolbarContainer: HTMLElement;
    protected _options: DashboardItemCaptionToolbarOptions;
    protected _className: string;
    protected _disabled: boolean;
    protected get _initialized(): boolean;
    protected get _staticItemsClass(): string;
    get element(): HTMLElement;
    get disabled(): boolean;
    set disabled(value: boolean);
    constructor(_container: HTMLElement, _controlContainer: HTMLElement, _popupContainer: HTMLElement, encodeHtml?: boolean);
    update(options: DashboardItemCaptionToolbarOptions): boolean;
    calcHeight(options: DashboardItemCaptionToolbarOptions): number;
    calcMinWidth(options: DashboardItemCaptionToolbarOptions): any;
    onResize(): void;
    dispose(): void;
    protected _updateToolbar(): void;
    protected _createInstance(): CaptionToolbar;
    protected _getToolbarOptions(): dxToolbarOptions;
    protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
    protected _getToolbarItems(items: Array<ViewerToolbarLocatedItem>): Array<dxToolbarItem>;
    protected _appendToContainer(toolbarDiv: HTMLElement): HTMLElement;
    protected _resizeStaticToolbarItems(toolbarDiv?: HTMLElement): void;
    protected _processToolbarBeforeGettingSize(toolbar: CaptionToolbar): void;
}
export interface ItemCaptionToolbarViewOptions {
    hasCaption: boolean;
    encodeHtml: boolean;
    captionToolbarSeparatorRequired: boolean;
    isBottomFloatingToolbarPosition: boolean;
    allowPreview: boolean;
    hiddenToolbar: boolean;
    itemHasOwnContent: boolean;
}
