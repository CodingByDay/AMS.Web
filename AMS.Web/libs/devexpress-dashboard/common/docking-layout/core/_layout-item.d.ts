﻿/**
* DevExpress Dashboard (_layout-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DashboardItem, DashboardLayoutGroupOrientation, DashboardLayoutNode, DashboardTabPage, IDisposable, LayoutItemInsertPosition } from '../../../model';
import { KnockoutEntry } from '../../../model/internal/_knockout-utils';
import { DashboardItemJson } from '../../../model/layout/metadata/_dashboard-layout-node';
import { Constraints } from '../../../viewer-parts/layout/_utils.layout';
import { ISizeController } from '../../internal/_interfaces';
import { DashboardItemContext } from '../../viewer/_viewer-interfaces';
import { IResizableModel } from './_resizable';
export interface ILayoutItemViewModel {
    create: (modelItemJson: any, location: string, insertionBehavior?: LayoutItemInsertionBehavior) => any;
    moveTo: (itemModel?: ILayoutItemViewModel, location?: LayoutItemInsertPosition, insertionBehavior?: LayoutItemInsertionBehavior) => any;
    delete: () => void;
    canAttach?: (something: ILayoutItemViewModel | DashboardItemJson) => boolean;
    createTabPage: () => void;
    model: DashboardLayoutNode;
    item: ko.Subscribable<DashboardItem>;
    dashboardItem: ko.Subscribable<string>;
    orientation: ko.Observable<DashboardLayoutGroupOrientation>;
    weight: ko.Observable<number>;
    visibleItems: ko.ObservableArray<ILayoutItemViewModelProvider>;
    childItems: ko.ObservableArray<ILayoutItemViewModelProvider>;
    activeTabPage: KnockoutEntry<DashboardTabPage>;
    activeTabIndex: KnockoutEntry<number>;
    template: string;
    hasItem: ko.Subscribable<boolean>;
    ignoreChildMaxHeight: boolean;
    dragOverInnerElementController?: DragOverController;
    getPlaceholder(): ILayoutItemViewModel;
}
export interface ILayoutItemViewModelProvider {
    _createViewModel(): ILayoutItemViewModel;
}
export interface DragOverController {
    selector: string;
    onDragOver(elementIndex: number): void;
}
export interface ObservableConstraints {
    min: {
        width: ko.Observable<number>;
        height: ko.Observable<number>;
    };
    max: {
        width: ko.Observable<number>;
        height: ko.Observable<number>;
    };
}
export interface LayoutDroppableItem {
    node: LayoutItem;
    dropBehavior: LayoutItemInsertionBehavior;
}
export declare type LayoutItemInsertionBehavior = 'InsertIntoGroup' | 'InsertBesideGroup';
export declare function _syncLayoutHelper<T, U extends IDisposable>(sourceArray: ko.ObservableArray<T>, destArray: ko.ObservableArray<U>, addHandler: (value: T) => U): ko.Subscription;
export declare function setHoverLocation(hoverLayoutItem: LayoutItem, location?: LayoutItemInsertPosition, dropBehavior?: LayoutItemInsertionBehavior): void;
export declare let SplitterSize: number;
export declare const MinWeight = 0.00001;
export declare type LayoutEvent = 'click' | 'mouseover' | 'resize-started' | 'resize-completed' | 'get-context' | 'get-local-context' | 'get-context-menu-service' | 'get-empty-item-templates-service' | 'get-layout-item-placeholder-service';
export declare class LayoutItem implements IResizableModel, IDisposable {
    viewModel: ILayoutItemViewModel;
    private _isUpdating;
    static findLargestItem(layoutItem: LayoutItem): {
        maxSquare: number;
        item: LayoutItem;
    };
    private _constraints;
    _parent: ko.Observable<LayoutItem>;
    private _width;
    private _height;
    private _subscriptions;
    private _changeWeight;
    private _changeWeightCore;
    private _correntWeight;
    private _safeSetWidth;
    private _safeSetHeight;
    private _updateChildrenSize;
    private _updateChildrenResizeHandles;
    constructor(viewModel: ILayoutItemViewModel, parent?: LayoutItem);
    dispose(): void;
    isValidWidth(val: number): boolean;
    isValidHeight(val: number): boolean;
    setConstraints: (constraints: Constraints) => void;
    getSelectionParentsList(location: LayoutItemInsertPosition): LayoutDroppableItem[];
    private _getRequiredOrientationByLocation;
    private _inverseOrientation;
    private _checkGroupWillBeUnwrapped;
    findLayoutItem(criteria: (item: LayoutItem) => boolean): LayoutItem;
    findLayoutItemByItemModel(itemModel: ILayoutItemViewModel): LayoutItem;
    items: ko.ObservableArray<LayoutItem>;
    minWidth: ko.Computed<number>;
    minHeight: ko.Computed<number>;
    maxWidth: ko.Computed<number>;
    maxHeight: ko.Computed<number>;
    width: ko.Computed<number>;
    height: ko.Computed<number>;
    contentWidth: ko.Computed<number>;
    contentHeight: ko.Computed<number>;
    containerWidth: ko.Computed<number>;
    containerHeight: ko.Computed<number>;
    resizeHandles: ko.Observable<string>;
    isSelected: ko.Observable<boolean>;
    areChildrenSelected: ko.Computed<boolean>;
    dragOverLocation: ko.Observable<LayoutItemInsertPosition>;
    itemStyle: ko.Computed<string>;
    onEvent(item: LayoutItem, event: LayoutEvent): any;
    coverClickHandler: (e: any) => void;
    coverMouseOverHandler: (e: any) => void;
    resizeStarted: () => void;
    resizeCompleted: () => void;
    getContext: () => any;
    getLocalContext: () => DashboardItemContext;
    getContextMenu: () => any;
    getEmptyItemTemplates: () => any;
    getLayoutItemPlaceholder: () => any;
    verticalPaddings: ko.Observable<number>;
    horizontalPaddings: ko.Observable<number>;
    isDesignMode: ko.Observable<boolean>;
    isLayoutReady: ko.Observable<boolean>;
    updateSize(width: number, height: number): void;
    visible: ko.Computed<boolean>;
    create(modelItemJson?: any, location?: string, insertBehavior?: LayoutItemInsertionBehavior): LayoutItem;
    moveTo(layoutNode: LayoutItem, location: LayoutItemInsertPosition, insertBehavior?: LayoutItemInsertionBehavior): LayoutItem;
    delete(): void;
    getRoot(): LayoutItem;
    canAttach(something: ILayoutItemViewModel | DashboardItemJson): boolean;
    placeholderItem: LayoutItem;
    getPlaceholder(): LayoutItem;
    repaintCallbacks: JQuery.Callbacks<Function>;
    sizeController: ISizeController;
}
