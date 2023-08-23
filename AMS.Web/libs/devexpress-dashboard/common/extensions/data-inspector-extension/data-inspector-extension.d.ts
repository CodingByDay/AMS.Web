﻿/**
* DevExpress Dashboard (data-inspector-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import dxDataGrid from 'devextreme/ui/data_grid';
import dxPopup from 'devextreme/ui/popup';
import { DashboardItem } from '../../../model';
import { DisposableObject } from '../../../model/disposable-object';
import { DashboardItemCaptionToolbarOptions } from '../../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options';
import { DashboardOptionChangedArgs } from '../../control-options';
import { DashboardControl } from '../../dashboard-control';
import { DashboardControlActions, ISupportOptionExtension } from '../../internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../../internal/_options-manager';
export declare type InspectedType = 'Aggregated' | 'Raw';
export interface DataInspectorDialogArgs {
    component: dxPopup;
    element: DxElement;
}
export interface DataInspectorGridArgs {
    component: dxDataGrid;
    element: DxElement;
}
export interface DataInspectorExtensionOptions {
    allowInspectAggregatedData?: boolean;
    allowInspectRawData?: boolean;
    onDialogShowing?: (args: DataInspectorDialogArgs) => void;
    onDialogShown?: (args: DataInspectorDialogArgs) => void;
    onDialogHidden?: (args: DataInspectorDialogArgs) => void;
    onGridInitialized?: (args: DataInspectorGridArgs) => void;
    onGridContentReady?: (args: DataInspectorGridArgs) => void;
}
export declare type DataInspectorExtensionEvents = {
    dialogShowing: DataInspectorDialogArgs;
    dialogShown: DataInspectorDialogArgs;
    dialogHidden: DataInspectorDialogArgs;
    gridInitialized: DataInspectorGridArgs;
    gridContentReady: DataInspectorGridArgs;
};
export declare class DataInspectorExtension extends DisposableObject implements ISupportOptionExtension<DataInspectorExtensionOptions> {
    private _dashboardControl;
    private readonly _viewModel;
    private readonly _customTemplate;
    _optionsManager: OptionsManager<DataInspectorExtensionOptions, DataInspectorExtensionEvents>;
    private _defaultOptions;
    name: string;
    on: EventSubscriber<DataInspectorExtensionEvents>;
    off: EventSubscriber<DataInspectorExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: DataInspectorExtensionOptions);
    _optionChanged(args: DashboardOptionChangedArgs<DataInspectorExtensionOptions>): DashboardControlActions;
    _addContextToolbarItem: (toolbarOptions: DashboardItemCaptionToolbarOptions, dashboardItem: DashboardItem) => void;
    start(): void;
    stop(): void;
    showDataInspector(dashboardItemName: string, inspectedType?: InspectedType): void;
    currentInspectedType(): InspectedType;
    hideDataInspector(): void;
}
