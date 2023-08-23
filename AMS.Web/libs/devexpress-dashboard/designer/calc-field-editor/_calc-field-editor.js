﻿/**
* DevExpress Dashboard (_calc-field-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalcFieldEditorViewModel = exports.CalcFieldEditor = void 0;
const ko = require("knockout");
const _data_source_browser_1 = require("../../common/_data-source-browser");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _default_1 = require("../../data/localization/_default");
const calculated_field_1 = require("../../model/data-sources/calculated-field");
const ef_data_source_1 = require("../../model/data-sources/ef-data-source");
const federation_data_source_1 = require("../../model/data-sources/federation-data-source");
const _calculated_field_1 = require("../../model/data-sources/metadata/_calculated-field");
const mongodb_data_source_1 = require("../../model/data-sources/mongodb-data-source");
const sql_data_source_1 = require("../../model/data-sources/sql-data-source");
const _helper_classes_1 = require("../../model/internal/_helper-classes");
const _base_metadata_1 = require("../../model/metadata/_base-metadata");
const _expression_editor_display_name_provider_1 = require("../expression-editor/_expression-editor-display-name-provider");
const _expression_editor_item_provider_1 = require("../expression-editor/_expression-editor-item-provider");
class CalcFieldEditor {
    constructor(dataSourceBrowser) {
        this.dataSourceBrowser = dataSourceBrowser;
        this.viewModel = ko.observable(null);
    }
    canAddCalculatedField(dataSourceName) {
        var dataSource = this.dataSourceBrowser.findDataSource(dataSourceName);
        if (dataSource && dataSource.hasCalculatedFields) {
            if (dataSource instanceof sql_data_source_1.SqlDataSource) {
                return dataSource.queries().length > 0;
            }
            else if (dataSource instanceof ef_data_source_1.EFDataSource) {
                return dataSource._tables().length > 0;
            }
            else if (dataSource instanceof federation_data_source_1.FederationDataSource) {
                return dataSource.queries().length > 0;
            }
            else if (dataSource instanceof mongodb_data_source_1.MongoDBDataSource) {
                return dataSource.queries().length > 0;
            }
            return !!dataSource;
        }
        else {
            return false;
        }
    }
    showAddDialog(dataSourceName, dataMemberName) {
        var def = _jquery_helpers_1.createJQueryDeferred();
        if (this.canAddCalculatedField) {
            var dataSourceInstance = this.dataSourceBrowser.findDataSource(dataSourceName);
            var newCalculatedFieldName = _helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.NewCalculatedFieldNamePrefix') + ' ', dataSourceInstance.calculatedFields(), 'name', 1);
            var newCalculatedField = new calculated_field_1.CalculatedField({ '@Name': newCalculatedFieldName, '@DataMember': dataMemberName, '@DataType': 'Auto' });
            this.show(newCalculatedField, dataSourceName, dataMemberName).then(calcField => def.resolve(calcField), calcField => def.reject(calcField));
        }
        else {
            def.reject();
        }
        return def.promise();
    }
    showEditDialog(calculatedField, dataSourceName, dataMemberName) {
        return this.show(calculatedField, dataSourceName, dataMemberName);
    }
    removeCalcField(calculatedField, dataSourceName) {
        var dataSourceInstance = this.dataSourceBrowser.findDataSource(dataSourceName);
        var dataMemberName = calculatedField.dataMember();
        var pathInCache = [dataSourceName].concat(dataMemberName ? [dataMemberName] : []);
        this.dataSourceBrowser.clearFieldsCache(pathInCache.join('.'));
        dataSourceInstance.calculatedFields.remove(calculatedField);
        return _jquery_helpers_1.createJQueryDeferred().resolve(calculatedField).promise();
    }
    show(calculatedField, dataSourceName, dataMemberName) {
        var def = _jquery_helpers_1.createJQueryDeferred();
        var pathInCache = [dataSourceName].concat(dataMemberName ? [dataMemberName] : []);
        this.viewModel(new CalcFieldEditorViewModel(calculatedField, this.dataSourceBrowser, dataSourceName, calcField => {
            let dsi = this.dataSourceBrowser.findDataSource(dataSourceName);
            if (dsi && dsi.calculatedFields.indexOf(calcField) === -1) {
                dsi.calculatedFields.push(calcField);
            }
            def.resolve(calcField);
        }, () => this.dataSourceBrowser.clearFieldsCache(pathInCache.join('.'))));
        return def.promise();
    }
}
exports.CalcFieldEditor = CalcFieldEditor;
class CalcFieldEditorViewModel {
    constructor(calculatedField, dataSourceBrowser, dataSourceName, onSave, onBeforeSave) {
        this.toolbarItems = [];
        this.isCalcFieldNameValid = ko.observable(true);
        this.popupVisible = ko.observable(true);
        this.onResize = ko.observable();
        var dataSource = dataSourceBrowser.findDataSource(dataSourceName);
        this.getInfo = () => {
            return [_base_metadata_1.name, _calculated_field_1.calculatedFieldType, _calculated_field_1.calcFieldExpressionEditable];
        };
        this.nameValidationRules = [{
                type: 'required'
            }, {
                type: 'custom',
                validationCallback: (params) => {
                    var previousParams = false;
                    let dataSource = dataSourceBrowser.findDataSource(dataSourceName);
                    let dataMembers = [''];
                    if (dataSource instanceof sql_data_source_1.SqlDataSource) {
                        dataMembers = dataSource.queries().map(dm => dm.name());
                    }
                    else if (dataSource instanceof ef_data_source_1.EFDataSource) {
                        dataMembers = dataSource._tables().map(dm => dm.name());
                    }
                    else if (dataSource instanceof federation_data_source_1.FederationDataSource) {
                        dataMembers = dataSource.queries().map(dm => dm.alias());
                    }
                    else if (dataSource instanceof mongodb_data_source_1.MongoDBDataSource) {
                        dataMembers = dataSource.queries().map(dm => dm._actualName());
                    }
                    let promises = dataMembers.map(dataMember => dataSourceBrowser.findDataField(dataSourceName, dataMember, params.value));
                    _jquery_helpers_1.jqueryWhen(...promises).done((...fields) => {
                        previousParams = true;
                        params.rule.isValid = fields.reduce((result, curField) => { return result && !curField; }, true);
                        params.validator.validate();
                    });
                    if (previousParams)
                        return params.rule.isValid;
                    return false;
                },
                message: _default_1.getLocalizationById('DashboardWebStringId.DataSources.CalculatedField.UniqueNameError')
            }];
        this.calculatedField = calculatedField;
        this.dataMember = ko.observable(calculatedField.dataMember());
        this.fieldType = ko.observable(calculatedField.fieldType());
        this.availableTypes = this.getKeyLocalizationPair(_calculated_field_1.calculatedFieldType.values);
        this.name = ko.observable(calculatedField.name());
        this.expression = ko.observable(calculatedField.expression());
        this.expressionEditable = {
            value: this.expression,
            path: ko.observable(calculatedField.dataMember() ? [dataSourceName, calculatedField.dataMember()].join('.') : dataSourceName),
            fieldName: calculatedField.name,
            patchFieldName: (fieldPath) => _data_source_browser_1.patchCalcFieldPath(dataSource, calculatedField, fieldPath),
            isValid: ko.observable(true),
            customizeCategories: (sender, categories, dblclick) => {
                var treeList = categories[0].content.data.fields().treeListController;
                var putSelectionHandlerBase = treeList.putSelectionHandler;
                treeList.putSelectionHandler = (data, element) => {
                    if (!data.data.isList) {
                        putSelectionHandlerBase.call(treeList, data, element);
                    }
                };
            }
        };
        this.itemsProvider = new _expression_editor_item_provider_1.ExpressionEditorItemsProvider(dataSourceBrowser, dataSourceBrowser, dataSourceBrowser, dataSourceBrowser.parameters && dataSourceBrowser.parameters(), ko.pureComputed(() => dataSourceName), calculatedField.dataMember);
        this.displayNameProvider = _expression_editor_display_name_provider_1.ExpressionEditorDisplayNameProvider.create(dataSourceBrowser, dataSourceBrowser, dataSourceName, calculatedField.dataMember());
        this.saveHandler = ko.observable();
        var saveHandler = (sender) => {
            this.saveHandler()(() => {
                onBeforeSave && onBeforeSave();
                calculatedField.expression(this.expression());
                calculatedField.name(this.name());
                calculatedField.fieldType(this.fieldType());
                onSave && onSave(calculatedField);
                this.popupVisible(false);
            });
        };
        this.toolbarItems = [
            {
                toolbar: 'bottom', location: 'after', widget: 'dxButton', options: {
                    text: _default_1.getLocalizationById('DashboardWebStringId.DashboardMenuSave'),
                    onClick: saveHandler,
                    disabled: ko.computed(() => !this.isCalcFieldNameValid()),
                    type: 'default'
                }
            },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: _default_1.getLocalizationById('DashboardWebStringId.DataSources.Cancel'), onClick: () => this.popupVisible(false) } }
        ];
        this.popupVisible(true);
    }
    resizeAceEditor() {
        if (this.onResize())
            this.onResize()();
    }
    getKeyLocalizationPair(values) {
        return Object.keys(values).map(key => ({ value: key, displayValue: _default_1.getLocalizationById(values[key]) }));
    }
}
exports.CalcFieldEditorViewModel = CalcFieldEditorViewModel;
