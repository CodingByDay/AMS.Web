﻿/**
* DevExpress Dashboard (_export-options.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DashboardExportFormat } from '../common';
import { DashboardChartExportSizeMode, DashboardExcelExportOptions, DashboardExcelFormat, DashboardExportImageFormat, DashboardExportPageLayout, DashboardExportPaperKind, DashboardImageExportOptions, DashboardMapSizeMode, DashboardPdfExportOptions, DashboardRangeFilterExportSizeMode, DashboardTreemapExportSizeMode } from './export-options';
export declare type DashboardExportScaleMode = 'None' | 'UseScaleFactor' | 'AutoFitToPageWidth' | 'AutoFitWithinOnePage';
export declare type DashboardFilterState = 'Below' | 'SeparatePage' | 'None';
export interface ASPxClientDashboardExportOptions {
    PaperKind?: DashboardExportPaperKind | string;
    PageLayout?: DashboardExportPageLayout;
    ScaleMode?: DashboardExportScaleMode;
    ScaleFactor?: number;
    AutoFitPageCount?: number;
    Title?: string;
    ShowTitle?: boolean;
    FilterState?: DashboardFilterState;
    ImageOptions?: ImageFormatOptions;
    ExcelOptions?: ExcelFormatOptions;
    GridOptions?: GridExportOptions;
    PivotOptions?: PivotExportOptions;
    PieOptions?: PieExportOptions;
    GaugeOptions?: GaugeExportOptions;
    CardOptions?: CardExportOptions;
    RangeFilterOptions?: RangeFilterExportOptions;
    ChartOptions?: ChartExportOptions;
    MapOptions?: MapExportOptions;
    TreemapOptions?: TreemapExportOptions;
}
export interface MapExportOptions {
    AutomaticPageLayout?: boolean;
    SizeMode?: DashboardMapSizeMode;
}
export interface GridExportOptions {
    FitToPageWidth?: boolean;
    PrintHeadersOnEveryPage?: boolean;
}
export interface PivotExportOptions {
    PrintHeadersOnEveryPage?: boolean;
}
export interface PieExportOptions {
    AutoArrangeContent?: boolean;
}
export interface GaugeExportOptions {
    AutoArrangeContent?: boolean;
}
export interface CardExportOptions {
    AutoArrangeContent?: boolean;
}
export interface RangeFilterExportOptions {
    AutomaticPageLayout?: boolean;
    SizeMode?: DashboardRangeFilterExportSizeMode;
}
export interface ChartExportOptions {
    AutomaticPageLayout?: boolean;
    SizeMode?: DashboardChartExportSizeMode;
}
export interface ExcelFormatOptions {
    Format?: DashboardExcelFormat;
    CsvValueSeparator?: string;
    FilterState?: 'Below' | 'SeparateSheet' | 'None';
}
export interface ImageFormatOptions {
    Format?: DashboardExportImageFormat;
    Resolution?: number;
}
export interface TreemapExportOptions {
    SizeMode?: DashboardTreemapExportSizeMode;
    AutomaticPageLayout?: boolean;
}
export declare let dashboardExportPaperKind: {
    letter: string;
    legal: string;
    executive: string;
    a5: string;
    a4: string;
    a3: string;
};
export declare let dashboardExportPageLayout: {
    auto: string;
    portrait: string;
    landscape: string;
};
export declare let dashboardExportScaleMode: {
    none: string;
    useScaleFactor: string;
    autoFitToPageWidth: string;
    autoFitWithinOnePage: string;
};
export declare let dashboardExportDocumentScaleMode: {
    none: string;
    useScaleFactor: string;
    autoFitToPagesWidth: string;
};
export declare let exportFormats: {
    [name: string]: DashboardExportFormat;
};
export declare let dashboardExportFilterState: {
    none: string;
    after: string;
    afterAndSplitPage: string;
};
export declare let excelExportFilterState: {
    none: string;
    below: string;
    separateSheet: string;
};
export declare let dashboardExportImageFormat: {
    png: string;
    gif: string;
    jpg: string;
};
export declare let dashboardExportExcelFormat: {
    csv: string;
    xls: string;
    xlsx: string;
};
export declare let dashboardExportSizeMode: {
    none: string;
    stretch: string;
    zoom: string;
};
export declare let dashboardStateExportPosition: {
    below: string;
    separatePage: string;
};
export declare let dashboardStateExcelExportPosition: {
    below: string;
    separateSheet: string;
};
export interface IExportOptions {
    pdfExportOptions: DashboardPdfExportOptions;
    imageExportOptions: DashboardImageExportOptions;
    excelExportOptions: DashboardExcelExportOptions;
    fileName?: string;
}
export declare type ClientExportOptions = (IExportOptions | DashboardPdfExportOptions | DashboardImageExportOptions | DashboardExcelExportOptions | ASPxClientDashboardExportOptions) & {
    fileName?: string;
};
export declare class ExportOptions implements IExportOptions {
    static DefaultTitle: string;
    static DefaultFileName: string;
    pdfExportOptions: DashboardPdfExportOptions;
    imageExportOptions: DashboardImageExportOptions;
    excelExportOptions: DashboardExcelExportOptions;
    constructor();
    convertToExportOptions(clientOptions: ClientExportOptions): IExportOptions;
    convertToASPxClientDashboardExportOptions(): ASPxClientDashboardExportOptions;
    setExcelOptions(options: DashboardExcelExportOptions): void;
    setImageOptions(options: DashboardImageExportOptions): void;
    setPdfOptions(options: DashboardPdfExportOptions): void;
    setOptions(options: IExportOptions): void;
    _getPdfDashboardStatePosition(clientOptions: any, currentValue: any): any;
    _getExcelDashboardStatePosition(clientOptions: any, currentValue: any): any;
    _getImageFormat(clientOptions: any, currentValue: any): any;
    _getExcelFormat(clientOptions: any, currentValue: any): any;
    _getDefinedValue(oldOptions: any, oldProperty: any, newValue: any, currentValue: any): any;
    _getExportFilters(clientOptions: any, currentValue: any): any;
    _getDashboardAutomaticPageLayout(clientOptions: any, currentValue: any): any;
    _convertDocumentScaleModeToScaleMode(documentScaleMode: any, dashboardAutomaticPageLayout: any): string;
    _convertScaleModeToDocumentScaleMode(scaleMode: any): string;
    _getPdfFilterState(): DashboardFilterState;
    _getExcelFilterState(): 'Below' | 'SeparateSheet' | 'None';
    _correctImageFormat(imageFormat: any): any;
}
