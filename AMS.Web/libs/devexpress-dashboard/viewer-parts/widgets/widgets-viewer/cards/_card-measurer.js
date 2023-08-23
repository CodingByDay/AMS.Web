﻿/**
* DevExpress Dashboard (_card-measurer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardMeasurer = void 0;
const _cacheable_1 = require("../../../_cacheable");
const _css_class_names_1 = require("../_css-class-names");
const _card_layout_1 = require("./_card-layout");
var cssTypographyStyle = 'dx-theme-generic-typography';
class cardMeasurer {
    constructor() {
        this.DEFAULT_MIN_HEIGHT = 0;
    }
    static _getImageSpanHeight(width, height) {
        var imageSpan = document.createElement('div');
        imageSpan.classList.add(_css_class_names_1.cssClassNames.layoutCardHiddenContainer);
        imageSpan.style.width = width;
        imageSpan.style.height = height;
        document.body.appendChild(imageSpan);
        var res = imageSpan.getBoundingClientRect().height;
        imageSpan.parentNode.removeChild(imageSpan);
        return res;
    }
    static _getTextSpanHeight(fontSize, fontFamily) {
        var textSpan = document.createElement('div');
        textSpan.innerText = cardMeasurer.DIGITS_STRING;
        textSpan.classList.add(_css_class_names_1.cssClassNames.layoutCardHiddenContainer);
        textSpan.classList.add(cssTypographyStyle);
        textSpan.style.fontSize = fontSize;
        textSpan.style.fontFamily = fontFamily;
        document.body.appendChild(textSpan);
        var res = textSpan.getBoundingClientRect().height;
        textSpan.parentNode.removeChild(textSpan);
        return res;
    }
    calcMinHeight(layout) {
        var topHeight = 0;
        var centerHeight = 0;
        var bottomHeight = 0;
        var rowHeights = {};
        layout.rows.forEach((row, i) => {
            var rowHeight = 0;
            row.elements.forEach((element, j) => {
                if (element instanceof _card_layout_1.cardIndicatorElement) {
                    rowHeight = Math.max(rowHeight, cardMeasurer._getImageSpanHeight('1px', element.height + 'px'));
                }
                else if (element instanceof _card_layout_1.cardSparklineElement) {
                    rowHeight = Math.max(rowHeight, cardMeasurer._getImageSpanHeight('1px', element.height + 'px'));
                }
                else {
                    rowHeight = Math.max(rowHeight, cardMeasurer._getTextSpanHeight(element.fontSize + 'pt', element.fontFamily));
                }
            });
            switch (row.vAlignment) {
                case _card_layout_1.verticalAlignment.top:
                    topHeight += rowHeight + row.indent;
                    break;
                case _card_layout_1.verticalAlignment.center:
                    centerHeight += rowHeight + row.indent;
                    break;
                case _card_layout_1.verticalAlignment.bottom:
                    bottomHeight += rowHeight + row.indent;
                    break;
            }
        });
        return topHeight + centerHeight + bottomHeight || this.DEFAULT_MIN_HEIGHT;
    }
}
cardMeasurer.DIGITS_STRING = '0123456789';
__decorate([
    _cacheable_1.cacheable('cardMeasurer._getImageSpanHeight')
], cardMeasurer, "_getImageSpanHeight", null);
__decorate([
    _cacheable_1.cacheable('cardMeasurer._getTextSpanHeight')
], cardMeasurer, "_getTextSpanHeight", null);
exports.cardMeasurer = cardMeasurer;
