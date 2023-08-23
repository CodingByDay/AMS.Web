﻿/**
* DevExpress Dashboard (_item-data-manager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDataManager = void 0;
const _data_storage_1 = require("../../data-storage/_data-storage");
const item_data_axis_names_1 = require("../item-data-axis-names");
const _item_data_1 = require("../_item-data");
const _item_data_axis_builder_1 = require("./_item-data-axis-builder");
const _item_data_axis_helper_1 = require("./_item-data-axis-helper");
const _item_meta_data_1 = require("./_item-meta-data");
class itemDataManager {
    initialize(itemDataDTO) {
        var metaData = this._createMetaData(itemDataDTO.MetaData), ds = new _data_storage_1.dataStorage(itemDataDTO.DataStorageDTO), items = {};
        let axes = metaData.getAxes();
        Object.keys(axes).forEach((name) => {
            items[name] = _item_data_axis_builder_1.itemDataAxisBuilder.build(name, ds, axes[name], itemDataDTO.SortOrderSlices, metaData);
        });
        this._dataStorage = ds;
        this._metaData = metaData;
        this._itemData = new _item_data_1.itemData(metaData, ds, items);
        this._items = items;
    }
    updateExpandedData(expandedItemDataDTO, expandInfo) {
        var that = this, areaNames = item_data_axis_names_1.itemDataAxisNames, sortOrderSlices = expandedItemDataDTO.SortOrderSlices, area = expandInfo.pivotArea == _item_data_axis_builder_1.pivotAreaNames.columns ? areaNames.pivotColumnAxis : areaNames.pivotRowAxis, values = expandInfo.values, metaData = that._metaData, ds = new _data_storage_1.dataStorage(expandedItemDataDTO.DataStorageDTO);
        var iterators = that._dataStorage.insert(ds, sortOrderSlices);
        var expandedAreaNewRootItem = _item_data_axis_builder_1.itemDataAxisBuilder.build(area, that._dataStorage, metaData.getAxes()[area], sortOrderSlices, metaData, iterators);
        if (!!expandedAreaNewRootItem) {
            var expandedAreaRootItem = that._items[area], expandedItem = _item_data_axis_helper_1.itemDataAxisHelper.findFirstPointByUniqueValues(expandedAreaRootItem, values), expandedNewItem = _item_data_axis_helper_1.itemDataAxisHelper.findFirstPointByUniqueValues(expandedAreaNewRootItem, values);
            if (!!expandedNewItem) {
                var newChildren = expandedNewItem.getChildren();
                newChildren.forEach((child) => {
                    child._setParent(expandedItem);
                });
                expandedItem._setChildren(newChildren);
            }
        }
    }
    updateTotals(expandedItemDataDTO) {
        const totalSliceKeyIds = [];
        let ds = new _data_storage_1.dataStorage(expandedItemDataDTO.DataStorageDTO);
        this._dataStorage.insertSlice(ds, totalSliceKeyIds);
    }
    getDataStorage() {
        return this._dataStorage;
    }
    getItemData() {
        return this._itemData;
    }
    getMetaData() {
        return this._metaData;
    }
    _createMetaData(metaDataDTO) {
        var metaData = new _item_meta_data_1.itemMetaData(metaDataDTO);
        metaData.initialize();
        return metaData;
    }
}
exports.itemDataManager = itemDataManager;
