﻿/**
* DevExpress Dashboard (_inline-edit-collection-editor-viewmodel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InlineEditCollectionEditorViewModel = void 0;
const data_source_1 = require("devextreme/data/data_source");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _default_1 = require("../../../data/localization/_default");
class GridDataSourceMapper {
    constructor(dataFields) {
        this.dataFields = dataFields;
        this.gridDataSourceKeyCache = [];
    }
    mapDataSource(srcData) {
        const updatedCache = [];
        let latestCacheItemKey = this.gridDataSourceKeyCache
            .reduce((acc, item) => {
            return item && item.key > acc ? item.key : acc;
        }, 0);
        const data = ko.unwrap(srcData)
            .map(dataSourceItem => {
            let cacheItem = this.gridDataSourceKeyCache
                .filter(cacheItem => cacheItem.objRef === dataSourceItem)[0];
            if (!cacheItem) {
                cacheItem = {
                    key: ++latestCacheItemKey,
                    objRef: dataSourceItem,
                };
            }
            updatedCache.push(cacheItem);
            return this.dataFields.reduce((acc, field) => {
                acc[field] = cacheItem.objRef && ko.unwrap(cacheItem.objRef[field]);
                return acc;
            }, { keyField: cacheItem.key });
        });
        this.gridDataSourceKeyCache = updatedCache;
        return data;
    }
    updateDataSourceItem(key, newValues) {
        const cacheItem = this.gridDataSourceKeyCache
            .filter(cacheItem => cacheItem.key === key)[0];
        const container = cacheItem && cacheItem.objRef;
        if (container) {
            this.dataFields.forEach(field => {
                newValues.hasOwnProperty(field) && ko.isWritableObservable(container[field]) && container[field](newValues[field]);
            });
        }
    }
    getObjectByKey(key) {
        const cacheItem = this.gridDataSourceKeyCache
            .filter(item => item.key === key)[0];
        return cacheItem && cacheItem.objRef;
    }
    getKeyByObject(obj) {
        const cacheItem = this.gridDataSourceKeyCache
            .filter(item => item.objRef === obj)[0];
        return cacheItem && cacheItem.key;
    }
}
class InlineEditCollectionEditorViewModel {
    constructor(params, dataSource) {
        this.add = () => this._addNewItemRow();
        this.remove = () => this.dataSource.remove(this.selectedValue);
        this.down = () => this.downEnabled() && this._moveSelectedGridRow('down');
        this.up = () => this.upEnabled() && this._moveSelectedGridRow('up');
        this.dataFields = params.dataFields;
        this.dataSource = dataSource;
        this.noDataText = _default_1.getLocalizationById(params.noDataText);
        this.gridColumns = params.gridColumns;
        this.createNewItemHandler = params.createNewItemHandler;
        this.customizeInlineEditor = params.customizeInlineEditor;
        this.customizeCell = params.customizeCell;
        this.enableAddItem = params.enableAddItem;
        this.enableRemoveItem = params.enableRemoveItem;
        this.enableEditItem = params.enableEditItem;
        this.isToolbarVisible = params.isToolbarVisible === undefined || params.isToolbarVisible;
        this.allowAddItem = params.allowAddItem === undefined || params.allowAddItem;
        this.allowRemoveItem = params.allowRemoveItem === undefined || params.allowRemoveItem;
        this.allowReorderItem = params.allowReorderItem === undefined || params.allowReorderItem;
        this.addEnabled = ko.observable(true);
        this.removeEnabled = ko.observable(false);
        this.upEnabled = ko.observable(false);
        this.downEnabled = ko.observable(false);
        this.dataSourceMapper = new GridDataSourceMapper(this.dataFields);
        params.forceRefreshCallback && params.forceRefreshCallback.subscribe(() => this.gridInstance && this.gridInstance.refresh());
    }
    getGridOptions() {
        const gridDataSource = new data_source_1.default({
            loadMode: 'raw',
            key: 'keyField',
            load: () => {
                return this.dataSourceMapper.mapDataSource(this.dataSource);
            },
            update: (key, values) => {
                this.dataSourceMapper.updateDataSourceItem(key, values);
                return _jquery_helpers_1.$promiseAdapter(_jquery_helpers_1.createJQueryDeferred().resolve().promise());
            },
            insert: (newRow) => {
                const newDataSourceItem = this.createNewItemHandler();
                if (newDataSourceItem) {
                    this.dataFields.forEach(field => newDataSourceItem[field](ko.unwrap(newRow[field])));
                    this.dataSource.push(newDataSourceItem);
                }
                return _jquery_helpers_1.$promiseAdapter(_jquery_helpers_1.createJQueryDeferred().resolve(newDataSourceItem).promise());
            },
        });
        this.dataSourceSubscription = this.dataSource.subscribe(() => this.gridInstance.refresh());
        const dataGridOptions = {
            onInitialized: (e) => this.gridInstance = e.component,
            dataSource: gridDataSource,
            remoteOperations: false,
            showColumnHeaders: false,
            noDataText: this.noDataText,
            showColumnLines: false,
            showRowLines: true,
            loadPanel: {
                enabled: false,
            },
            paging: {
                enabled: false
            },
            selection: {
                mode: 'single'
            },
            columns: !!this.gridColumns ? this.gridColumns : this.dataFields,
            editing: {
                allowUpdating: true,
                mode: 'cell',
                startEditAction: 'dblClick',
            },
            onCellClick: (e) => {
                if (e.row && e.row.isSelected) {
                    this.gridInstance.editCell(e.rowIndex, e.columnIndex);
                }
            },
            onCellPrepared: this.customizeCell,
            onEditingStart: (e) => e.cancel = this.enableEditItem && !this.enableEditItem(this.selectedValue, e),
            onSelectionChanged: (e) => this._updateActionsState(),
            onContentReady: (e) => this._updateActionsState(),
            onEditorPreparing: (e) => this.customizeInlineEditor && this.customizeInlineEditor(e),
        };
        return dataGridOptions;
    }
    get selectedValue() {
        const selectedKey = this.gridInstance && this.gridInstance.getSelectedRowKeys()[0];
        return this.dataSourceMapper.getObjectByKey(selectedKey);
    }
    dispose() {
        this.dataSourceSubscription && this.dataSourceSubscription.dispose();
    }
    _addNewItemRow() {
        let insertedObject;
        if (this.gridInstance.hasEditData())
            this.gridInstance.saveEditData();
        this.gridInstance.beginUpdate();
        const newObject = this.createNewItemHandler();
        this.gridInstance
            .getDataSource()
            .store()
            .insert(this.dataFields
            .reduce((acc, field) => {
            acc[field] = newObject[field];
            return acc;
        }, {}))
            .then(obj => insertedObject = obj);
        this.gridInstance.endUpdate();
        this.gridInstance.refresh().then(() => {
            setTimeout(() => {
                const rowKey = this.dataSourceMapper.getKeyByObject(insertedObject);
                if (rowKey) {
                    const rowIndex = this.gridInstance.getRowIndexByKey(rowKey);
                    this.gridInstance.focus(this.gridInstance.getCellElement(rowIndex, 0));
                    this.gridInstance.editCell(rowIndex, 0);
                }
            }, 1);
        });
    }
    _moveSelectedGridRow(direction) {
        const selectedValue = this.selectedValue;
        if (!selectedValue)
            return;
        this.gridInstance.beginUpdate();
        const index = this.dataSource().indexOf(selectedValue);
        this.dataSource.splice(index, 1);
        this.dataSource.splice(direction === 'up' ? index - 1 : index + 1, 0, selectedValue);
        this.gridInstance.endUpdate();
    }
    _updateActionsState() {
        this.addEnabled(!!this.enableAddItem ? this.enableAddItem(this.selectedValue) : true);
        this.removeEnabled(!!this.enableRemoveItem ? this.enableRemoveItem(this.selectedValue) : !!this.selectedValue);
        const selectedRowIndex = this.dataSource.indexOf(this.selectedValue);
        this.upEnabled(this.selectedValue && selectedRowIndex > 0);
        this.downEnabled(this.selectedValue && selectedRowIndex < this.gridInstance.getDataSource().totalCount() - 1);
    }
}
exports.InlineEditCollectionEditorViewModel = InlineEditCollectionEditorViewModel;
