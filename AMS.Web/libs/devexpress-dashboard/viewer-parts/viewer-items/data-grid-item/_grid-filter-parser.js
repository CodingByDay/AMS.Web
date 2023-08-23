﻿/**
* DevExpress Dashboard (_grid-filter-parser.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFilter = void 0;
const _utils_1 = require("../../../data/_utils");
function parseFilter(filterItems, columns, columnIndex, dateToString) {
    var resultFilterString = '';
    if (_utils_1.type.isFunction(filterItems[0])) {
        var exprColumnIndex = columnIndex === undefined ? filterItems.columnIndex : columnIndex;
        return _parseFilterOperatorPart(filterItems, columns, exprColumnIndex, dateToString);
    }
    else {
        for (var i = 0; i < filterItems.length; i++) {
            var filterItem = filterItems[i];
            resultFilterString += _utils_1.type.isString(filterItem) ? ' ' + filterItem + ' ' : parseFilter(filterItem, columns, filterItems.columnIndex, dateToString);
        }
    }
    return '(' + resultFilterString + ')';
}
exports.parseFilter = parseFilter;
function _parseFilterOperatorPart(filterItemPart, columns, exprColumnIndex, dateToString) {
    var partOperator = filterItemPart[1], value = filterItemPart[2], column = columns[exprColumnIndex], dataField = column.dataField, unaryOperator = 'not', binaryOperators = [
        'contains',
        'startswith',
        'endswith'
    ], format = function (fmtstr, ...argArray) {
        var args = Array.prototype.slice.call(arguments, 1);
        return fmtstr.replace(/\{(\d+)\}/g, function (match, index) {
            return args[index];
        });
    };
    if (partOperator.indexOf(unaryOperator) != -1) {
        filterItemPart[1] = partOperator.replace(unaryOperator, '').trim();
        var builder = _parseFilterOperatorPart(filterItemPart, columns, exprColumnIndex, dateToString);
        return format('{0}({1})', unaryOperator, builder);
    }
    if (!_utils_1.type.isDefined(value))
        value = null;
    if (binaryOperators.indexOf(partOperator) != -1)
        return format("{1}([{0}], '{2}')", dataField, partOperator, value);
    if (value === null || _utils_1.type.isNumeric(value) || _utils_1.type.isBoolean(value))
        return format('[{0}] {1} {2}', dataField, partOperator, value);
    if (column.dataType === 'date')
        return format('[{0}] {1} #{2}#', dataField, partOperator, dateToString(value));
    return format("[{0}] {1} '{2}'", dataField, partOperator, value);
}
