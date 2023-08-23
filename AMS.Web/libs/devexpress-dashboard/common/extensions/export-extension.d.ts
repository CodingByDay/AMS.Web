﻿/**
* DevExpress Dashboard (export-extension.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DxElement } from 'devextreme/core/element';
import dxPopup from 'devextreme/ui/popup';
import { ExportOptions, IExportOptions } from '../../viewer-parts/_export-options';
import { DashboardExcelExportOptions, DashboardImageExportOptions, DashboardPdfExportOptions } from '../../viewer-parts/export-options';
import { DashboardOptionChangedArgs } from '../control-options';
import { DashboardControl } from '../dashboard-control';
import { DashboardControlActions, ISupportOptionExtension } from '../internal/_interfaces';
import { EventSubscriber, OptionsManager } from '../internal/_options-manager';
import { IDashboardItemContext } from '../viewer/_viewer-interfaces';
import { ExportDialogBinder } from './_export-dialog-binder';
export interface DashboardExportDialogArgs {
    component: dxPopup;
    element: DxElement;
}
export interface DashboardExportExtensionOptions {
    allowExportDashboard?: boolean;
    allowExportDashboardItems?: boolean;
    pdfExportOptions?: DashboardPdfExportOptions;
    imageExportOptions?: DashboardImageExportOptions;
    excelExportOptions?: DashboardExcelExportOptions;
    onExportDialogShowing?: (args: DashboardExportDialogArgs) => void;
    onExportDialogShown?: (args: DashboardExportDialogArgs) => void;
    onExportDialogHidden?: (args: DashboardExportDialogArgs) => void;
}
export declare type DashboardExportExtensionEvents = {
    exportDialogShowing: DashboardExportDialogArgs;
    exportDialogShown: DashboardExportDialogArgs;
    exportDialogHidden: DashboardExportDialogArgs;
};
export declare type DashboardExportFormat = 'PDF' | 'Image' | 'Excel';
export declare class DashboardExportExtension implements ISupportOptionExtension<DashboardExportExtensionOptions> {
    private dashboardControl;
    private _dialogBinderSubscription;
    private _exportInfoContoller;
    get allowExportDashboard(): any;
    set allowExportDashboard(value: any);
    get allowExportDashboardItems(): any;
    set allowExportDashboardItems(value: any);
    name: string;
    _optionsManager: OptionsManager<DashboardExportExtensionOptions, DashboardExportExtensionEvents>;
    _dialogBinder: ExportDialogBinder;
    private _initializeExportButton;
    _initializePrimaryExportItem(localContext: IDashboardItemContext): void;
    _initializeSecondaryExportItem(localContext: IDashboardItemContext): void;
    on: EventSubscriber<DashboardExportExtensionEvents>;
    off: EventSubscriber<DashboardExportExtensionEvents>;
    constructor(dashboardControl: DashboardControl, options?: DashboardExportExtensionOptions);
    _optionChanged(args: DashboardOptionChangedArgs<DashboardExportExtensionOptions>): DashboardControlActions;
    start(): void;
    stop(): void;
    showExportDashboardDialog(format: DashboardExportFormat): void;
    showExportDashboardItemDialog(itemComponentName: string, format: DashboardExportFormat): void;
    hideExportDialog(): void;
    getPdfExportOptions(): DashboardPdfExportOptions;
    getImageExportOptions(): DashboardImageExportOptions;
    getExcelExportOptions(): DashboardExcelExportOptions;
    setPdfExportOptions(options: DashboardPdfExportOptions): void;
    setImageExportOptions(options: DashboardImageExportOptions): void;
    setExcelExportOptions(options: DashboardExcelExportOptions): void;
    exportToPdf(options?: DashboardPdfExportOptions, fileName?: string): void;
    exportToImage(options?: DashboardImageExportOptions, fileName?: string): void;
    exportToExcel(options?: DashboardExcelExportOptions, fileName?: string): void;
    exportDashboardItemToPdf(itemName: string, options?: DashboardPdfExportOptions, fileName?: string): void;
    exportDashboardItemToImage(itemName: string, options?: DashboardImageExportOptions, fileName?: string): void;
    exportDashboardItemToExcel(itemName: string, options?: DashboardExcelExportOptions, fileName?: string): void;
    _getExportOptions(): ExportOptions;
    _setExportOptions(exportOptions: IExportOptions): void;
}
