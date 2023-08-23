﻿/**
* DevExpress Dashboard (chart-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartItem = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _default_1 = require("../../../data/localization/_default");
const _dimension_1 = require("../../data-item/metadata/_dimension");
const chart_calc_window_definition_1 = require("../../data-item/window-definition/chart-calc-window-definition");
const _data_field_1 = require("../../data-sources/_data-field");
const _helper_classes_1 = require("../../internal/_helper-classes");
const _knockout_utils_1 = require("../../internal/_knockout-utils");
const serializable_model_1 = require("../../serializable-model");
const chart_item_base_1 = require("../chart-item-base");
const chart_indicator_1 = require("./chart-indicator");
const chart_pane_1 = require("./chart-pane");
const chart_series_1 = require("./chart-series");
const _chart_item_1 = require("./metadata/_chart-item");
class ChartItem extends chart_item_base_1.ChartItemBase {
    constructor(dashboardItemJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardItemJSON, serializer);
        this.panes = analytics_utils_1.deserializeArray(dashboardItemJSON.Panes || {}, (item) => new chart_pane_1.ChartPane(this, item, serializer));
        this.indicators = analytics_utils_1.deserializeArray(dashboardItemJSON.Indicators || {}, (item) => new chart_indicator_1.ChartIndicator(item, serializer));
        if (this.panes().length === 0) {
            this._addNewPane();
        }
        _knockout_utils_1.subscribeAndPerform(this.__arguments, newValue => {
            newValue.forEach((argument) => {
                argument._specifics.customDataShapingProperties = [{
                        serializationInfo: _dimension_1.isDiscreteNumericScale,
                        filter: dataField => _data_field_1.DataField.isNumeric(dataField)
                    }];
            });
        });
    }
    _clearBindings() {
        super._clearBindings();
        this.panes.removeAll();
        this.panes.push(new chart_pane_1.ChartPane(this, {}));
    }
    _getInfoCore() {
        return _chart_item_1.chartItemSerializationInfo;
    }
    _getDefaultItemType() {
        return 'Chart';
    }
    _updateContentViewModel(content) {
        super._updateContentViewModel(content);
        content.ViewModel.Rotated = this.rotated();
    }
    _getTargetDimensions() { return this.interactivityOptions.targetDimensions(); }
    _getMasterFilterMode() { return this.interactivityOptions.masterFilterMode(); }
    _getDrillDownEnabled() { return this.interactivityOptions.isDrillDownEnabled(); }
    _getIgnoreMasterFilter() { return this.interactivityOptions.ignoreMasterFilters(); }
    _getCanColorByDimensions() { return this._coloredSeries().length > 0; }
    _getAreMeasuresColoredByDefault() {
        return this._coloredSeries().length > 1;
    }
    _getIsDimensionColoredByDefault(dimension) {
        return !!this.__seriesDimensions().filter(link => link.dataItem() === dimension)[0];
    }
    _addNewPane() {
        var pane = new chart_pane_1.ChartPane(this, { '@ItemType': 'Pane' });
        pane.name(_helper_classes_1.NameGenerator.generateName(_default_1.getLocalizationById('DashboardStringId.DefaultNameChartPane') + ' ', this.panes(), 'name', 1));
        this.panes.push(pane);
    }
    _coloredSeries() {
        return [].concat.apply([], this.panes().map(pane => pane.series())).filter(series => !(series instanceof chart_series_1.HighLowCloseSeries) && !(series instanceof chart_series_1.OpenHighLowCloseSeries));
    }
    _getDefaultCalculationWindowDefinition() {
        return new chart_calc_window_definition_1.ChartWindowDefinition();
    }
}
exports.ChartItem = ChartItem;
serializable_model_1.itemTypesMap['Chart'] = { type: ChartItem, groupName: 'common', title: 'DashboardStringId.DefaultNameChartItem', index: 30 };
