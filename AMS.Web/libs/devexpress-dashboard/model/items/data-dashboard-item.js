﻿/**
* DevExpress Dashboard (data-dashboard-item.js)
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
exports.DataDashboardItem = void 0;
const analytics_criteria_1 = require("@devexpress/analytics-core/analytics-criteria");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
const ko = require("knockout");
const _item_data_axis_builder_1 = require("../../data/item-data/internal/_item-data-axis-builder");
const _item_data_axis_helper_1 = require("../../data/item-data/internal/_item-data-axis-helper");
const _item_data_manager_1 = require("../../data/item-data/internal/_item-data-manager");
const item_data_axis_names_1 = require("../../data/item-data/item-data-axis-names");
const _item_data_tuple_1 = require("../../data/item-data/_item-data-tuple");
const _default_1 = require("../../data/localization/_default");
const special_values_1 = require("../../data/special-values");
const _common_1 = require("../../data/_common");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const color_scheme_definition_1 = require("../colorization/color-scheme-definition");
const color_scheme_entry_1 = require("../colorization/color-scheme-entry");
const dashboard_state_1 = require("../dashboard-state");
const data_item_1 = require("../data-item/data-item");
const dimension_1 = require("../data-item/dimension");
const measure_1 = require("../data-item/measure");
const _dimension_1 = require("../data-item/metadata/_dimension");
const _measure_1 = require("../data-item/metadata/_measure");
const specific_calc_window_definition_1 = require("../data-item/window-definition/specific-calc-window-definition");
const _dimension_filter_values_1 = require("../data-item/_dimension-filter-values");
const _data_field_1 = require("../data-sources/_data-field");
const card_item_delta_format_rule_1 = require("../format-rules/card-item-delta-format-rule");
const card_item_format_rule_1 = require("../format-rules/card-item-format-rule");
const chart_item_format_rule_1 = require("../format-rules/chart-item-format-rule");
const grid_item_format_rule_1 = require("../format-rules/grid-item-format-rule");
const pivot_item_format_rule_1 = require("../format-rules/pivot-item-format-rule");
const scatter_chart_item_format_rule_1 = require("../format-rules/scatter-chart-item-format-rule");
const _array_utils_1 = require("../internal/_array-utils");
const _dashboard_component_name_generator_1 = require("../internal/_dashboard-component-name-generator");
const _date_utils_1 = require("../internal/_date-utils");
const _expanding_manager_1 = require("../internal/_expanding-manager");
const _helper_classes_1 = require("../internal/_helper-classes");
const _knockout_utils_1 = require("../internal/_knockout-utils");
const _obsolete_dashboard_state_1 = require("../internal/_obsolete-dashboard-state");
const _utils_2 = require("../internal/_utils");
const dashboard_item_1 = require("./dashboard-item");
const _data_dashboard_item_1 = require("./metadata/_data-dashboard-item");
const _limit_data_state_1 = require("./_limit-data-state");
class DataDashboardItem extends dashboard_item_1.DashboardItem {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer(), info = undefined) {
        super(dashboardItemJSON, serializer, info);
        this.hiddenDimensions = ko.observableArray([]);
        this.hiddenMeasures = ko.observableArray([]);
        this.colorScheme = ko.observableArray();
        this._masterFilterMode = ko.computed(() => { return this._getMasterFilterMode(); });
        this._isSingleMasterFilter = ko.computed(() => { return this._masterFilterMode() === 'Single'; });
        this._isMultipleMasterFilter = ko.computed(() => { return this._masterFilterMode() === 'Multiple'; });
        this._isDrillDownEnabled = ko.computed(() => { return this._getDrillDownEnabled(); });
        this._isIgnoreMasterFilter = ko.computed(() => { return this._getIgnoreMasterFilter(); });
        this._isMasterFilter = ko.computed(() => { return this._getIsMasterFilter(); });
        this._isVisualInteractivitySupported = ko.computed(() => { return this._getIsVisualInteractivitySupported(); });
        this._clearMasterFilterSupported = ko.computed(() => { return this._getClearMasterFilterSupported(); });
        this._fullRange = ko.observable();
        this._selectedElementIndex = ko.observable();
        this._beforeMasterFilterSetByUserInteraction = null;
        this._afterMasterFilterSetByUserInteraction = null;
        this._drillDownChangedByUserInteraction = null;
        this._masterFilterItems = ko.observable([]);
        this._dataManager = ko.observable();
        this._drillDownValues = ko.observableArray([]);
        this._clientState = ko.observable();
        this._dataRequestArgs = ko.observable();
        this._expandingManager = new _expanding_manager_1.ExpandingManager();
        this._selectionValues = ko.observable();
        this._supportedUIStates = ko.observable(['error', 'empty', 'loading']);
        this._limitDataState = new _limit_data_state_1.LimitDataState();
        this._isExcludingAllFilter = ko.computed(() => false);
        this._processItemSelectionChange = (itemElement, mode, selection) => {
            if (mode === _common_1.viewerActions.setMasterFilter || mode === _common_1.viewerActions.setMultipleValuesMasterFilter) {
                this._beforeMasterFilterSetByUserInteraction && this._beforeMasterFilterSetByUserInteraction();
                var itemState = _jquery_helpers_1.deepExtend({}, this._state());
                itemState = this._removeSelectionFromState(itemState);
                itemState = this._setSelectionToState(itemState, selection);
                this._setState(itemState);
                this._afterMasterFilterSetByUserInteraction && this._afterMasterFilterSetByUserInteraction();
            }
            else if (mode === _common_1.viewerActions.drillDown) {
                this._drillDownChangedByUserInteraction && this._drillDownChangedByUserInteraction();
                this._drillDownValues.push(selection[0]);
                this._setSelectionData(null);
            }
        };
        this._processItemDrillUp = () => {
            this._drillDownChangedByUserInteraction && this._drillDownChangedByUserInteraction();
            var drillValue = this._drillDownValues.pop();
            this._selectionValues(this._isMasterFilter() ? [[drillValue]] : null);
        };
        this._processItemClearMasterFilter = (itemElement) => {
            this._beforeMasterFilterSetByUserInteraction && this._beforeMasterFilterSetByUserInteraction();
            var itemState = _jquery_helpers_1.deepExtend({}, this._state());
            itemState = this._removeSelectionFromState(itemState);
            this._setState(itemState);
            this._afterMasterFilterSetByUserInteraction && this._afterMasterFilterSetByUserInteraction();
        };
        this._processItemSetPredefinedPeriod = (periodName) => {
            var itemState = _jquery_helpers_1.deepExtend({}, this._state());
            itemState = this._removeSelectionFromState(itemState);
            itemState = this._setPredefinedPeriodToState(itemState, periodName);
            this._setState(itemState);
        };
        this._processContentElementSelection = (itemName, args) => {
            this._selectedElementIndex(args.index);
        };
        this._processDataRequest = () => { };
        this._processItemClientStateUpdate = (itemName, clientState) => {
            this._setClientState(clientState);
        };
        this._processExpandingStateChanged = (expandingParams, dxPivotState) => {
            this._expandingManager.onViewStateChanged(expandingParams, dxPivotState);
        };
        this._processItemExpandingChange = (expandingParams) => {
            this._expandingManager.setExpandingParams(expandingParams);
            this._dataQueryParams.notifySubscribers();
        };
        this.dataItems = analytics_utils_1.deserializeArray(dashboardItemJSON.DataItems, dataItemJSON => DataDashboardItem._createDataItem(dataItemJSON['@ItemType'], dataItemJSON, serializer));
        this.formatRules = analytics_utils_1.deserializeArray(dashboardItemJSON.FormatRules, (rule) => DataDashboardItem._createFormatRule(this, rule, serializer));
        this.__hiddenDimensions = analytics_utils_1.deserializeArray(dashboardItemJSON.HiddenDimensions, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this.__hiddenMeasures = analytics_utils_1.deserializeArray(dashboardItemJSON.HiddenMeasures, (item) => new data_item_1.DataItemLink(this, item, serializer));
        this._subscribeDataItemLinkArrays(_data_dashboard_item_1.hiddenDimensions, _data_dashboard_item_1.hiddenMeasures);
        this.colorScheme(analytics_utils_1.deserializeArray(dashboardItemJSON.ColorScheme, (item) => new color_scheme_entry_1.ColorSchemeEntry(item, serializer, this.componentName(), this.name()))());
        this.__hiddenMeasures.subscribe((links) => {
            this._setLinkCollectionAcceptableShapingType(links, data_item_1.AcceptableShapingType.Hidden);
        });
        this._setLinkCollectionAcceptableShapingType(this.__hiddenMeasures(), data_item_1.AcceptableShapingType.Hidden);
        this._componentNameGenerator = new _dashboard_component_name_generator_1.DashboardUniqueNameGenerator('uniqueName', 0, this.dataItems);
        this._state = ko.computed(() => {
            var state = new dashboard_state_1.ItemState();
            if (this._drillDownValues().length) {
                state.DrillDownValues = _date_utils_1.toStringArray(this._drillDownValues());
            }
            if (this._selectionValues()) {
                state.MasterFilterValues = _date_utils_1.toStringArray(this._selectionValues());
            }
            if (this._selectedElementIndex()) {
                state.SelectedLayerIndex = this._selectedElementIndex();
            }
            return state;
        });
        this._actions = ko.computed({
            read: () => {
                var newValue = [];
                var interactivityDimensionCount = this._interactivityDimensions.length;
                var drillDownValuesCount = this._drillDownValues().length;
                if (this._isMasterFilter() && interactivityDimensionCount > 0) {
                    newValue.push(_common_1.viewerActions.setMasterFilter);
                }
                if (this._isMultipleMasterFilter() && interactivityDimensionCount > 0) {
                    newValue.push(_common_1.viewerActions.setMultipleValuesMasterFilter);
                }
                if (this._isDrillDownEnabled() && (drillDownValuesCount < (interactivityDimensionCount - 1))) {
                    newValue.push(_common_1.viewerActions.drillDown);
                }
                var isPreviousLevelSelection = false;
                if (drillDownValuesCount > 0) {
                    newValue.push(_common_1.viewerActions.drillUp);
                    if (this._selectionValues() && this._selectionValues()[0] && this._selectionValues()[0][0] === this._drillDownValues()[drillDownValuesCount - 1]) {
                        isPreviousLevelSelection = true;
                    }
                }
                if (this._hasSelection() && !isPreviousLevelSelection) {
                    newValue.push(_common_1.viewerActions.clearMasterFilter);
                }
                return newValue;
            },
            deferEvaluation: true
        });
        this._outputFilter = ko.computed(() => {
            if (!this._isMasterFilter())
                return undefined;
            var result = undefined, serializer = new analytics_utils_1.ModelSerializer(), selectionValues = this._selectionValues(), selectionValuesCount = selectionValues ? selectionValues.length : 0, drillDownValuesCount = this._drillDownValues.peek().length, dimensionality = selectionValuesCount > 0 ? selectionValues[0].length : 0, fullRange = this._fullRange();
            if (selectionValuesCount > 0 || drillDownValuesCount > 0) {
                result = {
                    dimensions: this._interactivityDimensions.slice(0, drillDownValuesCount + dimensionality).map(dimension => serializer.serialize(dimension))
                };
                if (result.dimensions.length === 1 && selectionValuesCount === 1 && dimensionality === 2) {
                    result.range = selectionValues[0];
                }
                else {
                    result.values = selectionValuesCount > 0 ? selectionValues.map(arr => this._drillDownValues.peek().concat(arr)) : [this._drillDownValues.peek()];
                }
            }
            if (!result) {
                if (fullRange && fullRange.length && this._interactivityDimensions.length) {
                    result = {
                        dimensions: this._interactivityDimensions.map(dim => serializer.serialize(dim)),
                        range: fullRange
                    };
                }
            }
            if (this._isExcludingAllFilter()) {
                result = result || {};
                result.isExcludingAllFilter = true;
            }
            result = this._performOutputFilterOptimization(result);
            return result;
        });
        this._dataQueryParams = ko.computed(() => {
            var result = {};
            if (this.dataItems().length > 0) {
                var externalFilter = this._masterFilterItems().filter(item => !!item._outputFilter()).map(item => item._outputFilter());
                if (externalFilter.length) {
                    result.Filter = externalFilter.map((f) => {
                        var v = {};
                        if (!!f.dimensions) {
                            v.dimensions = f.dimensions;
                        }
                        if (!!f.values) {
                            v.values = _date_utils_1.toStringArray(f.values);
                        }
                        if (!!f.range) {
                            v.range = _date_utils_1.toStringArray(f.range);
                        }
                        if (f.isExcludingAllFilter != undefined) {
                            v.isExcludingAllFilter = f.isExcludingAllFilter;
                        }
                        return v;
                    });
                }
                if (this._drillDownValues().length) {
                    result.DrillDown = _date_utils_1.toStringArray(this._drillDownValues());
                }
                if (this._dataRequestArgs()) {
                    result.ClientState = this._dataRequestArgs();
                }
                if (this._selectedElementIndex()) {
                    result.SelectedElementIndex = this._selectedElementIndex();
                }
            }
            return result;
        });
        this._colorableItems = ko.observable([this]);
        this._uiState && this._uiState['dispose'] && this._uiState['dispose']();
        this._uiState = ko.computed({
            read: () => {
                var result = 'live', errorState = this._errorState(), previousState = this._uiState(), paneValid = this._paneContentHolder.valid(), viewerItemCreated = this._viewerItemCreated(), hasDataItems = !!this.dataSource.peek() && !!this.dataItems.peek().length;
                if (this._stateSupported('error') && errorState) {
                    result = 'error';
                }
                else if (this._stateSupported('empty') && !hasDataItems) {
                    result = 'empty';
                }
                else if (this._stateSupported('loading') && !paneValid && (!viewerItemCreated || 'empty' === previousState || 'error' === previousState)) {
                    result = 'loading';
                }
                else {
                    result = 'live';
                }
                return result;
            },
            deferEvaluation: true
        });
        ko.computed(() => {
            if (this._selectedElementIndex() >= this._getLayersCount()) {
                this._selectedElementIndex(null);
            }
        });
        ko.computed(() => {
            this.dataItems()
                .map(d => d instanceof measure_1.Measure ? d.windowDefinition.windowDefinition() : null)
                .filter(def => def != null)
                .forEach(def => {
                if (def instanceof specific_calc_window_definition_1.SpecificWindowDefinition) {
                    def.dimensions().forEach(link => link._updateProvider(this));
                }
            });
        });
        ko.computed(() => {
            if (!this.dataSource() || this.dataItems().length === 0) {
                this._dataManager(null);
            }
        });
        _knockout_utils_1.subscribeToArrayItemProperties(this.dataItems, dataItem => {
            if (dataItem instanceof dimension_1.Dimension) {
                return dataItem.dateTimeGroupInterval.subscribe(() => {
                    this._removeFromFilters(dataItem);
                });
            }
            return null;
        });
    }
    static _createDataItem(itemTypeName, dataItemJSON, serializer) {
        var itemType = DataDashboardItem._itemTypesMap[itemTypeName];
        return new itemType(dataItemJSON, serializer);
    }
    static _updateDataItemByField(dataField, newDataItem, summaryInfo) {
        newDataItem.dataMember(dataField.dataMember());
        if (newDataItem instanceof measure_1.Measure) {
            if (!_data_field_1.DataField.isOlap(dataField.dataMember())) {
                if (!!summaryInfo && summaryInfo.oldDataItem instanceof measure_1.Measure) {
                    var avaliableSummaryTypes = DataDashboardItem._getAvaliableSummaryTypeInfo(dataField, summaryInfo.acceptableShapingType, newDataItem);
                    if (avaliableSummaryTypes) {
                        if (Object.keys(avaliableSummaryTypes.values).indexOf(summaryInfo.oldDataItem.summaryType()) !== -1) {
                            newDataItem.summaryType(summaryInfo.oldDataItem.summaryType());
                        }
                        else {
                            newDataItem.summaryType(avaliableSummaryTypes.defaultVal);
                        }
                    }
                }
                else {
                    newDataItem.summaryType(getSummaryType(dataField));
                }
            }
            else if (!!dataField['defaultNumericFormat']) {
                var defaultNumericFormat = dataField['defaultNumericFormat'];
                newDataItem.numericFormat.currencyCultureName(defaultNumericFormat.CurrencyCultureName);
                newDataItem.numericFormat.formatType(defaultNumericFormat.FormatType);
                newDataItem.numericFormat.includeGroupSeparator(defaultNumericFormat.IncludeGroupSeparator);
                newDataItem.numericFormat.precision(defaultNumericFormat.Precision);
                newDataItem.numericFormat.unit(defaultNumericFormat.Unit);
            }
        }
    }
    static _createFormatRule(item, formatRuleJSON, serializer) {
        var typeName = formatRuleJSON['@ItemType'];
        var type = DataDashboardItem._formatRuleTypesMap[typeName];
        return new type(formatRuleJSON, serializer);
    }
    static _getAvaliableSummaryTypeInfo(dataField, acceptableShapingType, dataItem) {
        if (!!dataItem && dataItem instanceof measure_1.Measure && !!dataItem.expression())
            return null;
        if (!_data_field_1.DataField.isOlap(dataField.dataMember()) && !(dataField.isAggregate && dataField.isAggregate())) {
            if (_data_field_1.DataField.isNumeric(dataField)) {
                return _measure_1.summaryTypeNumericToAny;
            }
            else {
                switch (acceptableShapingType) {
                    case data_item_1.AcceptableShapingType.Number:
                        return _measure_1.summaryTypeNonNumericToNumeric;
                    case data_item_1.AcceptableShapingType.Attribute:
                        return _measure_1.summaryTypeAttribute;
                    case data_item_1.AcceptableShapingType.String:
                    case data_item_1.AcceptableShapingType.Hidden:
                        return _measure_1.summaryTypeNonNumericToString;
                }
            }
        }
        return null;
    }
    get _actualSelectionValues() {
        return this._selectionValues;
    }
    get _canColorByMeasures() { return this._getCanColorByMeasures(); }
    get _canColorByDimensions() { return this._getCanColorByDimensions(); }
    get _isLocallyColored() {
        return (this._getAreMeasuresColoredByDefault() || this._getCanColorByDimensions()) && !this._getUseGlobalColors();
    }
    get _isGloballyColored() {
        return (this._getAreMeasuresColoredByDefault() || this._getCanColorByDimensions()) && this._getUseGlobalColors();
    }
    get _interactivityDimensions() {
        return this._getInteractivityDimensionLinks().map(link => link.dataItem()).filter(item => !!item);
    }
    get _dimensions() {
        return this.dataItems && this.dataItems().filter(item => item instanceof dimension_1.Dimension);
    }
    get _measures() {
        return this.dataItems && this.dataItems().filter(item => item instanceof measure_1.Measure);
    }
    get _uniqueDataItems() {
        var uniqueDataItems = [];
        this.dataItems.peek().forEach(dataItem => {
            if (uniqueDataItems.filter(item => item.isDefinitionEquals(dataItem)).length === 0) {
                uniqueDataItems.push(dataItem);
            }
        });
        return uniqueDataItems;
    }
    get _multiData() {
        var dataManager = this._dataManager.peek();
        return dataManager && dataManager.getItemData();
    }
    _removeFromFilters(dataItem) {
        this.filterString(removeDataItemFromCriteria(this.filterString(), dataItem.uniqueName()));
        this.visibleDataFilterString((removeDataItemFromCriteria(this.visibleDataFilterString(), dataItem.uniqueName())));
        this._measures.forEach(measure => {
            measure.filterString(removeDataItemFromCriteria(measure.filterString(), dataItem.uniqueName()));
        });
    }
    _clearBindings() {
        this.dataSource(null);
        this.dataMember(null);
        this.dataItems.removeAll();
        this.__hiddenDimensions.removeAll();
        this.__hiddenMeasures.removeAll();
        this.colorScheme.removeAll();
    }
    _clearInteractivityState() {
        this._selectionValues(null);
        this._drillDownValues([]);
    }
    _isCalculationSupported() {
        return true;
    }
    _isSortingEnabled() {
        return true;
    }
    _isTopNEnabled(dataItem) {
        return this.hiddenDimensions().indexOf(dataItem) == -1;
    }
    _isColoringEnabled(dataItem) {
        if (dataItem instanceof dimension_1.Dimension) {
            if (this._canColorByDimensions) {
                if (this._isHiddenDimension(dataItem) || dataItem.coloringMode() === 'None') {
                    return false;
                }
                if (dataItem.coloringMode() === 'Hue') {
                    return true;
                }
                return this._getIsDimensionColoredByDefault(dataItem);
            }
        }
        else if (dataItem instanceof measure_1.Measure) {
            if (this._canColorByMeasures) {
                if (this._isHiddenMeasure(dataItem)) {
                    return false;
                }
                return this._coloredByMeasures();
            }
            return false;
        }
    }
    _getDataItem(uniqueName) {
        return this.dataItems().filter(item => item.uniqueName() === uniqueName)[0];
    }
    _getFinalDataType(dataItemId) {
        var metaData = this._dataManager() ? this._dataManager().getMetaData() : undefined;
        return !!metaData ? metaData.getFinalDataType(dataItemId) : 'Unknown';
    }
    _createDataItem(dataField, binding) {
        var itemTypeName = binding.dataItemType;
        if (!itemTypeName) {
            itemTypeName = _data_field_1.DataField.isMeasure(dataField) ? 'Measure' : 'Dimension';
        }
        var newDataItem = DataDashboardItem._createDataItem(itemTypeName);
        DataDashboardItem._updateDataItemByField(dataField, newDataItem);
        this.dataItems.push(newDataItem);
        return newDataItem;
    }
    _updateDataItem(dataItem, binding, dataField, acceptableShapingType) {
        _helper_classes_1.Guard.isNotFalsy(dataItem, 'dataItem');
        var itemTypeName = binding.dataItemType || dataItem.itemType();
        var newDataItem = (binding.dataItemType === dataItem.itemType()) ? dataItem : DataDashboardItem._createDataItem(itemTypeName);
        var oldDataMember = dataItem.dataMember();
        DataDashboardItem._updateDataItemByField(dataField, newDataItem, { oldDataItem: dataItem, acceptableShapingType: acceptableShapingType });
        var removeFromFilters = (newDataItem !== dataItem) || (oldDataMember !== newDataItem.dataMember());
        if (this.hiddenDimensions().some(dimension => dataItem.uniqueName() === dimension.uniqueName()) || this.hiddenMeasures().some(dimension => dataItem.uniqueName() === dimension.uniqueName()))
            removeFromFilters = false;
        this._unassignDataItem(dataItem, removeFromFilters, false);
        if (newDataItem !== dataItem) {
            this._removeFromFilters(dataItem);
            this._removeDataItemCore(dataItem);
            newDataItem.uniqueName(dataItem.uniqueName());
            this.dataItems.push(newDataItem);
        }
    }
    _removeDataItem(dataItem, skipGroups) {
        this._removeDataItemCore(dataItem);
        this._unassignDataItem(dataItem, true, skipGroups);
    }
    _attachDataItem(target, propertyName, link) {
        var dataItemLink = !!link ? link : new data_item_1.DataItemLink(this, { '@DefaultId': target[propertyName].uniqueName() });
        target[propertyName] = dataItemLink;
        target[propertyName.substring(2)] = ko.computed({
            read: () => dataItemLink.dataItem(),
            write: (value) => {
                if (!!value) {
                    if (this._getDataItem(value.uniqueName())) {
                        throw Error(`DataItemLink: DataItem ${value.uniqueName()} already exists`);
                    }
                    else {
                        this.dataItems.push(value);
                        dataItemLink.dataItem(value);
                    }
                }
                else {
                    if (dataItemLink.dataItem()) {
                        this._removeDataItem(dataItemLink.dataItem());
                        dataItemLink.dataItem(null);
                    }
                }
            }
        });
    }
    _subscribeDataItemLinkArrays(...propertyInfos) {
        propertyInfos.forEach(propertyInfo => {
            var property = this[propertyInfo.propertyName];
            var realProperty = this[propertyInfo.propertyName.substring(2)];
            ko.computed(() => {
                property().filter(value => !value.dataItem())
                    .forEach(value => property.remove(value));
            });
            ko.computed(() => {
                var linkedDataItems = property().map(link => link.dataItem()).filter(dataItem => !!dataItem);
                realProperty.peek().filter(dataItem => linkedDataItems.indexOf(dataItem) === -1)
                    .forEach(itemToRemove => realProperty.remove(itemToRemove));
                linkedDataItems.filter(dataItem => realProperty.peek().indexOf(dataItem) === -1)
                    .forEach(itemToAdd => realProperty.splice(linkedDataItems.indexOf(itemToAdd), 0, itemToAdd));
            });
            _knockout_utils_1.subscribeArrayChange(realProperty, {
                added: (dimension, index) => {
                    if (!property().some(link => link.dataItem() === dimension)) {
                        this.dataItems.push(dimension);
                        var link = new data_item_1.DataItemLink(this);
                        link.dataItem(dimension);
                        property.splice(index, 0, link);
                    }
                },
                deleted: (dimension) => {
                    if (property().some(link => link.dataItem() === dimension)) {
                        this.dataItems.remove(dimension);
                        property.remove(link => link.dataItem() === dimension);
                    }
                }
            });
        });
    }
    _getMasterFilterMode() { return 'None'; }
    _getDrillDownEnabled() { return false; }
    _getIgnoreMasterFilter() { return false; }
    _getClearMasterFilterSupported() { return this._isMultipleMasterFilter(); }
    _getIsMasterFilter() { return this._isSingleMasterFilter() || this._isMultipleMasterFilter(); }
    _getInteractivityDimensionLinks() { return []; }
    _getIsVisualInteractivitySupported() { return true; }
    _getCanColorByMeasures() { return false; }
    _getCanColorByDimensions() { return false; }
    _getAreMeasuresColoredByDefault() { return false; }
    _getIsDimensionColoredByDefault(dimension) { return false; }
    _coloredDimensions() {
        return this._dimensions.filter(item => this._isColoringEnabled(item));
    }
    _coloredByMeasures() {
        if (this.coloringOptions.measuresColoringMode() === 'Hue') {
            return true;
        }
        if (this.coloringOptions.measuresColoringMode() === 'None') {
            return false;
        }
        return this._getAreMeasuresColoredByDefault();
    }
    _getUseGlobalColors() { return this.coloringOptions && this.coloringOptions.useGlobalColors(); }
    _getValidatedSelection(selectionValues) {
        return selectionValues ? selectionValues.map(value => { return value.map(_date_utils_1.tryConvertToDateTime); }) : selectionValues;
    }
    _getClearMasterFilterState() {
        if (this._clearMasterFilterSupported()) {
            if (this._useNeutralFilterMode() && this._isSingleMasterFilter() && !this._allowAllValue()) {
                return 'Disabled';
            }
            return this._actions().indexOf(_common_1.viewerActions.clearMasterFilter) !== -1 ? 'Enabled' : 'Hidden';
        }
        return 'Hidden';
    }
    _allowAllValue() { return false; }
    _validateSelectionByData(selection) {
        var activeDimensions = this._interactivityDimensions.slice(this._drillDownValues().length).map(d => d.uniqueName());
        if (this._isSingleMasterFilter() && activeDimensions.length > 0) {
            var allSelection = this._getAllSelectionValues(activeDimensions);
            if (!selection || (!this._useNeutralFilterMode() && !_utils_1.arrayContains(allSelection, selection[0]))) {
                this._setSelectionData(allSelection.length > 0 ? [allSelection[0]] : null);
            }
        }
    }
    _updateContentData(content) {
        super._updateContentData(content);
        if (this.dataItems().length > 0 || !this._stateSupported('empty')) {
            this._updateDataManager(content);
        }
        if (content.ItemData && content.ItemData.Reduced) {
            this._limitDataState.setReduced();
        }
        this._validateSelectionByData(this._actualSelectionValues());
        let drillDownValues = this._getDisplayDrillDownValues();
        _jquery_helpers_1.deepExtend(content, {
            multiData: this._multiData,
            DrillDownValues: !!drillDownValues ? drillDownValues.map(fv => fv.Values).reduce((v1, v2) => v1.concat(v2)) : undefined,
            DrillDownUniqueValues: this._drillDownValues.peek().length > 0 ? this._drillDownValues.peek() : undefined,
            LimitDataState: this._limitDataState.getViewModel()
        });
    }
    _extendContentState(content) {
        super._extendContentState(content);
        content.SelectedValues = this._actualSelectionValues.peek();
    }
    _updateDataManager(content) {
        let itemDataDTO = content.ItemData, contentType = content.ContentType;
        if (itemDataDTO) {
            _date_utils_1.patchDateTime(itemDataDTO.DataStorageDTO);
        }
        if (contentType === _common_1.contentType.partialDataSource && this._dataManager() && itemDataDTO) {
            this._updateDataManagerByPartialDataSource(content, itemDataDTO);
        }
        else {
            if ((contentType === _common_1.contentType.fullContent || contentType === _common_1.contentType.completeDataSource) && itemDataDTO && itemDataDTO.MetaData) {
                var dataManager = new _item_data_manager_1.itemDataManager();
                dataManager.initialize(itemDataDTO);
                this._dataManager(dataManager);
            }
            if (contentType !== _common_1.contentType.completeDataSource) {
            }
        }
        this._expandingManager.resetExpandingParams();
    }
    _updateDataManagerByPartialDataSource(content, itemDataDTO) {
        content.Parameters[0] = !!content.Parameters[0] && content.Parameters[0].map(value => _date_utils_1.tryConvertToDateTime(value));
        this._dataManager().updateExpandedData(itemDataDTO, {
            values: content.Parameters[0],
            pivotArea: content.Parameters[1] ? _item_data_axis_builder_1.pivotAreaNames.columns : _item_data_axis_builder_1.pivotAreaNames.rows
        });
    }
    _getAllSelectionValues(activeDimensions) {
        return !!this._multiData ? this._multiData.getAllSelectionValues(activeDimensions) : [];
    }
    _getPointsByDimension(dimensionId, axisName) {
        if (this._multiData) {
            var axis = this._multiData.getAxis(axisName);
            return axis ? axis.getPointsByDimension(dimensionId) : [];
        }
    }
    _getColorizableDataItemsInfo() {
        return [];
    }
    _getDefaultCalculationWindowDefinition() {
        return undefined;
    }
    _getExportingSelection() {
        return this._selectionValues();
    }
    _getDisplayFilterValues(limitCount) {
        let selection = this._outputFilter(), outFilterValues = [];
        if (selection && selection.dimensions) {
            selection.dimensions.forEach((dimensionDefinition, dimensionIndex) => {
                var dimension = this._dimensions.filter(d => d.uniqueName() === dimensionDefinition['@DefaultId'])[0];
                var filterValues = new _dimension_filter_values_1.DimensionFilterValues(this._getDimensionDisplayName(dimension.uniqueName()));
                var uniqueValues = {};
                for (var valueIndex = 0, valueCount = 0; valueIndex < selection.values.length; valueIndex++) {
                    if (!!limitCount && valueCount >= limitCount) {
                        filterValues.Truncated = true;
                        break;
                    }
                    var value = selection.values[valueIndex][dimensionIndex];
                    if (!uniqueValues[value]) {
                        uniqueValues[value] = value;
                        valueCount++;
                    }
                }
                filterValues.Values = Object.keys(uniqueValues).map(v => this._createFormattableValue(dimension, uniqueValues[v]));
                outFilterValues.push(filterValues);
            });
        }
        return outFilterValues;
    }
    _createFormattableValue(dimension, value) {
        var isOlap = _data_field_1.DataField.isOlap(dimension.dataMember());
        var dimensionId = dimension.uniqueName();
        if (isOlap) {
            return {
                Type: 'Value',
                Value: this._getOlapDimensionDisplayText(value, dimensionId),
                Format: undefined
            };
        }
        else {
            var metaData = this._dataManager() ? this._dataManager().getMetaData() : undefined;
            return {
                Type: 'Value',
                Value: value,
                Format: metaData ? metaData.getDimensionFormat(dimensionId) : undefined
            };
        }
    }
    _getDisplayFilterValuesExternal() {
        var externalFilter = this._masterFilterItems().filter(item => !!item._outputFilter());
        return externalFilter
            .map(item => item._getDisplayFilterValues())
            .filter(arr => arr.length > 0)
            .reduce((acc, items) => acc.concat(items), []);
    }
    _getDisplayDrillDownValues() {
        var drillDownUniqueValues = this._drillDownValues.peek();
        if (!drillDownUniqueValues || drillDownUniqueValues.length == 0)
            return undefined;
        var values = new Array(), metaData = this._dataManager() ? this._dataManager().getMetaData() : undefined;
        drillDownUniqueValues.forEach((value, valueIndex) => {
            var dimension = this._interactivityDimensions[valueIndex];
            var filterValues = new _dimension_filter_values_1.DimensionFilterValues(this._getDimensionDisplayName(dimension.uniqueName()));
            var isOlap = _data_field_1.DataField.isOlap(dimension.dataMember());
            filterValues.Values.push(this._createFormattableValue(dimension, value));
            values.push(filterValues);
        });
        return values;
    }
    _getColoringSignature() {
        return this._getColoringSignatureBase(this._coloredDimensions());
    }
    _getColoringSignatureOnCurrentDrillDownLevel() {
        if (this._isDrillDownEnabled()) {
            var coloredDimensions = [];
            var currentDrillDownDimension = this._interactivityDimensions[this._drillDownValues().length];
            var currentColored = null;
            for (var i = 0; i < this._dimensions.length; i++) {
                var dimension = this._dimensions[i];
                if (this._isColoringEnabled(dimension))
                    currentColored = dimension;
                if (dimension === currentDrillDownDimension && currentColored !== null) {
                    coloredDimensions = [currentColored];
                    break;
                }
            }
            return this._getColoringSignatureBase(coloredDimensions);
        }
        else {
            return this._getColoringSignature();
        }
    }
    _getColoringSignatureBase(coloredDimension) {
        return new color_scheme_definition_1.ColorSchemeDefinition(this.dataSource(), this.dataMember(), coloredDimension.map(dimension => {
            return {
                dataMember: ko.observable(dimension.dataMember()),
                dateTimeGroupInterval: ko.observable(dimension.dateTimeGroupInterval())
            };
        }), this._coloredByMeasures(), this._isGloballyColored ? '' : this.componentName(), this._isGloballyColored ? '' : this.name());
    }
    _isAttribute(dataItem) {
        return false;
    }
    _getItemDataAxis() {
        return item_data_axis_names_1.itemDataAxisNames.defaultAxis;
    }
    _getDataItemContainerDisplayName(dataItemContainer, dataItemDisplayNameGetter = null) {
        var name = dataItemContainer.name && dataItemContainer.name() || null;
        if (name) {
            return name;
        }
        var bindingModel = dataItemContainer._getBindingModel(), separator = ' ' + (dataItemContainer._displayNameSeparator || '-') + ' ';
        name = '';
        bindingModel.forEach((binding) => {
            var dataItemLink = dataItemContainer[binding.propertyName];
            var dataItem = dataItemLink.dataItem && dataItemLink.dataItem();
            if (dataItem && dataItem.dataMember()) {
                if (name) {
                    name = name + separator;
                }
                name = name + (!!dataItemDisplayNameGetter ? dataItemDisplayNameGetter(dataItem) : this._getDataItemDisplayName(dataItem));
            }
        });
        return name;
    }
    _getDataItemDisplayName(dataItem) {
        var uniqueName = dataItem.uniqueName();
        return dataItem instanceof dimension_1.Dimension ? this._getDimensionDisplayName(uniqueName) : this._getMeasureDisplayName(uniqueName);
    }
    _getMeasureDisplayName(uniqueName) {
        var metaData = this._dataManager() ? this._dataManager().getMetaData() : undefined;
        var measure = metaData.getMeasures().filter(m => m.id == uniqueName)[0];
        return !!measure ? measure.name : uniqueName;
    }
    _getDimensionDisplayName(uniqueName) {
        var dimension = undefined;
        var metaData = this._dataManager() ? this._dataManager().getMetaData() : undefined;
        var axes = !!metaData && metaData.getAxisNames() || [];
        axes.every(axisName => {
            var dimensions = metaData.getDimensions(axisName) || [];
            dimension = dimensions.filter(d => d.id == uniqueName)[0];
            return !dimension;
        });
        return !!dimension ? dimension.name : uniqueName;
    }
    _getOlapDimensionDisplayText(uniqueValue, dimensionId) {
        var itemData = this._dataManager() ? this._dataManager().getItemData() : undefined;
        var axes = !!itemData ? itemData.getAxisNames() : [];
        var pt = undefined;
        axes.every(axisName => {
            var axis = itemData.getAxis(axisName);
            pt = axis.getPointByUniqueValueAndDimension(uniqueValue, dimensionId);
            return !pt;
        });
        if (!!pt) {
            return pt.getUniqueValue() === special_values_1.specialValues.olapNullValueGuid ? _default_1.getLocalizationById('DashboardStringId.OlapRaggedHierarchyNoneItemCaption') : pt.getDisplayText();
        }
        else {
            return uniqueValue;
        }
    }
    _cleanDataItemDependencies() {
    }
    _setLinkCollectionAcceptableShapingType(links, type) {
        links.forEach(l => { l._specifics.acceptableShapingType = type; });
    }
    _updateDataQueryParams(params) {
        super._updateDataQueryParams(params);
        if (this._expandingManager.canProvideExpandingState()) {
            params.ExpandingState = this._expandingManager.calculateExpandingState();
        }
    }
    _stateSupported(state) {
        return this._supportedUIStates().indexOf(state) !== -1;
    }
    _isHiddenDimension(dimension) {
        return !!this.__hiddenDimensions().filter(link => link.dataItem() === dimension)[0];
    }
    _isHiddenMeasure(measure) {
        return !!this.__hiddenMeasures().filter(link => link.dataItem() === measure)[0];
    }
    _setSelection(stateSelection) {
        let validatedSelection = this._getValidatedSelection(stateSelection);
        if (this._isSingleMasterFilter()) {
            if ((!validatedSelection || validatedSelection.length === 0) && !this._clearMasterFilterSupported())
                return;
            if (validatedSelection && validatedSelection.length > 1)
                validatedSelection = [validatedSelection[0]];
        }
        this._setSelectionData(validatedSelection);
    }
    _hasSelection() {
        return !!this._selectionValues() && !!this._selectionValues()[0];
    }
    _performOutputFilterOptimization(filter) {
        return filter;
    }
    _setState(parameter) {
        super._setState(parameter);
        var itemState = parameter;
        var obsoleteItemState = parameter;
        let drillDownState = itemState.DrillDownValues || _obsolete_dashboard_state_1.ObsoleteItemState.unwrapDilldownValues(obsoleteItemState.DrillLevels) || [];
        drillDownState = drillDownState.map(value => _date_utils_1.tryConvertToDateTime(value));
        if (!_array_utils_1.arrayEquals(this._drillDownValues(), drillDownState))
            this._drillDownValues(drillDownState);
        let selectionState = itemState.MasterFilterValues || obsoleteItemState.Selection;
        this._setSelection(selectionState);
        let selectedElementIndexState = itemState.SelectedLayerIndex || obsoleteItemState.SelectedElementIndex;
        if (this._selectedElementIndex() !== selectedElementIndexState)
            this._selectedElementIndex(selectedElementIndexState);
    }
    _setClientState(clientState) {
        this._clientState(clientState);
    }
    _setSelectionData(selection, forceSetSelection = false) {
        if (!_array_utils_1.arrayEquals(this._selectionValues(), selection) || forceSetSelection) {
            this._selectionValues(selection);
        }
    }
    _itemInteractivityByColumnAxis() {
        return true;
    }
    _getInteractivityAxisDimensionCount() {
        return this._dimensions.length - this.hiddenDimensions().length;
    }
    _removeSelectionFromState(state) {
        var itemState = _jquery_helpers_1.deepExtend({}, state);
        itemState.MasterFilterValues = undefined;
        return itemState;
    }
    _setSelectionToState(state, selection) {
        var itemState = _jquery_helpers_1.deepExtend({}, state);
        itemState.MasterFilterValues = selection;
        return itemState;
    }
    _setPredefinedPeriodToState(itemState, periodName) {
        return itemState;
    }
    _unassignDataItem(dataItem, removeFromFilters, skipGroups) {
        this._clearInteractivityState();
        if (removeFromFilters)
            this._removeFromFilters(dataItem);
        if (!skipGroups && dataItem instanceof dimension_1.Dimension && _data_field_1.IsOlapHierarchyField(dataItem)) {
            for (var i = this.dataItems().length - 1; i >= 0; i--) {
                var item = this.dataItems()[i];
                if (item instanceof dimension_1.Dimension && item.groupIndex() == dataItem.groupIndex() && item != dataItem) {
                    this.dataItems.remove(item);
                }
            }
            this._cleanDataItemDependencies();
        }
    }
    _removeDataItemCore(dataItem) {
        if (dataItem instanceof measure_1.Measure) {
            this._dimensions.forEach(dimensionDataItem => {
                var dimension = dimensionDataItem;
                if (dimension.sortMeasure() === dataItem.uniqueName()) {
                    dimension.sortMeasure(undefined);
                }
                if (dimension.topNOptionsMeasureName() === dataItem.uniqueName()) {
                    dimension.topNOptionsMeasureName(undefined);
                }
            });
        }
        this.dataItems.remove(dataItem);
    }
    _getActiveDimensions() {
        var drillDownValuesCount = this._drillDownValues().length;
        if (this._getDrillDownEnabled()) {
            return [this._interactivityDimensions[drillDownValuesCount]];
        }
        else {
            return this._interactivityDimensions;
        }
    }
    _getDimensionIdsByItemName() {
        return this._getActiveDimensions().map(dim => dim.uniqueName());
    }
    _getValues(tuples) {
        return _item_data_axis_helper_1.itemDataAxisHelper.getValuesByTuples(tuples, this._getDimensionIdsByItemName());
    }
    _getAvailableTuples() {
        var that = this, data = that._getItemData(), dimensionIds = that._getDimensionIdsByItemName(), axisName = that._getCurrentAxisNameByItemName();
        return data && data.getAvailableTuples(dimensionIds, axisName);
    }
    _getCurrentAxisNameByItemName() {
        return this._getItemDataAxis();
    }
    _getSelectedValuesByItemName() {
        return this._selectionValues();
    }
    _performSetMasterFilter(values) {
        if (values) {
            if (!Array.isArray(values) || (!(values[0] instanceof _item_data_tuple_1.itemDataTuple) && !Array.isArray(values[0]))) {
                throw new Error('The type of the values parameter is not supported.');
            }
            let arrayValues = values[0] instanceof _item_data_tuple_1.itemDataTuple ? this._getValues(values) : values;
            if (this._isSingleMasterFilter() && arrayValues.length !== 1) {
                throw new Error('Only one filter value is allowed when the Master Filter mode is set to Single.');
            }
            this._processItemSelectionChange('', _common_1.viewerActions.setMasterFilter, arrayValues.map(selectionRow => selectionRow.map(_utils_1.unwrapSpecialNullValue)));
        }
        else {
            throw Error();
        }
    }
    _performClearMasterFilter() {
        this._processItemClearMasterFilter();
    }
    _performDrillDown(values) {
        var realValues = values instanceof _item_data_tuple_1.itemDataTuple ? this._getValues([values]) : [[_utils_1.unwrapSpecialNullValue(values)]];
        this._processItemSelectionChange('', _common_1.viewerActions.drillDown, realValues[0]);
    }
    _performDrillUp() {
        this._processItemDrillUp();
    }
    _getAvailableDrillDownValues(itemName) {
        return (this._getAvailableActions().indexOf(_common_1.viewerActions.drillDown) !== -1) ? this._getAvailableTuples() : null;
    }
    _getCurrentDrillDownValues() {
        var data = this._getItemData(), dimensionIds = this._getDimensionIdsByItemName(), axisName = this._getCurrentAxisNameByItemName();
        return data && data.getCurrentDrillDownValues(dimensionIds, axisName);
    }
    _getAvailableFilterValues(itemName) {
        return (this._getAvailableActions().indexOf(_common_1.viewerActions.setMasterFilter) !== -1 ||
            this._getAvailableActions().indexOf(_common_1.viewerActions.setMultipleValuesMasterFilter) !== -1) ? this._getAvailableTuples() : null;
    }
    _getAvailableActions() {
        return this._actions();
    }
    _getItemData() {
        var dataManager = this._dataManager();
        return dataManager && dataManager.getItemData();
    }
    _getCurrentFilterValues() {
        var that = this, data = that._getItemData(), dimensionIds = that._getDimensionIdsByItemName(), axisName = that._getCurrentAxisNameByItemName(), selectedValues = that._getSelectedValuesByItemName();
        return data && data.getCurrentFilterValues(dimensionIds, axisName, selectedValues);
    }
    _conditionFormattingExpressionEditorFilter(dataItem) {
        return !this.hiddenDimensions().filter(hd => hd.uniqueName() === dataItem.uniqueName())[0];
    }
}
DataDashboardItem._itemTypesMap = {
    Measure: measure_1.Measure,
    Dimension: dimension_1.Dimension
};
DataDashboardItem._formatRuleTypesMap = {
    GridItemFormatRule: grid_item_format_rule_1.GridItemFormatRule,
    PivotItemFormatRule: pivot_item_format_rule_1.PivotItemFormatRule,
    CardItemFormatRule: card_item_format_rule_1.CardItemFormatRule,
    CardItemDeltaFormatRule: card_item_delta_format_rule_1.CardItemDeltaFormatRule,
    ChartItemFormatRule: chart_item_format_rule_1.ChartItemFormatRule,
    ScatterChartItemFormatRule: scatter_chart_item_format_rule_1.ScatterChartItemFormatRule
};
DataDashboardItem._addColoringMeta = (links) => {
    links.forEach((link) => {
        if (!link._specifics.customDataShapingProperties.some(prop => prop.serializationInfo.propertyName === _dimension_1.coloringMode.propertyName)) {
            link._specifics.customDataShapingProperties = link._specifics.customDataShapingProperties.concat([{
                    serializationInfo: _dimension_1.coloringMode
                }]);
        }
    });
};
__decorate([
    _utils_2.collectionItemType('Dimension')
], DataDashboardItem.prototype, "__hiddenDimensions", void 0);
__decorate([
    _utils_2.collectionItemType('Measure')
], DataDashboardItem.prototype, "__hiddenMeasures", void 0);
__decorate([
    _utils_2.collectionItemType('Entry')
], DataDashboardItem.prototype, "colorScheme", void 0);
exports.DataDashboardItem = DataDashboardItem;
function getSummaryType(dataField) {
    if (dataField) {
        switch (dataField.fieldType()) {
            case 'Bool':
            case 'Text':
            case 'DateTime':
                return 'Count';
            case 'Custom':
                if (!dataField.isConvertible()) {
                    return 'Count';
                }
        }
    }
    return _measure_1.summaryTypeNumericToAny.defaultVal;
}
function removePropertyFromCriteriaOperator(sourceCriteriaOperator, propertyName) {
    if (sourceCriteriaOperator instanceof analytics_criteria_1.GroupOperator) {
        sourceCriteriaOperator.operands = sourceCriteriaOperator.operands.map(operand => removePropertyFromCriteriaOperator(operand, propertyName));
        return sourceCriteriaOperator;
    }
    else if (sourceCriteriaOperator instanceof analytics_criteria_1.UnaryOperator) {
        sourceCriteriaOperator.operand = removePropertyFromCriteriaOperator(sourceCriteriaOperator.operand, propertyName);
        return sourceCriteriaOperator;
    }
    else if (!sourceCriteriaOperator.children().some(operand => operand instanceof analytics_criteria_1.OperandProperty && operand.propertyName === propertyName)) {
        return sourceCriteriaOperator;
    }
    return new analytics_criteria_1.GroupOperator(analytics_criteria_1.GroupOperatorType.And, []);
}
function removeDataItemFromCriteria(criteria, dataItemName) {
    try {
        if (!!criteria) {
            var criteriaSerializer = new analytics_widgets_internal_1.FilterEditorSerializer();
            var criteriaOperator = criteriaSerializer.deserialize(criteria);
            var cleanedOperator = removePropertyFromCriteriaOperator(criteriaOperator, dataItemName);
            return criteriaSerializer.serialize(cleanedOperator);
        }
        else {
            return criteria;
        }
    }
    catch (e) {
        return '';
    }
}
