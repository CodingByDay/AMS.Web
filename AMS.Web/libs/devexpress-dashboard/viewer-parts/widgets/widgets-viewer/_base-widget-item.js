﻿/**
* DevExpress Dashboard (_base-widget-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWidgetItem = void 0;
const events_1 = require("devextreme/events");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _css_class_names_1 = require("./_css-class-names");
function patchStyles(options) {
    options.style.borderWidth = options.borderWidth || 0;
    options.selectionStyle.borderWidth = options.borderWidth || 0;
    options.hoverStyle.borderWidth = options.borderWidth || 0;
}
class BaseWidgetItem {
    constructor(options) {
        this._options = _jquery_helpers_1.deepExtend({}, this._getDefaultOptions(), options);
        this._type = this._options.type || 'unknown';
        this._isSelected = !!this._options.isSelected;
        this.tag = this._options.tag;
        patchStyles(this._options);
        this._hoverEnabled = !!this._options.hoverEnabled;
    }
    _getDefaultOptions() {
        return {
            cursor: 'default',
            isSelected: false,
            hoverEnabled: false,
            style: {
                backgroundColor: '#ffffff',
                borderStyle: 'solid',
                borderColor: '#C8C8CC'
            },
            selectionStyle: {
                backgroundColor: 'rgba(95,139,149,0.35)',
                borderStyle: 'solid',
                borderColor: '#5F8B95'
            },
            hoverStyle: {
                backgroundColor: 'rgba(95,139,149,0.25)',
                borderStyle: 'solid',
                borderColor: '#5F8B95'
            }
        };
    }
    dispose() {
        var that = this;
        that._type = null;
        that._isSelected = null;
        that.tag = null;
        that._hoverEnabled = null;
        this._disposeClickEvent();
        this._disposeHoverEvent();
        if (that._itemDiv && that._itemDiv.parentElement) {
            that._itemDiv.parentElement.removeChild(that._itemDiv);
        }
        that._itemDiv = null;
    }
    _getStyle(isSelected) {
        return isSelected ? this._options.selectionStyle : this._options.style;
    }
    select() {
        var that = this;
        that._isSelected = true;
        if (that._itemDiv) {
            that._itemDiv.classList.add(_css_class_names_1.cssClassNames.selectedItem);
        }
    }
    _hover(isHover) {
        var that = this;
        if (that._hoverEnabled) {
            if (isHover) {
                that._itemDiv.classList.add(_css_class_names_1.cssClassNames.hoveredItem);
            }
            else {
                that._itemDiv.classList.remove(_css_class_names_1.cssClassNames.hoveredItem);
            }
        }
    }
    clearSelection() {
        var that = this;
        that._isSelected = false;
        if (that._itemDiv) {
            that._itemDiv.classList.remove(_css_class_names_1.cssClassNames.selectedItem);
        }
    }
    _disposeClickEvent() {
        if (this._itemDiv) {
            events_1.off(this._itemDiv, 'click.cardItem');
        }
    }
    _disposeHoverEvent() {
        if (this._itemDiv) {
            events_1.off(this._itemDiv, 'mouseenter');
            events_1.off(this._itemDiv, 'mouseleave');
        }
    }
    setClickHandler(handler) {
        var that = this;
        if (typeof handler === 'function' && that._itemDiv) {
            this._disposeClickEvent();
            events_1.on(that._itemDiv, 'click.cardItem', function () {
                handler.call(null, { item: that });
            });
        }
    }
    setHoverHandler(handler) {
        var that = this;
        if (that._itemDiv) {
            this._disposeHoverEvent();
            events_1.on(that._itemDiv, 'mouseenter', function () {
                that._hover(true);
                if (typeof handler === 'function') {
                    handler.call(null, { item: that, state: true });
                }
            });
            events_1.on(that._itemDiv, 'mouseleave', function () {
                that._hover(false);
                if (typeof handler === 'function') {
                    handler.call(null, { item: that, state: false });
                }
            });
        }
    }
    draw(width, height, index, commonItemsOptions) {
        if (!this._itemDiv) {
            return this.initDraw(width, height, index);
        }
        return this._itemDiv;
    }
    initDraw(width, height, index) {
        var that = this, itemDiv;
        width = width || 0;
        height = height || 0;
        index = index || 0;
        that.index = index;
        this._disposeClickEvent();
        this._disposeHoverEvent();
        itemDiv = document.createElement('div');
        itemDiv.classList.add('dx-' + that._type);
        itemDiv.style.cursor = that._options.cursor;
        that._itemDiv = itemDiv;
        return itemDiv;
    }
    _applyExtraStyles() {
        if (this._isSelected) {
            this.select();
        }
        else {
            this.clearSelection();
        }
    }
    toggleSelection() {
        if (this._isSelected) {
            this.clearSelection();
        }
        else {
            this.select();
        }
    }
    getWidget() {
        return null;
    }
    finishRender(params) {
        params = params || {};
        var that = this, clickHandler = params.clickHandler, hoverHandler = params.hoverHandler, drawOptions = params.drawOptions;
        that.setClickHandler(clickHandler);
        that.setHoverHandler(hoverHandler);
        that.rerender(drawOptions);
        that._applyExtraStyles();
    }
    getItemContainer() {
        var itemDiv = this._itemDiv;
        if (itemDiv) {
            return itemDiv;
        }
        return;
    }
    _formStyle(selector, cssProperties) {
        var resultCss = '.dx-' + this._type + ' ' + selector + '{', cssProperty;
        for (cssProperty in cssProperties) {
            resultCss += cssProperty + ':' + cssProperties[cssProperty] + 'px;';
        }
        return resultCss + '}';
    }
    getCssStyle(width, height, _commonItemsOptions, prefix) {
        var styleOptions = { height: height };
        if (!this._options.ignoreProportions) {
            styleOptions['width'] = width;
        }
        return prefix + ' ' + this._formStyle('', styleOptions);
    }
    calcCommonItemSpecificOptions(width, height) {
    }
    resize(width, height, index, commonItemsOptions) {
    }
    rerender(drawOptions) {
    }
    detachItem() {
    }
    setHoverEnabledState(hoverEnabled) {
        this._hoverEnabled = hoverEnabled;
    }
}
exports.BaseWidgetItem = BaseWidgetItem;
