﻿/**
* DevExpress Dashboard (_delta-indicator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaIndicator = void 0;
const renderer_1 = require("devextreme/viz/core/renderers/renderer");
const $ = require("jquery");
const _consts_1 = require("./_consts");
class DeltaIndicator {
    constructor(options) {
        options = options || {};
        this._container = $.fn.constructor(options.container);
        this._renderer = options.renderer;
        this._shape = null;
        this._init();
        if (this._container.length) {
            this.draw(options);
        }
    }
    _init() {
        var container = this._container, width = 0, height = 0;
        if (!container.length) {
            return;
        }
        width = container.width(),
            height = container.height();
        if (!(width > 0 && height > 0)) {
            return;
        }
        this._renderer = new renderer_1.Renderer({ container: container[0] });
    }
    draw(options) {
        var params = this._prepareDrawParams(options);
        if (params.readyToDraw) {
            this._render(params);
        }
        return this._shape;
    }
    _prepareDrawParams(options) {
        var container = this._container, params = { readyToDraw: false }, rectOptions = { left: 0, top: 0, right: 0, bottom: 0 };
        if (container.length) {
            rectOptions.right = container.width() || 0;
            rectOptions.bottom = container.height() || 0;
        }
        else if (options.rect) {
            rectOptions = options.rect;
        }
        params.rectangle = rectOptions;
        params.type = options.type || _consts_1.indicatorType.none;
        params.hasPositiveMeaning = !!(options.hasPositiveMeaning);
        params.readyToDraw = !!(this._renderer && rectOptions.right - rectOptions.left > 0 && rectOptions.bottom - rectOptions.top > 0);
        params.drawToContainer = !!(this._container.length);
        return params;
    }
    _render(params) {
        var rect = params.rectangle, shape;
        this._shape = null;
        if (params.drawToContainer) {
            this._renderer.resize(rect.right - rect.left, rect.bottom - rect.top);
            shape = this._drawShape(params);
            if (shape) {
                shape.append(this._renderer.root);
            }
        }
        else {
            shape = this._drawShape(params);
        }
        this._shape = shape;
    }
    _drawShape(params) {
        var shape = null, rect = params.rectangle, cx = (rect.left + rect.right) >> 1, cy = (rect.top + rect.bottom) >> 1, r = ~~(Math.min(rect.right - rect.left, rect.bottom - rect.top) / 2), coords = [], colorClassName = DeltaIndicator.getIndicatorColorType(params.type, params.hasPositiveMeaning);
        switch (params.type) {
            case _consts_1.indicatorType.none:
                break;
            case _consts_1.indicatorType.up:
                coords.push(rect.left);
                coords.push(rect.bottom);
                coords.push(cx);
                coords.push(rect.top);
                coords.push(rect.right);
                coords.push(rect.bottom);
                shape = this._renderer.path(coords, 'area').attr({ 'class': colorClassName });
                shape._useCSSTheme = true;
                break;
            case _consts_1.indicatorType.down:
                coords.push(rect.left);
                coords.push(rect.top);
                coords.push(cx);
                coords.push(rect.bottom);
                coords.push(rect.right);
                coords.push(rect.top);
                shape = this._renderer.path(coords, 'area').attr({ 'class': colorClassName });
                shape._useCSSTheme = true;
                break;
            case _consts_1.indicatorType.warning:
                shape = this._renderer.circle(cx, cy, r).attr({ 'class': colorClassName });
                shape._useCSSTheme = true;
                break;
        }
        return shape;
    }
    static getIndicatorColorType(type, hasPositiveMeaning, useDefaultColor) {
        var color;
        if (useDefaultColor) {
            color = 'dx-carditem-default-color';
        }
        else {
            switch (type) {
                case _consts_1.indicatorType.up:
                case _consts_1.indicatorType.down:
                    color = hasPositiveMeaning ? 'dx-carditem-positive-color' : 'dx-carditem-negative-color';
                    break;
                case _consts_1.indicatorType.warning:
                    color = 'dx-carditem-warning-color';
                    break;
                default:
                    color = 'dx-carditem-none-color';
                    break;
            }
        }
        return color;
    }
}
exports.DeltaIndicator = DeltaIndicator;
