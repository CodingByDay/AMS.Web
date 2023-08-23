﻿/**
* DevExpress Dashboard (_range-state-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RangeStateController = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const dashboard_state_1 = require("../../dashboard-state");
const _dimension_filter_values_1 = require("../../data-item/_dimension-filter-values");
const _date_utils_1 = require("../../internal/_date-utils");
class RangeStateController {
    constructor(item) {
        this.item = item;
    }
    get defaultDateTimePeriodName() { return this.item.defaultDateTimePeriodName; }
    get currentSelectedDateTimePeriodName() { return this.item.currentSelectedDateTimePeriodName; }
    get dateTimePeriods() { return this.item.dateTimePeriods; }
    get _selectionValues() { return this.item._selectionValues; }
    _getSelectionByPeriod(period) {
        return this.item._getSelectionByPeriod(period);
    }
    _setSelection(stateSelection) {
        this.item._setSelection(stateSelection);
    }
    initialize() {
        if (this.defaultDateTimePeriodName()) {
            this.item._processItemSetPredefinedPeriod(this.defaultDateTimePeriodName());
        }
        this.dateTimePeriods.subscribe(newPeriods => {
            if (!newPeriods.filter(p => p.name() === this.defaultDateTimePeriodName())[0]) {
                this.defaultDateTimePeriodName(undefined);
            }
        });
        var subscribeOnDefaultPeriodNameChange = () => {
            this.item._defaultDateTimePeriodIndexSubscription && this.item._defaultDateTimePeriodIndexSubscription.dispose();
            this.item._defaultDateTimePeriodIndexSubscription = null;
            var newPeriod = this.dateTimePeriods().filter(p => p.name() === this.defaultDateTimePeriodName())[0];
            if (newPeriod) {
                this.item._defaultDateTimePeriodIndexSubscription = newPeriod.name.subscribe((changedName) => {
                    this.defaultDateTimePeriodName(changedName);
                });
            }
        };
        this.defaultDateTimePeriodName.subscribe(newName => {
            subscribeOnDefaultPeriodNameChange();
            this.item._processItemSetPredefinedPeriod(newName);
        });
        subscribeOnDefaultPeriodNameChange();
        this.item._state = ko.computed(() => {
            var state = new dashboard_state_1.ItemState();
            if (this.defaultDateTimePeriodName() && this.defaultDateTimePeriodName() !== this.currentSelectedDateTimePeriodName()) {
                state.RangeFilterState = null;
            }
            if (this.currentSelectedDateTimePeriodName()) {
                if (this.currentSelectedDateTimePeriodName() !== this.defaultDateTimePeriodName()) {
                    state.RangeFilterState = {
                        PeriodName: this.currentSelectedDateTimePeriodName()
                    };
                }
            }
            else {
                var selection = _date_utils_1.toStringArray(this._selectionValues());
                if (selection && selection.length && (!!selection[0][0] || !!selection[0][1])) {
                    state.RangeFilterState = {
                        Selection: {
                            Minimum: selection[0][0],
                            Maximum: selection[0][1]
                        }
                    };
                }
            }
            return state;
        });
    }
    setState(itemState) {
        var obsoleteItemState = itemState;
        let rangeFilterState = itemState.RangeFilterState;
        let selectedPeriod;
        let selection;
        if (rangeFilterState) {
            let rangeSelection = rangeFilterState.Selection;
            if (rangeFilterState.PeriodName) {
                let period = this.dateTimePeriods().filter(p => p.name() === rangeFilterState.PeriodName)[0];
                if (period) {
                    selectedPeriod = rangeFilterState.PeriodName;
                    selection = this._getSelectionByPeriod(period);
                }
            }
            else if (rangeSelection) {
                if (!!rangeSelection.Minimum || !!rangeSelection.Maximum) {
                    selection = [[rangeSelection.Minimum, rangeSelection.Maximum]];
                }
            }
        }
        else {
            selection = itemState.MasterFilterValues || obsoleteItemState.Selection;
        }
        this.currentSelectedDateTimePeriodName(selectedPeriod);
        this._setSelection(selection);
    }
    removeSelectionFromState(state) {
        var itemState = _jquery_helpers_1.deepExtend({}, state);
        itemState.RangeFilterState = undefined;
        return itemState;
    }
    setPredefinedPeriodToState(state, periodName) {
        var itemState = _jquery_helpers_1.deepExtend({}, state);
        itemState.RangeFilterState = { PeriodName: periodName };
        return itemState;
    }
    setSelectionToState(state, selection) {
        var itemState = _jquery_helpers_1.deepExtend({}, state);
        if (!itemState.RangeFilterState) {
            itemState.RangeFilterState = new dashboard_state_1.RangeFilterState();
        }
        let rangeSelection = new dashboard_state_1.RangeFilterSelection();
        if (selection && selection.length > 0 && selection[0].length > 0) {
            rangeSelection.Minimum = selection[0][0];
            rangeSelection.Maximum = selection[0][1];
        }
        itemState.RangeFilterState.Selection = rangeSelection;
        return itemState;
    }
    extendContentState(content) {
        if (this.currentSelectedDateTimePeriodName()) {
            let selectedPeriod = this.dateTimePeriods().filter(p => p.name() === this.currentSelectedDateTimePeriodName())[0];
            if (selectedPeriod) {
                content.ViewModel.SelectedPeriodIndex = this.dateTimePeriods().indexOf(selectedPeriod);
            }
        }
    }
    _getDisplayFilterValues(limitCount) {
        var metaData = this.item._dataManager() ? this.item._dataManager().getMetaData() : undefined, selection = this.item._outputFilter(), outFilterValues = [], argumentDimension = selection && selection.dimensions && selection.dimensions[0];
        if (argumentDimension) {
            let dimensionId = argumentDimension['@DefaultId'];
            let format = metaData ? metaData.getDimensionFormat(dimensionId) : undefined;
            if (!_utils_1.arrayEquals(selection.range, this.item._fullRange())) {
                let filterValues = new _dimension_filter_values_1.DimensionFilterValues(this.item._getDimensionDisplayName(dimensionId));
                filterValues.Values.push({
                    Type: 'Range',
                    RangeLeft: selection.range[0],
                    RangeRight: selection.range[1],
                    Format: format
                });
                outFilterValues.push(filterValues);
            }
        }
        return outFilterValues;
    }
}
exports.RangeStateController = RangeStateController;
