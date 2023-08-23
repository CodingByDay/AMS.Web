﻿/**
* DevExpress Dashboard (_selection-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectionHelper = void 0;
const _utils_1 = require("./_utils");
class selectionHelper {
    static setSelectedArguments(widget, values, state) {
        if (!values) {
            return;
        }
        for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
            this._selectArgument(widget, values[valueIndex], state);
        }
    }
    static setSelectedSeries(widget, values, state) {
        if (!values) {
            return;
        }
        for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
            this._selectSeries(widget, values[valueIndex], state);
        }
    }
    static setSelectedPoint(widget, seriesValue, argumentValue, state) {
        var that = this;
        if (seriesValue != null && argumentValue == null) {
            that._selectSeries(widget, seriesValue, state);
        }
        if (seriesValue == null && argumentValue != null) {
            that._selectArgument(widget, argumentValue, state);
        }
        if (seriesValue != null && argumentValue != null) {
            var seriesList = widget.getAllSeries();
            for (var i = 0; i < seriesList.length; i++) {
                if (that._checkWidgetCorrespondsToValue(seriesList[i], seriesValue)) {
                    this._selectSeriesPoints(seriesList[i], argumentValue, state);
                }
            }
        }
    }
    static setSelectedWidgetViewer(widget, values, state) {
        if (!values) {
            return;
        }
        for (var valueIndex = 0; valueIndex < values.length; valueIndex++) {
            this._selectValue(widget, values[valueIndex], state);
        }
    }
    static selectWholePie(widgetViewer, state) {
        var seriesList = widgetViewer.getAllSeries();
        for (var i = 0; i < seriesList.length; i++) {
            this._selectWidget(seriesList[i], state);
        }
    }
    static _selectSeries(widget, seriesValue, state) {
        var seriesList = widget.getAllSeries();
        for (var i = 0; i < seriesList.length; i++) {
            this._selectValue(seriesList[i], seriesValue, state);
        }
    }
    static _selectArgument(widget, argumentValue, state) {
        var seriesList = widget.getAllSeries();
        for (var i = 0; i < seriesList.length; i++) {
            this._selectSeriesPoints(seriesList[i], argumentValue, state);
        }
    }
    static _selectSeriesPoints(series, argumentValue, state) {
        var points = series.getAllPoints();
        for (var j = 0; j < points.length; j++) {
            this._selectValue(points[j], argumentValue, state);
        }
    }
    static _selectValue(widget, value, state) {
        if (this._checkWidgetCorrespondsToValue(widget, value)) {
            this._selectWidget(widget, state);
        }
    }
    static _selectWidget(widget, state) {
        if (state) {
            widget.select();
        }
        else {
            widget.clearSelection();
        }
    }
    static _checkWidgetCorrespondsToValue(widget, value) {
        var tag = widget.tag;
        if (!tag || !value)
            return false;
        if (tag)
            tag = _utils_1.getTagValue(tag);
        if (tag && !Array.isArray(tag) && !Array.isArray(value)) {
            throw Error('Internal Error: incorrect values for selection');
        }
        return _utils_1.checkValuesAreEqual(tag, value);
    }
}
exports.selectionHelper = selectionHelper;
