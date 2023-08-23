﻿/**
* DevExpress Dashboard (_simple-filter-tree-list.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxTreeList from 'devextreme/ui/tree_list';
import { KnockoutTemplate } from '../../../common/common-interfaces';
import { DataSourceBrowser, IFilterItem } from '../../../common/_data-source-browser';
import { DataDashboardItem, DisposableObject } from '../../../model';
import { FilterFieldInfo } from './_filter-field-wrapper';
interface TreeListItem {
    id: string;
    displayName: string;
    parentId: string;
    hasItems: boolean;
    data: IFilterItem;
}
export declare class SimpleFilterTreeList extends DisposableObject {
    private dashboardItem;
    private dataSourceBrowser;
    treeList: dxTreeList;
    _dataCache: TreeListItem[];
    constructor(dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser);
    reload(field: FilterFieldInfo): void;
    show(field: FilterFieldInfo): void;
    hide(): void;
    getTreeListItems(): Array<TreeListItem>;
    dispose(): void;
    template: KnockoutTemplate;
    private _getBranchIndexes;
    private _getStore;
    private _getTreeListOptions;
}
export {};
