﻿/**
* DevExpress Dashboard (_collection-editor-viewmodel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionEditorEditItemArguments = exports.CollectionEditorViewModel = void 0;
const data_source_1 = require("devextreme/data/data_source");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _collection_editor_viewmodel_base_1 = require("./_collection-editor-viewmodel-base");
class CollectionEditorViewModel extends _collection_editor_viewmodel_base_1.CollectionEditorViewModelBase {
    constructor(params, dataSource) {
        super(params);
        this.add = () => {
            const newItem = ko.observable(this.createNewItemHandler());
            if (!!newItem) {
                const addToDataSource = () => {
                    if (this.dataSource.indexOf(newItem()) === -1) {
                        this.dataSource.push(newItem());
                    }
                    this._setListSelection(newItem());
                };
                if (this.editItemHandler) {
                    const args = new CollectionEditorEditItemArguments();
                    this.editItemHandler(newItem(), args, newItem);
                    if (args.createImmediately) {
                        addToDataSource();
                    }
                    else {
                        args.requestRecalculation.add(addToDataSource);
                    }
                }
                else {
                    addToDataSource();
                }
            }
        };
        this.edit = () => this.editItemHandler && this.editItemHandler(this.selectedValue, new CollectionEditorEditItemArguments(), ko.observable(this.selectedValue));
        this.remove = () => this.removeEnabled() && this.removeItemHandler && this.removeItemHandler(this.selectedValue);
        this.up = () => {
            const selection = this.selectedValue;
            !!this.reorderItemsHandler ? this.reorderItemsHandler(selection, 'up') : this._moveSelectedGridRow('up');
            this._setListSelection(selection);
        };
        this.down = () => {
            const selection = this.selectedValue;
            !!this.reorderItemsHandler ? this.reorderItemsHandler(selection, 'down') : this._moveSelectedGridRow('down');
            this._setListSelection(selection);
        };
        this.dataField = params.propertyName;
        this.dataSource = dataSource;
        this.isToolbarVisible = params.isToolbarVisible === undefined || params.isToolbarVisible;
        this.allowAddItem = params.allowAddItem === undefined || params.allowAddItem;
        this.allowReorderItem = params.allowReorderItem === undefined || params.allowReorderItem;
        this.allowRemoveItem = params.allowRemoveItem === undefined || params.allowRemoveItem;
        this.createNewItemHandler = params.createNewItemHandler;
        this.editItemHandler = params.editItemHandler;
        this.reorderItemsHandler = params.reorderItemsHandler;
        this.customToolbarItems = params.customToolbarItems;
        this.visibleItemsFilter = params.visibleItemsFilter || (_ => true);
        this.customTemplate = params.customTemplate;
        this.removeItemHandler = params.removeItemHandler || ((item) => this.dataSource.remove(item));
        this.enableRemoveItem = params.enableRemoveItem || (_ => true);
        this.addEnabled = ko.observable(true);
        this.subscriptions = [this.dataSource.subscribe(() => this._safeReloadDataSource())];
        params.forceRefreshCallback && params.forceRefreshCallback.subscribe(() => this._safeReloadDataSource());
    }
    getListOptions() {
        return Object.assign(Object.assign({}, super.getListOptions()), { dataSource: new data_source_1.default({ load: () => ko.unwrap(this.dataSource).filter(this.visibleItemsFilter) }) });
    }
    _itemTemplate(itemData, itemIndex, itemElement) {
        this.customTemplate ? this.customTemplate(itemData, itemIndex, itemElement) : super._itemTemplate(itemData, itemIndex, itemElement);
    }
    _getDisplayText(itemData) {
        return _default_1.getLocalizationById(ko.unwrap(itemData[this.dataField]));
    }
    _moveSelectedGridRow(direction) {
        const selectedValue = this.selectedValue;
        if (!selectedValue)
            return;
        this.listInstance.beginUpdate();
        const index = this.dataSource().indexOf(selectedValue);
        this.dataSource.splice(index, 1);
        this.dataSource.splice(direction === 'up' ? index - 1 : index + 1, 0, selectedValue);
        this.listInstance.endUpdate();
    }
    _updateActionsState() {
        const selection = this.selectedValue;
        this.removeEnabled(!!selection && this.enableRemoveItem(selection));
        this.editEnabled(!!this.enableEditItem ? this.enableEditItem(selection) : !!selection);
        const selectedRowIndex = this.dataSource.indexOf(selection);
        this.upEnabled(!!selection && selectedRowIndex > 0);
        this.downEnabled(!!selection && selectedRowIndex < this.dataSource().length - 1);
    }
    _safeReloadDataSource() {
        const selection = this.dataSource().some(v => v === this.selectedValue) ? this.selectedValue : undefined;
        if (this.listInstance) {
            this.listInstance.reload();
            selection && this._setListSelection(selection);
        }
    }
    dispose() {
        this.subscriptions && this.subscriptions.forEach(s => s.dispose());
        super.dispose();
    }
}
exports.CollectionEditorViewModel = CollectionEditorViewModel;
class CollectionEditorEditItemArguments {
    constructor() {
        this.requestRecalculation = _jquery_helpers_1.createJQueryCallbacks();
        this.createImmediately = true;
    }
}
exports.CollectionEditorEditItemArguments = CollectionEditorEditItemArguments;
