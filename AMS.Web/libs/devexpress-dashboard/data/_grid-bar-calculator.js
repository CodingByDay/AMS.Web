﻿/**
* DevExpress Dashboard (_grid-bar-calculator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridBarCalculator = void 0;
var startPercent = 0.15;
class GridBarCalculator {
    constructor(showZeroLevel) {
        this._valueItems = new Map();
        this._alwaysShowZeroLevel = showZeroLevel;
        this._normalizedValues = new Map();
        this._range = null;
        this._min = null;
        this._max = null;
        this._zeroPosition = null;
        this._normalizationData = null;
    }
    addValue(indexRow, valueItem) {
        this._valueItems.set(indexRow, valueItem);
    }
    getNormalizedValue(index) {
        if (this._normalizedValues.get(index))
            return this._normalizedValues.get(index);
        var normalizedValue = this._normalizeValue(this._valueItems.get(index).getValue());
        this._normalizedValues.set(index, normalizedValue);
        return normalizedValue;
    }
    getZeroPosition() {
        return this._zeroPosition;
    }
    initialize(min, max) {
        this._calcMinMax(min, max);
        this._calcRange();
        this._calcZeroPosition();
        this._calcNormalizationData();
    }
    _normalizeValue(value) {
        var showZero = this._normalizationData.showZero, minimum = this._normalizationData.minimum, ratio = this._normalizationData.ratio, range = this._normalizationData.range, sign = value >= 0 ? 1 : -1;
        return showZero || ratio === 0 ? value / range : sign * (startPercent + ratio * (Math.abs(value) - minimum));
    }
    _calcMinMax(min, max) {
        this._min = min;
        this._max = max;
    }
    _calcRange() {
        var min = this._min, minAbs = Math.abs(min), max = this._max, maxAbs = Math.abs(max);
        this._range = Math.max(max - min, minAbs, maxAbs);
    }
    _calcZeroPosition() {
        var min = this._min, minAbs = Math.abs(min), max = this._max, range = this._range;
        if (min < 0)
            if (max < 0)
                this._zeroPosition = 1;
            else {
                this._zeroPosition = range !== 0 ? minAbs / range : 0;
            }
        else
            this._zeroPosition = 0;
    }
    _calcNormalizationData() {
        var range = this._range || 1, min = this._min, max = this._max, equalSign = (min < 0 && max < 0) || (min >= 0 && max >= 0), minAbs = Math.abs(min), maxAbs = Math.abs(max), minimum = Math.min(minAbs, maxAbs), maximum = Math.max(minAbs, maxAbs), delta = maximum - minimum, ratio = delta !== 0 ? (1 - startPercent) / delta : 0, showZero = !equalSign || this._alwaysShowZeroLevel || (equalSign && minimum / maximum <= startPercent);
        this._normalizationData = {
            showZero: showZero,
            minimum: minimum,
            ratio: ratio,
            range: range
        };
    }
}
exports.GridBarCalculator = GridBarCalculator;
