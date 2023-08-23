﻿/**
* DevExpress Dashboard (date-filter-item.js)
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
exports.DateFilterItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _range_filter_selection_validator_1 = require("../../../viewer-parts/viewer-items/range-selector-item/_range-filter-selection-validator");
const data_item_1 = require("../../data-item/data-item");
const _utils_1 = require("../../internal/_utils");
const serializable_model_1 = require("../../serializable-model");
const data_dashboard_item_1 = require("../data-dashboard-item");
const date_time_period_1 = require("../range-filter/date-time-period");
const _range_filter_item_helper_1 = require("../range-filter/_range-filter-item-helper");
const _range_state_controller_1 = require("../range-filter/_range-state-controller");
const _date_filter_item_1 = require("./metadata/_date-filter-item");
class DateFilterItem extends data_dashboard_item_1.DataDashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this._defaultDateTimePeriodIndexSubscription = null;
        this.currentSelectedDateTimePeriodName = ko.observable();
        this._attachDataItem(this, _date_filter_item_1.dateFilterDimension.propertyName);
        this.__dimension._specifics.acceptableShapingType = data_item_1.AcceptableShapingType.RangeDate;
        this.dateTimePeriods = analytics_utils_1.deserializeArray(dashboardItemJSON.DateTimePeriods, (item) => new date_time_period_1.DateTimePeriod(item, serializer));
        this._stateController = new _range_state_controller_1.RangeStateController(this);
        this._stateController.initialize();
        _range_filter_item_helper_1._subscribeToDimension(this.dimension, this.dateTimePeriods, this._dataManager);
    }
    _getSelectionByPeriod(period) {
        let range = period.getDateTimeValue();
        return [[range.startValue, range.endValue]];
    }
    _clearBindings() {
        super._clearBindings();
        this.dateTimePeriods.removeAll();
    }
    _getInfoCore() {
        return _date_filter_item_1.dateFilterDashboardItemSerializationsInfo;
    }
    _getDefaultItemType() {
        return 'DateFilter';
    }
    _getClearMasterFilterSupported() { return true; }
    _getIsMasterFilter() { return true; }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getIsVisualInteractivitySupported() { return false; }
    _getInteractivityDimensionLinks() {
        return [this.__dimension];
    }
    _getDisplayFilterValues(limitCount) {
        return this._stateController._getDisplayFilterValues(limitCount);
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        (content.ViewModel.DateTimePeriods || []).forEach(p => {
            p.Start && p.Start.Date && (p.Start.Date = new Date(p.Start.Date));
            p.End && p.End.Date && (p.End.Date = new Date(p.End.Date));
        });
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
    _getValidatedSelection(selectionValues) {
        let validatedValues = super._getValidatedSelection(selectionValues);
        if (validatedValues && this.dimension()) {
            let validatedRange = _range_filter_selection_validator_1.RangeFilterSelectionValidator.validate({
                startValue: validatedValues[0][0],
                endValue: validatedValues[0][1]
            }, this.dimension()._actualDateTimeGroupInterval() === 'Year');
            validatedValues[0] = [validatedRange.startValue, validatedRange.endValue];
        }
        return validatedValues;
    }
    _extendContentState(content) {
        super._extendContentState(content);
        this._stateController.extendContentState(content);
    }
    _hasSelection() {
        if (!!this.currentSelectedDateTimePeriodName())
            return true;
        else if (super._hasSelection()) {
            if (!!this._selectionValues()[0][0] || !!this._selectionValues()[0][1])
                return true;
        }
        return false;
    }
    _isSortingEnabled() {
        return false;
    }
    _isTopNEnabled(dataItem) {
        return false;
    }
    _getEntireRange() {
        if (this._multiData) {
            var measures = this._multiData.getMeasures();
            var values = [];
            for (var i = 0; i < measures.length; i++)
                values.push(this._multiData.getMeasureValue(measures[i].id).getValue());
            values.sort((a, b) => a > b ? 1 : -1);
            return values;
        }
        return [];
    }
}
__decorate([
    _utils_1.collectionItemType('DateTimePeriod')
], DateFilterItem.prototype, "dateTimePeriods", void 0);
exports.DateFilterItem = DateFilterItem;
serializable_model_1.itemTypesMap['DateFilter'] = { type: DateFilterItem, groupName: 'filter', title: 'DashboardStringId.DefaultNameDateFilterItem', index: 350 };
