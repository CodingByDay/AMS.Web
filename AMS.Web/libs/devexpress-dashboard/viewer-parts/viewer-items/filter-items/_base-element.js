﻿/**
* DevExpress Dashboard (_base-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterElementBaseItem = void 0;
const array_store_1 = require("devextreme/data/array_store");
const data_source_1 = require("devextreme/data/data_source");
const _filter_element_data_controller_1 = require("../../../data/data-controllers/_filter-element-data-controller");
const _base_item_1 = require("../_base-item");
const _interactivity_controller_1 = require("../_interactivity-controller");
var PAGE_SIZE = 100;
class filterElementBaseItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    dispose() {
        super.dispose();
        this.widget && this.widget.dispose();
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this.filterDataController.update(values, this._isEncodeHtml(), true);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var opts = this._getOptions(true);
        this._raiseItemWidgetOptionsPrepared(opts);
        this._lock();
        try {
            if (changeExisting && this.widget && this.widget.NAME === this._getWidgetName()) {
                this.widget.option(opts);
            }
            else {
                var div = this._createWidgetDiv();
                element.innerHTML = '';
                element.appendChild(div);
                this.widget = this._createWidget(div, opts);
            }
        }
        finally {
            this._unlock();
        }
        return false;
    }
    _createWidgetDiv() {
        return document.createElement('div');
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (this.options) {
            this.options.allowExport = false;
        }
    }
    get allowMultiselection() {
        return true;
    }
    set allowMultiselection(value) {
    }
    get isMultiSelectable() {
        return this.dataController ? this.dataController.isMultiselectable() : false;
    }
    _isPaneEmpty() {
        return super._isPaneEmpty() || !this.hasCaption();
    }
    updateInteractivityOptions() {
        this.interactivityController.setOptions(this.isMultiSelectable ? _interactivity_controller_1.dashboardSelectionMode.multiple : _interactivity_controller_1.dashboardSelectionMode.single);
        this.interactivityController._allowSelectTuple = function (tuple) { return true; };
    }
    getDataSource() {
        return new data_source_1.default({
            paginate: true,
            pageSize: PAGE_SIZE,
            requireTotalCount: true,
            store: new array_store_1.default({
                data: this.filterDataController.dataSource,
                key: _filter_element_data_controller_1.KEY_EXPR
            }),
            searchOperation: 'contains',
            searchExpr: this._getDisplayExpr()
        });
    }
    get _enableSearch() {
        return !!this.options && !!this.options.ViewModel && this.options.ViewModel.EnableSearch;
    }
    get _isBottomFloatingToolbarPosition() {
        return true;
    }
    _isBorderRequired() {
        return false;
    }
    _getDisplayExpr() {
        return this._isEncodeHtml() ? 'text' : 'html';
    }
    _getOptions(includeActions) {
        return {};
    }
    _hasToggleSelectionModeButton() {
        return false;
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        if (this.widget.updateDimensions) {
            this.widget.updateDimensions();
        }
    }
    _raiseItemClick(elements) {
        if (this._isLocked()) {
            return;
        }
        var axisName = this._getAxisNames()[0], newSelectedValues = this.filterDataController.getInteractionValues(elements, this._getSelectedValues()), tuples = !newSelectedValues ? null : newSelectedValues.map(v => [{ axisName: axisName, value: v }]);
        this.interactivityController.clickAction(tuples, !newSelectedValues);
    }
    _mustSelectingFired(values) {
        return true;
    }
    _isUpdating(widget) {
        return !widget || widget._updateLockCount > 0;
    }
    _applySelectionUnsafe() {
        var selectedValues = this._getSelectedValues();
        if (!!selectedValues) {
            this.setSelection(selectedValues);
        }
    }
    _selectTuples(tuplesToSelect, unaffectedTuples, isSelect) {
    }
    _getWidget() {
        return this.widget;
    }
    _getWidgetName() {
        return '';
    }
    _createWidget(div, opts) {
        return null;
    }
}
exports.filterElementBaseItem = filterElementBaseItem;
