﻿/**
* DevExpress Dashboard (_viewer-interfaces.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DashboardItem } from '../../model/items/dashboard-item';
import { baseItem, ViewerItemVisualMode } from '../../viewer-parts/viewer-items/_base-item';
import { DashboardItemCaptionToolbarOptions } from '../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options';
import { CaptionToolbar, ItemCaptionToolbarViewOptions } from '../../viewer-parts/widgets/caption-toolbar/_caption-toolbar-base';
import { ViewerItemFactory } from '../../viewer-parts/_viewer-item-factory';
import { ViewerItemAdaptersManager } from './adapters/_item-viewer-adapter-factory';
export declare type ItemCreatingType = 'primary' | 'secondary';
export interface IDashboardContext {
    beforeApplyViewerItemOptions?: JQueryCallback;
    viewerItemCreated?: JQueryCallback;
    viewerItemDispose?: JQueryCallback;
    addContextToolbarItems?: JQueryCallback;
    viewerItemCreator?: any;
    refresh?: (itemName?: string) => void;
    isDesignMode?: ko.Observable<boolean>;
    useNeutralFilterMode?: () => boolean;
    viewerItemsManager?: ViewerItemAdaptersManager;
}
export declare class DashboardItemContext implements IDashboardItemContext {
    constructor(options?: IDashboardItemContextOptions);
    addContextToolbarItems: JQuery.Callbacks<Function>;
    viewerItemCreated: JQuery.Callbacks<Function>;
    viewerItemDispose: JQuery.Callbacks<Function>;
    beforeApplyViewerItemOptions: JQuery.Callbacks<Function>;
    captionToolbarCreated: JQuery.Callbacks<Function>;
    createCaptionToolbar: (viewerItem: baseItem, container: HTMLElement, controlContainer: HTMLElement, popupContainer: HTMLElement, viewOptions: ItemCaptionToolbarViewOptions) => CaptionToolbar;
    itemFactory?: ViewerItemFactory;
    ignoreDesignMode?: boolean;
    disabled?: ko.Subscribable<boolean>;
    visualMode?: ko.Subscribable<ViewerItemVisualMode>;
    boundaryContainer?: HTMLElement;
    itemCreatingType?: ItemCreatingType;
}
export interface IDashboardItemContext {
    addContextToolbarItems?: JQueryCallback;
    viewerItemCreated?: JQueryCallback;
    viewerItemDispose?: JQueryCallback;
    beforeApplyViewerItemOptions?: JQueryCallback;
    createCaptionToolbar?: (viewerItem: baseItem, container: HTMLElement, controlContainer: HTMLElement, popupContainer: HTMLElement, viewOptions: ItemCaptionToolbarViewOptions) => CaptionToolbar;
    itemFactory?: ViewerItemFactory;
    ignoreDesignMode?: boolean;
    disabled?: ko.Subscribable<boolean>;
    visualMode?: ko.Subscribable<ViewerItemVisualMode>;
    boundaryContainer?: HTMLElement;
    itemCreatingType?: ItemCreatingType;
}
export interface IDashboardItemContextOptions {
    addContextToolbarItems?: (options: DashboardItemCaptionToolbarOptions, item: DashboardItem) => void;
    createCaptionToolbar?: (viewerItem: baseItem, container: HTMLElement, controlContainer: HTMLElement, popupContainer: HTMLElement, viewOptions: ItemCaptionToolbarViewOptions) => CaptionToolbar;
    viewerItemCreated?: (item: DashboardItem, viewerItem: baseItem) => void;
    viewerItemDispose?: (item: DashboardItem, viewerItem: baseItem) => void;
    beforeApplyViewerItemOptions?: (item: DashboardItem, options: any, isCreation: boolean) => void;
    itemFactory?: ViewerItemFactory;
    ignoreDesignMode?: boolean;
    disabled?: ko.Subscribable<boolean>;
    visualMode?: ko.Subscribable<ViewerItemVisualMode>;
    boundaryContainer?: HTMLElement;
    itemCreatingType?: ItemCreatingType;
}
