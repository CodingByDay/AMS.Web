﻿/**
* DevExpress Dashboard (_list-source.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listSource = void 0;
const _formatter_1 = require("./_formatter");
class listSource {
    constructor(dataSource, dataMembers) {
        this.dataSource = this._wrapIfRequired(dataSource, dataMembers);
        this.dataMembers = dataMembers;
        if (this.dataSource && this.dataMembers) {
            this.rowCount = this.dataSource.length;
            this.columnCount = this.dataMembers.length;
        }
        else {
            this.dataSource = [];
            this.dataMembers = [];
            this.rowCount = 0;
            this.columnCount = 0;
        }
    }
    _wrapIfRequired(dataSource, dataMembers) {
        var dataRow, dataSourceWrapper = [], isWrapRequired = dataSource && dataSource.length > 0 && Array.isArray(dataSource) && Array.isArray(dataSource[0]);
        if (isWrapRequired) {
            for (var i = 0; i < dataSource.length; i++) {
                dataRow = dataSource[i];
                if (dataMembers && dataRow && dataRow.length === dataMembers.length) {
                    dataSourceWrapper[i] = {};
                    for (var j = 0; j < dataRow.length; j++) {
                        dataSourceWrapper[i][dataMembers[j]] = dataRow[j];
                    }
                }
                else {
                    isWrapRequired = false;
                    break;
                }
            }
        }
        return isWrapRequired ? dataSourceWrapper : dataSource;
    }
    getRowValue(rowIndex, dataMember) {
        return this.dataSource[rowIndex][dataMember];
    }
    getFormattedRowValue(rowIndex, dataMember, formatInfo) {
        var value = this.getRowValue(rowIndex, dataMember);
        return _formatter_1.formatNumeric(value, formatInfo);
    }
    getFormattedArgumentRowValue(rowIndex, dataMember, formatInfo) {
        var value = this.getRowValue(rowIndex, dataMember);
        return _formatter_1.format(value, formatInfo);
    }
    getColumnIndex(dataMember) {
        return this.dataMembers.indexOf(dataMember);
    }
    getRowCount() {
        return this.rowCount;
    }
}
exports.listSource = listSource;
