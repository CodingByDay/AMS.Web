﻿/**
* DevExpress Dashboard (_toolbox-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { KeyEventType } from '../../common/common-interfaces';
import { LayoutDragController } from '../../common/docking-layout/drag-and-drop/_drag-controller';
import { ElementAccessorKoComponentArgs } from '../../common/internal/_ko-element-accessor';
import { DashboardMenuItem, DashboardToolbarGroup, DashboardToolboxGroup } from './toolbox-items';
export declare class ToolboxViewModel {
    private _defaultMenuItemData;
    private _menuItems;
    private _toolboxGroups;
    private _toolbarGroups;
    private _layoutDragController;
    constructor(menuVisible: boolean, _defaultMenuItemData: any, _menuItems: ko.ObservableArray<DashboardMenuItem>, _toolboxGroups: ko.ObservableArray<DashboardToolboxGroup>, _toolbarGroups: ko.ObservableArray<DashboardToolbarGroup>, _layoutDragController: ko.Subscribable<LayoutDragController>);
    initDragEvents(itemType: any): ElementAccessorKoComponentArgs;
    processKeyEvent(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
    showDesignerPanel(): void;
    hideDesignerPanel(): void;
    toolbarHeight: ko.Observable<number>;
    designerPanelLeft: ko.Observable<number>;
    menuItemsSorted: ko.Computed<Array<DashboardMenuItem>>;
    toolboxGroupsSorted: ko.Computed<Array<DashboardToolboxGroup>>;
    toolbarGroupsSorted: ko.Computed<Array<DashboardToolbarGroup>>;
    settingsForm: ko.Observable<any>;
    settingsFormVisible: ko.Computed<boolean>;
    toggleMenu: () => void;
    closeMenu: () => void;
    showMenu: () => void;
    menuItemClick: (menuItem: DashboardMenuItem) => void;
    menuVisible: ko.Observable<boolean>;
}
