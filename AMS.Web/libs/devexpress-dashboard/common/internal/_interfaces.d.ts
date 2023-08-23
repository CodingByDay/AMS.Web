﻿/**
* DevExpress Dashboard (_interfaces.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import * as ko from 'knockout';
import { DashboardItem } from '../../model/items/dashboard-item';
import { Constraints, ISize } from '../../viewer-parts/layout/_utils.layout';
import { ErrorInfo, IExtension, KnockoutTemplate } from '../common-interfaces';
import { DashboardOptionChangedArgs } from '../control-options';
import { NotificationController } from '../notification-controller/notificator';
export declare var KeyCodes: {
    Esc: number;
    Delete: number;
    Z: number;
    Y: number;
    S: number;
};
export interface OptionConsumer<TOptions> {
    getDefaultOptions(): TOptions;
    getInitialOptions(): TOptions;
    optionChanged(args: DashboardOptionChangedArgs<TOptions>): DashboardControlActions;
}
export interface ISupportOptionExtension<TOptions> extends IExtension {
    _optionsManager: OptionConsumer<TOptions>;
}
export interface IErrorHandler {
    showError(title: string, errorInfo?: ErrorInfo): any;
}
export interface IDashboardUrls {
    GetDashboardsAction: string;
    DashboardAction: string;
}
export interface IDataSourceUrls {
    GetDataSourcesAction: string;
}
export interface IDataSourceWizardUrls {
    DataSourceWizardAction: string;
    GetConnectionStringsAction: string;
}
export interface IDataServiceUrls {
    ConvertItemAction: string;
    FieldListAction: string;
    ParameterValuesAction: string;
    DimensionUniqueValuesAction: string;
    DimensionFilterItemsAction: string;
    DimensionFilterStringAction: string;
    DashboardItemGetAction: string;
    PerformExportAction: string;
    GetColoringSchemeAction: string;
    GetDashboardPaletteAction: string;
    GetUnderlyingDataAction: string;
    GetMapShapeFileAction: string;
    MarkDataSourcesForReloadAction: string;
    DashboardItemBatchGetAction: string;
    GetAvailableFontFamiliesAction: string;
}
export interface IEndpointCollection {
    dashboardUrls?: IDashboardUrls;
    dataSourceUrls?: IDataSourceUrls;
    dataSourceWizardUrls?: IDataSourceWizardUrls;
    dataServiceUrls?: IDataServiceUrls;
}
export declare class SingleItemSizeController implements ISizeController {
    private _element;
    requestRepaint: any;
    private itemMargins;
    renderImmediately: boolean;
    constructor(_element: Element, requestRepaint: any, itemMargins?: number);
    getWidth(): number;
    getHeight(): number;
    setConstraints(constraints: {
        min: ISize;
        max: ISize;
    }): void;
}
export declare class SingleTabItemSizeController implements ISizeController {
    requestRepaint: any;
    width: ko.Observable<number>;
    height: ko.Observable<number>;
    renderImmediately: boolean;
    constructor(requestRepaint: any, width: ko.Observable<number>, height: ko.Observable<number>);
    getWidth(): number;
    getHeight(): number;
    setConstraints(constraints: {
        min: ISize;
        max: ISize;
    }): void;
}
export interface ISizeController {
    getWidth: () => number;
    getHeight: () => number;
    requestRepaint: JQueryCallback;
    renderImmediately?: boolean;
    setConstraints?: (constraints: Constraints) => void;
    visible?: ko.Subscribable<boolean>;
}
export interface DashboardLayoutController {
    fullscreenItemProvider: FullscreenItemProvider;
    visibleItemsProvider: VisibleItemsProvider;
    selectedDashboardItem: ko.Computed<DashboardItem>;
    emptyItemTemplates: ko.ObservableArray<KnockoutTemplate>;
    selectedLayoutItem: ko.Computed<ISizeController>;
    allowMaximizeItems: boolean;
}
export interface FullscreenItemProvider {
    maximizedItemName: string;
    maximizeItem(dashboardItem: DashboardItem): any;
    restoreDownItem(): any;
}
export interface VisibleItemsProvider {
    visibleItems: ko.Subscribable<DashboardItem[]>;
}
export interface LayoutInfoProvider {
    name: string;
    getViewModel: () => Object;
    getLayoutController: () => ko.Subscribable<DashboardLayoutController>;
    condition: () => boolean;
}
export interface DashboardControlViewModel {
    getWidgetContainer: () => HTMLElement;
    surfaceLeft: ko.Subscribable<number>;
    colorSchemeCss: string;
    isLoading: ko.Subscribable<boolean>;
    isDashboardLoaded: ko.Subscribable<boolean>;
    layoutTemplate: KnockoutTemplate;
    externalTemplates: ko.Subscribable<Array<KnockoutTemplate>>;
    emptyControlTemplates: ko.ObservableArray<KnockoutTemplate>;
    notificationController: NotificationController;
    $unwrap: (element: Element | JQuery) => Element;
    $: any;
    ko: any;
}
export declare type DashboardControlActions = 'updateItemToolbars' | 'updateDashboardToolbar' | 'refreshData' | 'reinitializeDashboard' | 'loadDashboard' | 'noop';
export declare type DashboardControlState = 'controlInitializing' | 'controlInitialized' | 'dashboardLoading' | 'dashboardLoaded' | 'dashboardInitializing' | 'dashboardInitialized';
