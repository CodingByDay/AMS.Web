﻿/**
* DevExpress Dashboard (options-panel-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceBrowser } from '../../common/_data-source-browser';
import { DashboardControl } from '../../common/dashboard-control';
import { ISupportOptionExtension } from '../../common/internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../../common/internal/_options-manager';
import { Dashboard } from '../../model/dashboard';
import { IDisposable } from '../../model/disposable-object';
import { DashboardItem } from '../../model/items/dashboard-item';
import { CustomizeSectionsEventArgs } from '../accordion-tab-options';
import { DashboardItemMenu } from '../items/_dashboard-item-menu';
export interface OptionsPanelExtensionOptions {
    onCustomizeSections?: (args: CustomizeSectionsEventArgs) => void;
}
export declare type OptionsPanelExtensionEvents = {
    customizeSections: CustomizeSectionsEventArgs;
};
export declare class OptionsPanelExtension implements ISupportOptionExtension<OptionsPanelExtensionOptions> {
    private dashboardControl;
    name: string;
    private _subscriptions;
    private _perMenuSubscriptions;
    private _customizeTabsHandlers;
    _optionsManager: OptionsManager<OptionsPanelExtensionOptions, OptionsPanelExtensionEvents>;
    on: EventSubscriber<OptionsPanelExtensionEvents>;
    off: EventSubscriber<OptionsPanelExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: OptionsPanelExtensionOptions);
    _contextMenuSubscriber(itemContextMenu: DashboardItemMenu): void;
    start(): void;
    stop(): void;
    _updateContextMenu(menu: DashboardItemMenu, item: DashboardItem, dashboard: Dashboard, dataSourceBrowser: DataSourceBrowser): void;
    _subscribeTabsChanged(handler: (tabs: any, dashboardItem: DashboardItem) => void): IDisposable;
}
