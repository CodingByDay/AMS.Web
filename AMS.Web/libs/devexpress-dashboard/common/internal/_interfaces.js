﻿/**
* DevExpress Dashboard (_interfaces.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleTabItemSizeController = exports.SingleItemSizeController = exports.KeyCodes = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
exports.KeyCodes = {
    Esc: 27,
    Delete: 46,
    Z: 90,
    Y: 89,
    S: 83
};
class SingleItemSizeController {
    constructor(_element, requestRepaint, itemMargins = 0) {
        this._element = _element;
        this.requestRepaint = requestRepaint;
        this.itemMargins = itemMargins;
        this.renderImmediately = true;
    }
    getWidth() {
        return _jquery_helpers_1.getWidth(this._element) - this.itemMargins;
    }
    getHeight() {
        return _jquery_helpers_1.getHeight(this._element) - this.itemMargins;
    }
    setConstraints(constraints) {
    }
}
exports.SingleItemSizeController = SingleItemSizeController;
class SingleTabItemSizeController {
    constructor(requestRepaint, width, height) {
        this.requestRepaint = requestRepaint;
        this.width = width;
        this.height = height;
        this.renderImmediately = true;
    }
    getWidth() {
        return this.width();
    }
    getHeight() {
        return this.height();
    }
    setConstraints(constraints) {
    }
}
exports.SingleTabItemSizeController = SingleTabItemSizeController;
