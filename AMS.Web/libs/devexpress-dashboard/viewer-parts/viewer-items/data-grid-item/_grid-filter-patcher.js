﻿/**
* DevExpress Dashboard (_grid-filter-patcher.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCaseSensitiveFilterExpression = exports.allowedStringOperations = void 0;
exports.allowedStringOperations = ['contains', 'notcontains', 'startswith', 'endswith', '=', '<>'];
function getCaseSensitiveFilterExpression(cellValue, filterValue, filterOperation) {
    if (typeof cellValue !== 'string')
        return false;
    switch (filterOperation) {
        case 'contains':
            return cellValue.indexOf(filterValue) > -1;
        case 'notcontains':
            return cellValue.indexOf(filterValue) === -1;
        case 'startswith':
            return cellValue.startsWith(filterValue);
        case 'endswith':
            return cellValue.endsWith(filterValue);
        case '=':
            return cellValue === filterValue;
        case '<>':
            return cellValue !== filterValue;
    }
}
exports.getCaseSensitiveFilterExpression = getCaseSensitiveFilterExpression;
