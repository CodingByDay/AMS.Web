/**
* DevExpress Dashboard (_hidden-caption-toolbar.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenCaptionToolbar = void 0;
class HiddenCaptionToolbar {
    constructor() {
        this.element = document.createElement('div');
        this.disabled = false;
    }
    calcHeight(options) {
        return 0;
    }
    calcMinWidth(options) {
        return 0;
    }
    update(options) {
        return false;
    }
    onResize() {
    }
    dispose() {
    }
}
exports.HiddenCaptionToolbar = HiddenCaptionToolbar;
