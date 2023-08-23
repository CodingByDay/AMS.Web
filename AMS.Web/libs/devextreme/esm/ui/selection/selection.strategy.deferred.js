/**
 * DevExtreme (esm/ui/selection/selection.strategy.deferred.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isString
} from "../../core/utils/type";
import SelectionStrategy from "./selection.strategy";
import errors from "../widget/ui.errors";
import dataQuery from "../../data/query";
import {
    Deferred
} from "../../core/utils/deferred";
export default class DeferredStrategy extends SelectionStrategy {
    getSelectedItems() {
        return this._loadFilteredData(this.options.selectionFilter)
    }
    getSelectedItemKeys() {
        var d = new Deferred;
        var that = this;
        var key = this.options.key();
        var select = isString(key) ? [key] : key;
        this._loadFilteredData(this.options.selectionFilter, null, select).done((function(items) {
            var keys = items.map((function(item) {
                return that.options.keyOf(item)
            }));
            d.resolve(keys)
        })).fail(d.reject);
        return d.promise()
    }
    selectedItemKeys(keys, preserve, isDeselect, isSelectAll) {
        if (isSelectAll) {
            var filter = this.options.filter();
            var needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
            if (needResetSelectionFilter) {
                this._setOption("selectionFilter", isDeselect ? [] : null)
            } else {
                this._addSelectionFilter(isDeselect, filter, isSelectAll)
            }
        } else {
            if (!preserve) {
                this._setOption("selectionFilter", [])
            }
            for (var i = 0; i < keys.length; i++) {
                if (isDeselect) {
                    this.removeSelectedItem(keys[i])
                } else {
                    this.addSelectedItem(keys[i], isSelectAll, !preserve)
                }
            }
        }
        this.onSelectionChanged();
        return (new Deferred).resolve()
    }
    setSelectedItems(keys) {
        this._setOption("selectionFilter", null);
        for (var i = 0; i < keys.length; i++) {
            this.addSelectedItem(keys[i])
        }
    }
    isItemDataSelected(itemData) {
        return this.isItemKeySelected(itemData)
    }
    isItemKeySelected(itemData) {
        var selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        return !!dataQuery([itemData]).filter(selectionFilter).toArray().length
    }
    _getKeyExpr() {
        var keyField = this.options.key();
        if (Array.isArray(keyField) && 1 === keyField.length) {
            return keyField[0]
        }
        return keyField
    }
    _normalizeKey(key) {
        var keyExpr = this.options.key();
        if (Array.isArray(keyExpr) && 1 === keyExpr.length) {
            return key[keyExpr[0]]
        }
        return key
    }
    _getFilterByKey(key) {
        var keyField = this._getKeyExpr();
        var filter = [keyField, "=", this._normalizeKey(key)];
        if (Array.isArray(keyField)) {
            filter = [];
            for (var i = 0; i < keyField.length; i++) {
                filter.push([keyField[i], "=", key[keyField[i]]]);
                if (i !== keyField.length - 1) {
                    filter.push("and")
                }
            }
        }
        return filter
    }
    addSelectedItem(key, isSelectAll, skipFilter) {
        var filter = this._getFilterByKey(key);
        this._addSelectionFilter(false, filter, isSelectAll, skipFilter)
    }
    removeSelectedItem(key) {
        var filter = this._getFilterByKey(key);
        this._addSelectionFilter(true, filter)
    }
    validate() {
        var key = this.options.key;
        if (key && void 0 === key()) {
            throw errors.Error("E1042", "Deferred selection")
        }
    }
    _findSubFilter(selectionFilter, filter) {
        if (!selectionFilter) {
            return -1
        }
        var filterString = JSON.stringify(filter);
        for (var index = 0; index < selectionFilter.length; index++) {
            var subFilter = selectionFilter[index];
            if (subFilter && JSON.stringify(subFilter) === filterString) {
                return index
            }
        }
        return -1
    }
    _isLastSubFilter(selectionFilter, filter) {
        if (selectionFilter && filter) {
            return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || 0 === this._findSubFilter([selectionFilter], filter)
        }
        return false
    }
    _addFilterOperator(selectionFilter, filterOperator) {
        if (selectionFilter.length > 1 && isString(selectionFilter[1]) && selectionFilter[1] !== filterOperator) {
            selectionFilter = [selectionFilter]
        }
        if (selectionFilter.length) {
            selectionFilter.push(filterOperator)
        }
        return selectionFilter
    }
    _denormalizeFilter(filter) {
        if (filter && isString(filter[0])) {
            filter = [filter]
        }
        return filter
    }
    _isOnlyNegativeFiltersLeft(filters) {
        return filters.every((filterItem, i) => {
            if (i % 2 === 0) {
                return Array.isArray(filterItem) && "!" === filterItem[0]
            } else {
                return "and" === filterItem
            }
        })
    }
    _addSelectionFilter(isDeselect, filter, isSelectAll, skipFilter) {
        var _selectionFilter;
        var currentFilter = isDeselect ? ["!", filter] : filter;
        var currentOperation = isDeselect ? "and" : "or";
        var needAddFilter = true;
        var selectionFilter = this.options.selectionFilter || [];
        selectionFilter = this._denormalizeFilter(selectionFilter);
        if (null !== (_selectionFilter = selectionFilter) && void 0 !== _selectionFilter && _selectionFilter.length && !skipFilter) {
            var removedIndex = this._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
            var filterIndex = this._removeSameFilter(selectionFilter, filter, !isDeselect);
            var shouldCleanFilter = isDeselect && (-1 !== removedIndex || -1 !== filterIndex) && this._isOnlyNegativeFiltersLeft(selectionFilter);
            if (shouldCleanFilter) {
                selectionFilter = []
            }
            var isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
            needAddFilter = filter.length && !isKeyOperatorsAfterRemoved
        }
        if (needAddFilter) {
            selectionFilter = this._addFilterOperator(selectionFilter, currentOperation);
            selectionFilter.push(currentFilter)
        }
        selectionFilter = this._normalizeFilter(selectionFilter);
        this._setOption("selectionFilter", !isDeselect && !selectionFilter.length ? null : selectionFilter)
    }
    _normalizeFilter(filter) {
        if (filter && 1 === filter.length) {
            filter = filter[0]
        }
        return filter
    }
    _removeFilterByIndex(filter, filterIndex, isSelectAll) {
        var operation = filter[1];
        if (filterIndex > 0) {
            filter.splice(filterIndex - 1, 2)
        } else {
            filter.splice(filterIndex, 2)
        }
        if (isSelectAll && "and" === operation) {
            filter.splice(0, filter.length)
        }
    }
    _isSimpleKeyFilter(filter, key) {
        return 3 === filter.length && filter[0] === key && "=" === filter[1]
    }
    _isKeyFilter(filter) {
        if (2 === filter.length && "!" === filter[0]) {
            return this._isKeyFilter(filter[1])
        }
        var keyField = this._getKeyExpr();
        if (Array.isArray(keyField)) {
            if (filter.length !== 2 * keyField.length - 1) {
                return false
            }
            for (var i = 0; i < keyField.length; i++) {
                if (i > 0 && "and" !== filter[2 * i - 1]) {
                    return false
                }
                if (!this._isSimpleKeyFilter(filter[2 * i], keyField[i])) {
                    return false
                }
            }
            return true
        }
        return this._isSimpleKeyFilter(filter, keyField)
    }
    _hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex) {
        if (filterIndex >= 0) {
            for (var i = filterIndex; i < selectionFilter.length; i++) {
                if ("string" !== typeof selectionFilter[i] && !this._isKeyFilter(selectionFilter[i])) {
                    return false
                }
            }
            return true
        }
        return false
    }
    _removeSameFilter(selectionFilter, filter, inverted, isSelectAll) {
        filter = inverted ? ["!", filter] : filter;
        if (JSON.stringify(filter) === JSON.stringify(selectionFilter)) {
            selectionFilter.splice(0, selectionFilter.length);
            return 0
        }
        var filterIndex = this._findSubFilter(selectionFilter, filter);
        if (filterIndex >= 0) {
            this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
            return filterIndex
        } else {
            for (var i = 0; i < selectionFilter.length; i++) {
                if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
                    var _filterIndex = this._removeSameFilter(selectionFilter[i], filter, false, isSelectAll);
                    if (_filterIndex >= 0) {
                        if (!selectionFilter[i].length) {
                            this._removeFilterByIndex(selectionFilter, i, isSelectAll)
                        } else if (1 === selectionFilter[i].length) {
                            selectionFilter[i] = selectionFilter[i][0]
                        }
                        return _filterIndex
                    }
                }
            }
            return -1
        }
    }
    getSelectAllState() {
        var filter = this.options.filter();
        var selectionFilter = this.options.selectionFilter;
        if (!selectionFilter) {
            return true
        }
        if (!selectionFilter.length) {
            return false
        }
        if (!filter || !filter.length) {
            return
        }
        selectionFilter = this._denormalizeFilter(selectionFilter);
        if (this._isLastSubFilter(selectionFilter, filter)) {
            return true
        }
        if (this._isLastSubFilter(selectionFilter, ["!", filter])) {
            return false
        }
        return
    }
    loadSelectedItemsWithFilter() {
        var componentFilter = this.options.filter();
        var selectionFilter = this.options.selectionFilter;
        var filter = componentFilter ? [componentFilter, "and", selectionFilter] : selectionFilter;
        return this._loadFilteredData(filter)
    }
}
