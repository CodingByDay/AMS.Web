﻿/**
* DevExpress Dashboard (_date-filter-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateFilterElement = exports.cssDateFilterClassNames = void 0;
const _common_1 = require("../../../data/_common");
const _format_helper_1 = require("../../../data/_format-helper");
const _formatter_1 = require("../../../data/_formatter");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _base_item_1 = require("../_base-item");
const date_filter_widget_1 = require("./date-filter-widget");
exports.cssDateFilterClassNames = {
    item: 'dx-dashboard-date-filter-item'
};
class dateFilterElement extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
    }
    get _allowPreview() {
        return true;
    }
    _getMinContentHeight() {
        if (this.widget && this._isFixedHeight)
            return this.widget._getHeight();
        return 0;
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        super.renderContentUnsafe(element, changeExisting, afterRenderCallback);
        var isFirstInitialization = !changeExisting || !this.widget;
        if (isFirstInitialization)
            this.widget = new date_filter_widget_1.DateFilterWidget(element, { useNativeScrolling: this.options.useNativeScrolling, overflow: this.options.overflow }, this.controlContainer);
        var options = this.getWidgetOptions();
        this._lock();
        this.widget._update(options);
        this._unlock();
        this.widget._updateSize(_jquery_helpers_1.getWidth(this.contentRoot), _jquery_helpers_1.getHeight(this.contentRoot));
        this._isFixedHeight = options.arrangementMode === 'AutoHeight';
        this.timePeriodMenuSelectedIndex = this.options.ViewModel.SelectedPeriodIndex;
        this._applySelectionToWidget();
        return false;
    }
    getInfoUnsafe() {
        return Object.assign(Object.assign({}, super.getInfoUnsafe()), { selectedPeriodName: this._getCurrentPredefinedRange() });
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this._applySelectionToWidget();
    }
    _clearSelectionUnsafe() {
        super._clearSelectionUnsafe();
        if (this.widget) {
            this.timePeriodMenuSelectedIndex = undefined;
            this._clearSelectedValues();
        }
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (this.options) {
            this.options.allowExport = false;
        }
    }
    _clearSelectedValues() {
        this._lock();
        this.widget._clearSelectedValues();
        this._unlock();
    }
    _applySelectionToWidget() {
        this._lock();
        if (this.timePeriodMenuSelectedIndex !== undefined) {
            this.widget._setPeriod(this.timePeriodMenuSelectedIndex);
        }
        else {
            const selectedValues = this.options.SelectedValues && this.options.SelectedValues[0] && this.options.SelectedValues[0].map(v => this._convertSelectedValues(v));
            this.widget._setSelectedValues(selectedValues);
        }
        this._unlock();
        this.updateConstraints();
    }
    getWidgetOptions() {
        var multiData = this.options.multiData;
        var filterViewModel = this.options.ViewModel;
        var getValue = (name) => {
            return multiData && multiData.getMeasureValue(name).getValue();
        };
        return {
            filterType: filterViewModel.FilterType,
            arrangementMode: filterViewModel.ArrangementMode,
            datePickerLocation: filterViewModel.DatePickerLocation,
            displayTextPattern: filterViewModel.DisplayTextPattern,
            groupInterval: filterViewModel.GroupInterval,
            format: (value) => {
                var valueToFormat = value;
                if (filterViewModel.GroupInterval === 'Year')
                    valueToFormat = this._ensureYearValue(valueToFormat);
                return _format_helper_1.DashboardFormatHelper.format(valueToFormat, _formatter_1.convertToFormat({ DateTimeFormat: filterViewModel.DateTimeFormat }));
            },
            buttonClick: (name) => {
                if (!this._isLocked()) {
                    for (var i = 0; i < filterViewModel.DateTimePeriods.length; i++) {
                        if (name === filterViewModel.DateTimePeriods[i].Name && (name !== this._getCurrentPredefinedRange())) {
                            this.predefinedRangeChanged && this.predefinedRangeChanged(name);
                            break;
                        }
                    }
                }
            },
            buttonsInfo: filterViewModel.DateTimePeriods.map(period => period.Name),
            valueChanged: values => {
                if (!this._isLocked())
                    this.selected.fire(this.getName(), _common_1.viewerActions.setMasterFilter, [values]);
            },
            minimum: getValue(filterViewModel.MinimumId),
            maximum: getValue(filterViewModel.MaximumId),
            clearAction: () => this.clearMasterFilter.fire(this.getName()),
            hasOuterMargin: !this._isPaneEmpty() || this.visualMode === 'content',
            mobileLayout: this._mobileLayout()
        };
    }
    _mobileLayout() {
        return false;
    }
    _convertSelectedValues(value) {
        return value != null && this.options.ViewModel.GroupInterval == 'Year' && typeof value === 'number' ? new Date(value, 0, 1) : value;
    }
    _getCurrentPredefinedRange() {
        return this.timePeriodMenuSelectedIndex !== undefined ? this.options.ViewModel.DateTimePeriods[this.timePeriodMenuSelectedIndex].Name : '';
    }
    _setPredefinedRange(dateTimePeriodName) {
        if (dateTimePeriodName) {
            var dateTimePeriods = this.options.ViewModel.DateTimePeriods;
            let period = dateTimePeriods.filter(dateTimePeriod => dateTimePeriod.Name === dateTimePeriodName)[0];
            if (period) {
                let index = dateTimePeriods.indexOf(period);
                this.timePeriodMenuSelectedIndex = index;
                this._applySelectionToWidget();
            }
        }
        else {
            this.timePeriodMenuSelectedIndex = undefined;
        }
    }
    _ensureYearValue(value) {
        return value instanceof Date ? value.getFullYear() : value;
    }
    _updateContentSizeUnsafe() {
        super._updateContentSizeUnsafe();
        var newContentWidth = _jquery_helpers_1.getWidth(this.contentRoot), newContentHeight = _jquery_helpers_1.getHeight(this.contentRoot);
        if (this.options.ViewModel.ArrangementMode === 'AutoHeight') {
            var oldMinContentHeight = this._getMinContentHeight();
            this.widget._updateSize(newContentWidth, newContentHeight);
            var newMinContentHeight = this._getMinContentHeight();
            if (oldMinContentHeight && oldMinContentHeight !== newMinContentHeight) {
                this.updateConstraints();
            }
        }
        else
            this.widget._updateSize(newContentWidth, newContentHeight);
    }
    _getWidget() {
        return this.widget;
    }
    _isBorderRequired() {
        return false;
    }
    _isPaneEmpty() {
        return super._isPaneEmpty() || !this.hasCaption();
    }
    _isTransparentBackground() {
        return this._isPaneEmpty() && this.visualMode !== 'content';
    }
    _generateInnerBorderClassesUnsafe(element) {
        var classes = super._generateInnerBorderClassesUnsafe(element);
        if (!this._isPaneEmpty()) {
            classes.push(exports.cssDateFilterClassNames.item);
        }
        if (element) {
            if (this._isPaneEmpty()) {
                element.classList.remove(exports.cssDateFilterClassNames.item);
            }
            else {
                element.classList.add(exports.cssDateFilterClassNames.item);
            }
        }
        return classes;
    }
    dispose() {
        if (this.widget) {
            this.widget.dispose();
        }
        super.dispose();
    }
}
exports.dateFilterElement = dateFilterElement;
dateFilterElement.MinMeasureId = 'DateFilterMin';
dateFilterElement.MaxMeasureId = 'DateFilterMax';
