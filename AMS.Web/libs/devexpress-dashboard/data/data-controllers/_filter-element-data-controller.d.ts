﻿/**
* DevExpress Dashboard (_filter-element-data-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataControllerBase } from './_data-controller-base';
export declare const VALUE_EXPR = "value";
export declare const KEY_EXPR = "key";
export interface dataSourceItem {
    [KEY_EXPR]: number;
    [VALUE_EXPR]: any;
    text?: string;
    html?: string;
    isAll?: boolean;
}
export declare class filterElementDataController extends dataControllerBase {
    dataSource: dataSourceItem[];
    selection: dataSourceItem[];
    fullSelection: dataSourceItem[];
    constructor(options: any);
    getAllItemIndex(): number;
    getDataSourceItemKey(item: dataSourceItem): number;
    getDataSourceItemByKey(key: number): dataSourceItem;
    isAllSelected(): boolean;
    update(selectedValues: any, encodeHtml: any, selectionOnly?: boolean): void;
    getInteractionValues(elements: any, selectedValues: any): any[];
    _getDataValue(wrappedValue: any): any;
    _reset(selectionOnly?: boolean): void;
}
export declare class listViewDataController extends filterElementDataController {
    ListBoxType: {
        Checked: string;
        Radio: string;
    };
    ComboBoxType: {
        Standard: string;
        Checked: string;
    };
    constructor(options: any);
    isMultiselectable(): boolean;
}
export declare class treeViewDataController extends filterElementDataController {
    constructor(options: any);
    isMultiselectable(): boolean;
    getAllItemIndex(): number;
    isAllSelected(): boolean;
    update(selectedValues: any, encodeHtml: any, selectionOnly?: boolean): void;
    getInteractionValues(elements: any, selectedValues: any): any;
    private _updateSelection;
    private _getDataNullChildCount;
}
