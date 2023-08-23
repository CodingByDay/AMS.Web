﻿/**
* DevExpress Dashboard (_data-source-browser-viewmodel.js)
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
exports.DataSourceTreeListViewModel = exports.DataSourceBrowserViewModel = void 0;
const analytics_widgets_1 = require("@devexpress/analytics-core/analytics-widgets");
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const ko = require("knockout");
const _data_source_browser_1 = require("../../common/_data-source-browser");
const _default_1 = require("../../data/localization/_default");
const model_1 = require("../../model");
const json_data_source_1 = require("../../model/data-sources/json-data-source");
const sql_data_source_1 = require("../../model/data-sources/sql-data-source");
const disposable_object_1 = require("../../model/disposable-object");
const index_internal_1 = require("../../model/index.internal");
const _helper_classes_1 = require("../../model/internal/_helper-classes");
const _undo_engine_helper_1 = require("../../model/internal/_undo-engine-helper");
const _calc_field_editor_1 = require("../calc-field-editor/_calc-field-editor");
const _expression_editor_item_provider_1 = require("../expression-editor/_expression-editor-item-provider");
const _filter_utils_1 = require("../filtering/_filter-utils");
const _add_data_source_popup_1 = require("./_add-data-source-popup");
const _field_list_item_provider_1 = require("./item-providers/_field-list-item-provider");
const _rename_data_source_popup_1 = require("./rename-data-source-popup/_rename-data-source-popup");
class DataSourceBrowserViewModel extends disposable_object_1.DisposableObject {
    constructor(dataSourceBrowser, dataSourceWizardExtension, accessibleDataSourcesExtension, updateHub) {
        super();
        this.dataSourceBrowser = dataSourceBrowser;
        this.dataSourceWizardExtension = dataSourceWizardExtension;
        this.accessibleDataSourcesExtension = accessibleDataSourcesExtension;
        this.editDataSourceActions = ko.observableArray();
        this.addDataSources = (dataSources) => {
            dataSources.forEach(dataSource => {
                if (!dataSource.name() || !_helper_classes_1.NameGenerator.isValidName(dataSource.name(), this.dataSourceBrowser._dataSources(), 'name')) {
                    var prefix = !dataSource.name() ? _default_1.getLocalizationById(dataSource.getDisplayNamePrefix()) : dataSource.name();
                    dataSource.name(_helper_classes_1.NameGenerator.generateName(prefix + ' ', this.dataSourceBrowser._dataSources(), 'name', 1));
                }
                this.dataSourceBrowser._dataSources.push(dataSource);
                this.selectedDataSource(dataSource);
            });
        };
        this.addQuery = () => {
            this.editQuery(null);
        };
        this.manageQueries = () => {
            this.manageFederationQueries();
        };
        this.dataSourceActions = ko.observableArray();
        this.removeDataSource = (dataSource) => {
            this._removeDataSource(dataSource);
        };
        this.showRenameDataSourceForm = (dataSource) => {
            this.renameDataSourcePopup.show(dataSource);
        };
        this.usedDataSourcesExist = () => {
            return this.dataSourceBrowser._dataSources().length > 0;
        };
        this.availableDataSourcesExist = () => {
            return this.accessibleDataSourcesExtension() && this.accessibleDataSourcesExtension().dataSources().length > 0;
        };
        this.popupContent = ko.observable();
        this.popupVisible = ko.computed({
            read: () => {
                return !!this.popupContent();
            },
            write: (val) => {
                if (!val) {
                    this.popupContent(undefined);
                }
            }
        });
        this.addCalculatedField = () => {
            if (this.canAddCalculatedField) {
                var dataSource = this.selectedDataSource();
                var { dataMember, fieldPath } = _data_source_browser_1.findDataMember(dataSource, _data_source_browser_1.trimLeadingPathElement(this.selectedPath(), dataSource.componentName()));
                if (!dataMember && dataSource.supportDataMembers) {
                    dataMember = _data_source_browser_1.getFirstDataMember(dataSource);
                }
                var pathInCache = [this.selectedDataSourceComponentName()].concat(dataMember ? [dataMember] : []);
                this.calcFieldEditor.showAddDialog(dataSource.componentName(), dataMember)
                    .then(calcField => {
                    var newCalculatedFieldPath = pathInCache.concat([calcField.name()]);
                    this.selectedPath(newCalculatedFieldPath.join('.'));
                });
            }
        };
        this.editCalcField = (field) => {
            this.calcFieldEditor.showEditDialog(field, this.selectedDataSourceComponentName(), field.dataMember());
        };
        this.removeCalcField = (field) => {
            this.calcFieldEditor.removeCalcField(field, this.selectedDataSource().componentName());
        };
        this.selectedPath = ko.observable();
        this.selectedDataSource = ko.observable();
        this.filterEditorModel = ko.computed(() => {
            if (this.selectedDataSource() && this.selectedDataSource().hasFilter) {
                var filterString = this.selectedDataSource().filter;
                var options = _filter_utils_1.createItemFilterOptions(filterString, undefined, this.dataSourceBrowser);
                options().path(this.selectedDataSource().componentName());
                var filterEditorItemsProvider = new _expression_editor_item_provider_1.ExpressionEditorItemsProvider(this.dataSourceBrowser, this.dataSourceBrowser, this.dataSourceBrowser, this.dataSourceBrowser.parameters(), this.selectedDataSource().componentName, ko.observable(''), (field) => !field.isAggregate());
                return new analytics_widgets_1.FilterEditor(options, ko.observable(filterEditorItemsProvider));
            }
            return null;
        });
        this.editFilter = () => {
            this.filterEditorModel() && this.filterEditorModel().popupVisible(true);
        };
        this.calcFieldEditor = new _calc_field_editor_1.CalcFieldEditor(this.dataSourceBrowser);
        this.renameDataSourcePopup = new _rename_data_source_popup_1.RenameDataSourcePopup(this.dataSourceBrowser);
        if (dataSourceBrowser._dataSources().length > 0) {
            this.selectedDataSource(dataSourceBrowser._dataSources()[0]);
        }
        this.selectedDataSourceComponentName = ko.computed(() => {
            return this.selectedDataSource() && this.selectedDataSource().componentName() || '';
        });
        this.allowAddQuery = ko.computed(() => {
            return this.selectedDataSource() instanceof sql_data_source_1.SqlDataSource;
        });
        this.allowManageQueries = ko.computed(() => {
            return this.selectedDataSource() instanceof model_1.FederationDataSource;
        });
        this.allowEditDataSource = ko.computed(() => {
            return this.selectedDataSource() instanceof json_data_source_1.JsonDataSource;
        });
        this.toDispose(this.allowAddQuery);
        this.toDispose(this.allowManageQueries);
        this.toDispose(this.allowEditDataSource);
        this.toDispose(updateHub.dataSourcePropertyChanged.add((args) => this._onDataSourcePropertyChanged(args)));
        this.toDispose(this.selectedDataSource.subscribe(dataSource => {
            this.selectedPath('');
            if (dataSource instanceof sql_data_source_1.SqlDataSource) {
                let sqlDataSource = dataSource;
                if (sqlDataSource.queries().length > 0)
                    this._expandQuery(sqlDataSource, sqlDataSource.queries()[0].name());
            }
        }));
        if (this.accessibleDataSourcesExtension()) {
            this.dataSourceActions.push({
                click: () => this.showAddDataSourceForm(),
                text: _default_1.getLocalizationById('DashboardWebStringId.Add'),
                disabled: ko.computed(() => false)
            });
        }
        this.editDataSourceActions.push({
            click: () => this.addCalculatedField(),
            text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.AddCalculatedField'),
            visible: ko.computed(() => this.canAddCalculatedField)
        });
        if (this.canEditDataSource) {
            this.editDataSourceActions.push({
                click: () => this.addQuery(),
                text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.AddQuery'),
                visible: ko.computed(() => this.allowAddQuery())
            });
            this.editDataSourceActions.push({
                click: () => this.editDataSource(),
                text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Edit'),
                visible: ko.computed(() => this.allowEditDataSource())
            });
            this.editDataSourceActions.push({
                click: () => this.manageQueries(),
                text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.ManageQueries'),
                visible: ko.computed(() => this.allowManageQueries())
            });
        }
        this.editDataSourceActions.push({
            click: () => this.editFilter(),
            text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Filter'),
            visible: ko.computed(() => this.filterEditorModel() !== null)
        });
        this.dataSourceTreeListViewModel = new DataSourceTreeListViewModel(this);
    }
    _expandQuery(dataSource, queryName) {
        this.dataSourceBrowser.getDataFieldsArray(dataSource.componentName(), queryName, '', _data_source_browser_1.isNonCollectionDataField).done(dataFields => {
            if (dataFields.length > 0) {
                this.selectedPath([dataSource.componentName(), queryName, dataFields[0].name()].join('.'));
            }
        });
    }
    get canEditDataSource() {
        return !!this.dataSourceWizardExtension();
    }
    get canEditCustomSqlQueries() {
        return this.dataSourceWizardExtension() && this.dataSourceWizardExtension().isCustomSqlEnabled || false;
    }
    refreshFieldList() {
        this.dataSourceBrowser.clearFieldsCache(this.selectedDataSourceComponentName());
        this.dataSourceBrowser.initDataSource(this.selectedDataSource());
        this.dataSourceTreeListViewModel.triggerItemsChanged();
    }
    showAddDataSourceForm() {
        this.popupContent(new _add_data_source_popup_1.AddDataSourcePopup(this.accessibleDataSourcesExtension, (ds) => !ds.componentName() || _helper_classes_1.NameGenerator.isValidName(ds.componentName(), this.dataSourceBrowser._dataSources(), 'componentName'), this.addDataSources, this.popupVisible));
    }
    editQuery(queryName) {
        if (this.canEditDataSource) {
            this.dataSourceWizardExtension().showSqlQueryEditingDialog(this.selectedDataSource(), queryName);
        }
    }
    editFederationQuery(queryName) {
        if (this.canEditDataSource) {
            this.dataSourceWizardExtension().showFederationQueryEditingDialog(this.selectedDataSource(), queryName);
        }
    }
    manageFederationQueries() {
        if (this.canEditDataSource) {
            this.dataSourceWizardExtension().showManageFederationQueriesDialog(this.selectedDataSource());
        }
    }
    removeQuery(queryName) {
        var sqlDataSource = this.selectedDataSource();
        if (sqlDataSource) {
            var queryToRemove = sqlDataSource.queries().filter(query => query.name() === queryName)[0];
            if (queryToRemove) {
                sqlDataSource.queries.remove(queryToRemove);
                sqlDataSource.calculatedFields.remove(calcField => calcField.dataMember() === queryName);
            }
        }
    }
    removeFederationQuery(queryName) {
        let federationDataSource = this.selectedDataSource();
        if (federationDataSource) {
            let queryToRemove = federationDataSource.queries().find(query => query.alias() === queryName);
            if (queryToRemove) {
                federationDataSource.queries.remove(queryToRemove);
                federationDataSource.calculatedFields.remove(calcField => calcField.dataMember() === queryName);
            }
        }
    }
    editDataSource() {
        if (this.canEditDataSource) {
            var selectedDataSource = this.selectedDataSource();
            if (selectedDataSource instanceof json_data_source_1.JsonDataSource)
                this.dataSourceWizardExtension()._showEditJsonDataSourceDialog(selectedDataSource);
        }
    }
    _removeDataSource(dataSource) {
        this.selectedDataSource(null);
        this.dataSourceBrowser.removeDataSource(dataSource);
        if (this.dataSourceBrowser._dataSources().length > 0) {
            this.selectedDataSource(this.dataSourceBrowser._dataSources()[0]);
        }
    }
    get canAddCalculatedField() {
        return this.calcFieldEditor.canAddCalculatedField(this.selectedDataSourceComponentName());
    }
    _onDataSourcePropertyChanged(args) {
        if (!args.propertyName)
            this.refreshFieldList();
        else {
            if (args.dataSource instanceof sql_data_source_1.SqlDataSource) {
                let sqlDataSource = args.dataSource;
                switch (args.propertyName) {
                    case 'queries':
                        if (args.status === 'added') {
                            let queryName = args.model.name();
                            this._expandQuery(sqlDataSource, queryName);
                            this.refreshFieldList();
                        }
                        else if (args.status === 'deleted') {
                            this.refreshFieldList();
                        }
                }
            }
            else if (args.dataSource instanceof json_data_source_1.JsonDataSource) {
                switch (args.propertyName) {
                    case 'rootElement':
                    case 'schema':
                        this.refreshFieldList();
                        break;
                }
            }
            else if (args.dataSource instanceof model_1.FederationDataSource) {
                let federationDataSource = args.dataSource;
                switch (args.propertyName) {
                    case 'queries':
                        if (args.status === 'added') {
                            let queryName = args.model.alias();
                            this._expandQuery(federationDataSource, queryName);
                            this.refreshFieldList();
                        }
                        else if (args.status === 'deleted') {
                            this.refreshFieldList();
                        }
                }
            }
            if (args.dataSource.hasCalculatedFields) {
                switch (args.propertyName) {
                    case 'fieldType':
                    case 'expression':
                        this.refreshFieldList();
                        break;
                    case 'calculatedFields':
                        if (args.status === 'added' || args.status === 'deleted')
                            this.refreshFieldList();
                        break;
                }
            }
        }
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DataSourceBrowserViewModel.prototype, "_removeDataSource", null);
exports.DataSourceBrowserViewModel = DataSourceBrowserViewModel;
class DataSourceTreeListViewModel {
    constructor(dataSourceBrowserViewModel) {
        this.treeListEditorOption = ko.observable();
        index_internal_1.subscribeAndPerform(dataSourceBrowserViewModel.selectedDataSource, (newDataSource) => {
            if (newDataSource) {
                let getFieldsCallback = (dataSourceName, dataMember, fieldPath) => dataSourceBrowserViewModel.dataSourceBrowser.getDataFieldsArray(dataSourceName, dataMember, fieldPath, () => true);
                this._itemsProvider = new _field_list_item_provider_1.FieldListItemProvider(dataSourceBrowserViewModel, getFieldsCallback);
                this.treeListEditorOption({
                    itemsProvider: this._itemsProvider,
                    treeListController: new DashboardTreeListController(),
                    selectedPath: dataSourceBrowserViewModel.selectedPath,
                    templateName: 'dx-dashboard-treelist-item-template',
                    path: ko.observable(dataSourceBrowserViewModel.selectedDataSourceComponentName())
                });
            }
            else {
                this.treeListEditorOption(null);
            }
        });
    }
    triggerItemsChanged() {
        this._itemsProvider && this._itemsProvider.triggerItemsChanged();
    }
}
exports.DataSourceTreeListViewModel = DataSourceTreeListViewModel;
class DashboardTreeListController extends analytics_widgets_internal_1.TreeListController {
    hasItems(item) {
        return item['hasItems'];
    }
    canSelect(value) {
        return !value.data.isList;
    }
}
