﻿/**
* DevExpress Dashboard (toolbar-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { KnockoutTemplate, SequenceAction } from '../../common/common-interfaces';
import { DashboardControl } from '../../common/dashboard-control';
import { ISupportOptionExtension } from '../../common/internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../../common/internal/_options-manager';
import { Dashboard } from '../../model/dashboard';
import { DisposableObject } from '../../model/disposable-object';
import { DefaultDesignerToolbarItem } from './_toolbar-extension';
import { DesignerToolbarItem } from './toolbar-extension-common';
export interface DesignerToolbarExtensionOptions {
    onPreparing?: (args: DesignerToolbarArgs) => void;
    items?: Array<DesignerToolbarItem | string>;
}
export interface DesignerToolbarArgs {
    component: DashboardControl;
    dashboard: Dashboard;
    items: Array<DesignerToolbarItem | string>;
}
export declare type DesignerToolbarExtensionEvents = {
    preparing: DesignerToolbarArgs;
};
export declare class DesignerToolbarExtension extends DisposableObject implements ISupportOptionExtension<DesignerToolbarExtensionOptions> {
    private _viewModel;
    private _dashboardControl;
    private _defaultItems;
    private _predefinedItems;
    name: string;
    template: KnockoutTemplate;
    designerToViewerAction: SequenceAction;
    viewerToDesignerAction: SequenceAction;
    _optionsManager: OptionsManager<DesignerToolbarExtensionOptions, DesignerToolbarExtensionEvents>;
    on: EventSubscriber<DesignerToolbarExtensionEvents>;
    off: EventSubscriber<DesignerToolbarExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: DesignerToolbarExtensionOptions);
    private _extensionChangeSubscription;
    start(): void;
    stop(): void;
    private _unsubscribe;
    private _showPanelAsync;
    private _hidePanelAsync;
    _registerDefaultItems(defaultItems: DefaultDesignerToolbarItem[]): void;
    _unregisterDefaultItems(defaultItems: DefaultDesignerToolbarItem[]): void;
    _registerPredefinedItems(predefinedItems: DesignerToolbarItem[]): void;
    _unregisterPredefinedItems(predefinedItems: DesignerToolbarItem[]): void;
    _update(): void;
    dispose(): void;
}
