﻿/**
* DevExpress Dashboard (_data-storage.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataStorage = void 0;
const _data_slice_1 = require("./_data-slice");
class dataStorage {
    constructor(dto) {
        this._sliceRep = this._createSliceRep(dto);
    }
    _createSliceRep(dto) {
        var decodeMaps = dto.EncodeMaps, encodeMaps = {}, encodeCounters = {}, sliceListDTO = dto.Slices, decode = function (keyId, key) {
            return key === -1 ? null : decodeMaps[keyId][key];
        }, encode = function (keyId, value) {
            var map = encodeMaps[keyId];
            if (!map) {
                map = {};
                var decodeMap = decodeMaps[keyId];
                if (!decodeMap) {
                    decodeMap = [];
                    decodeMaps[keyId] = decodeMap;
                }
                encodeCounters[keyId] = decodeMap.length;
                decodeMap.forEach((value, index) => {
                    map[value] = index;
                });
                encodeMaps[keyId] = map;
            }
            var code = map[value];
            if (code === undefined) {
                var counter = encodeCounters[keyId];
                map[value] = counter;
                encodeCounters[keyId] = ++counter;
                decodeMaps[keyId].push(value);
            }
            return map[value];
        };
        return new _data_slice_1.sliceRepository(sliceListDTO, decode, encode);
    }
    _initialize() {
    }
    getSlices() {
        return this._sliceRep.getAll();
    }
    getSlice(sliceKey) {
        return this._sliceRep.get(sliceKey);
    }
    getSliceKey(keyIds) {
        return this._sliceRep.getKey(keyIds);
    }
    getSliceByIds(keyIds) {
        return this._sliceRep._getByKeyIds(keyIds);
    }
    getOrCreateSlice(keyIds) {
        return this._sliceRep.getOrCreate(keyIds);
    }
    findDataRowKey(sliceKey, dataRowKey) {
        return this._sliceRep.findDataRowKey(sliceKey, dataRowKey);
    }
    getCrossValue(dataRowKeys, valueId) {
        return this._sliceRep.getCrossValue(dataRowKeys, valueId);
    }
    getKeyValue(dataRow, keyId) {
        return this._sliceRep.getKeyValue(dataRow, keyId);
    }
    getValue(dataRow, valueId) {
        return this._sliceRep.getValue(dataRow, valueId);
    }
    isEmpty() {
        return this._sliceRep.isEmpty();
    }
    insert(ds, sortOrderSlices) {
        var that = this, slices = ds.getSlices(), iterators = {};
        slices.forEach((slice) => {
            var keyIds = slice.getKeyIds();
            var ownSlice = that.getOrCreateSlice(keyIds);
            iterators[ownSlice.getKey()] = ownSlice.append(slice);
        });
        return iterators;
    }
    insertSlice(ds, keyIds) {
        let newSlice = ds.getSliceByIds(keyIds);
        if (newSlice) {
            let existedSlice = this.getSliceByIds(keyIds);
            existedSlice.append(newSlice);
        }
    }
}
exports.dataStorage = dataStorage;
