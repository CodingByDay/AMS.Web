﻿/**
* DevExpress Dashboard (_export-dialog.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportDialog = void 0;
const string_1 = require("devextreme/core/utils/string");
const _localization_ids_1 = require("../../../../data/_localization-ids");
const _localizer_1 = require("../../../../data/_localizer");
const _export_options_1 = require("../../../_export-options");
const _viewer_item_types_1 = require("../../../_viewer-item-types");
const _dialog_form_1 = require("../_dialog-form");
const _export_localization_1 = require("./_export-localization");
const _export_options_cache_1 = require("./_export-options-cache");
const _export_options_groups_1 = require("./_export-options-groups");
class exportDialog {
    constructor(options) {
        this.defaultTitle = _export_options_1.ExportOptions.DefaultTitle;
        this.defaultFileName = _export_options_1.ExportOptions.DefaultFileName;
        this.options = options;
        this._initialize();
    }
    _initialize() {
        var that = this, options = that.options;
        exportDialog._initializeExportLocalizedStrings();
        that.exportOptionsCache = new _export_options_cache_1.exportOptionsCache();
        that.dialogForm = new _dialog_form_1.dialogForm({
            dialogContainer: options.container,
            fullScreenMode: options.fullScreenMode,
            width: 'auto',
            height: 'auto',
            allowScrolling: true,
            deferredRendering: true,
            buttons: [{
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonReset),
                    func: function (type, typeExportEntities) {
                        that.group.set(options.defaultDocumentInfo);
                    },
                    hide: false
                }, {
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonExport),
                    hide: true,
                    func: function () {
                        let defaultDocumentInfo = options.defaultDocumentInfo;
                        var actualDocumentInfo = that.exportOptionsCache.getActualDocumentInfo(that.dashboardItemName, defaultDocumentInfo);
                        that.group.apply(actualDocumentInfo);
                        that.exportOptionsCache.add(that.dashboardItemName, defaultDocumentInfo, actualDocumentInfo);
                        that.exportFunction(actualDocumentInfo);
                    },
                    isDefault: true
                }, {
                    name: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ButtonCancel),
                    hide: true,
                    func: function () { }
                }
            ],
            renderContent: function (controlCreationCallbacks) {
                let exportForm = document.createElement('div');
                exportForm.classList.add(_dialog_form_1.dialogClasses.form);
                that._createGroup();
                var editors = that.group.getEditors();
                editors.forEach(editor => {
                    let element = document.createElement('div');
                    element.classList.add(_dialog_form_1.dialogClasses.element);
                    switch (editor.margin) {
                        case 'Large':
                            element.classList.add(_dialog_form_1.dialogClasses.elementLargeMarginTop);
                            break;
                        case 'Small':
                            element.classList.add(_dialog_form_1.dialogClasses.elementSmallMarginTop);
                            break;
                    }
                    exportForm.appendChild(element);
                    element.appendChild(editor.labelDiv);
                    element.appendChild(editor.editorDiv);
                });
                return exportForm;
            },
            disposeContent: () => {
                if (this.group) {
                    let editors = that.group.getEditors();
                    editors.forEach(editor => editor.dispose());
                }
            },
            setActualState: function (width) {
            },
            onShown: options.onShown,
            onShowing: options.onShowing,
            onHidden: options.onHidden
        });
    }
    showDialog(dashboardItemName, dashboardItemType, format, options) {
        this.defaultTitle = options.defaultTitle;
        this.defaultFileName = options.defaultFileName;
        this.dashboardItemName = dashboardItemName;
        this.dashboardItemType = dashboardItemType;
        this.format = format;
        this.dialogForm.popupInstance.option('title', this._getLocalizedTitle(options.defaultFileName, format));
        this.dialogForm.showDialog();
    }
    hideDialog() {
        this.dialogForm.hideDialog();
    }
    dispose() {
        this.dialogForm && this.dialogForm.dispose();
    }
    _getLocalizedTitle(name, format) {
        let exportString;
        switch (format) {
            case _export_options_1.exportFormats.pdf:
                exportString = _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportToPdf);
                break;
            case _export_options_1.exportFormats.image:
                exportString = _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportToImage);
                break;
            default:
                exportString = _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportToExcel);
                break;
        }
        return !name ? exportString : string_1.format(_localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.ExportTemplate), exportString, name);
    }
    setExportFunction(exportFunction) {
        if (exportFunction)
            this.exportFunction = exportFunction;
    }
    _createImageGroup(dashboardItemType, documentInfo) {
        switch (dashboardItemType) {
            case null:
                return new _export_options_groups_1.dashboardImageOptionsGroup(documentInfo.imageExportOptions.ShowTitle);
            case _viewer_item_types_1.types.image:
                return new _export_options_groups_1.simplyImageOptionsGroup(documentInfo.imageExportOptions.ShowTitle);
            default:
                return new _export_options_groups_1.imageOptionsGroup(documentInfo.imageExportOptions.ShowTitle);
        }
    }
    _createExcelGroup(dashboardItemType, documentInfo) {
        switch (dashboardItemType) {
            case null:
                return new _export_options_groups_1.dashboardExcelOptionsGroup(documentInfo.excelExportOptions.Format);
            default:
                return new _export_options_groups_1.excelOptionsGroup(documentInfo.excelExportOptions.Format, dashboardItemType !== _viewer_item_types_1.types.group && dashboardItemType !== _viewer_item_types_1.types.page && dashboardItemType !== _viewer_item_types_1.types.tabPage && dashboardItemType !== _viewer_item_types_1.types.tabContainer);
        }
    }
    _createPdfGroup(dashboardItemType, documentInfo) {
        switch (dashboardItemType) {
            case null:
                return new _export_options_groups_1.entireDashboardOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.DashboardAutomaticPageLayout, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.group:
            case _viewer_item_types_1.types.page:
                return new _export_options_groups_1.groupItemOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.DashboardAutomaticPageLayout, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.grid:
                return new _export_options_groups_1.gridOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.GridFitToPageWidth, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.chart:
            case _viewer_item_types_1.types.scatter:
                return new _export_options_groups_1.chartOptionsGroup(documentInfo.pdfExportOptions.ShowTitle);
            case _viewer_item_types_1.types.pie:
                return new _export_options_groups_1.pieOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.PieAutoArrangeContent, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.gauge:
                return new _export_options_groups_1.gaugeOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.GaugeAutoArrangeContent, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.card:
                return new _export_options_groups_1.cardOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.CardAutoArrangeContent, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.pivot:
                return new _export_options_groups_1.pivotOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.treemap:
                return new _export_options_groups_1.treemapOptionsGroup(documentInfo.pdfExportOptions.ShowTitle);
            case _viewer_item_types_1.types.choroplethMap:
            case _viewer_item_types_1.types.geoPointMap:
            case _viewer_item_types_1.types.bubbleMap:
            case _viewer_item_types_1.types.pieMap:
                return new _export_options_groups_1.mapOptionsGroup(documentInfo.pdfExportOptions.ShowTitle);
            case _viewer_item_types_1.types.rangeFilter:
                return new _export_options_groups_1.rangeFilterOptionsGroup(documentInfo.pdfExportOptions.ShowTitle);
            case _viewer_item_types_1.types.text:
                return new _export_options_groups_1.textItemOptionsGroup(documentInfo.pdfExportOptions.ShowTitle);
            case _viewer_item_types_1.types.boundImage:
                return new _export_options_groups_1.boundImageItemOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.image:
                return new _export_options_groups_1.imageItemOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.DocumentScaleMode);
            case _viewer_item_types_1.types.custom:
                return new _export_options_groups_1.customItemOptionsGroup(documentInfo.pdfExportOptions.ShowTitle, documentInfo.pdfExportOptions.DashboardAutomaticPageLayout, documentInfo.pdfExportOptions.DocumentScaleMode);
        }
    }
    _createGroup() {
        var that = this, documentInfo = that.exportOptionsCache.getActualDocumentInfo(that.dashboardItemName, that.options.defaultDocumentInfo);
        if (that.group) {
            that.group.dispose();
        }
        switch (that.format) {
            case _export_options_1.exportFormats.image:
                that.group = that._createImageGroup(that.dashboardItemType, documentInfo);
                break;
            case _export_options_1.exportFormats.excel:
                that.group = that._createExcelGroup(that.dashboardItemType, documentInfo);
                break;
            default:
                that.group = that._createPdfGroup(that.dashboardItemType, documentInfo);
                break;
        }
        that.group.createEditors({ popupContainer: this.options.container });
        if (documentInfo.pdfExportOptions && documentInfo.pdfExportOptions.Title === _export_options_1.ExportOptions.DefaultTitle)
            documentInfo.pdfExportOptions.Title = this.defaultTitle;
        if (documentInfo.imageExportOptions && documentInfo.imageExportOptions.Title === _export_options_1.ExportOptions.DefaultTitle)
            documentInfo.imageExportOptions.Title = this.defaultTitle;
        if (documentInfo.fileName === _export_options_1.ExportOptions.DefaultFileName)
            documentInfo.fileName = this.defaultFileName;
        that.group.set(documentInfo);
        var scaleModeGroup = !!that.group['dashboardOptionsGroup'] ? that.group['dashboardOptionsGroup'].scaleModeOptionsGroup : that.group['scaleModeOptionsGroup'];
        if (!!scaleModeGroup) {
            scaleModeGroup.visibilityUpdated.add(() => { this.dialogForm.popupInstance.repaint(); });
        }
    }
    static _initializeExportLocalizedStrings() {
        _export_localization_1.paperKind.letter = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKindLetter), value: _export_options_1.dashboardExportPaperKind.letter };
        _export_localization_1.paperKind.legal = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKindLegal), value: _export_options_1.dashboardExportPaperKind.legal };
        _export_localization_1.paperKind.executive = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKindExecutive), value: _export_options_1.dashboardExportPaperKind.executive };
        _export_localization_1.paperKind.a5 = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKindA5), value: _export_options_1.dashboardExportPaperKind.a5 };
        _export_localization_1.paperKind.a4 = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKindA4), value: _export_options_1.dashboardExportPaperKind.a4 };
        _export_localization_1.paperKind.a3 = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PaperKindA3), value: _export_options_1.dashboardExportPaperKind.a3 };
        _export_localization_1.pageLayout.auto = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayoutAuto), value: _export_options_1.dashboardExportPageLayout.auto };
        _export_localization_1.pageLayout.portrait = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayoutPortrait), value: _export_options_1.dashboardExportPageLayout.portrait };
        _export_localization_1.pageLayout.landscape = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.PageLayoutLandscape), value: _export_options_1.dashboardExportPageLayout.landscape };
        _export_localization_1.scaleMode.none = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ScaleModeNone), value: _export_options_1.dashboardExportDocumentScaleMode.none };
        _export_localization_1.scaleMode.useScaleFactor = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ScaleModeUseScaleFactor), value: _export_options_1.dashboardExportDocumentScaleMode.useScaleFactor };
        _export_localization_1.scaleMode.autoFitToPageWidth = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.ScaleModeAutoFitToPagesWidth), value: _export_options_1.dashboardExportDocumentScaleMode.autoFitToPagesWidth };
        _export_localization_1.dashboardStatePosition.below = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FilterStatePresentationAfter), value: _export_options_1.dashboardStateExportPosition.below };
        _export_localization_1.dashboardStatePosition.separatePage = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FilterStatePresentationAfterAndSplitPage), value: _export_options_1.dashboardStateExportPosition.separatePage };
        _export_localization_1.excelDashboardStatePosition.below = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FilterStatePresentationAfter), value: _export_options_1.dashboardStateExcelExportPosition.below };
        _export_localization_1.excelDashboardStatePosition.separateSheet = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.FilterStatePresentationSplitSheet), value: _export_options_1.dashboardStateExcelExportPosition.separateSheet };
        _export_localization_1.imageFormat.png = { displayValue: 'PNG', value: _export_options_1.dashboardExportImageFormat.png };
        _export_localization_1.imageFormat.gif = { displayValue: 'GIF', value: _export_options_1.dashboardExportImageFormat.gif };
        _export_localization_1.imageFormat.jpg = { displayValue: 'JPG', value: _export_options_1.dashboardExportImageFormat.jpg };
        _export_localization_1.excelFormat.csv = { displayValue: 'CSV', value: _export_options_1.dashboardExportExcelFormat.csv };
        _export_localization_1.excelFormat.xls = { displayValue: 'XLS', value: _export_options_1.dashboardExportExcelFormat.xls };
        _export_localization_1.excelFormat.xlsx = { displayValue: 'XLSX', value: _export_options_1.dashboardExportExcelFormat.xlsx };
        _export_localization_1.sizeMode.none = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeModeNone), value: _export_options_1.dashboardExportSizeMode.none };
        _export_localization_1.sizeMode.stretch = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeModeStretch), value: _export_options_1.dashboardExportSizeMode.stretch };
        _export_localization_1.sizeMode.zoom = { displayValue: _localizer_1.localizer.getString(_localization_ids_1.localizationId.labelName.SizeModeZoom), value: _export_options_1.dashboardExportSizeMode.zoom };
    }
}
exports.exportDialog = exportDialog;
