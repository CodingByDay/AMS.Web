﻿/**
* DevExpress Dashboard (binding-panel.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardControl } from '../../common/dashboard-control';
import { ISupportOptionExtension } from '../../common/internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../../common/internal/_options-manager';
import { CustomizeDataItemContainerSectionsEventArgs } from '../accordion-tab-options';
export interface BindingPanelExtensionOptions {
    onCustomizeDataItemContainerSections?: (args: CustomizeDataItemContainerSectionsEventArgs) => void;
}
export declare type BindingPanelExtensionEvents = {
    customizeDataItemContainerSections: CustomizeDataItemContainerSectionsEventArgs;
};
export declare class BindingPanelExtension implements ISupportOptionExtension<BindingPanelExtensionOptions> {
    private dashboardControl;
    name: string;
    private _subscriptions;
    _optionsManager: OptionsManager<BindingPanelExtensionOptions, BindingPanelExtensionEvents>;
    on: EventSubscriber<BindingPanelExtensionEvents>;
    off: EventSubscriber<BindingPanelExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: BindingPanelExtensionOptions);
    private _contextMenuSubscriber;
    private _updateEmptyItemTemplate;
    private _updateDashboardItemMenu;
    start(): void;
    stop(): void;
}
