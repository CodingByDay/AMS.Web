"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Data = exports.SetAbsoluteY = exports.SetAbsoluteX = void 0;
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var common_1 = require("@devexpress/utils/lib/utils/common");
function IsNumber(str) {
    return !isNaN(parseFloat(str)) && isFinite(str);
}
function SetAbsoluteX(element, x) {
    element.style.left = prepareClientPosForElement(x, element, true) + "px";
}
exports.SetAbsoluteX = SetAbsoluteX;
function SetAbsoluteY(element, y) {
    element.style.top = prepareClientPosForElement(y, element, false) + "px";
}
exports.SetAbsoluteY = SetAbsoluteY;
function prepareClientPosForElement(pos, element, isX) {
    pos -= getPositionElementOffset(element, isX);
    return pos;
}
function getPositionElementOffset(element, isX) {
    var div = createElementMock(element);
    if (div.style.position === "static")
        div.style.position = "absolute";
    element.parentNode.appendChild(div);
    var realPos = isX ? dom_1.DomUtils.getAbsolutePositionX(div) : dom_1.DomUtils.getAbsolutePositionY(div);
    element.parentNode.removeChild(div);
    return Math.round(realPos);
}
function createElementMock(element) {
    var div = document.createElement("DIV");
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.visibility = "hidden";
    div.style.position = dom_1.DomUtils.getCurrentStyle(element).position;
    return div;
}
var Data = (function () {
    function Data() {
    }
    Data.ArrayInsert = function (array, element, position) {
        if (0 <= position && position < array.length) {
            for (var i = array.length; i > position; i--)
                array[i] = array[i - 1];
            array[position] = element;
        }
        else
            array.push(element);
    };
    Data.ArrayRemove = function (array, element) {
        var index = Data.ArrayIndexOf(array, element);
        if (index > -1)
            Data.ArrayRemoveAt(array, index);
    };
    Data.ArrayRemoveAt = function (array, index) {
        if (index >= 0 && index < array.length) {
            for (var i = index; i < array.length - 1; i++)
                array[i] = array[i + 1];
            array.pop();
        }
    };
    Data.ArrayClear = function (array) {
        while (array.length > 0)
            array.pop();
    };
    Data.ArrayIndexOf = function (array, element, comparer) {
        if (!comparer)
            for (var i = 0; i < array.length; i++) {
                if (array[i] === element)
                    return i;
            }
        else
            for (var i = 0; i < array.length; i++)
                if (comparer(array[i], element))
                    return i;
        return -1;
    };
    Data.ArrayContains = function (array, element) {
        return Data.ArrayIndexOf(array, element) >= 0;
    };
    Data.ArrayEqual = function (array1, array2) {
        var count1 = array1.length;
        var count2 = array2.length;
        if (count1 !== count2)
            return false;
        for (var i = 0; i < count1; i++)
            if (array1[i] !== array2[i])
                return false;
        return true;
    };
    Data.ArraySame = function (array1, array2) {
        if (array1.length !== array2.length)
            return false;
        return array1.every(function (elem) { return Data.ArrayContains(array2, elem); });
    };
    Data.ArrayGetIntegerEdgeValues = function (array) {
        var arrayToSort = Data.CollectionToArray(array);
        Data.ArrayIntegerAscendingSort(arrayToSort);
        return {
            start: arrayToSort[0],
            end: arrayToSort[arrayToSort.length - 1]
        };
    };
    Data.ArrayIntegerAscendingSort = function (array) {
        Data.ArrayIntegerSort(array, false);
    };
    Data.ArrayIntegerSort = function (array, desc) {
        array.sort(function (i1, i2) {
            var res = 0;
            if (i1 > i2)
                res = 1;
            else if (i1 < i2)
                res = -1;
            if (desc)
                res *= -1;
            return res;
        });
    };
    Data.CollectionsUnionToArray = function (firstCollection, secondCollection) {
        var result = [];
        var firstCollectionLength = firstCollection.length;
        var secondCollectionLength = secondCollection.length;
        for (var i = 0; i < firstCollectionLength + secondCollectionLength; i++)
            if (i < firstCollectionLength)
                result.push(firstCollection[i]);
            else
                result.push(secondCollection[i - firstCollectionLength]);
        return result;
    };
    Data.CollectionToArray = function (collection) {
        var array = [];
        for (var i = 0; i < collection.length; i++)
            array.push(collection[i]);
        return array;
    };
    Data.CreateHashTableFromArray = function (array) {
        var hash = [];
        for (var i = 0; i < array.length; i++)
            hash[array[i]] = 1;
        return hash;
    };
    Data.CreateIndexHashTableFromArray = function (array) {
        var hash = [];
        for (var i = 0; i < array.length; i++)
            hash[array[i]] = i;
        return hash;
    };
    Data.ArrayToHash = function (array, getKeyFunc, getValueFunc) {
        if (!(array instanceof Array))
            return {};
        return array.reduce(function (map, element, index) {
            var key = getKeyFunc(element, index);
            var value = getValueFunc(element, index);
            map[key] = value;
            return map;
        }, {});
    };
    Data.Sum = function (array, getValueFunc) {
        if (!(array instanceof Array))
            return 0;
        return array.reduce(function (prevValue, item) {
            var value = getValueFunc ? getValueFunc(item) : item;
            if (!IsNumber(value))
                value = 0;
            return prevValue + value;
        }, 0);
    };
    Data.Min = function (array, getValueFunc) { return Data.CalculateArrayMinMax(array, getValueFunc, false); };
    Data.Max = function (array, getValueFunc) { return Data.CalculateArrayMinMax(array, getValueFunc, true); };
    Data.NearestLeftBinarySearchComparer = function (array, index, value) {
        var arrayElement = array[index];
        var leftPoint = arrayElement < value;
        var lastLeftPoint = leftPoint && index === array.length - 1;
        var nearestLeftPoint = lastLeftPoint || (leftPoint && array[index + 1] >= value);
        if (nearestLeftPoint)
            return 0;
        else
            return arrayElement < value ? -1 : 1;
    };
    Data.ArrayBinarySearch = function (array, value, binarySearchComparer, startIndex, length) {
        if (!binarySearchComparer)
            binarySearchComparer = Data.defaultBinarySearchComparer;
        if (!common_1.isDefined(startIndex))
            startIndex = 0;
        if (!common_1.isDefined(length))
            length = array.length - startIndex;
        var endIndex = (startIndex + length) - 1;
        while (startIndex <= endIndex) {
            var middle = (startIndex + ((endIndex - startIndex) >> 1));
            var compareResult = binarySearchComparer(array, middle, value);
            if (compareResult === 0)
                return middle;
            if (compareResult < 0)
                startIndex = middle + 1;
            else
                endIndex = middle - 1;
        }
        return -(startIndex + 1);
    };
    Data.ArrayFlatten = function (arrayOfArrays) {
        var result = [];
        arrayOfArrays.forEach(function (arr) {
            result = result.concat(arr);
        });
        return result;
    };
    Data.GetDistinctArray = function (array) {
        var resultArray = [];
        for (var i = 0; i < array.length; i++) {
            var currentEntry = array[i];
            if (Data.ArrayIndexOf(resultArray, currentEntry) === -1)
                resultArray.push(currentEntry);
        }
        return resultArray;
    };
    Data.ForEach = function (arr, callback) {
        if (Array.prototype.forEach)
            Array.prototype.forEach.call(arr, callback);
        else
            for (var i = 0, len = arr.length; i < len; i++)
                callback(arr[i], i, arr);
    };
    Data.MergeHashTables = function (target, object) {
        if (!object || typeof (object) === "string")
            return target;
        if (!target)
            target = {};
        for (var key in object)
            if (key && !(key in target))
                target[key] = object[key];
        return target;
    };
    Data.Range = function (count, start) {
        count = parseInt(count) || 0;
        start = parseInt(start) || 0;
        if (count < 0)
            count = 0;
        if (start < 0)
            start = 0;
        var result = Array(count);
        return result.map(function (_val, i) { return start + i; });
    };
    Data.CalculateArrayMinMax = function (array, getValueFunc, isMax) {
        if (!(array instanceof Array))
            return 0;
        var startValue = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
        return array.reduce(function (prevValue, item) {
            var value = getValueFunc ? getValueFunc(item) : item;
            if (!IsNumber(value))
                value = startValue;
            var func = isMax ? Math.max : Math.min;
            return func(value, prevValue);
        }, startValue);
    };
    Data.byRange = function (value, min, max) {
        return Math.min(Math.max(value, min), max);
    };
    Data.defaultBinarySearchComparer = function (array, index, value) {
        var arrayElement = array[index];
        if (arrayElement === value)
            return 0;
        else
            return arrayElement < value ? -1 : 1;
    };
    Data.cssTextToObject = function (cssText) {
        if (!cssText)
            return {};
        cssText = cssText.replace(/\/\*(.|\s)*?\*\//g, "").replace(/\s+/g, " ");
        return cssText.split(";").reduce(function (acc, val) {
            if (val) {
                var matches = /\s*([^:]+?)\s*:\s*([^;]*)\s*$/.exec(val);
                if (matches) {
                    var name_1 = matches[1], value = matches[2];
                    name_1 && value && (acc[name_1.trim()] = value.trim());
                }
                return acc;
            }
            return acc;
        }, {});
    };
    Data.objectToCssText = function (obj) {
        if (!obj)
            return "";
        return Object.keys(obj).reduce(function (acc, key) {
            var name = key.trim();
            var value = obj[key];
            if (name && value)
                acc.push(name + ": " + value.toString().trim());
            return acc;
        }, []).join("; ");
    };
    return Data;
}());
exports.Data = Data;
//# sourceMappingURL=Data.js.map