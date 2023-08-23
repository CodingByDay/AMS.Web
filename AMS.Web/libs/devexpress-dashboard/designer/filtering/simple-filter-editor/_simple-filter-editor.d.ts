﻿/**
* DevExpress Dashboard (_simple-filter-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import { Properties as dxPopupOptions } from 'devextreme/ui/popup';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { DisposableObject } from '../../../model/disposable-object';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { FilterFieldSelector } from './_filter-field-wrapper';
import { SimpleFilterTreeList } from './_simple-filter-tree-list';
interface SimpleFilterEditorViewModel {
    getPopupOptions: (container: DxElement) => dxPopupOptions;
    fieldSelector: FilterFieldSelector;
    filterTreeList: SimpleFilterTreeList;
}
export declare class SimpleFilterEditor extends DisposableObject {
    dashboardItem: DataDashboardItem;
    dataSourceBrowser: DataSourceBrowser;
    popupVisible: ko.Observable<boolean>;
    _fieldSelector: FilterFieldSelector;
    _filterTreeList: SimpleFilterTreeList;
    viewModel: SimpleFilterEditorViewModel;
    constructor(dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser);
    private _onPopupHidden;
    private _onPopupShown;
    private _applyHandler;
    dispose(): void;
}
export {};
