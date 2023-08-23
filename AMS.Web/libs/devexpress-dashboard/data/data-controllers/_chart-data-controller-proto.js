﻿/**
* DevExpress Dashboard (_chart-data-controller-proto.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedTypesForShowPointMarkers = exports.chartDataControllerProto = void 0;
const string_1 = require("devextreme/core/utils/string");
const enums_1 = require("../../model/enums");
const _array_utils_1 = require("../../model/internal/_array-utils");
const _date_utils_1 = require("../../model/internal/_date-utils");
const _render_helper_1 = require("../../viewer-parts/widgets/_render-helper");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const special_values_1 = require("../special-values");
const _chart_helper_1 = require("../_chart-helper");
const _common_1 = require("../_common");
const _formatter_1 = require("../_formatter");
const _localization_ids_1 = require("../_localization-ids");
const _localizer_1 = require("../_localizer");
const _utils_1 = require("../_utils");
const _chart_data_controller_base_1 = require("./_chart-data-controller-base");
class chartDataControllerProto extends _chart_data_controller_base_1.chartDataControllerBase {
    constructor(options) {
        super(options);
        this._legendSeriesPrefix = '__legend__series__';
        this._argumentAxisPoints = this.getArgumentAxisPoints();
    }
    getLegendSeriesName(seriesName) {
        return this._legendSeriesPrefix + seriesName;
    }
    getLegendSeriesDisplayName(seriesName) {
        return seriesName.indexOf(this._legendSeriesPrefix) !== -1 ? seriesName.replace(this._legendSeriesPrefix, '') : seriesName;
    }
    getDataSourceAndSeries(encodeHtml) {
        var that = this;
        if (!that.viewModel || that._argumentAxisPoints.length == 0) {
            return {
                dataSource: null,
                series: null,
                argumentAxis: {
                    categories: []
                }
            };
        }
        var seriesInfoList = that._getSeriesInfo(encodeHtml), legendInfoList = that.viewModel.Legend && !that.viewModel.IsDefaultColorizationDisabled ? that._getLegendInfo() : [], cfLegendItems = that.viewModel.Legend ? that._getConditionalFormattingLegendItems() : [], result = {
            dataSource: [],
            series: [],
            argumentAxis: null
        };
        let dataSourceAndCategories = this.getDataSourceAndCategories(seriesInfoList);
        if (dataSourceAndCategories) {
            result.dataSource = dataSourceAndCategories.dataSource;
            if (dataSourceAndCategories.categories)
                result.argumentAxis = { categories: dataSourceAndCategories.categories };
        }
        if (seriesInfoList.length > 0) {
            seriesInfoList.forEach((seriesInfo) => {
                if (seriesInfo.seriesItem) {
                    result.series.push(seriesInfo.seriesItem);
                }
            });
            legendInfoList.forEach((legendInfo) => {
                if (result.series.some(series => series.showInLegend && series.name === legendInfo.name)) {
                    return;
                }
                var legend = {
                    name: this.getLegendSeriesName(legendInfo.name),
                    color: legendInfo.color,
                    type: legendInfo.type
                };
                let insertIndex = _array_utils_1.findClosestItemIndex(result.series, (series) => {
                    return series.showInLegend && series.parentTitle === legendInfo.name;
                });
                result.series.splice(insertIndex, 0, legend);
            });
            cfLegendItems.forEach((legendItem) => {
                result.series.push({
                    name: legendItem.name,
                    color: legendItem.color,
                });
            });
        }
        return result;
    }
    getDataSourceAndCategories(seriesInfoList) {
        return this.getDataDefinedDataSourceAndCategories(seriesInfoList);
    }
    getDataDefinedDataSourceAndCategories(seriesInfoList) {
        let dataSource = [];
        let categories;
        if (seriesInfoList.length > 0) {
            categories = [];
            this._argumentAxisPoints.forEach((argumentAxisPoint, pointIndex) => {
                var argument = this.getArgumentBindingValue(argumentAxisPoint, pointIndex), dataSourceItem = {
                    x: argument
                };
                if (this._isSelectionTagsRequired()) {
                    dataSourceItem.tag = {
                        axisPoint: argumentAxisPoint
                    };
                }
                if (this.isDiscreteArgument()) {
                    categories.push(argument);
                }
                seriesInfoList.forEach(seriesInfo => {
                    if (seriesInfo.originalSeriesType === 'HighLowClose') {
                        dataSourceItem.nullColumn = null;
                    }
                    seriesInfo.valueFields.forEach(valueField => {
                        let value = valueField.getValue(argumentAxisPoint);
                        if (value === special_values_1.specialValues.errorValueGuid)
                            value = 0;
                        dataSourceItem[valueField.name] = value;
                    });
                });
                dataSource.push(dataSourceItem);
            });
        }
        else {
            categories = undefined;
        }
        return {
            dataSource: dataSource,
            categories: categories
        };
    }
    generatePaneName(paneName, paneIndex) {
        return paneName || 'Pane ' + paneIndex;
    }
    _getSeriesInfo(encodeHtml) {
        var seriesIndex = 0, seriesAxisPoints = this.getSeriesAxisPoints(), isGrandTotal = !this.viewModel.SummarySeriesMember, includeTags = this._isSelectionTagsRequired(), reversed = this.viewModel.AxisX && this.viewModel.AxisX.Reverse, result = [], add = (info) => {
            var canReverse = info.seriesItem.type !== 'stackedbar' && info.seriesItem.type !== 'fullstackedbar';
            if (reversed && canReverse)
                result.unshift(info);
            else
                result.push(info);
        }, generateSeriesInfo = (pane, seriesTemplate, paneIndex, seriesAxisPoint, additionalOptions = {}, specifyTitleByName = false) => {
            specifyTitleByName = specifyTitleByName || (pane === null || pane === void 0 ? void 0 : pane.SpecifySeriesTitlesWithSeriesName);
            var paneName = pane ? this.generatePaneName(pane.Name, paneIndex) : undefined, pointLabelInfo = this._getPointLabelInfo(seriesTemplate.PointLabel), info = Object.assign(Object.assign({}, additionalOptions), { name: seriesTemplate.Name, dataId: seriesTemplate.DataId, paneName: paneName, pointVisible: this._showPointMarker(seriesTemplate), seriesType: _chart_helper_1.chartHelper.convertSeriesType(seriesTemplate.SeriesType), originalSeriesType: seriesTemplate.SeriesType, plotOnSecondaryAxis: seriesTemplate.PlotOnSecondaryAxis, ignoreEmptyPoints: seriesTemplate.IgnoreEmptyPoints, axisPoint: seriesAxisPoint, dataMembers: seriesTemplate.DataMembers, colorMeasureId: seriesTemplate.ColorMeasureID, valueFormats: [], valueFields: [], pointLabel: pointLabelInfo });
            info.dataMembers.forEach(dataMember => {
                info.valueFormats.push(this.multiData.getMeasureFormat(dataMember));
                info.valueFields.push({
                    name: 'y' + seriesIndex.toString(),
                    getValue: (argumentAxisPoint) => {
                        return this._getCrossSlice(argumentAxisPoint, seriesAxisPoint).getMeasureValue(dataMember).getValue();
                    }
                });
                seriesIndex++;
            });
            if (!isGrandTotal) {
                info.title = this.getTitle(seriesAxisPoint);
                if (specifyTitleByName) {
                    info.title += ' - ' + (info.legendText || seriesTemplate.Name);
                }
            }
            else {
                info.title = info.legendText || seriesTemplate.Name;
            }
            info.seriesItem = this._createSeriesItem(info, includeTags, encodeHtml);
            return info;
        };
        this._iterateSeriesTemplates((pane, seriesTemplate, paneIndex) => {
            seriesAxisPoints.forEach(seriesAxisPoint => {
                var _a;
                add(generateSeriesInfo(pane, seriesTemplate, paneIndex, seriesAxisPoint));
                (_a = seriesTemplate.IndicatorViewModels) === null || _a === void 0 ? void 0 : _a.forEach(indicatorViewModel => {
                    var color = indicatorViewModel.Color;
                    var info = generateSeriesInfo(pane, indicatorViewModel, paneIndex, seriesAxisPoint, {
                        width: indicatorViewModel.Thickness,
                        dashStyle: indicatorViewModel.DashStyle,
                        parentTitle: this.getTitle(seriesAxisPoint) || seriesTemplate.Name,
                        visible: indicatorViewModel.Visible,
                        showInLegend: indicatorViewModel.ShowInLegend,
                        legendText: indicatorViewModel.DisplayName,
                        staticColor: _utils_1.getRGBColor(color.R, color.G, color.B, color.A)
                    }, true);
                    add(info);
                });
            });
        });
        return result;
    }
    customizeTooltipText(series, point, seriesFormats, encodeHtml) {
        if (!this._validatePoint(point, series.type))
            return null;
        var color = this._getCustomizeTooltipTextColor(point);
        return this._getTooltipHtml(series, point, seriesFormats, encodeHtml, color);
    }
    _getTooltipHtml(series, point, seriesFormats, encodeHtml, color) {
        var span = this._getTooltipSpanInternal(series, point, seriesFormats, encodeHtml);
        if (color) {
            var div = document.createElement('div');
            div.appendChild(_render_helper_1.RenderHelper.rectangleHtml(color, 10, 10, '5px'));
            div.appendChild(span);
            return div;
        }
        return span;
    }
    _getTooltipSpanInternal(series, point, seriesFormats, encodeHtml) {
        var that = this, element = document.createElement('span');
        element.innerText = series.name + ': ';
        element.innerText = encodeHtml ? _utils_1.encodeHtml(element.innerText) : element.innerText;
        switch (series.type) {
            case 'rangebar':
            case 'rangearea':
                element.innerText += that._formatValuesList([point.originalMinValue, point.originalValue], seriesFormats, encodeHtml);
                break;
            case 'bubble':
                element.innerText += that._formatValuesList([point.originalValue, point.size], seriesFormats, encodeHtml);
                break;
            case 'stock':
            case 'candlestick':
                const elements = that._formatOpenHighLowCloseValues([point.originalOpenValue, point.originalHighValue, point.originalLowValue, point.originalCloseValue], seriesFormats, series.getOptions().openValueField !== 'nullColumn', encodeHtml, 'br');
                elements.forEach((el) => {
                    element.appendChild(el);
                });
                break;
            default:
                element.innerText += that._formatValuesList([point.originalValue], seriesFormats, encodeHtml);
                break;
        }
        return element;
    }
    getTooltipArgumentText(obj) {
        return this.getArgumentText({ value: obj.originalArgument });
    }
    getZoomArguments() {
        var that = this, axisX = that.viewModel ? that.viewModel.AxisX : undefined;
        if (axisX && axisX.LimitVisiblePoints && that._argumentAxisPoints.length > axisX.VisiblePointsCount) {
            var endIndex = axisX.VisiblePointsCount - 1;
            return {
                start: that.getArgumentBindingValue(that._argumentAxisPoints[0], 0),
                end: that.getArgumentBindingValue(that._argumentAxisPoints[endIndex], endIndex)
            };
        }
    }
    getArgumentUniquePath(value) {
        var that = this;
        for (var i = 0; i < that._argumentAxisPoints.length; i++) {
            if (that.getArgument(that._argumentAxisPoints[i]) === value)
                return that._argumentAxisPoints[i].getUniquePath();
        }
    }
    _getArgumentAutoFormat() {
        var that = this, min = 0, max = 1;
        if (that._argumentAxisPoints.length > 0) {
            min = that._argumentAxisPoints[0].getValue();
            max = that._argumentAxisPoints[that._argumentAxisPoints.length - 1].getValue();
        }
        return _formatter_1.getAxisFormat(min, max);
    }
    _createArgumentFormat() {
        return this.isSingleArgument() ? this.getSingleArgumentDimensionFormat() : undefined;
    }
    _createAxisXFormat() {
        if (this.viewModel.AxisX.Format && (this.viewModel.AxisX.Format.NumericFormat != null || this.viewModel.AxisX.Format.DateTimeFormat != null))
            return _formatter_1.convertToFormat(this.viewModel.AxisX.Format);
        return this.getArgumentFormat();
    }
    getArgumentFormat() {
        if (this._argumentFormat == null)
            this._argumentFormat = this._createArgumentFormat();
        return this._argumentFormat;
    }
    getAxisXFormat() {
        if (this._axisXFormat == null)
            this._axisXFormat = this._createAxisXFormat();
        return this._axisXFormat;
    }
    getArgumentText(argument) {
        return this._getArgumentText(argument.value, () => this.getArgumentFormat());
    }
    getAxisXLabelText(axisValue) {
        return this._getArgumentText(axisValue.value, () => this.getAxisXFormat());
    }
    _getArgumentText(argumentValue, formatGetter) {
        if (this.isDiscreteArgument() || this.isQualitativeArgument()) {
            var axisPoint = this._argumentAxisPoints[argumentValue];
            if (this.viewModel.Argument.AxisXDateTimeFormatSupported)
                return _formatter_1.formatByFormatInfo(axisPoint.getValue(), formatGetter());
            return axisPoint ? this.getTitle(axisPoint, '\n') : argumentValue;
        }
        return _formatter_1.formatByFormatInfo(argumentValue, formatGetter());
    }
    _validatePoint(point, seriesType) {
        switch (seriesType) {
            case 'rangebar':
            case 'rangearea':
                return !(point.originalMinValue === null && point.originalValue === null);
            case 'bubble':
                return !(point.originalValue === null && point.size === null);
            case 'stock':
            case 'candlestick':
                return !(point.originalOpenValue === null && point.originalHighValue === null && point.originalLowValue === null && point.originalCloseValue === null);
            default:
                return !(point.originalValue === null);
        }
    }
    _getCustomizeTooltipTextColor(point) {
        if (point.getColor) {
            return point.getColor();
        }
    }
    _getLegendInfo() {
        var that = this, values = [], result = [], colorMeasures = that.multiData.getColorMeasures(), argumentPoints = that.getArgumentAxisPoints(that.viewModel.ArgumentColorDimension), seriesPoints = that.getSeriesAxisPoints(that.viewModel.SeriesColorDimension), includeProc = (axisPoint) => {
            var dim = axisPoint.getDimension();
            return (dim && this.viewModel.ColorPathMembers && this.viewModel.ColorPathMembers.indexOf(dim.id) !== -1);
        }, getColorValuesProc = function (axisPoint) {
            return axisPoint.getValuePath(includeProc);
        }, getColorDisplayTextsProc = function (axisPoint) {
            return axisPoint.getDisplayPath(includeProc);
        };
        colorMeasures.forEach(colorMeasure => {
            argumentPoints.forEach(argumentPoint => {
                seriesPoints.forEach(seriesPoint => {
                    var color = that._getColorFromData(argumentPoint, seriesPoint, colorMeasure.id);
                    if (color) {
                        var valueSet = getColorValuesProc(argumentPoint).concat(getColorValuesProc(seriesPoint));
                        var displayTexts = getColorDisplayTextsProc(argumentPoint).concat(getColorDisplayTextsProc(seriesPoint));
                        if (colorMeasure.name) {
                            valueSet.push(colorMeasure);
                            displayTexts.push(colorMeasure.name);
                        }
                        if (!that._valuesContainsValueSet(values, valueSet)) {
                            values.push(valueSet);
                            var colorText = displayTexts.join(' - ');
                            if (!colorText || colorText == '') {
                                colorText = that._getDisplayTextBySeriesTemplates();
                            }
                            var transparentColor = !that.viewModel.ArgumentColorDimension && _chart_helper_1.chartHelper.isTransparentColorType(that._getLastSeriesType(colorMeasure.id));
                            result.push({
                                name: colorText,
                                color: color,
                                type: transparentColor ? 'bubble' : 'line',
                                argumentField: 'legendFakeArgument',
                                valueField: 'legendFakeValue'
                            });
                        }
                    }
                });
            });
        });
        return result;
    }
    _getConditionalFormattingLegendItems() {
        let cfLegends = [];
        if (this.cfModel) {
            let isRuleHasRanges = (rule) => !!(rule.ConditionModel && rule.ConditionModel.Ranges);
            this.styleSettingsProvider.cfModel.RuleModels.filter(rule => !isRuleHasRanges(rule)).forEach(rule => {
                if (rule.ShowInLegend && rule.DisplayName) {
                    let color = this._getRuleColors(rule)[0];
                    cfLegends.push(this._getConditionalFormattingLegendItem(rule.DisplayName, color));
                }
            });
            this.styleSettingsProvider.cfModel.RuleModels.filter(rule => isRuleHasRanges(rule)).forEach(rule => {
                if (rule.ShowInLegend)
                    cfLegends = cfLegends.concat(this._getConditionalFormattingRangeLegendItems(rule));
            });
        }
        return cfLegends;
    }
    _getConditionalFormattingRangeLegendItems(rule) {
        let colors = this._getRuleColors(rule), maxPercentValue = 1, positiveInfinitySymbol = '∞', negativeInfinitySymbol = '-∞', legendItems = [], rangeConditionModel = rule.ConditionModel, dataItemFormat = this.multiData.getMeasureFormat(rule.CalcByDataId) || this.multiData.getDimensionFormat(rule.CalcByDataId);
        for (let index = rangeConditionModel.Ranges.length - 1; index >= 0; index--) {
            let rangeModel = rangeConditionModel.Ranges[index], leftValueString, rightValueString, leftValue = rangeModel.LeftValue, rightValue = rangeModel.RightValue, color = colors[index];
            if (rangeConditionModel.ValueType === 'Percent') {
                leftValueString = _formatter_1.formatPercentValue(leftValue ? leftValue / 100 : maxPercentValue);
                rightValueString = _formatter_1.formatPercentValue(rightValue / 100);
            }
            else {
                leftValueString = leftValue ? _formatter_1.format(_date_utils_1.tryConvertToDateTime(leftValue), dataItemFormat) : positiveInfinitySymbol;
                rightValueString = rightValue ? _formatter_1.format(_date_utils_1.tryConvertToDateTime(rightValue), dataItemFormat) : negativeInfinitySymbol;
            }
            let legendDescription = string_1.format(_localizer_1.localizer.getString(_localization_ids_1.localizationId.LegendItemFormatString), leftValueString, rightValueString);
            legendItems.push(this._getConditionalFormattingLegendItem(legendDescription, color));
        }
        return legendItems;
    }
    _getConditionalFormattingLegendItem(desription, color) {
        return {
            name: desription,
            color: color,
        };
    }
    _getRuleColors(rule) {
        return this.cfModel.FormatConditionStyleSettings
            .filter(style => style.RuleIndex == this.cfModel.RuleModels.indexOf(rule))
            .map(style => this.styleSettingsProvider.getBackColorFromStyleSettingsModel(style));
    }
    _valuesContainsValueSet(values, valueSet) {
        for (var i = 0; i < values.length; i++) {
            if (values[i].length !== valueSet.length)
                continue;
            var equal = true;
            for (var j = 0; j < values[i].length; j++) {
                if (values[i][j] !== valueSet[j]) {
                    equal = false;
                    break;
                }
            }
            if (equal)
                return true;
        }
        return false;
    }
    _getLastSeriesType(colorMeasureId) {
        var panes = this.viewModel.Panes;
        for (var i = panes.length - 1; i >= 0; i--) {
            for (var j = panes[i].SeriesTemplates.length - 1; j >= 0; j--) {
                if (colorMeasureId === panes[i].SeriesTemplates[j].ColorMeasureID) {
                    return _chart_helper_1.chartHelper.convertSeriesType(panes[i].SeriesTemplates[j].SeriesType);
                }
            }
        }
    }
    _getDisplayTextBySeriesTemplates() {
        var displayTexts = [];
        this._iterateSeriesTemplates((pane, seriesTemplate, paneIndex, templateIndex) => {
            var name = seriesTemplate.Name;
            if (displayTexts.indexOf(name) === -1) {
                displayTexts.push(name);
            }
        });
        return displayTexts.join(', ');
    }
    _iterateSeriesTemplates(proc) {
        this.viewModel.Panes.forEach((pane, paneIndex) => {
            pane.SeriesTemplates.forEach(seriesTemplate => {
                proc(pane, seriesTemplate, paneIndex);
            });
        });
    }
    _isSelectionTagsRequired() {
        return true;
    }
    _createSeriesItem(seriesInfo, includeTags, encodeHtml) {
        var that = this, seriesItem = {
            argumentField: 'x',
            type: seriesInfo.seriesType,
            showInLegend: seriesInfo.showInLegend || seriesInfo.seriesType === 'stock' || seriesInfo.seriesType === 'candlestick'
        }, setNamesListProc = function (names) {
            if (seriesInfo.originalSeriesType === 'HighLowClose') {
                seriesItem[names[0]] = 'nullColumn';
                names.splice(0, 1);
            }
            for (var i = 0; i < Math.min(names.length, seriesInfo.valueFields.length); i++) {
                seriesItem[names[i]] = seriesInfo.valueFields[i].name;
            }
        }, assingSeriesItemProperty = (propertyName, alterName = propertyName) => {
            if (_utils_1.type.isDefined(seriesInfo[propertyName]))
                seriesItem[alterName] = seriesInfo[propertyName];
        }, assingSeriesItemProperties = (assingProperties) => {
            assingProperties.forEach((property) => assingSeriesItemProperty(property));
        };
        assingSeriesItemProperty('title', 'name');
        assingSeriesItemProperty('paneName', 'pane');
        assingSeriesItemProperties(['width', 'dashStyle', 'visible', 'parentTitle']);
        if (includeTags) {
            seriesItem.tag = {
                axisPoint: seriesInfo.axisPoint,
                dataMembers: seriesInfo.dataMembers,
                valueFormats: seriesInfo.valueFormats,
                colorMeasureId: seriesInfo.colorMeasureId
            };
        }
        seriesItem.point = {
            visible: seriesInfo.pointVisible
        };
        seriesItem[_common_1.DashboardDataIdField] = seriesInfo.dataId;
        switch (seriesItem.type) {
            case 'rangebar':
            case 'rangearea':
                setNamesListProc(['rangeValue1Field', 'rangeValue2Field']);
                break;
            case 'bubble':
                setNamesListProc(['valueField', 'sizeField']);
                break;
            case 'stock':
            case 'candlestick':
                setNamesListProc(['openValueField', 'highValueField', 'lowValueField', 'closeValueField']);
                break;
            default:
                setNamesListProc(['valueField']);
                break;
        }
        seriesItem.axis = (seriesInfo.paneName || '') + (seriesInfo.plotOnSecondaryAxis ? 'secondary' : 'primary');
        if (seriesInfo.ignoreEmptyPoints) {
            seriesItem.ignoreEmptyPoints = seriesInfo.ignoreEmptyPoints;
        }
        if (that.showPointLabels(seriesInfo.pointLabel)) {
            var pointLabel = seriesInfo.pointLabel;
            seriesItem.label = {
                visible: true,
                rotationAngle: pointLabel.rotationAngle,
                customizeText: function () {
                    return that._customizePointLabelText(this, pointLabel, seriesInfo);
                }
            };
            if (seriesItem.type === 'bar') {
                seriesItem.label.showForZeroValues = pointLabel.showForZeroValues;
            }
            if (seriesItem.type === 'bar' || seriesItem.type === 'bubble') {
                seriesItem.label.position = pointLabel.position;
            }
            else if (seriesItem.type === 'fullstackedbar') {
                seriesItem.label.position = 'inside';
            }
        }
        var color = undefined;
        if (that.viewModel.IsDefaultColorizationDisabled)
            color = that.styleSettingsProvider.getDefaultBackColor();
        else if (_utils_1.type.isDefined(seriesInfo.colorMeasureId)) {
            color = that._getColorFromData(that._argumentAxisPoints[0], seriesInfo.axisPoint, seriesInfo.colorMeasureId);
        }
        let cfColor = that.getConditionalFormattingSeriesColor(seriesInfo.axisPoint, seriesInfo.dataMembers[0]);
        if (cfColor)
            color = cfColor;
        if (_chart_helper_1.chartHelper.isSeriesColorSupported(seriesItem.type)) {
            var argumentRootAxisPoint = this.multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis).getRootPoint();
            color = that._getElementCustomColor(argumentRootAxisPoint, seriesInfo.axisPoint, seriesInfo.dataMembers, color);
        }
        if (color) {
            seriesItem.color = color;
        }
        else if (_utils_1.type.isDefined(seriesInfo.staticColor)) {
            seriesItem.color = seriesInfo.staticColor;
        }
        if (_chart_helper_1.chartHelper.isStackedAreaType(seriesItem.type)) {
            seriesItem.opacity = 1;
        }
        return seriesItem;
    }
    _customizePointLabelText(valueContainer, pointLabel, seriesInfo) {
        var that = this, contentType = pointLabel.contentType, formatArgumentProc = function () {
            return that.getArgumentText({ value: valueContainer.argument });
        }, formatValueProc = function () {
            var formats = seriesInfo.valueFormats;
            switch (seriesInfo.seriesType) {
                case 'rangebar':
                case 'rangearea':
                    return that._formatValuesList([valueContainer.value], [formats[valueContainer.index]], false);
                case 'bubble':
                    return that._formatValuesList([valueContainer.value, valueContainer.size], formats, false);
                case 'stock':
                case 'candlestick':
                    return that._formatOpenHighLowCloseValues([valueContainer.openValue, valueContainer.highValue, valueContainer.lowValue, valueContainer.closeValue], formats, seriesInfo.originalSeriesType !== 'HighLowClose', false, '\n\r');
                default:
                    return that._formatValuesList([valueContainer.value], formats, false);
            }
        };
        let hasArgument = (contentType & enums_1.PointLabelContentType.Argument) > 0, hasSeriesName = (contentType & enums_1.PointLabelContentType.SeriesName) > 0, hasValue = (contentType & enums_1.PointLabelContentType.Value) > 0, hasPercent = (contentType & enums_1.PointLabelContentType.Percent) > 0 && this._getPercentSupported(seriesInfo);
        let firstPart = '';
        let secondPart = '';
        let argument = hasArgument ? formatArgumentProc() : '';
        let series = hasSeriesName ? valueContainer.seriesName : '';
        let percent = hasPercent ? _formatter_1.formatPercentValue(valueContainer.percent) : '';
        if (hasArgument) {
            firstPart = hasSeriesName ? `${argument} (${series})` : `${argument}`;
        }
        else if (hasSeriesName) {
            firstPart = `${series}`;
        }
        if (hasValue) {
            const value = formatValueProc();
            let valueText = '';
            if (typeof value === 'string') {
                valueText = value;
            }
            else {
                value.forEach((x) => {
                    valueText += x.outerHTML;
                });
            }
            secondPart = hasPercent ? `${valueText} (${percent})` : `${valueText}`;
        }
        else if (hasPercent) {
            secondPart = `${percent}`;
        }
        return [`${firstPart}`, `${secondPart}`].filter(s => s != '').join(': ');
    }
    _getPercentSupported(seriesInfo) {
        var series = ['fullstackedbar', 'fullstackedline', 'fullstackedarea', 'fullstackedsplinearea'];
        return series.indexOf(seriesInfo.seriesType) >= 0;
    }
    _formatOpenHighLowCloseValues(values, formats, hasOpenValueField, encodeHtml, delimiter) {
        var result = [], delimiter = delimiter || ' ', formatsLength = formats ? formats.length : 0, i, formatIndex, valueNames = [
            _localizer_1.localizer.getString(_localization_ids_1.localizationId.OpenCaption),
            _localizer_1.localizer.getString(_localization_ids_1.localizationId.HighCaption),
            _localizer_1.localizer.getString(_localization_ids_1.localizationId.LowCaption),
            _localizer_1.localizer.getString(_localization_ids_1.localizationId.CloseCaption)
        ];
        if (values && (formatsLength > 0) && (formatsLength <= values.length)) {
            for (formatIndex = 0, i = hasOpenValueField ? 0 : 1; formatIndex < formatsLength; formatIndex++, i++) {
                result.push(document.createElement(delimiter));
                const span = document.createElement('span');
                span.innerText = valueNames[i] + ': ' + this._formatValue(values[i], formats[formatIndex], encodeHtml);
                result.push(span);
            }
        }
        return result;
    }
    _formatValuesList(valuesList, formats, encodeHtml) {
        var result = '';
        if (formats && formats.length === valuesList.length) {
            for (var i = 0; i < valuesList.length; i++) {
                result = result + (i === 0 ? '' : ' - ') + this._formatValue(valuesList[i], formats[i], encodeHtml);
            }
        }
        return result;
    }
    _formatValue(value, format, encodeHtml) {
        var text = _formatter_1.format(value ? value : 0, format);
        return encodeHtml ? _utils_1.encodeHtml(text) : text;
    }
    _isNumericDataType(type) {
        return type == 'Integer' || type == 'Float' || type == 'Double' || type == 'Decimal';
    }
    _convertContentType(typeModel) {
        return enums_1.parsePointLabelContentType(typeModel);
    }
    _showPointMarker(seriesTemplate) {
        if (seriesTemplate.SeriesType === 'Point') {
            return true;
        }
        else if (exports.allowedTypesForShowPointMarkers.indexOf(seriesTemplate.SeriesType) !== -1) {
            return seriesTemplate.ShowPointMarkers;
        }
        else {
            return false;
        }
    }
    checkSeriesTemplatePointLabels(seriesTemplateViewModel) {
        return this.showPointLabels(this._getPointLabelInfo(seriesTemplateViewModel.PointLabel));
    }
    showPointLabels(pointLabelInfo) {
        return pointLabelInfo && pointLabelInfo.contentType != enums_1.PointLabelContentType.None;
    }
    _getPointLabelInfo(pointLabelViewModel) {
        if (pointLabelViewModel) {
            return {
                showPointLabels: pointLabelViewModel.ShowPointLabels,
                rotationAngle: _chart_helper_1.chartHelper.convertPointLabelRotationAngle(pointLabelViewModel.Orientation),
                position: _chart_helper_1.chartHelper.convertPointLabelPosition(pointLabelViewModel.Position),
                showForZeroValues: pointLabelViewModel.ShowForZeroValues,
                contentType: this._convertContentType(pointLabelViewModel.ContentType),
                scatterContent: pointLabelViewModel.ScatterContent
            };
        }
    }
}
exports.chartDataControllerProto = chartDataControllerProto;
exports.allowedTypesForShowPointMarkers = ['Line', 'Spline', 'StepLine', 'StackedLine', 'FullStackedLine', 'SplineArea', 'Area', 'StepArea', 'RangeArea'];
