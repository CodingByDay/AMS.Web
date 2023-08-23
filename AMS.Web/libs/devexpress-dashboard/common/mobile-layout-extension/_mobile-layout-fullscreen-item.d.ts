﻿/**
* DevExpress Dashboard (_mobile-layout-fullscreen-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { baseItem } from '../../viewer-parts/viewer-items/_base-item';
import { ViewerItemFactory } from '../../viewer-parts/_viewer-item-factory';
import { FullscreenItemModel } from '../docking-layout/_docking-layout-fullscreen-item';
import { MasterFiltersEditorModel } from './_mobile-layout-master-filters-editor';
export declare class MobileItemViewerFactory extends ViewerItemFactory {
    createItem(container: HTMLElement, options: any): baseItem;
}
export declare class PopupResizeController {
    private _repaintRequest;
    private _resizeHandler;
    constructor(_repaintRequest: JQueryCallback);
    onInitialized: (e: any) => void;
    onDisposing: (e: any) => void;
}
export declare var createFullscreenItemViewModel: (fullscreenItemModel: FullscreenItemModel, masterFilters: MasterFiltersEditorModel, repaintRequest: JQueryCallback) => Object;
