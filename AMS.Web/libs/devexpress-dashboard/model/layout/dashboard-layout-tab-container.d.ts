﻿/**
* DevExpress Dashboard (dashboard-layout-tab-container.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DashboardItem } from '../items/dashboard-item';
import { DashboardTabPage } from '../items/tab-container-item/dashboard-tab-page';
import { DashboardLayoutGroup } from './dashboard-layout-group';
import { DashboardLayoutNode } from './dashboard-layout-node';
import { DashboardLayoutTabPage } from './dashboard-layout-tab-page';
export declare class DashboardLayoutTabContainer extends DashboardLayoutGroup {
    private get _tabContainer();
    protected _getDefaultItemType(): string;
    protected get _template(): string;
    protected get _visibleItems(): ko.ObservableArray<DashboardLayoutNode>;
    protected get _ignoreChildMaxHeight(): boolean;
    protected get _dragOverInnerElementController(): {
        selector: string;
        onDragOver: (index: number) => void;
    };
    private _visibleItemsCore;
    protected _activeTabIndex: ko.Computed<number>;
    constructor(modelJson?: Object, serializer?: ModelSerializer);
    protected _setItemCore(newItem: DashboardItem): void;
    _createTabPage(): DashboardLayoutTabPage;
    _removeLayoutTabPage(tabPageModel: DashboardTabPage): void;
    _activeTabPage: ko.Computed<DashboardTabPage>;
    _deleteDashbordItem(): void;
    private _addLayoutTabPage;
}
