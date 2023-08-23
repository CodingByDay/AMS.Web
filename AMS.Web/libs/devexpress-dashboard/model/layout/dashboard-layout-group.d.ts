﻿/**
* DevExpress Dashboard (dashboard-layout-group.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ILayoutItemViewModel, LayoutItemInsertionBehavior } from '../../common/docking-layout/core/_layout-item';
import { DashboardLayoutGroupOrientation } from '../enums';
import { IDashboardItemsProvider } from '../internal/_interfaces';
import { DashboardItem } from '../items/dashboard-item';
import { DashboardLayoutNode, LayoutItemInsertPosition } from './dashboard-layout-node';
export declare class DashboardLayoutGroup extends DashboardLayoutNode {
    protected get _template(): string;
    protected get _createPlaceholderFunc(): () => ILayoutItemViewModel;
    protected get _visibleItems(): ko.ObservableArray<DashboardLayoutNode>;
    protected get _childItems(): ko.ObservableArray<DashboardLayoutNode>;
    protected get _orientation(): ko.Observable<DashboardLayoutGroupOrientation>;
    constructor(modelJson?: any, serializer?: ModelSerializer);
    orientation: ko.Observable<DashboardLayoutGroupOrientation>;
    childNodes: ko.ObservableArray<DashboardLayoutNode>;
    findLayoutItem(dashboardItem: DashboardItem): DashboardLayoutNode;
    getNodesRecursive(): Array<DashboardLayoutNode>;
    getItemsRecursive(): Array<DashboardLayoutNode>;
    private _attachToGroupWithInversedOrientation;
    _attachChild(target: DashboardLayoutNode, itemToAttach: DashboardLayoutNode, position: LayoutItemInsertPosition): void;
    _detachChild(removedChildLayoutNode: DashboardLayoutNode): void;
    private _ensureGroupIsNeeded;
    private _wrapChildWithGroup;
    private _getOrientationByInsertPosition;
    _insertItemCore(layoutNodeToInsert: DashboardLayoutNode, position: LayoutItemInsertPosition, insertionBehavior?: LayoutItemInsertionBehavior): void;
    _addItem(layoutNodeToInsert: DashboardLayoutNode): void;
    protected _getDefaultItemType(): string;
    _deleteDashbordItem(): void;
}
export declare class DashboardLayoutRootGroup extends DashboardLayoutGroup {
    constructor(dashboard: IDashboardItemsProvider, modelJson?: any, serializer?: ModelSerializer);
    protected _getDefaultItemType(): string;
    _addItem(layoutNodeToInsert: DashboardLayoutNode): void;
}
