﻿/**
* DevExpress Dashboard (_dashboard-item-menu.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { LayoutItem } from '../../common/docking-layout/core/_layout-item';
import { DockingLayoutController } from '../../common/docking-layout/_docking-layout-controller';
import { DashboardLocalizationId } from '../../data/localization/_default';
import { DashboardItem } from '../../model';
import { DisposableObject } from '../../model/disposable-object';
import { PropertiesController } from '../properties-controller/_properties-controller';
import { BaseItemSurface } from './surfaces/_base-item-surface';
export declare var DashboardItemMenuSizes: {
    BindingPanelPanelWidth: (collapsed?: boolean) => 300 | 220 | 600 | 495;
    OptionsPanelWidth: (content?: boolean) => 300 | 298 | 274;
};
export interface IContextPopupMenu {
    menuItemId: string;
    icon: string;
    title?: DashboardLocalizationId;
    hint?: DashboardLocalizationId;
    detailVisible: ko.Observable<boolean>;
    templateName: string;
    popoverClass?: string;
    panelWidth: ko.Observable<number> | number;
    customData: any;
    showMenu?: () => void;
    index?: number;
    isDisposing?: boolean;
}
export interface IContextPopupMenuViewModel {
    menuButton: {
        icon: string;
        hint: string;
        cssClass: ko.PureComputed<string>;
        clickHandler: () => void;
    };
    menuPropertiesPanel: {
        title: string;
        panelContent: {
            view: string;
            viewModel: any;
        };
        cssClasses: ko.PureComputed<string>;
        style: ko.PureComputed<{
            width: string;
            marginLeft: string;
        }>;
        detailVisible: ko.Observable<boolean>;
        hidePanelAction: () => void;
    };
    getPopoverOptions: any;
}
export declare const createContextPopupMenuViewModel: (menuItem: IContextPopupMenu, dashboardItemMenu: DashboardItemMenu) => IContextPopupMenuViewModel;
export interface IDashboardItemMenu {
    contextMenuItems: ko.ObservableArray<IContextPopupMenu>;
}
export interface IDashboardItemMenuViewModel {
    menuContainerCssClasses: ko.PureComputed<string>;
    menuItemDetailVisible: ko.PureComputed<boolean>;
    contextMenuItemViewModels: ko.PureComputed<IContextPopupMenuViewModel[]>;
    isCollapsedStateToggleVisible: ko.Subscribable<boolean>;
    isCollapsed: ko.Subscribable<boolean>;
    collapsedStateToggle: () => void;
    deleteCurrentItemAction: () => void;
    deleteCurrentItemActionCaption: string;
}
export declare class DashboardItemMenu extends DisposableObject implements IDashboardItemMenu {
    layoutController: DockingLayoutController;
    layoutItem: LayoutItem;
    private _positionCalculator;
    propertiesController: PropertiesController;
    constructor(layoutController: DockingLayoutController, layoutItem: LayoutItem, _positionCalculator: ItemMenuPositionCalculator, propertiesController: PropertiesController, itemSurface: BaseItemSurface<DashboardItem>);
    createViewModel(): IDashboardItemMenuViewModel;
    menuItemClick: (menuItemId: string) => void;
    selectedItemSurface: BaseItemSurface<DashboardItem>;
    contextMenuItems: ko.ObservableArray<IContextPopupMenu>;
    contextMenuItemViewModels: ko.PureComputed<IContextPopupMenuViewModel[]>;
    menuItemDetailVisible: ko.PureComputed<boolean>;
    propertiesPanelStyle: ko.PureComputed<{
        width: string;
        marginLeft: string;
    }>;
    verticalPosition: ko.Observable<ItemMenuPosition>;
    isLeft: ko.Observable<boolean>;
    isCollapsed: ko.Observable<boolean>;
    isCollapsedStateToggleVisible: ko.Observable<boolean>;
    _recalculatePosition: () => void;
    _recalculatePositionDebounced: (...args: any[]) => void;
    hideBindingProperties: () => void;
    hideBindingPanel: () => void;
    isSecondaryPanelVisible: ko.Observable<boolean>;
    __secondaryPanelVisibleTimeout: number;
    private _repaintHandlers;
    subscribeLayoutItemRepaintRequest(handler: any): void;
    unsubscribeLayoutItemRepaintRequest(handler: any): void;
    dispose(): void;
}
export declare class ItemMenuPositionCalculator {
    element: HTMLElement;
    layoutContainer: HTMLElement;
    private _isValidElement;
    constructor(element: HTMLElement);
    calculateIsLeft(): boolean;
    calculateVPosition(): ItemMenuPosition;
    calculateIsLeftAndInside(): boolean;
}
export declare type ItemMenuPosition = 'center' | 'top' | 'bottom';
