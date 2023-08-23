﻿/**
* DevExpress Dashboard (_drill-through-data-wrapper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DrillThroughDataWrapper = void 0;
const _list_source_1 = require("../_list-source");
class DrillThroughDataWrapper {
    constructor(drillThroughData) {
        this._drillThroughData = drillThroughData;
    }
    initialize() {
        var that = this;
        that._errorMessage = this._drillThroughData.ErrorMessage;
        if (that.isDataReceived()) {
            that._data = {};
            that._data.dataMembers = that._drillThroughData.DataMembers;
            that._data.displayNames = that._drillThroughData.DataMembersDisplayNames;
            that._data.listSource = new _list_source_1.listSource(that._drillThroughData.Data, that._data.dataMembers);
        }
    }
    getRowCount() {
        return this._data.listSource.getRowCount();
    }
    getRowValue(rowIndex, columnName) {
        return this._data.listSource.getRowValue(rowIndex, columnName);
    }
    getDataMembers() {
        return this._data.dataMembers;
    }
    getDisplayNames() {
        return this._data.data.displayNames;
    }
    isDataReceived() {
        return this._drillThroughData && this._drillThroughData.Data != null;
    }
    getRequestDataError() {
        return this._errorMessage;
    }
}
exports.DrillThroughDataWrapper = DrillThroughDataWrapper;
