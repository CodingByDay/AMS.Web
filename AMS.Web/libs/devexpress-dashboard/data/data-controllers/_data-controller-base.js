﻿/**
* DevExpress Dashboard (_data-controller-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataControllerBase = exports.DEFAULT_SUBTITLE_SEPARATOR = exports.DATA_POSTFIX = void 0;
const _render_helper_1 = require("../../viewer-parts/widgets/_render-helper");
const _localization_ids_1 = require("../_localization-ids");
const _localizer_1 = require("../_localizer");
const _utils_1 = require("../_utils");
const _z_index_1 = require("../_z-index");
exports.DATA_POSTFIX = '_Data';
exports.DEFAULT_SUBTITLE_SEPARATOR = ' - ';
class dataControllerBase {
    constructor(options) {
        this.deltaIndicatorTypes = ['none', 'up', 'down', 'warning'];
        this.multiData = options ? options.multiData : undefined;
        this.viewModel = options ? options.viewModel : undefined;
        this.cfModel = options ? options.cfModel : undefined;
        this.drillDownState = options ? options.drillDownState : undefined;
        this.useNeutralFilterMode = options ? options.useNeutralFilterMode : undefined;
    }
    isMultiselectable() {
        return false;
    }
    update(selectedValues, encodeHtml) {
    }
    getTitle(axisPoint, separator, saveOrder) {
        var axisName = axisPoint.getAxisName(), values;
        if (this.drillDownState[axisName]) {
            var text = axisPoint.getDisplayText();
            return text == undefined ? '' : text;
        }
        else {
            values = axisPoint.getDisplayPath();
            if (!saveOrder) {
                values = values.reverse();
            }
            return values.join(separator ? separator : exports.DEFAULT_SUBTITLE_SEPARATOR);
        }
    }
    _getMeasureValueByAxisPoints(axisPoints, cfMeasureId) {
        var slice = this._getSlice(axisPoints);
        return slice.getConditionalFormattingMeasureValue(cfMeasureId);
    }
    _getSlice(axisPoints) {
        var slice = this.multiData;
        axisPoints.forEach(axisPoint => {
            slice = slice.getSlice(axisPoint);
        });
        return slice;
    }
    _getZeroPosition(zeroPositionMeasureId, columnAxisName, rowAxisName) {
        var that = this, currentZeroPosition, zeroPosition, columnRootPoint, rowRootPoint;
        columnRootPoint = that.multiData.getAxis(columnAxisName).getRootPoint();
        rowRootPoint = that.multiData.getAxis(rowAxisName).getRootPoint();
        currentZeroPosition = that._getMeasureValueByAxisPoints([columnRootPoint, rowRootPoint], zeroPositionMeasureId);
        if (currentZeroPosition !== undefined && currentZeroPosition !== null)
            zeroPosition = currentZeroPosition;
        return zeroPosition;
    }
    _getStyleIndexes(rule, cellInfo, points) {
        return null;
    }
    _getStyleSettingsInfoCore(cellInfo, rules, columnAxisName, rowAxisName) {
        var that = this, currentStyleIndexes = [], uniqueIndexes = [], styleAndRuleMappingTable = {}, ruleIndex, currentNormalizedValue, normalizedValue, zeroPosition, styleSettingsInfo, points = [];
        if (rules.length > 0) {
            rules.forEach(rule => {
                currentStyleIndexes = that._getStyleIndexes(rule, cellInfo, points);
                if (currentStyleIndexes && currentStyleIndexes.length > 0) {
                    ruleIndex = that.cfModel.RuleModels ? that.cfModel.RuleModels.indexOf(rule) : -1;
                    currentStyleIndexes.forEach(styleIndex => {
                        if (uniqueIndexes[styleIndex] === undefined) {
                            uniqueIndexes.push(styleIndex);
                            styleAndRuleMappingTable[styleIndex] = ruleIndex;
                        }
                    });
                }
                currentNormalizedValue = that._getMeasureValueByAxisPoints(points, rule.NormalizedValueMeasureId);
                if (currentNormalizedValue !== undefined && currentNormalizedValue !== null) {
                    normalizedValue = currentNormalizedValue;
                    zeroPosition = that._getZeroPosition(rule.ZeroPositionMeasureId, columnAxisName, rowAxisName);
                }
            });
            styleSettingsInfo = {
                styleIndexes: uniqueIndexes,
                styleAndRuleMappingTable: styleAndRuleMappingTable
            };
            if (normalizedValue !== undefined && zeroPosition !== undefined) {
                styleSettingsInfo.normalizedValue = normalizedValue;
                styleSettingsInfo.zeroPosition = zeroPosition;
            }
        }
        return styleSettingsInfo;
    }
    _generateSparklineOptions(data, options, format) {
        return {
            dataSource: data,
            type: options.ViewType.toLowerCase(),
            onIncidentOccurred: _render_helper_1.RenderHelper.widgetIncidentOccurred,
            showMinMax: options.HighlightMinMaxPoints,
            showFirstLast: options.HighlightStartEndPoints,
            tooltip: {
                _justify: true,
                container: _utils_1.tooltipContainerSelector,
                contentTemplate: function (data) {
                    var startText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.sparkline.TooltipStartValue), endText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.sparkline.TooltipEndValue), minText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.sparkline.TooltipMinValue), maxText = _localizer_1.localizer.getString(_localization_ids_1.localizationId.sparkline.TooltipMaxValue);
                    var table = document.createElement('table');
                    table.style.borderSpacing = '0px';
                    var createRow = (startText, endText) => {
                        var tr = document.createElement('tr');
                        var td = document.createElement('td');
                        var span = document.createElement('span');
                        span.innerText = startText;
                        td.appendChild(span);
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.style.width = '15px';
                        tr.appendChild(td);
                        td = document.createElement('td');
                        td.style.textAlign = 'right';
                        var span = document.createElement('span');
                        span.innerText = endText;
                        td.appendChild(span);
                        tr.appendChild(td);
                        return tr;
                    };
                    table.appendChild(createRow(startText, format(data.originalFirstValue)));
                    table.appendChild(createRow(endText, format(data.originalLastValue)));
                    table.appendChild(createRow(minText, format(data.originalMinValue)));
                    table.appendChild(createRow(maxText, format(data.originalMaxValue)));
                    var div = document.createElement('div');
                    div.appendChild(table);
                    return div;
                },
                zIndex: _z_index_1.zIndex.dashboardItemTooltips
            }
        };
    }
    _convertIndicatorType(type) {
        return this.deltaIndicatorTypes[type];
    }
    _findAxisPoint(dataId, axisPoint) {
        if (axisPoint) {
            while (axisPoint.getDimension() && axisPoint.getDimension().id !== dataId) {
                axisPoint = axisPoint.getParent();
            }
        }
        return axisPoint && axisPoint.getParent() ? axisPoint : null;
    }
}
exports.dataControllerBase = dataControllerBase;
