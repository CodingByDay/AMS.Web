﻿/**
* DevExpress Dashboard (_export-dialog-binder.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { Dashboard } from '../../model/dashboard';
import { DisposableObject } from '../../model/disposable-object';
import { DashboardItem } from '../../model/items/dashboard-item';
import { DashboardExcelExportOptions, DashboardImageExportOptions, DashboardPdfExportOptions } from '../../viewer-parts/export-options';
import { exportDialog } from '../../viewer-parts/widgets/dialogs/export/_export-dialog';
import { ClientExportOptions, ExportOptions } from '../../viewer-parts/_export-options';
import { ExportInfo, IDataServiceClient } from '../_service-client';
import { DashboardExportDialogArgs, DashboardExportFormat } from './export-extension';
export declare type ExportMode = 'SingleItem' | 'EntireDashboard';
export interface ExportModeInfo {
    mode: ExportMode;
    format: DashboardExportFormat;
    clientState: ClientExportState;
    fileName: string;
    name?: string;
    itemType?: string;
}
export interface ItemExportInfo {
    position?: JQuery.Coordinates;
    name: string;
    caption?: string;
}
export interface ClientExportState {
    clientSize: {
        width: number;
        height: number;
    };
    titleHeight: number;
    itemsState: ItemExportInfo[];
}
export interface IExportInfoProvider {
    getItemExportInfo(itemName: string, mode: ExportMode, isCaption: boolean): ItemExportInfo;
}
export declare class ExportDialogBinderOptions {
    dashboard: ko.Computed<Dashboard>;
    serviceClient: ko.Observable<IDataServiceClient>;
    getContainer: () => Element;
    exportInfoProvider: IExportInfoProvider;
    pdfExportOptions: DashboardPdfExportOptions;
    imageExportOptions: DashboardImageExportOptions;
    excelExportOptions: DashboardExcelExportOptions;
    onExportDialogShown: (args: DashboardExportDialogArgs) => void;
    onExportDialogShowing: (args: DashboardExportDialogArgs) => void;
    onExportDialogHidden: (args: DashboardExportDialogArgs) => void;
}
export declare class ExportDialogBinder {
    private _options;
    availableExportFormats: DashboardExportFormat[];
    exportOptions: ExportOptions;
    private _exportDialog;
    constructor(_options: ExportDialogBinderOptions);
    reset(): void;
    _getClientSize(container: HTMLElement, mode: ExportMode): {
        width: number;
        height: number;
    };
    _getActualComponentName(item: DashboardItem): string;
    _getExportHolderItem(item: DashboardItem): DashboardItem;
    _getInfo(items: Array<DashboardItem>, titleHeight: number, mode: ExportMode, format: DashboardExportFormat): ClientExportState;
    _getFilterFormattableValues(dashboard: Dashboard, exportGroupName: string, item: DashboardItem, exportInfo: ExportInfo): void | any[];
    exportDashboardTo(format: DashboardExportFormat, clientOptions: ClientExportOptions, customFileName?: any): void;
    exportDashboardItemTo(itemComponentName: string, format: DashboardExportFormat, clientOptions: ClientExportOptions, customFileName?: string): void;
    showDashboardDialog: (format: DashboardExportFormat) => void;
    showItemDialog: (itemComponentName: string, format: DashboardExportFormat) => void;
    hide: () => void;
    get exportDialog(): exportDialog;
    _getExportItemType(item: DashboardItem): string;
    private _getGroupExternalDisplayFilterValues;
    private _exportTo;
    _getExportDataQueryParams(dashboardItem: DashboardItem, modeInfo: ExportModeInfo): any;
    private _validateExportFormat;
    private _validateDashboardExport;
}
export declare class ExportInfoManager extends DisposableObject implements IExportInfoProvider {
    private _primaryExportInfoProviders;
    private _secondaryExportInfoProviders;
    private _captionExportInfoProviders;
    getItemExportInfo(itemName: string, mode: ExportMode, isCaption: boolean): ItemExportInfo;
    registerPrimaryExportItem(itemName: string, getExportInfoFunc: () => ItemExportInfo): void;
    unregisterPrimaryExportItem(itemName: string): void;
    registerSecondaryExportItem(itemName: string, getExportInfoFunc: () => ItemExportInfo): void;
    unregisterSecondaryExportItem(itemName: string): void;
    registerCaptionExportItem(itemName: string, getExportInfoFunc: () => ItemExportInfo): void;
    unregisterCaptionExportItem(itemName: string): void;
    dispose(): void;
}
