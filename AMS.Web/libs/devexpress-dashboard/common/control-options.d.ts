﻿/**
* DevExpress Dashboard (control-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import { Dashboard } from '../model/dashboard';
import { AjaxRemoteServiceOptions, FetchRemoteServiceOptions, IExtension } from './common-interfaces';
import { DashboardControl } from './dashboard-control';
export declare type ExtensionCreator = (dashboardControl: DashboardControl, extensionOptions?: {
    [index: string]: {};
}) => IExtension;
export declare type ExtensionDictionary = {
    [index: string]: ExtensionCreator;
};
export declare type ExtensionOptions = {
    [index: string]: Object | false | ExtensionCreator;
};
export declare var defaultExtensions: ExtensionDictionary;
export declare var designerExtensions: ExtensionDictionary;
export declare var extensionNameMap: {
    [key: string]: string;
};
export declare type WorkingMode = 'Designer' | 'Viewer' | 'ViewerOnly';
export declare type LimitVisibleDataMode = 'Designer' | 'DesignerAndViewer' | 'None';
export interface DashboardControlOptions {
    workingMode?: WorkingMode;
    initialDashboardId?: string;
    dashboardId?: string;
    initialDashboardState?: string;
    loadDefaultDashboard?: boolean;
    encodeHtml?: boolean;
    useNeutralFilterMode?: boolean;
    limitVisibleDataMode?: LimitVisibleDataMode;
    showConfirmationOnBrowserClosing?: boolean;
    resizeByTimer?: boolean;
    allowMaximizeItems?: boolean;
    endpoint?: string;
    ajaxRemoteService?: AjaxRemoteServiceOptions;
    fetchRemoteService?: FetchRemoteServiceOptions;
    onInitializing?: (args: DashboardControlArgs) => void;
    onBeforeRender?: (args: DashboardControlArgs) => void;
    onDashboardInitializing?: (args: DashboardInitializingArgs) => void;
    onDashboardInitialized?: (args: DashboardInitializedArgs) => void;
    onDashboardStateChanged?: (args: DashboardStateChangedArgs) => void;
    onItemBeginUpdate?: (args: DashboardItemUpdateArgs) => void;
    onItemEndUpdate?: (args: DashboardItemUpdateArgs) => void;
    onDashboardBeginUpdate?: (args: DashboardUpdateArgs) => void;
    onDashboardEndUpdate?: (args: DashboardUpdateArgs) => void;
    onOptionChanged?: (args: DashboardOptionChangedArgs<DashboardControlOptions>) => void;
    dataRequestOptions?: DataRequestOptions;
    useCardLegacyLayout?: boolean;
    extensions?: ExtensionOptions | false;
    nonce?: string;
}
export interface DashboardOptionChangedArgs<T> {
    name: keyof T;
    fullName: string;
    value: any;
}
export declare type DashboardControlEvents = {
    initializing: DashboardControlArgs;
    beforeRender: DashboardControlArgs;
    dashboardInitializing: DashboardInitializingArgs;
    dashboardInitialized: DashboardInitializedArgs;
    dashboardStateChanged: DashboardStateChangedArgs;
    itemBeginUpdate: DashboardItemUpdateArgs;
    itemEndUpdate: DashboardItemUpdateArgs;
    dashboardBeginUpdate: DashboardUpdateArgs;
    dashboardEndUpdate: DashboardUpdateArgs;
    optionChanged: DashboardOptionChangedArgs<DashboardControlOptions>;
};
export interface DataRequestOptions {
    itemDataRequestMode?: ItemDataRequestMode;
    itemDataLoadingMode?: ItemDataLoadingMode;
}
export declare type ItemDataLoadingMode = 'Always' | 'OnDemand';
export declare type ItemDataRequestMode = 'SeparateRequests' | 'BatchRequests';
export declare type RefreshItemsArgs = string | Array<string>;
export declare type DashboardControlArgs = {
    component: DashboardControl;
};
export declare type DashboardUpdateArgs = {
    component: DashboardControl;
    dashboardId: string;
};
export declare type DashboardItemUpdateArgs = {
    component: DashboardControl;
    dashboardId: string;
    itemName: string;
};
export declare type DashboardInitializedArgs = {
    component: DashboardControl;
    dashboardId: string;
    dashboard: Dashboard;
};
export declare type DashboardStateChangedArgs = {
    component: DashboardControl;
    dashboardId: string;
    dashboard: Dashboard;
    stateString: string;
};
export declare type DashboardInitializingArgs = {
    component: DashboardControl;
    dashboardId: string;
    dashboard: Dashboard;
    ready: JQueryPromise<any>;
};
