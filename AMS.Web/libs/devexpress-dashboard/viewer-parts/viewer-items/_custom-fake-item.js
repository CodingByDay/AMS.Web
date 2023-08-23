﻿/**
* DevExpress Dashboard (_custom-fake-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customFakeItem = void 0;
const _localization_ids_1 = require("../../data/_localization-ids");
const _localizer_1 = require("../../data/_localizer");
const _base_item_1 = require("./_base-item");
class customFakeItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var div = document.createElement('div');
        div.classList.add('dx-dashboard-custom-item-notsupported-message');
        div.innerText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.MessageCustomItemIsNotSupported);
        element.appendChild(div);
        return false;
    }
    _ensureToolbarIsRendered() {
        return null;
    }
}
exports.customFakeItem = customFakeItem;
