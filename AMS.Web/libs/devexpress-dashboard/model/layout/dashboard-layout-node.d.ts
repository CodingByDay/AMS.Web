﻿/**
* DevExpress Dashboard (dashboard-layout-node.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ILayoutItemViewModel, ILayoutItemViewModelProvider, LayoutItemInsertionBehavior } from '../../common/docking-layout/core/_layout-item';
import { DashboardLayoutGroupOrientation } from '../enums';
import { IDashboardItemsProvider } from '../internal/_interfaces';
import { KnockoutEntry } from '../internal/_knockout-utils';
import { DashboardItem } from '../items/dashboard-item';
import { TypedSerializableModel } from '../serializable-model';
import { DashboardItemJson } from './metadata/_dashboard-layout-node';
export declare type LayoutItemInsertPosition = 'left' | 'right' | 'top' | 'bottom';
export declare abstract class DashboardLayoutNode extends TypedSerializableModel implements ILayoutItemViewModelProvider {
    static _canAttach(parent: DashboardLayoutNode, dashboardLayoutNode: DashboardLayoutNode | DashboardItemJson): boolean;
    dashboardItem: ko.Observable<string>;
    itemType: ko.Observable<string>;
    weight: ko.Observable<number>;
    parentNode: ko.Observable<any>;
    _dashboard: ko.Observable<IDashboardItemsProvider>;
    _item: ko.Observable<DashboardItem>;
    get item(): DashboardItem;
    set item(newItem: DashboardItem);
    constructor(dashboardLayoutItemJSON?: any, serializer?: ModelSerializer);
    getInfo(): ISerializationInfoArray;
    findLayoutItem(dashboardItem: DashboardItem): DashboardLayoutNode;
    insert(itemToInsert: DashboardLayoutNode | DashboardItem, position: LayoutItemInsertPosition): void;
    moveTo(targetItem: DashboardLayoutNode, position: LayoutItemInsertPosition): void;
    _moveTo(targetItem: DashboardLayoutNode, position: LayoutItemInsertPosition, insertionBehavior?: LayoutItemInsertionBehavior): void;
    remove(): void;
    _relativeWidth: ko.Computed<any>;
    _relativeHeight: ko.Computed<any>;
    _relativeArea: ko.Computed<number>;
    _create(modelItemJson?: any, position?: LayoutItemInsertPosition, insertionBehavior?: LayoutItemInsertionBehavior): DashboardLayoutNode;
    _validateParentNode(newParentNode: any): void;
    _canAttach(itemToAttach: DashboardLayoutNode | DashboardItemJson): boolean;
    _viewModel: ILayoutItemViewModel;
    _createViewModel(): ILayoutItemViewModel;
    protected get _template(): string;
    protected get _ignoreChildMaxHeight(): boolean;
    protected get _visibleItems(): ko.ObservableArray<DashboardLayoutNode>;
    protected get _childItems(): ko.ObservableArray<DashboardLayoutNode>;
    protected get _orientation(): ko.Observable<DashboardLayoutGroupOrientation>;
    protected get _createPlaceholderFunc(): () => ILayoutItemViewModel;
    protected get _dragOverInnerElementController(): any;
    protected _activeTabPage: KnockoutEntry;
    protected _activeTabIndex: KnockoutEntry;
    protected _delete(): void;
    protected _insertItemCore(layoutNodeToInsert: DashboardLayoutNode, position: LayoutItemInsertPosition, insertionBehavior?: LayoutItemInsertionBehavior): void;
    protected _setItemCore(newItem: DashboardItem): void;
    protected _createTabPage(): void;
    _ensureItemParentContainer(): void;
    _deleteDashbordItem(): void;
}
