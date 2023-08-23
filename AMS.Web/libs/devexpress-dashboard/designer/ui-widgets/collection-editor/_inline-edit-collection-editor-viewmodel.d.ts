﻿/**
* DevExpress Dashboard (_inline-edit-collection-editor-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Column as dxDataGridColumn, Properties as dxDataGridOptions } from 'devextreme/ui/data_grid';
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../../data/localization/_default';
import { CollectionEditorRefreshCallback } from './_collection-editor-viewmodel-base';
export interface InlineEditCollectionEditorOptions<T> {
    dataFields: Array<string>;
    noDataText?: DashboardLocalizationId;
    gridColumns?: Array<dxDataGridColumn>;
    isToolbarVisible?: boolean;
    allowAddItem?: boolean;
    allowRemoveItem?: boolean;
    allowReorderItem?: boolean;
    createNewItemHandler?: () => T;
    customizeInlineEditor?: (e: any) => void;
    customizeCell?: (e: any) => void;
    enableAddItem?: (selectedItem: T) => boolean;
    enableRemoveItem?: (selectedItem: T) => boolean;
    enableEditItem?: (selectedItem: T, args: any) => boolean;
    forceRefreshCallback?: CollectionEditorRefreshCallback;
}
export declare class InlineEditCollectionEditorViewModel<T> {
    private dataFields;
    private dataSource;
    private noDataText;
    private enableAddItem;
    private enableRemoveItem;
    private enableEditItem;
    private createNewItemHandler;
    private customizeInlineEditor;
    private customizeCell;
    private gridColumns;
    private dataSourceSubscription;
    private gridInstance;
    private dataSourceMapper;
    isToolbarVisible: boolean;
    allowAddItem: boolean;
    allowRemoveItem: boolean;
    allowReorderItem: boolean;
    addEnabled: ko.Observable<boolean>;
    removeEnabled: ko.Observable<boolean>;
    upEnabled: ko.Observable<boolean>;
    downEnabled: ko.Observable<boolean>;
    constructor(params: InlineEditCollectionEditorOptions<T>, dataSource: ko.ObservableArray<T>);
    getGridOptions(): dxDataGridOptions;
    get selectedValue(): T;
    add: () => void;
    remove: () => T[];
    down: () => void;
    up: () => void;
    dispose(): void;
    private _addNewItemRow;
    private _moveSelectedGridRow;
    private _updateActionsState;
}
