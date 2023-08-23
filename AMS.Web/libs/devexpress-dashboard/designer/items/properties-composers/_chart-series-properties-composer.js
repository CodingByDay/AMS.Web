﻿/**
* DevExpress Dashboard (_chart-series-properties-composer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartSeriesPropertiesComposer = void 0;
const _chart_data_controller_proto_1 = require("../../../data/data-controllers/_chart-data-controller-proto");
const chart_series_1 = require("../../../model/items/chart/chart-series");
const chart_series_creator_1 = require("../../../model/items/chart/chart-series-creator");
const _chart_series_1 = require("../../../model/items/chart/metadata/_chart-series");
const _dashboard_item_coloring_options_1 = require("../../../model/items/options/metadata/_dashboard-item-coloring-options");
const _base_metadata_1 = require("../../../model/metadata/_base-metadata");
const _object_properties_wrapper_1 = require("../../form-adapter/_object-properties-wrapper");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _display_name_provider_1 = require("../../_display-name-provider");
const _container_type_selector_1 = require("../container-type-selector/_container-type-selector");
const _base_properties_composer_1 = require("./_base-properties-composer");
const _data_item_properties_composer_1 = require("./_data-item-properties-composer");
const _shared_composers_1 = require("./_shared-composers");
class ChartSeriesPropertiesComposer extends _base_properties_composer_1.DataItemContainerPropertiesComposer {
    constructor(customizeHandler, _containerTypesMap = chart_series_creator_1.ChartSeriesCreator.chartSeriesViewTypesMap, _allowConfigurePointLabels = true, _allowSecondaryAxis = true, _editCFRuleHandler, _createCFRuleDelegate) {
        super(customizeHandler);
        this._containerTypesMap = _containerTypesMap;
        this._allowConfigurePointLabels = _allowConfigurePointLabels;
        this._allowSecondaryAxis = _allowSecondaryAxis;
        this._editCFRuleHandler = _editCFRuleHandler;
        this._createCFRuleDelegate = _createCFRuleDelegate;
    }
    _composeTabsCore(model, args) {
        var typeTab = new _accordion_tab_1.TypeAccordionTab(_accordion_tab_1.KnownTabs.Type, 'DashboardWebStringId.Type'), commonTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.Common, 'DashboardWebStringId.Options'), pointLabelsTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.PointLabels, 'DashboardWebStringId.AccordionTab.ScatterChartPointLabelOptions'), coloringTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ColoringOptions, 'DashboardWebStringId.ColoringOptions'), conditionalFormattingTab = new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.ConditionalFormatting, 'DashboardWebStringId.ConditionalFormatting'), result = [typeTab, commonTab, coloringTab, pointLabelsTab, conditionalFormattingTab];
        this._fillSeriesTypeWrapper(typeTab, model, args.containerType);
        this._fillSeriesGeneralTab(commonTab, model, args.dashboardItem, args.dataSourceBrowser);
        this._fillConditionalFormattingTab(conditionalFormattingTab, model, args.dashboardItem, args.dataSourceBrowser);
        if (model && model[_chart_series_1.plotOnSecondaryAxis.propertyName]) {
            coloringTab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                model: args.dashboardItem.coloringOptions,
                properties: [_dashboard_item_coloring_options_1.measuresColoringMode]
            }));
        }
        if (this._allowConfigurePointLabels) {
            pointLabelsTab.tabModel(_shared_composers_1.SharedComposers.getLabelsWrapper(model));
        }
        return result;
    }
    _fillSeriesTypeWrapper(tab, model, containerType) {
        if (model) {
            var hightlightedTypes = [
                'Bar',
                'StackedBar',
                'Point',
                'Line',
                'Area',
                'RangeArea'
            ];
            tab.tabModel(new _container_type_selector_1.ContainerTypeSelector(this._containerTypesMap, containerType, chart_series_creator_1.ChartSeriesCreator.chartSeriesGroupLocalization, hightlightedTypes));
        }
    }
    _showPointMarkersVisible(model) {
        return (model instanceof chart_series_1.RangeSeries || model instanceof chart_series_1.SimpleSeries) && _chart_data_controller_proto_1.allowedTypesForShowPointMarkers.indexOf(model.seriesType()) !== -1;
    }
    _showIgnoreEmptyPointsVisible(model) {
        var stackedTypes = ['FullStackedLine', 'StackedSplineArea', 'FullStackedSplineArea', 'StackedArea', 'FullStackedArea'];
        if (model instanceof chart_series_1.SimpleSeries && stackedTypes.indexOf(model.seriesType()) !== -1)
            return true;
        else
            return this._showPointMarkersVisible(model);
    }
    _fillSeriesGeneralTab(tab, model, dashboardItem, dataSourceBrowser) {
        if (model) {
            var properties = [
                Object.assign({ editorOptions: { placeholder: _display_name_provider_1.getDataItemContainerDisplayName(dataSourceBrowser, dashboardItem, model) } }, _base_metadata_1.name),
                _chart_series_1.plotOnSecondaryAxis,
                _chart_series_1.ignoreEmptyPoints,
                _chart_series_1.showPointMarkers
            ];
            var visibilityFilterRules = {};
            visibilityFilterRules[_chart_series_1.ignoreEmptyPoints.propertyName] = (propertiesWrapper) => this._showIgnoreEmptyPointsVisible(propertiesWrapper.model);
            visibilityFilterRules[_chart_series_1.showPointMarkers.propertyName] = (propertiesWrapper) => this._showPointMarkersVisible(propertiesWrapper.model);
            visibilityFilterRules[_chart_series_1.plotOnSecondaryAxis.propertyName] = (propertiesWrapper) => this._allowSecondaryAxis;
            tab.tabModel(new _object_properties_wrapper_1.ObjectPropertiesWrapper({
                model: model,
                properties: properties,
                visibilityFilterRules: visibilityFilterRules
            }));
        }
    }
    _fillConditionalFormattingTab(tab, series, dashboardItem, dataSourceBrowser) {
        if (!series._isConditionalFormattingSupported)
            return;
        const cfRuleCreator = () => {
            const cfRule = this._createCFRuleDelegate();
            cfRule.dataItemName(series._getDataId());
            cfRule.dataItemApplyToName(series._getDataId());
            return cfRule;
        };
        const cfRuleFilter = (cfRule) => {
            const seriesDataItemNames = series._measures
                .map(measure => measure.uniqueName())
                .filter(name => !!name);
            return seriesDataItemNames.indexOf(cfRule.dataItemName()) !== -1
                || seriesDataItemNames.indexOf(cfRule.dataItemApplyToName()) !== -1;
        };
        tab.tabModel(_data_item_properties_composer_1.DataItemsPropertiesComposer.getFormatRulesWrapper(dashboardItem, cfRuleCreator, cfRuleFilter, this._editCFRuleHandler));
    }
}
exports.ChartSeriesPropertiesComposer = ChartSeriesPropertiesComposer;
