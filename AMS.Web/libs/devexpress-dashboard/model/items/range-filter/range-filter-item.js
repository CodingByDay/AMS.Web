﻿/**
* DevExpress Dashboard (range-filter-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeFilterItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const item_data_axis_names_1 = require("../../../data/item-data/item-data-axis-names");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _range_filter_selection_validator_1 = require("../../../viewer-parts/viewer-items/range-selector-item/_range-filter-selection-validator");
const data_item_1 = require("../../data-item/data-item");
const range_filter_calc_window_definition_1 = require("../../data-item/window-definition/range-filter-calc-window-definition");
const _array_utils_1 = require("../../internal/_array-utils");
const _utils_1 = require("../../internal/_utils");
const _base_metadata_1 = require("../../metadata/_base-metadata");
const serializable_model_1 = require("../../serializable-model");
const chart_series_creator_1 = require("../chart/chart-series-creator");
const series_item_1 = require("../series-item");
const date_time_period_1 = require("./date-time-period");
const _range_filter_item_1 = require("./metadata/_range-filter-item");
const _range_filter_item_helper_1 = require("./_range-filter-item-helper");
const _range_state_controller_1 = require("./_range-state-controller");
class RangeFilterItem extends series_item_1.SeriesItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this._defaultDateTimePeriodIndexSubscription = null;
        this.currentSelectedDateTimePeriodName = ko.observable();
        this.series = analytics_utils_1.deserializeArray(dashboardItemJSON.Series, (item) => chart_series_creator_1.ChartSeriesCreator.createSeries(this, item, serializer));
        this.dateTimePeriods = analytics_utils_1.deserializeArray(dashboardItemJSON.DateTimePeriods, (item) => new date_time_period_1.DateTimePeriod(item, serializer));
        this._attachDataItem(this, _range_filter_item_1.argument.propertyName);
        this.__argument._specifics.acceptableShapingType = data_item_1.AcceptableShapingType.RangeDate;
        this.__argument._specifics.forceAddOlapExactDateFormat = true;
        this._stateController = new _range_state_controller_1.RangeStateController(this);
        this._stateController.initialize();
        _range_filter_item_helper_1._subscribeToDimension(this.argument, this.dateTimePeriods, this._dataManager);
    }
    get _supportParallelRequests() {
        return false;
    }
    _clearBindings() {
        super._clearBindings();
        this.dateTimePeriods.removeAll();
        this.series.removeAll();
    }
    _getInfoCore() {
        return _range_filter_item_1.rangeFilterDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'RangeFilter';
    }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getClearMasterFilterSupported() { return true; }
    _getIsMasterFilter() { return true; }
    _getInteractivityDimensionLinks() {
        return [this.__argument];
    }
    _getIsVisualInteractivitySupported() { return false; }
    _getCanColorByDimensions() { return true; }
    _getCanColorByMeasures() { return true; }
    _getAreMeasuresColoredByDefault() {
        return this.series().length > 1;
    }
    _getIsDimensionColoredByDefault(dimension) {
        return !!this.__seriesDimensions().filter(link => link.dataItem() === dimension)[0];
    }
    _getColorizableDataItemsInfo() {
        return [{
                items: this.__seriesDimensions(),
                prefixId: _base_metadata_1.BindingSectionTitles.SeriesDimension
            }];
    }
    _getDefaultCalculationWindowDefinition() {
        return new range_filter_calc_window_definition_1.RangeFilterWindowDefinition();
    }
    _hasSelection() {
        if (this.currentSelectedDateTimePeriodName())
            return true;
        if (super._hasSelection()) {
            let fullRange = this._fullRange.peek();
            if (fullRange) {
                return !_array_utils_1.arrayEquals(fullRange, this._selectionValues()[0]);
            }
            else
                return true;
        }
        return false;
    }
    _getSelectionByPeriod(period) {
        let range = period.getDateTimeValue();
        return [[range.startValue, range.endValue]];
    }
    _getDisplayFilterValues(limitCount) {
        return this._stateController._getDisplayFilterValues(limitCount);
    }
    _getEntireRange() {
        var points = this._getPointsByDimension(this.__argument.uniqueName(), item_data_axis_names_1.itemDataAxisNames.chartArgumentAxis);
        if (points && points.length > 0) {
            return [points[0].getValue(), points[points.length - 1].getValue()];
        }
        return [];
    }
    _validateSelectionByData(selection) {
        if (this.argument()) {
            let newRange = this._getEntireRange();
            if (!_array_utils_1.arrayEquals(newRange, this._fullRange.peek()))
                this._fullRange(newRange);
        }
        let validatedSelection = this._fullRange() && this._fullRange().length > 0 ? selection : undefined;
        this._setSelection(validatedSelection);
    }
    _getValidatedSelection(selectionValues) {
        let validatedValues = super._getValidatedSelection(selectionValues);
        if (this._fullRange() && this._fullRange().length > 0) {
            if (validatedValues) {
                let validatedRange = _range_filter_selection_validator_1.RangeFilterSelectionValidator.validate({
                    startValue: validatedValues[0][0],
                    endValue: validatedValues[0][1]
                }, this.argument()._actualDateTimeGroupInterval() === 'Year', {
                    minimum: this._fullRange()[0],
                    maximum: this._fullRange()[1]
                });
                validatedValues[0] = [validatedRange.startValue, validatedRange.endValue];
            }
        }
        return validatedValues;
    }
    _setState(itemState) {
        this._stateController.setState(itemState);
    }
    _removeSelectionFromState(state) {
        let itemState = super._removeSelectionFromState(_jquery_helpers_1.deepExtend({}, state));
        return this._stateController.removeSelectionFromState(itemState);
    }
    _setPredefinedPeriodToState(state, periodName) {
        let itemState = super._setPredefinedPeriodToState(_jquery_helpers_1.deepExtend({}, state), periodName);
        return this._stateController.setPredefinedPeriodToState(itemState, periodName);
    }
    _setSelectionToState(state, selection) {
        return this._stateController.setSelectionToState(state, selection);
    }
    _extendContentState(content) {
        super._extendContentState(content);
        this._stateController.extendContentState(content);
    }
    _isSortingEnabled() {
        return false;
    }
    _isTopNEnabled(dataItem) {
        return false;
    }
}
RangeFilterItem.rangeSeriesViewTypesMap = {
    Line: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.Line,
    StackedLine: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.StackedLine,
    FullStackedLine: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.FullStackedLine,
    Area: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.Area,
    StackedArea: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.StackedArea,
    FullStackedArea: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.FullStackedArea,
    Bar: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.Bar,
    StackedBar: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.StackedBar,
    FullStackedBar: chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap.FullStackedBar
};
__decorate([
    _utils_1.collectionItemType('DateTimePeriod')
], RangeFilterItem.prototype, "dateTimePeriods", void 0);
exports.RangeFilterItem = RangeFilterItem;
serializable_model_1.itemTypesMap['RangeFilter'] = { type: RangeFilterItem, groupName: 'filter', title: 'DashboardStringId.DefaultNameRangeFilterItem', index: 310 };
