﻿/**
* DevExpress Dashboard (_card-virtualization-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardVirtualizationController = void 0;
const _new_card_item_1 = require("./_new-card-item");
class CardVirtualizationController {
    constructor(table, scrollView) {
        this.table = table;
        this.scrollView = scrollView;
        scrollView.option('onScroll', (args) => { this.onScroll(args); });
    }
    init(cardArrangements, drawHandler) {
        this.drawHandler = drawHandler;
        this.cardArrangements = cardArrangements;
    }
    drawByScroll(offset) {
        var arrangements = this.cardArrangements;
        if (arrangements) {
            var top = offset;
            var bottom = offset + arrangements.viewerHeight;
            var topRowIndex = Math.floor(top / arrangements.cellHeight);
            var bottomRowIndex = Math.ceil(bottom / arrangements.cellHeight);
            var startCardIndex = Math.max(0, topRowIndex * arrangements.columnCount - arrangements.columnCount * 3);
            var endCardIndex = Math.min(arrangements.itemsCount - 1, (bottomRowIndex * arrangements.columnCount) - 1 + arrangements.columnCount * 3);
            this.drawHandler(startCardIndex, endCardIndex);
        }
    }
    onScroll(args) {
        var that = this;
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = window.setTimeout(() => {
            that.drawByScroll(args.scrollOffset.top);
        }, 100);
    }
    getSizeParams() {
        var scrollOffset = this.scrollView.scrollOffset();
        return {
            virtualSize: {
                width: this.cardArrangements.getScrollableWidth(),
                height: this.cardArrangements.getScrollableHeight()
            },
            scroll: {
                top: scrollOffset.top,
                left: scrollOffset.left,
                size: 0,
                horizontal: this.cardArrangements.hasHorizontalScroll(),
                vertical: this.cardArrangements.hasVerticalScroll()
            },
            itemMargin: {
                width: 5,
                height: 5
            },
            layoutMeasurement: {
                margin: _new_card_item_1.newCardMeasurements.margin,
                contentPadding: _new_card_item_1.newCardMeasurements.padding
            }
        };
    }
    updateScrollableContent(action) {
        var scrollOffset = this.scrollView.scrollOffset();
        action();
        this.scrollView.scrollTo(scrollOffset);
        this.drawByScroll(scrollOffset.top);
    }
}
exports.CardVirtualizationController = CardVirtualizationController;
