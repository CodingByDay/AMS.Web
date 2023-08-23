/**
 * DevExtreme (cjs/ui/file_manager/ui.file_manager.common.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.whenSome = exports.getMapFromObject = exports.getDisplayFileSize = exports.findItemsByKeys = exports.extendAttributes = void 0;
var _deferred = require("../../core/utils/deferred");
var _extend = require("../../core/utils/extend");
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === _typeof(key) ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== _typeof(input) || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== _typeof(res)) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
}
var whenSome = function(arg, onSuccess, onError) {
    onSuccess = onSuccess || _common.noop;
    onError = onError || _common.noop;
    if (!Array.isArray(arg)) {
        arg = [arg]
    }
    var deferreds = arg.map((function(item, index) {
        return (0, _deferred.when)(item).then((function(result) {
            (0, _type.isFunction)(onSuccess) && onSuccess({
                item: item,
                index: index,
                result: result
            });
            return result
        }), (function(error) {
            if (!error) {
                error = {}
            }
            error.index = index;
            (0, _type.isFunction)(onError) && onError(error);
            return (new _deferred.Deferred).resolve().promise()
        }))
    }));
    return _deferred.when.apply(null, deferreds)
};
exports.whenSome = whenSome;
var getDisplayFileSize = function(byteSize) {
    var sizesTitles = ["B", "KB", "MB", "GB", "TB"];
    var index = 0;
    var displaySize = byteSize;
    while (displaySize >= 1024 && index <= sizesTitles.length - 1) {
        displaySize /= 1024;
        index++
    }
    displaySize = Math.round(10 * displaySize) / 10;
    return "".concat(displaySize, " ").concat(sizesTitles[index])
};
exports.getDisplayFileSize = getDisplayFileSize;
var extendAttributes = function(targetObject, sourceObject, objectKeysArray) {
    objectKeysArray.forEach((function(objectKey) {
        (0, _extend.extend)(true, targetObject, (0, _type.isDefined)(sourceObject[objectKey]) ? _defineProperty({}, objectKey, sourceObject[objectKey]) : {})
    }));
    return targetObject
};
exports.extendAttributes = extendAttributes;
var findItemsByKeys = function(itemInfos, keys) {
    var itemMap = {};
    keys.forEach((function(key) {
        itemMap[key] = null
    }));
    itemInfos.forEach((function(itemInfo) {
        var key = itemInfo.fileItem.key;
        if (Object.prototype.hasOwnProperty.call(itemMap, key)) {
            itemMap[key] = itemInfo
        }
    }));
    var result = [];
    keys.forEach((function(key) {
        var itemInfo = itemMap[key];
        if (itemInfo) {
            result.push(itemInfo)
        }
    }));
    return result
};
exports.findItemsByKeys = findItemsByKeys;
var getMapFromObject = function(object) {
    var keys = Object.keys(object);
    var values = [];
    keys.forEach((function(key) {
        return values.push(object[key])
    }));
    return {
        keys: keys,
        values: values
    }
};
exports.getMapFromObject = getMapFromObject;
