﻿/**
* DevExpress Dashboard (_field-list-item-provider.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldListItemProvider = exports.DataFieldViewModel = void 0;
const ko = require("knockout");
const _data_source_browser_1 = require("../../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const model_1 = require("../../../model");
const data_item_1 = require("../../../model/data-item/data-item");
const olap_data_source_1 = require("../../../model/data-sources/olap-data-source");
const sql_data_source_1 = require("../../../model/data-sources/sql-data-source");
class DataFieldViewModel {
    constructor(name, displayName, hasItems, specifics, field, isList, isCorruptedCalcField) {
        this.name = name;
        this.displayName = displayName;
        this.hasItems = hasItems;
        this.specifics = specifics;
        this.field = field;
        this.isList = isList;
        this.isCorruptedCalcField = isCorruptedCalcField;
        this.innerActions = ko.observableArray();
    }
}
exports.DataFieldViewModel = DataFieldViewModel;
class FieldListItemProvider {
    constructor(_dataSourceBrowserViewModel, _getDataFieldArrayCallback, isFieldValid) {
        this._dataSourceBrowserViewModel = _dataSourceBrowserViewModel;
        this._getDataFieldArrayCallback = _getDataFieldArrayCallback;
        this.isFieldValid = isFieldValid;
        this.loading = ko.observable(false);
        this._changeTrigger = ko.observable(false);
    }
    triggerItemsChanged() {
        this._changeTrigger.valueHasMutated();
    }
    getItems(pathRequest) {
        var deferred = _jquery_helpers_1.createJQueryDeferred();
        var dataSource = this._dataSourceBrowserViewModel.selectedDataSource();
        this._changeTrigger();
        if (!!dataSource) {
            var { dataMember, fieldPath } = _data_source_browser_1.findDataMember(dataSource, pathRequest.path);
            this.loading(true);
            this._getDataFieldArrayCallback(dataSource.componentName(), dataMember, fieldPath).done(dataFields => {
                deferred.resolve(dataFields
                    .filter(field => !!field.dataMember())
                    .filter(field => !this.isFieldValid || this.isFieldValid(field))
                    .map(dataNode => {
                    var name = dataSource instanceof olap_data_source_1.OlapDataSource ? dataNode.dataMember() : dataNode.name();
                    var dataFieldViewModel = new DataFieldViewModel(name, ko.unwrap(dataNode.displayName), !dataNode.isDataFieldNode(), data_item_1.DataItem.typesMap[dataNode.fieldType()] || 'string', dataNode, !_data_source_browser_1.isNonCollectionDataField(dataNode), dataNode.isCorruptedCalcField && dataNode.isCorruptedCalcField());
                    if (dataSource instanceof sql_data_source_1.SqlDataSource) {
                        let isSqlQueryNode = pathRequest.path.length === 0;
                        let query = dataSource.queries().filter(query => query.name() === dataNode.dataMember())[0];
                        if (this._dataSourceBrowserViewModel.canEditDataSource && query != null && isSqlQueryNode) {
                            if (this._dataSourceBrowserViewModel.canEditCustomSqlQueries || query.type() !== 'CustomSqlQuery') {
                                dataFieldViewModel.innerActions.push({
                                    click: () => {
                                        this._dataSourceBrowserViewModel.editQuery(dataNode.dataMember());
                                    },
                                    icon: 'dx-dashboard-ds-edit',
                                    style: 'dx-dashboard-datasource-field-icon-edit'
                                });
                            }
                            dataFieldViewModel.innerActions.push({
                                click: () => {
                                    this._dataSourceBrowserViewModel.removeQuery(dataNode.dataMember());
                                },
                                icon: 'dx-dashboard-remove-small',
                                style: 'dx-dashboard-datasource-field-icon-remove'
                            });
                        }
                    }
                    if (dataSource instanceof model_1.FederationDataSource) {
                        let isQueryNode = pathRequest.path.length === 0;
                        let query = dataSource.queries().find(query => query.alias() === dataNode.dataMember());
                        if (this._dataSourceBrowserViewModel.canEditDataSource && query && isQueryNode) {
                            dataFieldViewModel.innerActions.push({
                                click: () => {
                                    this._dataSourceBrowserViewModel.editFederationQuery(dataNode.dataMember());
                                },
                                icon: 'dx-dashboard-ds-edit',
                                style: 'dx-dashboard-datasource-field-icon-edit'
                            });
                            dataFieldViewModel.innerActions.push({
                                click: () => {
                                    this._dataSourceBrowserViewModel.removeFederationQuery(dataNode.dataMember());
                                },
                                icon: 'dx-dashboard-remove-small',
                                style: 'dx-dashboard-datasource-field-icon-remove'
                            });
                        }
                    }
                    if (dataNode.nodeType() === 'CalculatedDataField') {
                        dataFieldViewModel.style = 'dx-dashboard-calculated-field';
                        var calcField = dataSource.calculatedFields().filter(calculatedField => calculatedField.name() === dataNode.dataMember())[0];
                        if (calcField) {
                            dataFieldViewModel.innerActions.push({
                                click: () => {
                                    this._dataSourceBrowserViewModel.editCalcField(calcField);
                                },
                                icon: 'dx-dashboard-ds-edit',
                                style: 'dx-dashboard-datasource-field-icon-edit'
                            });
                            dataFieldViewModel.innerActions.push({
                                click: () => {
                                    this._dataSourceBrowserViewModel.removeCalcField(calcField);
                                },
                                icon: 'dx-dashboard-remove-small',
                                style: 'dx-dashboard-datasource-field-icon-remove'
                            });
                        }
                    }
                    this.customizeDataFieldViewModel && this.customizeDataFieldViewModel(dataFieldViewModel);
                    return dataFieldViewModel;
                }));
            });
        }
        else {
            deferred.resolve([]);
        }
        deferred.always(() => {
            this.loading(false);
        });
        return deferred.promise();
    }
}
exports.FieldListItemProvider = FieldListItemProvider;
