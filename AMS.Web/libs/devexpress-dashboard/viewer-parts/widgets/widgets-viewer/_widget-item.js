﻿/**
* DevExpress Dashboard (_widget-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WidgetItem = void 0;
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _base_widget_item_1 = require("./_base-widget-item");
const _widget_item_factory_1 = require("./_widget-item-factory");
class WidgetItem extends _base_widget_item_1.BaseWidgetItem {
    constructor(itemData, options) {
        super(WidgetItem.ensureOptions(options));
        this._widgetType = String(this._options.widgetType || '').toLowerCase();
        this._itemData = itemData || {};
        this._itemData.encodeHtml = this._options.encodeHtml;
        this._itemData.redrawOnResize = false;
    }
    static ensureOptions(options) {
        options = options || {};
        options.type = 'widgetItem';
        return options;
    }
    dispose() {
        var that = this;
        _base_widget_item_1.BaseWidgetItem.prototype.dispose.apply(that, arguments);
        that._itemData = null;
        this._disposeWidget();
    }
    _disposeWidget() {
        if (this._widget) {
            this._widget.dispose();
            this._widget = null;
        }
    }
    _getDefaultOptions() {
        return _jquery_helpers_1.deepExtend({}, _base_widget_item_1.BaseWidgetItem.prototype._getDefaultOptions.apply(this, arguments), {
            style: {
                borderStyle: 'solid',
                borderColor: '#ffffff'
            }
        });
    }
    detachItem() {
        var itemDiv = this._itemDiv;
        if (itemDiv && itemDiv.parentElement) {
            itemDiv.parentElement.removeChild(itemDiv);
        }
    }
    initDraw(width, height, index) {
        this._disposeWidget();
        return super.initDraw(width, height, index);
    }
    draw(width, height, index) {
        super.draw(width, height, index);
        var that = this, itemDiv;
        itemDiv = that._itemDiv;
        itemDiv.style.margin = 'auto';
        this._options.itemWidgetOptionsPrepared(that._itemData);
        that._widget = _widget_item_factory_1.widgetItemFactory.createWidget(that._widgetType, itemDiv, that._itemData);
        return itemDiv;
    }
    resize(width, height, index) {
        if (!this._itemDiv.childNodes.length) {
            return this.draw(width, height, index);
        }
    }
    rerender(drawOptions) {
        var that = this, options;
        if (that._widget) {
            options = _widget_item_factory_1.widgetItemFactory.getAdditionalOptions(that._widgetType, that._itemDiv, that._itemData);
            options && _jquery_helpers_1.deepExtend(that._widget._options, options);
            if (_jquery_helpers_1.isVisible(that._itemDiv)) {
                that._widget.render(drawOptions);
            }
        }
    }
    getWidget() {
        return this._widget;
    }
}
exports.WidgetItem = WidgetItem;
