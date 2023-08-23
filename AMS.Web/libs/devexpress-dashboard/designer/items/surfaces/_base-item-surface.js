﻿/**
* DevExpress Dashboard (_base-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataDashboardItemSurface = exports.BaseItemSurface = void 0;
const string_1 = require("devextreme/core/utils/string");
const ko = require("knockout");
const _data_source_browser_1 = require("../../../common/_data-source-browser");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const disposable_object_1 = require("../../../model/disposable-object");
const _undo_engine_helper_1 = require("../../../model/internal/_undo-engine-helper");
const accordion_tab_options_1 = require("../../accordion-tab-options");
const _confirm_dialog_1 = require("../../confirm-dialog/_confirm-dialog");
const _data_item_collection_surface_1 = require("../sections/_data-item-collection-surface");
const _section_descriptors_1 = require("../_section-descriptors");
class BaseItemSurface extends disposable_object_1.DisposableObject {
    constructor() {
        super(...arguments);
        this._dashboardItemCustomization = (tabs, model, args) => {
            if (this.customizeDashboardItemTabs) {
                this.customizeDashboardItemTabs({
                    dashboardItem: model,
                    addSection: (customTabOption) => {
                        accordion_tab_options_1._customizeTabs(tabs, customTabOption, model);
                    }
                });
            }
        };
    }
    getPropertiesComposer() {
        throw "'getPropertiesComposer' method is not implemented.";
    }
}
exports.BaseItemSurface = BaseItemSurface;
class DataDashboardItemSurface extends BaseItemSurface {
    constructor(dashboardItem, dashboardModel, _dataSourceBrowser, notificationController, findExtension) {
        super();
        this.dashboardItem = dashboardItem;
        this.dashboardModel = dashboardModel;
        this._dataSourceBrowser = _dataSourceBrowser;
        this.notificationController = notificationController;
        this.findExtension = findExtension;
        this._dataItemContainerCustomization = (tabs, target, args) => {
            if (this.customizeDataItemContainerTabs) {
                this.customizeDataItemContainerTabs({
                    dashboardItem: args.dashboardItem,
                    dataItemContainer: target,
                    addSection: (customTabOption) => {
                        accordion_tab_options_1._customizeTabs(tabs, customTabOption, target);
                    }
                });
            }
        };
        this.dataSourceName = ko.observable();
        this.dataMemberName = ko.observable();
        this.dataSourceDisplayText = ko.computed(() => {
            var dsName = this.dashboardItem.dataSource();
            if (!!dsName) {
                var dataSource = this._dataSourceBrowser.findDataSource(dsName);
                if (!!dataSource) {
                    if (dataSource.supportDataMembers && this._dataSourceBrowser.isLoading()) {
                        return 'DashboardStringId.MessageLoading';
                    }
                    return this.dashboardItem.dataMember() ? dataSource.name() + '/' + this.dashboardItem.dataMember() : dataSource.name();
                }
            }
            return 'DashboardWebStringId.DashboardItemMenu.Bindings.SelectDataSourceButton';
        });
        this.needSetDataSource = ko.computed(() => {
            var dsName = this.dashboardItem.dataSource();
            if (!!dsName) {
                var dataSource = this._dataSourceBrowser.findDataSource(dsName);
                if (!!dataSource && dataSource.supportDataMembers) {
                    return !this.dashboardItem.dataMember();
                }
                return !dataSource;
            }
            return true;
        });
        this.changeDataSourcePanelVisible = ko.observable(false);
        this.template = 'dx-dashboard-base-item-surface';
        this.dataSections = ko.observableArray([]);
        this.fillSections();
        if (this.showDefaultSections) {
            this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.HiddenDimensions, this.extendHiddenDimensionsTabs.bind(this)));
            this.dataSections.push(new _data_item_collection_surface_1.DataItemCollectionSurface(this, _section_descriptors_1.SectionDescriptors.HiddenMeasures, this.extendHiddenMeasuresTabs.bind(this)));
        }
        this.confirmDialogViewModel = new _confirm_dialog_1.ConfirmDialogViewModel();
        this.toDispose(this.dataSourceDisplayText);
        this.dataSections().forEach(section => this.toDispose(section));
    }
    get showDefaultSections() {
        return true;
    }
    fillSections() {
    }
    extendHiddenDimensionsTabs(tabs, model) {
    }
    extendHiddenMeasuresTabs(tabs, model) {
    }
    changeDataSource() {
        if (!this.changeDataSourcePanelVisible()) {
            this.dataSourceName(this.dashboardItem.dataSource());
            this.dataMemberName(this.dashboardItem.dataMember());
        }
        this.changeDataSourcePanelVisible(!this.changeDataSourcePanelVisible());
    }
    _changeDataSource() {
        this.dashboardItem.dataSource(this.dataSourceName());
        this.dashboardItem.dataMember(this.dataMemberName());
        let newDataSource = this._dataSourceBrowser.findDataSource(this.dataSourceName());
        let notificationStr = string_1.format(_default_1.getLocalizationById('DashboardWebStringId.DashboardItemMenu.Bindings.ChangedDataSourceMessage'), this.dashboardItem.name(), `${newDataSource.name()}${!!this.dataMemberName() ? ` (${this.dataMemberName()})` : ''}`);
        this.notificationController.showSuccess(notificationStr);
    }
    saveDataSourceChanges() {
        if (!!this.propertiesController) {
            this.propertiesController.mainModel(null);
        }
        this._changeDataSource();
        this.changeDataSourcePanelVisible(false);
    }
    get dataSourceBrowser() {
        return {
            getDataFieldsArray: (dataSourceName) => {
                var deferred = _jquery_helpers_1.createJQueryDeferred();
                if (!dataSourceName) {
                    return deferred.resolve(this.dashboardModel.dataSources().map(ds => {
                        return {
                            dataSourceName: ds.componentName(),
                            dataMemberName: '',
                            dataMember: ds.componentName,
                            name: ds.componentName,
                            displayName: ds.name,
                            fieldType: ko.observable('Unknown'),
                            nodeType: ko.observable('DataSource'),
                            isDataFieldNode: ko.observable(!ds.supportDataMembers)
                        };
                    })).promise();
                }
                this._dataSourceBrowser.getDataFieldsArray(dataSourceName, '', '', _data_source_browser_1.isNonCollectionDataField).done(dataMembers => {
                    deferred.resolve(dataMembers.map(dm => {
                        return {
                            dataSourceName: dataSourceName,
                            dataMemberName: dm.dataMember(),
                            dataMember: dm.dataMember,
                            name: dm.name,
                            displayName: dm.displayName,
                            fieldType: dm.fieldType,
                            nodeType: dm.nodeType,
                            isDataFieldNode: ko.observable(true)
                        };
                    }));
                });
                return deferred.promise();
            },
            splitFullPath: (...args) => this._dataSourceBrowser.splitFullPath.apply(this._dataSourceBrowser, args),
            findDataSource: (dataSourceName) => this._dataSourceBrowser.findDataSource(dataSourceName)
        };
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataDashboardItemSurface.prototype, "_changeDataSource", null);
exports.DataDashboardItemSurface = DataDashboardItemSurface;
