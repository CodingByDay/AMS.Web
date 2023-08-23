﻿/**
* DevExpress Dashboard (_expanding-manager.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandingManager = void 0;
const _date_utils_1 = require("./_date-utils");
class ExpandingManager {
    constructor() {
        this._expandingParams = undefined;
        this._expandingState = undefined;
    }
    getPivotExpandViewState() {
        return this._dxPivotState;
    }
    setExpandingParams(expandingParams) {
        this._expandingParams = expandingParams;
    }
    onViewStateChanged(expandingState, dxPivotState) {
        this._expandingState = expandingState;
        this._dxPivotState = dxPivotState;
    }
    canProvideExpandingState() {
        return this._expandingParams || this._expandingState;
    }
    calculateExpandingState() {
        var params = this._expandingParams;
        var state = this._expandingState;
        return {
            rows: state && _date_utils_1.toStringArray(state.rows) || [],
            columns: state && _date_utils_1.toStringArray(state.columns) || [],
            values: !!params ? _date_utils_1.toStringArray(params.values) : undefined,
            isColumn: !!params && params.isColumn
        };
    }
    resetExpandingParams() {
        this._expandingParams = undefined;
    }
    resetColumnViewState(autoExpand) {
        this._expandingState = { rows: this._expandingState.rows, columns: [] };
        if (this._dxPivotState) {
            this._dxPivotState.fields && this._dxPivotState.fields.filter(f => f.area === 'column').forEach(f => { f.expanded = autoExpand; });
            this._dxPivotState.columnExpandedPaths = [];
        }
    }
    resetRowViewState(autoExpand) {
        this._expandingState = { rows: [], columns: this._expandingState.columns };
        if (this._dxPivotState) {
            this._dxPivotState.fields && this._dxPivotState.fields.filter(f => f.area === 'row').forEach(f => { f.expanded = autoExpand; });
            this._dxPivotState.rowExpandedPaths = [];
        }
    }
}
exports.ExpandingManager = ExpandingManager;
