﻿/**
* DevExpress Dashboard (_editable-list-editor-viewmodel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Properties as dxListOptions } from 'devextreme/ui/list';
import * as ko from 'knockout';
import { CollectionEditorOptionsBase, CollectionEditorViewModelBase } from './_collection-editor-viewmodel-base';
export interface EditableListEditorOptions<T> extends CollectionEditorOptionsBase<T> {
    propertyName?: string;
    dataSource: Array<T>;
    enableEditItem?: (item: T) => boolean;
    editItemHandler: (item: T) => void;
    getDisplayText?: (item: T) => string;
    onSelectionChanged?: (item: T) => void;
}
export declare class EditableListEditorViewModel<T> extends CollectionEditorViewModelBase<T> {
    private dataField;
    private dataSource;
    private enableEditItem;
    private editItemHandler;
    private getDisplayText;
    private onSelectionChanged;
    private selectedItem;
    constructor(params: EditableListEditorOptions<T>, selectedItem: ko.Observable<T>);
    getListOptions(): dxListOptions;
    edit: () => void;
    protected _getDisplayText(itemData: any): any;
    protected _listSelectionChanged(): void;
    protected _updateActionsState(): void;
}
