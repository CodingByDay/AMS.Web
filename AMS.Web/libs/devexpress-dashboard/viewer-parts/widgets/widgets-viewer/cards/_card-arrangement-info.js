﻿/**
* DevExpress Dashboard (_card-arrangement-info.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardArrangementInfo = exports.borders = exports.paddings = exports.margins = void 0;
const _new_card_item_1 = require("./_new-card-item");
exports.margins = _new_card_item_1.newCardMeasurements.margin * 2, exports.paddings = _new_card_item_1.newCardMeasurements.padding * 2, exports.borders = _new_card_item_1.newCardMeasurements.borderWidth * 2;
class cardArrangementInfo {
    constructor() {
        this.etalonWidth = 11;
        this.etalonHeight = 10;
        this.arrangementDirection = 'column';
        this.ignorePadding = false;
    }
    getMarginOffset() {
        return this.ignorePadding ? exports.margins : 0;
    }
    getScrollableHeight() {
        return Math.max(this.rowCount * this.cellHeight - this.getMarginOffset(), this.viewerHeight);
    }
    getScrollableWidth() {
        return Math.max(this.columnCount * this.cellWidth - this.getMarginOffset(), this.viewerWidth);
    }
    proportionFactor() {
        return Math.abs(((this.etalonWidth - this.etalonHeight) / (this.etalonWidth + this.etalonHeight)) - ((this.cellWidth - this.cellHeight) / (this.cellWidth + this.cellHeight)));
    }
    getCardContentHeight() {
        return this.cellHeight - exports.margins - exports.paddings - exports.borders;
    }
    getCardContentWidth() {
        return this.cellWidth - exports.margins - exports.paddings - exports.borders;
    }
    getCardWidth() {
        return this.cellWidth - exports.margins;
    }
    getCardHeight() {
        return this.cellHeight - exports.margins;
    }
    hasVerticalScroll() {
        return this.getScrollableHeight() > this.viewerHeight;
    }
    hasHorizontalScroll() {
        return this.getScrollableWidth() > this.viewerWidth;
    }
}
exports.cardArrangementInfo = cardArrangementInfo;
