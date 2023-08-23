﻿/**
* DevExpress Analytics (core\internal\_stores.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import ArrayStore from 'devextreme/data/array_store';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';
import * as ko from 'knockout';
import { Disposable } from '../../serializer/utils';
export declare class CustomSortedArrayStore extends CustomStore {
    static _sortItems(items: any[], sortPropertyName: string): any[];
    static _createOptions(items: any, sortPropertyName: any): {
        load: (options: any) => JQuery.Promise<any, any, any>;
        byKey: (key: any) => any;
    };
    constructor(items: any[], sortPropertyName?: string);
}
export declare class SortedArrayStore extends ArrayStore {
    constructor(options: any, sortPropertyName?: string);
}
export declare class ControlsStore extends Disposable {
    private _filter;
    dataSource: ko.Computed<DataSource>;
    constructor(allControls: ko.ObservableArray<any>);
    getFilter(): any;
    setFilter(filter: any): void;
    resetFilter(): void;
    visible: ko.Computed<boolean>;
}
