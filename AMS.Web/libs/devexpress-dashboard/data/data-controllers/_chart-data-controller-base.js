﻿/**
* DevExpress Dashboard (_chart-data-controller-base.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartDataControllerBase = void 0;
const color_1 = require("devextreme/color");
const _item_data_axis_helper_1 = require("../item-data/internal/_item-data-axis-helper");
const item_data_axis_names_1 = require("../item-data/item-data-axis-names");
const _localization_ids_1 = require("../_localization-ids");
const _localizer_1 = require("../_localizer");
const _utils_1 = require("../_utils");
const _data_controller_base_1 = require("./_data-controller-base");
class chartDataControllerBase extends _data_controller_base_1.dataControllerBase {
    constructor(options) {
        super(options);
    }
    static _getLegendSeriesName(seriesName) {
    }
    static _getLegendSeriesDisplayName(seriesName) {
    }
    getArgument(argumentAxisPoint) {
        if (this.isQualitativeArgument()) {
            return this.getTitle(argumentAxisPoint, '\n');
        }
        else if (this.isDiscreteArgument()) {
            if (argumentAxisPoint.getParent() != null) {
                return argumentAxisPoint.getDisplayText() || '';
            }
            else {
                return _localizer_1.localizer.getString(_localization_ids_1.localizationId.ChartTotalValue);
            }
        }
        else {
            return argumentAxisPoint.getValue();
        }
    }
    getArgumentAxisPoints(argumentId) {
        if (this.viewModel) {
            var id = argumentId ? argumentId : this.viewModel.Argument.SummaryArgumentMember, argumentAxis = this._getArgumentAxis();
            return argumentAxis ? argumentAxis.getPointsByDimension(id) : [];
        }
        else {
            return [];
        }
    }
    getSeriesAxisPoints(seriesId) {
        var seriesAxis = this._getSeriesAxis(), id = seriesId ? seriesId : this.viewModel.SummarySeriesMember;
        return seriesAxis ? seriesAxis.getPointsByDimension(id) : [];
    }
    getSingleArgumentDimensionFormat() {
        var argumentDimension = this._getSingleArgumentDimension();
        return argumentDimension ? argumentDimension.getFormat() : undefined;
    }
    getColor(argumentAxisPoint, seriesAxisPoint, measuesIds, colorMeasureId) {
        var that = this, color;
        if (that.viewModel.IsDefaultColorizationDisabled)
            color = that.styleSettingsProvider.getDefaultBackColor();
        else
            color = that._getColorFromData(argumentAxisPoint, seriesAxisPoint, colorMeasureId);
        let cfColor = that.getConditionalFormattingPointColor(argumentAxisPoint, seriesAxisPoint, measuesIds[0]);
        if (cfColor)
            color = cfColor;
        return that._getElementCustomColor(argumentAxisPoint, seriesAxisPoint, measuesIds, color);
    }
    getConditionalFormattingColorCore(argumentAxisPoint, seriesAxisPoint, seriesMeasureId, seriesElement) {
        let color = null;
        if (this.cfModel) {
            let styleSettingsInfo = this._getStyleSettingsInfo(argumentAxisPoint, seriesAxisPoint, seriesMeasureId, seriesElement);
            if (styleSettingsInfo && styleSettingsInfo.styleIndexes.length > 0)
                color = this.styleSettingsProvider.getBackColor(styleSettingsInfo);
        }
        return color;
    }
    getConditionalFormattingSeriesColor(seriesAxisPoint, seriesMeasureId) {
        return this.getConditionalFormattingColorCore(null, seriesAxisPoint, seriesMeasureId, 'LineOrArea');
    }
    getConditionalFormattingPointColor(argumentAxisPoint, seriesAxisPoint, seriesMeasureId) {
        return this.getConditionalFormattingColorCore(argumentAxisPoint, seriesAxisPoint, seriesMeasureId, 'Point');
    }
    isDiscreteArgument() {
        return this.viewModel && (this.viewModel.Argument.Type === 'String');
    }
    isQualitativeArgument() {
        return this._getArgumentAxisDimensions().length > 1 && !this.drillDownState[item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis];
    }
    isSingleArgument() {
        return this._getArgumentAxisDimensions().length == 1 || this.drillDownState[item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis] != null;
    }
    hasSeriesPoints() {
        return this.viewModel && !!this.viewModel.SummarySeriesMember;
    }
    _getElementCustomColor(argumentAxisPoint, seriesAxisPoint, measuesIds, color) {
        var that = this, dxColor = new color_1.default(color), newColor;
        if (that.elementCustomColor && color) {
            var customElementColorEventArgs = {
                targetElement: [argumentAxisPoint, seriesAxisPoint],
                measureIds: measuesIds,
                color: dxColor.toHex()
            };
            that.elementCustomColor(customElementColorEventArgs);
            newColor = new color_1.default(customElementColorEventArgs.color);
            if (!newColor.colorIsInvalid && customElementColorEventArgs.color !== dxColor.toHex()) {
                return customElementColorEventArgs.color;
            }
        }
        return color;
    }
    _getColorFromData(argumentAxisPoint, seriesAxisPoint, colorMeasureId) {
        var that = this, colorArgumentAxisPoint = argumentAxisPoint ? argumentAxisPoint.getParentByDimensionId(that.viewModel.ArgumentColorDimension) : undefined, colorSeriesAxisPoint = seriesAxisPoint.getParentByDimensionId(that.viewModel.SeriesColorDimension);
        if (_utils_1.type.isDefined(colorMeasureId)) {
            try {
                var colorValue = that._getCrossSlice(colorArgumentAxisPoint, colorSeriesAxisPoint).getColorMeasureValue(colorMeasureId);
                return colorValue !== null ? _utils_1.toColor(colorValue) : undefined;
            }
            catch (e) {
                return undefined;
            }
        }
        return undefined;
    }
    _getStyleSettingsInfo(argumentAxisPoint, seriesAxisPoint, seriesMeasureId, chartElement) {
        if (this.cfModel) {
            let rules = [], seriesInfo = {
                argumentAxisPoint: argumentAxisPoint,
                seriesAxisPoint: seriesAxisPoint,
                chartElement: chartElement
            };
            rules = this.cfModel.RuleModels.filter(rule => rule.ApplyToSeriesId === seriesMeasureId && rule.ApplyToChartElement === chartElement);
            return this._getStyleSettingsInfoCore(seriesInfo, rules, this.viewModel.ColumnAxisName, item_data_axis_names_1.itemDataAxisNames.defaultAxis);
        }
    }
    _getStyleIndexes(rule, seriesInfo, points) {
        let isExpressionRule = rule.CalcByDataId ? false : true;
        let isDimensionRule = this.multiData.getDimensions(item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis).concat(this.multiData.getDimensions(item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis)).filter(dimension => dimension.id === rule.CalcByDataId).length > 0;
        if (seriesInfo.chartElement === 'Point') {
            if (isExpressionRule) {
                let seriesPointPath = seriesInfo.seriesAxisPoint.getAxisPath();
                let argumentPointPath = seriesInfo.argumentAxisPoint.getAxisPath();
                if (seriesPointPath.length > 0 && argumentPointPath.length > 0)
                    return this.findStylesOnPointPathsIntersection(seriesPointPath, argumentPointPath, rule.FormatConditionMeasureId);
                else if (seriesPointPath.length > 0)
                    return this.findStylesOnPointPath(seriesPointPath, null, rule.FormatConditionMeasureId);
                else
                    return this.findStylesOnPointPath(argumentPointPath, null, rule.FormatConditionMeasureId);
            }
            else if (isDimensionRule)
                return this.findStylesForDimension(seriesInfo.seriesAxisPoint, seriesInfo.argumentAxisPoint, rule.CalcByDataId, rule.FormatConditionMeasureId);
            return this.findStylesOnPointIntersection([seriesInfo.seriesAxisPoint, seriesInfo.argumentAxisPoint], rule.FormatConditionMeasureId);
        }
        else if (seriesInfo.chartElement === 'LineOrArea')
            return this.getStyleIndexesOnArgumentAxis(seriesInfo.seriesAxisPoint, rule.FormatConditionMeasureId, isExpressionRule, isDimensionRule, rule.CalcByDataId);
        return null;
    }
    findStylesForDimension(seriesPoint, argumentPoint, idDimensionCalculateBy, formatRuleMeasureId) {
        let isSeriesDimension = this.multiData.getDimensions(item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis).filter(dimension => dimension.id === idDimensionCalculateBy).length > 0, slicePoint = (isSeriesDimension ? seriesPoint : argumentPoint).getParentByDimensionId(idDimensionCalculateBy);
        return this.findStylesOnPointIntersection([slicePoint], formatRuleMeasureId);
    }
    findStylesOnPointIntersection(points, ruleMeasureId) {
        return this._getMeasureValueByAxisPoints(points.filter(point => point), ruleMeasureId);
    }
    findStylesOnPointPath(pointPath, intercestionPoint, ruleMeasureId) {
        let styles;
        for (let point of pointPath) {
            styles = this.findStylesOnPointIntersection([point, intercestionPoint], ruleMeasureId);
            if (styles)
                break;
        }
        return styles;
    }
    findStylesOnPointPathsIntersection(firstPointPath, secondPointPath, ruleMeasureId) {
        let styles;
        for (let point of firstPointPath) {
            styles = this.findStylesOnPointPath(secondPointPath, point, ruleMeasureId);
            if (styles)
                break;
        }
        return styles;
    }
    getStyleIndexesOnArgumentAxis(seriesAxisPoint, cfMeasureId, isExpressionRule, isDimensionRule, idDimensionCalculateBy) {
        let helper = _item_data_axis_helper_1.itemDataAxisHelper, styles = [], rootArgumentPoint = this.multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis).getRootPoint();
        let targetSeriesPoint = seriesAxisPoint ? seriesAxisPoint : this.multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis).getRootPoint();
        helper.eachPoint(rootArgumentPoint, (point) => {
            let currentStyles;
            if (isExpressionRule)
                currentStyles = this.findStylesOnPointPath(targetSeriesPoint.getAxisPath(), point, cfMeasureId);
            else if (isDimensionRule)
                currentStyles = this.findStylesForDimension(targetSeriesPoint, point, idDimensionCalculateBy, cfMeasureId);
            else
                currentStyles = this.findStylesOnPointIntersection([point, targetSeriesPoint], cfMeasureId);
            if (currentStyles && currentStyles.length > 0) {
                styles = styles.concat(currentStyles);
                return false;
            }
        });
        return styles;
    }
    _getCrossSlice(argumentAxisPoint, seriesAxisPoint) {
        var slice = this.multiData.getSlice(seriesAxisPoint);
        return argumentAxisPoint ? slice.getSlice(argumentAxisPoint) : slice;
    }
    _getArgumentAxis() {
        return this.multiData ? this.multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis) : undefined;
    }
    _getSeriesAxis() {
        return this.multiData ? this.multiData.getAxis(item_data_axis_names_1.itemDataAxisNames.chartSeriesAxis) : undefined;
    }
    _getArgumentAxisDimensions() {
        var argumentAxis = this._getArgumentAxis(), dimensions = argumentAxis ? argumentAxis.getDimensions() : [];
        return dimensions ? dimensions : [];
    }
    _getSingleArgumentDimension() {
        var argumentDimensions = this._getArgumentAxisDimensions();
        if (argumentDimensions.length > 0) {
            return argumentDimensions[argumentDimensions.length - 1];
        }
        else {
            return undefined;
        }
    }
}
exports.chartDataControllerBase = chartDataControllerBase;
