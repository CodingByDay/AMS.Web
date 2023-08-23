﻿/**
* DevExpress Dashboard (_filter-element-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeViewDataController = exports.listViewDataController = exports.filterElementDataController = exports.KEY_EXPR = exports.VALUE_EXPR = void 0;
const legacy_settings_1 = require("../../viewer-parts/legacy-settings");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const special_values_1 = require("../special-values");
const _hashset_wrapper_1 = require("../_hashset-wrapper");
const _localizer_1 = require("../_localizer");
const _utils_1 = require("../_utils");
const _data_controller_base_1 = require("./_data-controller-base");
exports.VALUE_EXPR = 'value';
exports.KEY_EXPR = 'key';
class filterElementDataController extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
        this._reset();
    }
    getAllItemIndex() {
        return this.dataSource ? this.dataSource.indexOf(_localizer_1.ALL_ELEMENT) : -1;
    }
    getDataSourceItemKey(item) {
        return item[exports.KEY_EXPR];
    }
    getDataSourceItemByKey(key) {
        return this.dataSource.filter(item => item[exports.KEY_EXPR] === key)[0];
    }
    isAllSelected() {
        return this.dataSource && this.selection ? (this.dataSource.length === this.selection.length) : false;
    }
    update(selectedValues, encodeHtml, selectionOnly = false) {
        this._reset(selectionOnly);
        var hashset = new _hashset_wrapper_1.HashsetWrapper(selectedValues || []);
        var key = 0, applySelection = (dataItem) => {
            if (hashset.contains(dataItem[exports.VALUE_EXPR])) {
                this.selection.push(dataItem);
            }
            this.fullSelection.push(dataItem);
        }, hasAllElement = this.viewModel && this.viewModel.ShowAllValue && !this.isMultiselectable() && !this.useNeutralFilterMode, points = this.multiData ? this.multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.defaultAxis).getPoints(true) : [];
        if (selectionOnly) {
            this.dataSource.forEach(dataItem => applySelection(dataItem));
        }
        else {
            if (hasAllElement && points.length > 0) {
                this.dataSource.push(_localizer_1.ALL_ELEMENT);
            }
            points.forEach(point => {
                let dataItem = {
                    [exports.KEY_EXPR]: key++,
                    [exports.VALUE_EXPR]: point.getUniquePath()
                };
                if (encodeHtml) {
                    dataItem.text = this.getTitle(point, ', ', true);
                }
                else {
                    dataItem.html = this.getTitle(point, ', ', true);
                }
                this.dataSource.push(dataItem);
                applySelection(dataItem);
            });
        }
        if (hasAllElement && ((!this.useNeutralFilterMode && this.dataSource.length - 1 === this.selection.length) || (!!this.useNeutralFilterMode && !this.selection.length))) {
            this.selection.splice(0, 0, _localizer_1.ALL_ELEMENT);
            this.fullSelection.splice(0, 0, _localizer_1.ALL_ELEMENT);
        }
    }
    getInteractionValues(elements, selectedValues) {
        var hasAll = !this.isMultiselectable() && elements && elements.indexOf(_localizer_1.ALL_ELEMENT) !== -1;
        if (!!this.useNeutralFilterMode && hasAll)
            return null;
        var values = [], items = hasAll ? this.dataSource : elements;
        items.forEach(item => {
            if (item !== _localizer_1.ALL_ELEMENT) {
                values.push(this._getDataValue(item));
            }
        });
        return values;
    }
    _getDataValue(wrappedValue) {
        var itemData = (wrappedValue && wrappedValue.itemData) || wrappedValue;
        if (itemData[exports.VALUE_EXPR] != null)
            return itemData[exports.VALUE_EXPR];
        return null;
    }
    _reset(selectionOnly = false) {
        if (!selectionOnly) {
            this.dataSource = [];
        }
        this.selection = [];
        this.fullSelection = [];
    }
}
exports.filterElementDataController = filterElementDataController;
class listViewDataController extends filterElementDataController {
    constructor(options) {
        super(options);
        this.ListBoxType = {
            Checked: 'Checked',
            Radio: 'Radio'
        };
        this.ComboBoxType = {
            Standard: 'Standard',
            Checked: 'Checked'
        };
    }
    isMultiselectable() {
        return !this.viewModel || (this.viewModel.ListBoxType == this.ListBoxType.Checked) || (this.viewModel.ComboBoxType == this.ListBoxType.Checked);
    }
}
exports.listViewDataController = listViewDataController;
class treeViewDataController extends filterElementDataController {
    constructor(options) {
        super(options);
    }
    isMultiselectable() {
        return true;
    }
    getAllItemIndex() {
        return -1;
    }
    isAllSelected() {
        return false;
    }
    update(selectedValues, encodeHtml, selectionOnly = false) {
        this._reset(selectionOnly);
        if (selectionOnly)
            return this._updateSelection(selectedValues);
        var hash = _utils_1.wrapHash(selectedValues), sourceItems = this.multiData ? this.multiData.getAxis('Default').getRootPoint().getChildren() : [], key = 1, createDestNode = (sourceNode) => {
            var dataItem = {};
            dataItem[exports.KEY_EXPR] = key++;
            dataItem[exports.VALUE_EXPR] = sourceNode.getUniqueValue();
            dataItem[encodeHtml || !legacy_settings_1.LegacySettings.useLegacyTreeView ? 'text' : 'html'] = sourceNode.getDisplayText();
            if (legacy_settings_1.LegacySettings.useLegacyTreeView) {
                dataItem['expanded'] = this.viewModel.AutoExpandNodes;
            }
            return dataItem;
        }, walkTree = (sourceNode, destNodeItems, branch, nullChildCount) => {
            var children = sourceNode.getChildren();
            var nextNull = 0;
            while (children.length == 1 && children[0].getUniqueValue() === special_values_1.specialValues.olapNullValueGuid) {
                children = children[0].getChildren();
                nextNull++;
            }
            var hasChildren = (children && children.length !== 0), subDestNode = createDestNode(sourceNode), currentBranch = branch.slice();
            subDestNode.nullChildCount = nextNull;
            for (var a = 0; a < nullChildCount; a++)
                currentBranch.push(special_values_1.specialValues.olapNullValueGuid);
            currentBranch.push(subDestNode.value);
            destNodeItems.push(subDestNode);
            if (hasChildren) {
                subDestNode.items = [];
                children.forEach(node => {
                    walkTree(node, subDestNode.items, currentBranch, nextNull);
                });
            }
            else {
                for (var a = 0; a < nextNull; a++)
                    currentBranch.push(special_values_1.specialValues.olapNullValueGuid);
                if (legacy_settings_1.LegacySettings.useLegacyTreeView) {
                    subDestNode.selected = !!hash[currentBranch];
                }
                else {
                    if (!!hash[currentBranch]) {
                        this.selection.push(subDestNode[exports.KEY_EXPR]);
                    }
                }
            }
        };
        sourceItems.forEach(sourceItem => {
            walkTree(sourceItem, this.dataSource, [], 0);
        });
    }
    getInteractionValues(elements, selectedValues) {
        if (!legacy_settings_1.LegacySettings.useLegacyTreeView)
            return elements;
        var hash = _utils_1.wrapHash(selectedValues), parent = elements.length ? elements[0].parent : undefined, rootBranch = [], resultSelection = [], prepareSelectionItems = (items, parentBranch) => {
            items.forEach(item => {
                var itemBranch = parentBranch.slice(), value = this._getDataValue(item), nullChildCount = this._getDataNullChildCount(item);
                itemBranch.push(value);
                for (var a = 0; a < nullChildCount; a++)
                    itemBranch.push(special_values_1.specialValues.olapNullValueGuid);
                if (!!item.items && item.items.length) {
                    prepareSelectionItems(item.items, itemBranch);
                }
                else {
                    var isSelected = !!hash[itemBranch];
                    if ((!legacy_settings_1.LegacySettings.useLegacyTreeView && !isSelected) ||
                        (legacy_settings_1.LegacySettings.useLegacyTreeView && ((item.selected && !isSelected) || (!item.selected && isSelected)))) {
                        resultSelection.push(itemBranch);
                    }
                }
            });
        };
        while (parent) {
            rootBranch.splice(0, 0, this._getDataValue(parent));
            parent = parent.parent;
        }
        prepareSelectionItems(elements, rootBranch);
        return resultSelection;
    }
    _updateSelection(selectedValues) {
        var hash = _utils_1.wrapHash(selectedValues);
        var updateItemsSelectedState = (items, parentBranch) => {
            items.forEach(item => {
                var itemBranch = parentBranch.slice(), value = this._getDataValue(item), nullChildCount = this._getDataNullChildCount(item);
                itemBranch.push(value);
                for (var a = 0; a < nullChildCount; a++)
                    itemBranch.push(special_values_1.specialValues.olapNullValueGuid);
                if (item.items && item.items.length) {
                    updateItemsSelectedState(item.items, itemBranch);
                }
                else {
                    if (legacy_settings_1.LegacySettings.useLegacyTreeView) {
                        item.selected = !!hash[itemBranch];
                    }
                    else {
                        if (!!hash[itemBranch]) {
                            this.selection.push(item[exports.KEY_EXPR]);
                        }
                    }
                }
            });
        };
        updateItemsSelectedState(this.dataSource, []);
    }
    _getDataNullChildCount(wrappedValue) {
        var itemData = (wrappedValue && wrappedValue.itemData) || wrappedValue;
        if (itemData['nullChildCount'] != null)
            return itemData['nullChildCount'];
        return 0;
    }
}
exports.treeViewDataController = treeViewDataController;
