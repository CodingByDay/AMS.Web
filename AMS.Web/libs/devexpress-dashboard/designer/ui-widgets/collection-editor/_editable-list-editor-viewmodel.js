﻿/**
* DevExpress Dashboard (_editable-list-editor-viewmodel.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditableListEditorViewModel = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _collection_editor_viewmodel_base_1 = require("./_collection-editor-viewmodel-base");
class EditableListEditorViewModel extends _collection_editor_viewmodel_base_1.CollectionEditorViewModelBase {
    constructor(params, selectedItem) {
        super(params);
        this.edit = () => this.editItemHandler && this.editItemHandler(this.selectedValue);
        this.dataField = params.propertyName;
        this.dataSource = params.dataSource;
        this.getDisplayText = params.getDisplayText;
        this.enableEditItem = params.enableEditItem;
        this.editItemHandler = params.editItemHandler;
        this.selectedItem = selectedItem;
        this.onSelectionChanged = params.onSelectionChanged;
        this.isToolbarVisible = true;
        this.allowEditItem = true;
    }
    getListOptions() {
        this._innerSelection = ko.unwrap(this.selectedItem);
        return Object.assign(Object.assign({}, super.getListOptions()), { dataSource: this.dataSource, selectedItems: [this._innerSelection] });
    }
    _getDisplayText(itemData) {
        return this.getDisplayText ? this.getDisplayText(itemData) : _default_1.getLocalizationById(ko.unwrap(itemData[this.dataField]));
    }
    _listSelectionChanged() {
        this.selectedItem && this.selectedItem(this.selectedValue);
        this.onSelectionChanged && this.onSelectionChanged(this.selectedValue);
    }
    _updateActionsState() {
        const selection = this.selectedValue;
        this.editEnabled(!!this.enableEditItem ? this.enableEditItem(selection) : !!selection);
    }
}
exports.EditableListEditorViewModel = EditableListEditorViewModel;
