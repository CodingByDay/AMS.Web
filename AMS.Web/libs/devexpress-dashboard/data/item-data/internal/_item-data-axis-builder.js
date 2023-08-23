﻿/**
* DevExpress Dashboard (_item-data-axis-builder.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemDataAxisBuilder = exports.pivotAreaNames = void 0;
const _utils_1 = require("../../_utils");
const _item_data_axis_point_1 = require("../_item-data-axis-point");
exports.pivotAreaNames = {
    columns: 'Columns',
    rows: 'Rows'
};
function redBlackTreeNodeComparer(arr1, arr2) {
    for (var i = 0; i < arr1.length && i < arr2.length; i++) {
        if (arr1[i] > arr2[i])
            return 1;
        if (arr1[i] < arr2[i])
            return -1;
    }
    if (arr1.length < arr2.length)
        return -1;
    if (arr1.length > arr2.length)
        return 1;
    return 0;
}
exports.itemDataAxisBuilder = {
    build: function (name, storage, dimensions, sortOrderSlices, metaData, iterators) {
        const cache = new _utils_1.RedBlackTree(redBlackTreeNodeComparer);
        const keyIds = dimensions.map(dimension => dimension.id);
        const allSlicesKeyIdsList = this._getKeyIdsList(keyIds);
        const levelInfoList = allSlicesKeyIdsList.map((keyIds, index) => {
            var baseKeyIds = keyIds.slice(-1), baseKeyId = baseKeyIds.length > 0 ? baseKeyIds[0] : null, metaDataSliceKey = storage.getSliceKey(baseKeyIds), dataSlice = storage.getOrCreateSlice(keyIds), level = index - 1;
            return {
                axisName: name,
                metaData: metaData,
                dataSlice: dataSlice,
                level: level,
                getMetaDataValue: function (dataRowKey, valueId) {
                    if (metaDataSliceKey < 0)
                        return null;
                    var metaDataRowKey = storage.findDataRowKey(metaDataSliceKey, dataRowKey);
                    return storage.getValue(metaDataRowKey, valueId);
                },
                getBaseValue: function (dataRowKey) {
                    return (level >= 0) ? storage.getKeyValue(dataRowKey, baseKeyId) : null;
                }
            };
        });
        const rootNode = new _item_data_axis_point_1.itemDataAxisPoint(levelInfoList[0], { rowKey: [], sliceKey: levelInfoList[0].dataSlice.getKey() });
        cache.getOrAdd([], () => rootNode);
        allSlicesKeyIdsList.forEach((keyIds) => {
            if (keyIds.length > 0 && !this._isSortOrderSlice(keyIds, sortOrderSlices))
                return;
            var levelInfo = levelInfoList[keyIds.length];
            var slice = levelInfo.dataSlice;
            var iterator = (slice && iterators) ? iterators[slice.getKey()] : slice;
            if (iterator) {
                iterator.forEach(function (dataRowKey) {
                    var item = null, childItem = null;
                    do {
                        var level = dataRowKey.rowKey.length;
                        let createAxisPoint = () => {
                            let levelInfo = levelInfoList[level];
                            return new _item_data_axis_point_1.itemDataAxisPoint(levelInfo, dataRowKey);
                        };
                        let addResult = cache.getOrAdd(dataRowKey.rowKey, createAxisPoint);
                        item = addResult.value;
                        if (childItem != null) {
                            item.getChildren().push(childItem);
                            childItem._setParent(item);
                        }
                        if (!addResult.added || level == 0)
                            break;
                        var prevSliceKey = levelInfoList[level - 1].dataSlice.getKey();
                        dataRowKey = storage.findDataRowKey(prevSliceKey, dataRowKey);
                        childItem = item;
                    } while (true);
                });
            }
        });
        return rootNode;
    },
    _getKeyIdsList: function (keyIds) {
        var list = [[]];
        keyIds.forEach((_, i) => {
            var slice = keyIds.slice(0, i + 1);
            list.push(slice);
        });
        return list;
    },
    _isSortOrderSlice: function (slice, sortOrderSlices) {
        var result = !sortOrderSlices || sortOrderSlices.length == 0;
        if (!result) {
            sortOrderSlices.forEach((orderSlice) => {
                result = result || _utils_1.areNotOrderedListsEqual(slice, orderSlice);
                return !result;
            });
        }
        return result;
    }
};
