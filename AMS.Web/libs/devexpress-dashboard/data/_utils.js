﻿/**
* DevExpress Dashboard (_utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unwrapSpecialNullValue = exports.RedBlackTree = exports.renderImage = exports.createSvgIconElement = exports.findLastIndex = exports.findIndex = exports.LocalStorageHelper = exports.strictEquals = exports.deepStrictEquals = exports.mapMany = exports.groupBy = exports.groupByProperty = exports.minus = exports.union = exports.intersect = exports.distinct = exports.asyncDebounce = exports.debounce = exports.pxToNumber = exports.areNotOrderedListsEqual = exports.wrapHash = exports.getParentClasses = exports.treeWalker = exports.getValueIndex = exports.getTagValue = exports.getAxisPointValue = exports.checkArrayContainsTuple = exports.checkTuplesAreEqual = exports.checkValuesAreEqual = exports.arrayEquals = exports.arrayContains = exports.moveContent = exports.decodeHtml = exports.encodeHtml = exports.isVulnerable = exports.allowSelectValue = exports.getRGBColor = exports.toColor = exports.tooltipContainerSelector = exports.gaugeViewType = exports.pivotArea = exports.KpiValueMode = exports.type = void 0;
const data_1 = require("devextreme/core/utils/data");
const $ = require("jquery");
const special_values_1 = require("./special-values");
exports.type = {
    isDefined: function (object) {
        return null !== object && void 0 !== object;
    },
    isFunction: function (object) {
        return 'function' === typeof object;
    },
    isString: function (object) {
        return 'string' === typeof object;
    },
    isNumeric: function (object) {
        return 'number' === typeof object && isFinite(object) || !isNaN(object - parseFloat(object));
    },
    isBoolean: function (object) {
        return 'boolean' === typeof object;
    }
};
exports.KpiValueMode = {
    Measure: 'Measure',
    Delta: 'Delta'
}, exports.pivotArea = {
    column: 'column',
    row: 'row',
    data: 'data'
}, exports.gaugeViewType = {
    CircularFull: 'CircularFull',
    CircularHalf: 'CircularHalf',
    CircularQuarterRight: 'CircularQuarterRight',
    CircularQuarterLeft: 'CircularQuarterLeft',
    CircularThreeFourth: 'CircularThreeFourth',
    LinearHorizontal: 'LinearHorizontal',
    LinearVertical: 'LinearVertical'
}, exports.tooltipContainerSelector = '.dx-dashboard-container';
function toColor(numericColorValue) {
    var number = numericColorValue >>> 0;
    var b = number & 0xFF, g = (number & 0xFF00) >>> 8, r = (number & 0xFF0000) >>> 16, a = ((number & 0xFF000000) >>> 24) / 255;
    return this.getRGBColor(r, g, b, a);
}
exports.toColor = toColor;
function getRGBColor(r, g, b, a) {
    if (typeof a === 'number' && a >= 0 && a < 1)
        return 'rgba(' + [r, g, b, a].join(',') + ')';
    return 'rgb(' + [r, g, b].join(',') + ')';
}
exports.getRGBColor = getRGBColor;
function allowSelectValue(values) {
    var result = true;
    if (values) {
        values.forEach(value => {
            result = result && (value !== special_values_1.specialValues.othersValueGuid) &&
                (value !== special_values_1.specialValues.errorValueGuid);
        });
    }
    return result;
}
exports.allowSelectValue = allowSelectValue;
function isVulnerable(value) {
    if (!value)
        return false;
    var re = new RegExp('^\\s*(data|javascript)\\s*:\\s*');
    return !!value.match(re);
}
exports.isVulnerable = isVulnerable;
function encodeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
exports.encodeHtml = encodeHtml;
function decodeHtml(value) {
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}
exports.decodeHtml = decodeHtml;
function moveContent(source, dest, clearSource) {
    $.fn.constructor(source).contents().appendTo($.fn.constructor(dest));
    if (clearSource) {
        source.innerHTML = '';
    }
}
exports.moveContent = moveContent;
function arrayContains(container, part) {
    var currentValueIndex = -1;
    if (!!container) {
        $.each(container, (index, item) => {
            if (arrayEquals(part, item)) {
                currentValueIndex = index;
                return false;
            }
        });
    }
    return currentValueIndex >= 0;
}
exports.arrayContains = arrayContains;
function arrayEquals(array1, array2) {
    if (!array1 && !array2)
        return true;
    if (!array1 || !array2)
        return false;
    if (Array.isArray(array1)) {
        if (array1.length !== array2.length)
            return false;
        for (var key in array1) {
            if (!arrayEquals(array1[key], array2[key]))
                return false;
        }
    }
    else {
        return data_1.toComparable(array1, true) === data_1.toComparable(array2, true);
    }
    return true;
}
exports.arrayEquals = arrayEquals;
function checkValuesAreEqual(value1, value2, nullValuesEquals = false, emptyArraysEquals = false) {
    if (!nullValuesEquals && (value1 == null || value2 == null)) {
        return false;
    }
    var list1 = Array.isArray(value1) ? value1 : [value1], list2 = Array.isArray(value2) ? value2 : [value2];
    if (list1.length !== list2.length || (list1.length === 0 && !emptyArraysEquals)) {
        return false;
    }
    else {
        for (var i = 0; i < list1.length; i++) {
            if (data_1.toComparable(list1[i], true) !== data_1.toComparable(list2[i], true))
                return false;
        }
        return true;
    }
}
exports.checkValuesAreEqual = checkValuesAreEqual;
function checkTuplesAreEqual(tuple1, tuple2) {
    if (!tuple1 || !tuple2) {
        return false;
    }
    var containsCount = 0;
    tuple1.forEach(tuple1AxisValue => {
        var value = tuple2.filter((tuple2AxisValue) => {
            return tuple2AxisValue.axisName === tuple1AxisValue.axisName;
        })[0].value;
        if (checkValuesAreEqual(tuple1AxisValue.value, value)) {
            containsCount = containsCount + 1;
        }
    });
    return containsCount == tuple1.length;
}
exports.checkTuplesAreEqual = checkTuplesAreEqual;
function checkArrayContainsTuple(array, tuple) {
    var that = this, contains, currentIndex;
    $.each(array, function (index, aTuple) {
        contains = that.checkTuplesAreEqual(aTuple, tuple);
        if (contains)
            currentIndex = index;
        return !contains;
    });
    return currentIndex;
}
exports.checkArrayContainsTuple = checkArrayContainsTuple;
function getAxisPointValue(tuple, axisName) {
    var axisPoints = tuple.filter((axisValue) => {
        return axisValue.axisName === axisName;
    });
    return axisPoints.length > 0 ? axisPoints[0].value : null;
}
exports.getAxisPointValue = getAxisPointValue;
function getTagValue(tag) {
    var axisPoint = tag.axisPoint;
    return axisPoint ? axisPoint.getUniquePath() : tag;
}
exports.getTagValue = getTagValue;
function getValueIndex(matrix, vector) {
    if (matrix && vector) {
        for (var i = 0; i < matrix.length; i++) {
            if (this.checkValuesAreEqual(matrix[i], vector)) {
                return i;
            }
        }
    }
    return -1;
}
exports.getValueIndex = getValueIndex;
function treeWalker(rootNode, childrenFunc) {
    return {
        walk: function (func) {
            this._walkInternal(rootNode, null, func, function () { return true; });
        },
        walkLeaf: function (func) {
            this._walkInternal(rootNode, null, func, function (node, parent, isLeaf) { return isLeaf; });
        },
        _walkInternal: function (node, parent, func, callPredicate) {
            var that = this, children = childrenFunc(node), isLeaf = !children || children.length === 0;
            if (callPredicate(node, parent, isLeaf)) {
                func(node, parent, isLeaf);
            }
            if (!isLeaf) {
                $.each(children, function (i, branch) {
                    that._walkInternal(branch, node, func, callPredicate);
                });
            }
        }
    };
}
exports.treeWalker = treeWalker;
function getParentClasses($obj) {
    var parents = [$obj.attr('class')];
    $.each($obj.parents(), function (_, parent) {
        var name = $.fn.constructor(parent).attr('class');
        if (name)
            parents.push(name);
    });
    return parents.reverse();
}
exports.getParentClasses = getParentClasses;
function wrapHash(valuesArray) {
    var hash = {};
    if (valuesArray) {
        valuesArray.forEach(value => {
            hash[value] = true;
        });
    }
    return hash;
}
exports.wrapHash = wrapHash;
function areNotOrderedListsEqual(list1, list2) {
    if (list1.length != list2.length)
        return false;
    list1 = list1.slice();
    list2 = list2.slice();
    list1.sort();
    list2.sort();
    for (var i = 0; i < list1.length; i++) {
        if (list1[i] !== list2[i])
            return false;
    }
    return true;
}
exports.areNotOrderedListsEqual = areNotOrderedListsEqual;
function pxToNumber(px) {
    var result = 0;
    if (px != null && px != '') {
        try {
            var indexOfPx = px.indexOf('px');
            if (indexOfPx > -1)
                result = parseInt(px.substr(0, indexOfPx));
        }
        catch (e) { }
    }
    return result;
}
exports.pxToNumber = pxToNumber;
function debounce(func, wait) {
    var timeout;
    return function (...args) {
        var that = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            clearTimeout(timeout);
            timeout = null;
            func.apply(that, args);
        }, wait);
    };
}
exports.debounce = debounce;
function asyncDebounce(func, action) {
    var actualPromise;
    return (...args) => {
        var that = this;
        var promise = func.call(that, ...args);
        actualPromise = promise;
        promise.done(function (...actionArgs) {
            if (promise === actualPromise) {
                action.apply(that, actionArgs);
            }
        });
    };
}
exports.asyncDebounce = asyncDebounce;
function containsInIndex(array, value, index, compare) {
    return index >= 0 && findIndex(array, cur => compare(value, cur)) === index;
}
function distinct(array, compare) {
    if (compare)
        return array.filter((value, index, arr) => containsInIndex(arr, value, index, compare));
    else
        return array.filter((value, index, arr) => arr.indexOf(value) === index);
}
exports.distinct = distinct;
function intersect(array1, array2, compare) {
    if (compare)
        return array1.filter((value) => findIndex(array2, cur => compare(value, cur)) !== -1);
    else
        return array1.filter((value) => array2.indexOf(value) !== -1);
}
exports.intersect = intersect;
function union(array1, array2, compare) {
    return distinct(array1.concat(array2));
}
exports.union = union;
function minus(array1, array2, compare) {
    if (compare)
        return array1.filter((value) => findIndex(array2, cur => compare(value, cur)) === -1);
    else
        return array1.filter((value) => array2.indexOf(value) === -1);
}
exports.minus = minus;
function groupByProperty(array, property) {
    return groupBy(array, item => item[property]);
}
exports.groupByProperty = groupByProperty;
function groupBy(array, getKey) {
    return array.reduce((result, item) => {
        const key = getKey(item);
        const group = result.filter(gr => gr && gr.length > 0 && getKey(gr[0]) === key)[0];
        if (!group) {
            result.push([item]);
        }
        else {
            group.push(item);
        }
        return result;
    }, []);
}
exports.groupBy = groupBy;
function mapMany(array, callbackfn) {
    return array.map(callbackfn).reduce((a, b) => a.concat(b), []);
}
exports.mapMany = mapMany;
function deepStrictEquals(x, y) {
    return strictEquals(x, y, (obj1, obj2) => {
        if (Array.isArray(obj1) || Array.isArray(obj2))
            throw new Error('Arrays comparison is not supported.');
        switch (typeof (obj1)) {
            case 'object':
                for (var p1 in obj1) {
                    if (obj1.hasOwnProperty(p1) !== obj2.hasOwnProperty(p1))
                        return false;
                    if (!deepStrictEquals(obj1[p1], obj2[p1]))
                        return false;
                }
                for (var p2 in obj2)
                    if (!obj1.hasOwnProperty(p2))
                        return false;
                break;
            case 'number':
            case 'boolean':
            case 'string':
            case 'bigint':
            case 'symbol':
                if (obj1 !== obj2)
                    return false;
                break;
            default:
                throw new Error('The object type ' + typeof (obj1) + ' is not supported in comparison.');
        }
        return true;
    });
}
exports.deepStrictEquals = deepStrictEquals;
function strictEquals(x, y, equalsCore) {
    if (x === y)
        return true;
    if (!exports.type.isDefined(x) || !exports.type.isDefined(y))
        return false;
    if (typeof (x) !== typeof (y))
        return false;
    return equalsCore(x, y);
}
exports.strictEquals = strictEquals;
class LocalStorageHelper {
    static _getLocalStorage() {
        try {
            if (window.localStorage)
                return window.localStorage;
        }
        catch (_) { }
        return undefined;
    }
    static getItem(key, defaultValue = null) {
        var localStorage = LocalStorageHelper._getLocalStorage();
        if (localStorage) {
            return localStorage.getItem(key);
        }
        return defaultValue;
    }
    static setItem(key, value) {
        var localStorage = LocalStorageHelper._getLocalStorage();
        if (localStorage) {
            return localStorage.setItem(key, value);
        }
    }
}
exports.LocalStorageHelper = LocalStorageHelper;
function findIndex(array, predicate) {
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i]))
            return i;
    }
    return -1;
}
exports.findIndex = findIndex;
function findLastIndex(array, predicate) {
    for (let i = array.length - 1; i >= 0; --i) {
        if (predicate(array[i]))
            return i;
    }
    return -1;
}
exports.findLastIndex = findLastIndex;
function createSvgIconElement(iconId) {
    const svgNS = 'http://www.w3.org/2000/svg';
    const xlinkNS = 'http://www.w3.org/1999/xlink';
    let useElement = document.createElementNS(svgNS, 'use');
    useElement.setAttributeNS(xlinkNS, 'xlink:href', '#' + iconId);
    let template = document.createElementNS(svgNS, 'svg');
    template.appendChild(useElement);
    return template;
}
exports.createSvgIconElement = createSvgIconElement;
function renderImage(container, imageData) {
    let img = document.createElement('img');
    img.src = 'data:image/png;base64,' + imageData.value;
    container.appendChild(img);
}
exports.renderImage = renderImage;
class RedBlackTree {
    constructor(compare) {
        this._root = null;
        this._compare = null;
        this._compare = compare;
    }
    getOrAdd(key, getValue) {
        if (this._root == null) {
            let value = getValue();
            this._root = new RedBlackNode(null, key, value);
            this._root.isRed = false;
            return { added: true, value: value };
        }
        let last = this._root;
        while (true) {
            let relation = this._compare(key, last.key);
            if (relation === 0)
                return { added: false, value: last.value };
            if (relation < 0) {
                if (last.left == null) {
                    let value = getValue();
                    last.left = new RedBlackNode(last, key, value);
                    this._rebalance(last.left);
                    return { added: true, value: value };
                }
                else {
                    last = last.left;
                }
            }
            else {
                if (last.right == null) {
                    let value = getValue();
                    last.right = new RedBlackNode(last, key, value);
                    this._rebalance(last.right);
                    return { added: true, value: value };
                }
                else {
                    last = last.right;
                }
            }
        }
    }
    _rebalance(node) {
        if (node.parent == null) {
            node.isRed = false;
            return;
        }
        while (node.parent != null && node.parent.isRed) {
            if (node.parent.parent.isRed) {
                node.parent.isRed = false;
                return;
            }
            if (node.parent == node.parent.parent.left) {
                let uncle = node.parent.parent.right;
                if (uncle != null && uncle.isRed) {
                    node.parent.isRed = false;
                    uncle.isRed = false;
                    node.parent.parent.isRed = true;
                    node = node.parent.parent;
                }
                else {
                    if (node == node.parent.right) {
                        node = node.parent;
                        this._rotateLeft(node);
                    }
                    node.parent.isRed = false;
                    node.parent.parent.isRed = true;
                    this._rotateRight(node.parent.parent);
                }
            }
            else {
                let uncle = node.parent.parent.left;
                if (uncle != null && uncle.isRed == true) {
                    node.parent.isRed = false;
                    uncle.isRed = false;
                    node.parent.parent.isRed = true;
                    node = node.parent.parent;
                }
                else {
                    if (node == node.parent.left) {
                        node = node.parent;
                        this._rotateRight(node);
                    }
                    node.parent.isRed = false;
                    node.parent.parent.isRed = true;
                    this._rotateLeft(node.parent.parent);
                }
            }
        }
        this._root.isRed = false;
    }
    _rotateLeft(node) {
        var right = node.right;
        node.right = right.left;
        if (right.left != null)
            right.left.parent = node;
        right.parent = node.parent;
        if (node.parent == null) {
            this._root = right;
        }
        else if (node == node.parent.left) {
            node.parent.left = right;
        }
        else {
            node.parent.right = right;
        }
        right.left = node;
        node.parent = right;
    }
    _rotateRight(node) {
        var left = node.left;
        node.left = left.right;
        if (left.right != null) {
            left.right.parent = node;
        }
        left.parent = node.parent;
        if (node.parent == null) {
            this._root = left;
        }
        else if (node == node.parent.left) {
            node.parent.left = left;
        }
        else {
            node.parent.right = left;
        }
        left.right = node;
        node.parent = left;
    }
}
exports.RedBlackTree = RedBlackTree;
class RedBlackNode {
    constructor(parent, key, value) {
        this.left = null;
        this.right = null;
        this.parent = parent;
        this.key = key;
        this.value = value;
        this.isRed = true;
    }
}
function unwrapSpecialNullValue(value) {
    return value === special_values_1.specialValues.nullValueGuid ? null : value;
}
exports.unwrapSpecialNullValue = unwrapSpecialNullValue;
