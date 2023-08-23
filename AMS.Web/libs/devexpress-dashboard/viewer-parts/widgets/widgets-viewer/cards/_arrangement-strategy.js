﻿/**
* DevExpress Dashboard (_arrangement-strategy.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RowArrangementStrategy = exports.ColumnArrangementStrategy = exports.AutoArrangementStrategy = exports.ArrangementStrategy = void 0;
const _card_arrangement_info_1 = require("./_card-arrangement-info");
const _card_measurer_1 = require("./_card-measurer");
class ArrangementStrategy {
    constructor() {
        this.cardMeasurer = new _card_measurer_1.cardMeasurer();
    }
    static createInstance(method, lineCount) {
        switch (method) {
            case 'column':
                return new ColumnArrangementStrategy(lineCount);
            case 'row':
                return new RowArrangementStrategy(lineCount);
            default:
                return new AutoArrangementStrategy();
        }
    }
    getArrangeMethod() {
        return '';
    }
    getLineCount() {
        return -1;
    }
    arrange(viewerHeight, viewerWidth, itemsCount, layouts, ignorePadding = false) {
        var getArrangementInfo = (nextColumnCount = undefined) => {
            var result = new _card_arrangement_info_1.cardArrangementInfo();
            var columnCount = nextColumnCount || this.getColumnCount(itemsCount, actualViewerWidth, cardMinWidth);
            columnCount = this.checkEmptyRows(columnCount, itemsCount);
            var rowCount = this.getRowCount(itemsCount, columnCount);
            var visibleColumnCount = Math.max(1, Math.min(columnCount, Math.floor(actualViewerWidth / cardMinWidth)));
            var visibleRowCount = Math.max(1, Math.min(rowCount, Math.floor(actualViewerHeight / cardMinHeight)));
            result.cellHeight = Math.max(cardMinHeight, Math.floor(actualViewerHeight / visibleRowCount));
            result.cellWidth = Math.max(cardMinWidth, Math.floor(actualViewerWidth / visibleColumnCount));
            result.columnCount = columnCount;
            result.rowCount = rowCount;
            result.itemsCount = itemsCount;
            result.ignorePadding = ignorePadding;
            result.viewerHeight = viewerHeight;
            result.viewerWidth = viewerWidth;
            result.arrangementDirection = this.getArrangementDirection();
            return result;
        };
        var marginOffset = ignorePadding ? _card_arrangement_info_1.margins : 0;
        var cardMinWidth = this.getCardMinWidthWithMargin(layouts);
        var cardMinHeight = this.getCardMinHeightWithMargin(layouts);
        var actualViewerWidth = viewerWidth + marginOffset;
        var actualViewerHeight = viewerHeight + marginOffset;
        return this.calcBestProportions(getArrangementInfo);
    }
    calcBestProportions(calcArrangementInfo) {
        return calcArrangementInfo();
    }
    getCardMinWidthWithMargin(layouts) {
        var largestWidth = layouts.map(layout => layout.minWidth).reduce((prev, curr) => Math.max(prev, curr));
        return largestWidth + _card_arrangement_info_1.paddings + _card_arrangement_info_1.borders + _card_arrangement_info_1.margins;
    }
    getCardMinHeightWithMargin(layouts) {
        var largestHeight = layouts.map(layout => this.cardMeasurer.calcMinHeight(layout)).reduce((prev, curr) => Math.max(prev, curr));
        return largestHeight + _card_arrangement_info_1.paddings + _card_arrangement_info_1.borders + _card_arrangement_info_1.margins;
    }
    checkEmptyRows(columnCount, itemsCount) {
        return columnCount;
    }
    getArrangementDirection() {
        return 'column';
    }
}
exports.ArrangementStrategy = ArrangementStrategy;
class AutoArrangementStrategy extends ArrangementStrategy {
    constructor() {
        super();
    }
    getArrangeMethod() {
        return 'auto';
    }
    getLineCount() {
        return -1;
    }
    getColumnCount(itemsCount, actualViewerWidth, cardMinWidth) {
        var columnCount = Math.max(1, Math.floor(actualViewerWidth / cardMinWidth));
        columnCount = Math.min(itemsCount, columnCount);
        return columnCount;
    }
    checkEmptyRows(columnCount, itemsCount) {
        var lastRowCount = () => itemsCount % columnCount;
        var fullRowCount = () => Math.floor(itemsCount / columnCount);
        var nextLastRowCount = () => lastRowCount() + fullRowCount();
        while (lastRowCount() > 0 && (nextLastRowCount() < columnCount)) {
            columnCount--;
        }
        return columnCount;
    }
    calcBestProportions(calcArrangementInfo) {
        var arrangementInfo = calcArrangementInfo();
        if (arrangementInfo.columnCount > 1) {
            var nextArrangementInfo = calcArrangementInfo(arrangementInfo.columnCount - 1);
            while (nextArrangementInfo.proportionFactor() < arrangementInfo.proportionFactor() && arrangementInfo.columnCount > 1) {
                arrangementInfo = nextArrangementInfo;
                nextArrangementInfo = calcArrangementInfo(arrangementInfo.columnCount - 1);
            }
        }
        return arrangementInfo;
    }
    getRowCount(itemsCount, columnCount) {
        return Math.ceil(itemsCount / columnCount);
    }
}
exports.AutoArrangementStrategy = AutoArrangementStrategy;
class ColumnArrangementStrategy extends ArrangementStrategy {
    constructor(columnCount) {
        super();
        this.columnCount = columnCount;
    }
    getArrangeMethod() {
        return 'column';
    }
    getLineCount() {
        return this.columnCount;
    }
    getColumnCount(itemsCount, actualViewerWidth, cardMinWidth) {
        return Math.min(itemsCount, this.columnCount);
    }
    getRowCount(itemsCount, columnCount) {
        return Math.max(1, Math.ceil(itemsCount / columnCount));
    }
}
exports.ColumnArrangementStrategy = ColumnArrangementStrategy;
class RowArrangementStrategy extends ArrangementStrategy {
    constructor(rowCount) {
        super();
        this.rowCount = rowCount;
    }
    getArrangementMethod() {
        return 'row';
    }
    getLineCount() {
        return this.rowCount;
    }
    getColumnCount(itemsCount, actualViewerWidth, cardMinWidth) {
        return Math.ceil(itemsCount / Math.min(itemsCount, this.rowCount));
    }
    getRowCount(itemsCount, columnCount) {
        return Math.min(itemsCount, this.rowCount);
    }
    getArrangementDirection() {
        return 'row';
    }
}
exports.RowArrangementStrategy = RowArrangementStrategy;
