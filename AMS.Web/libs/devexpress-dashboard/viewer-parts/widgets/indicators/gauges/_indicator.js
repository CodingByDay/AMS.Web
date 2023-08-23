﻿/**
* DevExpress Dashboard (_indicator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GaugeDeltaIndicator = void 0;
const circular_gauge_1 = require("devextreme/viz/circular_gauge");
const utils_1 = require("devextreme/viz/core/utils");
const linear_gauge_1 = require("devextreme/viz/linear_gauge");
const _format_helper_1 = require("../../../../data/_format-helper");
const _utils_1 = require("../../../../data/_utils");
const _delta_indicator_1 = require("../_delta-indicator");
const DELTA_INDENT = 10, DELTA_SIZE_COEFF = 0.5, DELTA_ASPECT_RATIO = 3 / 4;
class GaugeDeltaIndicator {
    constructor(parameters) {
        this._renderer = parameters.renderer;
        this._root = parameters.renderer.g().attr({ 'class': 'dxg-delta-indicator' }).linkOn(parameters.container, { name: 'delta-indicator', after: 'peripheral' });
        this._getOptions = parameters.optionsCallback;
    }
    dispose() {
        this._root.linkOff();
        this._renderer = this._root = null;
        return this;
    }
    draw() {
        let that = this, options = that._getOptions(), textValue = formatText(options.text);
        if (textValue === null)
            return null;
        that._root.linkAppend();
        let text = that._renderer.text(textValue, 0, 0).attr({
            align: 'center',
            'class': _delta_indicator_1.DeltaIndicator.getIndicatorColorType(options.type, options.hasPositiveMeaning, options.text.useDefaultColor)
        }).css(utils_1.patchFontOptions(options.text.font)).append(that._root);
        let textBox = text.getBBox(), shapeHeight = Math.round(textBox.height * DELTA_SIZE_COEFF), shapeWidth = Math.round(shapeHeight / DELTA_ASPECT_RATIO);
        let shape = new _delta_indicator_1.DeltaIndicator({ renderer: that._renderer }).draw({
            type: options.type,
            hasPositiveMeaning: options.hasPositiveMeaning,
            rect: {
                left: 0,
                right: shapeWidth,
                top: -textBox.y - shapeHeight,
                bottom: -textBox.y
            }
        });
        let width = textBox.width, height = textBox.height, x = Math.round(textBox.width / 2), y = -textBox.y;
        if (shape) {
            shape.append(that._root);
            width += shapeWidth + DELTA_INDENT;
            x += shapeWidth + DELTA_INDENT;
        }
        text.attr({ x: x, y: y });
        return [width, height];
    }
    layoutOptions() {
        let options = this._getOptions(), layout = options.layout || {};
        return formatText(options.text) !== null ? {
            horizontalAlignment: layout.horizontalAlignment || 'center',
            verticalAlignment: layout.verticalAlignment || 'bottom'
        } : null;
    }
    measure() {
        this.freeSpace();
        return this.draw();
    }
    move(rect) {
        this._root.attr({ translateX: Math.round(rect[0]), translateY: Math.round(rect[1]) });
    }
    freeSpace() {
        this._root.linkRemove().clear();
    }
}
exports.GaugeDeltaIndicator = GaugeDeltaIndicator;
var formatText = function (options) {
    let text;
    if (options.value !== undefined) {
        const obj = {
            value: options.value,
            valueText: _format_helper_1.DashboardFormatHelper.format(options.value, { type: options.format, precision: options.precision })
        };
        text = _utils_1.type.isFunction(options.customizeText) ? options.customizeText.call(obj, obj) : obj.valueText;
    }
    if (_utils_1.type.isString(text) && text) {
        return text;
    }
    return null;
};
var plugin = {
    name: 'delta_indicator',
    init: function () {
        let that = this;
        that._delta_indicator = new GaugeDeltaIndicator({
            renderer: that._renderer,
            container: that._renderer.root,
            optionsCallback: () => that._getOption('indicator')
        });
        that._layout.add(that._delta_indicator);
    },
    dispose: function () {
        this._delta_indicator.freeSpace();
        this._delta_indicator.dispose();
    }
};
circular_gauge_1.default.addPlugin(plugin);
linear_gauge_1.default.addPlugin(plugin);
