﻿/**
* DevExpress Dashboard (_collection-editor-viewmodel-base.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxList, { Properties as dxListOptions } from 'devextreme/ui/list';
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../../data/localization/_default';
export interface CollectionEditorOptionsBase<T> {
    noDataText?: DashboardLocalizationId;
    customToolbarItems?: Array<{
        name: DashboardLocalizationId | string;
        icon: string;
        action: () => void;
    }>;
}
export declare class CollectionEditorViewModelBase<T> {
    protected listInstance: dxList;
    private noDataText;
    isToolbarVisible: boolean;
    allowAddItem: boolean;
    allowEditItem: boolean;
    allowReorderItem: boolean;
    allowRemoveItem: boolean;
    addEnabled: ko.Observable;
    editEnabled: ko.Observable;
    upEnabled: ko.Observable;
    downEnabled: ko.Observable;
    removeEnabled: ko.Observable;
    customToolbarItems: Array<{
        name: DashboardLocalizationId | string;
        icon: string;
        action: () => void;
    }>;
    _innerSelection: T;
    edit: () => void;
    constructor(params: CollectionEditorOptionsBase<T>);
    getListOptions(): dxListOptions;
    get selectedValue(): T;
    dispose(): void;
    protected _itemTemplate(itemData: any, itemIndex: any, itemElement: any): void;
    protected _getDisplayText(itemData: T): string;
    protected _itemClickHandler(): void;
    protected _listSelectionChanged(): void;
    protected _updateActionsState(): void;
    protected _onSelectionChanged(): void;
    protected _setListSelection(selectedItem: any): void;
}
export declare class CollectionEditorRefreshCallback {
    private readonly callbacks;
    refresh: () => void;
    subscribe: (fn: () => void) => number;
}
