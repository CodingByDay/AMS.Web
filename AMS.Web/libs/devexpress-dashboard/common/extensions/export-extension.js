﻿/**
* DevExpress Dashboard (export-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardExportExtension = void 0;
const _obsolete_helper_1 = require("../../model/internal/_obsolete-helper");
const _dashboard_layout_mode_helper_1 = require("../../viewer-parts/_dashboard-layout-mode-helper");
const control_options_1 = require("../control-options");
const _options_manager_1 = require("../internal/_options-manager");
const _export_dialog_binder_1 = require("./_export-dialog-binder");
const name = 'dashboardExport';
const nameAlias = 'dashboard-export';
class DashboardExportExtension {
    constructor(dashboardControl, options = {}) {
        this.dashboardControl = dashboardControl;
        this._exportInfoContoller = new _export_dialog_binder_1.ExportInfoManager();
        this.name = name;
        this._optionsManager = new _options_manager_1.OptionsManager();
        let defaultOptions = {
            allowExportDashboard: true,
            allowExportDashboardItems: true,
        };
        this._optionsManager.initialize({
            extensionName: name,
            dashboardControl: dashboardControl,
            defaultOptions: defaultOptions,
            eventsHolder: this,
            initOptions: options,
            optionChanged: (args) => this._optionChanged(args)
        });
        this._dialogBinder = new _export_dialog_binder_1.ExportDialogBinder({
            dashboard: dashboardControl.dashboard,
            serviceClient: dashboardControl._serviceClient,
            getContainer: () => _dashboard_layout_mode_helper_1.DashboardLayoutModeHelper.isMobile ? window.document.body : dashboardControl.getWidgetContainer(),
            exportInfoProvider: this._exportInfoContoller,
            excelExportOptions: options.excelExportOptions,
            imageExportOptions: options.imageExportOptions,
            pdfExportOptions: options.pdfExportOptions,
            onExportDialogHidden: (e) => this._optionsManager.raiseEvent('exportDialogHidden', e),
            onExportDialogShowing: (e) => this._optionsManager.raiseEvent('exportDialogShowing', e),
            onExportDialogShown: (e) => this._optionsManager.raiseEvent('exportDialogShown', e)
        });
        defineObsoleteMethods(this);
    }
    get allowExportDashboard() { return this._optionsManager.get('allowExportDashboard'); }
    set allowExportDashboard(value) { this._optionsManager.set('allowExportDashboard', value); }
    get allowExportDashboardItems() { return this._optionsManager.get('allowExportDashboardItems'); }
    set allowExportDashboardItems(value) { this._optionsManager.set('allowExportDashboardItems', value); }
    _initializeExportButton(localContext) {
        localContext.beforeApplyViewerItemOptions.add((item, options, isCreation) => {
            options.allowExport = this.allowExportDashboardItems;
            options.showExportDialog = (format) => this.showExportDashboardItemDialog(item.componentName(), format);
        });
    }
    _initializePrimaryExportItem(localContext) {
        this._initializeExportButton(localContext);
        localContext.viewerItemCreated.add((item, viewerItem) => {
            if (viewerItem.visualMode === 'caption') {
                this._exportInfoContoller.registerCaptionExportItem(item.componentName(), () => viewerItem.getInfo());
            }
            else {
                this._exportInfoContoller.registerPrimaryExportItem(item.componentName(), () => viewerItem.getInfo());
            }
        });
        localContext.viewerItemDispose.add((item, viewerItem) => {
            if (viewerItem.visualMode === 'caption') {
                this._exportInfoContoller.unregisterCaptionExportItem(item.componentName());
            }
            else {
                this._exportInfoContoller.unregisterPrimaryExportItem(item.componentName());
            }
        });
    }
    _initializeSecondaryExportItem(localContext) {
        this._initializeExportButton(localContext);
        localContext.viewerItemCreated.add((item, viewerItem) => {
            this._exportInfoContoller.registerSecondaryExportItem(item.componentName(), () => viewerItem.getInfo());
        });
        localContext.viewerItemDispose.add((item, viewerItem) => {
            this._exportInfoContoller.unregisterSecondaryExportItem(item.componentName());
        });
    }
    _optionChanged(args) {
        switch (args.name) {
            case 'allowExportDashboard':
                return 'updateDashboardToolbar';
            case 'allowExportDashboardItems':
                return 'reinitializeDashboard';
            case 'pdfExportOptions':
            case 'imageExportOptions':
            case 'excelExportOptions':
            default:
                return null;
        }
    }
    start() {
        this._dialogBinderSubscription = this.dashboardControl.dashboard.subscribe(() => this._dialogBinder.reset());
    }
    stop() {
        this._dialogBinderSubscription.dispose();
        this._exportInfoContoller.dispose();
    }
    showExportDashboardDialog(format) {
        this._dialogBinder.showDashboardDialog(format);
    }
    showExportDashboardItemDialog(itemComponentName, format) {
        this._dialogBinder.showItemDialog(itemComponentName, format);
    }
    hideExportDialog() {
        this._dialogBinder.hide();
    }
    getPdfExportOptions() {
        return this._dialogBinder.exportOptions.pdfExportOptions;
    }
    getImageExportOptions() {
        return this._dialogBinder.exportOptions.imageExportOptions;
    }
    getExcelExportOptions() {
        return this._dialogBinder.exportOptions.excelExportOptions;
    }
    setPdfExportOptions(options) {
        this._dialogBinder.exportOptions.setPdfOptions(options);
    }
    setImageExportOptions(options) {
        this._dialogBinder.exportOptions.setImageOptions(options);
    }
    setExcelExportOptions(options) {
        this._dialogBinder.exportOptions.setExcelOptions(options);
    }
    exportToPdf(options, fileName) {
        this._dialogBinder.exportDashboardTo('PDF', options, fileName);
    }
    exportToImage(options, fileName) {
        this._dialogBinder.exportDashboardTo('Image', options, fileName);
    }
    exportToExcel(options, fileName) {
        this._dialogBinder.exportDashboardTo('Excel', options, fileName);
    }
    exportDashboardItemToPdf(itemName, options, fileName) {
        this._dialogBinder.exportDashboardItemTo(itemName, 'PDF', options, fileName);
    }
    exportDashboardItemToImage(itemName, options, fileName) {
        this._dialogBinder.exportDashboardItemTo(itemName, 'Image', options, fileName);
    }
    exportDashboardItemToExcel(itemName, options, fileName) {
        this._dialogBinder.exportDashboardItemTo(itemName, 'Excel', options, fileName);
    }
    _getExportOptions() {
        return this._dialogBinder.exportOptions;
    }
    _setExportOptions(exportOptions) {
        this._dialogBinder.exportOptions.setOptions(exportOptions);
    }
}
exports.DashboardExportExtension = DashboardExportExtension;
control_options_1.defaultExtensions[nameAlias] = (dashboardControl, options) => new DashboardExportExtension(dashboardControl, options);
control_options_1.extensionNameMap[nameAlias] = name;
function defineObsoleteMethods(extension) {
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'showDashboardDialog',
        oldMemberDisplayName: 'DashboardExportExtension.showDashboardDialog',
        newMemberDisplayName: 'DashboardExportExtension.showExportDashboardDialog',
        ignoreWarmMessage: true,
        action: (format) => extension.showExportDashboardDialog(format)
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'hide',
        oldMemberDisplayName: 'DashboardExportExtension.hide',
        newMemberDisplayName: 'DashboardExportExtension.hideExportDialog',
        ignoreWarmMessage: true,
        action: () => extension.hideExportDialog()
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'showItemDialog',
        oldMemberDisplayName: 'DashboardExportExtension.showItemDialog',
        newMemberDisplayName: 'DashboardExportExtension.showExportDashboardItemDialog',
        ignoreWarmMessage: true,
        action: (itemName, format) => extension.showExportDashboardItemDialog(itemName, format)
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'showDashboardExportDialog',
        oldMemberDisplayName: 'DashboardExportExtension.showDashboardExportDialog',
        newMemberDisplayName: 'DashboardExportExtension.showExportDashboardDialog',
        ignoreWarmMessage: true,
        action: (format) => extension.showExportDashboardDialog(format)
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'showItemExportDialog',
        oldMemberDisplayName: 'DashboardExportExtension.showItemExportDialog',
        newMemberDisplayName: 'DashboardExportExtension.showExportDashboardItemDialog',
        ignoreWarmMessage: true,
        action: (itemName, format) => extension.showExportDashboardItemDialog(itemName, format)
    });
    _obsolete_helper_1.defineObsoleteProperty({
        target: extension,
        memberName: 'documentOptions',
        oldMemberDisplayName: 'DashboardExportExtension.documentOptions',
        ignoreWarmMessage: true,
        action: function () {
            return extension._getExportOptions();
        }
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'getExportOptions',
        oldMemberDisplayName: 'DashboardExportExtension.getExportOptions',
        warmMessage: 'The DashboardExportExtension.getExportOptions method is obsolete.  Use the DashboardExportExtension.getPdfExportOptions, DashboardExportExtension.getImageExportOptions, or DashboardExportExtension.getExcelExportOptions method instead.',
        ignoreWarmMessage: true,
        action: () => { return extension._getExportOptions().convertToASPxClientDashboardExportOptions(); }
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'setExportOptions',
        oldMemberDisplayName: 'DashboardExportExtension.setExportOptions',
        warmMessage: 'The DashboardExportExtension.setExportOptions method is obsolete.  Use the DashboardExportExtension.setPdfExportOptions, DashboardExportExtension.setImageExportOptions, or DashboardExportExtension.setExcelExportOptions method instead.',
        ignoreWarmMessage: true,
        action: (options) => {
            let exportOptions = extension._getExportOptions().convertToExportOptions(options);
            extension._setExportOptions(exportOptions);
        }
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'exportDashboardTo',
        oldMemberDisplayName: 'DashboardExportExtension.exportDashboardTo',
        warmMessage: 'The DashboardExportExtension.exportDashboardTo method is obsolete.  Use the DashboardExportExtension.exportToPdf, DashboardExportExtension.exportToImage, or DashboardExportExtension.exportToExcel method instead.',
        ignoreWarmMessage: true,
        action: (format, options, fileName) => {
            if (format === 'PDF') {
                extension.exportToPdf(options, fileName);
            }
            else if (format === 'Image') {
                extension.exportToImage(options, fileName);
            }
            else if (format === 'Excel') {
                extension.exportToExcel(options, fileName);
            }
        }
    });
    _obsolete_helper_1.defineObsoleteMethod({
        target: extension,
        memberName: 'exportDashboardItemTo',
        oldMemberDisplayName: 'DashboardExportExtension.exportDashboardItemTo',
        warmMessage: 'The DashboardExportExtension.exportDashboardItemTo method is obsolete.  Use the DashboardExportExtension.exportDashboardItemToPdf, DashboardExportExtension.exportDashboardItemToImage, or DashboardExportExtension.exportDashboardItemToExcel method instead.',
        ignoreWarmMessage: true,
        action: (itemName, format, options, fileName) => {
            if (format === 'PDF') {
                extension.exportDashboardItemToPdf(itemName, options, fileName);
            }
            else if (format === 'Image') {
                extension.exportDashboardItemToImage(itemName, options, fileName);
            }
            else if (format === 'Excel') {
                extension.exportDashboardItemToExcel(itemName, options, fileName);
            }
        }
    });
}
