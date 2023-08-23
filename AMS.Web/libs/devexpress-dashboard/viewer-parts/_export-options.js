﻿/**
* DevExpress Dashboard (_export-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportOptions = exports.dashboardStateExcelExportPosition = exports.dashboardStateExportPosition = exports.dashboardExportSizeMode = exports.dashboardExportExcelFormat = exports.dashboardExportImageFormat = exports.excelExportFilterState = exports.dashboardExportFilterState = exports.exportFormats = exports.dashboardExportDocumentScaleMode = exports.dashboardExportScaleMode = exports.dashboardExportPageLayout = exports.dashboardExportPaperKind = void 0;
const _utils_1 = require("../data/_utils");
exports.dashboardExportPaperKind = {
    letter: 'Letter',
    legal: 'Legal',
    executive: 'Executive',
    a5: 'A5',
    a4: 'A4',
    a3: 'A3'
};
exports.dashboardExportPageLayout = {
    auto: 'Auto',
    portrait: 'Portrait',
    landscape: 'Landscape'
};
exports.dashboardExportScaleMode = {
    none: 'None',
    useScaleFactor: 'UseScaleFactor',
    autoFitToPageWidth: 'AutoFitToPageWidth',
    autoFitWithinOnePage: 'AutoFitWithinOnePage'
};
exports.dashboardExportDocumentScaleMode = {
    none: 'None',
    useScaleFactor: 'UseScaleFactor',
    autoFitToPagesWidth: 'AutoFitToPagesWidth',
};
exports.exportFormats = {
    pdf: 'PDF',
    image: 'Image',
    excel: 'Excel'
};
exports.dashboardExportFilterState = {
    none: 'None',
    after: 'Below',
    afterAndSplitPage: 'SeparatePage',
};
exports.excelExportFilterState = {
    none: 'None',
    below: 'Below',
    separateSheet: 'SeparateSheet'
};
exports.dashboardExportImageFormat = {
    png: 'Png',
    gif: 'Gif',
    jpg: 'Jpg'
};
exports.dashboardExportExcelFormat = {
    csv: 'Csv',
    xls: 'Xls',
    xlsx: 'Xlsx'
};
exports.dashboardExportSizeMode = {
    none: 'None',
    stretch: 'Stretch',
    zoom: 'Zoom'
};
exports.dashboardStateExportPosition = {
    below: 'Below',
    separatePage: 'SeparatePage'
};
exports.dashboardStateExcelExportPosition = {
    below: 'Below',
    separateSheet: 'SeparateSheet'
};
class ExportOptions {
    constructor() {
        let defaultFontInfoName = undefined;
        let defaultGdiCharSet = 0;
        let defaultUseCustomFontInfo = false;
        this.pdfExportOptions = {
            Title: ExportOptions.DefaultTitle,
            AutoFitPageCount: 1,
            CardAutoArrangeContent: true,
            ChartAutomaticPageLayout: true,
            ChartSizeMode: 'Zoom',
            ExportFilters: false,
            ExportParameters: false,
            DashboardStatePosition: 'Below',
            GaugeAutoArrangeContent: true,
            GridFitToPageWidth: true,
            GridPrintHeadersOnEveryPage: true,
            MapAutomaticPageLayout: true,
            MapSizeMode: 'Zoom',
            PageLayout: 'Portrait',
            PaperKind: 'Letter',
            PieAutoArrangeContent: true,
            PivotPrintHeadersOnEveryPage: true,
            RangeFilterAutomaticPageLayout: true,
            RangeFilterSizeMode: 'Stretch',
            ScaleFactor: 1.0,
            DocumentScaleMode: 'None',
            DashboardAutomaticPageLayout: true,
            ShowTitle: true,
            TreemapAutomaticPageLayout: true,
            TreemapSizeMode: 'Zoom',
            IncludeHiddenParameters: false,
            FontInfo: {
                Name: defaultFontInfoName,
                GdiCharSet: defaultGdiCharSet,
                UseCustomFontInfo: defaultUseCustomFontInfo
            }
        };
        this.imageExportOptions = {
            Title: ExportOptions.DefaultTitle,
            Format: 'Png',
            Resolution: 96,
            ExportFilters: false,
            ExportParameters: false,
            ScaleFactor: 1.0,
            ShowTitle: true,
            IncludeHiddenParameters: false,
            FontInfo: {
                Name: defaultFontInfoName,
                GdiCharSet: defaultGdiCharSet,
                UseCustomFontInfo: defaultUseCustomFontInfo
            }
        };
        this.excelExportOptions = {
            CsvValueSeparator: ',',
            ExportFilters: false,
            ExportParameters: false,
            DashboardStatePosition: 'Below',
            Format: 'Xlsx',
            IncludeHiddenParameters: false
        };
    }
    convertToExportOptions(clientOptions) {
        if (!clientOptions)
            return this;
        let argumentExportOptions = clientOptions;
        let argumentAspxOptions = clientOptions;
        let argumentPdfOptions = clientOptions;
        let argumentImageOptions = clientOptions;
        let argumentExcelOptions = clientOptions;
        let currentPdfOptions = this.pdfExportOptions;
        let currentImageOptions = this.imageExportOptions;
        let currentExcelOptions = this.excelExportOptions;
        let clientPdfOptions = argumentExportOptions.pdfExportOptions ? argumentExportOptions.pdfExportOptions : argumentPdfOptions;
        let clientImageOptions = argumentExportOptions.imageExportOptions ? argumentExportOptions.imageExportOptions : argumentImageOptions;
        let clientExcelOptions = argumentExportOptions.excelExportOptions ? argumentExportOptions.excelExportOptions : argumentExcelOptions;
        let clientDashboardPdfOptions = clientPdfOptions;
        let clientDashboardImageOptions = clientImageOptions;
        let pdfOptions = {
            Title: 'Title' in clientPdfOptions ? clientPdfOptions.Title : currentPdfOptions.Title,
            ShowTitle: _utils_1.type.isDefined(clientPdfOptions.ShowTitle) ? clientPdfOptions.ShowTitle !== 'False' && clientPdfOptions.ShowTitle !== false : currentPdfOptions.ShowTitle,
            AutoFitPageCount: clientPdfOptions.AutoFitPageCount || currentPdfOptions.AutoFitPageCount,
            CardAutoArrangeContent: this._getDefinedValue(argumentAspxOptions.CardOptions, 'AutoArrangeContent', clientDashboardPdfOptions.CardAutoArrangeContent, currentPdfOptions.CardAutoArrangeContent),
            ChartAutomaticPageLayout: this._getDefinedValue(argumentAspxOptions.ChartOptions, 'AutomaticPageLayout', clientDashboardPdfOptions.ChartAutomaticPageLayout, currentPdfOptions.ChartAutomaticPageLayout),
            ChartSizeMode: this._getDefinedValue(argumentAspxOptions.ChartOptions, 'SizeMode', clientDashboardPdfOptions.ChartSizeMode, currentPdfOptions.ChartSizeMode),
            ExportFilters: this._getExportFilters(clientPdfOptions, currentPdfOptions.ExportFilters),
            ExportParameters: _utils_1.type.isDefined(clientDashboardPdfOptions.ExportParameters) ? clientDashboardPdfOptions.ExportParameters : currentPdfOptions.ExportParameters,
            DashboardStatePosition: this._getPdfDashboardStatePosition(clientPdfOptions, currentPdfOptions.DashboardStatePosition),
            GaugeAutoArrangeContent: this._getDefinedValue(argumentAspxOptions.GaugeOptions, 'AutoArrangeContent', clientDashboardPdfOptions.GaugeAutoArrangeContent, currentPdfOptions.GaugeAutoArrangeContent),
            GridFitToPageWidth: this._getDefinedValue(argumentAspxOptions.GridOptions, 'FitToPageWidth', clientDashboardPdfOptions.GridFitToPageWidth, currentPdfOptions.GridFitToPageWidth),
            GridPrintHeadersOnEveryPage: this._getDefinedValue(argumentAspxOptions.GridOptions, 'PrintHeadersOnEveryPage', clientDashboardPdfOptions.GridPrintHeadersOnEveryPage, currentPdfOptions.GridPrintHeadersOnEveryPage),
            MapAutomaticPageLayout: this._getDefinedValue(argumentAspxOptions.MapOptions, 'AutomaticPageLayout', clientDashboardPdfOptions.MapAutomaticPageLayout, currentPdfOptions.MapAutomaticPageLayout),
            MapSizeMode: this._getDefinedValue(argumentAspxOptions.MapOptions, 'SizeMode', clientDashboardPdfOptions.MapSizeMode, currentPdfOptions.MapSizeMode),
            PageLayout: clientPdfOptions.PageLayout || currentPdfOptions.PageLayout,
            PaperKind: clientPdfOptions.PaperKind || currentPdfOptions.PaperKind,
            PieAutoArrangeContent: this._getDefinedValue(argumentAspxOptions.PieOptions, 'AutoArrangeContent', clientDashboardPdfOptions.PieAutoArrangeContent, currentPdfOptions.PieAutoArrangeContent),
            PivotPrintHeadersOnEveryPage: this._getDefinedValue(argumentAspxOptions.PivotOptions, 'PrintHeadersOnEveryPage', clientDashboardPdfOptions.PivotPrintHeadersOnEveryPage, currentPdfOptions.PivotPrintHeadersOnEveryPage),
            RangeFilterAutomaticPageLayout: this._getDefinedValue(argumentAspxOptions.RangeFilterOptions, 'AutomaticPageLayout', clientDashboardPdfOptions.RangeFilterAutomaticPageLayout, currentPdfOptions.RangeFilterAutomaticPageLayout),
            RangeFilterSizeMode: this._getDefinedValue(argumentAspxOptions.RangeFilterOptions, 'SizeMode', clientDashboardPdfOptions.RangeFilterSizeMode, currentPdfOptions.RangeFilterSizeMode),
            ScaleFactor: clientPdfOptions.ScaleFactor || currentPdfOptions.ScaleFactor,
            DocumentScaleMode: clientDashboardPdfOptions.DocumentScaleMode || (argumentAspxOptions.ScaleMode && this._convertScaleModeToDocumentScaleMode(argumentAspxOptions.ScaleMode)) || currentPdfOptions.DocumentScaleMode,
            DashboardAutomaticPageLayout: this._getDashboardAutomaticPageLayout(clientPdfOptions, currentPdfOptions.DashboardAutomaticPageLayout),
            TreemapAutomaticPageLayout: this._getDefinedValue(argumentAspxOptions.TreemapOptions, 'AutomaticPageLayout', clientDashboardPdfOptions.TreemapAutomaticPageLayout, currentPdfOptions.TreemapAutomaticPageLayout),
            TreemapSizeMode: this._getDefinedValue(argumentAspxOptions.TreemapOptions, 'SizeMode', clientDashboardPdfOptions.TreemapSizeMode, currentPdfOptions.TreemapSizeMode),
            IncludeHiddenParameters: _utils_1.type.isDefined(clientDashboardPdfOptions.IncludeHiddenParameters) ? clientDashboardPdfOptions.IncludeHiddenParameters : currentPdfOptions.IncludeHiddenParameters,
            FontInfo: {
                Name: this._getDefinedValue(clientDashboardPdfOptions.FontInfo, 'Name', undefined, currentPdfOptions.FontInfo.Name),
                GdiCharSet: this._getDefinedValue(clientDashboardPdfOptions.FontInfo, 'GdiCharSet', undefined, currentPdfOptions.FontInfo.GdiCharSet),
                UseCustomFontInfo: this._getDefinedValue(clientDashboardPdfOptions.FontInfo, 'UseCustomFontInfo', undefined, currentPdfOptions.FontInfo.UseCustomFontInfo),
            }
        };
        let imageOptions = {
            Title: clientImageOptions.Title || currentImageOptions.Title,
            Format: this._getImageFormat(clientImageOptions, currentImageOptions.Format),
            Resolution: (argumentAspxOptions.ImageOptions ? argumentAspxOptions.ImageOptions.Resolution : clientDashboardImageOptions.Resolution) || currentImageOptions.Resolution,
            ExportFilters: this._getExportFilters(clientImageOptions, currentImageOptions.ExportFilters),
            ExportParameters: _utils_1.type.isDefined(clientDashboardImageOptions.ExportParameters) ? clientDashboardImageOptions.ExportParameters : currentImageOptions.ExportParameters,
            ScaleFactor: clientImageOptions.ScaleFactor || currentImageOptions.ScaleFactor,
            ShowTitle: _utils_1.type.isDefined(clientImageOptions.ShowTitle) ? clientImageOptions.ShowTitle !== 'False' && clientImageOptions.ShowTitle !== false : currentImageOptions.ShowTitle,
            IncludeHiddenParameters: _utils_1.type.isDefined(clientDashboardImageOptions.IncludeHiddenParameters) ? clientDashboardImageOptions.IncludeHiddenParameters : currentImageOptions.IncludeHiddenParameters,
            FontInfo: {
                Name: this._getDefinedValue(clientDashboardImageOptions.FontInfo, 'Name', undefined, currentImageOptions.FontInfo.Name),
                GdiCharSet: this._getDefinedValue(clientDashboardImageOptions.FontInfo, 'GdiCharSet', undefined, currentImageOptions.FontInfo.GdiCharSet),
                UseCustomFontInfo: this._getDefinedValue(clientDashboardImageOptions.FontInfo, 'UseCustomFontInfo', undefined, currentImageOptions.FontInfo.UseCustomFontInfo),
            }
        };
        let excelOptions = {
            CsvValueSeparator: (argumentAspxOptions.ExcelOptions ? argumentAspxOptions.ExcelOptions.CsvValueSeparator : clientExcelOptions.CsvValueSeparator) || currentExcelOptions.CsvValueSeparator,
            ExportFilters: this._getExportFilters(clientExcelOptions, currentExcelOptions.ExportFilters),
            ExportParameters: clientExcelOptions.ExportParameters || currentExcelOptions.ExportParameters,
            DashboardStatePosition: this._getExcelDashboardStatePosition(clientExcelOptions, currentExcelOptions.DashboardStatePosition),
            Format: this._getExcelFormat(clientExcelOptions, currentExcelOptions.Format),
            IncludeHiddenParameters: _utils_1.type.isDefined(clientExcelOptions.IncludeHiddenParameters) ? clientExcelOptions.IncludeHiddenParameters : currentExcelOptions.IncludeHiddenParameters
        };
        let options = new ExportOptions();
        options.pdfExportOptions = pdfOptions;
        options.imageExportOptions = imageOptions;
        options.excelExportOptions = excelOptions;
        return options;
    }
    convertToASPxClientDashboardExportOptions() {
        return {
            PaperKind: this.pdfExportOptions.PaperKind,
            PageLayout: this.pdfExportOptions.PageLayout,
            ScaleMode: this._convertDocumentScaleModeToScaleMode(this.pdfExportOptions.DocumentScaleMode, this.pdfExportOptions.DashboardAutomaticPageLayout),
            ScaleFactor: this.pdfExportOptions.ScaleFactor,
            AutoFitPageCount: this.pdfExportOptions.AutoFitPageCount,
            Title: this.pdfExportOptions.Title,
            ShowTitle: this.pdfExportOptions.ShowTitle,
            FilterState: this._getPdfFilterState(),
            ImageOptions: {
                Format: this.imageExportOptions.Format,
                Resolution: this.imageExportOptions.Resolution,
            },
            ExcelOptions: {
                CsvValueSeparator: this.excelExportOptions.CsvValueSeparator,
                Format: this.excelExportOptions.Format,
                FilterState: this._getExcelFilterState()
            },
            GridOptions: {
                FitToPageWidth: this.pdfExportOptions.GridFitToPageWidth,
                PrintHeadersOnEveryPage: this.pdfExportOptions.GridPrintHeadersOnEveryPage
            },
            PivotOptions: {
                PrintHeadersOnEveryPage: this.pdfExportOptions.PivotPrintHeadersOnEveryPage
            },
            PieOptions: {
                AutoArrangeContent: this.pdfExportOptions.PieAutoArrangeContent
            },
            GaugeOptions: {
                AutoArrangeContent: this.pdfExportOptions.GaugeAutoArrangeContent
            },
            CardOptions: {
                AutoArrangeContent: this.pdfExportOptions.CardAutoArrangeContent
            },
            RangeFilterOptions: {
                AutomaticPageLayout: this.pdfExportOptions.RangeFilterAutomaticPageLayout,
                SizeMode: this.pdfExportOptions.RangeFilterSizeMode,
            },
            ChartOptions: {
                AutomaticPageLayout: this.pdfExportOptions.ChartAutomaticPageLayout,
                SizeMode: this.pdfExportOptions.ChartSizeMode,
            },
            MapOptions: {
                AutomaticPageLayout: this.pdfExportOptions.MapAutomaticPageLayout,
                SizeMode: this.pdfExportOptions.MapSizeMode
            },
            TreemapOptions: {
                AutomaticPageLayout: this.pdfExportOptions.TreemapAutomaticPageLayout,
                SizeMode: this.pdfExportOptions.TreemapSizeMode
            }
        };
    }
    setExcelOptions(options) {
        this.excelExportOptions = this.convertToExportOptions(options).excelExportOptions;
    }
    setImageOptions(options) {
        this.imageExportOptions = this.convertToExportOptions(options).imageExportOptions;
    }
    setPdfOptions(options) {
        this.pdfExportOptions = this.convertToExportOptions(options).pdfExportOptions;
    }
    setOptions(options) {
        let exportOptions = this.convertToExportOptions(options);
        this.pdfExportOptions = exportOptions.pdfExportOptions;
        this.imageExportOptions = exportOptions.imageExportOptions;
        this.excelExportOptions = exportOptions.excelExportOptions;
    }
    _getPdfDashboardStatePosition(clientOptions, currentValue) {
        if (clientOptions.DashboardStatePosition && clientOptions.DashboardStatePosition !== 'SeparateSheet')
            return clientOptions.DashboardStatePosition;
        return clientOptions.FilterState && clientOptions.FilterState !== 'None' ? clientOptions.FilterState : currentValue;
    }
    _getExcelDashboardStatePosition(clientOptions, currentValue) {
        if (clientOptions.DashboardStatePosition && clientOptions.DashboardStatePosition !== 'SeparatePage')
            return clientOptions.DashboardStatePosition;
        return clientOptions.ExcelOptions && clientOptions.ExcelOptions.FilterState && clientOptions.ExcelOptions.FilterState !== 'None' ? clientOptions.ExcelOptions.FilterState : currentValue;
    }
    _getImageFormat(clientOptions, currentValue) {
        if (clientOptions.Format && (clientOptions.Format === 'Png' || clientOptions.Format === 'Jpeg' || clientOptions.Format === 'Jpg' || clientOptions.Format === 'Gif'))
            return this._correctImageFormat(clientOptions.Format);
        return clientOptions.ImageOptions ? clientOptions.ImageOptions.Format : currentValue;
    }
    _getExcelFormat(clientOptions, currentValue) {
        if (clientOptions.Format && (clientOptions.Format === 'Csv' || clientOptions.Format === 'Xls' || clientOptions.Format === 'Xlsx'))
            return clientOptions.Format;
        return clientOptions.ExcelOptions ? clientOptions.ExcelOptions.Format : currentValue;
    }
    _getDefinedValue(oldOptions, oldProperty, newValue, currentValue) {
        if (_utils_1.type.isDefined(oldOptions))
            return oldOptions[oldProperty];
        if (_utils_1.type.isDefined(newValue))
            return newValue;
        return currentValue;
    }
    _getExportFilters(clientOptions, currentValue) {
        if (_utils_1.type.isDefined(clientOptions.ExportFilters))
            return clientOptions.ExportFilters;
        if (_utils_1.type.isDefined(clientOptions.FilterState))
            return clientOptions.FilterState !== 'None';
        return currentValue;
    }
    _getDashboardAutomaticPageLayout(clientOptions, currentValue) {
        if (_utils_1.type.isDefined(clientOptions.DashboardAutomaticPageLayout))
            return clientOptions.DashboardAutomaticPageLayout;
        if (_utils_1.type.isDefined(clientOptions.ScaleMode))
            return clientOptions.ScaleMode === exports.dashboardExportScaleMode.autoFitWithinOnePage;
        return currentValue;
    }
    _convertDocumentScaleModeToScaleMode(documentScaleMode, dashboardAutomaticPageLayout) {
        switch (documentScaleMode) {
            case exports.dashboardExportDocumentScaleMode.autoFitToPagesWidth:
                return exports.dashboardExportScaleMode.autoFitToPageWidth;
            case exports.dashboardExportDocumentScaleMode.useScaleFactor:
                return exports.dashboardExportScaleMode.useScaleFactor;
            default:
                return dashboardAutomaticPageLayout ? exports.dashboardExportScaleMode.autoFitWithinOnePage : exports.dashboardExportScaleMode.none;
        }
    }
    _convertScaleModeToDocumentScaleMode(scaleMode) {
        switch (scaleMode) {
            case exports.dashboardExportScaleMode.autoFitToPageWidth:
                return exports.dashboardExportDocumentScaleMode.autoFitToPagesWidth;
            case exports.dashboardExportScaleMode.useScaleFactor:
                return exports.dashboardExportDocumentScaleMode.useScaleFactor;
            default:
                return exports.dashboardExportDocumentScaleMode.none;
        }
    }
    _getPdfFilterState() {
        if (!this.pdfExportOptions.ExportFilters && !this.pdfExportOptions.ExportParameters)
            return 'None';
        return this.pdfExportOptions.DashboardStatePosition;
    }
    _getExcelFilterState() {
        if (!this.excelExportOptions.ExportFilters && !this.excelExportOptions.ExportParameters)
            return 'None';
        return this.excelExportOptions.DashboardStatePosition;
    }
    _correctImageFormat(imageFormat) {
        return imageFormat === 'Jpeg' ? exports.dashboardExportImageFormat.jpg : imageFormat;
    }
}
exports.ExportOptions = ExportOptions;
ExportOptions.DefaultTitle = undefined;
ExportOptions.DefaultFileName = undefined;
