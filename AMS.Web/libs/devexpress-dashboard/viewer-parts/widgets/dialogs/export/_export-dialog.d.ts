﻿/**
* DevExpress Dashboard (_export-dialog.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardExportDialogArgs, DashboardExportFormat } from '../../../../common/extensions/export-extension';
import { IExportOptions } from '../../../_export-options';
import { ViewerItemType } from '../../../_viewer-item-types';
import { dialogForm } from '../_dialog-form';
import { exportOptionsCache } from './_export-options-cache';
import { boundImageItemOptionsGroup, cardOptionsGroup, chartOptionsGroup, customItemOptionsGroup, dashboardExcelOptionsGroup, dashboardImageOptionsGroup, entireDashboardOptionsGroup, excelOptionsGroup, gaugeOptionsGroup, gridOptionsGroup, groupItemOptionsGroup, imageItemOptionsGroup, imageOptionsGroup, mapOptionsGroup, optionsGroup, pieOptionsGroup, pivotOptionsGroup, rangeFilterOptionsGroup, simplyImageOptionsGroup, textItemOptionsGroup, treemapOptionsGroup } from './_export-options-groups';
export declare class exportDialog {
    options: ExportDialogOptions;
    exportOptionsCache: exportOptionsCache;
    dialogForm: dialogForm;
    group: optionsGroup;
    exportFunction: {
        (exportOptions: IExportOptions): void;
    };
    dashboardItemName: string;
    dashboardItemType: ViewerItemType;
    format: DashboardExportFormat;
    defaultTitle: string;
    defaultFileName: string;
    constructor(options: ExportDialogOptions);
    _initialize(): void;
    showDialog(dashboardItemName: string, dashboardItemType: ViewerItemType, format: DashboardExportFormat, options: {
        defaultTitle: string;
        defaultFileName: string;
    }): void;
    hideDialog(): void;
    dispose(): void;
    private _getLocalizedTitle;
    setExportFunction(exportFunction: {
        (exportOptions: IExportOptions): void;
    }): void;
    _createImageGroup(dashboardItemType: ViewerItemType, documentInfo: IExportOptions): imageOptionsGroup | simplyImageOptionsGroup | dashboardImageOptionsGroup;
    _createExcelGroup(dashboardItemType: ViewerItemType, documentInfo: IExportOptions): dashboardExcelOptionsGroup | excelOptionsGroup;
    _createPdfGroup(dashboardItemType: ViewerItemType, documentInfo: IExportOptions): textItemOptionsGroup | boundImageItemOptionsGroup | imageItemOptionsGroup | groupItemOptionsGroup | customItemOptionsGroup | entireDashboardOptionsGroup | gridOptionsGroup | pivotOptionsGroup | chartOptionsGroup | mapOptionsGroup | treemapOptionsGroup | rangeFilterOptionsGroup | pieOptionsGroup | gaugeOptionsGroup | cardOptionsGroup;
    _createGroup(): void;
    static _initializeExportLocalizedStrings(): void;
}
export interface ExportDialogOptions {
    container: Element;
    defaultDocumentInfo: IExportOptions;
    fullScreenMode?: boolean;
    onShown?: (args: DashboardExportDialogArgs) => void;
    onShowing?: (args: DashboardExportDialogArgs) => void;
    onHidden?: (args: DashboardExportDialogArgs) => void;
}
