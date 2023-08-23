﻿/**
* DevExpress Dashboard (_export-dialog-binder.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportInfoManager = exports.ExportDialogBinder = exports.ExportDialogBinderOptions = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const model_1 = require("../../model");
const disposable_object_1 = require("../../model/disposable-object");
const _date_utils_1 = require("../../model/internal/_date-utils");
const dashboard_item_1 = require("../../model/items/dashboard-item");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const group_item_1 = require("../../model/items/group/group-item");
const dashboard_tab_page_1 = require("../../model/items/tab-container-item/dashboard-tab-page");
const tab_container_item_1 = require("../../model/items/tab-container-item/tab-container-item");
const _dashboard_title_view_constants_1 = require("../../viewer-parts/title/_dashboard-title-view-constants");
const _export_dialog_1 = require("../../viewer-parts/widgets/dialogs/export/_export-dialog");
const _export_options_1 = require("../../viewer-parts/_export-options");
class ExportDialogBinderOptions {
}
exports.ExportDialogBinderOptions = ExportDialogBinderOptions;
class ExportDialogBinder {
    constructor(_options) {
        this._options = _options;
        this.availableExportFormats = ['PDF', 'Image', 'Excel'];
        this.showDashboardDialog = (format) => {
            this._validateDashboardExport(format);
            this.exportDialog.setExportFunction((documentInfo) => this.exportDashboardTo(format, documentInfo));
            var title = this._options.dashboard().title.visible() ? this._options.dashboard().title.text() : 'Dashboard';
            this.exportDialog.showDialog('', null, format, {
                defaultFileName: title,
                defaultTitle: title
            });
        };
        this.showItemDialog = (itemComponentName, format) => {
            var item = this._options.dashboard().findItem(itemComponentName);
            if (!item) {
                throw new Error("The item with the '" + itemComponentName + "' name does not exist");
            }
            this._validateExportFormat(format);
            var exportCaption = item._caption;
            this.exportDialog.setExportFunction((documentInfo) => this.exportDashboardItemTo(itemComponentName, format, documentInfo));
            this.exportDialog.showDialog(itemComponentName, this._getExportItemType(item), format, {
                defaultTitle: exportCaption,
                defaultFileName: exportCaption,
            });
        };
        this.hide = () => {
            if (!!this._exportDialog) {
                this._exportDialog.hideDialog();
            }
        };
        this.exportOptions = new _export_options_1.ExportOptions();
        this.exportOptions.setPdfOptions(this._options.pdfExportOptions);
        this.exportOptions.setImageOptions(this._options.imageExportOptions);
        this.exportOptions.setExcelOptions(this._options.excelExportOptions);
    }
    reset() {
        this._exportDialog = undefined;
    }
    _getClientSize(container, mode) {
        if (container) {
            return { width: _jquery_helpers_1.getOuterWidth(container), height: _jquery_helpers_1.getOuterHeight(container) };
        }
        else {
            if (mode === 'EntireDashboard') {
                return { width: 1920, height: 1080 };
            }
            else {
                return { width: window.outerWidth, height: window.outerHeight };
            }
        }
    }
    _getActualComponentName(item) {
        return item instanceof tab_container_item_1.TabContainerItem ? item._activeTabPage().componentName() : item.componentName();
    }
    _getExportHolderItem(item) {
        if (item instanceof tab_container_item_1.TabContainerItem) {
            return this._options.dashboard()._getDisplayDashboardItem(item._activeTabPage());
        }
        return item;
    }
    _getInfo(items, titleHeight, mode, format) {
        var container = this._options.getContainer().querySelector('.dx-dashboard-viewer'), containerPosition = container ? _jquery_helpers_1.jqueryOffset(container) : { left: 0, top: 0 }, clientSize = this._getClientSize(container, mode);
        let elementsList = items
            .map(item => {
            let holderItem = this._getExportHolderItem(item);
            let isTabContainer = item instanceof tab_container_item_1.TabContainerItem;
            var itemExportInfo = this._options.exportInfoProvider.getItemExportInfo(holderItem.componentName(), mode, isTabContainer);
            if (itemExportInfo) {
                itemExportInfo.position = {
                    left: itemExportInfo.position.left - containerPosition.left,
                    top: itemExportInfo.position.top - containerPosition.top
                };
                if (isTabContainer) {
                    itemExportInfo.name = this._getActualComponentName(item);
                    itemExportInfo.caption = holderItem.name();
                }
                return itemExportInfo;
            }
            else if (format === 'Excel') {
                return { name: this._getActualComponentName(item) };
            }
            else {
                return null;
            }
        })
            .filter(itemExportInfo => !!itemExportInfo);
        return {
            clientSize: clientSize,
            titleHeight: titleHeight,
            itemsState: elementsList
        };
    }
    _getFilterFormattableValues(dashboard, exportGroupName, item, exportInfo) {
        let excelOptions = exportInfo.DocumentOptions.excelExportOptions;
        let isGroupExport = !!exportGroupName;
        if (exportInfo.Mode === 'EntireDashboard') {
            if (!isGroupExport) {
                if (exportInfo.Format === 'Excel' && excelOptions && excelOptions.DashboardStatePosition === 'Below') {
                    return item._getDisplayFilterValuesExternal();
                }
                else {
                    if (item instanceof data_dashboard_item_1.DataDashboardItem && dashboard._masterFilterItems().indexOf(item) !== -1) {
                        return item._getDisplayFilterValues();
                    }
                    else {
                        return [];
                    }
                }
            }
            else {
                if (exportGroupName === item.componentName()) {
                    return this._getGroupExternalDisplayFilterValues(dashboard._dataDashboardItems(), exportGroupName);
                }
                else {
                    return item._getDisplayFilterValues();
                }
            }
        }
        else {
            return item._getDisplayFilterValuesExternal();
        }
    }
    exportDashboardTo(format, clientOptions, customFileName) {
        this._validateDashboardExport(format);
        var fileName = customFileName ? customFileName : (clientOptions == undefined || clientOptions.fileName == undefined) ? 'Export' : clientOptions.fileName, dashboard = this._options.dashboard(), items = dashboard
            .layout()
            .getNodesRecursive()
            .filter(node => !!node.item)
            .filter(node => !(node.item instanceof dashboard_tab_page_1.DashboardTabPage))
            .map(node => node.item);
        let exportOptions = this.exportOptions.convertToExportOptions(clientOptions);
        if (!exportOptions.pdfExportOptions.Title)
            exportOptions.pdfExportOptions.Title = this._options.dashboard().title.text();
        if (!exportOptions.imageExportOptions.Title)
            exportOptions.imageExportOptions.Title = this._options.dashboard().title.text();
        if (format === 'Excel' && exportOptions.excelExportOptions.Format === 'Csv')
            throw new Error('Cannot export an entire dashboard in the CSV format.');
        this._exportTo(items, {
            mode: 'EntireDashboard',
            format: format,
            clientState: this._getInfo(items, this._options.dashboard().title.visible() ? _dashboard_title_view_constants_1.titleHeight : 0, 'EntireDashboard', format),
            fileName: fileName
        }, exportOptions);
    }
    exportDashboardItemTo(itemComponentName, format, clientOptions, customFileName) {
        var fileName = customFileName ? customFileName : (clientOptions == undefined || clientOptions.fileName == undefined) ? 'Export' : clientOptions.fileName, dashboard = this._options.dashboard(), exportItem = dashboard.findItem(itemComponentName), isGroup = exportItem instanceof group_item_1.GroupItem || exportItem instanceof dashboard_tab_page_1.DashboardTabPage;
        let clientStateItems, dataQueryItems;
        if (isGroup) {
            var dashboardItems = dashboard.items().concat(dashboard.groups());
            var needExportItem = (item) => { return item.parentContainer() === exportItem.componentName(); };
            clientStateItems = dashboardItems.filter(item => needExportItem(item) || !!item.parentContainer() && needExportItem(dashboard.findItem(item.parentContainer())));
            dataQueryItems = [exportItem].concat(clientStateItems);
        }
        else {
            clientStateItems = dataQueryItems = [exportItem];
        }
        this._validateExportFormat(format);
        let exportOptions = this.exportOptions.convertToExportOptions(clientOptions);
        if (!exportOptions.pdfExportOptions.Title)
            exportOptions.pdfExportOptions.Title = exportItem.name();
        if (!exportOptions.imageExportOptions.Title)
            exportOptions.imageExportOptions.Title = exportItem.name();
        this._exportTo(dataQueryItems, {
            mode: isGroup ? 'EntireDashboard' : 'SingleItem',
            format: format,
            clientState: this._getInfo(clientStateItems, 0, 'SingleItem', format),
            fileName: fileName,
            name: itemComponentName,
            itemType: this._getExportItemType(exportItem)
        }, exportOptions);
    }
    get exportDialog() {
        if (!this._exportDialog) {
            this._exportDialog = new _export_dialog_1.exportDialog({
                container: this._options.getContainer(),
                defaultDocumentInfo: this.exportOptions,
                onShown: this._options.onExportDialogShown,
                onShowing: this._options.onExportDialogShowing,
                onHidden: this._options.onExportDialogHidden
            });
        }
        return this._exportDialog;
    }
    _getExportItemType(item) {
        return item ? dashboard_item_1.DashboardItem._getCommonItemType(item.itemType()) : undefined;
    }
    _getGroupExternalDisplayFilterValues(dataDashboardItems, groupName) {
        var itemsInGroup = dataDashboardItems.filter(item => item.parentContainer() === groupName);
        var externalMasters = itemsInGroup
            .reduce((acc, item) => acc.concat(item._masterFilterItems()), [])
            .filter((master, index, array) => array.indexOf(master) !== index)
            .filter(master => itemsInGroup.indexOf(master) === -1);
        return externalMasters.reduce((acc, master) => acc.concat(master._getDisplayFilterValues()), []);
    }
    _exportTo(items, modeInfo, documentOptions) {
        let fileName = modeInfo.fileName && modeInfo.fileName.trim() ? modeInfo.fileName.replace(/[\\/:*?"<>|]/g, '_') : 'Export';
        let exportInfo = {
            Mode: modeInfo.mode,
            GroupName: modeInfo.name,
            FileName: fileName,
            ClientState: modeInfo.clientState,
            Format: modeInfo.format,
            DocumentOptions: documentOptions,
            ItemType: modeInfo.itemType
        };
        let dashboard = this._options.dashboard();
        var model = items.map(item => {
            let holderItem = this._getExportHolderItem(item);
            return {
                name: this._getActualComponentName(item),
                query: this._getExportDataQueryParams(holderItem, modeInfo),
                drillDownFormattableValues: holderItem instanceof data_dashboard_item_1.DataDashboardItem ? _date_utils_1.toStringArray(holderItem._getDisplayDrillDownValues()) : undefined,
                filterFormattableValues: _date_utils_1.toStringArray(this._getFilterFormattableValues(dashboard, exportInfo.GroupName, holderItem, exportInfo)),
                selectedValues: _date_utils_1.toStringArray(holderItem._getExportingSelection())
            };
        });
        this._options.serviceClient().performExport(exportInfo, model);
    }
    _getExportDataQueryParams(dashboardItem, modeInfo) {
        let queryParams = dashboardItem._getDataQueryParams();
        if (dashboardItem instanceof model_1.GridItem && dashboardItem.columnFilterOptions.updateTotals()) {
            let itemsState = modeInfo.clientState.itemsState.find(s => s.name === dashboardItem.componentName());
            if (itemsState) {
                queryParams['ClientFilter'] = itemsState['combinedFilter'];
            }
        }
        return queryParams;
    }
    _validateExportFormat(format) {
        if (this.availableExportFormats.indexOf(format) === -1) {
            throw new Error("A format is specified incorrectly. Use one of the following: 'PDF', 'Image' or 'Excel'.");
        }
    }
    _validateDashboardExport(format) {
        this._validateExportFormat(format);
        if (!this._options.dashboard()) {
            throw new Error('Cannot perform exporting because the dashboard is not loaded.');
        }
    }
}
exports.ExportDialogBinder = ExportDialogBinder;
class ExportInfoManager extends disposable_object_1.DisposableObject {
    constructor() {
        super(...arguments);
        this._primaryExportInfoProviders = {};
        this._secondaryExportInfoProviders = {};
        this._captionExportInfoProviders = {};
    }
    getItemExportInfo(itemName, mode, isCaption) {
        if (mode === 'SingleItem' && this._secondaryExportInfoProviders[itemName]) {
            return this._secondaryExportInfoProviders[itemName]();
        }
        else if (isCaption && this._captionExportInfoProviders[itemName]) {
            return this._captionExportInfoProviders[itemName]();
        }
        else if (this._primaryExportInfoProviders[itemName]) {
            return this._primaryExportInfoProviders[itemName]();
        }
        else {
            return null;
        }
    }
    registerPrimaryExportItem(itemName, getExportInfoFunc) {
        this._primaryExportInfoProviders[itemName] = getExportInfoFunc;
    }
    unregisterPrimaryExportItem(itemName) {
        if (this._primaryExportInfoProviders[itemName]) {
            delete this._primaryExportInfoProviders[itemName];
        }
    }
    registerSecondaryExportItem(itemName, getExportInfoFunc) {
        this._secondaryExportInfoProviders[itemName] = getExportInfoFunc;
    }
    unregisterSecondaryExportItem(itemName) {
        if (this._secondaryExportInfoProviders[itemName]) {
            delete this._secondaryExportInfoProviders[itemName];
        }
    }
    registerCaptionExportItem(itemName, getExportInfoFunc) {
        this._captionExportInfoProviders[itemName] = getExportInfoFunc;
    }
    unregisterCaptionExportItem(itemName) {
        if (this._captionExportInfoProviders[itemName]) {
            delete this._captionExportInfoProviders[itemName];
        }
    }
    dispose() {
        super.dispose();
        this._primaryExportInfoProviders = {};
        this._secondaryExportInfoProviders = {};
        this._captionExportInfoProviders = {};
    }
}
exports.ExportInfoManager = ExportInfoManager;
