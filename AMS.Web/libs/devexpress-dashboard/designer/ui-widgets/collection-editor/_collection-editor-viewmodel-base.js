﻿/**
* DevExpress Dashboard (_collection-editor-viewmodel-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionEditorRefreshCallback = exports.CollectionEditorViewModelBase = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
class CollectionEditorViewModelBase {
    constructor(params) {
        this.noDataText = params.noDataText || 'DashboardWebStringId.CollectionEditor.NoItems';
        this.customToolbarItems = params.customToolbarItems;
        this.isToolbarVisible = true;
        this.allowAddItem = false;
        this.allowEditItem = true;
        this.allowReorderItem = false;
        this.allowRemoveItem = false;
        this.addEnabled = ko.observable(false);
        this.editEnabled = ko.observable(false);
        this.upEnabled = ko.observable(false);
        this.downEnabled = ko.observable(false);
        this.removeEnabled = ko.observable(false);
    }
    getListOptions() {
        return {
            activeStateEnabled: false,
            itemTemplate: (itemData, itemIndex, itemElement) => this._itemTemplate(itemData, itemIndex, _jquery_helpers_1.$unwrap(itemElement)),
            noDataText: _default_1.getLocalizationById(this.noDataText),
            encodeNoDataText: true,
            onContentReady: () => this._updateActionsState(),
            onInitialized: (e) => this.listInstance = e.component,
            onItemClick: () => this._itemClickHandler(),
            selectionMode: 'single',
        };
    }
    get selectedValue() {
        return this.listInstance && this.listInstance.option('selectedItems')[0];
    }
    dispose() { }
    _itemTemplate(itemData, itemIndex, itemElement) {
        const div = document.createElement('div');
        div.innerText = this._getDisplayText(itemData);
        div.setAttribute('class', 'dx-list-item-text');
        itemElement.appendChild(div);
    }
    _getDisplayText(itemData) {
        return '';
    }
    _itemClickHandler() {
        if (this._innerSelection !== this.selectedValue) {
            this._onSelectionChanged();
        }
        else {
            if (this.isToolbarVisible && this.allowEditItem && this.editEnabled()) {
                this.edit();
            }
        }
    }
    _listSelectionChanged() { }
    _updateActionsState() { }
    _onSelectionChanged() {
        this._innerSelection = this.selectedValue;
        this._listSelectionChanged();
        this._updateActionsState();
    }
    _setListSelection(selectedItem) {
        this.listInstance.option('selectedItems', selectedItem !== undefined ? [selectedItem] : []);
        this._onSelectionChanged();
    }
}
exports.CollectionEditorViewModelBase = CollectionEditorViewModelBase;
class CollectionEditorRefreshCallback {
    constructor() {
        this.callbacks = [];
        this.refresh = () => this.callbacks.forEach(fn => fn());
        this.subscribe = (fn) => this.callbacks.push(fn);
    }
}
exports.CollectionEditorRefreshCallback = CollectionEditorRefreshCallback;
