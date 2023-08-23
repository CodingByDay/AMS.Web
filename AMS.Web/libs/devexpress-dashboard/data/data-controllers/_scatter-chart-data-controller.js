﻿/**
* DevExpress Dashboard (_scatter-chart-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scatterChartDataController = void 0;
const _render_helper_1 = require("../../viewer-parts/widgets/_render-helper");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const _formatter_1 = require("../_formatter");
const _utils_1 = require("../_utils");
const _chart_data_controller_proto_1 = require("./_chart-data-controller-proto");
class scatterChartDataController extends _chart_data_controller_proto_1.chartDataControllerProto {
    constructor(options) {
        super(options);
    }
    getArgument(argumentAxisPoint) {
        var measureId = this.viewModel.AxisXDataMember, slice = this.multiData.getSlice(argumentAxisPoint);
        return slice.getMeasureValue(measureId).getValue();
    }
    getArgumentBindingValue(argumentPoint, pointIndex) {
        return this.getArgument(argumentPoint);
    }
    getArgumentDisplayPath(axisPoint) {
        return axisPoint.getDisplayPath().reverse().join(', ');
    }
    getArgumentFormat() {
        return this.multiData && this.multiData.getMeasureFormat(this.viewModel.AxisXDataMember);
    }
    getArgumentText(argument) {
        if (this.viewModel.AxisXPercentValues)
            return _formatter_1.formatPercentValue(argument.value);
        if (this.viewModel.AxisXScientificValues)
            return _formatter_1.formatScientificAxisValue(argument.value);
        return _formatter_1.formatAxisValue(argument.value, argument.min, argument.max);
    }
    _getTooltipHtml(series, point, seriesFormats, encodeHtml, color) {
        var that = this, text, slice = that.multiData.getSlice(point.tag.axisPoint), measureIds = that._getMeasureIds();
        var table = document.createElement('table');
        measureIds.forEach((measureId, index) => {
            text = that.multiData.getMeasureById(measureId).name + ': ' + slice.getMeasureValue(measureId).getDisplayText();
            text = encodeHtml ? _utils_1.encodeHtml(text) : text;
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            tr.appendChild(td);
            if (color && index === 0) {
                td.appendChild(_render_helper_1.RenderHelper.rectangleHtml(color, 10, 10, '5px'));
            }
            td = document.createElement('td');
            td.innerHTML = text;
            tr.appendChild(td);
            table.appendChild(tr);
        });
        return table;
    }
    _getMeasureIds() {
        var measureIds = [];
        measureIds.push(this.viewModel.AxisXDataMember);
        this.viewModel.Panes[0].SeriesTemplates[0].DataMembers.forEach(measureId => {
            measureIds.push(measureId);
        });
        return measureIds;
    }
    getTooltipArgumentText(obj) {
        return this._getTooltipArgumentText(obj.point.tag.axisPoint);
    }
    _getTooltipArgumentText(axisPoint) {
        var axisName = axisPoint.getAxisName();
        if (this.drillDownState[axisName]) {
            return axisPoint.getDisplayText();
        }
        else {
            return this.getArgumentDisplayPath(axisPoint);
        }
    }
    _customizePointLabelText(valueContainer, pointLabel, seriesInfo) {
        var that = this, axisPoint = valueContainer.point.tag.axisPoint, argument = function () {
            return that._getTooltipArgumentText(axisPoint);
        }, weight = function () {
            var dataMembers = that.viewModel.Panes[0].SeriesTemplates[0].DataMembers;
            if (dataMembers.length > 1) {
                var measureId = dataMembers[1];
                var slice = that.multiData.getSlice(axisPoint);
                return slice.getMeasureValue(measureId).getDisplayText();
            }
            return null;
        }, values = function () {
            var text = '', measureIds = that._getMeasureIds(), slice = that.multiData.getSlice(axisPoint);
            measureIds.forEach((measureId, index) => {
                text += (index > 0 ? ' - ' : '') + slice.getMeasureValue(measureId).getDisplayText();
            });
            return text;
        };
        switch (pointLabel.scatterContent) {
            case 'Argument':
                return argument();
            case 'Weight':
                return weight();
            case 'Values':
                return values();
            case 'ArgumentAndWeight':
                return argument() + ': ' + weight();
            case 'ArgumentAndValues':
                return argument() + ': ' + values();
            default:
                return null;
        }
    }
    isQualitativeArgument() {
        return false;
    }
    isDiscreteArgument() {
        return false;
    }
    showPointLabels(pointLabelInfo) {
        return pointLabelInfo && pointLabelInfo.showPointLabels;
    }
    _getStyleSettingsInfo(argumentAxisPoint, seriesAxisPoint, seriesMeasureId, chartElement) {
        if (this.cfModel) {
            let seriesInfo = {
                argumentAxisPoint: argumentAxisPoint,
                seriesAxisPoint: seriesAxisPoint,
                chartElement: chartElement
            };
            return this._getStyleSettingsInfoCore(seriesInfo, this.cfModel.RuleModels, this.viewModel.ColumnAxisName, item_data_axis_names_1.itemDataAxisNames.defaultAxis);
        }
    }
    _getStyleIndexes(rule, seriesInfo, points) {
        return seriesInfo.chartElement === 'Point' ? super._getStyleIndexes(rule, seriesInfo, points) : [];
    }
}
exports.scatterChartDataController = scatterChartDataController;
