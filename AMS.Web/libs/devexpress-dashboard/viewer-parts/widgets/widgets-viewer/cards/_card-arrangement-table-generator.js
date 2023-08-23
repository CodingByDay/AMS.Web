﻿/**
* DevExpress Dashboard (_card-arrangement-table-generator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardArrangementTableGenerator = void 0;
const $ = require("jquery");
const _css_class_names_1 = require("../_css-class-names");
const _new_card_item_1 = require("./_new-card-item");
class cardArrangementTableGenerator {
    generateTable(container, cardArrangements) {
        this.reset();
        this.cardArrangements = cardArrangements;
        this.generateCells(container, this.cardArrangements);
    }
    drawCellContent(startIndex, endIndex, drawHandler) {
        for (var i = startIndex; i <= endIndex; i++) {
            drawHandler(this.cells[i], this.cardArrangements, i);
        }
    }
    reset() {
        this.cells = [];
    }
    generateCells(tableStruct, cardArrangements) {
        if (cardArrangements.arrangementDirection === 'column') {
            for (var rowIndex = 0; rowIndex < cardArrangements.rowCount; rowIndex++) {
                var row = this.createRow(cardArrangements, rowIndex);
                for (var columnIndex = 0; columnIndex < cardArrangements.columnCount; columnIndex++) {
                    var itemIndex = rowIndex * cardArrangements.columnCount + columnIndex;
                    if (itemIndex >= cardArrangements.itemsCount)
                        break;
                    var cell = this.createCell(cardArrangements, rowIndex, columnIndex);
                    this.cells.push(cell);
                    row.append(cell);
                }
                tableStruct.append(row);
            }
        }
        else {
            var rows = {};
            var getRow = (index) => {
                var row = rows[index];
                if (!row) {
                    row = this.createRow(cardArrangements, index);
                    rows[index] = row;
                }
                return row;
            };
            for (var columnIndex = 0; columnIndex < cardArrangements.columnCount; columnIndex++) {
                for (var rowIndex = 0; rowIndex < cardArrangements.rowCount; rowIndex++) {
                    var itemIndex = columnIndex * cardArrangements.rowCount + rowIndex;
                    if (itemIndex >= cardArrangements.itemsCount)
                        break;
                    var row = getRow(rowIndex);
                    var cell = this.createCell(cardArrangements, rowIndex, columnIndex);
                    this.cells.push(cell);
                    row.append(cell);
                }
                $.each(rows, function (_, row) {
                    tableStruct.append(row);
                });
            }
        }
    }
    createRow(cardArrangements, rowIndex) {
        var actualHeight = cardArrangements.cellHeight;
        if (cardArrangements.ignorePadding && rowIndex === 0) {
            actualHeight -= _new_card_item_1.newCardMeasurements.margin;
        }
        if (cardArrangements.ignorePadding && rowIndex === cardArrangements.rowCount - 1) {
            actualHeight -= _new_card_item_1.newCardMeasurements.margin;
        }
        var div = $.fn.constructor('<div>', {
            'class': _css_class_names_1.cssClassNames.widgetViewerRow, css: {
                height: actualHeight,
                width: cardArrangements.getScrollableWidth()
            }
        });
        return div;
    }
    createCell(cardArrangements, rowIndex, columnIndex) {
        var actualWidth = cardArrangements.cellWidth;
        var actualHeight = cardArrangements.cellHeight;
        var ignorePadding = cardArrangements.ignorePadding;
        var ignoreLeft = false, ignoreRight = false, ignoreTop = false, ignoreBottom = false;
        if (ignorePadding && columnIndex === 0) {
            actualWidth -= _new_card_item_1.newCardMeasurements.margin;
            ignoreLeft = true;
        }
        if (ignorePadding && columnIndex === cardArrangements.columnCount - 1) {
            actualWidth -= _new_card_item_1.newCardMeasurements.margin;
            ignoreRight = true;
        }
        if (ignorePadding && rowIndex === 0) {
            actualHeight -= _new_card_item_1.newCardMeasurements.margin;
            ignoreTop = true;
        }
        if (ignorePadding && rowIndex === cardArrangements.rowCount - 1) {
            actualHeight -= _new_card_item_1.newCardMeasurements.margin;
            ignoreBottom = true;
        }
        var div = $.fn.constructor('<div >', {
            'class': _css_class_names_1.cssClassNames.widgetViewerCell,
            css: {
                height: actualHeight,
                width: actualWidth,
                float: 'left'
            }
        });
        if (ignoreLeft)
            div.addClass('dx-flex-card-cell-ignore-left-margin');
        if (ignoreRight)
            div.addClass('dx-flex-card-cell-ignore-right-margin');
        if (ignoreTop)
            div.addClass('dx-flex-card-cell-ignore-top-margin');
        if (ignoreBottom)
            div.addClass('dx-flex-card-cell-ignore-bototm-margin');
        return div;
    }
}
exports.cardArrangementTableGenerator = cardArrangementTableGenerator;
