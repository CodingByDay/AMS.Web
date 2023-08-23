﻿/**
* DevExpress Dashboard (_data-inspector-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import CustomStore from 'devextreme/data/custom_store';
import { Column as dxDataGridColumn } from 'devextreme/ui/data_grid';
import * as ko from 'knockout';
import { DataDashboardItem } from '../../../model';
import { IUnderlyingDataProvider } from '../../data/_underlying-data-provider';
import { DataInspectorDialogArgs, DataInspectorGridArgs, InspectedType } from './data-inspector-extension';
import { AggregatedDataSourceArgs } from './_aggregated-data-source';
export interface GridDataSourceInfo {
    columns: dxDataGridColumn[];
    data: CustomStore | Array<Object>;
    customizeColumns: (columns: Array<dxDataGridColumn>) => void;
}
export declare class DataInspectorViewModelOptions {
    getContainer?: () => HTMLElement;
    onGridContentReady?: (e: DataInspectorGridArgs) => void;
    onGridInitialized?: (e: DataInspectorGridArgs) => void;
    onDialogShowing?: (args: DataInspectorDialogArgs) => void;
    onDialogShown?: (args: DataInspectorDialogArgs) => void;
    onDialogHidden?: (args: DataInspectorDialogArgs) => void;
}
export declare class DataInspectorViewModel {
    options: DataInspectorViewModelOptions;
    _dashboardItem: ko.Observable<DataDashboardItem>;
    _rawDataSource: GridDataSourceInfo;
    _aggregatedDataSource: GridDataSourceInfo;
    readonly avaliableInspectedDataType: Array<{
        value: InspectedType;
        text: string;
    }>;
    allowSwitchInspectedDataType: ko.Observable<boolean>;
    inspectedDataType: ko.Observable<InspectedType>;
    title: ko.Computed<string>;
    visible: ko.Observable<boolean>;
    container: ko.Observable<HTMLElement>;
    underlyingDataProvider: IUnderlyingDataProvider;
    gridDataSource: ko.Observable<GridDataSourceInfo>;
    gridOptions: ko.Computed<Object>;
    closeButtonStylingMode: string;
    closeButtonType: string;
    constructor(options: DataInspectorViewModelOptions);
    setUnderlyingDataProvider(underlyingDataProvider?: IUnderlyingDataProvider): void;
    _bindGrid(): void;
    _clearDataSource(): void;
    _getInitialMode(allowInspectAggregatedData: boolean, allowInspectRawData: boolean, initialMode: InspectedType, prevMode: InspectedType): InspectedType;
    _getRawDataSource(dashbordItem: DataDashboardItem): GridDataSourceInfo;
    _getAggregatedDataSource(dashbordItem: DataDashboardItem): GridDataSourceInfo;
    _getAggregatedDataSourceArgs(dashboardItem: DataDashboardItem): AggregatedDataSourceArgs;
    _getPopupOptions(): {
        container: ko.Observable<HTMLElement>;
        title: ko.Computed<string>;
        onShowing: (args: DataInspectorDialogArgs) => void;
        onShown: (args: DataInspectorDialogArgs) => void;
        onHidden: (args: DataInspectorDialogArgs) => void;
        visible: ko.Observable<boolean>;
        fullScreen: boolean;
        height: string;
        position: {
            my: string;
            at: string;
            of: (Window & typeof globalThis) | ko.Observable<HTMLElement>;
        };
        toolbarItems: {
            toolbar: string;
            location: string;
            widget: string;
            options: {
                text: any;
                onClick: () => any;
                stylingMode: string;
                type: string;
            };
        }[];
        wrapperAttr: {
            class: string;
        };
        showCloseButton: boolean;
    };
    get isMobile(): boolean;
    show(dashboardItem: DataDashboardItem, allowInspectAggregatedData: boolean, allowInspectRawData: boolean, initialMode?: InspectedType): void;
}
