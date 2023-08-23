/**
* DevExpress Dashboard (_array-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClosestItemIndex = exports.compareNotOrderedArrays = exports.compareArrays = exports.areArraysEqual = exports.arrayInsert = exports.arrayEquals = void 0;
const _utils_1 = require("../../data/_utils");
function arrayEquals(array1, array2) {
    return _utils_1.arrayEquals(array1, array2);
}
exports.arrayEquals = arrayEquals;
function arrayInsert(a, insertion, position) {
    return a.slice(0, position).concat(insertion, a.slice(position, a.length));
}
exports.arrayInsert = arrayInsert;
function areArraysEqual(arr1 = [], arr2 = []) {
    return arr1.length === arr2.length && arr1.every((val, index) => val === arr2[index]);
}
exports.areArraysEqual = areArraysEqual;
function compareArrays(array1, array2, predicate = (a, b) => a === b) {
    if (array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++) {
        if (!predicate(array1[i], array2[i]))
            return false;
    }
    return true;
}
exports.compareArrays = compareArrays;
function compareNotOrderedArrays(array1, array2, predicate = (a, b) => a === b) {
    if (array1.length !== array2.length)
        return false;
    for (var i = 0; i < array1.length; i++) {
        if (!array2.some(array => predicate(array1[i], array)))
            return false;
    }
    return true;
}
exports.compareNotOrderedArrays = compareNotOrderedArrays;
function findClosestItemIndex(array, predicate) {
    var resultIndex = array.length;
    array.some((element, index) => {
        if (predicate(element)) {
            resultIndex = index;
            return true;
        }
        return false;
    });
    return resultIndex;
}
exports.findClosestItemIndex = findClosestItemIndex;
