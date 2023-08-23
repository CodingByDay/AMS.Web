﻿/**
* DevExpress Dashboard (parameter-dialog-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { DxElement } from 'devextreme/core/element';
import dxPopup from 'devextreme/ui/popup';
import * as ko from 'knockout';
import { DisposableObject } from '../../model/disposable-object';
import { ParameterDialogContent } from '../../viewer-parts/widgets/dialogs/parameters-dialog-content';
import { DashboardControl } from '../dashboard-control';
import { ISupportOptionExtension } from '../internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../internal/_options-manager';
import { DashboardParameterCollection } from '../parameters-definitions';
export interface DashboardParameterDialogArgs {
    component?: dxPopup;
    element?: DxElement;
    model?: any;
}
export interface DynamicLookUpValuesLoadedArgs {
    parameterName: string;
}
export interface DashboardParameterDialogExtensionOptions {
    onDynamicLookUpValuesLoaded?: (args: DynamicLookUpValuesLoadedArgs) => void;
    onShowing?: (args: DashboardParameterDialogArgs) => any;
    onShown?: (args: DashboardParameterDialogArgs) => any;
    onHidden?: (args: DashboardParameterDialogArgs) => any;
}
export declare type DashboardParameterDialogExtensionEvents = {
    dynamicLookUpValuesLoaded: DynamicLookUpValuesLoadedArgs;
    showing: DashboardParameterDialogArgs;
    shown: DashboardParameterDialogArgs;
    hidden: DashboardParameterDialogArgs;
};
export declare class DashboardParameterDialogExtension extends DisposableObject implements ISupportOptionExtension<DashboardParameterDialogExtensionOptions> {
    private _parameterDialog;
    private _customDialogContent;
    private _viewModel;
    _optionsManager: OptionsManager<DashboardParameterDialogExtensionOptions, DashboardParameterDialogExtensionEvents>;
    name: string;
    _dashboardControl: DashboardControl;
    _onShowing: ((e: DashboardParameterDialogArgs) => any);
    _onShown: ((e: DashboardParameterDialogArgs) => any);
    _onHidden: ((e: DashboardParameterDialogArgs) => any);
    get onShowing(): ((e: DashboardParameterDialogArgs) => any);
    set onShowing(value: ((e: DashboardParameterDialogArgs) => any));
    get onShown(): ((e: DashboardParameterDialogArgs) => any);
    set onShown(value: ((e: DashboardParameterDialogArgs) => any));
    get onHidden(): ((e: DashboardParameterDialogArgs) => any);
    set onHidden(value: ((e: DashboardParameterDialogArgs) => any));
    showDialogButton: ko.Observable<boolean>;
    on: EventSubscriber<DashboardParameterDialogExtensionEvents>;
    off: EventSubscriber<DashboardParameterDialogExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: DashboardParameterDialogExtensionOptions);
    start(): void;
    stop(): void;
    show(): void;
    hide(): void;
    subscribeToContentChanges(callback: (newValue: DashboardParameterCollection) => void): ko.Subscription;
    getParameters(): DashboardParameterCollection;
    private _getParameters;
    renderContent(element: JQuery | Element): ParameterDialogContent;
    private _createParameterDialog;
    private _clearContent;
    private _clear;
    private _subscribeDynamicLookUpValuesLoaded;
    protected _updateViewModel: (dashboard: any) => void;
}
