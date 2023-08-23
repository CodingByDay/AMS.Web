﻿/**
* DevExpress Dashboard (_group-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupItem = void 0;
const _render_helper_1 = require("../widgets/_render-helper");
const _base_item_1 = require("./_base-item");
class groupItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        element.classList.add(_base_item_1.cssClassNamesBaseItem.groupItem);
        return false;
    }
    _itemHasOwnContent() {
        return false;
    }
    _toggleLoadingPanel() {
    }
    getOffset() {
        var borderSize = _render_helper_1.RenderHelper.getBorderSizeByClasses([_base_item_1.cssClassNamesBaseItem.groupItem]);
        return {
            width: borderSize.width,
            height: borderSize.height + this._calcHeaderAndFooterHeight()
        };
    }
}
exports.groupItem = groupItem;
