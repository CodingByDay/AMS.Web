﻿/**
* DevExpress Dashboard (_new-card-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newCardItem = exports.newCardMeasurements = void 0;
const _css_class_names_1 = require("../_css-class-names");
const _card_painter_1 = require("./_card-painter");
exports.newCardMeasurements = {
    margin: 3,
    padding: 10,
    borderWidth: 1
};
class newCardItem {
    constructor(properties, cardIndex, viewerOptions) {
        this.properties = properties;
        this.cardPainter = new _card_painter_1.cardPainter(properties.dataAccessor, viewerOptions.controlContainer);
        this.clickHandler = viewerOptions.clickHandler;
        this.hoverHandler = viewerOptions.hoverHandler;
        this.index = cardIndex;
        this.tag = properties.tag;
    }
    dispose() {
        if (this.itemDiv) {
            this.itemDiv.remove();
            this.itemDiv = null;
        }
    }
    selected() {
        return this.properties.isSelected;
    }
    setHoverEnabledState(hoverEnabled) {
        this.properties.hoverEnabled = hoverEnabled;
    }
    draw(container, cardArrangements, styleSettingsProvider) {
        if (!this.itemDiv) {
            var element = this.cardPainter.draw(cardArrangements, this.properties.layout, styleSettingsProvider);
            this.itemDiv = element;
            container.append(element);
            this.afterDraw();
        }
        return this.itemDiv;
    }
    clearSelection() {
        this.properties.isSelected = false;
        if (this.itemDiv) {
            this.itemDiv.removeClass(_css_class_names_1.cssClassNames.selectedItem);
        }
    }
    select() {
        this.properties.isSelected = true;
        if (this.itemDiv) {
            this.itemDiv.addClass(_css_class_names_1.cssClassNames.selectedItem);
        }
    }
    hover(isHover) {
        if (this.properties.hoverEnabled) {
            if (isHover) {
                this.itemDiv.addClass(_css_class_names_1.cssClassNames.hoveredItem);
            }
            else {
                this.itemDiv.removeClass(_css_class_names_1.cssClassNames.hoveredItem);
            }
        }
    }
    setClickHandler() {
        var that = this;
        if (typeof that.clickHandler === 'function' && that.itemDiv) {
            that.itemDiv.off('click.cardItem');
            that.itemDiv.on('click.cardItem', function () {
                that.clickHandler.call(null, { item: that });
            });
        }
    }
    setHoverHandler() {
        var that = this;
        if (that.itemDiv) {
            that.itemDiv.mouseenter(function () {
                that.hover(true);
                if (typeof that.hoverHandler === 'function') {
                    that.hoverHandler.call(null, { item: that, state: true });
                }
            }).mouseleave(function () {
                that.hover(false);
                if (typeof that.hoverHandler === 'function') {
                    that.hoverHandler.call(null, { item: that, state: false });
                }
            });
        }
    }
    afterDraw() {
        this.setClickHandler();
        this.setHoverHandler();
        this.applyExtraStyles();
    }
    applyExtraStyles() {
        this.properties.isSelected ? this.select() : this.clearSelection();
    }
}
exports.newCardItem = newCardItem;
