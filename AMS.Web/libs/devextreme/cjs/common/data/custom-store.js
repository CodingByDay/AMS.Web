/**
 * DevExtreme (cjs/common/data/custom-store.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isGroupItemsArray = isGroupItemsArray;
exports.isItemsArray = isItemsArray;
exports.isLoadResultObject = isLoadResultObject;

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}

function isGroupItem(item) {
    if (void 0 === item || null === item || "object" !== _typeof(item)) {
        return false
    }
    return "key" in item && "items" in item
}

function isLoadResultObject(res) {
    return !Array.isArray(res) && "data" in res
}

function isGroupItemsArray(res) {
    return Array.isArray(res) && !!res.length && isGroupItem(res[0])
}

function isItemsArray(res) {
    return Array.isArray(res) && !isGroupItem(res[0])
}
