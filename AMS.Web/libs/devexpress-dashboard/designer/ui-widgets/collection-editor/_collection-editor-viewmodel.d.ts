﻿/**
* DevExpress Dashboard (_collection-editor-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { DxElement } from 'devextreme/core/element';
import { Properties as dxListOptions } from 'devextreme/ui/list';
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { CollectionEditorOptionsBase, CollectionEditorRefreshCallback, CollectionEditorViewModelBase } from './_collection-editor-viewmodel-base';
export interface CollectionEditorOptions<T> extends CollectionEditorOptionsBase<T> {
    propertyName?: string;
    isToolbarVisible?: boolean;
    allowAddItem?: boolean;
    allowReorderItem?: boolean;
    allowRemoveItem?: boolean;
    createNewItemHandler?: () => T;
    editItemHandler: (item: T, args: CollectionEditorEditItemArguments, container?: ko.Observable<T>) => void;
    removeItemHandler?: (item: T) => void;
    enableRemoveItem?: () => boolean;
    reorderItemsHandler?: (item: T, direction: 'up' | 'down') => void;
    visibleItemsFilter?: (item: T) => boolean;
    customTemplate?: (itemData: T, itemIndex: number, itemElement: DxElement) => HTMLElement;
    forceRefreshCallback?: CollectionEditorRefreshCallback;
}
export declare class CollectionEditorViewModel<T> extends CollectionEditorViewModelBase<T> {
    private dataField;
    private dataSource;
    private enableEditItem;
    private enableRemoveItem;
    private createNewItemHandler;
    private editItemHandler;
    private removeItemHandler;
    private reorderItemsHandler;
    private visibleItemsFilter;
    private customTemplate;
    private subscriptions;
    customToolbarItems: Array<{
        name: DashboardLocalizationId | string;
        icon: string;
        action: () => void;
    }>;
    constructor(params: CollectionEditorOptions<T>, dataSource: ko.ObservableArray<T>);
    getListOptions(): dxListOptions;
    add: () => void;
    edit: () => void;
    remove: () => void;
    up: () => void;
    down: () => void;
    protected _itemTemplate(itemData: any, itemIndex: any, itemElement: any): void;
    protected _getDisplayText(itemData: any): any;
    private _moveSelectedGridRow;
    protected _updateActionsState(): void;
    private _safeReloadDataSource;
    dispose(): void;
}
export declare class CollectionEditorEditItemArguments {
    requestRecalculation: JQuery.Callbacks<Function>;
    createImmediately: boolean;
}
