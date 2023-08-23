/**
* DevExpress Dashboard (_stub-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stubItem = void 0;
const _base_item_1 = require("./_base-item");
class stubItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var options = this.options;
        element.innerText = options.Type;
        return false;
    }
}
exports.stubItem = stubItem;
