﻿/**
* DevExpress Dashboard (custom-viewer-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customViewerItem = exports.CustomItemViewer = void 0;
const _common_1 = require("../../data/_common");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _base_item_1 = require("../../viewer-parts/viewer-items/_base-item");
class CustomItemViewer extends _base_item_1.baseItem {
    constructor(model, container, options) {
        super(_jquery_helpers_1.$unwrap(container), options);
        this.iterateData = (action) => {
            this.model.iterateData(action);
        };
        this.canMasterFilter = (row) => {
            if (!this.model._isMasterFilter())
                return false;
            if (!!row) {
                var preparedRow = this._prepareRow(this._getUniqueValues(row));
                if (!_utils_1.allowSelectValue(preparedRow))
                    return false;
            }
            return true;
        };
        this.canDrillDown = (row) => {
            if (!this.model._isDrillDownEnabled() || !this._canPerformDrillDown())
                return false;
            if (!this.model._isMasterFilter())
                return true;
            if (this._canSetMultipleMasterFilter() && this.allowMultiselection)
                return false;
            if (!!row) {
                var values = this._getUniqueValues(row), level = values.length;
                if (level >= this.model.interactivityTargets().length)
                    return false;
                return this.isSelected(row);
            }
            return true;
        };
        this.setMasterFilter = (row) => {
            if (this.model._isMasterFilter()) {
                var selection = [];
                if (!!row) {
                    var preparedRow = this._prepareRow(this._getUniqueValues(row));
                    if (!_utils_1.allowSelectValue(preparedRow))
                        return false;
                    selection.push(preparedRow);
                    if (this._canSetMultipleMasterFilter() && this.allowMultiselection) {
                        var currentSelection = this.model._actualSelectionValues() || [];
                        if (_utils_1.arrayContains(currentSelection, preparedRow))
                            selection = currentSelection.filter(row => !_utils_1.arrayEquals(row, preparedRow));
                        else
                            selection = currentSelection.concat(selection);
                    }
                }
                var name = this.model.componentName();
                if (selection.length > 0) {
                    let action = this._canSetMultipleMasterFilter() ? _common_1.viewerActions.setMultipleValuesMasterFilter : _common_1.viewerActions.setMasterFilter;
                    this.selected.fire(name, action, selection);
                }
                else {
                    this.clearMasterFilter.fire(name);
                }
                return true;
            }
            return false;
        };
        this.drillDown = (row) => {
            if (this.model._isDrillDownEnabled() && this._canPerformDrillDown()) {
                var values = this._getUniqueValues(row);
                var level = values.length;
                if (level < this.model.interactivityTargets().length) {
                    this.selected.fire(this.model.componentName(), _common_1.viewerActions.drillDown, this._prepareRow(values));
                    return true;
                }
            }
            return false;
        };
        this.model = model;
    }
    contentWidth() {
        return _jquery_helpers_1.getWidth(this.contentRoot);
    }
    contentHeight() {
        return _jquery_helpers_1.getHeight(this.contentRoot);
    }
    setSize(width, height) {
        super.setSize(width, height);
    }
    _renderContent(element, changeExisting, afterRenderCallback) {
        this.renderContent(_jquery_helpers_1.wrapPublicElement(element), changeExisting, afterRenderCallback);
        return false;
    }
    renderContent(element, changeExisting, afterRenderCallback) {
    }
    dispose() {
        super.dispose();
    }
    clearSelection() {
        super.clearSelection();
    }
    setSelection(values) {
        super.setSelection(values);
    }
    allowExportSingleItem() {
        return false;
    }
    getExportInfo() {
        return null;
    }
    getMasterFilterMode() {
        return this.model._masterFilterMode();
    }
    getBindingValue(propertyName, index) {
        return this.model.getBindingValue(propertyName, index);
    }
    getPropertyValue(propertyName) {
        return this.model.customProperties.getValue(propertyName);
    }
    subscribe(propertyName, callback) {
        return this.model.customProperties[propertyName].subscribe(callback);
    }
    isSelected(row) {
        var actualSelectionValues = this.model._actualSelectionValues();
        return actualSelectionValues && _utils_1.arrayContains(actualSelectionValues, this._prepareRow(this._getUniqueValues(row)));
    }
    getInfo() {
        var info = super.getInfo(), exportInfo = this.getExportInfo();
        return exportInfo ? _jquery_helpers_1.deepExtend(info, {
            customItemExportInfo: exportInfo
        }) : info;
    }
    initializeData(newOptions) {
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        this.initializeData(newOptions);
        if (this.options) {
            this.options.allowExport = this.options.allowExport && this.allowExportSingleItem();
        }
    }
    _prepareRow(row) {
        if (this.model._isDrillDownEnabled() && (this._canPerformDrillDown() || this._canPerformDrillUp()))
            return [row[row.length - 1]];
        return row;
    }
    _getUniqueValues(row) {
        var res = [];
        this.model.customBindings.filter(binding => binding.enableInteractivity).forEach(binding => {
            var current = row.getUniqueValue(binding.propertyName);
            if (current) {
                res = res.concat(current);
            }
        });
        return res;
    }
    _isSupportDataAwareExport() {
        return true;
    }
}
exports.CustomItemViewer = CustomItemViewer;
class customViewerItem extends CustomItemViewer {
}
exports.customViewerItem = customViewerItem;
