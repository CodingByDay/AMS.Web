﻿/**
* DevExpress Dashboard (_hashset-wrapper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashsetWrapper = void 0;
const _utils_1 = require("./_utils");
class HashsetWrapper {
    constructor(array) {
        this.FNV_prime_32 = 16777619;
        this.FNV_offset_basis_32 = 2166136261;
        this.hashSet = {};
        array.forEach((item, index) => {
            var hash = this.getHash(item);
            var array = this.hashSet[hash];
            if (array == null) {
                array = [];
                this.hashSet[hash] = array;
            }
            array.push({ index: index, item: item });
        });
    }
    contains(item) {
        return this.getItem(item) != null;
    }
    getIntersection(array) {
        var result = [];
        array.forEach(item => {
            if (this.contains(item))
                result.push(item);
        });
        return result;
    }
    indexOf(item) {
        var found = this.getItem(item);
        return found != null ? found.index : -1;
    }
    getItem(item) {
        var value = this.hashSet[this.getHash(item)];
        return value != null ? value.filter(val => _utils_1.arrayEquals(val.item, item))[0] : undefined;
    }
    getHash(obj) {
        if (Array.isArray(obj)) {
            return this.toHash(obj, (item) => this.getHash(item));
        }
        else {
            return this.toHash(String(obj).split(''), (ch) => ch.charCodeAt(0));
        }
    }
    toHash(arr, convertValue) {
        return arr.reduce((prev, curr) => {
            return (prev ^ convertValue(curr)) * this.FNV_prime_32;
        }, this.FNV_offset_basis_32);
    }
}
exports.HashsetWrapper = HashsetWrapper;
