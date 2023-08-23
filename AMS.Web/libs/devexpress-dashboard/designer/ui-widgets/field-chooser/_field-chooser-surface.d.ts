﻿/**
* DevExpress Dashboard (_field-chooser-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import dxList from 'devextreme/ui/list';
import 'devextreme/ui/scroll_view';
import 'devextreme/ui/text_box';
import dxTreeView, { Properties as dxTreeViewOptions } from 'devextreme/ui/tree_view';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DisposableObject } from '../../../model';
import { CalculatedField } from '../../../model/data-sources/calculated-field';
import { IDataField } from '../../../model/data-sources/_data-field';
import { CalcFieldEditor } from '../../calc-field-editor/_calc-field-editor';
import { ConfirmDialogViewModel } from '../../confirm-dialog/_confirm-dialog';
import { ISlidableListsNavigable } from '../_ui-widgets';
export declare class FieldChooserItem {
    data: IDataField;
    static getName(data: IDataField): string;
    constructor(data: IDataField);
    get displayName(): string;
    get name(): string;
    get isHierarchy(): boolean;
    get isLeaf(): boolean;
    get isGroup(): boolean;
    get type(): string;
    get normalizedType(): string;
    get isCalcField(): boolean;
    get isCorruptedCalcField(): boolean;
    get isOlap(): boolean;
    get isOlapDimension(): boolean;
    get isOlapDimensionHierarchy(): boolean;
    get isOlapMeasure(): boolean;
    get isAggregate(): boolean;
    get isList(): boolean;
    get disabled(): boolean;
    get typeTooltip(): string;
}
export declare class TreeViewFieldChooserItem extends FieldChooserItem {
    data: IDataField;
    id: string;
    parentId: string;
    constructor(data: IDataField, id: string, parentId: string);
    selected: boolean;
}
export interface SearchResultItem {
    path: string;
    item: FieldChooserItem;
}
export declare class FieldChooserList extends DisposableObject {
    private owner;
    path: string;
    pathParts: string[];
    private _selectedField;
    private _scrollAfterInitialize;
    constructor(owner: SliderController, path: string, pathParts: string[], _selectedField: ko.Observable<IDataField>);
    ancestors: string[];
    itemClick: (args: {
        itemData: FieldChooserItem;
        component: dxList;
    }) => void;
    reload(): void;
    scrollToSelectedItem(): void;
    onInitialized: (e: any) => void;
    onContentReady: () => void;
    component: dxList;
    items: ko.Observable<FieldChooserItem[]>;
    index: ko.Observable<number>;
    ready: ko.Observable<boolean>;
    selectedItemName: ko.Observable<string[]>;
    loading: ko.Observable<boolean>;
}
export declare class SliderController extends DisposableObject implements ISlidableListsNavigable {
    static TRANSITION_TIME: number;
    constructor(params: {
        startPath: ko.Observable<string>;
        dataSourceBrowser: DataSourceBrowser;
        filter: (dataField: IDataField) => boolean;
        selectedField: ko.Observable<IDataField>;
    });
    rootPath: ko.Observable<string>;
    selectedField: ko.Observable<IDataField>;
    dataSourceBrowser: DataSourceBrowser;
    filter: (dataField: IDataField) => boolean;
    lists: ko.ObservableArray<FieldChooserList>;
    isSliding: boolean;
    slide(list: FieldChooserList, item: FieldChooserItem): void;
    backClick: (pathItem: string, ancestors: string[]) => void;
}
export declare class FieldChooserController extends SliderController {
    calcFieldEditor: CalcFieldEditor;
    get dataSourceName(): string;
    get canAddCalculatedField(): boolean;
    addCalcField: () => void;
    editCalcField: () => void;
    removeCalcField: () => void;
    _inappropriateCalcFieldConfirmation: ConfirmDialogViewModel;
    onCalcFieldSaveHandler: (calcField: CalculatedField) => JQuery.PromiseBase<void, never, never, never, never, never, never, never, never, never, never, never>;
    getCurrentCalcField: () => CalculatedField;
    isCalcFieldSelected: ko.PureComputed<boolean>;
    private _navigateToSelection;
    constructor(params: {
        startPath: ko.Observable<string>;
        dataSourceBrowser: DataSourceBrowser;
        filter: (dataField: IDataField) => boolean;
        selectedField: ko.Observable<IDataField>;
    });
    isSearchMode: ko.Observable<boolean>;
    searchString: ko.Observable<string>;
    searchResults: ko.ObservableArray<SearchResultItem>;
    hasSearchResults: ko.Observable<boolean>;
    searchButtonClick: (_: any, ev: JQueryEventObject) => void;
    selectViaSearchResults: (data: {
        itemData: SearchResultItem;
    }) => void;
    selectedSearchResult: ko.Computed<SearchResultItem>;
    isListMode: ko.Observable<boolean>;
    setListMode: () => void;
    setTreeMode: () => void;
    hasGroups: ko.Computed<boolean>;
    treeViewInstanceResolver: JQuery.Deferred<dxTreeView<any>, any, any>;
    get dataSourceTreeOptions(): dxTreeViewOptions;
}
