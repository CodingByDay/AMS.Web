/**
* DevExpress Dashboard (_limit-data-state.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LimitDataState = void 0;
class LimitDataState {
    constructor() {
        this._visible = false;
        this._enabled = true;
    }
    get enabled() {
        return this._enabled;
    }
    setReduced() {
        this._visible = true;
        this._enabled = true;
    }
    getViewModel() {
        return {
            isReduceMode: this._visible,
            isReduced: this._enabled,
        };
    }
    toggle() {
        this._enabled = !this._enabled;
    }
    reset() {
        this._visible = false;
        this._enabled = true;
    }
}
exports.LimitDataState = LimitDataState;
