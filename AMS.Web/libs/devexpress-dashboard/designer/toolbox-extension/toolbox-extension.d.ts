﻿/**
* DevExpress Dashboard (toolbox-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { CancellationToken } from '../../common/_helpers';
import { IExtension, KeyEventType, KnockoutTemplate, SequenceAction, WorkingModeSwitchingOptions } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { LayoutItem } from '../../common/docking-layout/core/_layout-item';
import { DisposableObject } from '../../model/disposable-object';
import { ToolboxViewModel } from './_toolbox-view-model';
import { DashboardMenuItem, DashboardToolbarGroup, DashboardToolbarItem, DashboardToolboxGroup, DashboardToolboxItem } from './toolbox-items';
export declare class ToolboxExtension extends DisposableObject implements IExtension {
    private dashboardControl;
    name: string;
    template: KnockoutTemplate;
    designerToViewerAction: SequenceAction;
    viewerToDesignerAction: SequenceAction;
    _viewModel: ToolboxViewModel;
    private _switchToViewerToolbar;
    get menuVisible(): ko.Observable<boolean>;
    menuItems: ko.ObservableArray<DashboardMenuItem>;
    addMenuItem: (menuItem: DashboardMenuItem) => void;
    removeMenuItem: (menuItemId: string) => void;
    selectMenuItem: (menuItem: DashboardMenuItem) => void;
    toolboxGroups: ko.ObservableArray<DashboardToolboxGroup>;
    addToolboxItem: (groupName: string, toolboxItem: DashboardToolboxItem) => void;
    removeToolboxItem: (groupName: string, toolboxItemName: string) => void;
    toolbarGroups: ko.ObservableArray<DashboardToolbarGroup>;
    addToolbarItem: (groupName: string, toolbarItem: DashboardToolbarItem) => void;
    removeToolbarItem: (groupName: string, toolbarItemName: string) => void;
    openMenu(): void;
    closeMenu(): void;
    showPanelAsync: (options: WorkingModeSwitchingOptions) => JQueryPromise<{}>;
    _showPanelAsync: (options: WorkingModeSwitchingOptions, cancellationToken: CancellationToken) => JQueryPromise<WorkingModeSwitchingOptions>;
    hidePanelAsync: (options: WorkingModeSwitchingOptions) => JQueryPromise<{}>;
    _hidePanelAsync: (options: WorkingModeSwitchingOptions, cancellationToken: CancellationToken) => JQueryPromise<WorkingModeSwitchingOptions>;
    processKeyEvent(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
    constructor(dashboardControl: DashboardControl);
    start(): void;
    stop(): void;
    _layoutItemPlaceholderService: (layoutItem: LayoutItem) => KnockoutTemplate;
    private _registerCustomItemToolbox;
    private _createDefaultGroups;
    private _registerToolboxItem;
    private _unregisterToolboxItem;
    private _findToolboxGroup;
    private _findMenuItem;
}
