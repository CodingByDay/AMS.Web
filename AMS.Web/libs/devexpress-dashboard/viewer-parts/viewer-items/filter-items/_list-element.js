﻿/**
* DevExpress Dashboard (_list-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFilterElement = exports.cssListBoxClassNames = void 0;
const list_1 = require("devextreme/ui/list");
const _filter_element_data_controller_1 = require("../../../data/data-controllers/_filter-element-data-controller");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _base_element_1 = require("./_base-element");
exports.cssListBoxClassNames = {
    borderVisible: 'dx-list-border-visible',
    separatorHidden: 'dx-list-item-separator-hidden',
    list: 'dx-dashboard-list',
    item: 'dx-dashboard-list-item',
    emptyMessage: 'dx-dashboard-empty-message',
};
class listFilterElement extends _base_element_1.filterElementBaseItem {
    constructor(container, options) {
        super(container, options);
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    get filterDataController() { return this._dataController; }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this._lock();
        try {
            this.widget.option('selectedItems', this._getSelection());
        }
        finally {
            this._unlock();
        }
    }
    _clearSelectionUnsafe() {
        if (!!this.options.useNeutralFilterMode) {
            this._lock();
            try {
                this.widget.unselectAll();
            }
            finally {
                this._unlock();
            }
        }
    }
    _generateInnerBorderClassesUnsafe(element) {
        var classes = super._generateInnerBorderClassesUnsafe(element);
        if (!this._isPaneEmpty()) {
            classes.push(exports.cssListBoxClassNames.item);
        }
        if (element) {
            if (this._isPaneEmpty()) {
                element.classList.remove(exports.cssListBoxClassNames.item);
            }
            else {
                element.classList.add(exports.cssListBoxClassNames.item);
            }
        }
        return classes;
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        super.renderContentUnsafe(element, changeExisting, afterRenderCallback);
        let widgetElement = _jquery_helpers_1.$unwrap(this.widget.element());
        widgetElement.classList.add(exports.cssListBoxClassNames.separatorHidden);
        if (this._isPaneEmpty() && this.visualMode !== 'content') {
            widgetElement.classList.add(exports.cssListBoxClassNames.borderVisible);
        }
        else {
            widgetElement.classList.remove(exports.cssListBoxClassNames.borderVisible);
        }
        return false;
    }
    _getWidgetName() {
        return 'dxList';
    }
    _createWidget(div, opts) {
        div.classList.add(exports.cssListBoxClassNames.list, exports.cssListBoxClassNames.emptyMessage);
        return new list_1.default(div, opts);
    }
    _getSelection() {
        return !this.isMultiSelectable && this._dataController.selection.length > 1 ? [this._dataController.selection[0]] : this._dataController.selection;
    }
    _getOptions(includeActions) {
        var that = this;
        return {
            dataSource: that.getDataSource(),
            selectedItems: that._getSelection(),
            showSelectionControls: true,
            focusStateEnabled: false,
            hoverStateEnabled: true,
            keyExpr: _filter_element_data_controller_1.KEY_EXPR,
            searchEnabled: that._enableSearch,
            searchEditorOptions: {
                placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.SearchNullValuePrompt)
            },
            encodeNoDataText: true,
            noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
            selectionMode: that.isMultiSelectable ? 'all' : 'single',
            selectAllMode: 'allPages',
            selectAllText: _localizer_1.ALL_ELEMENT.text,
            pageLoadMode: 'scrollBottom',
            onOptionChanged: (e) => {
                if (e.name == 'searchEnabled')
                    e.component.option('searchValue', undefined);
            },
            onSelectionChanged: !includeActions ? undefined : function (e) {
                if (that.isMultiSelectable && e.removedItems.length > 0) {
                    that._raiseItemClick(e.removedItems);
                }
                else {
                    that._raiseItemClick(e.addedItems);
                }
            }
        };
    }
}
exports.listFilterElement = listFilterElement;
