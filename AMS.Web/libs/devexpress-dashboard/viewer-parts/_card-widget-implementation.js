﻿/**
* DevExpress Dashboard (_card-widget-implementation.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardWidgetImplementation = void 0;
class CardWidgetImplementation {
    constructor(notifyHandler) {
        this._onCustomizeText = undefined;
        this._cardBackColor = undefined;
        this.element = () => {
            return this._element;
        };
        this._notifyChanged = notifyHandler;
    }
    _changed() {
        this._notifyChanged && this._notifyChanged();
    }
    get onCustomizeText() {
        return this._onCustomizeText;
    }
    set onCustomizeText(value) {
        this._onCustomizeText = value;
        this._changed();
    }
    get cardBackColor() {
        return this._cardBackColor;
    }
    set cardBackColor(value) {
        this._cardBackColor = value;
        this._changed();
    }
}
exports.CardWidgetImplementation = CardWidgetImplementation;
