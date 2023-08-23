﻿/**
* DevExpress Dashboard (_pie-data-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieDataController = void 0;
const _formatter_1 = require("../_formatter");
const _chart_data_controller_base_1 = require("./_chart-data-controller-base");
var PieSettingsType = {
    SeriesOnly: 'SeriesOnly',
    ArgumentsOnly: 'ArgumentsOnly',
    ArgumentsAndSeries: 'ArgumentsAndSeries',
    ElementSelection: 'ElementSelection'
};
class pieDataController extends _chart_data_controller_base_1.chartDataControllerBase {
    constructor(options) {
        super(options);
        if (this.multiData && this.viewModel) {
            this._measures = this.multiData ? this.multiData.getMeasures() : [];
            this._argumentAxisPoints = this.getArgumentAxisPoints();
            if (this.viewModel.ProvideValuesAsArguments) {
                this.settingsType = PieSettingsType.SeriesOnly;
            }
            else if (!this.viewModel.SummarySeriesMember) {
                this.settingsType = PieSettingsType.ArgumentsOnly;
            }
            else if (this.viewModel.ContentDescription && this.viewModel.ContentDescription.ElementSelectionEnabled) {
                this.settingsType = PieSettingsType.ElementSelection;
            }
            else {
                this.settingsType = PieSettingsType.ArgumentsAndSeries;
            }
        }
    }
    getPointDisplayTexts(pointTag, value, percent) {
        var that = this, valueDataMember = pointTag.dataMembers[0], measure = this.multiData.getMeasureById(valueDataMember);
        return {
            argumentText: (this.settingsType === PieSettingsType.SeriesOnly) ? measure.name : that.getTitle(pointTag.axisPoint, '\n'),
            valueText: pointTag.valueText,
            percentText: _formatter_1.formatNumeric(percent, this.viewModel.PercentFormatViewModel)
        };
    }
    isDiscreteArgument() {
        return true;
    }
    createDataSource(seriesAxisPoint, valueDataMember) {
        var that = this, viewModel = that.viewModel, dataSource = [];
        if (that.settingsType === PieSettingsType.SeriesOnly) {
            var argumentAxisPoint = that._getArgumentAxis().getRootPoint();
            that._measures
                .filter(measure => viewModel.ValueDataMembers && viewModel.ValueDataMembers.indexOf(measure.id) !== -1)
                .forEach((measure, index) => {
                var dataMember = measure.id, valueInfo = that._getCrossSlice(argumentAxisPoint, seriesAxisPoint).getMeasureValue(dataMember);
                dataSource.push({
                    x: measure.name,
                    y: that._getCorrectZeroValue(valueInfo.getValue()),
                    tag: {
                        axisPoint: argumentAxisPoint,
                        dataMembers: [dataMember],
                        colorMeasureId: that._getColorDataMemberByIndex(index),
                        valueText: valueInfo.getDisplayText()
                    }
                });
            });
        }
        else {
            that._argumentAxisPoints.forEach(argumentAxisPoint => {
                var valueInfo = that._getCrossSlice(argumentAxisPoint, seriesAxisPoint).getMeasureValue(valueDataMember);
                dataSource.push({
                    x: that.getArgument(argumentAxisPoint),
                    y: that._getCorrectZeroValue(valueInfo.getValue()),
                    tag: {
                        axisPoint: argumentAxisPoint,
                        dataMembers: [valueDataMember],
                        colorMeasureId: that._getColorDataMemberByMeasureId(valueDataMember),
                        valueText: valueInfo.getDisplayText()
                    }
                });
            });
        }
        return dataSource;
    }
    getValueDataMembers() {
        var viewModel = this.viewModel;
        switch (this.settingsType) {
            case PieSettingsType.SeriesOnly:
                return ['SeriesOnlyInternalFakeValueDataMember'];
            case PieSettingsType.ArgumentsOnly:
            case PieSettingsType.ArgumentsAndSeries:
                return viewModel.ValueDataMembers;
            case PieSettingsType.ElementSelection:
                return [viewModel.ValueDataMembers[viewModel.ContentDescription.SelectedElementIndex]];
        }
    }
    getValueDisplayNames(seriesAxisPoint, valueDataMemberIndex) {
        var viewModel = this.viewModel;
        switch (this.settingsType) {
            case PieSettingsType.ArgumentsOnly:
                return viewModel.ValueDisplayNames[valueDataMemberIndex];
            case PieSettingsType.SeriesOnly:
            case PieSettingsType.ArgumentsAndSeries:
            case PieSettingsType.ElementSelection:
                return this.getTitle(seriesAxisPoint);
        }
    }
    _getCorrectZeroValue(value) {
        return value === 0 || value == null ? null : Math.abs(value);
    }
    _getColorDataMemberByMeasureId(valueDataMember) {
        var viewModel = this.viewModel;
        switch (this.settingsType) {
            case PieSettingsType.ArgumentsOnly:
                var index = viewModel.ValueDataMembers ? viewModel.ValueDataMembers.indexOf(valueDataMember) : -1;
                return this._getColorDataMemberByIndex(index);
            case PieSettingsType.ArgumentsAndSeries:
                return this._getColorDataMemberByIndex(0);
            case PieSettingsType.ElementSelection:
                return this._getColorDataMemberByIndex(viewModel.ContentDescription.SelectedElementIndex);
            default:
                return undefined;
        }
    }
    _getColorDataMemberByIndex(index) {
        var colorDataMembers = this.viewModel.ColorDataMembers;
        return (colorDataMembers.length == 1) ? colorDataMembers[0] : colorDataMembers[index];
    }
}
exports.pieDataController = pieDataController;
