﻿/**
* DevExpress Dashboard (_client-filter-manager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFilterManager = void 0;
class ClientFilterManager {
    constructor(_updateTotals) {
        this._updateTotals = _updateTotals;
        _updateTotals.subscribe(value => {
            if (!value)
                this.clearFilterParams();
        });
    }
    getFilterParams() {
        return this._filterParams;
    }
    setFilterParams(clientFilter) {
        if (this._updateTotals()) {
            this._filterParams = clientFilter;
        }
    }
    clearFilterParams() {
        this._filterParams = undefined;
    }
    setFilterState(filterValue) {
        this._filterState = filterValue;
    }
    getFilterState() {
        return this._filterState;
    }
}
exports.ClientFilterManager = ClientFilterManager;
