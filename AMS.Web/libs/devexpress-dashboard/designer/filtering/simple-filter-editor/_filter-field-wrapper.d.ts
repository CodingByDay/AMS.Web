﻿/**
* DevExpress Dashboard (_filter-field-wrapper.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { KnockoutTemplate } from '../../../common/common-interfaces';
import { IDataFieldsProvider } from '../../../common/_data-source-browser';
import { DisposableObject } from '../../../model';
import { DataItem } from '../../../model/data-item/data-item';
import { Dimension } from '../../../model/data-item/dimension';
import { IDataField } from '../../../model/data-sources/_data-field';
export interface FilterFieldInfo {
    dataMember: () => string;
    hasItems: (path: string) => boolean;
    isGroup: () => boolean;
}
declare class FilterFieldWrapper implements FilterFieldInfo {
    private getDisplayName;
    add: (d: Dimension) => number;
    dataMember: () => string;
    displayName: () => string;
    groupIndex: () => number;
    hasItems: (path: any) => boolean;
    isGroup: () => boolean;
    reorder: (dataFields: Array<IDataField>) => void;
    constructor(dimension: Dimension, getDisplayName: (dataItem: DataItem) => string);
    private _dimensions;
}
export declare class FilterFieldSelector extends DisposableObject {
    private dashboardItem;
    private dataSourceBrowser;
    _selectedField: ko.Observable<FilterFieldWrapper>;
    _fields: ko.ObservableArray<FilterFieldWrapper>;
    constructor(dashboardItem: any, dataSourceBrowser: IDataFieldsProvider, selectedFieldChanged: (field: FilterFieldInfo) => void);
    get selectedField(): FilterFieldInfo;
    template: KnockoutTemplate;
    init(): void;
    clear(): void;
    private _loadDataFields;
    private _generateFields;
}
export {};
