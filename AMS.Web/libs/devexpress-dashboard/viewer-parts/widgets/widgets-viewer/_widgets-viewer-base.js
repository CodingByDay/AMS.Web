﻿/**
* DevExpress Dashboard (_widgets-viewer-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetsViewerBase = void 0;
const options_1 = require("devextreme/core/options");
class WidgetsViewerBase {
    constructor(element, options) {
        this._initalized = false;
        this._element = typeof element === 'string' ? document.querySelector(element) : element;
        this._optionManager = new options_1.Options(this._getDefaultOptions(), this._getDefaultOptions(), {}, {});
        this._optionManager.onChanging(() => { });
        this._optionManager.onChanged(() => { });
        this._optionManager.onStartChange(() => { });
        this._optionManager.onEndChange(() => {
            if (this._initalized) {
                this._update();
            }
        });
        this._optionManager.option(options);
        this._init();
        this._initalized = true;
    }
    element() {
        return this._element;
    }
    option(...args) {
        return this._optionManager.option(...args);
    }
    get _option() {
        return this.option();
    }
    dispose() {
        this._optionManager.dispose();
    }
}
exports.WidgetsViewerBase = WidgetsViewerBase;
