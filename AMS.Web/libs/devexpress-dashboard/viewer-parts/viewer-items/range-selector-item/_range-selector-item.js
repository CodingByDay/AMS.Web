﻿/**
* DevExpress Dashboard (_range-selector-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeFilterSelection = exports.rangeSelectorItem = void 0;
const range_selector_1 = require("devextreme/viz/range_selector");
const special_values_1 = require("../../../data/special-values");
const _chart_helper_1 = require("../../../data/_chart-helper");
const _common_1 = require("../../../data/_common");
const _format_helper_1 = require("../../../data/_format-helper");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _utils_1 = require("../../../data/_utils");
const caption_toolbar_options_1 = require("../../widgets/caption-toolbar/caption-toolbar-options");
const _caption_toolbar_css_classes_1 = require("../../widgets/caption-toolbar/_caption-toolbar-css-classes");
const _custom_time_period_dialog_1 = require("../../widgets/dialogs/_custom-time-period-dialog");
const _render_helper_1 = require("../../widgets/_render-helper");
const _base_item_1 = require("../_base-item");
const _range_filter_selection_validator_1 = require("./_range-filter-selection-validator");
var DayIntervalWidthInPixels = 25, MonthIntervalWidthInPixels = 40, QuarterIntervalWidthInPixels = 20;
class rangeSelectorItem extends _base_item_1.baseItem {
    constructor(container, options) {
        super(container, options);
        this.itemElementCustomColor = _jquery_helpers_1.createJQueryCallbacks();
        this.timePeriodMenuSelectedIndex = undefined;
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    get _isBottomFloatingToolbarPosition() {
        return true;
    }
    _getCustomTimePeriodDialog() {
        if (!this._customTimePeriodDialog) {
            this._customTimePeriodDialog = new _custom_time_period_dialog_1.customTimePeriodDialog({
                container: _jquery_helpers_1.closest(this.container, '.' + _caption_toolbar_css_classes_1.cssClasses.dashboardContainer),
                setRange: (range) => {
                    this.selected.fire(this.getName(), _common_1.viewerActions.setMasterFilter, [[range.startValue, range.endValue]]);
                }
            });
        }
        return this._customTimePeriodDialog;
    }
    _initializeData(newOptions) {
        super._initializeData(newOptions);
        if (this._dataController) {
            this._dataController.elementCustomColor = (args) => this._elementCustomColor(args);
        }
    }
    _clearSelectionUnsafe() {
        this._setRange([]);
    }
    _clearSelectionBase() {
        this.timePeriodMenuSelectedIndex = undefined;
    }
    _setSelectionUnsafe(values) {
        this._setRange(values && values.length > 0 ? values[0] : []);
    }
    _getCurrentRange() {
        var value = this._getSelectedValues();
        let startValue, endValue;
        if (value && value !== null) {
            startValue = value[0];
            endValue = value[1];
        }
        if (!_utils_1.type.isDefined(startValue) || !_utils_1.type.isDefined(endValue)) {
            let entireRange = this._getEntireRange();
            if (!_utils_1.type.isDefined(startValue))
                startValue = entireRange.startValue;
            if (!_utils_1.type.isDefined(endValue))
                endValue = entireRange.endValue;
        }
        return new rangeFilterSelection({ startValue, endValue });
    }
    getEntireRange() {
        return new rangeFilterSelection(this._getEntireRange());
    }
    dispose() {
        super.dispose();
        var customPeriodForm = this._getCustomTimePeriodDialog();
        if (customPeriodForm) {
            customPeriodForm.dispose();
        }
        this.rangeSelectorViewer && this.rangeSelectorViewer.dispose();
    }
    _setRange(range) {
        this._setSelectedValues([range]);
        if (this.hasWidget) {
            this._lock();
            this.rangeSelectorViewer.setValue(range);
            this._unlock();
        }
        else {
            this.selected.fire(this.getName(), _common_1.viewerActions.setMasterFilter, [range]);
        }
    }
    _setPredefinedRange(dateTimePeriodName) {
        let dateTimePeriods = this.options.ViewModel.DateTimePeriods;
        let period = dateTimePeriods.filter(dateTimePeriod => dateTimePeriod.Name === dateTimePeriodName)[0];
        this.timePeriodMenuSelectedIndex = !!period ? dateTimePeriods.indexOf(period) : undefined;
        this.updateCaptionToolbar();
    }
    _getAvailablePredefinedRanges() {
        return this.options.ViewModel.DateTimePeriods.map(period => period.Name);
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        var that = this, options = this._getRangeSelectorViewerOptions();
        var isFirstInitialization = !changeExisting || !that.rangeSelectorViewer;
        this._lock();
        this._raiseItemWidgetOptionsPrepared(options);
        try {
            if (isFirstInitialization) {
                this.rangeSelectorViewer = new range_selector_1.default(element, options);
            }
            else {
                this.rangeSelectorViewer.option(options);
            }
        }
        finally {
            this._unlock();
        }
        this.timePeriodMenuSelectedIndex = this.options.ViewModel.SelectedPeriodIndex;
        return false;
    }
    _isBorderRequired() {
        return false;
    }
    _getContainerPositionUnsafe() {
        var position = super._getContainerPositionUnsafe(), buttonOffset = this._getButtonOffset(true);
        position.offsetY = position.height - buttonOffset.top;
        return position;
    }
    _getFirstDayOfWeek() {
        var rangeDataController = this.dataController;
        var argumentFormat = rangeDataController.getArgumentFormat();
        return argumentFormat ? argumentFormat.firstDayOfWeek : null;
    }
    _getRangeSelectorViewerOptions() {
        var that = this;
        let rangeDataController = that.dataController;
        var viewModel = that.options.ViewModel, argument = viewModel.Argument, scaleType = rangeSelectorItem._getScaleType(argument), seriesTemplates = viewModel.SeriesTemplates, selectedValues = this._getSelectedValues(), dataSourceAndSeries = rangeDataController.getDataSourceAndSeries(that._isEncodeHtml()), tickMarkInterval = undefined, animation = that._getAnimationOptions(), options = {
            scale: {
                axisDivisionFactor: null,
                type: null,
                marker: {
                    visible: false
                }
            },
            encodeHtml: that._isEncodeHtml(),
            margin: {
                top: 10,
                bottom: 15
            }
        };
        if (scaleType !== 'discrete') {
            let entireRange = this._getEntireRangeByDataSource(dataSourceAndSeries.dataSource);
            options.scale.startValue = entireRange.startValue;
            options.scale.endValue = entireRange.endValue;
        }
        else {
            options.scale.startValue = null;
            options.scale.endValue = null;
        }
        if (!this._isValidValues(selectedValues)) {
            options.value = [selectedValues[0], selectedValues[1]];
        }
        var argumentFormat = rangeDataController.getArgumentFormat();
        options.scale.label = {
            format: (value) => _format_helper_1.DashboardFormatHelper.format(value, argumentFormat)
        };
        options.scale.valueType = argument.Type == 'DateTime' ? 'datetime' : 'numeric';
        options.sliderMarker = {
            format: (value) => _format_helper_1.DashboardFormatHelper.format(value, argumentFormat)
        };
        let dataSource = dataSourceAndSeries.dataSource;
        options.scale.type = scaleType;
        if (argument) {
            if ((argument.DateTimeGroupInterval === 'Year' && argument.Type === 'DateTime') ||
                !argument.IsContinuousDateTimeScale) {
                tickMarkInterval = rangeDataController.isDiscreteArgument() || argument.Type == 'Integer' ? 1 : _chart_helper_1.chartHelper.convertPresentationUnit(argument);
                if (tickMarkInterval) {
                    var firstDayOfWeek = this._getFirstDayOfWeek();
                    if (tickMarkInterval === 'week') {
                        if (Number.isInteger(firstDayOfWeek)) {
                            options.scale.workWeek = [firstDayOfWeek];
                        }
                        else {
                            throw new Error('First Day Of Week is not defined for range filter agrument');
                        }
                    }
                    options.scale.minorTick = {
                        visible: false
                    };
                    options.behavior = {
                        snapToTicks: true,
                        animationEnabled: animation.enabled
                    };
                    options.scale.minRange = tickMarkInterval;
                    if (scaleType === 'semidiscrete') {
                        options.scale.axisDivisionFactor = {
                            day: DayIntervalWidthInPixels,
                            month: MonthIntervalWidthInPixels,
                            quarter: QuarterIntervalWidthInPixels
                        };
                    }
                }
            }
            else {
                options.behavior = {
                    snapToTicks: false,
                    animationEnabled: animation.enabled
                };
            }
        }
        options.dataSource = dataSource;
        let chartSeries = dataSourceAndSeries.series;
        if (scaleType === 'discrete') {
            chartSeries.forEach(series => {
                series.ignoreEmptyPoints = true;
            });
        }
        options.chart = {
            series: chartSeries,
            commonSeriesSettings: {
                type: seriesTemplates && seriesTemplates.length > 0 ? (_chart_helper_1.chartHelper.convertSeriesType(seriesTemplates[0].SeriesType)) : null
            },
            palette: _render_helper_1.RenderHelper.getDefaultPalette()
        };
        options.onValueChanged = that._getSelectedRangeChangedHandler();
        return options;
    }
    _getEntireRange() {
        let rangeDataController = this.dataController;
        let dataSourceAndSeries = rangeDataController.getDataSourceAndSeries(this._isEncodeHtml());
        return this._getEntireRangeByDataSource(dataSourceAndSeries.dataSource);
    }
    _getEntireRangeByDataSource(dataSource) {
        let range;
        let lastDataItemIndex = dataSource ? _utils_1.findLastIndex(dataSource, item => this._checkAxisXValue(item.x)) : -1;
        if (lastDataItemIndex > 0) {
            let firstDataItemIndex = _utils_1.findIndex(dataSource, item => this._checkAxisXValue(item.x));
            let isQualitativeArgument = this.dataController.isQualitativeArgument();
            range = {
                startValue: isQualitativeArgument ? firstDataItemIndex : dataSource[firstDataItemIndex].x,
                endValue: isQualitativeArgument ? lastDataItemIndex : dataSource[lastDataItemIndex].x
            };
        }
        else {
            range = {
                startValue: null,
                endValue: null
            };
        }
        return range;
    }
    _checkAxisXValue(value) {
        return _utils_1.type.isDefined(value) && Object.keys(special_values_1.specialValues).filter(specialValueName => special_values_1.specialValues[specialValueName] === value).length === 0;
    }
    _getSelectedValues() {
        let allSelectedValues = super._getSelectedValues();
        return allSelectedValues ? allSelectedValues[0] : null;
    }
    _isValidValues(values) {
        if (values && values.length) {
            var startValue = values[0], endValue = values[1];
            if (_range_filter_selection_validator_1.RangeFilterSelectionValidator.isValidValue(startValue) && _range_filter_selection_validator_1.RangeFilterSelectionValidator.isValidValue(endValue))
                return false;
        }
        return true;
    }
    _getSliderMarkerFormat() {
        return this._dataController.isSingleArgument() ? this._dataController.getSingleArgumentDimensionFormat() : undefined;
    }
    static _getScaleType(argument) {
        if (argument) {
            let dateTimeGroupInterval = argument.DateTimeGroupInterval;
            switch (argument.Type) {
                case 'String':
                    let groupIntervalScaleType = rangeSelectorItem._getStringScaleTypeByGroupInterval(dateTimeGroupInterval);
                    return _utils_1.type.isDefined(groupIntervalScaleType) ? groupIntervalScaleType : 'discrete';
                case 'Integer':
                    return 'semidiscrete';
                case 'DateTime':
                    return rangeSelectorItem._getDateTimeScaleType(dateTimeGroupInterval);
                default:
                    return null;
            }
        }
    }
    static _getStringScaleTypeByGroupInterval(dateTimeGroupInterval) {
        switch (dateTimeGroupInterval) {
            case 'Year':
            case 'Quarter':
            case 'Month':
            case 'Day':
            case 'Hour':
            case 'Minute':
            case 'Second':
            case 'DayOfYear':
            case 'DayOfWeek':
            case 'WeekOfYear':
            case 'WeekOfMonth':
                return 'semidiscrete';
        }
        return undefined;
    }
    static _getDateTimeScaleType(dateTimeGroupInterval) {
        switch (dateTimeGroupInterval) {
            case 'Year':
            case 'QuarterYear':
            case 'MonthYear':
            case 'WeekYear':
            case 'DayMonthYear':
                return 'semidiscrete';
        }
        return null;
    }
    _getSelectedRangeChangedHandler() {
        var that = this;
        return function (e) {
            if (!that._isLocked()) {
                that.selected.fire(that.getName(), _common_1.viewerActions.setMasterFilter, [e.value]);
            }
        };
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        if (_jquery_helpers_1.isVisible(this.container)) {
            this.rangeSelectorViewer.render();
        }
    }
    _getWidget() {
        return this.rangeSelectorViewer;
    }
    _elementCustomColor(eventArgs) {
        this.itemElementCustomColor.fire(this.getName(), eventArgs);
    }
    _hasTimePeriods() {
        return true;
    }
    _isDateTimePeriodSupported() {
        return this.options.ViewModel.SupportDateTimePeriods;
    }
    _getSpecificActionToolbarItems() {
        if (this.options.ViewModel.SupportDateTimePeriods) {
            if (this.options.ViewModel.DateTimePeriods.length > 0) {
                let dateTimePeriodNames = this.options.ViewModel.DateTimePeriods.map(period => (period.Name));
                dateTimePeriodNames.push(_localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.CustomPeriod));
                return [{
                        menu: {
                            name: caption_toolbar_options_1.dashboardToolbarItemNames.dateTimePeriodMenu,
                            items: dateTimePeriodNames,
                            selectedItems: this.timePeriodMenuSelectedIndex !== undefined ? [dateTimePeriodNames[this.timePeriodMenuSelectedIndex]] : [],
                            selectionMode: 'multiple',
                            itemClick: (itemData, itemElement, index) => {
                                var viewModel = this.options.ViewModel, dateTimePeriods = viewModel.DateTimePeriods;
                                if (index >= 0 && index < dateTimePeriods.length) {
                                    if (this.timePeriodMenuSelectedIndex !== index) {
                                        this._raisePredefinedPeriodSelected(index);
                                    }
                                }
                                else {
                                    this._showCustomTimePeriodDialog();
                                }
                            },
                            type: 'list'
                        },
                        icon: _caption_toolbar_css_classes_1.cssClasses.iconTimePeriods,
                        type: 'menu',
                        hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.AddTimePeriod),
                    }];
            }
            else {
                return [{
                        name: caption_toolbar_options_1.dashboardToolbarItemNames.customDateTimePeriod,
                        icon: _caption_toolbar_css_classes_1.cssClasses.iconTimePeriods,
                        type: 'button',
                        hint: _localizer_1.localizer.getString(_localization_ids_1.localizationId.buttonNames.AddTimePeriod),
                        click: (element) => {
                            this._showCustomTimePeriodDialog();
                        }
                    }];
            }
        }
        else
            return [];
    }
    _raisePredefinedPeriodSelected(index) {
        let name = this.options.ViewModel.DateTimePeriods[index].Name;
        this.predefinedRangeChanged && this.predefinedRangeChanged(name);
    }
    _showCustomTimePeriodDialog() {
        this._getCustomTimePeriodDialog().show({
            range: this._getCurrentRange(),
            groupInterval: this.options.ViewModel.Argument.DateTimeGroupInterval,
            isIntYearGroupInterval: this._isIntYearGroupInterval(),
            firstDayOfWeek: this._getFirstDayOfWeek(),
            displayFormat: this._getSliderMarkerFormat()
        });
    }
    _isIntYearGroupInterval() {
        var viewModel = this.options.ViewModel, argument = viewModel.Argument;
        return argument && argument.DateTimeGroupInterval === 'Year' && argument.Type !== 'DateTime';
    }
}
exports.rangeSelectorItem = rangeSelectorItem;
class rangeFilterSelection {
    constructor(range) {
        this.setMinimum(range.startValue);
        this.setMaximum(range.endValue);
    }
    getMaximum() {
        return this.maximum;
    }
    setMaximum(value) {
        this.maximum = value;
    }
    getMinimum() {
        return this.minimum;
    }
    setMinimum(value) {
        this.minimum = value;
    }
}
exports.rangeFilterSelection = rangeFilterSelection;
