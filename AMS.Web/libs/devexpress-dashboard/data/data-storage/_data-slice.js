﻿/**
* DevExpress Dashboard (_data-slice.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sliceRepository = exports.dataSlice = void 0;
const _utils_1 = require("../_utils");
class dataSlice {
    constructor(sliceKey, sliceDTO, decode, encode) {
        var keyIndexById = {}, valueIdByKey = {};
        sliceDTO.KeyIds.forEach((keyId, i) => {
            keyIndexById[keyId] = i;
        });
        Object.keys(sliceDTO.ValueIds).forEach((valueId) => {
            valueIdByKey[sliceDTO.ValueIds[valueId]] = valueId;
        });
        this._sliceKey = sliceKey;
        this._sliceDTO = sliceDTO;
        this._decode = decode;
        this._encode = encode;
        this._keyIndexById = keyIndexById;
        this._valueIdByKey = valueIdByKey;
    }
    getRowCount() {
        return Object.keys(this._sliceDTO.Data).length;
    }
    getKey() {
        return this._sliceKey;
    }
    getValue(rowKey, valueId) {
        var that = this, dto = that._sliceDTO, valueKey = dto.ValueIds[valueId], rowDTO = that._getRowDTO(rowKey), value = !!rowDTO && valueKey >= 0 ? rowDTO[valueKey] : null;
        return value === undefined ? null : value;
    }
    getRowValues(rowKey) {
        var that = this, values = {}, valueIdsByKey = that._valueIdByKey, rowDTO = that._getRowDTO(rowKey) || {};
        Object.keys(rowDTO).forEach((key) => {
            values[valueIdsByKey[key]] = rowDTO[key];
        });
        return values;
    }
    getRowKeyValues(rowKey) {
        var that = this, keyIds = that.getKeyIds(), keyValues = {};
        keyIds.forEach((keyId) => {
            keyValues[keyId] = that.getKeyValue(rowKey, keyId);
        });
        return keyValues;
    }
    _getRowDTO(rowKey) {
        var that = this;
        return that._sliceDTO.Data[that._stringifyKey(rowKey)];
    }
    getKeyValue(rowKey, keyId) {
        if (keyId === undefined)
            return null;
        var that = this, keyIndex = that._keyIndexById[keyId];
        return that._decode(keyId, rowKey[keyIndex]);
    }
    getKeyIds() {
        var that = this;
        return that._sliceDTO.KeyIds;
    }
    getValueIds() {
        return Object.keys(this._sliceDTO.ValueIds);
    }
    forEach(action) {
        var that = this;
        Object.keys(that._sliceDTO.Data).forEach((key) => {
            return action({
                sliceKey: that._sliceKey,
                rowKey: that._parseKey(key)
            });
        });
    }
    append(slice) {
        var that = this, newRowKeys = [], iterator = {
            forEach: function (action) {
                newRowKeys.forEach((key) => {
                    action({
                        sliceKey: that._sliceKey,
                        rowKey: key
                    });
                });
            }
        };
        slice.forEach((key) => {
            var keyValues = slice.getRowKeyValues(key.rowKey), values = slice.getRowValues(key.rowKey), newRowKey = that.addRow(keyValues, values);
            newRowKeys.push(newRowKey);
        });
        return iterator;
    }
    addRow(keyValues, values) {
        var that = this, newRowKey = [], valueIds = that._sliceDTO.ValueIds, encode = that._encode;
        Object.keys(keyValues).forEach((keyId) => {
            newRowKey.push(encode(keyId, keyValues[keyId]));
        });
        var valueDTO = {};
        Object.keys(values).forEach((valueId) => {
            var valueKey = valueIds[valueId];
            if (valueKey === undefined) {
                var count = 0;
                Object.keys(valueIds).forEach((valueId) => {
                    count++;
                });
                valueKey = count;
                valueIds[valueId] = valueKey;
            }
            valueDTO[valueKey] = values[valueId];
        });
        that._sliceDTO.Data[that._stringifyKey(newRowKey)] = valueDTO;
        return newRowKey;
    }
    _parseKey(key) {
        return JSON.parse(key);
    }
    _stringifyKey(key) {
        return '[' + key + ']';
    }
}
exports.dataSlice = dataSlice;
class sliceRepository {
    constructor(sliceListDTO, decode, encode) {
        this._sliceListDTO = sliceListDTO;
        this._sliceList = [];
        this._rowKeyConvertMap = {};
        this._sliceJoinCache = {};
        this._decode = decode;
        this._encode = encode;
        this._initialize(decode);
    }
    _initialize(decode) {
        var that = this;
        if (!that._sliceListDTO)
            return;
        that._sliceListDTO.forEach((sliceDTO, index) => {
            var slice = new dataSlice(index, sliceDTO, decode, that._encode);
            that._sliceList.push(slice);
        });
    }
    getAll() {
        return this._sliceList;
    }
    getKey(keyIds) {
        let slice = this._getByKeyIds(keyIds);
        return slice ? this._sliceList.indexOf(slice) : -1;
    }
    get(vsKey) {
        return this._sliceList[vsKey];
    }
    getOrCreate(keyIds) {
        var that = this, slice = that._getByKeyIds(keyIds);
        if (!slice) {
            var sliceDTO = {
                KeyIds: keyIds,
                ValueIds: {},
                Data: {}
            };
            if (keyIds.length == 0) {
                sliceDTO.Data['[]'] = {};
            }
            slice = new dataSlice(that._sliceList.length, sliceDTO, that._decode, that._encode);
            that._sliceList.push(slice);
        }
        return slice;
    }
    findDataRowKey(sliceKey, dataRowKey) {
        var that = this, newRowKey = [], map = that._getConvertMap(dataRowKey.sliceKey, sliceKey);
        for (var i = 0; i < map.length; i++) {
            newRowKey.push(dataRowKey.rowKey[map[i]]);
        }
        return {
            sliceKey: sliceKey,
            rowKey: newRowKey
        };
    }
    getCrossValue(dataRows, valueId) {
        var that = this, dataRow1 = dataRows[0], dataRow2 = dataRows[1], sliceKey, value = null;
        if (!dataRow1)
            sliceKey = 0;
        else
            sliceKey = dataRow2 ? that._joinSliceKey(dataRow1.sliceKey, dataRow2.sliceKey) : dataRow1.sliceKey;
        if (sliceKey >= 0) {
            var newRowKey = [], map1 = null, map2 = null;
            if (dataRow1) {
                map1 = that._getConvertMap(dataRow1.sliceKey, sliceKey),
                    map2 = dataRow2 ? that._getConvertMap(dataRow2.sliceKey, sliceKey) : null;
                for (var i = 0; i < map1.length; i++) {
                    var index = map1[i], key = index >= 0 ? dataRow1.rowKey[index] : newRowKey[i];
                    newRowKey.push(key);
                }
                if (map2 != null) {
                    for (var i = 0; i < map2.length; i++) {
                        var index = map2[i], key = index >= 0 ? dataRow2.rowKey[index] : newRowKey[i];
                        newRowKey[i] = key;
                    }
                }
            }
            var slice = that.get(sliceKey);
            if (slice)
                value = slice.getValue(newRowKey, valueId);
        }
        return value;
    }
    getKeyValue(dataRow, keyId) {
        var that = this, slice = that.get(dataRow.sliceKey), value = null;
        if (slice) {
            value = slice.getKeyValue(dataRow.rowKey, keyId);
        }
        return value;
    }
    getValue(dataRow, valueId) {
        var that = this, slice = that.get(dataRow.sliceKey), value = null;
        if (slice) {
            value = slice.getValue(dataRow.rowKey, valueId);
        }
        return value;
    }
    isEmpty() {
        return this._sliceList.filter(s => {
            if (s.getKeyIds().length === 0) {
                var values = s.getRowValues([]);
                return s.getValueIds().filter(id => values[id] !== null && values[id] !== undefined).length !== 0;
            }
            else {
                return s.getRowCount() !== 0;
            }
        }).length === 0;
    }
    _joinSliceKey(key1, key2) {
        var that = this, joinSliceCacheKey = [key1, key2];
        if (key2 < key1)
            joinSliceCacheKey = joinSliceCacheKey.reverse();
        var joinRes = that._sliceJoinCache[joinSliceCacheKey];
        if (joinRes == undefined) {
            var slice1 = that.get(key1), slice2 = that.get(key2), keyIds = slice1.getKeyIds().concat(slice2.getKeyIds());
            joinRes = that.getKey(keyIds);
            that._sliceJoinCache[joinSliceCacheKey] = joinRes;
        }
        return joinRes;
    }
    _getByKeyIds(keyIds) {
        var that = this, foundSlice = null;
        that._sliceList.forEach((slice) => {
            if (_utils_1.areNotOrderedListsEqual(slice.getKeyIds(), keyIds)) {
                foundSlice = slice;
                return false;
            }
        });
        return foundSlice;
    }
    _getConvertMap(sliceFromKey, sliceToKey) {
        var that = this, convertMapCacheKey = [sliceFromKey, sliceToKey];
        var map = that._rowKeyConvertMap[convertMapCacheKey];
        if (!map) {
            var fromSlice = that.get(sliceFromKey), toSlice = that.get(sliceToKey);
            map = [];
            toSlice.getKeyIds().forEach((keyId) => {
                map.push(fromSlice.getKeyIds().indexOf(keyId));
            });
            that._rowKeyConvertMap[convertMapCacheKey] = map;
        }
        return map;
    }
}
exports.sliceRepository = sliceRepository;
