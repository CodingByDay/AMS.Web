﻿/**
* DevExpress Dashboard (_toolbar-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxPopupOptions } from 'devextreme/ui/popup';
import { Item as dxToolbarItem } from 'devextreme/ui/toolbar';
import * as ko from 'knockout';
export declare let toolbarAnimationTime: number;
export declare class ToolbarKoViewModel {
    private _getContainer;
    private _toolbarInitialized;
    private _visible;
    private _popupDisposables;
    left: ko.Observable<number>;
    toolbarItems: ko.ObservableArray<dxToolbarItem>;
    get height(): number;
    koToolbarOptions: any;
    constructor(getContainer: () => HTMLElement, toolbarInitialized: () => void);
    getKoPopupOptions(): dxPopupOptions;
    private _getKoToolbarOptions;
    setToolbarItems(items: dxToolbarItem[]): void;
    showPanel(): void;
    hidePanel(): void;
}
