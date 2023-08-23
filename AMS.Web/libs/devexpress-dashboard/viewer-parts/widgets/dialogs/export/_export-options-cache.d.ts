﻿/**
* DevExpress Dashboard (_export-options-cache.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExportOptions } from '../../../_export-options';
export declare let optionName: {
    pdfTitle: string;
    imageTitle: string;
    fileName: string;
    autoFitPageCount: string;
    cardAutoArrangeContent: string;
    chartAutomaticPageLayout: string;
    chartSizeMode: string;
    pdfDashboardStatePosition: string;
    gaugeAutoArrangeContent: string;
    gridFitToPageWidth: string;
    gridPrintHeadersOnEveryPage: string;
    mapAutomaticPageLayout: string;
    mapSizeMode: string;
    pageLayout: string;
    paperKind: string;
    pieAutoArrangeContent: string;
    pivotPrintHeadersOnEveryPage: string;
    rangeFilterAutomaticPageLayout: string;
    rangeFilterSizeMode: string;
    pdfScaleFactor: string;
    scaleMode: string;
    dashboardAutomaticPageLayout: string;
    pdfShowTitle: string;
    treemapAutomaticPageLayout: string;
    treemapSizeMode: string;
    imageFormat: string;
    resolution: string;
    imageScaleFactor: string;
    imageShowTitle: string;
    csvValueSeparator: string;
    excelDashboardStatePosition: string;
    excelFormat: string;
    pdfExportFilters: string;
    imageExportFilters: string;
    excelExportFilters: string;
    pdfExportParameters: string;
    imageExportParameters: string;
    excelExportParameters: string;
    pdfIncludeHiddenParameters: string;
    imageIncludeHiddenParameters: string;
    excelIncludeHiddenParameters: string;
    fontInfo: string;
};
declare type optionNames = typeof optionName[keyof typeof optionName];
export declare class exportOptionsCache {
    documentOptions: {
        [T in optionNames]?: any;
    };
    itemsOptions: {
        [dashboardItemName: string]: {
            [T in optionNames]?: any;
        };
    };
    pdfOptions: {
        [T in optionNames]?: any;
    };
    imageOptions: {
        [T in optionNames]?: any;
    };
    excelOptions: {
        [T in optionNames]?: any;
    };
    constructor();
    _initialize(): void;
    _addOption<T>(cache: T, key: keyof T, defaultValue: T[keyof T], actualValue: T[keyof T]): void;
    add(dashboardItemName: string, defaultDocumentInfo: IExportOptions, actualDocumentInfo: IExportOptions): void;
    _setActualValue<T>(cache: T, key: keyof T, setActual: {
        (actual: any): void;
    }, defaultValue: T[keyof T]): void;
    getActualDocumentInfo(dashboardItemName: string, defaultDocumentInfo: IExportOptions): IExportOptions;
}
export {};
