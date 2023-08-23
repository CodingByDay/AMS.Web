﻿/**
* DevExpress Dashboard (filter-element-item-base.js)
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
exports.FilterElementItemBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _hashset_wrapper_1 = require("../../../data/_hashset-wrapper");
const _utils_1 = require("../../../data/_utils");
const data_item_1 = require("../../data-item/data-item");
const _knockout_utils_1 = require("../../internal/_knockout-utils");
const _utils_2 = require("../../internal/_utils");
const data_dashboard_item_1 = require("../data-dashboard-item");
const _filter_element_item_base_1 = require("./metadata/_filter-element-item-base");
class FilterElementItemBase extends data_dashboard_item_1.DataDashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.__filterDimensions = ko.observableArray([]);
        this.filterDimensions = ko.observableArray([]);
        this._unselectedValues = ko.observable();
        this._isExcludingAllFilter = ko.computed(() => {
            if (!!this._useNeutralFilterMode())
                return false;
            var selectionValues = this._selectionValues();
            return this._dataManager() && selectionValues && selectionValues.length === 0;
        });
        _knockout_utils_1.subscribeArrayChange(this.__filterDimensions, {
            added: link => link._specifics.supportsTopNOther = false,
            deleted: link => link._specifics.supportsTopNOther = true
        });
        this.__filterDimensions(analytics_utils_1.deserializeArray(dashboardItemJSON.FilterDimensions, (item) => {
            var link = new data_item_1.DataItemLink(this, item, serializer);
            link._specifics.supportsTopNOther = false;
            return link;
        })());
        this._subscribeDataItemLinkArrays(_filter_element_item_base_1.filterDimensions);
    }
    get _supportParallelRequests() {
        return false;
    }
    get _useCriteriaOptimization() {
        return !this.filterString()
            && this.interactivityOptions.ignoreMasterFilters()
            && !this.isMasterFilterCrossDataSource()
            && !this._interactivityDimensions.some(d => d.topNOptionsEnabled());
    }
    _clearBindings() {
        super._clearBindings();
        this.__filterDimensions.removeAll();
    }
    _getInfoCore() {
        return _filter_element_item_base_1.filterElementItemBaseSerializationInfo;
    }
    _isCalculationSupported() {
        return false;
    }
    _getInteractivityDimensionLinks() { return this.__filterDimensions(); }
    _getMasterFilterMode() { return !this._useNeutralFilterMode() || (!!this._useNeutralFilterMode() && this._isMultiselectable()) ? 'Multiple' : 'Single'; }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getClearMasterFilterSupported() { return !!this._useNeutralFilterMode(); }
    _getIsMasterFilter() { return true; }
    _getIsVisualInteractivitySupported() { return false; }
    _isMultiselectable() { return false; }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        content.ViewModel.EnableSearch = this.enableSearch();
    }
    _performOutputFilterOptimization(filter) {
        if (this.__filterDimensions && filter && !!filter.values && this._useCriteriaOptimization) {
            var allselectionValues = this._getAllSelectionValues(this._interactivityDimensions.map(d => d.uniqueName()));
            if (filter.values.length === allselectionValues.length) {
                return undefined;
            }
        }
        if (!!this._dataQueryParams.peek()
            && !!this._dataQueryParams.peek().Filter
            && this._dataQueryParams.peek().Filter.some(externalFilter => externalFilter.isExcludingAllFilter)) {
            return undefined;
        }
        return filter;
    }
    _validateSelectionByData(origSelection) {
        let selection = origSelection;
        if (!this._interactivityDimensions.length)
            return;
        var allValues = this._getAllSelectionValues(this._interactivityDimensions.map(d => d.uniqueName()));
        if (this._isMultiselectable() && !this._useNeutralFilterMode() && !Array.isArray(this._unselectedValues())) {
            this._unselectedValues([]);
            if (Array.isArray(selection)) {
                this._updateUnselectedValues(selection, allValues);
            }
        }
        if (this._isMultipleMasterFilter() && this._useNeutralFilterMode() && selection && this._useCriteriaOptimization && allValues.length) {
            const hashSet = new _hashset_wrapper_1.HashsetWrapper(allValues);
            selection = [];
            origSelection.forEach(val => hashSet.contains(val) && selection.push(val));
        }
        this._setSelectionData(this._correctSelectionValues(allValues, selection || []), this._useCriteriaOptimization && this._useNeutralFilterMode());
    }
    _setSelectionData(selection, forceSetSelection = false) {
        if (!this._useNeutralFilterMode() && this._multiData) {
            var currentSelection = this._selectionValues();
            if (this._isMultiselectable() && !!currentSelection && this._unselectedValues()) {
                this._updateUnselectedValues(selection, currentSelection);
            }
            if (!!selection) {
                var hashset = new _hashset_wrapper_1.HashsetWrapper(selection);
                var allValues = this._getAllSelectionValues(this._interactivityDimensions.map(d => d.uniqueName()));
                selection = hashset.getIntersection(allValues);
            }
        }
        super._setSelectionData(selection, forceSetSelection);
    }
    _correctSelectionValues(allValues, currentSelection) {
        if (this._isMultiselectable() && !this._useNeutralFilterMode()) {
            var unknownSelection = allValues
                .filter(x => !this._arrayContains(currentSelection, x) && !this._arrayContains(this._unselectedValues(), x));
            return currentSelection.concat(unknownSelection);
        }
        else if (!this._isMultiselectable()) {
            if (!!this._useNeutralFilterMode()) {
                if (currentSelection.length !== 1) {
                    return this._allowAllValue() || allValues.length == 0 ? null : [allValues[0]];
                }
            }
            else {
                if (currentSelection.length !== 1 || !this._arrayContains(allValues, currentSelection[0])) {
                    return this._allowAllValue() ? allValues : [allValues[0]];
                }
            }
        }
        return currentSelection;
    }
    _updateUnselectedValues(newSelection, currentSelection) {
        if (!newSelection || newSelection.length === 0) {
            currentSelection.forEach(x => this._unselectedValues().push(x.slice()));
        }
        else {
            let hashset = new _hashset_wrapper_1.HashsetWrapper(newSelection);
            let unselectedCount = this._unselectedValues().length;
            for (let i = unselectedCount - 1; i >= 0; i--) {
                if (hashset.contains(this._unselectedValues()[i])) {
                    this._unselectedValues().splice(i, 1);
                }
            }
            currentSelection.forEach(x => {
                if (!hashset.contains(x)) {
                    this._unselectedValues().push(x.slice());
                }
            });
        }
    }
    _arrayContains(container, part) {
        return _utils_1.arrayContains(container, part);
    }
}
__decorate([
    _utils_2.collectionItemType('Dimension')
], FilterElementItemBase.prototype, "__filterDimensions", void 0);
exports.FilterElementItemBase = FilterElementItemBase;
