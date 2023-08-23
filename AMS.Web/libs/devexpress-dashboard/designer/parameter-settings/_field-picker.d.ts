﻿/**
* DevExpress Dashboard (_field-picker.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import { TreeListController, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { IDataSourceConsumer } from '../../model/data-sources/data-source';
export declare class FieldListPicker {
    disabled: ko.Observable<boolean>;
    constructor(dataSourceBrowser: DataSourceBrowser, _value: ko.Observable<string>, model: IDataSourceConsumer, disabled: ko.Observable<boolean>);
    itemsProvider: any;
    treeListController: DashboardTreeListFieldController;
    pathToMembers: ko.Computed<string>;
    value: ko.Computed<string>;
    displayValue: ko.Computed<string>;
}
declare class DashboardTreeListFieldController extends TreeListController {
    private _value;
    constructor(_value: ko.Observable<string>);
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
}
export {};
